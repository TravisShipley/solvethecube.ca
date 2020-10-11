<template>
  <section class="page step">
    <div class="page__wrapper">
      <PageProgress />
      <h1 class="title title--step3"><span>3. </span>The First Layer</h1>
      <h1 class="title">4. The Second Layer</h1>
      <h1 class="title">5. The Yellow Cross</h1>
      <h1 class="title">6. The Yellow Face</h1>
      <h1 class="title">7. The Yellow Corners</h1>
      <h1 class="title">8. The Last Layer</h1>
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
