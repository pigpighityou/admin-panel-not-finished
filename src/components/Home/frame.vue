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
      <a-layout-content
        :style="{
          margin: '6vw 2vw',
          padding: '3vw',
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
  openKeys: ["sub1"],
  preOpenKeys: ["sub1"],
});
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
]);

const itemLabel = ref(items[0].label);

watch(
  () => state.selectedKeys,
  (newVal, oldVal) => {
    // 打印key的值
    /*  console.log("selectedKeys", newVal[0], oldVal[0]); */
    // 打印key所包含的文字(items为菜单的数据源)
    /*    console.log(
      "selectedKeys-value:",
      items.find((item) => {
        if (isNaN(item.key)) {
          console.log(
            "real-value:",
            item.children.find((item) => item.key === newVal[0]).label
          );
          return item.children.find((item) => item.key === newVal[0]);
        } else {
          return item.key === newVal[0];
        }
      }).label
    ); */

    const itemlabelArr = items.find((item) => {
      // key是数字吗（是数字就没有子菜单）
      if (isNaN(item.key)) {
        itemLabel.value = item.children.find(
          (item) => item.key === newVal[0]
        ).label;
      } else {
        return item.key === newVal[0];
      }
    });
    // 如果没有子菜单，这边是有值的
    if (itemlabelArr) {
      itemLabel.value = itemlabelArr.label;
    }
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
