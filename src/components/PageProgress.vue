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
      progress: 84
    };
  },
  computed: {
    style: function() {
      return `width:${this.progress}%`;
    },
    endHeight: function() {
      return `+=${this.height}`;
    }
  },
  methods: {
    init() {
      console.log("PageProgress init");
      //   let tl = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: this.$parent.$el,
      //       // markers: true,
      //       pin: true, // pin the trigger element while active
      //       start: "top top", // when the top of the trigger hits the top of the viewport
      //       end: this.endHeight,
      //       scrub: true
      //     }
      //   });
      //   tl.to(this, { ease: "none", progress: 100 });
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
  padding-top: 0.5rem;
  padding: 0.5rem 1rem;
}
.line {
  background: #fff;
  height: 0.4rem;
}
</style>
