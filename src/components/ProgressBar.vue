<template>
  <div class="progress">
    <div class="line" :style="{ transform, backgroundColor }"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  data() {
    return {
      timeline: null,
      internalProgress: null
    };
  },
  props: {
    progress: { value: Number, default: 100 },
    backgroundColor: {
      value: String,
      default: "#ffffff"
    }
  },

  computed: {
    transform: function() {
      return `scaleX(${this.progress})`;
    }
  },
  methods: {
    init() {},
    createTimeline(page) {
      console.log(page);
      return gsap.timeline({
        scrollTrigger: {
          trigger: page.$el,
          scrub: true,
          pin: true,
          // start: "top top",
          // end: "bottom+=100%",
          onUpdate: self => {
            page.progress = self.progress;
          }
        }
      });
    }
  },
  mounted() {
    console.log("THIS PROGRESS", this.progress);
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.progress {
  overflow: hidden;
  padding: 0.5rem 0;
}
.line {
  background: #fff;
  width: 100%;
  height: 0.4rem;
  transform-origin: left;
}
</style>
