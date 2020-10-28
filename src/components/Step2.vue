<template>
  <section id="step2" ref="page" class="page step">
    <PageSticker
      :backgroundColor="stickerColor"
      :transform="stickerRotation"
      :left="stickerLeft"
    />
    <div class="page__wrapper">
      <h1 class="title">
        <span>{{ id }}. </span>{{ title }}
      </h1>
      <ProgressBar />
      <!-- <GoalDisplay ref="goal" :goal="goal" /> -->
      <div class="page__content grid">
        <div class="instructions">
          <p class="slide">
            With the
            <b>yellow center still facing up</b>, turn the top face until you
            match up the color of an edge piece with the color of the center
            that is facing you.
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
      progress: 0,
      goal: {
        id: 0,
        description: "Build the white cross on the bottom of the cube.",
        backgroundColor: "rgb(152, 230, 178)",
        puzzleState: "WHITECROSS"
      }
    };
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
