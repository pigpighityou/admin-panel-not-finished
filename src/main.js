import "./assets/main.css";

import { createApp } from "vue";
import { provide } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import { getAntDvModules } from "@/assets/antdv";
import "ant-design-vue/dist/reset.css";

import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/store";

import "./api/mock.js";
import api from "@/api/api";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 路由守卫
router.beforeEach((to, from, next) => {
  store.commit("getToken");
  const token = store.state.token;
  // 没有token必须返回登录页
  if (!token && to.name !== "Login") {
    next({ name: "Login" });
  }
  // 胡乱输不存在的路由将返回首页
  else if (!router.getRoutes().filter((r) => r.path === to.path).length) {
    next({ name: "home" });
  }
  // 有token后页面之间可以正常跳转
  else {
    next();
  }
});

app.use(store);
app.use(router);
app.use(ElementPlus);
getAntDvModules(app);

app.config.globalProperties.$api = api;
app.provide("$api", api);

app.mount("#app");
