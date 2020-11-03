<template>
  <nav class="nav">
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        class="nav__item"
        :class="[item.id == 'step2' ? 'active' : 'not-active']"
      >
        <a :href="'#' + item.id">{{ item.value }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavigationMenu",
  data() {
    return {
      items: [
        { id: "intro", value: "Intro." },
        { id: "step1", value: "Step 1." },
        { id: "step2", value: "Step 2." },
        { id: "notation", value: "Notation." },
        { id: "step3", value: "Step 3." },
        { id: "step4", value: "Step 4." },
        { id: "step5", value: "Step 5." },
        { id: "step6", value: "Step 6." },
        { id: "step7", value: "Step 7." },
        { id: "step8", value: "Step 8." },
        { id: "examples", value: "Menu." },
        { id: "cheatsheet", value: "Still." },
        { id: "credits", value: "Useless." }
      ]
    };
  },
  props: { activePage: { value: String, default: "Step2" } }
};
</script>

<style lang="scss" scoped>
@import "../css/variables";
.nav {
  position: fixed;
  display: none;
  align-items: center;
  font-size: 0.9em;
  font-family: "Montserrat";
  line-height: 2em;
  height: 100%;
  top: 0;
  left: 0;
  @media screen and (min-width: $bp-lg) {
    display: flex;
  }
}
ul {
  list-style-type: none;
  text-align: right;
  margin-top: -2em;
}

li.active a {
  color: #121212;
  font-weight: 900;
  border-bottom: 0.4em solid rgb(12, 12, 12); // per page highlighting
  // font-size: 1.1em;
  line-height: 1.2;
  border-radius: 0;
  margin-bottom: 0.3em;
  margin-right: -0.5em;
}

a {
  display: inline-block;
  color: hsla(0, 0%, 7%, 0.6);
  padding: 0.1em 0.4em;
  margin-right: -0.4em;
  border-radius: 0.2em;
  transition: all 200ms ease;
}
li:not(.active) {
  a:hover,
  a:active,
  a:focus {
    // text-decoration: underline;
    background-color: rgba(255, 255, 255, 0.5);
    color: #121212;
  }
}
</style>
