import request from "../utils/request";
// import { Message } from "element-ui"  // 提示框
// import shajs from 'sha.js';

/**
 * @description: 轮播图管理
 */

//centerDialogVisible(data)
export function tableData(data) {
    // console.log("@@@@@@",data);
    //新增及渲染接口
    return request({
        method: "get",
        url: "/api/bannerlist",
        data,
    })
}

export function addBanner(data) {
    // console.log("@@@@@@",data);
    //新增接口
    return request({
        method: "post",
        url: "/api/banneradd",
        data,
    })
}

export function editBanner(data) {
    // console.log("@@@@@@",data);
    //新增及渲染接口
    return request({
        method: "post",
        url: "/api/banneredit",
        data,
    })
}

export function delBanner(data) {
    // console.log("@@@@@@",data);
    //新增及渲染接口
    return request({
        method: "post",
        url: "/api/bannerdelete",
        data,
    })
}