<template>
  <div ref="demo" class="demo">
    <div class="demo__puzzle">
      <Puzzle ref="demoPuzzle" :state="puzzleState" />
    </div>

    <div class="demo__progress">
      <div class="demo__bar">
        <div class="demo__thumb"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Puzzle from "./Puzzle";

export default {
  name: "DemoDisplay",

  components: {
    Puzzle
  },

  props: {
    state: String
  },

  data() {
    return {
      active: true,
      timeline: null,
      puzzleState: null
    };
  },

  methods: {
    init: function() {
      console.log("demo init");
      console.log("demo props:", this.demo);
      var tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: this.$refs.demo,
            start: "bottom bottom",
            toggleActions: "play none none reset"
          }
        })
        .from(
          this.$refs.demo,
          {
            duration: 3,
            scale: 0.1,
            ease: "elastic.out"
          },
          0
        )
        .from(
          this.$refs.demo,
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
          this.$refs.demo,
          {
            duration: 0.5,
            ease: "back.inOut",
            top: 0,
            x: 0,
            right: "1em",
            width: "6em"
          },
          "<"
        )
        .add(this.$refs.demoPuzzle.spinIndefinitely(), 0);

      // this.timeline
    },

    expand: function() {
      console.log(this.isActive);
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
    this.puzzleState = this.state;
  },

  mounted() {
    // this.init();
  }
};
</script>

<style lang="scss">
.demo {
  position: absolute;

  width: 25em;
  top: 20%;
  right: 50%;
  transform: translateX(50%);

  @media screen and (min-width: 50em) {
    width: 20em;
    // right: 3em;
    // transform: none;
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
