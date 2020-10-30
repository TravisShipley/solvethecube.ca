<template>
  <section :id="pageId" ref="page" class="page">
    <div class="page__wrapper">
      <h1 class="title">
        {{ title }}
      </h1>
      <ProgressBar :progress="progress" backgroundColor="teal" />
      <div class="page__content grid">
        <div class="instructions">
          <h2 class="slide">
            Let's learn Cube Notation
          </h2>

          <p class="slide">
            <b>Basic cube notation</b> allows us to memorize short sequences of
            moves called <em>algorithms</em>. These 6 letters are used to
            represent the faces of the cube:
          </p>
          <div class="notation">
            <div class="slide notation__item">
              <span class="tc"
                ><span class="alg"><span>U</span></span></span
              >
              <span class="tc"> The face pointing <b>UP</b>. </span>
            </div>
            <div class="slide notation__item">
              <span class="tc"
                ><span class="alg"><span>R</span></span></span
              >
              <span class="tc">The face on the <b>RIGHT</b> side.</span>
            </div>
            <div class="slide notation__item">
              <span class="tc">
                <span class="alg"><span>L</span></span> </span
              ><span class="tc">The face on the <b>LEFT</b> side.</span>
            </div>
            <div class="slide notation__item">
              <span class="tc"
                ><span class="alg"><span>F</span></span></span
              >
              <span class="tc">The <b>FRONT</b> is always facing you.</span>
            </div>
            <div class="slide notation__item">
              <span class="tc">
                <span class="alg"><span>B</span></span></span
              ><span class="tc">The <b>BACK</b> is away from you.</span>
            </div>
            <div class="slide notation__item">
              <span class="tc">
                <span class="alg"><span>D</span></span> </span
              ><span class="tc">The <b>DOWN</b> face is on the bottom.</span>
            </div>
          </div>
          <p class="slide">
            Each letter indicates a <b>90&deg; clockwise</b> turn of the face. A
            <b>counterclockwise</b> turn is written with a
            <em>prime symbol</em> after the letter, such as,
            <span class="alg">R'</span>.
          </p>
          <p class="slide">
            <b><em>Important: </em></b>Turns are done as if you were
            <em>looking directly at the stickers</em> of that face.
          </p>
        </div>

        <div class="demo">
          <Puzzle ref="puzzle" :state="puzzleState" />

          <transition name="fade" mode="out-in">
            <div class="moves" v-show="forward">
              <span class="moves__alg alg"
                ><span>{{ currentStep }}</span></span
              >
              <p class="moves__description">{{ currentStepDescription }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProgressBar from "./ProgressBar";
import Puzzle from "./Puzzle";

export default {
  name: "MovesInterlude",
  components: {
    ProgressBar,
    Puzzle
  },
  data() {
    return {
      id: 0,
      title: "Before we continue...",
      puzzleState: "SOLVED",
      progress: 0,
      timeline: null,
      stepIndex: 0,
      forward: true,
      steps: [
        { alg: "R", text: "Rotate the RIGHT face 90° clockwise." },
        { alg: "L", text: "Rotate the LEFT face 90° clockwise." },

        { alg: "U'", text: "Rotate the UP face 90° counterclockwise." },
        { alg: "U", text: "Rotate the UP face 90° clockwise." },

        { alg: "R'", text: "Rotate the RIGHT face 90° counterclockwise." },
        { alg: "L'", text: "Rotate the LEFT face 90° counterclockwise." }
      ]
    };
  },
  computed: {
    pageId: function() {
      return "step" + this.id;
    },
    currentStep: function() {
      return this.steps[this.stepIndex].alg;
    },

    currentStepDescription: function() {
      return this.steps[this.stepIndex].text;
    }
  },
  methods: {
    init() {
      console.log("Initialized Moves Interlude");

      const page = this.$refs.page;

      this.timeline = gsap.timeline({
        scrollTrigger: {
          trigger: page,
          onUpdate: self => {
            this.progress = self.progress;
            this.forward = self.direction == 1;
          },
          onEnterBack: () => (this.stepIndex = this.steps.length - 1),
          scrub: true,
          pin: true
        }
      });
      console.log(this.stepIndex);

      this.timeline.add(this.$refs.puzzle.spinY());
      this.timeline.call(this.updateStepIndex);

      this.timeline.add(this.$refs.puzzle.spinX());
      this.timeline.call(this.updateStepIndex);

      this.timeline.add(this.$refs.puzzle.spinY());
    },
    updateStepIndex() {
      // increment or decrement the step count based on scroll direction
      // the direction cannot be passed in because the args are froze at instantiation
      this.stepIndex += this.timeline.scrollTrigger.direction;
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
@import "../css/variables";

.title {
  color: teal;
}

@media (min-width: $bp-lg) {
  .puzzle-container {
    max-width: 65vh;
    margin: 0 auto;
  }
}
.notation__item {
  display: table;
  margin-bottom: 1em;

  .alg {
    font-size: 1.2em;
    margin-right: 0.5rem;
  }
}

.slide.alg {
  font-size: smaller;
}

.tc {
  text-align: left;
  // border: 1px solid;
  display: table-cell;
  vertical-align: baseline;
}
.moves {
  text-align: center;
  &__alg {
    font-size: 2em;
  }
}
</style>
