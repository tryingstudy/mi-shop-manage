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
              <img v-if="data.parentId!=0" :src="data.imgurl" width="50px" height="50px">
              <span>{{ node.label }}</span>
              <span >
                <el-button class="iconfont icon-tianjia"
                  type="text"
                  size="mini"
                  @click="() => addform(node,data)">
                </el-button>
                <el-button
                  class="iconfont icon-xiugai"
                  type="text"
                  size="mini"
                  @click="() => updateform(node, data)">
                </el-button>
                <el-button
                  class="iconfont icon-shanchu"
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
                </el-button>
              </span>
            </span>
        </el-tree>
      </el-aside>
      <el-main>
        <div v-show="addcategoryForm">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="父.类名称">
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
                        action="http://localhost:8081/category/addcategory"
                        :show-file-list="false"
                        :on-success="handleCategorySuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-change="handleChange"
                        :auto-upload="false"
                        :data="ruleForm">
                  <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
          </el-form>
        </div>
        <div v-show="updatecategoryForm">
          <h3>修改分类</h3>
          <el-form  ref="addForm" >
            <el-form-item label="shouji" prop="phone">
              <el-input v-model="addForm.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" placeholder="密码" v-model="addForm.password"></el-input>
            </el-form-item>
          </el-form>
        </div>
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
            updatecategoryForm: false,
            setTree:[],
            addForm:{
              phone: '',
              passowrd: '',
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            defaultProps: {
                children: 'children',
                label: 'name',
                img: 'imgurl',
            },
            parentname: '',
            ruleForm: {
                name: '',
                imageUrl: '',
                id: '',
            },
            rules: {
                name: [
                    {required: true, message: '请输入分类名称', trigger: 'blur'},
                ],
                imageUrl: [
                    {required: true, message: '请上传图片', trigger: 'blur'},
                ],
            }
        }
    },
     created() {
        var _this = this;
        HttpManager.getCategory().then(data => {
          console.log(data)
            this.setTree = data
            _this.getListData()
        });
    },
  methods: {
    updateform(node, data) {
      this.addcategoryForm= false
      this.updatecategoryForm = true
    },
    addform(node, data) {
      this.parentname = node.label
      this.ruleForm.id = data.id
      this.addcategoryForm= true
      this.updatecategoryForm = false
    },
    getListData() {
      let dataArray = [];
      this.setTree.forEach(function (data) {
        let parentId = data.parentId;
        if (parentId == 0) {
            let objTemp = {
                id: data.id,
                name: data.name,
                parentId: parentId,
                // imgurl: data.img,
            }
            dataArray.push(objTemp);
        }
      })
      this.data2treeDG(this.setTree, dataArray)
    },
    data2treeDG(datas, dataArray) {
        for (let j = 0; j < dataArray.length; j++) {
            let dataArrayIndex = dataArray[j];
            let childrenArray = [];
            let Id = dataArrayIndex.id;
            for (let i = 0; i < datas.length; i++) {
                let data = datas[i];
                let parentId = data.parentId;
                if (parentId == Id) {
                    let objTemp = {
                        id: data.id,
                        name: data.name,
                        parentId: parentId,
                        imgurl: data.img,
                    }
                    childrenArray.push(objTemp);
                }
            }
            dataArrayIndex.children = childrenArray;
            if (childrenArray.length > 0) {//有儿子节点则递归
                this.data2treeDG(datas, childrenArray)
            }
        }
        this.setTree = dataArray;
        return dataArray;
    },
    handleRemove(file) {
      let fileList = this.$refs.upload.uploadFiles;
      let index = fileList.findIndex( fileItem => {return fileItem.uid === file.uid});
      fileList.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
            _this.$refs.ruleForm.resetFields();
            this.ruleForm.imageUrl = '';
            _this.addcategoryForm= false;
          } else {
            _this.$notify({
              title: '上传失败',
              type: 'error'
            })
          }
        },
    handleChange (file, fileList) {
        this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
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
  .btn{
    flex: 1;
    margin-top: 50px;
    width: 200px;
  }
  .btn1{
      margin-left: 200px;
    }
  
</style>
<style>
  .el-tree-node__content{
    height: 50px;
  }
  .custom-tree-node{
    height: 50px;
  }
  input[type="file"] {
        display: none;
    }
 
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
 
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
 
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
 
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
