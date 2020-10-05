<template>
  <section>
    <div class="page page--step2">
      <PageProgress />
      <h2 class="title title--step2"><span>2.</span> The White Cross</h2>
      <div class="page__content"></div>
    </div>
  </section>
</template>

<script>
import PageProgress from "./PageProgress";

export default {
  name: "Step2",
  components: {
    PageProgress
  }
};
</script>

<style lang="scss" scoped>
section {
  background: rgb(108, 207, 104);
}
</style>
