<template>
  <div class="scroll-prompt">
    <div>SCROLL DOWN</div>
    <div>^</div>
  </div>
</template>

<script>

export default {
  name: "ScrollPrompt"
};
</script>

<style lang="scss" scoped>
.scroll-prompt {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-bottom: 2em;

  font-weight: bold;
  text-align: center;

  color: #ff6565;
}
</style>
