
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
   transpileDependencies: true,
    devServer: {
      //配置域名
      // host:localhost,
      //设置端口号
      // port:3000,
      //设置项目启动成功，帮我们直接打开浏览器
      // open:true,
      //通过proxy来配置代理，从而解决开发环境跨域问题
      // proxy:'http://localhost:3000',
      proxy: {//可多个一起发送
        '/api': { //匹配所有以'/api'开头的请求路径
          target: 'http://localhost:3000', // 代理目标的基础路径,目标服务器地址
          pathRewrite: {'^/api':''}, // 代理往后端服务器的请求去掉/api前缀
          ws: true, // WebSocket
          changeOrigin: true
        },
      }
    }
})
