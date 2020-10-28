<template>
  <section :id="pageId" ref="page" class="page">
    <div class="page__wrapper">
      <ProgressBar :progress="progress" />
      <h1 class="title">
        {{ title }}
      </h1>
      <div class="page__content grid">
        <div class="instructions">
          <h2>
            Let's learn Cube Notation
          </h2>
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
              <span class="tc"
                >The <b>FRONT</b> face is always facing you.</span
              >
            </div>
            <div class="slide notation__item">
              <span class="tc">
                <span class="alg"><span>B</span></span></span
              ><span class="tc">The <b>BACK</b> face is away from you.</span>
            </div>
            <div class="slide notation__item">
              <span class="tc">
                <span class="alg"><span>D</span></span> </span
              ><span class="tc">The <b>DOWN</b> face is on the bottom.</span>
            </div>
          </div>
          <p class="slide">
            Each letter represents a 90&deg; <b>clockwise</b> turn of that face
            as if you were <em>looking at it directly.</em>
          </p>
          <p>
            <b>Counterclockwise</b> rotations are indicated by an apostrophe, or
            <em>Prime</em> symbol after the letter, such as,
            <span class="alg">R' U' F'</span>. This is read as
            <em>R prime, U prime, F prime.</em>
          </p>
          <p>
            <b><em>Remember: </em></b>rotations are done as if you were
            <em>looking at the stickers</em> on that side.
          </p>
        </div>
        <div class="demo">
          <Puzzle ref="notationPuzzle" :state="puzzleState" />
          <div class="moves">
            <span class="moves__alg alg"><span>U</span></span>
            <p class="moves__description">Rotate the UP face 90 degrees.</p>
          </div>
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
      timeline: null
    };
  },
  methods: {
    init() {
      console.log("Initialized Moves Interlude");
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
    margin: -2em auto 0;
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
