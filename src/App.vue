<template>
  <div id="app">
    <HeroPage ref="heroPage" />
    <IntroPage ref="introPage" />
    <div class="hero-puzzle">
      <Puzzle ref="heroPuzzle" :state="puzzleState" />
    </div>
    <Step1 />
    <Step2 />
    <Step3 />
    <!-- <Puzzle ref="otherPuzzle" /> -->
  </div>
</template>

<script>
// import gsap from "gsap";

import HeroPage from "./components/HeroPage";
import Puzzle from "./components/Puzzle";
import IntroPage from "./components/IntroPage";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

export default {
  name: "App",
  components: {
    HeroPage,
    IntroPage,
    Puzzle,
    Step1,
    Step2,
    Step3
  },
  data() {
    return {
      timeline: null,
      scrollTriggers: null,
      puzzleState: "FOO"
    };
  },
  methods: {
    init() {
      console.log("App initialized");
      // console.log(this.$refs.heroPuzzle.canvas);
      const hp = this.$refs.heroPuzzle;
      var heroSpin = hp.spinIndefinitely();

      const pages = gsap.utils.toArray(".page");
      const steps = document.querySelectorAll(".step");

      // Create the timeline for the hero animations
      // for (var i in pages) {
      //   // var page = ;

      //   // console.log(page);
      //   // this.scrollTriggers.push(
      //   ScrollTrigger.create({
      //     trigger: pages[i],
      //     // pin: i > 0 ? true : false,
      //     pin: true,
      //     scrub: true,
      //     // end: "bottom top",
      //     markers: true
      //   });
      //   // );
      // }

      // pages.forEach((page, i) => {
      //   ScrollTrigger.create({
      //     trigger: page,
      //     // start: "top top",
      //     // pin: i > 0 ? true : false,
      //     pin: true,
      //     markers: true,
      //     pinSpacing: false
      //   });
      // });

      // ScrollTrigger.create({
      //   snap: {
      //     duration: 0.3,
      //     snapTo: 1 / (pages.length - 1)
      //   } // snap whole page to the closest section!
      // });

      // gsap.to(pages, {
      //   scrollTrigger: {}
      // });

      // this.timeline = gsap.timeline();
      // this.timeline = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: "#app",
      //     endTrigger: this.$refs.introPage.$el,
      //     pin: ".hero-puzzle",
      //     markers: true,
      //     scrub: 0.1,
      //     start: "10px top",
      //     end: "bottom bottom",
      //     snap: {
      //       snapTo: [0, 0.5, 1], // snap to the closest label in the timeline
      //       duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
      //       delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
      //       ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
      //     },
      //     onEnter: () => {
      //       heroSpin.kill();
      //     },
      //     onLeaveBack: () => {
      //       heroSpin = hp.spinIndefinitely();
      //     }
      //   }
      // });

      // this.timeline.addLabel("start");
      // this.timeline.add(this.$refs.heroPuzzle.changeColor(0xee0231), "start");
      // this.timeline.add(this.$refs.heroPuzzle.spinAnimation(), "start");
      // this.timeline.to(
      //   this.$refs.heroPuzzle.$el,
      //   {
      //     duration: 1,
      //     scaleX: "0.6",
      //     scaleY: "0.6"
      //   },
      //   "start"
      // );
      // this.timeline.to(this, { duration: 1 });
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style lang="scss">
$puzzle-size: 95vmin;
#app {
  // z-index: -1000; // move the app to the bottom of the sort order
}
.hero-puzzle {
  position: absolute;
  width: $puzzle-size;
  height: $puzzle-size;
  // background: rgba(240, 128, 128, 0.205);
  transform-origin: center right;

  // border: 10px solid lightcoral;
  top: calc(50vh - (#{$puzzle-size} / 2)); // center the puzzle vertically
  right: 0;
  left: initial;

  @media screen and (max-width: 799px) {
    right: initial;
    width: 100vmin;
    height: 100vmin;
    top: calc(50vh - (100vmin / 2));
  }
}
</style>
