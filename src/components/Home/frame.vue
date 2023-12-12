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
      ></a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
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
        {{ itemLabel }}
        <el-avatar
          class="avatar"
          src="https://s2.loli.net/2022/02/21/wRltb4a2cXoPhCk.jpg"
        >
        </el-avatar>
      </a-layout-header>
      <a-breadcrumb
        :style="{
          margin: '20px 35px',
        }"
      >
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
        <a-breadcrumb-item>An Application</a-breadcrumb-item>
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
        <Body></Body>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Body from "@/components/Home/body.vue";
import { ref, watchEffect, watch, reactive, h } from "vue";
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
} from "@ant-design/icons-vue";
const collapsed = ref(false);

const state = reactive({
  collapsed: false,
  selectedKeys: ["1"],
  openKeys: [],
  preOpenKeys: [],
});

watch(
  () => state.openKeys,
  (newVal, oldVal) => {
    state.preOpenKeys = oldVal;
    console.log(event.target.innerText);
  }
);

const items = reactive([
  {
    key: "1",
    icon: () => h(PieChartOutlined),
    label: "Option 1",
    title: "Option 1",
  },
  {
    key: "2",
    icon: () => h(DesktopOutlined),
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
    key: "sub1",
    icon: () => h(MailOutlined),
    label: "Navigation One",
    title: "Navigation One",
    children: [
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
      {
        key: "8",
        label: "Option 8",
        title: "Option 8",
      },
    ],
  },
  {
    key: "sub2",
    icon: () => h(MailOutlined),
    label: "Navigation Two",
    title: "Navigation Two",
    children: [
      {
        key: "9",
        label: "Option 9",
        title: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
        title: "Option 10",
      },
      {
        key: "11",
        label: "Option 11",
        title: "Option 11",
      },
      {
        key: "12",
        label: "Option 12",
        title: "Option 12",
      },
    ],
  },
]);

const itemLabel = ref(items[0].label);

watch(
  () => state.selectedKeys,
  (newVal, oldVal) => {
    items.forEach((item) => {
      if (item.key === newVal[0]) {
        itemLabel.value = item.label;
      } else if (item.children) {
        /* 这里的item.children是传自身值用的 */
        item.children.forEach((child) => {
          if (child.key === newVal[0]) {
            itemLabel.value = child.label;
          }
        });
      }
    });
  }
);
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
  margin-right: 10px;
  margin-top: 10px;
}
</style>
