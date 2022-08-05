import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

// 这是Element-ui国际化配置文件
import el_zh_cn from 'element-ui/lib/locale/lang/zh-CN'
import el_en from 'element-ui/lib/locale/lang/en'

// 这是我们自己的国际化配置文件
import zh_cn from "./lang/zh-cn";
import en from "./lang/en";

const messages = { 
  // 中文的翻译文件
  "zh-CN": {
    el: el_zh_cn,
    ...zh_cn,
  },
  // 英语的翻译
  "en-US": {
    el: el_en,
    ...en,
  },
  // 日语的翻译
  // "ja-PN": {
  //   el: el_ja,
  //   ...ja,
  // },
};

const i18n = new VueI18n({
  locale: localStorage.getItem(process.env.VUE_APP_LANG_NAME) || "zh-CN",
  fallbackLocale: "zh-CN",//失败了使用语言
  globalInjection: true,
  messages,
});

// ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n;
