import request from "../utils/request";
// import { Message } from "element-ui"  // 提示框

export function tableDatalist(data) {
    // console.log("@@@@@@",data);
    //角色管理渲染接口
    return request({
        method: "get",
        url: "/api/rolelist ",
        data,
    })
}

export function editRole(data) {
    // console.log("@@@@@@",data);
    //编辑接口
    return request({
        method: "post",
        url: "/api/roleedit ",
        data,
    })
}

export function addRole(data) {
    // console.log("@@@@@@",data);
    //添加接口
    return request({
        method: "post",
        url: "/api/roleadd",
        data,
    })
}

export  function delRole(id) {
    console.log("@@@@@@",id);
    //删除接口
    return  request({
        method: "post",
        url: "/api/roledelete",
        data:{
            id
        },
    })
}