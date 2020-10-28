<template>
  <div ref="demo" class="demo">
    <div class="tabs">
      <div class="tab">
        <img class="contain" src="../assets/solved-cube-1.png" alt="" />
      </div>
      <div class="tab active">
        <img class="contain" src="../assets/solved-cube-1.png" alt="" />
      </div>
      <!-- <div class="tab">
        <img class="contain" src="../assets/solved-cube-1.png" alt="" />
      </div>
      <div class="tab">
        <img class="contain" src="../assets/solved-cube-1.png" alt="" />
      </div> -->
    </div>
    <div class="demo__puzzle">
      <Puzzle ref="puzzle" :state="puzzleState" />
    </div>
    <div class="controller">
      <div class="controller__btn accent-color" @click="isPlaying = !isPlaying">
        <font-awesome-icon icon="play" size="2x" v-show="!isPlaying" />
      </div>
      <div class="scrubber">
        <div
          class="scrubber__container"
          role="button"
          ref="container"
          @mouseover="onMouseOver"
          @mouseleave="onMouseLeave"
          @click="onClickScrubber($event)"
        >
          <div
            class="scrubber__thumb controller__btn  accent-bg"
            role="button"
            ref="thumb"
          ></div>
        </div>
      </div>
      <div class="controller__btn  accent-color">
        <font-awesome-icon icon="step-forward" size="2x" />
      </div>
      <div class="controller__btn  accent-color">
        <font-awesome-icon icon="step-backward" size="2x" />
      </div>
    </div>
    <div class="moves">
      <div class="adj">
        <font-awesome-icon icon="cube" size="1x" />
      </div>
      <div class="alg">
        <span>L'</span><span>U</span><span>R</span><span>U'</span><span>L</span
        ><span>U</span><span>R'</span>
      </div>
      <div class="adj">
        <font-awesome-icon icon="cube" size="1x" />
      </div>
      <div class="alg fish">
        <div class="name">The Fish</div>
        <span>R</span><span>U</span><span>R'</span><span>U</span
        ><span>R</span>U<span>2</span><span>R'</span>
      </div>
      <div class="info">Adjust the cube.</div>
    </div>
  </div>
</template>

<script>
import Puzzle from "./Puzzle";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faStepForward,
  faStepBackward,
  faSyncAlt,
  faCube
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlay, faStepForward, faStepBackward, faSyncAlt, faCube);

export default {
  name: "DemoDisplay",

  components: {
    Puzzle,
    FontAwesomeIcon
  },

  props: {
    state: String
  },

  data() {
    return {
      active: false,
      puzzleState: null,
      timeline: null,
      message: null,
      scrubPosition: null
    };
  },
  computed: {
    isActive: {
      get: function() {
        return this.active;
      },
      set: function(value) {
        this.active = value;
      }
    },
    isPlaying: {
      get: function() {
        return !this.timeline.paused();
      },
      set: function(play) {
        if (play) {
          this.playTimeline();
        } else {
          this.timeline.pause();
        }
        console.log("IS THE TIMELINE PLAYING:", play);
      }
    },
    isFinished: function() {
      return this.timeline.progress() == 1;
    }
  },
  methods: {
    init: function() {
      this.$emit("complete");
      let thumb = this.$refs.thumb;
      let container = this.$refs.container;

      this.timeline
        .add(this.$refs.puzzle.spinX())
        .add(this.$refs.puzzle.changeColor(0xd1ccc0), "<")
        .add(this.$refs.puzzle.spinY())
        .add(this.$refs.puzzle.changeColor(0x6ab04c), "<")
        .add(this.$refs.puzzle.spinX())
        .add(this.$refs.puzzle.changeColor(0x2f3542), "<");

      Draggable.create(thumb, {
        type: "x",
        bounds: container,
        edgeResistance: 0.75,
        onClick: function(self) {
          console.log("clicked the scrubber thumb");
        },

        onDragEnd: () => {
          if (!this.timeline.paused) this.playTimeline();
        },
        onDrag: function(that) {
          // make sure that we don't set the progress to less than 0
          this.isPlaying = false;
          let p = Math.max(0, this.x / this.maxX);
          that.timeline.progress(p);
        },
        onDragParams: [this]
      });

      // this.playTimeline();
    },
    playTimeline() {
      if (this.timeline.progress() == 1) this.timeline.restart();
      else this.timeline.resume();

      let xDistance =
        this.$refs.container.clientWidth - this.$refs.thumb.clientWidth;

      gsap.set(this.$refs.thumb, { x: xDistance * this.timeline.progress() });

      gsap.to(this.$refs.thumb, {
        duration: this.timeline.duration() - this.timeline.time(),
        x: xDistance,
        ease: "none"
      });
    },
    onMouseOver() {
      gsap.to(this.$refs.thumb, {
        scale: 1.25,
        duration: 0.2,
        ease: "back.out"
      });
    },
    onMouseLeave() {
      gsap.to(this.$refs.thumb, {
        scale: 1,
        duration: 0.2,
        ease: "back.out"
      });
    },
    onClickScrubber(e) {
      let offset = e.offsetX;
      let t = this.$refs.thumb;
      let containerSize = this.$refs.container.offsetWidth;

      if (offset < t.offsetWidth) offset = 0;
      else if (offset > containerSize - t.offsetWidth)
        offset = containerSize - t.offsetWidth;
      else offset -= t.offsetWidth / 2;

      let position = e.offsetX / containerSize;
      this.timeline.progress(position);

      gsap.set(t, { x: offset });
      gsap.killTweensOf(t);

      if (!this.timeline.paused()) this.playTimeline();
    }
  },

  created() {
    this.timeline = gsap.timeline({
      paused: true,
      onComplete: function() {
        this.isPlaying = false;
        console.log(this.isPlaying);
      }
    });
    this.puzzleState = this.state;
    console.log("DEMO PUZZLE CREATED");
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.demo {
  margin: 1em auto;
  max-width: 40em;
  min-width: 80%;
  text-align: center;

  backdrop-filter: blur(16px);
  background: rgba(247, 243, 241, 0.8);
  border-radius: 24px;
  box-shadow: 8px 32px 32px -12px #3e0f0f33;

  &__puzzle {
    position: relative;
    max-width: 22em;
    width: 90vmin;
    padding: 1em;
    margin: auto;
    z-index: 10;
    @media screen and (min-width: 50em) {
      width: 25em;
    }
  }
  &__background {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    mix-blend-mode: overlay;
    scale: 0.9;
  }
  &__description {
    color: #fff;
    text-align: center;
    font-weight: bold;
    margin-left: -20%;
    margin-right: -20%;
  }
  .moves {
    position: relative;
    margin: 1em;
    // font-size: 1.2em;
    text-align: center;
  }

  .adj {
    margin: 0.25em 0.5em;
    display: inline-block;
    svg {
      color: rgba(12, 12, 12, 0.1);
    }
  }
  .info {
    margin: 1em;
  }
}
$controller_size: 3em;
$scrubber_size: 2em;
.controller {
  display: grid;
  grid-template-columns: $controller_size 1fr $controller_size $controller_size;
  // gap: 1em;
  margin: 1em;
  height: $controller_size;

  &__btn {
    color: tomato;
    display: flex;
    justify-content: center;
    align-items: center;
    width: $controller_size;
    height: $controller_size;
    cursor: pointer;
    &:active {
      background: rgba(255, 255, 255, 0.507);
    }
  }
  &__btn:last-child {
    align-items: left;
  }
}
.scrubber {
  background: rgba(29, 10, 2, 0.1);
  height: $controller_size;
  padding: ($controller_size - $scrubber_size) / 2;
  border-radius: $scrubber_size/4;
  box-shadow: inset 3px 6px 16px -2px rgba(62, 15, 15, 0.13);

  &__container {
    width: 100%;
    height: 100%;
  }
  &__bar {
    display: none;
    width: 50%;
    background: rgb(0, 0, 0);
    height: 100%;
    float: left;
  }
  &__thumb {
    position: absolute;
    border-radius: $scrubber_size/8;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0.8;
    background: white;
    height: $scrubber_size;
    width: $scrubber_size;
    float: right;

    &:hover,
    &:focus,
    &:active {
      transform-origin: center center;
      transition-property: box-shadow, background-color, opacity;
      transition-duration: 200ms;
      transition-timing-function: ease-in-out;
      outline: none;
      opacity: 1;
    }
  }
}
.tabs {
  display: flex;
  justify-content: center;
  // text-align: center;
  height: 4em;

  .tab {
    max-width: 25%;
    background: white;
    border-radius: 8px;
    // border: 1px solid;
    margin: 0.5em 0.25em;
    padding: 0.25em;
    height: 100%;
    width: 100%;
    transition: all 200ms;
    img {
      max-height: 100%;
      transition: all 200ms;
    }
    &:not(.active):not(:hover) {
      cursor: pointer;
      background: transparent;
      img {
        opacity: 0.7;
        transform: scale(0.8);
      }
    }
  }
}
</style>
