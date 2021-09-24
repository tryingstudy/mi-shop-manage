<template>
  <el-container>
    <the-aside></the-aside>
    <el-main style="padding:0px">
      <div class="content-box" :class="{'content-collapse':collapse}">
          <the-header></the-header>
          <div class="content">
              <router-view></router-view>
          </div>
    </div>
    </el-main>
  </el-container>
</template>

<script>
import TheHeader from './TheHeader.vue'
import TheAside from './TheAside.vue'
import _ctrEvent from '../assets/js/ctr-event'
export default {
  components: {
    TheHeader,
    TheAside,
  },
  data () {
    return {
      collapse: false
    }
  },
  created () {
    _ctrEvent.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style>
  .el-container{
    height: 100%;
  }
</style>
