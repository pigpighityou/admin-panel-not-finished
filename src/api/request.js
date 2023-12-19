import axios from "axios";
// 当你导入一个目录（比如 @/config）而不是一个具体的文件时，
    // JavaScript 模块系统会自动寻找那个目录下的 index.js 文件。
import config from "@/config";
import { ElMessage } from "element-plus";
const NETWORK_ERROR = "网络请求异常，请稍后重试！";

// 创建axios实例
const service = axios.create({
  baseURL: config.baseApi,
});


/* 

return service({
  url: '/home/multidata',

})

*/

// 请求拦截器(请求之前的操作)

service.interceptors.request.use((req) => {
  return req;
});

// 响应拦截器

service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code === 200) {
    return data;
  } else {
    ElMessage.error(msg || NETWORK_ERROR);
    return Promise.reject(msg || NETWORK_ERROR);
  }
});

// 封装函数
  // options通常为对象
function request(options) {
  options.method = options.method || "get";
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }
  // 处理mock
  let isMock = config.mock; /* 默认开关为true */
  if (typeof options.mock !== "undefined") {
    // 传入的mock优先级最高，这里如果传入的是false，就不使用mock
    isMock = options.mock;
  }
  // 处理线上环境
  if (config.env === "prod") {
    // 线上环境绝对不能使用mock的数据
    service.defaults.baseURL = config.baseApi;
  } else {
    // 开发环境和测试环境使用mock数据与否由传入的mock参数决定
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }
  // 返回到axios实例
  return service(options);
}

export default request;
