<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">仿小米商城后台管理</div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="user-avator">
          <img src="../assets/img/user.jpg" />
        </div>
        <el-dropdown class="user-name" trigger="click" @command="Out">
          <span class="el-dropdown-link">
            {{name}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import {mixin} from '../mixins/index'
import _ctrEvent from '../assets/js/ctr-event'
import { mapGetters } from 'vuex'
import { HttpManager } from '../api'

export default {
  mixins: [mixin],
  data () {
    return {
      collapse: true,
      fullscreen: false,
    }
  },
  computed: {
      ...mapGetters([
        'id',
        'name',
      ])
  },
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage()
    }
  },
  methods: {
    Out () {
      let params = new URLSearchParams();
      params.append("id",this.id);
      params.append("name",this.name);
      HttpManager.Out(params).then( res => {
        if(res.code === 1){
          this.notify('退出登陆成功', 'success')
          localStorage.removeItem('Authorization');
          this.$router.push('/')
        }
        else{
           this.notify('退出登陆失败', 'error')
        }
      })
    },
    collapseChage () {
      this.collapse = !this.collapse
      _ctrEvent.$emit('collapse', this.collapse)
    }
  }
}
</script>
<style scoped>
.header {
  box-sizing: border-box;
  height: 50px;
  font-size: 22px;
  color: black;
  background-color: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: left .3s ease-in-out;
  -webkit-transition: left .3s ease-in-out;
}

.collapse-btn {
  float: left;
  padding: 0 20px;
  cursor: pointer;
  line-height: 50px;
}

.header .logo {
  float: left;
  width: 250px;
  line-height: 50px;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  position: absolute;
  right: 100px;
  display: flex;
  height: 50px;
  align-items: center;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.el-dropdown-link {
  color: #B0B3B2;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
