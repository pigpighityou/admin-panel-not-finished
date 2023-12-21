<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
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
        <!--   作用域插槽，可以拿到当前行的数据 -->
        <template #default="slot">
          <el-button size="small" @click="handleEdit(slot.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(slot.row)"
            >删除</el-button
          >
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

  <el-dialog
    v-model="dialogVisible"
    :title="action === 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userform">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
            :rules="[
              {
                required: true,
                message: '请输入姓名',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名 " />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
            :rules="[
              {
                required: true,
                message: '请输入年龄',
              },
              {
                type: 'number',
                message: '年龄必须为数字值',
                /* 因为number为字符串，所以需要在绑定表单时加上.number, 转换为number类型*/
              },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄 " />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="出生日期"
            prop="birth"
            :rules="[
              {
                required: true,
                message: '请输入出生日期',
                trigger: 'blur',
              },
            ]"
          >
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              label="出生日期"
              placeholder="请输入日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
          :rules="[
            {
              required: true,
              message: '请输入地址',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址 " />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ElMessageBox,ElMessage } from "element-plus";
import { ref, reactive, onMounted, inject, nextTick } from "vue";
import dateFormat from "@/utils/dateFormat";

const proxy = inject("$api");

// dom
const userform = ref(null);

// 表格数据
const list = ref([]);

// 表格表头
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

// 配置（分页和搜索内容）
const config = reactive({
  total: 0,
  page: 1,
  name: "",
});

// 搜索框
const formInline = reactive({
  keyword: "",
});

// 添加用户的form数据
const formUser = reactive({
  name: "",
  age: "",
  sex: "",
  birth: "",
  addr: "",
});

// 日期格式化放入公共方法里了
/* const dateFormat=(date)=>{
    let time=new Date(date);
    let year=time.getFullYear();
    let month=time.getMonth()+1;
    let day=time.getDate();
    function add(num){
        return num<10?'0'+num:num;
    }
    return add(year)+'-'+add(month)+'-'+add(day);
} */

// 弹窗
const dialogVisible = ref(false);

onMounted(() => {
  // 传入config页面的配置
  getUserData(config);
});

const getUserData = async (config) => {
  let r = await proxy.getUserData(config);
/*   console.log(r); */
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
const handleSearch = () => {
  config.name = formInline.keyword;
  getUserData(config);
};

// 弹窗关闭前的回调
const handleClose = (done) => {
  ElMessageBox.confirm("确定关闭吗?")
    .then(() => {
      userform.value.resetFields();
      done();
    })
    .catch(() => {
      // catch error
    });
};

// 提交表单,添加用户
const onSubmit = () => {
  userform.value.validate(async (valid) => {
    if (valid) {
      // 如果是添加用户
      if (action.value === "add") {
        formUser.birth = dateFormat(formUser.birth);
        let res = await proxy.addUser(formUser);
        console.log(res);
        if (res) {
          dialogVisible.value = false;
          userform.value.resetFields();
          getUserData(config);
        }
      } else {
        // 如果是编辑用户
        console.log(formUser);
        formUser.sex === "男" ? (formUser.sex = 1) : (formUser.sex = 0);
        let res = await proxy.editUser(formUser);
        /*  console.log(res); */
        if (res) {
          dialogVisible.value = false;
          userform.value.resetFields();
          getUserData(config);
        }
      }
    } else {
      ElMessageBox({
        showClose: true,
        message: "请输入正确的信息",
        type: "error",
      });
    }
  });
};

// 取消按钮功能
const handleCancel = () => {
  dialogVisible.value = false;
  userform.value.resetFields();
};

// 编辑按钮功能
const action = ref("add");
const handleEdit = (row) => {
  console.log(row);
  action.value = "edit";
  dialogVisible.value = true;
  //   将row里面的数据浅拷贝到formUser里面
  row.sex === 1 ? (row.sex = "男") : (row.sex = "女");
  nextTick(() => {
    Object.assign(formUser, row);
  });
};

// 新增按钮功能
const handleAdd = () => {
  action.value = "add";
  dialogVisible.value = true;
};

// 删除按钮功能
const handleDelete = (row) => {
  ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
       await proxy.deleteUser ({id:row.id});
       ElMessage({
        showClose:true,
        message:'删除成功!',
        type:'success'
       })
         getUserData(config);
    
    })
    .catch(() => {
      ElMessageBox({
        showClose: true,
        message: "已取消删除",
        type: "info",
      });
    });
};
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
