import request from "../utils/request";
import { Message } from "element-ui"  // 提示框
// import shajs from 'sha.js';

/**
 * @description: 树形菜单
 */

//centerDialogVisible(data)
export function tableData(data) {
    //渲染接口
    return request({
        method: "get",
        url: "/api/menulist?istree=1 ",
        data,
    })
}

export async function handleDelete(id) {
    if(!id){
        Message.warning("请传入删除id");
        return;
    }
    let res = await request.post("/api/menudelete",{id})
    if(res){
        return res;
    }
}

export function addMenu(data) {
    return request({
        method: "post",
        url: "/api/menuadd ",
        data,
    })
}

export function editMenu(data) {//2
    console.log("editMenu",data);
    return request({
        method: "post",
        url: "/api/menuedit",
        data,
    })
}