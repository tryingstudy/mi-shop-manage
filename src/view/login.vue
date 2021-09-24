<template>
	<div class="login-container">
    <el-form ref="ruleForm" class="login-form" :model="ruleForm" :rules="rules">
      <div class="title-container">
           <h3 class="title">Login Form</h3>
      </div>
      <el-form-item prop="name">
        <span class="svg-container">
          <i slot="prefix" class="iconfont icon-yonghu"></i>
        </span>
        <el-input v-model="ruleForm.name" placeholder="登录名" >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i slot="prefix" class="iconfont icon-mima1"></i>
        </span>
        <el-input
          :type="passwordType"
          placeholder="密码"
          ref="password"
          v-model="ruleForm.password"
          @keyup.enter.native="Login"
        />
        <span class="show-pwd" @click="showPwd">
          <i slot="suffix" :class="passwordType === 'password' ? 'iconfont icon-buxianshimima' : 'iconfont icon-xianshimima'" />
        </span>
      </el-form-item>
      <div class="login-btn">
        <el-button type="primary"style="width:100%;margin-bottom:30px;" @click="Login">登录</el-button>
      </div>
    </el-form>
	</div>
</template>

<script>
import {mixin} from '../mixins/index'
import { HttpManager } from '../api/index'
	export default {
		mixins: [mixin],
		name: 'login',
		data() {
		  return {
			  passwordType: 'password',
			  ruleForm: {
				  name: 'admin',
				  password: 'admin',
			  },
			  rules: {
           name: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
           ],
           password: [
             { required: true, message: '请输入密码', trigger: 'blur' },
            ],
			  },
		  };
		},
		methods:{
      showPwd() {
            if (this.passwordType === 'password') {
              this.passwordType = ''
            } else {
              this.passwordType = 'password'
            }
            this.$nextTick(() => {
              this.$refs.password.focus()
            })
          },
			Login() {
			  this.$refs.ruleForm.validate((valid) => {
			     if (valid) {
					  const params = new URLSearchParams()
					  params.append('name', this.ruleForm.name)
					  params.append('password', this.ruleForm.password)
					  HttpManager.Login(params).then(res => {
						  if (res.code === 1) {
                localStorage.setItem("Authorization", res.token);
                this.$router.push('/Info')
                this.notify('欢迎回来', 'success')
                this.setAdminMsg(res.adminMsg[0])
						  } else if(res.code === 0){
                  this.$message({
                    showClose: true,
                    message: '密码错误',
                    type: 'error',
                  });
                }
					  })
				  }
				});
			},
      setAdminMsg (item) {
        this.$store.commit('setId', item.id)
        this.$store.commit('setName', item.name)
      },
		}
	}
</script>
<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        width: 380px;
        caret-color: $cursor;
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
  </style>

</style>
<style lang="scss" scoped>
	$bg:#2d3a4b;
	$dark_gray:#889aa4;
	$light_gray:#eee;
	.login-container {
	  min-height: 100%;
	  width: 100%;
	  background-color: $bg;
	  overflow: hidden;
	  .login-form {
	    position: relative;
	    width: 450px;
	    max-width: 100%;
	    padding: 160px 35px 0;
	    margin: 0 auto;
	    overflow: hidden;
	  }
      }
      .svg-container {
        padding: 6px 5px 6px 10px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
    .title-container {
        position: relative;
        .title {
          font-size: 26px;
          color: $light_gray;
          margin: 0px auto 40px auto;
          text-align: center;
          font-weight: bold;
        }
      }
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }
</style>
