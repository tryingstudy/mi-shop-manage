<template>
  <el-container>
    <the-aside></the-aside>
    <el-main style="padding:0px">
      <div class="content-box" :class="{'content-collapse':collapse}">
          <the-header></the-header>
          <div class="tag">
            <el-tabs
            v-model="$store.state.activeIndex"
            type="border-card"
            closable
            v-if="$store.state.openTab.length"
              @tab-click='tabClick'
              @tab-remove='tabRemove'
            >
            <!-- 获取vuex中的openTab数组数据，循环展示 -->
            <el-tab-pane
              :key="index"
              v-for="(item, index) in $store.state.openTab"
              :label="item.name"
              :name="item.route"
            >
            </el-tab-pane>
          </el-tabs>
          </div>
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
import { mapGetters } from 'vuex'
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
  computed: {
      ...mapGetters([
        ["openTab"],
        'activeIndex',
      ])
  },
  created () {
    _ctrEvent.$on('collapse', msg => {
      this.collapse = msg
    })
  },
      methods:{
      //tab标签点击时，切换相应的路由
      tabClick(tab){
        console.log("tab",tab);
        console.log('active',this.$store.state.activeIndex);
        this.$router.push({path: this.$store.state.activeIndex});
      },
      //移除tab标签
      tabRemove(targetName){
        console.log("tabRemove",targetName);
        //首页不删
        if(targetName == '/info'){
          return
        }
        this.$store.commit('delete_tabs', targetName);
        if (this.$store.state.activeIndex === targetName) {
          // 设置删除后，重新激活的路径
          if (this.$store.state.openTab && this.$store.state.openTab.length >= 1) {
            console.log('=============',this.$store.state.openTab[this.$store.state.openTab.length-1].route)
            //设置路由展示，为索引前一个路由
            this.$store.commit('set_active_index', this.$store.state.openTab[this.$store.state.openTab.length-1].route);
            //跳转路由
            this.$router.push({path: this.$store.state.activeIndex});
          } else {
            //否则 跳转到首页
            this.$router.push({path: '/info'});
          }
        }
      }
    },
    mounted () {
      // 刷新时以当前路由做为tab加入tabs
      // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
      // 当当前路由是首页时，添加首页到store，并设置激活状态
     if (this.$route.path !== '/' && this.$route.path !== '/info') {
        console.log('1');
        this.$store.commit('add_tabs', {route: '/info' , name: '首页'});
        //通过路由的判断，来加入标签页的名称
        if(this.$route.path == "/comsume"){
          this.$store.commit('add_tabs', {route: this.$route.path , name: "用户管理"});
        }
        if(this.$route.path == "/category"){
          this.$store.commit('add_tabs', {route: this.$route.path , name: "分类管理"});
        }
        this.$store.commit('set_active_index', this.$route.path);
      } else {
        console.log('2');
        this.$store.commit('add_tabs', {route: '/info', name: '首页'});
        this.$store.commit('set_active_index', '/info');
        this.$router.push('/info');
      }
    },
    watch:{
      '$route'(to,from){
          //判断路由是否已经打开
          //已经打开的 ，将其置为active
          //未打开的，将其放入队列里
          let flag = false;
          for(let item of this.$store.state.openTab){
            console.log("item.path",item.route)
            console.log("t0.path",to.path)
  
            if(item.route === to.path){

              this.$store.commit('set_active_index',to.path)
              flag = true;
              break;
            }
          }
          if(!flag){
            //通过路由的判断，来加入标签页的名称
            if(to.path == "/consumer"){
              this.$store.commit('add_tabs', {route: to.path, name: "用户管理"});
            }
            if(to.path == "/category"){
              this.$store.commit('add_tabs', {route: to.path, name: "分类管理"});
            }
            
            this.$store.commit('set_active_index', to.path);
          }
      }
    }

}
</script>

<style>
  .el-container{
    height: 100%;
  }
  .tag{
    width: 100%;
    height: 40px;
  }
  .el-tabs--border-card>.el-tabs__header {
    width: 100%;
    background-color: #fff;
  }
</style>

<style>
  .el-tabs--border-card>.el-tabs__content {
    padding: 0;
  }
  .el-tabs__nav-wrap {
    margin-bottom: 0;
  }
  .el-tabs--border-card>.el-tabs__header {
    border: none;
  }
</style>