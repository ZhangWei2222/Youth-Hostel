import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";

const views: any = require['context']('../views', true, /\.vue$/im);

const modules: any = {}

function getFloorConfigName(path): any {
  return path.match(/([\w-]+)\.vue/)[1];
} //([\w-]+) ： 匹配数字和字母下划线，中划线的多个字符

views.keys().forEach(key => {
  modules[getFloorConfigName(key)] = views(key).default || views(key)
})

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: '/home',
    },
    {
      path: '/home',
      component: modules['HomePage']
    },
    {
      path: '/order',
      component: modules['Order']
    },
    {
      path: '/owner',
      component: modules['Owner']
    },
    {
      path: '/info',
      component: modules['Info']
    },
    {
      path: '/comment',
      component: modules['Comment']
    },
    {
      path: '/singin',
      component: modules['SingIn']
    },
    {
      path: '/singup',
      component: modules['SingUp']
    }

  ]
});
