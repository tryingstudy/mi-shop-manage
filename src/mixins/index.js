import { HttpManager } from '../api/index'
export const mixin = {
  methods: {
    // 提示信息
    notify (title, type) {
      this.$notify({
        title: title,
        type: type
      })
    },
    handleDelete (id) {
      this.idx = id
      this.delVisible = true
    },
    // 获取批量要删除的列表
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量删除
    delAll () {
      for (let item of this.multipleSelection) {
        this.handleDelete(item.userId)
        this.deleteRow(item.userId)
      }
      this.multipleSelection = []
    },
    changeSex (value) {
      if (value === 0) {
        return '女'
      } else if (value === 1) {
        return '男'
      }
    },
    handleAvatarSuccess (res, file) {
      let _this = this
      if (res.code === 1) {
        _this.imageUrl = URL.createObjectURL(file.raw)
        _this.getData()
        _this.$notify({
          title: '上传成功',
          type: 'success'
        })
      } else {
        _this.$notify({
          title: '上传失败',
          type: 'error'
        })
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getCategoryData() {
      var _this = this;
      HttpManager.getCategory().then(data => {
        console.log(data)
        this.setTree = data
        _this.getListData()
      });
    },
    getListData() {
      let dataArray = [];
      this.setTree.forEach(function (data) {
        let parentId = data.parentId;
        if (parentId == 0) {
          let objTemp = {
            id: data.id,
            name: data.name,
            parentId: parentId,
          }
          dataArray.push(objTemp);
        }
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
              imgurl: data.img,
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
