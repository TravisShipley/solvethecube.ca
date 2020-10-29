<template>
  <section ref="page" class="page step">
    <PageSticker :backgroundColor="stickerColor" :transform="stickerRotation" />
    <div class="page__wrapper">
      <h1 class="title">
        <span>{{ id }}. </span>{{ title }}
      </h1>
      <ProgressBar ref="bar" :progress="progress" />
      <!-- <GoalDisplay ref="goal" :goal="goal" /> -->

      <div class="page__content grid">
        <div class="instructions">
          <span class="h3 slide bold">Our first two algorithms</span>

          <div class="slide">
            To correctly place the white corners in the first layer we're going
            to learn to use our first two algorithms.
          </div>
          <h3 class="algs slide">
            <div class="alg">
              <div class="name">Right Trigger</div>
              <span>R</span><span>U</span><span>R'</span><span>U'</span>
            </div>
            <span class="connector-phrase">and</span>
            <div class="alg">
              <div class="name">Left Trigger</div>
              <span>L'</span><span>U'</span><span>L</span><span>U</span>
            </div>
          </h3>
          <p class="slide">
            An <b>algorithm</b> is simply a series moves that we can do in
            sequence to achieve a result that we want, and these two simple
            sequences are all we'll need to solve the first layer.
          </p>
        </div>
        <DemoDisplay
          ref="demoDisplay"
          :state="demoPuzzleState"
          :images="demoImages"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ProgressBar from "./ProgressBar";
import PageSticker from "./PageSticker";
import DemoDisplay from "./DemoDisplay";

export default {
  name: "Step2",
  components: {
    ProgressBar,
    PageSticker,
    DemoDisplay
  },
  data() {
    return {
      id: 3,
      title: "The First Layer",
      stickerColor: "rgb(180, 100, 255)",
      stickerRotation: "rotate(8deg)",
      demoPuzzleState: "SOLVED",
      timeline: null,
      showDemo: false,
      demoImages: [
        "../assets/first-layer-1.png",
        "../assets/first-layer-2.png",
        "../assets/first-layer-3.png"
      ],
      progress: 0,
      goal: {
        id: 0,
        description: "Complete the first layer of the cube.",
        backgroundColor: "rgb(152, 230, 178)",
        puzzleState: "FIRSTLAYER"
      }
    };
  },
  mounted: function() {
    this.timeline = this.$refs.bar.createTimeline(this);
  }
};
</script>

<style lang="scss" scoped>
section {
  // background: rgb(180, 100, 255);
}
.algs {
  // margin-top: 1.8em;
}
.connector-phrase {
  font-style: italic;
  font-size: 0.8em;
  margin: 0 1em;
}
</style>
