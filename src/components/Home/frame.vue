<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <div>
          <el-icon class="user-icon" :class="{ triggerIcon: collapsed }"
            ><UserFilled
          /></el-icon>
          <span v-if="collapsed === false">通用后台管理系统</span>
        </div>
      </div>
      <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="state.collapsed"
        :items="items"
        @click="clickHandler"
      ></a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <!-- 菜单折叠的图标 -->
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />

        <!-- 标签 -->

        <a-breadcrumb
          :style="{
            margin: '5px 35px',
            color: 'black',
            display: 'inline-block',
          }"
        >
          <a-breadcrumb-item>{{ store.state.itemMainTitle }}</a-breadcrumb-item>
          <a-breadcrumb-item v-if="store.state.hasChild === true">{{
            store.state.itemSubTitle
          }}</a-breadcrumb-item>
        </a-breadcrumb>

        <!-- 头部右侧的下拉菜单操作 -->
        <a-dropdown class="avatar">
          <a class="ant-dropdown-link" @click.prevent>
            <el-avatar
              class="avatar"
              @click="avatarHandler"
              src="https://s2.loli.net/2022/02/21/wRltb4a2cXoPhCk.jpg"
            >
            </el-avatar>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.alipay.com/"
                >
                  1st menu item
                </a>
              </a-menu-item>
              <a-menu-item key="1">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.taobao.com/"
                >
                  2nd menu item
                </a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">3rd menu item（disabled）</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-breadcrumb
        :style="{
          margin: '20px 35px',
          color: 'black',
        }"
      >
        <TabList></TabList>
      </a-breadcrumb>
      <a-layout-content
        :style="{
          margin: '0px 30px',
          padding: '20px',
          background: '#fff',
          minHeight: '100vw',
        }"
      >
        <!-- frame里的body在此 -->
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Body from "@/components/Home/body.vue";
import TabList from "@/components/Other/tabList.vue";
import { ref, watchEffect, watch, reactive, h, nextTick } from "vue";
import store from "@/store/store.js";
import { useRoute, useRouter } from "vue-router";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  ToolFilled,
} from "@ant-design/icons-vue";
const collapsed = ref(false);
const router = useRouter();
const route = useRoute();

const state = reactive({
  collapsed: false,
  selectedKeys: ["1"],
  openKeys: [],
  preOpenKeys: [],
});

// 监听openKeys的变化，使用oldval改变preOpenKeys的值
watch(
  () => state.openKeys,
  (newVal, oldVal) => {
    state.preOpenKeys = oldVal;
    /* console.log(event.target.innerText); */
  }
);

// 配置菜单项
const items = reactive([
  {
    key: "1",
    icon: () => h(DesktopOutlined),
    label: "用户管理",
    title: "用户管理",
  },
  {
    key: "2",
    icon: () => h(PieChartOutlined),
    label: "Option 2",
    title: "Option 2",
  },
  {
    key: "3",
    icon: () => h(InboxOutlined),
    label: "Option 3",
    title: "Option 3",
  },
  {
    key: "Navigation One",
    icon: () => h(MailOutlined),
    label: "Navigation One",
    title: "Navigation One",
    children: [
      {
        key: "4",
        label: "Option 4",
        title: "Option 4",
      },
      {
        key: "5",
        label: "Option 5",
        title: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
        title: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
        title: "Option 7",
      },
    ],
  },
  {
    key: "设置",
    icon: () => h(ToolFilled),
    label: "设置",
    title: "设置",
    children: [
      {
        key: "8",
        label: "page1",
        title: "page1",
      },
      {
        key: "9",
        label: "page2",
        title: "page2",
      },
    ],
  },
]);

// 配置

// 初始化itemLabel的值
const itemLabel = ref(items[0].label);

// 监听tagname的变化，改变selectedKeys的值
watch(
  () => store.state.tagName,
  (newVal, oldVal) => {
   /*  console.log("tagname:", newVal); */
    items.forEach((item) => {
      if (item.label === newVal) {
        state.selectedKeys = [item.key];
      } else if (item.children) {
        /* 这里的item.children是传自身值用的 */
        item.children.forEach((child) => {
          if (child.label === newVal) {
            state.selectedKeys = [child.key];
          }
        });
      } else if (newVal === "home") {
        state.selectedKeys = ["1"];
      }
    });
  }
);

// 监听selectedKeys的变化，改变itemMainTitle和itemSubTitle的值,
// 还需改变hasChild的值
watch(
  () => state.selectedKeys,
  (newVal, oldVal) => {
    items.forEach((item) => {
      if (item.key === newVal[0]) {
        store.state.itemMainTitle = item.title;
        store.state.itemSubTitle = item.title;
        if (item.children) {
          store.state.hasChild = true;
        } else {
          store.state.hasChild = false;
        }
      } else if (item.children) {
        item.children.forEach((child) => {
          if (child.key === newVal[0]) {
            store.state.itemMainTitle = item.title;
            store.state.itemSubTitle = child.title;
            store.state.hasChild = true;
          }
        });
      }
    });
  }
);


// 点击菜单后执行的路由操作
const clickHandler = (item) => {
  /*  router.push(event.key); */
  //dom更新完后再执行，否则会在异步执行前获得老值，造成新值变老值的情况
  nextTick(() => {
    store.state.item = item;
    console.log(item.item.title);
    /*  console.log(item); */
    store.state.itemTitle = item.item.title;
    store.state.itemMainTitle = item.item.title;

    if (item.keyPath.length > 1) {
      store.state.hasChild = true;
      /*  console.log(item.keyPath); */
      store.state.itemMainTitle = item.keyPath[0];
      store.state.itemSubTitle = item.item.title;
      /*  console.log('有子元素'); */
    } else {
      store.state.hasChild = false;
      /*  console.log('没有子元素'); */
    }

    // 如果点击的是首页，就不执行跳转
    if (item.item.title != "用户管理") {
      //  需要去掉item.item.title里的空格
      let routerName = item.item.title.replace(" ", "-");
      router.push(`/${routerName}`);
    } else {
      router.push(`/`);
    }
  });
};

// 点击头像后执行的操作
const avatarHandler = () => {
  console.log(123);
};
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 10px;
}

.logo div {
  color: #f7f3f3;
  font-size: 15px;
  text-align: center;
  line-height: 32px;
  margin-left: -5px;
}

.logo div .user-icon {
  margin-right: 5px;
  transform: scale(1.4);
}

.logo div .triggerIcon {
  margin-left: 8px;
  transform: scale(1.8);
}

.avatar {
  float: right;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 6px;
}
</style>
