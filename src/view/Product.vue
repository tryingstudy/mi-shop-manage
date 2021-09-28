<template>
    <div class="main">
        <div class="btn">
            <el-button type="primary"  class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-input v-model="select_word"  placeholder="筛选相关产品" class="handle-input mr10" style="width:300px"></el-input>
            <el-button type="primary"  class="iconfont icon-tianjia"  @click="drawer = true">&nbsp;&nbsp;添加商品</el-button>
            <el-button style="background-color:green;color:white" class="iconfont icon-xiangshang4" @click="saleAll">上架商品</el-button>
            <el-button style="background-color:red;color:white"  class="iconfont icon-xiangxia4" @click="nosale">下架商品</el-button>
            <el-select v-model="leibie" clearable placeholder="商品类别" style="width: 200px">
              <el-option
                v-for="item in children"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select v-model="status" clearable placeholder="商品状态"  style="width: 200px">
              <el-option
                v-for="item in options"
                :key="item.status"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
        </div>
        <el-table :data="data" border size="mini" style="width: 100%;font-size: 15px;" ref="multipleTable"
                  @selection-change="handleSelectionChange" height="500"
        >
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column label="图片" width="80px" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.productPicture" alt="" style="width: 80px;margin-left:-10px"/>
              <el-upload
                class="upload-demo"
                :headers="headers"
                :action="uploadUrl(scope.row.productId)"
                :show-file-list="false"
                :on-success="UpdateProductSuccess"
                :before-upload="beforeAvatarUpload">
                <el-button size="mini" style="margin-left:-7px;width:75px">更新头像</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column label="编号" prop="productId" width="60" align="center"></el-table-column>
          <el-table-column label="名称" prop="productName" width="80" align="center"></el-table-column>
          <el-table-column label="分类" prop="name" width="70" align="center"></el-table-column>
          <el-table-column label="商品标题" prop="productTitle" width="90" align="center"></el-table-column>
          <el-table-column label="商品介绍" prop="productIntro" width="362" align="center"></el-table-column>
          <el-table-column label="原价" prop="productPrice" width="67" align="center"></el-table-column>
          <el-table-column label="售价" sortable prop="productSellingPrice" width="80" align="center"></el-table-column>
          <el-table-column label="库存" prop="productNum" width="70" align="center"></el-table-column>
          <el-table-column label="商品状态" width="82" align="center">
              <template slot-scope="scope">
                  <el-tag :type="changeStatus(scope.row.productStatus)" style="width:60px">{{changeStatustext(scope.row.productStatus)}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" class="iconfont icon-xiugai" @click="handleEdit(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" class="iconfont icon-shanchu" @click="handleDelete(scope.row.productId)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                background
                layout="total, prev, pager, next"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="tableData.length">
            </el-pagination>
        </div>
        <el-drawer
            title="添加商品"
            :before-close="handleClose"
            :visible.sync="drawer"
            direction="ltr"
            custom-class="demo-drawer"
            ref="drawer"
        >
            <div class="demo-drawer__content">
                <el-form :model="addForm" status-icon ref="addForm" label-width="70px" class="demo-ruleForm" style="margin-left:20px">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="addForm.name" placeholder="商品名称" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="category">
                        <el-cascader
                            v-model="addForm.category"
                            :show-all-levels="false"
                            :options="setTree"
                            :props="defaultProps">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="上传图片" ref="uploadElement" prop="imageUrl">
                        <el-input v-model="addForm.imageUrl" v-if="false"></el-input>
                            <el-upload
                            class="avatar-uploader"
                            ref="upload"
                            :headers="headers"
                            :limit="1"
                            :data="addForm"
                            :on-success="handleProductSuccess"
                            :before-upload="beforeAvatarUpload"
                            action="http://localhost:8081/product/addProduct"
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
                    <el-form-item label="商品标题" prop="title">
                        <el-input v-model="addForm.title" placeholder="商品标题" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品介绍" prop="introduce">
                        <el-input
                            type="textarea"
                            :rows="2"
                            style="width:300px"
                            placeholder="请输入内容"
                            v-model="addForm.introduce">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品原价" prop="price">
                        <el-input v-model="addForm.price" placeholder="商品原价" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品售价" prop="sellingprice">
                        <el-input v-model="addForm.sellingprice" placeholder="商品售价" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品库存" prop="num">
                        <el-input v-model="addForm.num" placeholder="商品库存" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品状态" prop="status">
                        <el-switch
                            v-model="addForm.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="即刻销售"
                            inactive-text="暂不销售"
                            active-value="1"
                            inactive-value="0">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="submitForm('addForm')">确定</el-button>
                </div>
            </div>
        </el-drawer>
        <el-drawer
            title="编辑商品"
            :before-close="handleClose"
            :visible.sync="editVisible"
            direction="rtl"
            custom-class="demo-drawer"
            ref="drawer"
        >
            <div class="demo-drawer__content">
                <el-form :model="updateForm" status-icon ref="updateForm" label-width="70px" class="demo-ruleForm" style="margin-left:20px">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="updateForm.name" placeholder="商品名称" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="category">
                        <el-cascader
                            v-model="updateForm.category"
                            :show-all-levels="false"
                            :options="setTree"
                            :props="defaultProps">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="商品标题" prop="title">
                        <el-input v-model="updateForm.title" placeholder="商品标题" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品介绍" prop="introduce">
                        <el-input
                            type="textarea"
                            :rows="2"
                            style="width:300px"
                            placeholder="请输入内容"
                            v-model="updateForm.introduce">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品原价" prop="price">
                        <el-input v-model="updateForm.price" placeholder="商品原价" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品售价" prop="sellingprice">
                        <el-input v-model="updateForm.sellingprice" placeholder="商品售价" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品库存" prop="num">
                        <el-input v-model="updateForm.num" placeholder="商品库存" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品状态" prop="status">
                        <el-switch
                            v-model="updateForm.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="即刻销售"
                            inactive-text="暂不销售"
                            :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="updateProduct('updateForm')">确定</el-button>
                </div>
            </div>
        </el-drawer>
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
                tempDate: [],
                addForm: {
                    name: '',
                    category: '',
                    title: '',
                    introduce: '',
                    price: '',
                    sellingprice: '',
                    num: '',
                    status: '1',
                },
                updateForm: {
                    id: '',
                    name: '',
                    category: '',
                    title: '',
                    introduce: '',
                    price: '',
                    sellingprice: '',
                    num: '',
                    status: '',
                },
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    value: 'id',
                },
                headers: {
                    Authorization: localStorage.getItem('Authorization'),
                },
                options: [
                    {
                        value: '1',
                        label: '上架'
                    },
                    {
                        value: '0',
                        label: '未上架'
                    }
                ],
                status: '',
                leibie: '',
                children: [],
                delVisible: false,
                editVisible: false,
                drawer: false,
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                setTree:[],
                select_word: '',
                multipleSelection: [],
                idx: -1,
                pageSize: 10, // 页数
                currentPage: 1, // 当前页
            }
        },
        computed: {
            data () {
                return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            }
        },
         watch: {
            select_word: function () {
                if (this.select_word === '') {
                    this.tableData = this.tempDate
                } else {
                    this.tableData = []
                    for (let item of this.tempDate) {
                        if (item.productName.includes(this.select_word)) {
                            this.tableData.push(item)
                        }
                        if(item.name.includes(this.select_word)){
                          this.tableData.push(item)
                        }
                        if(item.categoryId==this.select_word){
                          this.tableData.push(item)
                        }
                    }
                }
            },
           status:function() {
                if (this.status === '') {
                    this.tableData = this.tempDate
                } else {
                    this.tableData = []
                    for (let item of this.tempDate) {
                        if (item.productStatus==this.status) {
                            this.tableData.push(item)
                        }
                    }
                }
            },
           leibie:function() {
             if (this.leibie === '') {
               this.tableData = this.tempDate
             } else {
               this.tableData = []
               for (let item of this.tempDate) {
                 if (item.categoryId==this.leibie) {
                   this.tableData.push(item)
                 }
               }
             }
           },
        },
        created () {
            this.getProductData()
        },
        mounted(){
            this.getCategoryData();
            this.getChildren();
        },
        methods: {
            getChildren(){
              this.children = []
              HttpManager.getchildren().then((res) => {
                this.children = res
              })
            },
            getProductData () {
                this.tableData = []
                this.tempDate = []
                HttpManager.getAllProduct().then((res) => {
                    this.tableData = res
                    this.tempDate = res
                    this.currentPage = 1
                })
            },
            //切换页面
            handleCurrentChange (val) {
                this.currentPage = val
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
                return `http://localhost:8081/product/updateimg?id=${id}`
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                  this.$refs.addForm.resetFields();
                })
                .catch(_ => {});
            },
            cancelForm() {
                this.drawer = false;
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
            handleProductSuccess (res, file) {
                let _this = this
                if (res.code === 1) {
                    _this.$notify({
                        title: '上传成功',
                        type: 'success'
                    })
                    _this.handleRemove(file);
                    _this.getProductData();
                    _this.$refs.addForm.resetFields();
                    _this.drawer = false;
                } else {
                    _this.$notify({
                        title: '上传失败',
                        type: 'error'
                    })
                }
            },
            UpdateProductSuccess (res, file) {
                let _this = this
                if (res.code === 1) {
                    _this.$notify({
                        title: '上传成功',
                        type: 'success'
                    })
                    _this.getProductData();
                    _this.$refs.addForm.resetFields();
                } else {
                    _this.$notify({
                        title: '上传失败',
                        type: 'error'
                    })
                }
            },
            handleDelete (id) {
                this.idx = id
                this.delVisible = true
            },
            deleteRow () {
                HttpManager.delProduct(this.idx).then(res => {
                    if (res) {
                        this.getProductData()
                        this.notify('删除成功', 'success')
                    } else {
                        this.notify('删除失败', 'error')
                    }
                })
                this.delVisible = false
            },
            // 获取批量列表
            handleSelectionChange (val) {
                this.multipleSelection = val
            },
            // 批量删除
            delAll () {
                for (let item of this.multipleSelection) {
                    this.handleDelete(item.productId)
                    this.deleteRow(item.productId)
                }
                this.multipleSelection = []
            },
            handlesale (id) {
                this.idx = id
            },
            //批量上架
            saleAll(){
                for (let item of this.multipleSelection) {
                    this.handlesale(item.productId)
                    HttpManager.sale(this.idx).then(res => {
                        if (res) {
                            this.getProductData()
                            this.notify('上架成功', 'success')
                        } else {
                            this.notify('上架失败', 'error')
                        }
                    })
                }
                this.multipleSelection = []
            },
            //批量下架
            nosale(){
                for (let item of this.multipleSelection) {
                    this.handlesale(item.productId)
                    HttpManager.nosale(this.idx).then(res => {
                        if (res) {
                            this.getProductData()
                            this.notify('下架成功', 'success')
                        } else {
                            this.notify('下架失败', 'error')
                        }
                    })
                }
                this.multipleSelection = []
            },
            handleEdit(row){
                this.idx = row.productId
                this.updateForm = {
                    id: row.productId,
                    name: row.productName,
                    category: row.categoryId,
                    title: row.productTitle,
                    introduce: row.productIntro,
                    price: row.productPrice,
                    sellingprice: row.productSellingPrice,
                    num: row.productNum,
                    status: row.productStatus,
                }
                this.editVisible = true
            },
            updateProduct(formName){
                let params = new URLSearchParams();
                params.append("productId",this.updateForm.id);
                params.append("productName",this.updateForm.name);
                params.append("categoryId",this.updateForm.category);
                params.append("productTitle",this.updateForm.title);
                params.append("productIntro",this.updateForm.introduce);
                params.append("productPrice",this.updateForm.price);
                params.append("productSellingPrice",this.updateForm.sellingprice);
                params.append("productNum",this.updateForm.num);
                params.append("productStatus",this.updateForm.status);
                HttpManager.updateProduct(params).then(res => {
                    if(res.code === 1){
                        this.$refs[formName].resetFields();
                        this.editVisible = false
                        this.notify('修改成功', 'success')
                        this.getProductData();
                    }else{
                        this.$refs[formName].resetFields();
                        this.notify('修改失败', 'error')
                    }
                })
            }
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
