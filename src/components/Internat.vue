<template>
<!-- 中英文切换 -->
  <div>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <img src="../assets/zn_cn.png" alt="" />
        <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in langList"
          :key="item.name"
          :divided="!!index"
          :command="item.value"
          >{{ item.name }}</el-dropdown-item
        >
        <!-- <el-dropdown-item command="English">English</el-dropdown-item> -->
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langList: [
        {
          name: "简体中文",
          value: "zh-CN",
        },
        {
          name: "English",
          value: "en-US",
        },
      ],
    };
  },
  methods: {
    handleCommand(command) {
      this.$i18n.locale = command;
      localStorage.setItem(process.env.VUE_APP_LANG_NAME, command);
      location.reload();
      this.$message({
        message: "切换成功 " + command,
        type: "success",
        center: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>