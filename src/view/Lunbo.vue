<template>
    <div class="main">
        <div class="btn">
            <el-button type="primary" class="el-icon-plus" @click="centerDialogVisible = true">添加轮播图</el-button>
        </div>
        <el-table :data="tableData" border size="mini" style="width: 100%;font-size: 15px;" ref="multipleTable">
          <el-table-column label="轮播图id" prop="bannerId" width="90" align="center"></el-table-column>
          <el-table-column label="轮播图" width="450" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.image" alt="" style="width: 450px;"/>
            </template>
          </el-table-column>
          <el-table-column label="产品Id" prop="productid" width="130" align="center"></el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="250" align="center"></el-table-column>
          <el-table-column label="操作" width="300" align="center">
              <template slot-scope="scope">
                <el-button type="danger" class="iconfont icon-shanchu" @click="handleDelete(scope.row.bannerId)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
      <el-dialog title="添加轮播图" ref="addbanner"  :visible.sync="centerDialogVisible" :close-on-click-modal="false" width="400px" center>
        <el-form :model="addbanner" status-icon ref="addbanner" label-width="70px" class="demo-ruleForm" style="margin-left:20px">
          <el-form-item label="上传图片" ref="uploadElement" prop="imageUrl">
            <el-input v-model="addbanner.imageUrl" v-if="false"></el-input>
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :headers="headers"
              :limit="1"
              :data="addbanner"
              :on-success="handleBannerSuccess"
              :before-upload="beforeAvatarUpload"
              action="http://localhost:8081/banner/addbanner"
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
          <el-form-item label="选择所属" prop="productId">
            <el-select v-model="addbanner.productId" clearable placeholder="请选择">
              <el-option
                v-for="item in productData"
                :key="item.productId"
                :label="item.productName"
                :value="item.productId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="padding-left: 100px">
          <el-button @click="close('addbanner')">取 消</el-button>
          <el-button type="primary" @click="submitForm('addbanner')">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteRow">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
import {mixin} from '../mixins/index';
import { HttpManager } from '../api/index'
    export default {
      mixins: [mixin],
        data(){
            return {
                tableData: [],
                delVisible: false,
                idx: '',
                centerDialogVisible: false,
                dialogVisible:false,
                dialogImageUrl: '',
                disabled: false,
                productData: [],
                headers: {
                  Authorization: localStorage.getItem('Authorization'),
                },
                addbanner: {
                  productId: ''
                }
            }
        },
        mounted(){
          this.getBannerData(),
          this.getProductData()
        },
        methods: {
          close(formName){
            this.centerDialogVisible = false
            this.$refs[formName].resetFields();
          },
          getBannerData(){
            this.tableData = []
            HttpManager.getbanner().then(res =>{
              this.tableData = res
            })
          },
          getProductData() {
            this.productData = [],
              HttpManager.getAllProduct().then(res =>{
                this.productData = res
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
          handleBannerSuccess (res, file) {
            let _this = this
            if (res.code === 1) {
              _this.$notify({
                title: '上传成功',
                type: 'success'
              })
              _this.handleRemove(file);
              _this.getBannerData();
              _this.$refs.addbanner.resetFields();
            } else {
              _this.$notify({
                title: '上传失败',
                type: 'error'
              })
            }
          },
          handleDelete (bannerId) {
            this.idx = bannerId
            this.delVisible = true
          },
          deleteRow(){
            HttpManager.delbanner(this.idx).then(res => {
              if (res.code === 1) {
                this.getBannerData();
                this.notify('删除成功', 'success');
              } else {
                this.notify('删除失败', 'error');
              }
            })
            this.delVisible = false
          },
        }
    }
</script>

<style lang="scss" scoped>
    .main{
        margin: 20px;
      .btn{
        margin-bottom: 20px;
      }
    }
</style>
