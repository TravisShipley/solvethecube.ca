<template>
  <section id="intro" ref="page" class="page page--intro-page">
    <PageSticker :background-color="stickerColor" />
    <div class="page__wrapper">
      <h1 class="title title--intro">But first...</h1>
      <ProgressBar :progress="progress" />
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
            <b>the yellow face is always opposite the white face.</b>
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
import PageSticker from "./PageSticker";
import ProgressBar from "./ProgressBar";
import HighlightedText from "./HighlightedText";
import Puzzle from "./Puzzle";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBars);

export default {
  name: "IntroPage",
  components: {
    PageSticker,
    HighlightedText,
    ProgressBar,
    Puzzle
  },
  data() {
    return {
      id: 0,
      title: "But first...",
      puzzleState: "SOLVED",
      stickerColor: "#5cbae6",
      progress: 0,
      timeline: null,
      heroTimeline: null,
      screenHeight: null,
      isFixed: false
    };
  },
  methods: {
    init() {
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
          scrub: true,

          // markers: {
          //   startColor: "darkgreen",
          //   endColor: "purple",
          //   fontSize: "18px",
          //   fontWeight: "bold",
          //   indent: 20
          // },

          onEnter: () => {
            spinning.kill();
            cube.unspin();
            this.heroTimeline.invalidate();
          },

          onLeaveBack: () => {
            spinning = cube.spinContinuously();
          }
        }
      });
      gsap.set(cube.$el, { y: 0 });

      this.heroTimeline
        .to(
          cube.$el,
          {
            duration: 1,
            // x: "10",
            y: this.screenHeight,
            scale: 0.85,
            ease: "back.inOut"
          },
          0
        )
        .add(cube.changeColor(0xee0231), 0)
        .add(cube.spinTo(0.5, 2.5, 0), 0) // white face up
        .add(cube.spinTo("+=0", "+=3.1415", "+=0"))

        .add(cube.showOnlyCenters())
        .add(cube.spinTo("+=0", "+=3.1415", "+=0"), "<")

        .add(cube.showOnlyEdges())
        .add(cube.spinTo("+=0", "+=3.1415", "+=0"), "<")

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

      var slideTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: page,
          scrub: true,
          pin: true,
          end: "bottom+=100%",
          once: true
        }
      });

      // use a separate timeline to add a "once" flag to the slides
      slideTimeline
        .from("#intro .slide", {
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
        .set({}, {}, "+=1");
    }
  },
  mounted: function() {
    this.screenHeight = window.innerHeight;
    this.init();
  }
};
</script>

<style lang="scss" scoped>
$puzzle-size: 90vmin;
.page {
  border: 10 px solid steelblue;
}
.hero-puzzle {
  position: absolute;
  width: $puzzle-size;
  height: $puzzle-size;
  transform-origin: center center;

  top: -90vh;
  left: auto;
  right: 0;
  // border: 1px solid gold;

  // @media screen and (min-width: 25em) {
  //   top: -60vh;
  //   transform: scale(0.8);
  // }
  // @media screen and (min-width: 50em) {
  //   width: 80vmin;
  //   height: 80vmin;
  //   top: -90vh;
  //   right: auto;
  //   left: 50%;
  // }
  // @media screen and (min-width: 90em) {
  //   right: auto;
  //   transform: scale(1.2);
  // }
}

.slide {
  width: 20em;
}
</style>
