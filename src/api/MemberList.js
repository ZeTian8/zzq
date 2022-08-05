import request from "../utils/request";
// import { Message } from "element-ui"  // 提示框
// import shajs from 'sha.js';

/**
 * @description: 会员管理
 */

//centerDialogVisible(data)
export function tableData(data) {
    // console.log("@@@@@@",data);
    if (data) {
        
         //渲染接口
    return request({
        method: "get",
        url: "/api/memberinfo",
        data,
    })
    } else {
         //渲染接口
    return request({
        method: "get",
        url: "/api/memberlist",
        data,
    })
    }
   
}
export function editMenuber(data) {  
    //渲染接口
    return request({
        method: "post",
        url: "/api/memberedit",
        data,
    })
    
   
}