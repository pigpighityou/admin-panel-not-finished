import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";

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
// 需要在dom加载完后再进行跳转，否则会出现路由改了，但是页面没改的现象
window.addEventListener("load", () => {
  nextTick(()=>{
    router.push("/");
  })
}); 


export default router;
