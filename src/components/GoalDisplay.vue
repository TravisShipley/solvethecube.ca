<template>
  <div ref="goal" class="goal">
    <div ref="bg" class="goal__background" :style="{ backgroundColor }"></div>
    <div class="goal__puzzle">
      <Puzzle ref="goalPuzzle" :state="puzzleState" />
    </div>
  </div>
</template>

<script>
import { bus } from "../main";

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
      backgroundColor: null,
      backgroundWidth: null,
      backgroundHeight: null,
      puzzleState: null,
      description: null
    };
  },

  methods: {
    init: function() {
      console.log("goal init");
      console.log("goal props:", this.goal);

      var spin = this.$refs.goalPuzzle.spinIndefinitely();

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.goal,
          start: "bottom bottom",
          toggleActions: "play none none none"
        }
      });
      console.log("PAUSED:", tl.paused());
      tl.from(
        this.$refs.goal,
        {
          duration: 3,
          scale: 0.1,
          // x: "50%",
          ease: "elastic.out"
        },
        0
      )
        .from(
          this.$refs.goal,
          {
            duration: 0.3,
            opacity: 0
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
            x: 0,
            right: "1em",
            width: "6em",
            onComplete: this.isComplete
          },
          "<"
        );
      tl.add(spin, 0);

      // gsap.delayedCall(3, tl.pause());
      // console.log("PAUSED:_________", tl.paused());
    },

    isComplete: function() {
      console.log("goal is complete.");
      bus.$emit("GOAL_COMPLETE", true);
    },

    expand: function() {
      console.log(this.isActive);
      console.log(this.backgroundSize);
    }
  },

  computed: {
    isActive: {
      get: function() {
        return this.active;
      },
      set: function(value) {
        this.active = value;
      }
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
    height: 100%;
    border-radius: 50%;
    mix-blend-mode: overlay;
    scale: 0.9;
  }
  &__puzzle {
    position: relative;
    z-index: 10;
  }
  &__description {
    color: #fff;
    text-align: center;
    font-weight: bold;
    margin-left: -20%;
    margin-right: -20%;
  }
}
</style>
