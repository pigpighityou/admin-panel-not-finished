<template>
  <a-dropdown class="avatar">
    <a class="ant-dropdown-link" @click.prevent>
      <el-avatar class="avatar" @click="avatarHandler">
        <img src="@/assets/images/tomjerry.png" alt="" />
      </el-avatar>
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          <a
            target="_blank"
            rel="noopener noreferrer"
            @click="personalCenterHandler"
          >
            个人中心
          </a>
        </a-menu-item>
        <a-menu-item key="1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            @click="exitHandler"
          >
            退出
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, watch, defineProps } from "vue";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const props = defineProps(["state"]);
const state = props.state;


// 点击头像后执行的操作
const avatarHandler = () => {
  console.log("点击头像了");
};

// 点击个人中心后执行的操作
const personalCenterHandler = () => {
  router.push("/home");
  state.selectedKeys[0] = "1";
  store.state.hasChild = false;
  store.state.itemMainTitle = "用户管理";
  store.state.itemTitle = "用户管理";
};

// 点击退出后执行的操作
const exitHandler=()=>{
   store.commit('cleanMenu')
   router.push('/login')
}
</script>

<style scoped>
.avatar {
  float: right;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 6px;
}
</style>
