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
          <h2 class="slide bold">Our first two algorithms</h2>

          <div class="slide">
            To correctly place the white corners and finish our first layer
            we're going to learn to use our first two algorithms.
          </div>
          <h3 class="algs slide m-t-2">
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
            These algorithms swap a corner piece in the top layer with the
            corner piece <b>directly below it</b> in the bottom layer.
          </p>
          <p>
            Refer to the demo to see how to apply them to your cube.
          </p>
          <p class="slide">
            Find a <b>white corner</b> in the top layer and put it directly
            above the corner you wish to swap it with.
          </p>
          <p>
            Depending on the position of your white sticker you may need to do
            either the<b><em> Right Trigger</em></b> or the
            <b><em> Left Trigger</em></b> a number of times to correctly place
            the corner.
          </p>
          <p>
            <b>Important:</b> If you have a white corner in the bottom layer
            that is incorrectly placed, perform one of the triggers on it to
            move it to the top layer, then solve from there.
          </p>
          <p class="slide hidden">
            An <b>algorithm</b> is simply a series moves that we can do in
            sequence to achieve a result that we want, and these two simple
            sequences are all we'll need to solve the first layer.
          </p>
        </div>
        <DemoDisplay
          ref="demoDisplay"
          :states="demoPuzzleStates"
          :images="demoImages"
          :moves="demoMoves"
          :showBottom="true"
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
      demoPuzzleStates: ["FIRSTLAYER", "SOLVED", "SOLVED", "SOLVED"],
      timeline: null,
      showDemo: false,
      demoImages: [
        "first-layer-1.png",
        "first-layer-2.png",
        "first-layer-3.png"
      ],
      demoMoves: [
        { name: "adjust", alg: "y2" },
        { name: null, alg: "L' U R U' L U R'" },
        { name: "adjust", alg: "y2'" },
        { name: "Right Trigger", alg: "R U R' U R U2 R' F" }
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
  methods: {
    init() {
      this.timeline = this.$refs.bar.createTimeline(this);
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.connector-phrase {
  font-style: italic;
  font-size: 0.8em;
  margin: 0 1em;
}
</style>
