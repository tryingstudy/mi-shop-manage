<template>
    <div class="main">
        <div class="btn">
            <el-button type="primary"  class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-input v-model="select_word"  placeholder="筛选相关用户" class="handle-input mr10" style="width:300px"></el-input>
            <el-button type="primary"  class="iconfont icon-tianjia"  @click="drawer = true">&nbsp;&nbsp;添加商品</el-button>
            <el-button style="background-color:green;color:white" class="iconfont icon-xiangshang4"  @click="centerDialogVisible = true">上架商品</el-button>
            <el-button style="background-color:red;color:white"  class="iconfont icon-xiangxia4"  @click="centerDialogVisible = true">下架商品</el-button>
        </div>
        <el-table :data="data" border size="mini" style="width: 100%;font-size: 15px;" ref="multipleTable" height="550px" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column label="图片" width="80" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.productPicture" alt="" style="width: 50px;height:50px"/>
              <el-upload
                class="upload-demo"
                :action="uploadUrl(scope.row.productId)"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <el-button size="mini" style="margin-left:-10px">更新图片</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column label="编号" prop="productId" width="60" align="center"></el-table-column>
          <el-table-column label="名称" prop="productName" width="80" align="center"></el-table-column>
          <el-table-column label="分类" prop="categoryId" width="70" align="center"></el-table-column>
          <el-table-column label="商品标题" prop="productTitle" width="90" align="center"></el-table-column>
          <el-table-column label="商品介绍" prop="productIntro" width="362" align="center"></el-table-column>
          <el-table-column label="原价" prop="productPrice" width="67" align="center"></el-table-column>
          <el-table-column label="售价" prop="productSellingPrice" width="67" align="center"></el-table-column>
          <el-table-column label="数量" prop="productNum" width="70" align="center"></el-table-column>
          <el-table-column label="商品状态" width="82" align="center">
              <el-tag color="green" style="width:60px">标签二</el-tag>
              <template slot-scope="scope">
                  <el-tag :type="changeStatus(scope.row.productStatus)" style="width:60px">{{changeStatustext(scope.row.productStatus)}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" class="iconfont icon-xiugai" @click="handleEdit(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" class="iconfont icon-shanchu" @click="handleDelete(scope.row.userId)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
        <el-drawer
            title="添加商品"
            :visible.sync="drawer"
            direction="rtl"
            :before-close="handleClose"
        >
            <el-form :model="addForm" status-icon ref="addForm" label-width="70px" class="demo-ruleForm">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="addForm.name" placeholder="商品名称" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="category">
                    <el-cascader
                        v-model="value"
                        :show-all-levels="false"
                        :options="setTree"
                        :props="defaultProps"
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button  >取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </span>
        </el-drawer>
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
          <div class="del-dialog-cnt" align="center">删除不可恢复，是否确定删除？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteRow">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
 import {mixin} from '../mixins/index.js';
import { HttpManager } from '../api/index'
    export default {
        mixins: [mixin],
        data(){
            return {
                tableData: [],
                tempDate: [],
                addForm: {
                    name: '',
                    category: '',
                },
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    img: 'imgurl',
                },
                delVisible: false,
                drawer: false,
                setTree:[],
                select_word: '',
                multipleSelection: [],
                idx: -1,
                pageSize: 5, // 页数
                currentPage: 1, // 当前页
            }
        },
        computed: {
            data () {
                return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            }
        },
        created () {
            this.getData()
        },
        mounted(){
            this.getCategoryData();
        },
        methods: {
            getData () {
                this.tableData = []
                this.tempDate = []
                HttpManager.getAllProduct().then((res) => {
                    this.tableData = res
                    this.tempDate = res
                    this.currentPage = 1
                })
            },
            changeStatus(value){
                if(value==1){
                    return 'success';
                }else{
                    return 'danger';
                }
            },
            changeStatustext(value){
                if(value==1){
                    return '销售中';
                }else{
                    return '未上架';
                }
            },
            uploadUrl (id) {
                return `http://localhost:8081/user/avatar/update?id=${id}`
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            handleDelete (id) {
                this.idx = id
                this.delVisible = true
                },
            // 获取批量要删除的列表
            handleSelectionChange (val) {
                this.multipleSelection = val
            },
            // 批量删除
            delAll () {
                for (let item of this.multipleSelection) {
                    this.handleDelete(item.userId)
                    this.deleteRow(item.userId)
                }
                this.multipleSelection = []
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