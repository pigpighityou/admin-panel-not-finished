import { createStore } from "vuex";
import Cookie from "js-cookie";
import storageUtils from "@/utils/localStorage";

const store = createStore({
  state() {
    return {
      /*
       *
       *     antdesign在items里自带了item对象，可以读取每个item的信息，
       *     以下是从item对象得出来的一些信息
       *
       *  */
      hasChild: false /* 初始值 */,
      itemMainTitle: "用户管理" /* 初始值 */,
      itemSubTitle: "用户管理" /* 初始值 */,
      itemTitle: "用户管理" /* 初始值 */,
      item: "",

      /*
       *        tag相关数据配置
       * */
      tags: [
        {
          path: "/",
          name: "home",
          label: "首页",
        },
      ],

      tagName: "",
      delTagName: "",
      /*
       *     菜单相关数据配置
       * */

      // menu的数据持久化
      menu: storageUtils.LocalStoreGetter("menu") || [],

      //  token
      token: "",
    };
  },
  getters: {},
  mutations: {
    setMenu(state, val) {
      state.menu = val;
      storageUtils.LocalStoreSetter("menu", val);
    },
    cleanMenu(state) {
      state.menu = [];
      storageUtils.LocalStoreRemove("menu");
    },

    /*
     *  token
     */
    setToken(state, val) {
      state.token = val;
      // 本地存储token
      Cookie.set("token", val);
    },
    cleanToken(state) {
      state.token = "";
      // 清除本地存储token
      Cookie.remove("token");
    },
    getToken(state) {
      //  本地获取token
      state.token = state.token || Cookie.get("token");
    },
  },
  actions: {},
});

export default store;
