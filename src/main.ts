// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

/* eslint-disable no-new */
export default new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
