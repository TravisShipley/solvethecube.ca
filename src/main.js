import Vue from "vue";
import App from "./App.vue";

import "normalize.css";
import "./css/main.scss";

Vue.config.devtools = true;
Vue.config.productionTip = true;

export const bus = new Vue();

new Vue({
  render: h => h(App)
}).$mount("#app");
