import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'


// 拦截请求
Mock.mock('/home/getData',homeApi.getHomeData)

// 本地获取user数据

Mock.mock(/user\/getUser/,'get',userApi.getUserList)

// 本地添加user数据

Mock.mock(/user\/add/,'post',userApi.createUser)

// 本地编辑user数据

Mock.mock(/user\/edit/,'post',userApi.updateUser)

// 本地删除user数据

Mock.mock(/user\/delete/,'get',userApi.deleteUser)