<template>
  <el-col :span="20" style="margin: 40px auto">
    <el-card shadow="hover">
      <div class="user">
        <img src="../../assets/images/girl.jpeg" alt="" />
        <div class="user-info">
          <p class="name">Admin</p>
          <p class="role">超级管理员</p>
        </div>
      </div>
      <div class="login-info">
        <p>上次登录时间:<span>  {{ getTime }}</span></p>
        <p>上次登录的地点:<span>北京</span></p>
       
       

      </div>
    </el-card>
  </el-col>
</template>

<script setup>
import {ref,reactive,computed} from "vue";
import store from "@/store/store.js";
import storageUtils from "@/utils/localStorage";

const getTime=computed(()=>{
    return storageUtils.LocalStoreGetter("loginTime")
})


</script>

<style scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}

.user img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 40px;
}

.user-info p {
  line-height: 30px;
  font-size: 14px;
  color: #999;
}

.user-info p span {
  color: #666;
  margin-left: 60px;
}
</style>
