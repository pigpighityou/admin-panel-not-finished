/*
 *     api接口统一管理
 * */

import request from "./request";
export default {
  getTableData(params) {
    return request({
      url: "/home/getTableData",
      method: "get",
      data: params,
      mock: false,
    });
  },
  getCountData() {
    return request({
      url: "/home/getCountData",
      method: "get",
      mock: false,
    });
  },
  getChartData() {
    return request({
      url: "/home/getChartData",
      method: "get",
      mock: false,
    });
  },
  getUserData(params) {
    return request({
      url: "/user/getUser",
      method: "get",
      data: params,
      mock: false,
    });
  },
  addUser(params) {
    return request({
      url: "/user/add",
      method: "post",
      data: params,
      mock: false,
    });
  },
  editUser(params) {
    return request({
      url: "/user/edit",
      method: "post",
      data: params,
      mock: false,
    });
  },
  deleteUser(params) {
    return request({
      url: "/user/delete",
      method: "get",
      data: params,
      mock: false,
    });
  },
  // 登录
  getMenu(params) {
    return request({
      url: "/permission/getMenu",
      method: "post",
      data: params,
      mock: false,
    });
  },
};
