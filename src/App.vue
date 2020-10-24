<template>
  <div id="app">
    <HeroPage ref="heroPage" />
    <IntroPage ref="introPage" />
    <div class="gap"></div>
    <Step1 />
    <div class="gap"></div>
    <Step2 />
    <div class="gap"></div>
    <Step3 />
  </div>
</template>

<script>
// import gsap from "gsap";

import HeroPage from "./components/HeroPage";
import IntroPage from "./components/IntroPage";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

export default {
  name: "App",
  components: {
    HeroPage,
    IntroPage,
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

<style lang="scss" scoped>
.gap {
  height: 20vh;
  width: 100vw;
}
</style>
