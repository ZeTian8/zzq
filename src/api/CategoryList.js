import request from "../utils/request";
// import { Message } from "element-ui"  // 提示框
// import shajs from 'sha.js';

/**
 * @description: 商品分类
 */

//centerDialogVisible(data)
export function GatetableData(data) {
    console.log("@@@@@@",data);
    //渲染接口
    if (data) {
        return request({
            method: "get",
            url: "/api/cateinfo",
            data,
        })
    } else {
        return request({
            method: "get",
            url: "/api/catelist?istree=1",
            data,
        })
    }
   
}

export function addCate(data) {
    // console.log("@@@@@@",data);
    //新增接口
    return request({
        method: "post",
        url: "/api/cateadd",
        data,
    })
}

export function editCate(data) {
    console.log("@@@@@@",data);
    //编辑接口
    return request({
        method: "post",
        url: "/api/cateedit",
        data,
    })
}

export function delCate(data) {
    console.log("@@@@@@",data);
    //编辑接口
    return request({
        method: "post",
        url: "/api/catedelete",
        data,
    })
}