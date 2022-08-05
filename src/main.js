import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//中英文切换
// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n)

// 引入国际化插件
import i18n from "@/locales";


//  创建 Echarts组件
import ChartBlock from 'echarts-vue-component'
Vue.use(ChartBlock)

//使用MotionPlugin插件动画
import { MotionPlugin } from '@vueuse/motion'

//
import dragVerify from 'vue-drag-verify2'
Vue.use(dragVerify)

Vue.use(ElementUI);
Vue.use(MotionPlugin)
// Vue.use(MakeitCaptcha);



new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
  },
  
}).$mount('#app')
