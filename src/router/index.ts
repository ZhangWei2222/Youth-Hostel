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
      name: 'HomePage',
      component: modules['HomePage']
    },
    {
      path: '/order',
      name: 'Order',
      component: modules['Order']
    },
    {
      path: '/owner',
      name: 'Owner',
      component: modules['Owner']
    },
    {
      path: '/info',
      name: 'Info',
      component: modules['Info']
    },
    {
      path: '/comment',
      name: 'Comment',
      component: modules['Comment']
    },
    {
      path: '/singin',
      name: 'SingIn',
      component: modules['SingIn']
    },
    {
      path: '/singup',
      name: 'SingUp',
      component: modules['SingUp']
    },
    {
      path: '/search',
      name: 'Search',
      component: modules['Search']
    },
    {
      path: '/roomdetails',
      name: 'RoomDetails',
      component: modules['RoomDetails']
    },
    {
      path: '/landlord',
      name: 'Landlord',
      component: modules['Landlord']
    }

  ]
});
