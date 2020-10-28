<template>
  <section class="page step">
    <PageSticker :backgroundColor="stickerColor" :transform="stickerRotation" />
    <div class="page__wrapper">
      <ProgressBar />
      <h1 class="title">
        <span>{{ id }}. </span>{{ title }}
      </h1>
      <!-- <GoalDisplay ref="goal" :goal="goal" /> -->

      <div class="page__content grid">
        <div class="instructions">
          <h2>Our first two algorithms</h2>
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

          <div class="slide">
            To correctly place the white corners in the first layer we're going
            to learn to use our first two algorithms.
          </div>
          <p class="slide">
            An <b>algorithm</b> is simply a series moves that we can do in
            sequence to achieve a result that we want, and these two simple
            sequences are all we'll need to solve the first layer.
          </p>
          <p>
            You will find that the scrambled white corners are in one of three
            configurations:
          </p>
          <ul>
            <li>
              In the top layer, white on top.
            </li>
            <li>
              In the top layer, white on the side.
            </li>
            <li>
              In the bottom layer, white on bottom.
            </li>
            <li>
              In the bottom layer, white on the side.
            </li>
          </ul>
        </div>
        <DemoDisplay
          ref="demoDisplay"
          :state="demoPuzzleState"
          :progress="progress"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ProgressBar from "./ProgressBar";
import PageSticker from "./PageSticker";

export default {
  name: "Step2",
  components: {
    ProgressBar,
    PageSticker
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
      progress: 0,
      goal: {
        id: 0,
        description: "Complete the first layer of the cube.",
        backgroundColor: "rgb(152, 230, 178)",
        puzzleState: "FIRSTLAYER"
      }
    };
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
