<template>
  <!-- 秒杀活动页面 -->
  <div>
    <el-row>
      <el-button
        class="el-icon-circle-plus-outline menu-icon"
        type="success"
        :round="true"
        @click="addSeck"
      >
        添加秒杀</el-button
      >
    </el-row>
    <template>
      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <!-- 活动名称 -->
        <el-table-column
          label="活动名称"
          width="180"
          prop="title"
        ></el-table-column>
        <!-- 开始时间 -->
        <el-table-column label="开始时间" width="180" prop="begintime">
           <template slot-scope="scope">{{ scope.row.begintime*1  }}</template>
        </el-table-column>
        <!-- 结束时间 -->
        <el-table-column
          label="结束时间"
          width="180"
          prop="endtime"
        >
         <template slot-scope="scope">{{ scope.row.endtime*1  }}</template>
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
            >
              </el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 模态框 -->
    <el-dialog
      :title="formAction == 'add' ? '添加秒杀活动' : '编辑秒杀活动'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-width="100px"
        :model="forminfo"
        :rules="rules"
        ref="forminfo"
      >
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="forminfo.title"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" prop="first_cateid">
          <el-select
            v-model="forminfo.first_cateid"
            @change="topChange"
            placeholder="请选择"
          >
            <el-option label="请选择" value></el-option>
            <el-option
              v-for="item in toplist"
              :label="item.catename"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="first_cateid">
          <el-select
            v-model="forminfo.second_cateid"
            @change="secondChange"
            placeholder="请选择"
          >
            <el-option label="请选择" value></el-option>
            <el-option
              v-for="item in secondlist"
              :label="item.catename"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择商品" prop="goodsid">
          <el-select v-model="forminfo.goodsid" placeholder="请选择">
            <el-option label="请选择" value></el-option>
            <el-option
              v-for="item in goodslist"
              :label="item.goodsname"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="forminfo.status" :label="1">正常</el-radio>
          <el-radio v-model="forminfo.status" :label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">{{
            formAction == "add" ? "立即添加" : "立即修改"
          }}</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GatetableData } from "@/api/CategoryList";
import { GoodtableData } from "@/api/GoodsList";
import {
  tableData,
  addSeckill,
  editSeckill,
  delSeckill,
} from "@/api/SeckillList";
let defaultInfo ={};
export default {
  data() {
    return {
      list: [], //存储列表
      formAction: "add",
      dialogFormVisible: false, //模态框开关
      editID:'',
      forminfo: {
        title: "", // 活动名称
        begintime: "", // 开始时间
        endtime: "", // 结束时间
        first_cateid: "", // 一级id
        second_cateid: "", // 二级id
        goodsid: "", // 商品编号
        status: 1, // 状态
      },
      rules: {
        // 表单的验证规则
        title: [{ required: true, message: "活动名称必须写", trigger: "blur" }],
        first_cateid: [
          { required: true, message: "一级分类必须", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "二级分类必须", trigger: "blur" },
        ],
        goodsid: [{ required: true, message: "请选择商品", trigger: "blur" }],
      },
      toplist: [], //一级分类列表,用于下拉列表！
      secondlist: [], // 二级分类列表,用于下拉列表！
      goodslist: [], // 商品列表
      time: "", // 日期范围
      pickerOptions: {
        // 日期选择器配置项目
        shortcuts: [
          {
            text: "1天内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "3天内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 3);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "1周内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      let res = await tableData();
      this.list = res.data.list;
      console.log(this.list);
      //用于表单一级下拉列表
      let getGate = await GatetableData();
      this.toplist = getGate.data.list;
      console.log("this.toplist",this.toplist);
      //用于表单二级下拉列表
      let getGood = await GoodtableData();
      this.goodslist = getGood.data.list;
    },
    //添加
    addSeck() {
      this.formAction = "add";
      this.dialogFormVisible = true;
    },
    //编辑
     handleEdit(row) {
      this.formAction = "edit";
      this.editID=row.id
      // if (this.editID) {
      //   let res=await this.list;
      //   console.log("12345",res);
      // }
      // this.forminfo.title=row.title;
      // this.forminfo.begintime=row.begintime;
      // this.forminfo.endtime=row.endtime;
      // this.forminfo.first_cateid=row.first_cateid;
      // this.forminfo.second_cateid=row.second_cateid;
      // this.forminfo.goodsid=row.goodsid;
      // this.forminfo.status=row.status;
      this.dialogFormVisible = true;
      // console.log( row);
        // 获取修改数据，赋给表单！
      this.forminfo = row;
      // 回显时间
      let start = new Date(this.forminfo.begintime*1)
      let end = new Date(this.forminfo.endtime*1)
      this.time = [start,end]
      this.topChange(this.forminfo.first_cateid);
      this.secondChange(this.forminfo.second_cateid);
      // 赋给一个临时变量，用于重置的时候再次赋值！
      defaultInfo = { ...this.forminfo };
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    //提交
    submit() {},
    //重置
    reset() {},
    async topChange(id) {
      console.log("cal",id);
      // 如果选择了一级，就要去寻找一级对应的二级分类菜单
      if (id) {
        // val就是一级分类的id
        this.second = await GatetableData({id});
        // this.second.data.list=val
        console.log("一级",this.second);
        // console.log(GatetableData(val));
        // console.log(this.secondlist);
      } else {
        this.secondlist = [];
      }
    },
    async secondChange(id) {
      
      // 如果选择了二级，就要去寻找对应商品
      if (id) {
        // val就是二级分类的id
        this.goodslist = await GoodtableData(
          this.forminfo.first_cateid,
          id
        );
      } else {
        this.goodslist = [];
      }
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