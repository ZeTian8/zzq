<template>
  <!-- 商品规格页面 -->
  <div>
    <el-row>
      <el-button
        class="el-icon-circle-plus-outline menu-icon"
        type="success"
        :round="true"
        @click="addSpecs"
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
        <!-- ID -->
        <el-table-column label="ID" width="180" prop="id"></el-table-column>
        <!-- 属性名称 -->
        <el-table-column
          label="属性名称"
          width="180"
          prop="specsname"
        ></el-table-column>
        <!-- 属性值 -->
        <el-table-column label="属性值" width="180" prop="attrs">
          <template slot-scope="scope">
            <el-tag
              style="margin-left: 10px"
              v-for="(AttrsItem, AttrsId) in scope.row.attrs"
              :key="AttrsId"
              >{{ AttrsItem }}</el-tag
            >
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态" width="180" prop="status">
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
              class="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
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
      <el-form label-width="100px" :model="forminfo" ref="forminfo">
        <el-form-item label="属性名" prop="specsname">
          <el-input v-model="forminfo.specsname"></el-input>
        </el-form-item>
        <el-form-item label="属性值">
          <div class="row" v-for="(item, index) in attrlist" :key="index">
            <el-input v-model="item.value"></el-input>
            <el-button v-if="index == 0" @click="addAttr" type="success"
              >添加属性</el-button
            >
            <el-button v-else @click="delAttr(index)" type="danger"
              >删除属性</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="forminfo.status" :label="1">正常</el-radio>
          <el-radio v-model="forminfo.status" :label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">{{
            formAction == "add" ? "立即添加" : "立即重置"
          }}</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { tableData, editSpecs, AddSpecs, DelSpecs } from "@/api/SpecsList";
// let defaultInfo={}
export default {
  data() {
    return {
      list: [],
      formAction: "add",
      DialogVisible: false,
      editID: "",
      forminfo: {
        specsname: "", // 属性名
        attrs: "", // 属性值
        status: 1, // 状态
      },
      attrlist: [{ value: "" }], // 属性值数组
    };
  },
  created() {
    this.getlist(); //获取渲染列表
  },
  methods: {
    //获取渲染列表
    async getlist() {
      let res = await tableData();
      this.list = res.data.list;
    },
    //添加
    addSpecs() {
      this.formAction = "add";
      this.DialogVisible = true;
    },
    //编辑
    handleEdit(row) {
      this.formAction = "edit";
      this.forminfo.specsname = row.specsname;
      // this.forminfo.attrs = row.attrs;
      this.forminfo.status = row.status;
      this.editID = row.id;
      this.DialogVisible = true;
    },
    //删除
    handleDelete(id) {
      //DelSpecs
      console.log(id);
      this.$confirm("确定删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await DelSpecs({ id });
        // console.log("res", res);
        this.$message({ message: "删除成功", type: "success", center: true });
        this.getlist(); //删除之后在重新获取菜单列表
      });
    },
   
    //提交或修改
    submit() {
      this.$refs.forminfo.validate(async (isok) => {
        console.log(isok);
        console.log(this.forminfo);
        let res;
        if (isok) {
          if (this.editID) {
            this.forminfo.id = this.editID;
            res = await editSpecs(this.forminfo);
            // addAttr(this.forminfo)
            this.$message({
              message: "修改成功",
              type: "success",
              center: true,
            });
          } else {
            res = await AddSpecs(this.forminfo);
          }
          this.DialogVisible = false;
          this.getlist();
        } else {
          this.$message.warn("验证不通过");
        }
      });
    },
    //添加属性
    addAttr() {
      if (this.attrlist.length <= 5) {
        this.attrlist.push({ value: "" });
      } else {
        this.$message.warning("属性值最多5个");
      }
    },
    delAttr(idx) {
      this.attrlist.splice(idx, 1);
    },
    //重置
    reset() {
      this.forminfo.specsname = "";
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
.row {
  display: flex !important;
  margin-bottom: 10px;
}
</style>