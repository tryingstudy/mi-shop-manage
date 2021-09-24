<template>
  <div>
    <div class="container">
      <el-row :gutter="40">
        <el-col :span="6">
            <div class="card-panel">
              <div class="Logo1">
                <span class="iconfont icon-peoples"></span>
              </div>
              <div class="card-panel-descrition">
                <div class="card-panel-text">
                  用户数量
                </div>
                <div class="card-panel-num">
                  {{usernum}}
                </div>
              </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="card-panel">
              <div class="Logo2">
                <span class="iconfont icon-Create_member"></span>
              </div>
              <div class="card-panel-descrition">
                <div class="card-panel-text">
                  近一周新增用户
                </div>
                <div class="card-panel-num">
                  {{newnum}}
                </div>
              </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="card-panel">
              <div class="Logo3">
                <span class="iconfont icon-money"></span>
              </div>
              <div class="card-panel-descrition">
                <div class="card-panel-text">
                  产品数量
                </div>
                <div class="card-panel-num">
                  2000
                </div>
              </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="card-panel">
              <div class="Logo4">
                <span class="iconfont icon-weibiaoti1"></span>
              </div>
              <div class="card-panel-descrition">
                <div class="card-panel-text">
                  销售额
                </div>
                <div class="card-panel-num">
                  1230000
                </div>
              </div>
            </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { HttpManager } from '../api/index'
  export default {
  	data() {
  		return {
        usernum: '',
        newnum: '',
  		}
  	},
    created(){
      this.getData()
    },
    methods: {
      getData() {
        HttpManager.getData().then(res => {
          this.usernum = res.usernum
          this.newnum = res.newnum
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .container{
    margin: 20px 20px 0;
    height: 140px;
    >.el-row .el-col .card-panel{
      float: left;
      width: 100%;
        height: 108px;
        margin-bottom: 32px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        border-color: rgba(0,0,0,.05);
        &:hover{
          .Logo1 {
            background-color: #40c9c6;
            >.iconfont{
              color: white;
            }
          }
          .Logo2{
            background-color: #36a3f7;
            >.iconfont{
              color: white;
            }
          }
          .Logo3{
            background-color: #f4516c;
            >.iconfont{
              color: white;
            }
          }
          .Logo4{
            background-color: #40c9c6;
            >.iconfont{
              color: white;
            }
          }
        }
        .Logo1{
          float: left;
          margin: 14px 0 0 14px;
          padding: 16px;
          .iconfont{
            font-size: 48px;
            color:#40c9c6;
            overflow: hidden;
          }
        }
        .Logo2{
          float: left;
          margin: 14px 0 0 14px;
          padding: 16px;
          .iconfont{
            font-size: 48px;
            color:#36a3f7;
            overflow: hidden;
          }
        }
        .Logo3{
          float: left;
          margin: 14px 0 0 14px;
          padding: 16px;
          .iconfont{
            font-size: 48px;
            color:#f4516c;
            overflow: hidden;
          }
        }
        .Logo4{
          float: left;
          margin: 14px 0 0 14px;
          padding: 16px;
          .iconfont{
            font-size: 48px;
            color:#40c9c6;
            overflow: hidden;
          }
        }
        .card-panel-descrition{
          float: right;
          font-weight: 700;
          margin: 26px;
          margin-left: 0;
          .card-panel-text{
            line-height: 18px;
            color: rgba(0,0,0,.45);
            font-size: 16px;
            margin-bottom: 12px;
          }
          .card-panel-num{
            font-size: 20px;
          }
        }
    }
  }
</style>
