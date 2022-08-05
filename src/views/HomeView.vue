<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-row>
          <el-col :span="8" class="spanLogo">
            <!-- logo -->
            <h2 class="mmlogo">
              <div
                v-motion
                :initial="{ opacity: 0, y: 100 }"
                :enter="{ opacity: 1, y: 0, scale: 1 }"
                :variants="{ custom: { scale: 2 } }"
                :hovered="{ scale: 1.4 }"
                :delay="200"
              >
                海品乐购
              </div>
            </h2>
            <!-- 导航收缩图标 -->
            <el-button @click="handleCollapse" v-if="!isCollapse"
              ><i class="el-icon-s-fold mm-icon"></i
            ></el-button>
            <el-button @click="handleCollapse" v-else
              ><i class="el-icon-s-unfold mm-icon"></i
            ></el-button>
          </el-col>
          <!-- <el-col :span="8"></el-col> -->
          <el-col :span="8"><div class="spanDiv grid-content"></div></el-col>
          <el-col :span="8" class="span-flex">
            <!-- 国际化语言切换 -->
            <Internat class="Internat" />
            <!-- 展开全屏 -->
            <img
              src="../assets/fa.png"
              alt=""
              @click="useFullscreen"
              class="fullScreen"
              v-if="!this.isFullscreen"
            /><!--放大↑缩小↓-->
            <img
              v-else
              src="../assets/sx.png"
              alt=""
              @click="useFullscreen"
              class="fullScreen"
            />
            <!-- 超级管理员 -->
            <el-dropdown class="Super" type="primary" @command="handleCommand">
              <span class="el-dropdown-link">
                超级管理员<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item command="outLogin">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <!-- 面包屑下面部分 -->
      <el-container>
        <!-- 侧边导航栏 -->
        <el-aside
          :width="isCollapse ? '60px' : '200px'"
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#545C64"
          text-color="#ffffff"
        >
          <!-- 菜单内容 -->
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            :collapse-transition="true"
            background-color="#484e55"
            text-color="#ffffff"
            :router="true"
            :index="$route.path"
            unique-opened="true"
          >
            <!-- <Home ></Home> -->
            <template v-for="menusList in storeList">
              <el-menu-item
                :key="menusList.id"
                :index="menusList.url || menusList.id + ''"
                v-if="!menusList.children || !menusList.children.length"
              >
                <!-- 一级菜单无 子菜单 -->
                <template slot="title">
                  <i :class="menusList.icon"></i>
                  <span> {{ menusList.title }}</span>
                </template>
              </el-menu-item>
              <!-- 一级菜单内有子菜单 判断有子菜单进入-->
              <el-submenu
                :key="menusList.url || menusList.id"
                :index="menusList.url || menusList.id + ''"
                v-else
              >
                <template slot="title">
                  <i :class="menusList.icon"></i>
                  <span> {{ menusList.title }}</span>
                </template>

                <!-- 二级菜单 -->
                <template v-for="menusListItem in menusList.children">
                  <el-menu-item
                    :key="menusListItem.id"
                    :index="menusListItem.url"
                    v-if="
                      !menusListItem.children || !menusListItem.children.length
                    "
                  >
                    <!-- 二级菜单无子菜单 -->
                    <template slot="title">
                      <i :class="menusListItem.icon"></i>
                      <span> {{ menusListItem.title }}</span>
                    </template>
                  </el-menu-item>
                  <!-- 二级菜单有子菜单进入 -->
                  <el-submenu
                    :key="menusListItem.id"
                    :index="menusListItem.url"
                    v-else
                  >
                    <template slot="title">
                      <i :class="menusListItem.icon"></i>
                      <span> {{ menusListItem.title }}</span>
                    </template>
                  </el-submenu>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <!-- 中间内容区域 -->
        <el-main>
          <transition name="el-fade-in-linear">
            <router-view v-show="show" class="transition-box"></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template> 

<script>
import { useFullscreen } from "@vueuse/core";
// import { constants } from "buffer";
// import Home from "../components/Home.vue";
import Internat from "../components/Internat.vue";

export default {
  data() {
    return {
      show: true,
      activeIndex: "1",
      activeIndex2: "1",
      isCollapse: false,
      isFullscreen: false,
      toggle: null,
    };
  },
   provide () {
    return {
      reload: this.reload
    }
  },
  components: {
    // Home,
    Internat,
  },
  mounted() {
    //挂载后生命周期，只执行一次，执行后保存结果
    const { isFullscreen, toggle } = useFullscreen();
    this.isFullscreen = isFullscreen;
    this.toggle = toggle;
  },
  computed: {
    storeList() {
      const storeLists = JSON.parse(this.$store.state.userLogin.menus);
      return storeLists;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //控制收缩导航
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //下拉菜单事件
    handleCommand(command) {
      if (command == "home") {
        this.home(command);
      } else if (command == "outLogin") {
        this.outLogin(command);
      }
    },
    //跳转到首页
    home() {
      this.$router.go(0);
    },
    //退出登录
    outLogin() {
      window.localStorage.removeItem("VUE_TOKEN");
      window.localStorage.removeItem("VUE_MMLOGIN");
      // window.localStorage.removeItem('VUE_MENUS')
      this.$store.state.userLogin.isLogin = false;
      this.$router.push({ path: "/" });
      this.$message({
        message: "退出登陆成功",
        type: "success",
        center: true,
      });
    },
    //全屏
    useFullscreen() {
      console.log("$$", this.isFullscreen);
      this.toggle();
    },
  },
};
</script>

<style scoped>
.el-header {
  width: 100%;
  background: #fff;
  /* color: #e9eef3; */
  text-align: center;
  line-height: 60px;
  margin: 0;
  padding: 0;
}
.mmlogo {
  margin: 0;
  width: 200px;
  height: 100%;
  background-color: #484e55 !important;
  color: #e9eef3;
}
.mm-icon {
  font-size: 16px;
  color: #fc8a6d;
}
.spanLogo .el-button {
  margin-left: 20px;
}
.spanLogo {
  display: flex;
  align-items: center;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  min-width: 300px;
}

.fullScreen {
  padding-right: 10px;
  vertical-align: middle;
}

.el-dropdown-link {
  cursor: pointer;
  color: #e9eef3;
  font-size: 14px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-aside {
  background: #484e55;
  color: #e9eef3;
  text-align: center;
  overflow: hidden;
  transition: width 0.3s ease-out;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-container {
  width: 100%;
  height: 100vh;
}
.head-sidebar {
  width: 800px;
}
.Super span {
  color: #484e55;
}
.transition-box {
  margin-bottom: 10px;
  width: 100%;
  /* height: 100px; */
  border-radius: 4px;
  /* background-color: #409eff; */
  text-align: center;
  color: #fff;
  /* padding: 40px 20px; */
  box-sizing: border-box;
  /* margin-right: 20px; */
}
.span-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  /* vertical-align: middle; */
}
.Internat {
  /* vertical-align: middle; */
  margin-right: 10px;
}
/* .el-menu-item /deep/{
  padding-left: 0px !important;
} */
</style>