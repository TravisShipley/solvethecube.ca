<template>
  <div ref="goal" class="goal">
    <div ref="container" class="goal__container">
      <div ref="bg" class="goal__background" :style="{ backgroundColor }"></div>
      <Puzzle ref="puzzle" :state="puzzleState" class="z-10 rel" />
    </div>
    <h2 ref="description" class="goal__description" v-show="showDescription">
      {{ goal.description }}
    </h2>
  </div>
</template>

<script>
import Puzzle from "./Puzzle";

export default {
  name: "GoalDisplay",

  components: {
    Puzzle
  },

  props: {
    goal: Object
  },

  data() {
    return {
      active: true,
      timeline: null,
      entrance: null,
      showDescription: true,
      backgroundColor: null,
      puzzleState: null
    };
  },

  computed: {
    isActive: {
      get: function() {
        return this.active;
      },
      set: function(value) {
        this.active = value;
        this.$emit("active", this.active);
      }
    }
  },

  methods: {
    init: function() {
      console.log("goal init");
      console.log("goal props:", this.goal);

      var spin = this.$refs.puzzle.spinAnimation();

      // animate the "goal puzzle" onto the screen
      var entrance = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.goal,
          start: "top center",
          end: "top center",
          markers: true,
          once: true
          // toggleActions: "play none none reset"
        },
        onStart: this.isStarted
      });

      entrance
        .from(
          this.$refs.goal,
          {
            duration: 0.3,
            opacity: 0
          },
          0
        )
        .from(
          this.$refs.description,
          {
            duration: 0.5,
            opacity: 0,
            y: "-=2em",
            onComplete: this.isReady
          },
          1
        )

        .from(
          this.$refs.container,
          {
            duration: 3,
            scale: 0.1,
            ease: "elastic.out"
          },
          0
        )
        .from(
          this.$refs.bg,
          {
            duration: 2,
            scale: 0.1,
            ease: "elastic.out"
          },
          0
        )
        .add(spin, 0);
    },

    isStarted: function() {
      this.$emit("start");
    },

    isReady: function() {
      this.$emit("ready");
      // this.$refs.puzzle.spinContinuously();
    },

    minimize: function() {
      // this.entrance.progress = 1;

      var tl = gsap.timeline({
        autoRemoveChildren: true,
        onStart: () => this.$emit("minimized")
      });

      tl.to(this.$refs.description, {
        duration: 0.2,
        opacity: 0,
        onComplete: this.toggleDescription
      })
        .to(this.$refs.bg, {
          duration: 0.5,
          scale: 0.5,
          opacity: 0,
          ease: "elastic.inOut"
        })
        .to(
          this.$refs.goal,
          {
            duration: 0.5,
            ease: "back.inOut",
            top: 0,
            y: 0,
            x: 0,
            right: "1em",
            width: "6em",
            onComplete: this.isComplete
          },
          "<"
        );

      // return tl;
    },

    isComplete: function() {
      this.$emit("complete", "goal");
      this.active = false;
    },

    toggleDescription: function() {
      this.showDescription = false;
    },

    getTimeline: function() {
      if (!this.timeline) {
        this.createTimeline();
      }
      // this.timeline.add(this.$refs.puzzle.spinY());
      return this.timeline;
    },

    createTimeline: function() {
      this.timeline = gsap.timeline({
        onComplete: this.minimize,
        autoRemoveChildren: true
      });
      this.timeline
        .add(this.$refs.puzzle.spinY())
        .to(
          this.$refs.goal,
          { duration: 1, y: "-=5em", ease: "power3.inOut" },
          0
        );
    }
  },

  created() {
    this.puzzleState = this.goal.puzzleState;
    this.backgroundColor = this.goal.backgroundColor;
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
.goal {
  position: absolute;
  width: 25em;
  top: 20%;
  right: 50%;
  transform: translateX(50%);

  @media screen and (min-width: 50em) {
    width: 20em;
  }

  &__background {
    position: absolute;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: 50%;
    mix-blend-mode: overlay;
    transform: scale(0.9, 0.9);
  }

  &__description {
    position: relative;
    color: #fff;
    text-align: center;
    margin-top: 2em;
    z-index: 100;
    // font-size: 1.5em;
    // width: 20em;
  }
}
</style>
