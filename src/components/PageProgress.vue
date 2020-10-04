<template>
  <div class="progress" :style="style">
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "PageProgress",
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style() {
      let p = "width: " + this.progress + "%";
      console.log(p);
      return p;
    }
  }
};
</script>

<style lang="scss" scoped>
.progress {
  overflow: hidden;
}
.line {
  background: #fff;
  height: 10px;
}
</style>
