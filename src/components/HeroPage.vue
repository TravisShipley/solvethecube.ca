<template>
  <section class="page page--hero-page">
    <div class="page__wrapper">
      <div class="page__contents">
        <h1 class="title title--hero">Solve The Cube</h1>
        <h2 class="tagline z-100">
          <span>Learn to solve a Rubik's Cube in the next&nbsp;</span>
          <span class="nowrap">30 minutes&nbsp;</span
          ><span>with these&nbsp;</span>
          <span class="easy-steps nowrap">8 easy steps.</span>
        </h2>
      </div>
      <!-- <ScrollPrompt /> -->
    </div>
  </section>
</template>

<script>
import ScrollPrompt from "./ScrollPrompt";
export default {
  name: "HeroPage",

  components: {
    // ScrollPrompt
  }
};
</script>

<style lang="scss" scoped>
.title--hero {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 25vmin;
  max-width: 4em;
  margin: 0;
  text-align: left;
  font-weight: 900;
  line-height: 0.8;
  background: none;
  z-index: 100;
  mix-blend-mode: overlay;
  text-shadow: 0 0.33rem 1rem rgba(25, 41, 64, 1);
  @media screen and (min-width: 50em) {
    font-size: 20vmin;
  }
}

.tagline {
  position: absolute;
  bottom: 5rem;
  left: 2rem;
  margin-top: 1em;
  text-align: left;
  line-height: 1.4;
  width: calc(100vw - 4rem);
  max-width: 13em;
  color: #221112;
  span {
    background: rgba(241, 237, 232, 0.356);
    background: rgba(255, 225, 197, 0.568);
    background: #f6f5ef79;
  }

  .easy-steps {
    display: inline-block;
    background: #ff6565;
    border-radius: 3px;
    color: white;
    padding: 0 0.5em 0.15em 0.5em;
  }
  .nowrap {
    white-space: nowrap;
  }
}

section {
  // width: 100vw;
  // height: 100vh;
  background-image: linear-gradient(30deg, #f6f5ef, #ebe0d9);
}
</style>
