import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        components: {
          default: () => import("@/pages/Home/home.vue"),
        },
        children: [
          /*
           *     管理系统路由
           * */
          {
            path: "/page1",
            name: "Page1",
            components: {
              default: () => import("@/pages/Page/page1.vue"),
            },
          },
          {
            path: "/page2",
            name: "Page2",
            components: {
              default: () => import("@/pages/Page/page2.vue"),
            },
          },
          {
            path: "/category",
            name: "Category",
            components: {
              default: () => import("@/Manager/category.vue"),
            },
          },
          {
            path: "/other",
            name: "Other",
            components: {
              default: () => import("@/Manager/other.vue"),
            },
          },

          /*
           *
           *      测试或未更新路由
           * */

          {
            path: "/Option-2",
            name: "Option-2",
            components: {
              default: () => import("@/pages/Option/Option-2.vue"),
            },
          },
          {
            path: "/Option-3",
            name: "Option-3",
            components: {
              default: () => import("@/pages/Option/Option-3.vue"),
            },
          },
          {
            path: "/Option-4",
            name: "Option-4",
            components: {
              default: () => import("@/pages/Option/Option-3.vue"),
            },
          },
          {
            path: "/Option-5",
            name: "Option-5",
            components: {
              default: () => import("@/pages/Option/Option-3.vue"),
            },
          },
          {
            path: "/Option-6",
            name: "Option-6",
            components: {
              default: () => import("@/pages/Option/Option-3.vue"),
            },
          },
          {
            path: "/Option-7",
            name: "Option-7",
            components: {
              default: () => import("@/pages/Option/Option-3.vue"),
            },
          },
        ],
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    components: {
      default: () => import("@/pages/User/user.vue"),
    },
  },
  {
    path: "/login",
    name: "Login",
    components: {
      default: () => import("@/pages/Login/login.vue"),
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 奇怪现象：页面刷新，路由不变，这会导致问题，需要刷新页面后，页面回到首页
/* window.addEventListener("load", () => {
  router.push("/");
}); */


export default router;
