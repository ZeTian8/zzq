<template>
  <div class="login-back">
    <!-- 左侧部分 -->
    <div></div>
    <!-- 右侧部分 -->
    <div class="login-back-form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm login-Form"
        @keyup.enter="submitForm"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :variants="{ custom: { scale: 2 } }"
        :delay="200"
      >
        <!-- 账号用户名 -->
        <el-form-item label="" prop="username ">
          <h2 class="shop-xa">
            <div
              v-motion
              :initial="{ opacity: 0, y: 100 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :variants="{ custom: { scale: 2 } }"
              :hovered="{ scale: 1.4 }"
              :delay="200"
            >
              海品乐购商城登录
            </div>
            <div>
              <!-- <img
                src="../assets/zn-cn.png"
                alt=""
                class="shop-zncn"
                v-motion
                :initial="{ opacity: 0, y: 100 }"
                :enter="{ opacity: 1, y: 0, scale: 1 }"
                :variants="{ custom: { scale: 2 } }"
                :hovered="{ scale: 1.4 }"
                :delay="200"
              /> -->
              <Internat />
            </div>
          </h2>
          <!-- 用户名 -->
          <el-input
            type="text"
            status-icon
            v-model="ruleForm.username"
            autocomplete="off"
            prefix-icon="el-icon-user-solid"
            :placeholder="$t('userPlaceholder')"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="" prop="password ">
          <el-input
            type="password"
            v-model="ruleForm.password"
            show-password
            autocomplete="off"
            prefix-icon=" el-icon-key"
            :placeholder="$t('passPlaceholder')"
          ></el-input>
        </el-form-item>
        <!-- 滑动验证码：https://github.com/lirongtong/miitvip-captcha -->
        <!-- <Verification></Verification> -->
        <el-row style="margin-top: 10px" class="verifybox">
          <drag-verify
            ref="dragVerify"
            :width="360"
            :isPassing.sync="isPassing"
            :text="$t('slider')"
            :successText="$t('verification')"
            handlerIcon="el-icon-d-arrow-right"
            successIcon="el-icon-circle-check"
            @passcallback="passcallback"
          >
            <i v-show="!isPassing" slot="textBefore" class="el-icon-lock"></i>
          </drag-verify>
        </el-row>
        <!-- 提交登录 -->
        <el-form-item>
          <el-button
            :plain="true"
            type="primary"
            @click="open2('ruleForm')"
            :loading="loading"
            >{{ $t("signIn") }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入图片
// const logoImg = require("@/assets/logo.png");

import Internat from "../components/Internat.vue";

export default {
  components: { Internat },
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.password !== "") {
    //       this.$refs.ruleForm.validateField("password");
    //     }
    //     callback();
    //   }
    // };
    return {
      isPassing: false,
      loading: false,
      ruleForm: {
        username: "admin",
        password: "admin888",
      },
      //校验规则
      rules: {
        //用户名校验
        username: [
          // { validator: validateAccount, trigger: "blur" },
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        //密码校验
        password: [
          /*  validate,对整个表单进行校验的方法，参数为一个回调函数。
            该回调函数会在校验结束后被调用，并传入两个参数：
            是否校验成功和未通过校验的字段。若不传入回调函数，
            则会返回一个 promise */
          // { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 19, message: "长度在 3 到 8字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //验证码回调函数
    passcallback() {
      //成功
      this.$message({
        message: "验证通过",
        type: "success",
        center: true,
      });
      console.log("**&&&", this.isPassing);
    },

    open2(ruleForm) {
      if (this.isPassing) {
        //validate方法进行校验表单，通过则登录成功
        this.$refs[ruleForm].validate(async (valid) => {
          if (valid) {
            try {
              //验证成功开启登录状态
              this.loading = true;
              // 将data返回的数据(用户名,密码)通过api的login方法  调用登录接口
              // const res = Login(this.ruleForm);
              // res.then((data) => {
              //   console.log(data.data.list.token);
              //   const accessToken = data.data.list.token;
              //   localStorage.setItem("token", accessToken);
              //   router.push({ name: "Home" });
              //   alert("登录成功!");
              // });

              //使用vuex
              const res = await this.$store.dispatch(
                "handleLogin",
                this.ruleForm
              );
              console.log(res);
              //成功跳转页面
              this.$router.push({ name: "HomeView" });
              this.$message({
                message: "登陆成功",
                type: "success",
                center: true,
              });
            } catch (error) {
              console.log("错误", error);
              this.$message({
                message: "登录信息有误，请检查后重新登录",
                type: "error",
                center: true,
              });
            } finally {
              // 无论成功失败，1秒后关闭loading
              setTimeout(() => {
                this.loading = false;
              }, 1000);
            }
          } else {
            console.log("error submit!");
            return false;
          }
        });
      } else {
        //验证失败
        this.isPassing = false;
        this.$refs.dragVerify.reset();
        this.$message({
          message: "验证失败，请重新验证",
          type: "error",
          center: true,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-xa {
  font-weight: 700;
  color: #a18cd1;
  vertical-align: middle;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-back {
  height: 100vh;
  width: 100%;
  // linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)
  background-image: url(../assets/cool-background.png);
}
.login-back-form {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-Form {
  width: 360px;
  height: 350px;
  // text-align: center;
  // margin: auto;
  padding-top: 12%;
}
::v-deep .el-form-item__content {
  margin-left: 0 !important;
}
.el-button {
  width: 100%;
}
.verifybox {
  width: 360px;
  display: flex;
  color: aliceblue;
  margin-bottom: 22px;
  margin-top: -9px;
  margin-left: 0;
}
</style>