<template>
  <el-aside width="200px">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#304156"
      text-color="#BFCBD9"
      active-text-color="#ffffff"
      unique-opened
      router
    >
      <el-menu-item index="info" key="info">
        <i class="el-icon-s-data"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>
      <el-menu-item index="consumer" key="consumer">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="guangao">
        <template slot="title">
          <i class="iconfont icon-guanggaowei"></i>
          <span slot="title">广告管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="lunbo">
            <i class="iconfont icon-lunbo"></i>
            <span slot="title">轮播广告</span>
          </el-menu-item>
          <el-menu-item index="contentheader">
            <i class="iconfont icon-icon-"></i>
            <span slot="title">页头广告</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="category" key="category">
        <i class="iconfont icon-dingdan"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>
      <el-menu-item index="product" key="product">
        <i class="iconfont icon-chanpin"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="order" key="order">
        <i class="iconfont icon-icon"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import _ctrEvent from '../assets/js/ctr-event'

export default {
  data () {
    return {
      collapse: false,
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    _ctrEvent.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style scoped>
.el-aside {
  background-color: #304156;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
.iconfont{
  font-size: 18px;
  padding-left: 3px;
  padding-right: 8px;
}
</style>
<style>
  .el-menu-item-group__title{
    padding: 0px;
  }
</style>
