import "./assets/main.css";

import { createApp } from "vue";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'





import { getAntDvModules } from "@/assets/antdv";
import "ant-design-vue/dist/reset.css";

import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/store";

const app = createApp(App);


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(store)
app.use(router);
app.use(ElementPlus);
getAntDvModules(app);

app.mount("#app");
