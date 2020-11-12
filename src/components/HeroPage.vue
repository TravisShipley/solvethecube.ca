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
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroPage"
};
</script>
<style lang="scss" scoped>
.title--hero {
  position: absolute;
  top: 1rem;
  // left: 1rem;
  font-size: 25vmin;
  max-width: 4em;
  margin: 0;
  text-align: left;
  line-height: 0.8;
  z-index: 100;
  // mix-blend-mode: screen;
  text-shadow: 0.3rem 0.3rem 0 rgba(255, 235, 60, 0.4),
    0.3rem -0.3rem 0 rgba(60, 141, 255, 0.4),
    -0.3rem -0.3rem 0 rgba(255, 60, 102, 0.4),
    0 0.33rem 1rem rgba(25, 41, 64, 0.25);
  @media screen and (min-width: 50em) {
    font-size: 20vmin;
  }
}

.tagline {
  position: absolute;
  bottom: 16vh;
  // left: 2rem;
  margin-top: 1em;
  text-align: left;
  line-height: 1.4;
  width: calc(100vw - 4rem);
  max-width: 13em;
  color: #221112;
  text-shadow: 0 0 32px #ebe0d9;

  .easy-steps {
    display: inline-block;
    background: #ff6565;
    border-radius: 3px;
    color: white;
    padding: 0 0.5em 0.15em 0.5em;
    text-shadow: none;
  }
  .nowrap {
    white-space: nowrap;
  }
}

section {
  background-image: linear-gradient(
    170deg,
    rgba(235, 224, 217, 1),
    rgba(235, 224, 217, 0) 70%
  );
}
</style>

<style lang="scss">
.page {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100vh;
}
</style>
