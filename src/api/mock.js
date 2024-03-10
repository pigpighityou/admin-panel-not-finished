import Mock from "mockjs";
import homeApi from "./mockData/home";
import userApi from "./mockData/user";
import permissionApi from "./mockData/permit";

/* // 拦截请求
Mock.mock('/home/getData',homeApi.getHomeData) */

// 本地获取user数据

Mock.mock(/user\/getUser/, "get", userApi.getUserList);

// 本地添加user数据

Mock.mock(/user\/add/, "post", userApi.createUser);

// 本地编辑user数据

Mock.mock(/user\/edit/, "post", userApi.updateUser);

// 本地删除user数据

Mock.mock(/user\/delete/, "get", userApi.deleteUser);

// 本地获取菜单数据

Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu);

// 本地获取图表数据
Mock.mock(/home\/getChartData/, "get", homeApi.getChartData);

// 本地获取手机数据

Mock.mock(/home\/getTableData/, "get", homeApi.getHomeData);

// 本地获取count数据

Mock.mock(/home\/getCountData/, "get", homeApi.getCountData);
