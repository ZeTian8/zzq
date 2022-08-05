import request from "../utils/request";
// import { Message } from "element-ui"  // 提示框
// import shajs from 'sha.js';

/**
 * @description: 商品规格
 */

//centerDialogVisible(data)
export function tableData(data) {
    // console.log("@@@@@@",data);
    //新增及渲染接口
    return request({
        method: "get",
        url: "/api/specslist?size=5&page=1",
        data,
    })
}
export function editSpecs(data) {
    // console.log("@@@@@@",data);
    //编辑接口
    return request({
        method: "post",
        url: "/api/specsedit",
        data,
    })
}
export function AddSpecs(data) {
    // console.log("@@@@@@",data);
    //新增接口
    return request({
        method: "post",
        url: "/api/specsadd",
        data,
    })
}

export function DelSpecs(data) {
    console.log("@@@@@@",data);
    //新增接口
    return request({
        method: "post",
        url: "/api/specsdelete",
        data,
    })
}