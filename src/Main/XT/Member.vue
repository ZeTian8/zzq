<template>
<!-- 会员管理活动页面 -->
  <div>
    <template>
      <el-table :data="list" style="width: 100%;" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
        <!-- 用户ID -->
        <el-table-column label="用户ID" width="180" prop="uid"></el-table-column>
       <!-- 昵称 -->
        <el-table-column label="昵称" width="180" prop="nickname"></el-table-column>
        <!-- 手机号 -->
        <el-table-column label="手机号" width="180" prop="phone"></el-table-column>
        <!-- 注册日期 -->
        <el-table-column label="注册日期" width="180" prop="addtime"></el-table-column>
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
           
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { tableData ,editMenuber} from "@/api/MemberList";
export default {
  data() {
    return {
      list:[],
    };
  },
  created(){
    this.getlist();
  },
  methods: {
    async getlist(){
      let res=await tableData();
      this.list=res.data.list
      // console.log("会员管理",this.list);
    },
    handleEdit(row) {
      console.log(row);
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
</style>