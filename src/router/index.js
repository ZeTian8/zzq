import Vue from 'vue'
import VueRouter from 'vue-router'
//因为store是挂载到vue实例上的，js文件需要引入才能使用
import store from "@/store/index";
// import { component } from 'vue/types/umd';

//引入进度条并调用
import useNProgress   from "../hooks/useNProgress";
const NProgress=useNProgress();

Vue.use(VueRouter)

// import HomeView from "../views/HomeView.vue";
// import Menu from "../Main/XT/Menu.vue";

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: () => import(/* webpackChunkName: "LoginView" */ '../views/LoginView.vue'),
  },
  {
    path: '/',
    name: 'HomeView',
    redirect:'/home',
    // component:HomeView,
    component: () => import(/* webpackChunkName: "HomeView" */ '../views/HomeView.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        // redirect:'/home',
        component: () => import(/* webpackChunkName: "Home" */ '../components/Home.vue'),
      },
      {
        path: 'menu',//菜单管理
        name: 'menu',
        component: () => import(/* webpackChunkName: "Menu" */ '../Main/XT/Menu.vue'),
        // children:[
        //   {
        //     path:'menudren',
        //     name:'menudren',
        //     component:()=>import(/* webpackChunkName: "Menu" */ '../Main/XtContent/Menudren.vue'),
        //   }
        // ]
      },
      {
        path: 'role',//角色管理
        name: 'role',
        component: () => import(/* webpackChunkName: "Role" */ '../Main/XT/Role.vue'),
      },
      {
        path: 'admin',//管理员管理
        name: 'admin',
        component: () => import(/* webpackChunkName: "Admin" */ '../Main/XT/Admin.vue'),
      },
      {
        path: 'category',//商品分类
        name: 'category',
        component: () => import(/* webpackChunkName: "Category" */ '../Main/XT/Category.vue'),
      },
      {
        path: 'specs',//商品规格
        name: 'specs',
        component: () => import(/* webpackChunkName: "Specs" */ '../Main/XT/Specs.vue'),
      },
      {
        path: 'goods',//商品管理
        name: 'goods',
        component: () => import(/* webpackChunkName: "Goods" */ '../Main/XT/Goods.vue'),
      },
      {
        path: 'member',//会员管理
        name: 'member',
        component: () => import(/* webpackChunkName: "Member" */ '../Main/XT/Member.vue'),
      },
      {
        path: 'banner',//轮播图管理
        name: 'banner',
        component: () => import(/* webpackChunkName: "Banner" */ '../Main/XT/Banner.vue'),
      },
      {
        path: 'seckill',//秒杀活动
        name: 'seckill',
        component: () => import(/* webpackChunkName: "Seckill" */ '../Main/XT/Seckill.vue'),
      },
    ]
  },
 
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //打开页面开启进度条
  NProgress.start();
  const isLogin = store.state.userLogin.isLogin
  // console.log(isLogin);
  if (to.path !== "/" && !isLogin) {
    next({ path: "/" })
  } else {
    next();
  }
})

router.afterEach(()=>{
  //关闭进度条
  NProgress.done();
})

export default router
