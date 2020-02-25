import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//引入布局组件
import Layout from "@/views/Layout/index.vue";
const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: "true",
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "login",
    hidden: "true",
    meta: {
      name: "登录"
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Consloe",
    meta: {
      name: "控制台",
      icon: "console"
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "主页"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  /*信息管理 */
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "message"
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "Infoindex",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "Infocategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/Info/category.vue")
      }
    ]
  },
  /*用户管理 */
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "user"
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "Userindex",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
