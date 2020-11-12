<template>
  <div ref="demo" :class="demoClasses">
    <div class="tabs" v-if="demo && images" ref="tabsContainer">
      <div
        ref="tabs"
        class="tab"
        v-for="(image, index) in images"
        :key="image"
        :class="{ active: index == selectedTab }"
        @click="selectTab(index)"
      >
        <img class="contain" :src="require('@/assets/' + image)" />
      </div>
      <div
        class="selector"
        ref="selector"
        :style="{ left: selectorOffset + 'px' }"
      ></div>
    </div>
    <div class="demo__puzzle">
      <Puzzle ref="puzzle" :state="puzzleState" @stateChanged="beginDemo" />
    </div>
    <div class="controller" v-if="demo">
      <div class="controller__btn accent-color" @click="isPlaying = !isPlaying">
        <font-awesome-icon icon="play" size="2x" v-show="!isPlaying" />
        <font-awesome-icon icon="pause" size="2x" v-show="isPlaying" />
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
      <!-- <div class="controller__btn  accent-color">
        <font-awesome-icon icon="step-forward" size="2x" />
      </div>
      <div class="controller__btn  accent-color">
        <font-awesome-icon icon="step-backward" size="2x" />
      </div> -->
    </div>
    <div class="moves" v-if="demo && showMoves">
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
    <button
      v-if="!demo"
      class="btn btn--play-demo"
      @click.once="puzzleState = states[1]"
    >
      Play Demo
    </button>
  </div>
</template>

<script>
import Puzzle from "./Puzzle";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faSyncAlt,
  faCube
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlay, faStepForward, faStepBackward, faSyncAlt, faCube, faPause);

export default {
  name: "DemoDisplay",

  components: {
    Puzzle,
    FontAwesomeIcon
  },

  props: {
    states: Array,
    images: Array,
    moves: Array,
    showMoves: {
      type: Boolean,
      default: true
    },
    showBottom: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      demo: false,
      active: false,
      puzzleState: null,
      timeline: null,
      selectedTab: 0,
      selectorOffset: 0,
      playing: false,
      demoClasses: "demo demo--goal",
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
        return this.playing;
      },
      set: function(playing) {
        this.playing = playing;

        if (playing) {
          this.playTimeline();
        } else {
          // TODO shouldn't just be killing this
          gsap.killTweensOf(this.$refs.thumb);
          this.timeline.pause();
        }
      }
    },
    isFinished: function() {
      return this.timeline.progress() == 1;
    }
  },
  methods: {
    init: function() {
      // do a nice little demo animation
      this.timeline = gsap.timeline({ repeat: -1, duration: 6 });
      this.timeline.add(this.$refs.puzzle.spinY(Math.PI * 2).duration(6), 0);
      if (this.showBottom) {
        this.timeline.add(this.$refs.puzzle.performMoves("x"), 0.1);
        this.timeline.add(this.$refs.puzzle.performMoves("x'"), 4);
      }
    },

    beginDemo: function() {
      this.$emit("complete");

      this.demo = true;
      this.demoClasses = "demo";

      // select the first tab, if tabs exist
      console.log("we got any images?", this.images);
      if (this.images) this.selectTab(0);

      let thumb = this.$refs.thumb;
      let container = this.$refs.container;
      let cube = this.$refs.puzzle;

      this.timeline.kill();
      this.timeline = gsap.timeline({
        delay: 0.5,
        // paused: true,
        onComplete: () => {
          this.isPlaying = false;
          console.log(this.playing);
        }
      });

      if (this.moves && this.moves[0].alg) {
        this.timeline.add(cube.performMoves(this.moves[0].alg));
      }

      Draggable.create(thumb, {
        type: "x",
        bounds: container,
        edgeResistance: 0.75,
        onClick: function() {
          console.log("clicked the scrubber thumb");
        },

        onDragEnd: () => {
          if (!this.timeline.paused) this.playTimeline();
        },
        onDrag: function(that) {
          this.isPlaying = false;
          // make sure that we don't set the progress to less than 0
          let p = Math.max(0, this.x / this.maxX);
          that.timeline.progress(p);
        },
        onDragParams: [this]
      });
    },

    playTimeline() {
      if (!this.timeline) return;

      if (this.timeline.progress() == 1) {
        this.$refs.puzzle.reset();
        this.timeline.restart();
      } else {
        this.timeline.resume();
      }

      let xDistance =
        this.$refs.container.clientWidth - this.$refs.thumb.clientWidth;

      // TODO why didn't I just create a timeline for the scrubber too?
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
    },

    selectTab(index) {
      console.log("TRYING TO SELECT A TAB TOO SOON", this.states, index);
      this.selectedTab = index;
      this.puzzleState = this.states[index + 1];
      this.selectorOffset = this.$refs.tabs[index].offsetLeft;
    }
  },

  created() {
    console.log("DEMO PUZZLE CREATED");
    this.puzzleState = this.states[0];
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
  background: rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  box-shadow: 8px 32px 32px -12px #3e0f0f33;
  transition: all 300ms ease;

  &.demo--goal {
    backdrop-filter: blur(0);
    background: rgba(247, 243, 241, 0);
    box-shadow: 8px 8px 32px -12px #3e0f0f00;
  }

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
.btn {
  border-radius: 0.5em;
  padding: 1em 2em;
}
.btn--play-demo {
  background: rgba(247, 243, 241, 0.8);
  box-shadow: 0 16px 16px -8px #3e0f0f33;
  color: #121212;
  font-weight: bold;
  transition: all 200ms ease;
  transition-property: background-color, transform;

  &:focus,
  &:hover,
  &:active {
    outline: none;
    background-color: #ffffff;
    transform: scale(1.15);
  }
}
.controller {
  display: grid;
  grid-template-columns: $controller_size 1fr;
  // gap: 1em;
  margin: 1em;
  height: $controller_size;

  &__btn {
    color: #121212;
    display: flex;
    justify-content: center;
    align-items: center;
    width: $controller_size;
    height: $controller_size;
    cursor: pointer;

    &:active {
      // background: rgba(255, 255, 255, 0.507);
    }
  }
  &__btn:last-child {
    // align-items: left;
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
    background: #121212;

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
  position: relative;
  display: flex;
  justify-content: center;
  height: 4em;

  .selector,
  .tab {
    max-width: 25%;
    border-radius: 8px;
    margin: 0.5em 0;
    padding: 0.25em;
    height: 100%;
    width: 100%;
    transition: all 200ms;
    cursor: pointer;
  }
  .tab {
    img {
      max-height: 100%;
      opacity: 0.7;
      transform: scale(0.8);
      transition: all 200ms;
    }

    &.active {
      cursor: initial;
    }

    &.active img,
    &:hover img {
      opacity: 1;
      transform: initial;
    }
  }
  .selector {
    position: absolute;

    background: white;
    z-index: -1;
  }
}
</style>
