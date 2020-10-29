<template>
  <section :id="pageId" ref="page" class="page">
    <PageSticker :backgroundColor="stickerColor" :transform="stickerRotation" />
    <div class="page__wrapper">
      <h1 class="title">
        <span>{{ id }}. </span>{{ title }}
      </h1>
      <ProgressBar :progress="progress" />
      <GoalDisplay ref="goal" :goal="goal" @active="onGoalActive" />
      <div class="page__content grid" v-if="showDemo">
        <div class="instructions">
          <p class="slide">
            Start by holding your cube with the
            <b>yellow center facing up</b>. This is how you'll hold the cube for
            the entire solve.
          </p>
          <p class="slide">
            One by one, find the <b>white edges</b> and move them up next to the
            yellow center. Ignore all the other pieces.
          </p>
          <p class="slide">
            If you have trouble, play this demo a few times to see how it's
            done.
          </p>
          <p class="slide">
            After you've made <b>the daisy</b>, move on to
            <a href="#step2">Step 2</a>.
          </p>
        </div>
        <DemoDisplay
          ref="demoDisplay"
          @complete="onDemoComplete"
          v-if="showDemo"
          :state="demoPuzzleState"
        />
      </div>
    </div>
    <!-- <div class="page__footer">
      <div class="menu"></div>
      <a href="#step2">
        Skip this step
      </a>
    </div> -->
  </section>
</template>

<script>
import ProgressBar from "./ProgressBar";
import GoalDisplay from "./GoalDisplay";
import DemoDisplay from "./DemoDisplay";
import PageSticker from "./PageSticker";

export default {
  name: "Step1",
  components: {
    ProgressBar,
    GoalDisplay,
    PageSticker,
    DemoDisplay
  },
  data() {
    return {
      id: 1,
      title: "The Daisy",
      stickerColor: "rgb(255, 191, 73)",
      stickerRotation: "rotate(6deg)",
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
    pageId: function() {
      return "step" + this.id;
    }
  },

  methods: {
    init: function() {
      this.createProgressController();
    }, // end init
    onGoalActive: function(value) {
      this.showDemo = !value;
    },
    createProgressController: function() {
      const page = this.$refs.page;

      this.timeline = gsap.timeline({
        scrollTrigger: {
          trigger: page,
          scrub: true,
          pin: true,
          // start: "top top",
          // end: "bottom+=100%",
          onUpdate: self => {
            this.progress = self.progress;
          }
        }
      });
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
@import "../css/variables";

.page__footer {
  position: fixed;
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
    background-color: none;
  }

  a:hover,
  a:focus,
  a:active {
    letter-spacing: 0.05em;
    color: black;
    background-color: none;
  }
}

#step1 {
  .accent-bg {
    background-color: tomato;
  }
}
</style>
