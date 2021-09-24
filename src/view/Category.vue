<template>
    <div class="contain">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: 'info' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="tree">
        <el-tree 
        :data="setTree" 
        node-key="menuId" 
        ref="tree" 
        highlight-current 
        :props="defaultProps"
        :expand-on-click-node="false"
        :render-content="renderContent"
        >
        </el-tree>
        </div>
    </div>
</template>
<script>
import { HttpManager } from '../api/index'
export default {
   data() {
        return {
            setTree:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
        }
    },
     created() {
        var _this = this;
        // 这边是请求数据的
        HttpManager.getCategory().then(data => {
            this.setTree = data
            _this.getListData()
        });
    },
  methods: {
    renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
    },
    remove(node, data) {
      alert(data.id)
        // const parent = node.parent;
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(d => d.id === data.id);
        // children.splice(index, 1);
      },
      getListData() {
        let dataArray = [];
        this.setTree.forEach(function (data) {
                let parentId = data.parentId;
                console.log(parentId)
                if (parentId == 0) {
                    let objTemp = {
                        id: data.id,
                        name: data.name,
                        parentId: parentId,
                    }
                    dataArray.push(objTemp);
                }
                console.log(dataArray)
          })
        this.data2treeDG(this.setTree, dataArray)
      },
    data2treeDG(datas, dataArray) {
        for (let j = 0; j < dataArray.length; j++) {
            let dataArrayIndex = dataArray[j];
            let childrenArray = [];
            let Id = dataArrayIndex.id;
            for (let i = 0; i < datas.length; i++) {
                let data = datas[i];
                let parentId = data.parentId;
                if (parentId == Id) {
                    let objTemp = {
                        id: data.id,
                        name: data.name,
                        parentId: parentId,
                    }
                    childrenArray.push(objTemp);
                }
            }
            dataArrayIndex.children = childrenArray;
            if (childrenArray.length > 0) {//有儿子节点则递归
                this.data2treeDG(datas, childrenArray)
            }
        }
        this.setTree = dataArray;
        return dataArray;
    },
   },
}


</script>
<style lang="scss" scoped>
  .breadcrumb{
    height: 30px;
    padding: 1px 0px;   
  }
  .el-breadcrumb{
    align-items: center;
    line-height: 30px;
    background-color: #fff;
    font-size: 15px;
    padding-left: 20px;
  }
  .tree{
    margin-top: 10px;
    font-size: 20px;
  }
</style>
