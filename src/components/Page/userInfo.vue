<template>
  <el-row class="home" :gutter="20" style="height: 80vh; overflow: scroll">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/tomjerry.png" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次登录时间:<span> {{ getTime }}</span>
          </p>
          <p>上次登录的地点:<span>北京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px" class="right-num">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="userchart" style="height: 240px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="videochart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import axios from "axios";
import * as echarts from "echarts";
import {
  reactive,
  ref,
  onMounted,
  inject,
  watch,
  nextTick,
  computed,
} from "vue";
import storageUtils from "@/utils/localStorage";

// 获取上次登录时间
const getTime = computed(() => {
  return storageUtils.LocalStoreGetter("loginTime");
});
// 获取全局api
const proxy = inject("$api");

// 获取dom，来装表格
const echart = ref(null);
const userchart = ref(null);
const videochart = ref(null);

// 表格数据
const tableData = ref([]);

//   表格标签
const tableLabel = ref({
  name: "品牌",
  todayBuy: "今日销量",
  monthBuy: "本月销量",
  totalBuy: "总销量",
});

// count数据
const countData = ref([]);

// 获取表格数据
const getTableList = async () => {
  /*  await axios.get('https://www.fastmock.site/mock/420b24ce510b8fc96e2276cdf3fe35e5/api/home/getTableData').then((res)=>{
        if(res.data.code===200){
            tableData.value=res.data.data.tableData
            console.log(tableData.value);
        }else{
            console.log('获取数据失败');
        }
    }) */
  let res = await proxy.getTableData();
  tableData.value = res.tableData;
};

// 获取count数据
const getCountData = async () => {
  let res = await proxy.getCountData();

  countData.value = res;
  /*  console.log(countData.value); */
};

onMounted(() => {
  getTableList();
  getCountData();
  getChartData();
});

// 配置图表
const option = {
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {},
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};

let xOptions = reactive({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});
let pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
});
let orderData = reactive({
  xData: [],
  series: [],
});
let userData = reactive({
  xData: [],
  series: [],
});
let videoData = reactive({
  series: [],
});

// 总体渲染图表
/* const getChartData = async () => {
  let result = await proxy.getChartData();
       console.log(result); 
  let res = result.orderData;
  let userRes = result.userData;
  let videoRes = result.videoData;
    // 生成图表数据
  orderData.xData = res.xData;
  const keyArray = Object.keys(res.data[0]);
  const series = [];
  keyArray.forEach((key, index) => {
    series.push({
      name: key,
      type: "line",
      data: res.data.map((item) => {
        return item[key];
      }),
    });
  });
  orderData.series = series;
  xOptions.xAxis.data = orderData.xData;
  xOptions.series = orderData.series;
  // 渲染 
  let chart = echarts.init(echart.value);
  chart.setOption(xOptions);
  // 生成图表数据 
  userData.xData=userRes.map(item=>item.date)
  userData.series=[
    {
      name: "新增用户",
      type: "bar",
      data: userRes.map(item=>item.new),
    },
    {
      name: "活跃用户",
      type: "bar",
      data: userRes.map(item=>item.active),
    },
  ]
  xOptions.xAxis.data = userData.xData;
    xOptions.series = userData.series;
     // 渲染 
     
    let userChart = echarts.init(userchart.value);
    userChart.setOption(xOptions);
    // 生成图表数据
    videoData.series = [
        {
            data:videoRes,
            type:'pie'
        }
    ]
    pieOptions.series = videoData.series;
    // 渲染
    let videoChart = echarts.init(videochart.value);
    videoChart.setOption(pieOptions);

}; */

const getChartData = async () => {
  let result = await proxy.getChartData();
  let res = result.orderData;
  let userRes = result.userData;
  let videoRes = result.videoData;
  orderData.xData = res.date;
  const keyArray = Object.keys(res.data[0]);
  const series = [];
  keyArray.forEach((key) => {
    series.push({
      name: key,
      data: res.data.map((item) => item[key]),
      type: "line",
    });
  });
  orderData.series = series;
  xOptions.xAxis.data = orderData.xData;
  xOptions.series = orderData.series;
  // userData进行渲染
  let hEcharts = echarts.init(echart.value);
  hEcharts.setOption(xOptions);

  // 柱状图进行渲染的过程
  userData.xData = userRes.map((item) => item.date);
  userData.series = [
    {
      name: "新增用户",
      data: userRes.map((item) => item.new),
      type: "bar",
    },
    {
      name: "活跃用户",
      data: userRes.map((item) => item.active),
      type: "bar",
    },
  ];

  xOptions.xAxis.data = userData.xData;
  xOptions.series = userData.series;
  let uEcharts = echarts.init(userchart.value);
  uEcharts.setOption(xOptions);
  videoData.series = [
    {
      data: videoRes,
      type: "pie",
    },
  ];
  pieOptions.series = videoData.series;
  let vEcharts = echarts.init(videochart.value);
  vEcharts.setOption(pieOptions);
};
</script>

<style scoped>
body {
  overflow: auto;
}
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

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* 非原生标签，例如elementplus需要以class形式选择 */
.num .el-card {
  width: 32%;
  margin-bottom: 20px;
}

.num .icons {
  width: 80px;
  height: 80px;
  font-size: 30px;
  text-align: center;
  line-height: 80px;
  color: #fff;
}

.num .details {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.details .num {
  font-size: 30px;
  margin-bottom: 10px;
}

.details .txt {
  font-size: 14px;
  text-align: center;
  color: #999;
}

.num .graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.num .graph .el-card {
  width: 48%;
}
</style>
