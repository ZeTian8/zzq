import request from "../utils/request";
// import shajs from 'sha.js';

/**
 * @description: 用户登录
 */

//Login(data)，是LoginView通过Login方法传过来的数据
export function Login(data) {
    //对传过来的密码加密
    // console.log("@@",shajs('sha256').update(data.password ).digest('hex'))
    // data.password  = shajs('sha256').update(data.password ).digest('hex')
    //登录接口
    return request({
        method: "post",
        url: "/api/userlogin",
        data,
    })
}