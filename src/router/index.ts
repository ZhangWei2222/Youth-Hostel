import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import HomePage from '@/views/HomePage.vue'
import Order from '@/views/order/index.vue'
import Owner from '@/views/owner/index.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: '/home',
    },
    {
      path: '/home',
      component: HomePage
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/owner',
      component: Owner
    }

  ]
});
