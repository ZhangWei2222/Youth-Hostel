import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.less';

Vue.use(Vant);

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
