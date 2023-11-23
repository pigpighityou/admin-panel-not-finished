import "./assets/main.css";

import { createApp } from "vue";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'

import { getAntDvModules } from "@/assets/antdv";
import "ant-design-vue/dist/reset.css";

import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/store";

const app = createApp(App);

app.use(store)
app.use(router);
app.use(ElementPlus);
getAntDvModules(app);

app.mount("#app");
