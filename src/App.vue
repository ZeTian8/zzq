<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
  border: 0;
}
// 自定义进度条颜色
#nprogress .bar {
 background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%) !important; //自定义颜色
}
</style>
