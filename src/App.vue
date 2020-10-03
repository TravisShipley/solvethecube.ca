<template>
  <div id="app">
    <!-- <Puzzle ref="puzz" /> -->
    <SolveTheCube />
    <Intro />
    <Step1 />
    <Step2 />
    <Step3 />
  </div>
</template>

<script>
import SolveTheCube from "./components/SolveTheCube";
// import Puzzle from "./components/Puzzle";
import Intro from "./components/Intro";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

export default {
  name: "App",
  components: {
    // Puzzle,
    SolveTheCube,
    Intro,
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

<style lang="scss"></style>
