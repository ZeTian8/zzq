<template>
  <!-- 商品分类页面 -->
  <div>
    <el-row>
      <el-button
        class="el-icon-circle-plus-outline menu-icon"
        type="success"
        :round="true"
        @click="cateAdd"
      >
        添加</el-button
      >
    </el-row>
    <template>
      <el-table
        :data="list"
        style="width: 100%"
        row-key="id"
        :tree-props="{ hasChildren: 'hasChildren', children: 'children' }"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <!-- id -->
        <el-table-column label="ID" width="200" prop="id"></el-table-column>
        <!-- 分类名称 -->
        <el-table-column prop="catename" label="分类名称">
          <template slot-scope="scope">
            <span v-if="scope.row.pid == 0">{{ scope.row.catename }}</span>
            <span v-else>&nbsp;&nbsp;&nbsp;{{ scope.row.catename }}</span>
          </template>
        </el-table-column>
        <!-- 分类图片 -->
        <el-table-column label="分类图片" width="200" prop="img">
          <!-- <i class="el-icon-edit"></i> -->
          <template slot-scope="scope">
            <img
              :src="'http://localhost:3000' + scope.row.img"
              class="picimg"
              alt=""
            />
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态" width="200" prop="status">
          <template slot-scope="scope">
            <el-tag size="medium" v-if="scope.row.status">已启用</el-tag>
            <el-tag size="medium" v-else>已禁用</el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              class="el-icon-edit"
              size="mini"
              @click="handleEdit(scope.row)"
              :router="true"
            >
            </el-button>
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

    <!-- 弹出模态框 -->
    <el-dialog
      :title="formAcyion == 'add' ? '添加分类' : '编辑分类'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-width="100px"
        :model="forminfo"
        :rules="rules"
        ref="forminfo"
      >
        <el-form-item label="上级分类" prop="pid">
          <el-select v-model="forminfo.pid" placeholder="请选择父级">
            <el-option label="请选择" value></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in categorylist"
              :label="item.catename"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="forminfo.catename"></el-input>
        </el-form-item>
        <el-form-item label="分类图片" prop="img">
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
            formAcyion == "add" ? "立即提交" : "立即修改"
          }}</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GatetableData, addCate, editCate ,delCate} from "@/api/CategoryList";
let defaultInfo = {}; // 修改的时候的重置！
export default {
  data() {
    return {
      list: [], //获取数据列表
      dialogFormVisible: false, //模态框
      formAcyion: "add", //是否添加字体
      editID: "",
      forminfo: {
        pid: "", // 父级id
        catename: "", // 分类名称
        img: "", // 分类图片
        status: 1, // 状态
      },
      rules: {
        // 表单的验证规则
        catename: [
          { required: true, message: "分类名称必须写", trigger: "blur" },
        ],
        pid: [{ required: true, message: "上级分类必须选", trigger: "blur" }],
      },
      categorylist: [], //分类列表,用于下拉列表！
      dialogVisible: false, // 弹框
      dialogImageUrl: "", // 弹框图片地址
      fileList: [], // 上传文件列表
    };
  },
  created() {
    this.getlist(); //用来获取数据列表
  },
  methods: {
    //渲染列表
    async getlist() {
      let res = await GatetableData();
      this.list = res.data.list;
      // console.log("商品", res.data.list);
      //用于表单下拉列表
      let getCate = await GatetableData();
      this.categorylist = getCate.data.list;
    },
    // 添加
    cateAdd() {
      this.formAcyion = "add";
      this.dialogFormVisible = true;
    },
    //编辑
    async handleEdit(row) {
      this.forminfo = await GatetableData(row.id);
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
      this.editID = row.id;
      this.forminfo.pid = row.pid;
      this.forminfo.catename = row.catename;
      this.dialogFormVisible = true;
      // console.log(index, row);
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
        await delCate({id});
        this.getlist();
      });
    },
    //addCate
    //editCate
    submit() {
      this.$refs.forminfo.validate(async (isok) => {
        if (isok) {
          // 发送请求！
          // 使用FormData提交数据！
          let formdata = new FormData();
          for (let k in this.forminfo) {
            formdata.append(k, this.forminfo[k]);
          }
          let res;
          if (this.editID) {
            formdata.append("id", this.editID);
            console.log(formdata);
            res = await editCate(formdata);
            console.log(res);
            this.$message({
              message: "修改成功",
              type: "success",
              center: true,
            });
          } else {
            res = await addCate(formdata);
            this.$message({
              message: "添加成功",
              type: "success",
              center: true,
            });
          }
          this.dialogFormVisible = false; //关闭模态框
          this.getlist(); //重新渲染
        } else {
          this.$message.warn("验证不通过");
        }
      });
    },
    reset() {
      // 重置
      // resetFields表单重置！
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
      this.forminfo.catename = "";
      this.forminfo.pid = "";
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