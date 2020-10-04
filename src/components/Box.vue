<template>
  <div id="box"></div>
</template>

<script>
// this import is refusing to work
// import { gsap } from "gsap";

export default {
  name: "Box",
  methods: {
    init() {
      gsap.to("#box", {
        duration: 10,
        rotation: 360
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
#box {
  width: 100px;
  height: 100px;
  background: white;
}
</style>
