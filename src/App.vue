<template>
  <div id="app">
    <div class="hero-puzzle">
      <Puzzle ref="introCube" />
    </div>
    <SolveTheCube />
    <IntroPage />
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
  methods: {
    init() {
      console.log("App initialized");
    }
  },
  mounted: function() {
    // this.$refs.
    // console.log("app mounted", this.$refs.xxx.cube.hello() );
  }
};
</script>

<style lang="scss">
$puzzle-size: 95vmin;

.hero-puzzle {
  position: fixed;
  width: $puzzle-size;
  height: $puzzle-size;
  // border: 5px solid lightcoral;
  top: calc(50vh - (#{$puzzle-size} / 2)); // center the puzzle vertically
  // left: 20em;
  right: 0;
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
