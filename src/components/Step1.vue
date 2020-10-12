<template>
  <section ref="page" class="page step1">
    <div class="page__wrapper">
      <ProgressBar :progress="progress" />
      <h1 class="title title--step1"><span>1. </span>The Daisy</h1>
      <GoalDisplay
        ref="goal"
        :goal="goal"
        @complete="onComplete"
        @active="onGoalActive"
        @ready="onReady"
        @minimize="onMinimize"
      />
      <div class="page__content">
        <!-- <h2>Let's start solving this cube!</h2>
        <p>
          Take a look at the center pieces. The yellow center is always opposite
          the white center, and from now on yellow is on top and white is on the
          bottom.
        </p> -->
      </div>
      <DemoDisplay
        ref="demoDisplay"
        @complete="onDemoComplete"
        v-if="showDemo"
        :state="demoPuzzleState"
        :progress="progress"
      />
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
import ProgressBar from "./ProgressBar";
import GoalDisplay from "./GoalDisplay";
import DemoDisplay from "./DemoDisplay";

export default {
  name: "Step1",
  components: {
    ProgressBar,
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
      progress: 0,
      goal: {
        id: 0,
        description: "Arrange the 4 white edges around the yellow center",
        backgroundColor: "#face70",
        puzzleState: "DAISY"
      }
    };
  },
  computed: {
    // progress: function() {
    //   return this.timeline ? this.timeline.progress() : 0;
    // }
  },

  methods: {
    init: function() {
      console.log("Step 1 init", this.demoPuzzleState, this.goal.puzzleState);

      this.timeline = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.page,
          scrub: 1,
          // markers: true,
          // once: true,
          pin: true,
          start: "top top",
          end: "bottom+=100%",
          onUpdate: self => {
            this.progress = self.progress;
          }
        }
      });
    }, // end init
    onGoalActive: function(v) {
      this.showDemo = v;
    },
    onReady: function() {
      console.log("================\n\n\n\nGOAL IS READY TO MINIMIZE");
      // this.$refs.goal.minimize();
      this.timeline.add(this.$refs.goal.getTimeline(), 0);
      this.timeline.set({}, {}, "+=4");
    },
    onMinimize: function() {
      // this.timeline.add(); // ADD THE DEMO ENTRANCE
      this.showDemo = true;
    },
    onComplete: function(name) {
      switch (name) {
        case "goal":
          this.showDemo = true;
          break;
        case "demo":
          console.log("complete:", name);
          break;
        default:
          console.warn("Uncaught event in Step1 from", name);
          break;
      }
    },

    onGoalComplete: function(e) {
      console.log("completes: ", e);
    },
    onDemoComplete: function() {}
  },
  created() {},
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
  bottom: 0;
  width: 100%;
  padding: 1em;
  text-align: center;
  // background: darken(saturate(rgb(255, 191, 73), 20%), 10%);

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
