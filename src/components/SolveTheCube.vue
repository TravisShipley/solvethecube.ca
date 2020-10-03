<template>
  <div class="page page--title-page">
    <div class="page__contents">
      <h1 class="title title--main">Solve The Cube</h1>
      <h2 class="tagline">
        Learn to solve a Rubik's Cube in the next
        <span class="nowrap">45 minutes</span> with these
        <span class="easy-steps nowrap">8 easy steps.</span>
      </h2>
    </div>
    <ScrollPrompt />
  </div>
</template>

<script>
import ScrollPrompt from "./ScrollPrompt";
export default {
  name: "SolveTheCube",

  components: {
    ScrollPrompt
  }
};
</script>

<style lang="scss">
.page {
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  scroll-snap-align: start;

  &__contents {
    float: left;
    width: 100%;
    border: 1px solid orange;
  }
}
</style>

<style lang="scss" scoped>
.page--title-page {
  background-image: linear-gradient(30deg, #f6f5ef, #ebe0d9);
}
.page__contents {
  padding: 1rem;
}
.title--main {
  font-size: 4em;
  max-width: 5em;
  margin: 0;
  text-align: left;
  font-weight: 900;
  line-height: 0.8;
  text-shadow: 0 5px 16px rgba(25, 41, 64, 0.22);
  // text-shadow: 3px 3px 0 rgba(255,163,163,0.50);
  @media screen and (min-width: 900px) {
    // font-size: 120px;
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
</style>
