import axios from "axios";

//创建一个实例对象
const serveAxios = axios.create({
    baseURL:'http://localhost:8080/api',//基础路径，服务器地址
    // baseURL: 'http://127.0.0.1:7001',//基础路径，服务器地址
    //请求超时时间
    timeout: 1000*1000 * 60 * 5,
})

// 添加请求拦截器
serveAxios.interceptors.request.use(function (config) {
    // console.log(config);
    // 在发送请求之前给heard设置携带的token
    if (!config.url.includes("/userlogin")) {
        // console.log(localStorage.getItem("VUE_TOKEN"));
        // config.headers['Authorization'] = "Bearer" + " " + localStorage.getItem("token");
        config.headers.authorization =  localStorage.getItem("VUE_TOKEN");
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器,服务器返回一个状态码，对状态码进行处理
serveAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code!==200) {
        console.log("响应拦截器失败");
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default serveAxios