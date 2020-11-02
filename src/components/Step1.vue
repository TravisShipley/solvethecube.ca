<template>
  <section :id="pageId" ref="page" class="page">
    <PageSticker :backgroundColor="stickerColor" :transform="stickerRotation" />
    <div class="page__wrapper">
      <h1 class="title">
        <span>{{ id }}. </span>{{ title }}
      </h1>
      <ProgressBar ref="bar" :progress="progress" />
      <!-- <GoalDisplay ref="goal" :goal="goal" @active="onGoalActive" /> -->
      <div class="page__content grid" v-if="showDemo">
        <div class="instructions">
          <h2 class="slide">A humble beginning.</h2>
          <p class="slide">
            Start by holding your cube with the
            <b>yellow center facing up</b>. This is how you'll hold the cube for
            the entire solve.
          </p>
          <p class="slide">
            One at a time, find the <b>white edges</b> and move them up next to
            the yellow center. Ignore all the other pieces.
          </p>
          <p class="slide">
            Pay careful attention to how moving one edge may affect the others.
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
      demoPuzzleState: "DAISY",
      timeline: null,
      showDemo: true,
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
      let once = true;
      this.timeline = this.$refs.bar.createTimeline(this);

      this.timeline.add(
        gsap.from("#step1 .slide", {
          y: 60,
          alpha: 0,
          ease: "back.out",
          stagger: {
            each: 1,
            delay: function(index) {
              return 2 * index;
            }
          }
        })
      );
    }, // end init
    onGoalActive: function(value) {
      this.showDemo = !value;
    },
    onDemoComplete: function() {
      console.log("demo done");
    }
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
