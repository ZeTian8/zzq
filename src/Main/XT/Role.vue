<template>
  <!-- 角色管理页面 -->
  <div class="role-center">
    <el-row>
      <el-button
        class="el-icon-circle-plus-outline menu-icon"
        type="success"
        :round="true"
        @click="roleAdd"
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
        <!-- id width="180"-->
        <el-table-column prop="id" label="ID"></el-table-column>
        <!-- 角色名称 -->
        <el-table-column prop="rolename" label="角色名称"></el-table-column>
        <!-- 状态 -->
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status">已启用</el-tag>
            <el-tag type="danger" v-else>已禁用</el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope" class="table-column-felx">
            <!-- 编辑 -->
            <el-button
              size="mini"
              class="el-icon-edit"
              @click="handleEdit(scope.row)"
              :router="true"
            >
            </el-button>

            <!-- 权限 -->
            <!-- <el-button
              ype="text"
              @click="FormVisible"
              size="mini"
              type="danger"
              class="jueSBtn el-icon-share"
            ></el-button> -->
            <!-- 删除 -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 表单模态框 -->
    <el-dialog
      :title="formAction == 'add' ? '添加角色信息' : '修改角色信息'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-width="100px"
        :model="forminfo"
        :rules="rules"
        ref="forminfo"
      >
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="forminfo.rolename"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <!-- 树形控件 树形菜单，树形权限！-->
          <el-tree
            ref="tree"
            :data="menulist"
            show-checkbox
            node-key="id"
            :check-strictly="isStrictly"
            :props="{ label: 'title', children: 'children' }"
            default-expand-all
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="forminfo.status" :label="1">正常</el-radio>
          <el-radio v-model="forminfo.status" :label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="submit">{{
            formAction == "add" ? "立即添加" : "立即修改"
          }}</el-button>
          <!-- v-if="!editID.id" -->
          <!-- <el-button type="success" v-else @click="submit"></el-button> -->
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { tableData } from "@/api/Menulist";
import {
  tableDatalist,
  editRole,
  addRole,
  delRole,
} from "@/api/RoleManagement";
export default {
  data() {
    return {
      dialogFormVisible: false, //开关模态框
      formAction: "add", //是否添加或者编辑
      list: [],
      editID: "", //编辑添加id
      forminfo: {
        //树形结构
        rolename: "", // 角色名称
        menus: [], // 权限数组
        status: 1,
      },
      rules: {
        // 表单的验证规则
        rolename: [
          { required: true, message: "角色名称必须写", trigger: "blur" },
        ],
      },
      menulist: [], //树形结构
      isStrictly: false, // 不是严格模式， 父子是关联的。 父点击了子全部选中，子点击了父也会被勾中
    };
  },
  created() {
    this.getlist(); //获取数据
  },
  methods: {
    //渲染数据列表
    async getlist() {
      let res = await tableDatalist();
      this.list = res.data.list;
      let menu = await tableData(); //获取数据
      this.menulist = menu.data.list;
    },
    //添加数据
    roleAdd() {
      this.formAction = "add";
      this.dialogFormVisible = true;
    },
    //编辑
    handleEdit(row) {
      this.formAction = "edit";
      this.editID = row.id;
      this.forminfo.rolename = row.rolename;
      this.forminfo.menus = row.menus;
      console.log("row",row);
      this.forminfo.status = row.status;
      this.dialogFormVisible = true;
      // console.log(row);
    },
    //删除
    handleDelete(id) {
      console.log(id);
      this.$confirm("确定删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await delRole(id);
        console.log("res",res);
        this.$message({ message: "删除成功", type: "success", center: true });
        this.getlist(); //删除之后在重新获取菜单列表
      });
    },
    //提交
    submit() {
      this.$refs.forminfo.validate(async (isok) => {
        let res;
        if (isok) {
          if (this.editID) {
            this.forminfo.id = this.editID; //添加id
            res = await editRole(this.forminfo); //修改后发送请求
            this.$message({
              message: "修改成功",
              type: "success",
              center: true,
            });
          } else {
            res = await addRole(this.forminfo); //添加后发送请求
            this.$message({
              message: "添加成功",
              type: "success",
              center: true,
            });
          }
          this.dialogFormVisible = false; //关闭模态框
          this.getlist(); //调用渲染列表
        } else {
          this.$message.warn("验证不通过");
        }
      });
    },
    //重置
    reset() {
      this.forminfo.rolename = "";
      // this.forminfo.menus = [];
      this.$message({ message: "重置成功", type: "success", center: true });
    },
  },
};
</script>

<style lang="scss" scoped>
.role-center {
  text-align: center;
}
.jueSBtn {
  margin-right: 10px;
}
.menu-icon {
  background: #fc8a6d;
  border: none;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.jueS {
  display: flex;
  justify-content: center;
  align-items: center;
}
.quanX {
  display: flex;
  justify-content: center;
  padding-left: 35px;
}
.quanX h4 {
  margin: 0;
}
</style>