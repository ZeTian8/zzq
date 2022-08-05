import Vue from 'vue'
import Vuex from 'vuex'
import userLogin  from "./modules/user";

Vue.use(Vuex)

export default new Vuex.Store({
  //全局的数据状态
  state: {
    flag: true,
    centerDialogVisible:false,//菜单管理模态框开关
  },
  //对数据的修改计算
  getters: {
  },
  //处理同步commit提交
  mutations: {
    Visible(state,DialogVisible){
      state.centerDialogVisible=DialogVisible;
    }
  },
  //处理异步,触发commit通过mutations
  actions: {
  },
  //引入store中的各子级模块
  modules: {
    userLogin
  }
})
