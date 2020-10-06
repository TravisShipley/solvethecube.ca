<template>
  <section>
    <div class="page page--intro">
      <PageProgress />
      <div class="page__content">
        <div class="slide">
          <h1 class="title title--intro">But first...</h1>
          <h3>
            It's helpful to know a little bit about how the cube actually works.
          </h3>
        </div>
        <p>
          The cube has only
          <span class="highlight highlight--types">3 types of pieces...</span>
        </p>

        <h4 class="highlight highlight--corners">Corners</h4>
        <p class="piece-description piece-description--corner">
          These have 3 colours. There are 8 of them and they can only be swapped
          with other corner pieces.
        </p>
        <h4 class="highlight highlight--edges">Edges</h4>
        <p class="piece-description piece-description--edge">
          have only 2 colours. There are 16 edges and they only swap with other
          edges.
        </p>
        <h4 class="highlight highlight--centers">Centers</h4>
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
import PageProgress from "./PageProgress";

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

var IntroPage = {
  name: "IntroPage",
  components: {
    PageProgress
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
      // let tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: this,
      //     // markers: true,
      //     pin: true, // pin the trigger element while active
      //     start: "top top", // when the top of the trigger hits the top of the viewport
      //     end: () => "+=100%",
      //     scrub: true
      //   }
      // });
      // tl.to(this, { ease: "none", progress: 100 });
    }
  }
};

export default IntroPage;
</script>

<style lang="scss" scoped>
section {
  background: rgb(92, 186, 230);
}
.piece-description {
  span {
    font-weight: bold;
    // font-size: 1.1em;
    // background: rgba(255, 255, 255, 0.596);
    // padding: 0 0.1em 0.1em 0.1em;
  }
}
</style>
