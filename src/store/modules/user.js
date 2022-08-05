//引入api的login方法
import { Login } from "@/api/user";

export default {
    //定全局数据isLogin，token
    state: {
        isLogin: localStorage.getItem("VUE_MMLOGIN") || false,
        token: localStorage.getItem("VUE_TOKEN") || "",
        menus: localStorage.getItem("VUE_MENUS") || [],
    },
    getters: {
        // getToken(state) {
        //     return state.token;
        // }
    },
    mutations: {
        //设置token
        setToken(state, data) {
            state.token = data;
            localStorage.setItem('VUE_TOKEN', data)
        },
        //登陆状态
        setLogin(state, falg) {
            state.isLogin = falg;
            localStorage.setItem("VUE_MMLOGIN", falg);
        },
        //保存菜单项
        setMenus(state, dataMenus) {
           dataMenus.unshift({
                // clildren:[],
                id: 17,
                pid: 0,
                title: "首页",
                icon: "el-icon-setting",
                type: 1,
                url: "/home",
                status: 1,
            })
            state.menus = JSON.stringify(dataMenus);
            localStorage.setItem("VUE_MENUS", JSON.stringify(dataMenus))
        }
    },
    actions: {
        //处理逻辑,通过LoginView的dispatch触发handleLogin
        async handleLogin({ commit }, data) {
            try {
                const res = await Login(data)
                console.log("@@", res);
                commit("setToken", res.data.list.token);
                commit('setLogin', true)
                commit("setMenus", res.data.list.menus)
                if (res.data.code == 200) {
                    return true
                } else {
                    return Promise.reject(res.msg)
                }
            } catch (error) {
                return Promise.reject(error)
            }
        },
    }
}