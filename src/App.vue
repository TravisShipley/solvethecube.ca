<template>
  <div id="app">
    <div class="hero-puzzle">
      <Puzzle ref="heroPuzzle" />
    </div>
    <SolveTheCube ref="heroPage" />
    <IntroPage ref="introPage" />
    <Step1 />
    <Step2 />
    <Step3 />
  </div>
</template>

<script>
// import gsap from "gsap";

import SolveTheCube from "./components/SolveTheCube";
import Puzzle from "./components/Puzzle";
import IntroPage from "./components/IntroPage";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

export default {
  name: "App",
  components: {
    SolveTheCube,
    IntroPage,
    Puzzle,
    Step1,
    Step2,
    Step3
  },
  data() {
    return {
      timeline: null
    };
  },
  methods: {
    init() {
      console.log("App initialized");
      // console.log(this.$refs.heroPuzzle.canvas);

      const hp = this.$refs.heroPuzzle;
      var heroSpin = hp.spinIndefinitely();
      // heroSpin.kill();
      // heroSpin.disable();
      // console.log("hp", hp);
      // Create the timeline for the hero animations
      this.timeline = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.heroPage.$el,
          pin: ".hero-puzzle",
          markers: true,
          scrub: 0.1,
          start: "top top",
          end: "bottom top",
          snap: {
            snapTo: 0.1, // snap to the closest label in the timeline
            duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
            delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
            ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
          },
          onEnter: () => {
            heroSpin.kill();
            console.log("entered");
          },
          onLeaveBack: () => {
            heroSpin = hp.spinIndefinitely();
            console.log("restart");
          }
        }
      });
      this.timeline.add(this.$refs.heroPuzzle.changeColor(0xee0231), 0);
      this.timeline.add(this.$refs.heroPuzzle.spinAnimation(), 0);
      this.timeline.to(
        this.$refs.heroPuzzle.$el,
        {
          duration: 1,
          scaleX: "0.25",
          scaleY: "0.25"
        },
        0
      );
      this.timeline.to(
        ".hero-puzzle",
        {
          duration: 0.33,
          opacity: 0.6
        },
        0.66
      );
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style lang="scss">
$puzzle-size: 95vmin;

.hero-puzzle {
  position: absolute;
  width: $puzzle-size;
  height: $puzzle-size;
  // background: rgba(240, 128, 128, 0.205);
  transform-origin: center right;

  // border: 10px solid lightcoral;
  top: calc(50vh - (#{$puzzle-size} / 2)); // center the puzzle vertically
  right: 2em;
  z-index: 10;

  @media screen and (max-width: 799px) {
    left: 10vw;
    right: initial;
    width: calc((100vmin / 100vmax) * 100vh);
    height: calc((100vmin / 100vmax) * 100vh);
    top: calc(50vh - (100vmin / 2));
  }
}
</style>
