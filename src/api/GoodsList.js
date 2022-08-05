import request from "../utils/request";
// import { Message } from "element-ui"  // 提示框
// import shajs from 'sha.js';

/**
 * @description: 商品管理
 */

//centerDialogVisible(data)
export  function GoodtableData(data) {
    // console.log("@@@@@data@",data);
    //渲染接口
    // if (data) {
        
    // }
    return  request({
        method: "get",
        url: "/api/goodslist?size=10&page=1",
        data,
    })
}

export  function gettotal(data) {
    // console.log("@@@@@@",data);
    //分页接口
    return  request({
        method: "get",
        url: "/api/goodscount",
        data,
    })
}