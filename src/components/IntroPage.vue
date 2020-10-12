<template>
  <section class="page page--intro-page">
    <div class="page__wrapper">
      <ProgressBar />
      <h1 class="title title--intro">But first...</h1>
      <div class="page__content">
        <div class="slide">
          <h3>
            Let's learn a bit about how the cube works.
          </h3>
        </div>
        <p>
          There are 6 faces on the cube and each face is made up of
          <span class="nowrap bold">
            3 types of pieces.
          </span>
        </p>

        <h4>
          <HighlightedText>
            Corners
          </HighlightedText>
        </h4>
        <p class="piece-description piece-description--corner">
          These have 3 colours. There are 8 of them and they can only be swapped
          with other corner pieces.
        </p>
        <h4>
          <HighlightedText>
            Edges
          </HighlightedText>
        </h4>
        <p class="piece-description piece-description--edge">
          There are only 2 colours on each edge. There are 16 edges and they
          only swap with other edges.
        </p>
        <h4>
          <HighlightedText>
            Centers
          </HighlightedText>
        </h4>
        <p class="piece-description piece-description--center">
          There are <span>6 center pieces</span>. Centers are unique because
          they are attached to the core of the cube. They can rotate but they
          never swap around. For example,
          <span>The yellow center is always opposite the white center</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import ProgressBar from "./ProgressBar";
import HighlightedText from "./HighlightedText";

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

var IntroPage = {
  name: "IntroPage",
  components: {
    HighlightedText,
    ProgressBar
  },
  data() {
    return {
      cornerDescription: ""
    };
  },
  methods: {
    corners: function() {
      console.log("corners");
    },
    edges: function() {
      console.log("edges");
    },
    centers: function() {
      console.log("centers");
    },
    init() {
      console.log("introPage innit?");

      gsap.from(".page__content", {
        scrollTrigger: {
          trigger: ".page__content",
          start: "top bottom-=200px",
          toggleActions: "play none none reverse"
        },
        x: "-200",
        opacity: 0
      });
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
</style>
