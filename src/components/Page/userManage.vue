<template>
  <div class="user-header">
    <el-button type="primary">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input
          v-model="formInline.keyword"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="500px">
      <el-table-column
        v-for="(item, index) in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />

      <el-table-column fixed="right" label="Operations" width="180">
        <template #default>
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="config.total"
      class="pager mt-4"
      @current-change="changePage"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, onMounted, inject } from "vue";

const proxy = inject("$api");

const list = ref([]);
const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "sexLabel",
    label: "性别",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    label: "地址",
    width: 320,
  },
]);
const config = reactive({
  total: 0,
  page: 1,
  name:'',
});
const formInline = reactive({
  keyword: "",
});

onMounted(() => {
  // 传入config页面的配置
  getUserData(config);
});

const getUserData = async (config) => {
  let r = await proxy.getUserData(config);
  console.log(r);
  config.total = r.count;
  list.value = r.list.map((item) => {
    // 往数据中添加一个sexLabel字段，然后返回新数据
    item.sexLabel = item.sex === 0 ? "女" : "男";
    return item;
  });
};
// 分页功能,传入当前页码，传给后端
const changePage = (page) => {
  config.page = page;
  getUserData(config);
};

// 搜索功能
const handleSearch=()=>{
    config.name=formInline.keyword;
    getUserData(config);
}
</script>

<style scoped>
.table {
  position: relative;
  height: 520px;
}
.table .pager {
  position: absolute;
  bottom: -20px;
  right: 0;
}

.user-header {
  display: flex;
  justify-content: space-between;
 
}
</style>
