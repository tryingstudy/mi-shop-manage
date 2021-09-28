<template>
    <el-container style="margin-top:10px;">
      <el-aside width="500px" style="border:1px;height:100%;background:#fff">
        <el-tree
        :data="setTree"
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :expand-on-click-node="false"
        >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <img v-if="data.parentId!=0" :src="data.img" width="50px" height="50px">
              <span>{{ node.label }}</span>
              <span class="btn">
                <el-button
                  title="添加分类"
                  class="iconfont icon-tianjia"
                  type="text"
                  size="mini"
                  @click="() => addform(node,data)">
                </el-button>
                  <el-button
                    class="iconfont icon-xiugaitupian"
                    v-if="data.parentId!=0"
                    title="修改分类图片"
                    type="text"
                    size="mini"
                  >
                  </el-button>
                <el-button
                  title="修改分类名"
                  class="iconfont icon-xiugai"
                  type="text"
                  size="mini"
                  @click="() => rename(data)">
                </el-button>
                <el-button
                  v-if="data.parentId!=0"
                  title="删除分类"
                  class="iconfont icon-shanchu"
                  type="text"
                  size="mini"
                  @click="() => remove(data)">
                </el-button>
              </span>
            </span>
        </el-tree>
      </el-aside>
      <el-main>
        <div v-show="addcategoryForm">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="父类名称">
              {{parentname}}
            </el-form-item>
            <el-form-item label="类别名称" prop="name">
              <el-input v-model="ruleForm.name" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" ref="uploadElement" prop="imageUrl">
              <el-input v-model="ruleForm.imageUrl" v-if="false"></el-input>
                <el-upload
                  class="avatar-uploader"
                  ref="upload"
                  :headers="headers"
                  :limit="1"
                  :data="ruleForm"
                  :on-success="handleCategorySuccess"
                  :before-upload="beforeAvatarUpload"
                  action="http://localhost:8081/category/addcategory"
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
              <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
          </el-form>
        </div>
        <el-dialog :visible.sync="renameForm" width="450px" :close-on-click-modal="false" center>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="分类名称">
              <el-input v-model="form.name" style="width:300px"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button  @click="renameForm = false">取 消</el-button>
            <el-button type="primary" @click="updateCategory('form')">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
          <div class="del-dialog-cnt" align="center">删除不可恢复，是否确定删除？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="delCategory(form)">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
</template>
<script>
 import {mixin} from '../mixins/index.js';
import { HttpManager } from '../api/index'
export default {
  mixins: [mixin],
   data() {
        return {
            addcategoryForm: false,
            renameForm: false,
            delVisible: false,
            setTree:[],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            headers: {
              Authorization: localStorage.getItem('Authorization')
            },
            defaultProps: {
                children: 'children',
                label: 'name',
                img: 'img',
            },
            parentname: '',
            ruleForm: {
                name: '',
                id: '',
            },
            form: {
              name: '',
              id: '',
            },
            rules: {
                name: [
                    {required: true, message: '请输入分类名称', trigger: 'blur'},
                ],
            }
        }
    },
     mounted(){
       this.getCategoryData();
     },
  methods: {
    rename(data) {
      this.form = {
        name: data.name,
        id: data.id,
      }
      this.renameForm = true
      this.addcategoryForm= false
    },
    addform(node, data) {
      this.parentname = node.label
      this.ruleForm.id = data.id
      this.addcategoryForm= true
    },
    remove(data){
      this.form = {
        id: data.id
      }
      this.delVisible = true
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
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.imageUrl = '';
    },

    handleCategorySuccess (res, file) {
      let _this = this
      if (res.code === 1) {
        _this.$notify({
          title: '上传成功',
          type: 'success'
        })
        _this.handleRemove(file);
        _this.getCategoryData();
        _this.$refs.ruleForm.resetFields();
      } else {
        _this.$notify({
          title: '上传失败',
          type: 'error'
        })
      }
    },
    updateCategory(formName){
      let params = new URLSearchParams();
      params.append("name",this.form.name);
      params.append("id",this.form.id);
      HttpManager.updateCategory(params).then(res => {
        if(res.code === 1){
          this.renameForm = false
          this.notify('修改成功', 'success')
          this.getData();
        }else{
          this.notify('修改失败', 'error')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    delCategory(formName){
      let params = new URLSearchParams();
      params.append("id",this.form.id);
      HttpManager.delCategory(params).then(res => {
        if(res.code === 1){
          this.delVisible = false
          this.notify('删除成功', 'success')
          this.getData();
        }else{
          this.notify('删除失败', 'error')
        }
      }).catch(err => {
        console.log(err)
      })
    },
  },
}


</script>
<style lang="scss" scoped>
  .breadcrumb{
    height: 30px;
    padding: 1px 0px;
  }
   .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 17px;
    padding-right: 8px;
  }
  .el-tree{
    margin:20px;
  }
</style>
<style>
  .el-tree-node__content{
    height: 50px;
  }
  .custom-tree-node{
    height: 50px;
  }
</style>
