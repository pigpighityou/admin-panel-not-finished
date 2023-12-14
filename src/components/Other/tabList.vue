<template>
  <el-tag
    v-for="tag in store.state.tags"
    :key="tag.name"
    class="mx-1"
    closable
    :type="tag.type"
    @click="clickHandler(tag.name)"
    
    :style="{
        cursor:'pointer'
    }"
  >
    {{ tag.name }}
  </el-tag>


</template>

<script setup>
import { ref,watch} from "vue";
import store from "@/store/store.js";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();


/* const tags = ref([
  {
    path: "/",
    name: "home",
    label: "首页",
  },
 
]); */





watch(
  () => store.state.itemTitle,
  (newVal, oldVal) => {
    // 去掉标识符的空格
    const newPath=newVal.replace(" ", "-");
    // 添加新的标签,如果标签已经存在就不添加，用户管理标签就是home，不添加
        if (store.state.tags.some((tag) => tag.name === newVal)) {
        return;
        }
        if(newVal=="用户管理"){
            return;
        }
    store.state.tags.push({
      path: `/${newPath}`,
      name: newVal,
      label: newVal,
      
    });
 
  
  }
);



const clickHandler=(value)=>{
      store.state.tagName=value
    const newValue=value.replace(" ", "-");
    console.log('tagname：',newValue,store.state.tagName)  
     router.push(`/${newValue}`); 
}




</script>

<style scoped></style>
