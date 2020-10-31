<template>
  <div class="progress">
    <div class="line" :style="{ transform, backgroundColor }"></div>
  </div>
</template>

<script>
import { log } from "three";
export default {
  name: "ProgressBar",
  data() {
    return {
      timeline: null,
      completed: false
    };
  },
  props: {
    progress: { value: Number, default: 100 },
    once: { value: Boolean, default: false },
    backgroundColor: {
      value: String,
      default: "#ffffff"
    }
  },
  watch: {
    progress: function() {
      // console.log(this.progress, this.completed);
      this.completed = this.completed || this.progress > 0.99;
    }
  },
  computed: {
    transform: function() {
      // if the ONCE flag is set and has completed previously...
      let p = this.once && this.completed ? 1 : this.progress;
      return `scaleX(${p})`;
    }
  },
  methods: {
    init() {},
    createTimeline(page) {
      let runOnce = this.once;
      return gsap.timeline({
        scrollTrigger: {
          trigger: page.$el,
          scrub: true,
          pin: true,
          once: runOnce,
          onUpdate: self => {
            page.progress = self.progress;
          },
          onEnter: () => console.log(this.transform)
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
