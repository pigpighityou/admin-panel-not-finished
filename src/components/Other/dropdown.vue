<template>
  <a-dropdown class="avatar">
    <a class="ant-dropdown-link" @click.prevent>
      <el-avatar
        class="avatar"
        @click="avatarHandler"
      
      >
      <img src="@/assets/images/girl.jpeg" alt="">
      </el-avatar>
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          <a target="_blank" rel="noopener noreferrer" @click="router.go(0)"> 个人中心 </a>
        </a-menu-item>
        <a-menu-item key="1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            退出
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import { useRoute,useRouter } from 'vue-router';
const router=useRouter()
// 点击头像后执行的操作
const avatarHandler = () => {
  console.log(123);
};
</script>

<style scoped>
.avatar {
  float: right;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 6px;
}
</style>
