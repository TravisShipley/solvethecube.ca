<template>
  <section id="step2" ref="page" class="page step">
    <div class="page__wrapper">
      <ProgressBar />
      <h1 class="title title--step2"><span>2. </span>The White Cross</h1>
      <div class="page__content"></div>
    </div>
  </section>
</template>

<script>
import ProgressBar from "./ProgressBar";

export default {
  name: "Step2",
  components: {
    ProgressBar
  }
};
</script>

<style lang="scss" scoped>
section {
  background: rgb(108, 207, 104);
}
</style>
