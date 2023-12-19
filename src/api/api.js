/* 
*     api接口统一管理
* */

import request from "./request";
export default{
    getTableData(params){
        return request({
            url:'/home/getTableData',
            method:'get',
            data:params,
            mock:true
        })
    },
    getCountData(){
        return request({
            url:'/home/getCountData',
            method:'get',
            mock:true
        })
    },
    getChartData(){
        return request({
            url:'/home/getChartData',
            method:'get',
            mock:true
        })
    },
    getUserData(params){
        return request({
            url:'/user/getUser',
            method:'get',
            data:params,
            mock:false,
        })
    }
}