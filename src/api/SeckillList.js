import request from "../utils/request";
// import { Message } from "element-ui"  // 提示框
// import shajs from 'sha.js';

/**
 * @description: 秒杀活动
 */

//centerDialogVisible(data)
export function tableData(data) {
    // console.log("@@@@@@",data);
    //渲染接口
    return request({
        method: "get",
        url: "/api/secklist",
        data,
    })
}

export function addSeckill(data) {
    // console.log("@@@@@@",data);
    //新增接口
    return request({
        method: "post",
        url: "/api/seckadd",
        data,
    })
}

export function editSeckill(data) {
    // console.log("@@@@@@",data);
    //编辑接口
    return request({
        method: "post",
        url: "/api/seckedit",
        data,
    })
}

export function delSeckill(data) {
    // console.log("@@@@@@",data);
    //删除接口
    return request({
        method: "post",
        url: "/api/seckdelete",
        data,
    })
}