<template>
  <section id="intro" ref="page" class="page page--intro-page">
    <PageSticker :background-color="stickerColor" />
    <div class="page__wrapper">
      <h1 class="title title--intro slide">But first...</h1>
      <ProgressBar :progress="progress" />
      <div class="page__content">
        <h2 class="slide">
          Let's learn a bit about how the cube works.
        </h2>
        <div class="centers slide">
          <h3>
            <HighlightedText>
              Centers
            </HighlightedText>
          </h3>
          <p class="piece-description piece-description--center">
            The 6 center pieces are attached to the core of the cube. They can
            rotate but they <b>never move</b>. This means that
            <b>the yellow face is always opposite the white face.</b>
          </p>
        </div>

        <div class="edges slide">
          <h3>
            <HighlightedText>
              Edges
            </HighlightedText>
          </h3>
          <p class="piece-description piece-description--edge">
            The cube has 12 edge pieces. Each of these has only have 2 colours,
            but there are more of them than any other piece.
          </p>
        </div>

        <div class="corners slide">
          <h3>
            <HighlightedText>
              Corners
            </HighlightedText>
          </h3>
          <p class="piece-description piece-description--corner">
            Only the top and bottom layer have corner pieces, and each one has
            either a yellow sticker or a white sticker. We can think of them as
            the
            <b>yellow corners</b> and the <b>white corners.</b>
          </p>
        </div>
      </div>
    </div>
    <Puzzle
      ref="heroPuzzle"
      class="hero-puzzle"
      :sphere="true"
      :state="puzzleState"
      :scrollDirection="scrollDirection"
      v-if="visible"
    />
  </section>
</template>

<script>
import PageSticker from "./PageSticker";
import ProgressBar from "./ProgressBar";
import HighlightedText from "./HighlightedText";
import Puzzle from "./Puzzle";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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
      scrollDirection: 1,
      stickerColor: "#5cbae6",
      progress: 0,
      timeline: null,
      heroTimeline: null,
      screenHeight: null,
      visible: true,
      isFixed: false
    };
  },
  methods: {
    init() {
      const cube = this.$refs.heroPuzzle;
      const page = this.$refs.page;

      let spinning = cube.spinContinuously();

      // Create the timeline for the hero cube
      this.heroTimeline = gsap.timeline({
        // defaults: {
        duration: 10,
        // },

        scrollTrigger: {
          trigger: "#app",
          endTrigger: page,
          start: "top+=10px top",
          end: "bottom+=100%",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: self => {
            this.scrollDirection = self.direction;
          },
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

      // let the hero cube know about the scrolltrigger
      this.puzzleScrollTrigger = this.heroTimeline.scrollTrigger;

      cube.prepare("F' U2 R D' L2 U R' U'");

      gsap.set(cube.$el, { y: 0 });

      this.heroTimeline
        .fromTo(
          cube.$el,
          {
            y: 0,
            // scale: 1.2,
            ease: "back.inOut"
          },
          {
            duration: 3,
            // x: "10",
            y: this.screenHeight,
            scale: 0.85,
            ease: "back.inOut"
          },
          0
        )
        .add(cube.spinTo(0.25, 0.4, 0).duration(3), 0) // white face up
        .add(cube.spinTo("+=0", "+=10", "+=0").duration(7), ">") // spin the cube until the end of the page
        .add(cube.reverseTimeline().duration(3), 0.2)
        .add(cube.performMoves("U2 U2 F2 F2 B2 B2 U2 U2").duration(6), ">+1")

        .call(cube.showAll, null, 3.999)
        .call(cube.showOnlyCenters, null, 4)
        .call(cube.showOnlyCenters, null, 5.999)
        .call(cube.showOnlyEdges, null, 6)

        .call(cube.showOnlyEdges, null, 7.999)
        .call(cube.showOnlyCorners, null, 8)
        .call(cube.showOnlyCorners, null, 9.999)
        .call(cube.showAll, null, 10);

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

      let appearTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#intro",
          start: "top bottom",
          end: "center center",
          // once: true,
          // markers: true,
          scrub: 0.2
        }
      });

      appearTimeline.add(
        gsap.from("#intro .slide", {
          duration: 2,
          y: function(index) {
            return 30 * (index + 1);
          },
          alpha: 0,
          ease: "power3.inOut",
          stagger: {
            each: 0.2,
            delay: function(index) {
              return 2 * index;
            }
          }
        })
      );
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
