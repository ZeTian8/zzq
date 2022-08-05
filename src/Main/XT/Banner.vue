<template>
  <!-- 轮播图页面 -->
  <div>
    <el-row>
      <el-button
        class="el-icon-circle-plus-outline menu-icon"
        type="success"
        :round="true"
        @click="addBan"
      >
        添加轮播</el-button
      >
    </el-row>
    <template>
      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <!-- 轮播图名称 -->
        <el-table-column
          label="轮播图名称"
          width="260"
          prop="title"
        ></el-table-column>
        <!-- 图片 -->
        <el-table-column label="图片" width="260" prop="img">
          <template slot-scope="scope">
            <img
              :src="'http://localhost:3000' + scope.row.img"
              class="picimg"
              alt=""
            />
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态" width="260">
          <template slot-scope="scope">
            <el-tag size="medium" v-if="scope.row.state">已启用</el-tag>
            <el-tag size="medium" v-else>已禁用</el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              :router="true"
            >
              <router-link
                class="el-icon-edit"
                to="/Menu/Menudren"
                style="text-decoration: none"
              ></router-link>
            </el-button>
            <router-view></router-view>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
            >
              <i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 模态框 -->
    <el-dialog
      :title="formAcyion == 'add' ? '添加轮播' : '编辑轮播'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-width="100px"
        :model="forminfo"
        :rules="rules"
        ref="forminfo"
      >
        <el-form-item label="轮播图名称" prop="title">
          <el-input v-model="forminfo.title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片" prop="img">
          <!-- 上传组件 -->
          <!-- action 属性： 上传地址！ 如果写了地址，那么选择图片之后就会自动上传！  -->
          <!-- list-type属性： 上传控件的类型 -->
          <!-- file-list属性： 文件列表  [{name:'',url:""}] -->
          <!-- limit属性：上传最大个数 -->
          <!-- on-change: 图片变了的时候 -->
          <!-- name属性： 上传的对应字段 -->
          <!-- auto-upload:是否自动上传 -->
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :file-list="fileList"
            :limit="1"
            :on-change="fileChange"
            :auto-upload="false"
            :on-exceed="limitImg"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
          <!-- 弹框 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="forminfo.status" :label="1">正常</el-radio>
          <el-radio v-model="forminfo.status" :label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">{{
            formAcyion == "add" ? "立即添加" : "立即修改"
          }}</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { tableData, editBanner, addBanner, delBanner } from "@/api/BannerList";
let defaultInfo = {};
export default {
  data() {
    return {
      list: [],
      formAcyion: "add",
      dialogFormVisible: false, //模态框开关
      editID: "",
      forminfo: {
        title: "", // 标题
        img: "", // 图片
        status: 1, // 状态
      },
      rules: {
        // 表单的验证规则
        title: [{ required: true, message: "分类名称必须写", trigger: "blur" }],
      },
      dialogVisible: false, // 弹框
      dialogImageUrl: "", // 弹框图片地址
      fileList: [], // 上传文件列表
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //获取列表渲染
    async getlist() {
      let res = await tableData();
      this.list = res.data.list;
    },
    //添加
    addBan() {
      this.formAcyion = "add";
      this.dialogFormVisible = true;
    },
    //编辑
    async handleEdit(row) {
      this.forminfo = await tableData(row.id);
      // 回显图片
      let url = this.forminfo.img
        ? "http://localhost:3000" + this.forminfo.img
        : "";
      if (url) {
        this.fileList.push({ name: this.forminfo.catename, url });
      }
      // 赋给一个临时变量，用于重置的时候再次赋值！
      defaultInfo = { ...this.forminfo };
      this.formAcyion = "edit";
      this.forminfo.title = row.title;
      this.forminfo.status = row.status;
      this.editID = row.id;
      console.log(this.editID);
      this.dialogFormVisible = true;
    },
    //删除
    handleDelete(id) {
      // 弹框确认！
      this.$confirm("确定删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // 删除功能！
        await delBanner({ id });
        this.getlist();
      });
    },
    submit() {
      this.$refs.forminfo.validate(async (isok) => {
        // 发送请求！
        // 使用FormData提交数据！
        let formdata = new FormData();
        for (let k in this.forminfo) {
          formdata.append(k, this.forminfo[k]);
        }
        let res;
        if (isok) {
          if (this.editID) {
            formdata.append("id", this.editID);
            res = await editBanner(formdata);
            this.$message({
              message: "修改成功",
              type: "success",
              center: true,
            });
          } else {
            res = await addBanner(formdata);
            this.$message({
              message: "添加成功",
              type: "success",
              center: true,
            });
          }
          this.dialogFormVisible = false; //关闭
          this.getlist(); //重新拉取列表
        } else {
          this.$message.warn("验证不通过");
        }
      });
    },
    reset() {
      if (this.editID) {
        // 修改重置
        this.forminfo = { ...defaultInfo };
        // 回显图片
        let url = this.forminfo.img
          ? "http://localhost:3000" + this.forminfo.img
          : "";
        if (url) {
          this.$set(this.fileList, 0, { name: this.forminfo.catename, url });
        }
      } else {
        // 添加重置
        this.$refs.forminfo.resetFields();
        this.fileList = [];
      }
      this.forminfo.title = "";
      this.$message({ message: "重置成功", type: "success", center: true });
    },
    // 上传空间的相关事件
    handlePictureCardPreview(file) {
      // 预览事件
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    fileChange(file) {
      // 文件改变时候触发
      // file.raw 才是原生的文件信息！
      this.forminfo.img = file.raw;
    },
    limitImg() {
      this.$message.warning("分类图片最多添加1个");
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-icon {
  background: #fc8a6d;
  border: none;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.picimg {
  width: 60px;
  border: 1px solid #eee;
}
</style>