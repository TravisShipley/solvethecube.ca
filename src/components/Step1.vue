<template>
  <section class="page step">
    <div class="page__wrapper">
      <PageProgress :progress="50" />
      <h1 class="title title--step1"><span>1. </span>The Daisy</h1>
      <GoalDisplay :goal="goal" />
      <div class="page__content">
        <!-- <h2>Let's start solving this cube!</h2>
        <p>
          Take a look at the center pieces. The yellow center is always opposite
          the white center, and from now on yellow is on top and white is on the
          bottom.
        </p> -->
      </div>
      <DemoDisplay ref="demoPuzzle" v-if="showDemo" :state="demoPuzzleState" />
    </div>
    <div class="page__footer">
      <div class="menu"></div>
      <a href="#">
        Skip this step
      </a>
    </div>
  </section>
</template>

<script>
import { bus } from "../main";

import PageProgress from "./PageProgress";
import GoalDisplay from "./GoalDisplay";
import DemoDisplay from "./DemoDisplay";

export default {
  name: "Step1",
  components: {
    PageProgress,
    GoalDisplay,
    DemoDisplay
  },
  data() {
    return {
      id: 1,
      title: "The Daisy",
      demoPuzzleState: "PRE_DAISY_1",
      timeline: null,
      showDemo: false,
      goal: {
        id: 0,
        description: "Arrange the 4 white edges around the yellow center",
        backgroundColor: "#face70",
        puzzleState: "DAISY"
      }
    };
  },
  methods: {
    init: function() {
      console.log("Step 1 init", this.demoPuzzleState, this.goal.puzzleState);
    }
  },
  created() {
    bus.$on("GOAL_COMPLETE", value => {
      console.log("GOAL____COMPLETE:", value);
      this.showDemo = value;
    });
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
section {
  background: rgb(255, 191, 73);
}
h1 {
  background: none;
  background: darken(saturate(rgb(255, 191, 73), 20%), 10%);
}
.page__footer {
  position: absolute;
  bottom: 50%;
  bottom: 0;
  width: 100%;
  padding: 1em;
  text-align: center;
  background: darken(saturate(rgb(255, 191, 73), 20%), 10%);

  a {
    color: rgba(0, 0, 0, 0.4);
    padding: 1em;
    text-decoration: none;
    transition: all 100ms ease-in-out;
  }

  a:hover,
  a:focus,
  a:active {
    letter-spacing: 0.05em;
    color: black;
  }
}
</style>
