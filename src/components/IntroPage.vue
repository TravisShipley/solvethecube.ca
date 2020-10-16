<template>
  <section ref="page" class="page page--intro-page">
    <div class="page__wrapper">
      <ProgressBar :progress="progress" />

      <h1 class="title title--intro">But first...</h1>
      <div class="page__content">
        <div class="slide">
          <h2>
            Let's learn a bit about how the cube works.
          </h2>
        </div>

        <div class="slide">
          <h3>
            <HighlightedText>
              Centers
            </HighlightedText>
          </h3>
          <p class="piece-description piece-description--center">
            The 6 center pieces are attached to the core of the cube. They can
            rotate but they never swap around. This means that
            <span>the yellow face is always opposite the white face.</span>
          </p>
        </div>

        <div class="slide">
          <h3>
            <HighlightedText>
              Edges
            </HighlightedText>
          </h3>
          <p class="piece-description piece-description--edge">
            There are only 2 colours on the edge pieces, and each face has 4
            edges.
          </p>
        </div>

        <div class="slide">
          <h3>
            <HighlightedText>
              Corners
            </HighlightedText>
          </h3>
          <p class="piece-description piece-description--corner">
            The corner pieces have 3 colours. Notice how the middle layer has NO
            corner pieces.
          </p>
        </div>
      </div>
    </div>
    <Puzzle ref="heroPuzzle" :state="puzzleState" class="hero-puzzle" />
  </section>
</template>

<script>
import ProgressBar from "./ProgressBar";
import HighlightedText from "./HighlightedText";
import Puzzle from "./Puzzle";

var IntroPage = {
  name: "IntroPage",
  components: {
    HighlightedText,
    ProgressBar,
    Puzzle
  },
  data() {
    return {
      cornerDescription: "",
      progress: 0,
      timeline: null,
      heroTimeline: null,
      scrollTriggers: null,
      puzzleState: "SOLVED"
    };
  },
  methods: {
    init() {
      console.log("introPage innit?");
      const cube = this.$refs.heroPuzzle;
      const page = this.$refs.page;

      var spinning = cube.spinContinuously();

      // Create the timeline for the hero cube
      this.heroTimeline = gsap.timeline({
        defaults: {
          duration: 10
        },

        scrollTrigger: {
          trigger: "#app",
          endTrigger: page,
          start: "top+=10px top",
          end: "bottom+=100%",
          scrub: 0.5,

          // markers: {
          //   startColor: "darkgreen",
          //   endColor: "purple",
          //   fontSize: "18px",
          //   fontWeight: "bold",
          //   indent: 20
          // },

          onLeave: () => {
            console.log("LEAVE");
          },

          onEnter: () => {
            console.log("STARTING");
            spinning.kill();
            cube.unspin();
            this.heroTimeline.invalidate();
          },

          onLeaveBack: () => {
            console.log("LEAVEBACK");
            spinning = cube.spinContinuously();
          }
        }
      });

      this.heroTimeline
        .to(
          ".hero-puzzle",
          {
            duration: 1,
            // x: "10",
            y: "+=100vh",
            scale: 0.85,
            ease: "back.inOut"
          },
          0
        )
        .add(cube.changeColor(0xee0231), 0)
        .add(cube.spinTo(0.5, 2.5, 0), 0) // white face up
        .add(cube.spinTo("+=0", "+=3.1415", "+=0"))
        .add(function() {
          console.log("\nCenters\n\n");
        })
        .add(cube.showOnlyCenters())
        .add(cube.spinTo("+=0", "+=3.1415", "+=0"), "<")
        .add(function() {
          console.log("\nEdges\n\n");
        })
        .add(cube.showOnlyEdges())
        .add(cube.spinTo("+=0", "+=3.1415", "+=0"), "<")
        .add(function() {
          console.log("\nCorners\n\n");
        })
        .add(cube.showOnlyCorners())
        .add(cube.spinTo("+=0", "+=3.1415", "+=0"), "<");

      // Timeline for the intro page
      this.timeline = gsap.timeline({
        scrollTrigger: {
          trigger: page,
          scrub: true,
          pin: true,
          end: "bottom+=100%",
          // markers: true,
          onUpdate: self => {
            this.progress = self.progress;
          }
        }
      });

      this.timeline
        .from(".slide", {
          y: 100,
          alpha: 0,
          stagger: {
            each: 1,
            delay: function(index) {
              return 2 * index;
            }
          }
        })
        .set({}, {}, "+=3");
    }
  },
  mounted: function() {
    this.init();
  }
};

export default IntroPage;
</script>

<style lang="scss" scoped>
section {
  background: rgb(92, 186, 230);
}

h1 {
  background: darken(rgb(92, 186, 230), 10%);
}

$puzzle-size: 100vmin;

.hero-puzzle {
  position: absolute;
  width: $puzzle-size;
  height: $puzzle-size;
  transform-origin: center center;

  top: -90vh;
  left: 0;

  @media screen and (min-width: 50em) {
    width: 80vmin;
    height: 80vmin;
    right: 0;
    left: auto;
  }
  @media screen and (min-width: 90em) {
    right: auto;
    left: 35em;
    transform: scale(1.2);
  }
}
</style>
