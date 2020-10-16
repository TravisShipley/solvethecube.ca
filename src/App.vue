<template>
  <div id="app">
    <HeroPage ref="heroPage" />
    <IntroPage ref="introPage" />
    <!-- <div class="hero-puzzle"> -->
    <!-- <Puzzle ref="heroPuzzle" :state="puzzleState" /> -->
    <!-- </div> -->
    <Step1 />
    <Step2 />
    <Step3 />
    <!-- <Puzzle ref="otherPuzzle" /> -->
  </div>
</template>

<script>
// import gsap from "gsap";

import HeroPage from "./components/HeroPage";
// import Puzzle from "./components/Puzzle";
import IntroPage from "./components/IntroPage";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

export default {
  name: "App",
  components: {
    HeroPage,
    IntroPage,
    // Puzzle,
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
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style lang="scss"></style>
