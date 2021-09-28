<template>
  <div class="main">
    <div class="btn">
      <el-button type="primary"  class="handle-del mr10" @click="drawer = true">添加页头广告</el-button>
    </div>
    <el-tabs type="border-card" :stretch=true>
      <el-tab-pane label="小米手机" >
          <el-table :data="xiaomitable" :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column label="图片" width="400px" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.productImg" alt="" style="width: 80px;margin-left:-10px"/>
              </template>
            </el-table-column>
            <el-table-column label="产品名称" width="250px" prop="productName" align="center"></el-table-column>
            <el-table-column label="排序值" sortable width="250px" prop="sort" align="center"></el-table-column>
            <el-table-column label="操作" width="310px" align="center"></el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="Redmi手机">
          <el-table :data="redmitable">
            <el-table-column label="图片" width="400px" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.productImg" alt="" style="width: 80px;margin-left:-10px"/>
              </template>
            </el-table-column>
            <el-table-column label="产品名称" width="250px" prop="productName" align="center"></el-table-column>
            <el-table-column label="排序值" sortable width="250px" prop="sort" align="center"></el-table-column>
            <el-table-column label="操作" width="310px" align="center"></el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="电视">
        <el-table :data="tvtable">
          <el-table-column label="图片" width="400px" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.productImg" alt="" style="width: 80px;margin-left:-10px"/>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" width="250px" prop="productName" align="center"></el-table-column>
          <el-table-column label="排序值" sortable width="250px" prop="sort" align="center"></el-table-column>
          <el-table-column label="操作" width="310px" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="笔记本">
        <el-table :data="computertable">
          <el-table-column label="图片" width="400px" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.productImg" alt="" style="width: 80px;margin-left:-10px"/>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" width="250px" prop="productId" align="center"></el-table-column>
          <el-table-column label="排序值" sortable width="250px" prop="sort" align="center"></el-table-column>
          <el-table-column label="操作" width="310px" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="平板">
        <el-table :data="ipadtable">
          <el-table-column label="图片" width="400px" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.productImg" alt="" style="width: 80px;margin-left:-10px"/>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" width="250px" prop="productName" align="center"></el-table-column>
          <el-table-column label="排序值" sortable width="250px" prop="sort" align="center"></el-table-column>
          <el-table-column label="操作" width="310px" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="家电">
        <el-table :data="jiadiantable">
          <el-table-column label="图片" width="400px" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.productImg" alt="" style="width: 80px;margin-left:-10px"/>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" width="250px" prop="productName" align="center"></el-table-column>
          <el-table-column label="排序值" sortable width="250px" prop="sort" align="center"></el-table-column>
          <el-table-column label="操作" width="310px" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="路由器">
        <el-table :data="luyouqitable">
          <el-table-column label="图片" width="400px" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.productImg" alt="" style="width: 80px;margin-left:-10px"/>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" width="250px" prop="productName" align="center"></el-table-column>
          <el-table-column label="排序值" sortable width="250px" prop="sort" align="center"></el-table-column>
          <el-table-column label="操作" width="310px" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="智能硬件">
        <el-table :data="zhinengtable">
          <el-table-column label="图片" width="400px" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.productImg" alt="" style="width: 80px;margin-left:-10px"/>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" width="250px" prop="productName" align="center"></el-table-column>
          <el-table-column label="排序值" sortable width="250px" prop="sort" align="center"></el-table-column>
          <el-table-column label="操作" width="310px" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-drawer
        title="添加商品"
        :before-close="handleClose"
        :visible.sync="drawer"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="headerform"  status-icon ref="headerform" label-width="70px" class="demo-ruleForm" style="margin-left:20px">
            <el-form-item label="所属分类" prop="categoryId">
              <el-select v-model="headerform.categoryId" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.categoryId"
                  :label="item.label"
                  :value="item.categoryId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上传图片" ref="uploadElement" prop="imageUrl">
              <el-input v-if="false"></el-input>
              <el-upload
                class="avatar-uploader"
                ref="upload"
                :headers="headers"
                :limit="1"
                :data="headerform"
                :on-success="handleContentSuccess"
                :before-upload="beforeAvatarUpload"
                action="http://localhost:8081/content/addContent"
                list-type="picture-card"
                :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                      <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                      <i class="el-icon-delete"></i>
                      </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="所属商品" prop="productId">
              <el-select v-model="headerform.productId" :filterable=true clearable placeholder="请选择">
                <el-option
                  v-for="item in allproduct"
                  :key="item.productId"
                  :label="item.productId+':'+item.productName"
                  :value="item.productId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序值" prop="sort">
              <el-input v-model="headerform.sort" placeholder="排序值" style="width:300px"></el-input>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="">取 消</el-button>
            <el-button type="primary" @click="submitForm('headerform')">确定</el-button>
          </div>
        </div>
      </el-drawer>
    </el-tabs>
  </div>
</template>

<script>
import {mixin} from '../mixins/index'
import { HttpManager } from '../api/index'
export default {
  name: "ContentHeader",
  mixins: [mixin],
  data() {
    return {
      activeName: 'second',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      allproduct: [],
      alltable: [],
      xiaomitable: [],
      redmitable: [],
      tvtable: [],
      computertable: [],
      ipadtable: [],
      jiadiantable: [],
      luyouqitable: [],
      zhinengtable: [],
      drawer: false,
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
      options: [{
        categoryId: '2',
        label: '小米手机'
      }, {
        categoryId: '3',
        label: 'Redmi手机'
      }, {
        categoryId: '5',
        label: '电视'
      }, {
        categoryId: '15',
        label: '笔记本'
      }, {
        categoryId: '25',
        label: '平板'
      }, {
        categoryId: '27',
        label: '家电'
      }, {
        categoryId: '75',
        label: '路由器'
      }, {
        categoryId: '65',
        label: '智能硬件'
      }],
      headerform: {
        categoryId: '',
        productId: '',
        sort: '',
      },
    };
  },
  mounted() {
    this.getAllContent(),
    this.getAllProduct()
  },
  methods: {
    getAllProduct(){
      HttpManager.getAllProduct().then(res =>{
        this.allproduct = res
      })
    },
    getAllContent(){
      HttpManager.getAllContent().then(res => {
        this.alltable = res
        this.xiaomitable = [],
        this.redmitable = [],
        this.tvtable = [],
        this.computertable = [],
        this.ipadtable = [],
        this.jiadiantable = [],
        this.luyouqitable = [],
        this.zhinengtable = []
        for (let item of this.alltable){
          if (item.categoryId === 2) {
            this.xiaomitable.push(item)
          }
          if (item.categoryId === 3) {
            this.redmitable.push(item)
          }
          if (item.categoryId === 5) {
            this.tvtable.push(item)
          }
          if (item.categoryId === 15) {
            this.computertable.push(item)
          }
          if (item.categoryId === 25) {
            this.ipadtable.push(item)
          }
          if (item.categoryId === 27) {
            this.jiadiantable.push(item)
          }
          if (item.categoryId === 75) {
            this.luyouqitable.push(item)
          }
          if (item.categoryId === 65) {
            this.zhinengtable.push(item)
          }
        }
      })
    },
    submitForm(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$refs.upload.submit();
        } else {
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.$refs.headerform.resetFields();
        })
        .catch(_ => {});
    },
    handleContentSuccess(res, file){
      let _this = this
      if (res.code === 1) {
        _this.$notify({
          title: '上传成功',
          type: 'success'
        })
        _this.handleRemove(file);
        _this.drawer = false;
        _this.getAllContent();
      } else {
        _this.$notify({
          title: '上传失败',
          type: 'error'
        })
        _this.handleRemove(file);
      }
      _this.$refs.headerform.resetFields();
    },
  }
};
</script>

<style lang="scss" scoped>
  .main{
    margin: 20px;
    .btn{
      margin-bottom: 20px;
    }
  }
</style>
