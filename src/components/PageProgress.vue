<template>
  <div class="progress" :style="style">
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "PageProgress",
  props: {
    height: {
      value: String,
      default: "100%"
    }
  },
  data() {
    return {
      progress: 0
    };
  },
  computed: {
    style: function() {
      let p = "width: " + this.progress + "%";
      return p;
    },
    endHeight: function() {
      return "+=" + this.height;
    }
  },
  methods: {
    init() {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.$parent.$el,
          // markers: true,
          pin: true, // pin the trigger element while active
          start: "top top", // when the top of the trigger hits the top of the viewport
          end: this.endHeight,
          scrub: 0.1
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
.progress {
  overflow: hidden;
}
.line {
  background: #fff;
  height: 0.33em;
}
</style>
