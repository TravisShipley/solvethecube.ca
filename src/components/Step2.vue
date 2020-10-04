<template>
  <section ref="page" id="step2">
    <div class="page page--step2">
      <h2 class="title title--step2"><span>2.</span> The White Cross</h2>
      <PageProgress :progress="progress" />
    </div>
  </section>
</template>

<script>
//
// import gsap from "gsap";
import PageProgress from "./PageProgress";

export default {
  name: "Step2",
  components: {
    PageProgress
  },
  data: function() {
    return {
      progress: 0
    };
  },
  methods: {
    init() {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.page,
          markers: true,
          pin: true, // pin the trigger element while active
          start: "top top", // when the top of the trigger hits the top of the viewport
          end: () => "+=100vh",
          scrub: true
        }
      });
      tl.to(this, { ease: "none", progress: 100 });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.page--step2 {
  background: rgb(108, 207, 104);
}
</style>
