<template>
    <div class="table">
        <div class="handle-box">
          <el-button type="primary" class="handle-del mr10" @click="delAll">批量删除</el-button>
          <el-input v-model="select_word"  placeholder="筛选相关用户" class="handle-input mr10"></el-input>
          <el-button type="primary"  @click="centerDialogVisible = true">添加新用户</el-button>
        </div>
        <el-table :data="data" border size="mini" style="width: 100%;font-size: 15px;" ref="multipleTable" height="550px" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column label="头像" width="150" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.imgurl" alt="" style="width: 80px;"/>
              <el-upload
                class="upload-demo"
                :action="uploadUrl(scope.row.userId)"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <el-button size="mini">更新头像</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="phone" width="220" align="center"></el-table-column>
          <el-table-column label="密码" prop="password" width="220" align="center"></el-table-column>
          <el-table-column label="昵称" prop="name" width="250" align="center"></el-table-column>
          <el-table-column label="性别" width="98" align="center">
              <template slot-scope="scope">
                  <div>{{changeSex(scope.row.sex) }}</div>
              </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center">
              <template slot-scope="scope">
                  <el-button @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="danger" @click="handleDelete(scope.row.userId)">删除</el-button>
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
        <el-dialog title="添加用户" :visible.sync="centerDialogVisible" :close-on-click-modal="false" @close="close('registerForm')" width="400px" center>
          <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="registerForm.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" placeholder="密码" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="name">
              <el-input  placeholder="昵称" v-model="registerForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="registerForm.sex">
                <el-radio :label="0">女</el-radio>
                <el-radio :label="1">男</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button  @click="close('registerForm')">取 消</el-button>
            <el-button type="primary" @click="addUser('registerForm')">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editVisible" :close-on-click-modal="false" @click="close('form')" width="400px">
          <el-form ref="form" :model="form" label-width="60px">
            <el-form-item label="手机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio :label="0">女</el-radio>
                <el-radio :label="1">男</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button  @click="close('form')" >取 消</el-button>
            <el-button type="primary"  @click="saveEdit">确 定</el-button>
          </span>
        </el-dialog>
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
export default{
  mixins: [mixin],
  data() {
    let validPassword=(rule,value,callback)=>{
      let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/
      if(!reg.test(value)){
        callback(new Error('密码必须是由4-20位字母+数字组合'))
      }else{
        callback()
      }
     }
    return {
      registerForm: {
          phone: '',
          password: '',
          name: '',
          sex: '',
      },
      form: {
       phone: '',
       password: '',
       name: '',
       sex: '',
      },
      tableData: [],
      tempDate: [],
      centerDialogVisible: false,
      editVisible: false,
      delVisible: false,
      select_word: '',
      multipleSelection: [],
      idx: -1,
      pageSize: 5, // 页数
      currentPage: 1, // 当前页
      rules: {
       phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
       ],
       password: [
         { required: true, message: '请输入密码', trigger: 'blur' },
         { validator: validPassword, trigger: 'blur' }
      ],
      name: [
        { message: '请选择昵称', trigger: 'blur' }
      ],
      sex: [
        { required: true, message: '请选择性别', trigger: 'change' }
      ],
    }
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
  watch: {
      select_word: function () {
        if (this.select_word === '') {
          this.tableData = this.tempDate
        } else {
          this.tableData = []
          for (let item of this.tempDate) {
            if (item.name.includes(this.select_word)) {
              this.tableData.push(item)
            }else if(item.phone.includes(this.select_word)){
              this.tableData.push(item)
            }
          }
        }
      }
    },
  methods: {
    close(formName){
      this.centerDialogVisible = false
      this.$refs[formName].resetFields();
    },
    handleEdit(row){
      this.idx = row.userId
      this.form = {
        userId: row.userId,
        phone: row.phone,
        password: row.password,
        name: row.name,
        sex: row.sex,
      }
      this.editVisible = true
    },
    addUser(formName){
      let params = new URLSearchParams()
      params.append("phone",this.registerForm.phone)
      params.append("password",this.registerForm.password)
      params.append("name",this.registerForm.name)
      params.append("sex",this.registerForm.sex)
      HttpManager.addUser(params).then(res => {
        if(res.code === 1){
          this.$refs[formName].resetFields();
          this.centerDialogVisible = false
          this.notify('添加成功', 'success')
          this.getData();
        }else{
          this.$refs[formName].resetFields();
          this.notify('添加失败', 'error')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    saveEdit () {
      let params = new URLSearchParams()
      params.append('id', this.form.userId)
      params.append('phone', this.form.phone)
      params.append('password', this.form.password)
      params.append('name', this.form.name)
      params.append('sex', this.form.sex)
      HttpManager.updateUser(params).then(res => {
        if (res.code === 1) {
          this.getData()
          this.notify('修改成功', 'success')
        } else {
          this.notify('修改失败', 'error')
        }
      }).catch(err => {
        console.log(err)
      })
      this.editVisible = false
    },
    deleteRow () {
      HttpManager.delUser(this.idx).then(res => {
        if (res) {
          this.getData()
          this.notify('删除成功', 'success')
        } else {
          this.notify('删除失败', 'error')
        }
      })
      this.delVisible = false
    },
    uploadUrl (id) {
      return `http://localhost:8081/user/avatar/update?id=${id}`
    },
    getData () {
      this.tableData = []
      this.tempDate = []
      HttpManager.getAllUser().then((res) => {
        this.tableData = res
        this.tempDate = res
        this.currentPage = 1
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
  },
}
</script>

<style lang="scss" scoped>
  .handle-box {
    margin: 20px 10px 20px 20px;
    margin-bottom: 20px;
    font-size: 12px;
    .handle-input {
      width: 300px;
      display: inline-block;
    }
  }
  .el-tabs--border-card>.el-tabs__content{
    padding: 0px;
  }
</style>
