<template>
  <!-- 商品管理页面 -->
  <div>
    <el-row>
      <el-button
        class="el-icon-circle-plus-outline menu-icon"
        type="success"
        :round="true"
        @click="addGoods"
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
        <!-- 一级分类 -->
        <el-table-column
          label="一级分类"
          width="100"
          prop="firstcatename"
        ></el-table-column>
        <!-- 二级分类 -->
        <el-table-column
          label="二级分类"
          width="100"
          prop="secondcatename"
        ></el-table-column>
        <!-- 商品名称 -->
        <el-table-column
          label="商品名称"
          width="100"
          prop="goodsname"
        ></el-table-column>
        <!-- 商品图片 -->
        <el-table-column label="商品图片" width="100" prop="img">
          <template slot-scope="scope">
            <img
              :src="'http://localhost:3000/' + scope.row.img"
              style="width: 100px; border: 1px solid #eee"
              alt=""
            />
          </template>
        </el-table-column>
        <!-- 销售价格 -->
        <el-table-column
          label="销售价格"
          width="100"
          prop="price"
        ></el-table-column>
        <!-- 市场价格 -->
        <el-table-column
          label="市场价格"
          width="100"
          prop="market_price"
        ></el-table-column>
        <!-- 是否新品 -->
        <el-table-column label="市场价格" width="100" prop="isnew">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.newboolean"
              @change="changeRow(scope.row, 'isnew')"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 是否热卖 -->
        <el-table-column label="市场价格" width="100" prop="ishot">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.hotboolean"
              @change="changeRow(scope.row, 'ishot')"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag size="medium" v-if="scope.row.status">已启用</el-tag>
            <el-tag size="medium" v-else>已禁用</el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
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
              @click="handleDelete(scope.$index, scope.row)"
            >
              <i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <br />
    <!-- 分页 -->
    <div class="elPagination">
      <el-pagination
        background
        :page-size="size"
        @current-change="pagechange"
        :current-page="page"
        :total="total"
      >
      </el-pagination>
    </div>
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
        <el-tabs v-model="tabIndex">
          <el-tab-pane label="基本信息" name="1">
            <el-col :span="12" :offset="5">
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
              <el-form-item label="商品名称" prop="goodsname">
                <el-input v-model="forminfo.goodsname"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="price">
                <el-input v-model="forminfo.price"></el-input>
              </el-form-item>
              <el-form-item label="市场价格" prop="market_price">
                <el-input v-model="forminfo.market_price"></el-input>
              </el-form-item>
              <el-form-item label="商品图片" prop="img">
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
                  :limit="4"
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
              <el-form-item label="商品规格" prop="specsid">
                <el-select
                  v-model="forminfo.specsid"
                  @change="specsChange"
                  placeholder="请选择"
                >
                  <el-option label="请选择" value></el-option>
                  <el-option
                    v-for="item in specslist"
                    :label="item.specsname"
                    :value="item.id"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="规格属性值" prop="specsattr">
                <el-select
                  v-model="forminfo.specsattr"
                  multiple
                  placeholder="请选择"
                >
                  <el-option label="请选择" value></el-option>
                  <el-option
                    v-for="item in specsvaluelist"
                    :label="item"
                    :value="item"
                    :key="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否新品" prop="isnew">
                <el-radio v-model="forminfo.isnew" :label="1">是</el-radio>
                <el-radio v-model="forminfo.isnew" :label="0">否</el-radio>
              </el-form-item>
              <el-form-item label="是否热卖" prop="ishot">
                <el-radio v-model="forminfo.ishot" :label="1">是</el-radio>
                <el-radio v-model="forminfo.ishot" :label="0">否</el-radio>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-radio v-model="forminfo.status" :label="1">正常</el-radio>
                <el-radio v-model="forminfo.status" :label="0">禁用</el-radio>
              </el-form-item>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="详细描述" name="2">
            <el-col :span="20">
              <!-- 编辑器 -->
              <vue-wangeditor
                id="editor"
                ref="editor"
                width="100%"
                v-model="forminfo.description"
              ></vue-wangeditor>
              <br /><br />
            </el-col>
          </el-tab-pane>
        </el-tabs>
        <br />
        <el-form-item>
          <el-button type="primary" @click="submit">{{formAcyion=="add"?'立即添加':'立即修改'}}</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 导入编辑器插件
import vueWangeditor from "vue-wangeditor";
import { GoodtableData, gettotal } from "@/api/GoodsList";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formAcyion: "add",
      //开关
      value: true,
      list: [],
      total: 0, // 总数
      size: 10, // 每页条数
      page: 1, // 页码数
      forminfo: {
        first_cateid: "", // 一级分类id
        second_cateid: "", // 二级分类id
        goodsname: "", // 商品名称
        price: "", // 商品价格
        market_price: "", // 市场价格
        description: "", // 商品详情
        specsid: "", // 属性名id
        specsattr: [], // 属性值
        isnew: 0, // 是否新品
        ishot: 0, // 是否热门
        img: "", // 商品图片
        status: 1, // 状态
      },
      rules: {
        // 表单的验证规则
        first_cateid: [
          { required: true, message: "一级分类名称必须选", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "二级分类必须选", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "商品名称必须", trigger: "blur" },
        ],
        price: [{ required: true, message: "商品价格必须", trigger: "blur" }],
        market_price: [
          { required: true, message: "市场价格必须", trigger: "blur" },
        ],
        specsid: [{ required: true, message: "规格名必须", trigger: "blur" }],
        specsattr: [{ required: true, message: "规格值必须", trigger: "blur" }],
      },
      tabIndex: "1",
      toplist: [], //一级分类列表,用于下拉列表！
      secondlist: [], // 二级分类列表,用于下拉列表！
      specslist: [], //商品规格列表
      specsvaluelist: [], // 某规格对应的属性数据
      dialogVisible: false, // 弹框
      dialogImageUrl: "", // 弹框图片地址
      fileList: [], // 上传文件列表
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      let res = await GoodtableData();
      this.list = res.data.list;
      let tot = await gettotal();
      this.total = tot.data.list[0].total;
      // console.log("商品管理", tot.data.list[0].total);
    },
    //添加
    addGoods() {
      this.formAcyion = "add";
      this.dialogFormVisible = true;
    },
    //编辑
    handleEdit(index, row) {
      this.formAcyion = "edit";
      this.dialogFormVisible = true;
      console.log(index, row);
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    submit() {},
    reset() {},
    pagechange(val) {
      this.page = val; // val就是新的页码
      this.getlist(); //  获取新的列表
    },
    async changeRow(val, type) {
      // val是这一行的数据，type是修改的字段（ishot,isnew）
      console.log(val, type);
      // { id:xxx,isnew:xxx }
      // { id:xxx,ishot:xxx }
      let newval = val[type] == 1 ? 0 : 1;
      let data = { id: val.id, [type]: newval };
      // 使用FormData进行提交
      let formdata = new FormData();
      for (let k in data) {
        formdata.append(k, data[k]);
      }
      await editGoods(formdata);
      this.getlist();
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
      this.$message.warning("分类图片最多添加4个");
    },
    async topChange(val) {
      // 如果选择了一级，就要去寻找一级对应的二级分类菜单
      if (val) {
        // val就是一级分类的id
        this.secondlist = await getChildCategory(val);
      } else {
        this.secondlist = [];
        this.forminfo.second_cateid = "";
      }
    },
    async specsChange(val) {
      if (val) {
        // val就是规格名id
        let res = await getSpecs(val);
        this.specsvaluelist = res.attrs;
      } else {
        this.specsvaluelist = [];
        this.forminfo.specsattr = [];
      }
    },

    components: {
      vueWangeditor,
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
.elPagination {
  display: flex;
  justify-content: space-between;
}
</style>