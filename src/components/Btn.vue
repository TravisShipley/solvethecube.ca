<template>
  <button :class="{ btnClass }">{{ label }}</button>
</template>

<script>
export default {
  name: "Btn",
  data: function() {
    return {
      label: String
    };
  }
};
</script>

<style>
.btnClass {
  padding: 1em 2em;
  color: white;
  background: rgba(21, 25, 29, 0.5);
}
</style>
