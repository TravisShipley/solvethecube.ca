<template>
  <div class="progress">
    <div class="line" :style="{ transform }"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",

  props: {
    progress: Number
  },

  computed: {
    transform: function() {
      return `scaleX(${this.progress})`;
    }
  },
  methods: {
    init() {
      console.log("ProgressBar init");
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
