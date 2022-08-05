<template>
  <!-- 管理员页面 -->
  <div>
    <el-row>
      <el-button
        class="el-icon-circle-plus-outline menu-icon"
        type="success"
        :round="true"
        @click="adminAdd"
      >
        添加</el-button
      >
    </el-row>
    <template>
      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <!-- 用户ID -->
        <el-table-column
          label="用户ID"
          prop="uid"
          width="180"
        ></el-table-column>
        <!-- 用户名 -->
        <el-table-column
          label="用户名"
          prop="username"
          width="180"
        ></el-table-column>
        <!-- 角色名称 -->
        <el-table-column
          label="角色名称"
          prop="rolename"
          width="180"
        ></el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态" prop="status" width="180">
          <template slot-scope="scope">
            <el-tag size="medium"  v-if="scope.row.status">已启用</el-tag>
            <el-tag size="medium"  v-else>已禁用</el-tag>
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
              <!-- <router-link
                class="el-icon-edit"
                to="/Menu/Menudren"
                style="text-decoration: none"
              ></router-link> -->
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.uid)"
            >
              <i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column> </el-table
      ><br />
      <!-- 分页 -->
      <div class="elPagination">
        <el-pagination
          background
          :page-size="size"
          @current-change="pagechange"
          :current-page="page"
          :total="total"
          class="pagination"
        >
        </el-pagination>
      </div>
    </template>
    <!-- 模态框 -->
    <el-dialog
      :title="formAcyion == 'add' ? '添加管理' : '编辑管理'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-width="100px"
        :model="forminfo"
        :rules="rules"
        ref="forminfo"
      >
        <el-form-item label="角色名称" prop="roleid">
          <el-select v-model="forminfo.roleid" placeholder="请选择父级">
            <el-option label="请选择" value=""></el-option>
            <el-option
              v-for="item in rolelist"
              :label="item.rolename"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称" prop="username">
          <el-input
            v-model="forminfo.username"
            class="el-form-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input
            v-model="forminfo.password"
            show-password
            :placeholder="$route.params.id ? '留空为不修改密码' : ''"
          ></el-input>
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
import { tableDatalist } from "@/api/RoleManagement";
import {
  tableData,
  gettotal,
  editAdmin,
  addAdmin,
  delAdmin,
} from "@/api/AdminList";
export default {
  data() {
    return {
      list: [], //数据列表
      dialogFormVisible: false, //模态框开关
      formAcyion: "add",
      total: 0, // 总数
      size: 2, // 每页条数
      page: 1, // 页码数
      editID: "",
      forminfo: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rules: {
        // 表单的验证规则
        // username: [{ required: true, message: "标题必须写", trigger: "blur" }],
        roleid: [{ required: true, message: "角色必选", trigger: "blur" }],
      },
      rolelist: [], //菜单数据,用于下拉列表！
      uid: "",
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      //渲染列表
      let res = await tableData();
      this.list = res.data.list;
      //总数量
      let tot = await gettotal();
      this.total = tot.data.list[0].total;
      //用于表单下拉列表
      let getRole = await tableDatalist();
      this.rolelist = getRole.data.list;
    },
    //添加
    adminAdd() {
      this.formAcyion = "add";
      this.dialogFormVisible = true;
    },
    //编辑
    handleEdit(row) {
      console.log("1213", row.uid);
      this.uid = row.uid;
      this.formAcyion = "edit";
      this.editID = row.id; // 给表单数据添加上id
      this.forminfo.username = row.username;
      this.forminfo.roleid = row.roleid;
      this.dialogFormVisible = true;
    },
    //删除
    handleDelete(uid) {
      this.$confirm("确定删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        res=await delAdmin({uid});
        this.$message({ message: "删除成功", type: "success", center: true });
        this.getlist(); //删除之后在重新获取菜单列表
      });
    },
    submit() {
      console.log(this.uid);
      this.$refs.forminfo.validate(async (isok) => {
        if (isok) {
          let res;
          if (this.uid) {
            console.log(this.uid);
            this.forminfo.uid = this.uid;
            res = await editAdmin(this.forminfo); // 修改请求
            this.$message({
              message: "修改成功",
              type: "success",
              center: true,
            });
          } else {
            res = await addAdmin(this.forminfo); // 添加请求
            this.$message({
              message: "添加成功",
              type: "success",
              center: true,
            });
          }
          this.dialogFormVisible = false;
          this.getlist();
        } else {
          this.$message.warn("验证不通过");
        }
      });
    },
    pagechange(val) {
      this.page = val; // val就是新的页码
      this.getlist(); //  获取新的列表
    },
    reset() {
      this.forminfo.roleid = "";
      this.forminfo.username = "";
      this.$message({ message: "重置成功", type: "success", center: true });
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
// .pagination{
//   width: 100%;
//   // margin-left: -100px;
//   // margin:0px auto;

// }
.elPagination {
  display: flex;
  justify-content: space-between;
}
</style>