<template>
  <section>
    <div class="page page--intro">
      <span class="line"></span>
      <div id="intro">
        <h2 class="title title--intro">But first...</h2>
        <h3>Let's learn a bit about how the cube works.</h3>
        <p>
          The cube has only
          <span class="highlight highlight--types">3 types of pieces...</span>
        </p>

        <p class="piece-description piece-description--corner">
          <span class="highlight highlight--corners" @click="corners"
            >Corners</span
          >
          have 3 colours. There are 8 of them and they can only be swapped with
          other corner pieces.
        </p>
        <p class="piece-description piece-description--edge">
          <span class="highlight highlight--edges" @click="edges">Edges</span>
          have only 2 colours. There are 16 edges and they only swap with other
          edges.
        </p>
        <p class="piece-description piece-description--center">
          <span class="highlight highlight--centers" @click="centers"
            >Centers</span
          >
          There are <span>6 center pieces</span>. Centers are unique because
          they are attached to the core of the cube. They can rotate but they
          never swap around. For example,
          <span>The yellow center is always opposite the white center</span>
        </p>
      </div>
      <Box />
    </div>
  </section>
</template>

<script>
import Box from "./Box";
export default {
  name: "Intro",
  components: {
    Box
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
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.page,
          // markers: true,
          pin: true, // pin the trigger element while active
          start: "top top", // when the top of the trigger hits the top of the viewport
          end: () => "+=100%",
          scrub: true
        }
      });
      tl.to(this, { ease: "none", progress: 100 });
    }
  }
};
</script>

<style lang="scss" scoped>
.page--intro {
  height: 100vh;
  background: rgb(92, 186, 230);
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

button {
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid;
  margin-bottom: 2rem;
  font-weight: bold;
  border-radius: 6px;
  margin: 0 0.5rem;
}
button:hover,
button:active,
button:focus {
  background: rgba(255, 255, 255, 0.6);
  outline: none;
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
