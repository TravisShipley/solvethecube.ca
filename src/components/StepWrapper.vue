<template>
  <section id="id" ref="page" class="page {id}">
    <PageSticker />
    <!-- :sticker="sticker" -->
    <!-- :backgroundColor="sticker.backgroundColor" -->
    <!-- :rotation="sticker.rotation" -->
    <div class="page__wrapper">
      <ProgressBar :progress="progress" />
      <h1 class="title title--step1">
        <!-- <span>{{ id }}. </span>{{ title }} -->
        title
      </h1>
      <!-- <GoalDisplay ref="goal" :goal="goal" @active="onGoalActive" /> -->
      <div class="page__content">
        <div class="grid" v-if="showDemo">
          <div class="instructions">
            <p class="slide">
              The first step in solving the cube is to arrange all the
              <b>white edges</b> around the <b>yellow center</b>, forming a
              shape that looks a little bit like a daisy.
            </p>
            <div class="slide">
              Start by holding your cube with the
              <b>yellow center facing up</b>. This is how you'll hold the cube
              for the entire solve.
            </div>
            <p class="slide">
              One by one, find the <b>white edges</b> and move them up next to
              the yellow center. Ignore all the other pieces.
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
            :progress="progress"
          />
        </div>
      </div>
    </div>

    <div class="page__footer">
      <div class="menu"></div>
      <a href="#step2">
        Skip this step
      </a>
    </div>
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
      timeline: null,
      showDemo: false,
      progress: 0
    };
  },

  props: {
    id: { value: Number, default: 0, required: false },
    title: String,
    demoPuzzleState: String,
    sticker: {
      backgroundColor: String,
      left: String,
      top: String,
      rotation: String
    },
    goal: {
      description: String,
      backgroundColor: String,
      puzzleState: String
    }
  },

  computed: {},

  methods: {
    init: function() {
      this.createPageController();
    }, // end init

    onGoalActive: function(value) {
      console.log("active: ", value);
      this.showDemo = !value;
    },

    onComplete: function(name) {
      switch (name) {
        case "goal":
          // this.showDemo = true;
          this.createPageController();
          break;
        case "demo":
          console.log("complete:", name);
          break;
        default:
          console.warn("Uncaught event in Step1 from", name);
          break;
      }
    },
    createPageController: function() {
      const page = this.$refs.page;

      this.timeline = gsap.timeline({
        scrollTrigger: {
          trigger: page,
          scrub: 0.2,
          pin: true,
          start: "top top",
          end: "bottom+=100%",
          onUpdate: self => {
            this.progress = self.progress;
          }
        }
      });
    }
  },
  created() {},
  mounted() {
    console.log(this.step);
    this.init();
  }
};
</script>

<style lang="scss" scoped>
section {
  // background: rgb(255, 191, 73);
}

h1 {
  // background: darken(saturate(rgb(255, 191, 73), 20%), 10%);
}
.grid {
  display: grid;
  grid-gap: 2em;
  grid-template-columns: 1fr;
  grid-template-areas: "demo" "instructions";

  @media screen and (orientation: landscape) and (min-width: 50em) {
    grid-template-columns: 2fr 3fr;
    grid-template-areas: "instructions instructions demo demo demo";
  }
  @media screen and (min-width: 60em) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "instructions demo";
  }
  @media screen and (min-width: 90em) {
    grid-template-columns: 1fr 2fr;
    grid-template-areas: "instructions demo demo";
  }
  .demo {
    grid-area: demo;
  }
  .instructions {
    grid-area: instructions;
    grid-template-columns: 1fr;
  }
}
a {
  text-decoration: none;
  background-color: 5px solid rgb(8, 202, 66);
}
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
</style>
