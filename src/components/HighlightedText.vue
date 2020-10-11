<template>
  <span class="highlight">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "HighlightedText",
  props: {
    text: String
  }
};
</script>

<style lang="scss">
.highlight {
  position: relative;
  display: inline-block;
  color: black;
  white-space: nowrap;
}

.highlight:before {
  content: "";
  overflow: hidden;
  position: absolute;
  height: 115%;
  z-index: -1;
  width: calc(100% + 1em);
  color: white;
  background: gold;
  transform: skewX(-10deg);
  margin-left: -0.5em;
  border-radius: 5px;
  // transition: width 300ms ease-in-out, padding 100ms, margin 100ms;
}
</style>
