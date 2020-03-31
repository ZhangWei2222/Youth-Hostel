import Vue from "vue";
import Router from "vue-router";
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
import cookie from 'js-cookie'

const views: any = require['context']('../views', true, /\.vue$/im);

const modules: any = {}

function getFloorConfigName(path): any {
  return path.match(/([\w-]+)\.vue/)[1];
} //([\w-]+) ： 匹配数字和字母下划线，中划线的多个字符

views.keys().forEach(key => {
  modules[getFloorConfigName(key)] = views(key).default || views(key)
})

Vue.use(Router);

const router = new Router({
  mode: 'hash',
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
      path: '/orderlist',
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
      component: modules['Info'],
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/my-comment',
      name: 'MyComment',
      component: modules['MyComment'],
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: modules['SignIn']
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: modules['SignUp']
    },
    {
      path: '/search',
      name: 'Search',
      component: modules['Search']
    },
    {
      path: '/roomdetails',
      name: 'RoomDetails',
      component: modules['RoomDetails'],
      meta: {
        child: true
      }
    },
    {
      path: '/landlord',
      name: 'Landlord',
      component: modules['Landlord'],
      meta: {
        child: true
      }
    },
    {
      path: '/room-comment',
      name: 'RoomComment',
      component: modules['RoomComment'],
      meta: {
        child: true
      }
    },
    {
      path: '/submit-order',
      name: 'SubmitOrder',
      component: modules['SubmitOrder'],
      meta: {
        child: true,
        requireAuth: true
      }
    },
    {
      path: '/order-detail',
      name: 'OrderDetail',
      component: modules['OrderDetail']
    },
    {
      path: '/order-success',
      name: 'OrderSuccess',
      component: modules['OrderSuccess']
    }, {
      path: '/order-comment',
      name: 'OrderComment',
      component: modules['OrderComment']
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
});


router.beforeEach((to, from, next) => {
  let token = cookie.get('assent_token');

  if (to.meta.requireAuth) {
    if (token) {
      next();
    } else {
      next({
        path: '/signIn',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();//如果无需token,那么随它去吧
  }
});

export default router