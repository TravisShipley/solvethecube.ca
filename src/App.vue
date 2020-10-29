<template>
  <div id="app">
    <HeroPage ref="heroPage" />
    <IntroPage ref="introPage" />
    <div class="gap"></div>
    <Step1 ref="step1" />
    <div class="gap"></div>
    <Step2 ref="step2" />
    <div class="gap"></div>
    <NotationPage ref="notation" />
    <div class="gap"></div>
    <Step3 ref="step3" />
    <NavigationMenu ref="nav" />
  </div>
</template>

<script>
// import gsap from "gsap";

import HeroPage from "./components/HeroPage";
import IntroPage from "./components/IntroPage";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import NotationPage from "./components/NotationPage";
import NavigationMenu from "./components/NavigationMenu";
import Step3 from "./components/Step3";

export default {
  name: "App",
  components: {
    HeroPage,
    IntroPage,
    Step1,
    Step2,
    NotationPage,
    NavigationMenu,
    Step3
  },
  data() {
    return {
      timeline: null
    };
  },
  computed: {},
  methods: {
    init() {
      console.log("App initialized", this.showNav);
      const nav = this.$refs.nav.$el;
      const intro = this.$refs.introPage.$el;

      // if we're scrolled to the top of the page set the state of the nav
      gsap.set(".nav__item", { alpha: 0, x: -30 });

      let tl = gsap.timeline({
        // yes, we can add it to an entire timeline!
        scrollTrigger: {
          trigger: this.$refs.introPage.$el,
          start: "top-=200 top", // when the top of the trigger hits the top of the viewport
          end: "+=400", // end after scrolling 500px beyond the start
          scrub: 0.2, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
          markers: true
        }
      });

      tl.add(
        gsap.to(nav, {
          marginTop: 0,
          ease: "power1.inOut"
        }),
        0
      ).add(
        gsap.to(".nav__item", {
          // duration: 1.2,
          x: 0,
          alpha: 1,
          stagger: 0.2,
          ease: "back.out"
        }),
        0
      );
    },
    revealNav() {
      console.log("NAVIGATION REVEALED");
    },
    hideNav() {
      navTl.to(nav, {
        duration: 0.5,
        alpha: 0
      });
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.gap {
  height: 20vh;
  width: 100vw;
}
</style>
