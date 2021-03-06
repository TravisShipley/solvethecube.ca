<template>
  <section id="notation" ref="page" class="page">
    <div class="page__wrapper">
      <h1 class="title">
        {{ title }}
      </h1>
      <ProgressBar :progress="progress" backgroundColor="rgb(117, 30, 199)" />
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
          <Puzzle
            ref="puzzle"
            :state="puzzleState"
            :scrollDirection="scrollDirection"
          />

          <transition name="fade" mode="out-in">
            <div class="moves" v-show="scrollDirection == 1">
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
      title: "Before we continue...",
      puzzleState: "SOLVED",
      progress: 0,
      timeline: null,
      scrollDirection: 1,
      stepIndex: 0,
      steps: [
        { alg: "R", text: "Rotate the RIGHT face 90° clockwise." },
        { alg: "L", text: "Rotate the LEFT face 90° clockwise." },
        { alg: "U'", text: "Rotate the UP face 90° counterclockwise." },

        { alg: "R'", text: "Rotate the RIGHT face 90° counterclockwise." },
        { alg: "L'", text: "Rotate the LEFT face 90° counterclockwise." },
        { alg: "U", text: "Rotate the UP face 90° clockwise." }
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
      const cube = this.$refs.puzzle;

      this.timeline = gsap.timeline({
        scrollTrigger: {
          trigger: page,
          onUpdate: self => {
            this.progress = self.progress;
            this.scrollDirection = self.direction;
          },
          onEnterBack: () => (this.stepIndex = this.steps.length - 1),
          scrub: true,
          pin: true
        }
      });

      for (let i in this.steps) {
        // set the index counter
        this.timeline.call(this.updateStepIndex, [i]);

        // add the algorithm to the timeline
        this.timeline.add(cube.getMove(this.steps[i].alg));

        // set the index again for when we scrub backwards
        this.timeline.call(this.updateStepIndex, [i]);
      }
    },
    // we need a function to pass to gsap to update the index
    updateStepIndex(n) {
      this.stepIndex = n;
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
@import "../css/variables";
$accent: rgb(117, 30, 199);
// $accent: ;
.title {
  color: $accent;
  text-shadow: none;
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
.alg {
  color: white;
  background: desaturate(lighten($accent, 20%), 30%);
  background: rgba($accent, 0.7);
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
