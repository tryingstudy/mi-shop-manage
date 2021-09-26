<template>
    <div>
        <div class="btn">
            <el-button type="primary" class="iconfont icon-tianjia">新增</el-button>
        </div>
        <el-table :data="data" border size="mini" style="width: 100%;font-size: 15px;" ref="multipleTable" height="550px" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column label="轮播图" width="300" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.imgurl" alt="" style="width: 250px;"/>
              <el-upload
                class="upload-demo"
                :action="uploadUrl(scope.row.userId)"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <el-button size="mini">更新图片</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column label="产品Id" prop="password" width="220" align="center"></el-table-column>
          <el-table-column label="创建时间" prop="name" width="250" align="center"></el-table-column>
          <el-table-column label="操作" width="300" align="center">
              <template slot-scope="scope">
                <el-button type="primary" class="iconfont icon-xiugai" @click="handleEdit(scope.row)">修改</el-button>
                <el-button type="danger" class="iconfont icon-shanchu" @click="handleDelete(scope.row.userId)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .iconfont{
        padding-left: 10px;
        padding-right: 10px;
    }
    .btn{
        margin: 30px;
    }
</style>