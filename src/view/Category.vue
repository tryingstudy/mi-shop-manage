<template>
    <el-container style="margin-top:10px;">
      <el-aside width="500px" style="border:1px;height:100%;background:#fff">
        <el-tree 
        :data="setTree" 
        node-key="id" 
        ref="tree" 
        :default-expanded-keys="[1]"
        highlight-current 
        :props="defaultProps"
        :expand-on-click-node="false"
        >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <img src="../assets/img/bingxiang.jpg" style="">
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
          <h3>添加分类</h3>
          <el-form ref="addForm" >
            <el-form-item label="分类名称" prop="phone">
              <el-input v-model="addForm.phone" placeholder="分类名称"></el-input>
            </el-form-item>
          <span>上传类别图片</span>
          <el-upload
            style="margin-top:30px"
            action="#"
            ref="upload"
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
            <el-button type="primary" class="btn btn1" @click="addcategory">添加</el-button>
            <el-button type="info" class="btn btn2">重置</el-button>
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
import { HttpManager } from '../api/index'
export default {
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
                label: 'name'
            },
        }
    },
     created() {
        var _this = this;
        HttpManager.getCategory().then(data => {
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
    addcategory(){

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
</style>
