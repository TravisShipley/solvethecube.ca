<template>
  <section :id="pageId" ref="page" class="page">
    <PageSticker :backgroundColor="stickerColor" :transform="stickerRotation" />
    <div class="page__wrapper">
      <!-- <ProgressBar :progress="progress" /> -->
      <h1 class="title">
        <span>{{ id }}. </span>{{ title }}
      </h1>
      <GoalDisplay
        ref="goal"
        :goal="goal"
        @complete="onGoalComplete"
        @active="onGoalActive"
      />
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
          :progress="progress"
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
      // this.createPageController();
      this.timeline = gsap.timeline();
      this.timeline
        .from("#step1 .slide", {
          y: 100,
          alpha: 0,
          ease: "back.out",
          stagger: {
            each: 1,
            delay: function(index) {
              return 2 * index;
            }
          }
        })
        .set({}, {}, "+=1");
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
          scrub: 1,
          pin: true,
          start: "top top",
          end: "bottom+=100%",
          onUpdate: self => {
            this.progress = self.progress;
          }
        }
      });
    },
    onGoalComplete: function(e, v) {
      console.log("completes: ", e, v);
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
