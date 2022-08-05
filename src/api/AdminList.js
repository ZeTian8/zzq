import request from "../utils/request";
// import { Message } from "element-ui"  // 提示框
// import shajs from 'sha.js';

/**
 * @description: 树形菜单
 */

//centerDialogVisible(data)
export function tableData(data) {
    // console.log("@@@@@@",data);
    //新增及渲染接口
    return request({
        method: "get",
        url: "/api/userlist?size=5&page=1",
        data,
    })
}

export function gettotal(data) {
    // console.log("@@@@@@",data);
    //总数量
    return request({
        method: "get",
        url: "/api/usercount",
        data,
    })
}
export function editAdmin(data) {
    // console.log("@@@@@@",data);
    //编辑
    return request({
        method: "post",
        url: "/api/useredit",
        data,
    })
}
export function addAdmin(data) {
    // console.log("@@@@@@",data);
    //新增
    return request({
        method: "post",
        url: "/api/useradd",
        data,
    })
}
export async function delAdmin(data) {
    console.log("@@@@@@",data);
    //删除
    return await request({
        method: "post",
        url: "/api/userdelete",
        data,
    })
}