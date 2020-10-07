<template>
  <section>
    <div class="page page--step3">
      <PageProgress :height="'50%'" />
      <h1 class="title title--step3"><span>3. </span>The Bottom Layer</h1>
      <div class="page__content"></div>
    </div>
  </section>
</template>

<script>
import PageProgress from "./PageProgress";

export default {
  name: "Step3",
  components: {
    PageProgress
  },
  methods: {
    init() {
      console.log("initialized");
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  background: rgb(180, 100, 255);
}
</style>
