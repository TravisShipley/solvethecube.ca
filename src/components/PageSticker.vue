<template>
  <div
    class="page__sticker"
    :style="{ backgroundColor, left, right, transform }"
  ></div>
</template>

<script>
export default {
  name: "PageSticker",
  props: ["backgroundColor", "left", "right", "transform"]
};
</script>

<style>
.page__sticker {
  position: absolute;
  top: 0;
  width: 105vmin;
  height: 105vmin;
  background: hotpink;
  border-radius: 15vmin;
  transform: rotate(12deg);
  transform-origin: center top;
  z-index: -1;
}
</style>
