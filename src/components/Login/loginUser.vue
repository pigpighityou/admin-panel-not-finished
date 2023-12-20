<template>
  <el-form :model="loginForm" class="login-container">
    <h3>登录</h3>
    <el-form-item>
      <el-input
        type="input"
        placeholder="请输入账号"
        v-model="loginForm.username"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        type="password"
        placeholder="请输入密码"
        v-model="loginForm.password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, computed, inject } from "vue";

import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
const proxy = inject("$api");
const loginForm = reactive({
  username: "admin",
  password: "admin",
});

const store = useStore();
const router = useRouter();

// 登录
const login = async () => {
  const res = await proxy.getMenu(loginForm);
  console.log(res);
  // 设置菜单
  store.commit("setMenu", res.menu);
  // 设置token
  store.commit("setToken", res.token);
  // 设置登录时间
  store.commit('getTime')
  //   跳转
  router.push({
    name: "home",
  });
};
</script>

<style scoped>
.login-container {
  width: 350px;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 180px auto;
}

.login-container h3 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}

:deep(.el-form-item__content) {
  justify-content: center;
}
</style>
