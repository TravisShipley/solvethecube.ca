<template>
  <section ref="page" id="step2" class="page step">
    <PageSticker
      :backgroundColor="stickerColor"
      :transform="stickerRotation"
      :left="stickerLeft"
    />
    <div class="page__wrapper">
      <h1 class="title">
        <span>{{ id }}. </span>{{ title }}
      </h1>
      <ProgressBar ref="bar" :progress="progress" />
      <!-- <GoalDisplay ref="goal" :goal="goal" /> -->
      <div class="page__content grid">
        <div class="instructions">
          <h2 class="slide">
            Now we move all the white edges to the bottom.
          </h2>
          <p class="slide">
            The cube is not solved one face at a time, but rather
            <b>layer by layer</b>, from the bottom up.
          </p>
          <p class="slide">
            Now that we've collected all the white edges around the yellow
            center we're ready to place them in their solved positions in the
            bottom layer.
          </p>
          <p class="slide">
            With the
            <b>yellow center still facing up</b>, turn the top face until you
            match the color of an edge piece with the color of the center that
            is facing you.
          </p>
          <p class="slide">
            When it's matched up, rotate the front face 90 degrees so that the
            white edge piece is on the bottom.
          </p>
          <p class="slide">
            Continue to do this for all 4 white edge pieces until you've
            completed the <em>white cross.</em>
          </p>
        </div>
        <transition name="fade" mode="out-in" appear>
          <DemoDisplay
            ref="demoDisplay"
            :state="demoPuzzleState"
            v-show="ready"
          />
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import ProgressBar from "./ProgressBar";
import DemoDisplay from "./DemoDisplay";
import PageSticker from "./PageSticker";

export default {
  name: "Step2",
  components: {
    ProgressBar,
    DemoDisplay,
    PageSticker
  },
  data() {
    return {
      id: 2,
      title: "The White Cross",
      stickerColor: "rgb(108, 207, 104)",
      stickerRotation: "rotate(-9deg)",
      stickerLeft: "40%",
      demoPuzzleState: "SOLVED",
      timeline: null,
      ready: false,
      progress: 0,
      goal: {
        id: 0,
        description: "Build the white cross on the bottom of the cube.",
        backgroundColor: "rgb(152, 230, 178)",
        puzzleState: "WHITECROSS"
      }
    };
  },
  computed: {
    pageId: function() {
      return "step" + this.id;
    }
  },
  methods: {
    init: function() {
      this.timeline = this.$refs.bar.createTimeline(this);

      let appearTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#step2",
          start: "top center",
          end: "center top",
          // once: true,
          // markers: true,
          scrub: 0.2,
          // onLeave: () => (this.ready = false),
          // onEnterBack: () => (this.ready = true),
          // onLeaveBack: () => (this.ready = false),
          onToggle: () => (this.ready = !this.ready)
        }
      });

      appearTimeline.add(
        gsap.from("#step2 .slide", {
          duration: 2,
          y: function(index) {
            return 30 * (index + 1);
          },
          alpha: 0,
          ease: "power3.inOut",
          stagger: {
            each: 0.2,
            delay: function(index) {
              return 2 * index;
            }
          }
        })
      );
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: 2em;
  grid-template-columns: 1fr;
  grid-template-areas: "instructions" "demo";

  @media screen and (orientation: landscape) and (min-width: 50em) {
    .instructions {
      width: 100%;
    }
    grid-template-columns: 2fr 3fr;
    grid-template-areas: "instructions instructions demo demo demo";
  }
  @media screen and (min-width: 60em) {
    grid-template-columns: 1fr 22em;
    grid-template-areas: "demo instructions";
  }
  .demo {
    grid-area: demo;
  }
  .instructions {
    grid-area: instructions;
    grid-template-columns: 1fr;
    // border: 1px solid tomato;
    .slide {
      max-width: 22em;
    }
  }
}
</style>
