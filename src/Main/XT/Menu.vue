<template>
  <!-- 菜单管理页面 -->
  <div>
    <!-- 添加 点击弹出模态框-->
    <el-row class="el-row-meunadd">
      <el-button
        type="text"
        @click="centerDialogVisible"
        round
        class="el-icon-circle-plus-outline menu-icon"
        >添加</el-button
      >
    </el-row>
    <template>
      <el-table
        :data="list"
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <!-- id -->
        <el-table-column prop="id" label="ID"></el-table-column>
        <!-- 标题 -->
        <el-table-column label="标题" width="100" prop="title">
        </el-table-column>
        <!-- 类型 -->
        <el-table-column label="类型" width="100" prop="type">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type == 1">目录</el-tag>
            <el-tag v-if="scope.row.type == 2">菜单</el-tag>
          </template>
        </el-table-column>
        <!-- 图标 -->
        <el-table-column label="图标" width="100" prop="icon">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <!-- 地址 -->
        <el-table-column label="地址" width="100" prop="url"> </el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态" width="100" prop="state">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status">已启用</el-tag>
            <el-tag type="danger" v-else>已禁用</el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <MenuAdd> </MenuAdd> -->
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
              @click="handleDel(scope.row.id)"
            >
              <i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 模态框 -->
    <el-dialog
      :title="formAction == 'add' ? '添加菜单' : '编辑菜单'"
      :visible.sync="DialogVisible"
      width="35%"
      center
    >
      <el-form
        label-width="100px"
        :model="forminfo"
        :rules="rules"
        ref="forminfo"
      >
        <!-- 类型 -->
        <el-form-item label="类型" prop="type">
          <el-radio v-model="radio" :label="1">目录</el-radio>
          <el-radio v-model="radio" :label="2">菜单</el-radio>
        </el-form-item>
        <!-- 上级 -->
        <el-form-item label="上级" prop="pid" v-show="forminfo.type == 2">
          <el-select v-model="forminfo.pid" placeholder="请选择父级">
            <el-option label="顶级目录" :value="0"></el-option>
            <el-option
              v-for="item in menulist"
              :label="item.title"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 标题 -->
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="forminfo.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item label="地址" prop="url" v-show="forminfo.type == 2">
          <el-input v-model="forminfo.url"></el-input>
        </el-form-item>
        <!-- 图标 -->
        <el-form-item label="图标" prop="icon" v-show="forminfo.type == 1">
          <el-input v-model="forminfo.icon"></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" prop="status">
          <el-radio v-model="forminfo.status" :label="1">正常</el-radio>
          <el-radio v-model="forminfo.status" :label="0">禁用</el-radio>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            v-if="!editID.id"
            @click="submit"
            >{{formAction=='add'? '立即添加':'立即修改'}}</el-button>
          <el-button type="primary" v-else @click="submit"></el-button>
          <el-button @click="reset(editID)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { tableData, handleDelete, editMenu, addMenu } from "../../api/Menulist";
export default {
  data() {
    return {
      list: [],
      radio: 1,
      disabled: false, //radio是否禁用
      DialogVisible: false, //开关模态框
      formAction: "add", //是否添加或者编辑
      forminfo: {
        pid: 0,
        title: "",
        type: 1,
        url: "",
        icon: "",
        status: 1,
      },
      editID: "",
      rules: {
        //表单标题的验证规则
        title: [{ required: true, message: "标题必须填写", trigger: "blur" }],
      },
      menulist: [], //菜单数据
    };
  },
  created() {
    this.getlist(); //用来获取数据列表
  },
  methods: {
    //渲染列表
    async getlist() {
      let res = await tableData(); //获取数据
      this.list = res.data.list;
      // console.log(this.list);
    },
    // 添加菜单
    centerDialogVisible() {
      this.formAction = "add";
      this.DialogVisible = true;
    },

    //修改菜单数据
    async handleEdit(row) {
      this.formAction = "edit";
      this.editID = row.id; // 给表单数据添加上id
      this.forminfo.title = row.title;
      this.forminfo.icon = row.icon;
      this.DialogVisible = true;
    },

    //根据id删除每一项
    handleDel(id) {
      // console.log("111111111111",id);
      this.$confirm("确定删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        handleDelete(id);
        this.$message({ message: "删除成功", type: "success", center: true });
        this.getlist(); //删除之后在重新获取菜单列表
      });
    },
    // 提交数据 【添加、修改】//获取表单数据为真则发送请求
    submit() {
      this.$refs.forminfo.validate(async (isok) => {
        if (isok) {
          // 发送请求！
          let res;
          if (this.editID) {
            this.forminfo.id = this.editID;//添加id
            res = await editMenu(this.forminfo); // 修改请求
            this.$message({
              message: "修改成功",
              type: "success",
              center: true,
            });
          } else {
            res = await addMenu(this.forminfo); // 添加请求
            this.$message({
              message: "添加成功",
              type: "success",
              center: true,
            });
          }
          this.DialogVisible = false;
          //更新表格
          this.getlist();
        } else {
          this.$message.warn("验证不通过");
        }
      });
    },
    // 重置
    reset() {
      this.forminfo.icon = "";
      this.forminfo.title = "";
      this.$message({ message: "重置成功", type: "success", center: true });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row-meunadd {
  display: flex;
}
.menu-icon {
  background: #f78989;
  color: #ffffff;
  border: none;
  margin-bottom: 10px;
}
.dialog-div-catalogue {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.dialog-div-catalogue div {
  font-size: 16px;
  padding-right: 64px;
}
.dialog-div-title,
.dialog-div-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.dialog-div-title div,
.dialog-div-icon div {
  font-size: 14px;
}
.el-input {
  width: 60%;
}
</style>