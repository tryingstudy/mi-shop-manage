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
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isJPG && isLt3M
    },
    //获取分类
    getCategoryData() {
      HttpManager.getCategory().then(data => {
        this.setTree = data
      });
    },
    //图片删除
    handleRemove(file) {
      let fileList = this.$refs.upload.uploadFiles;
      let index = fileList.findIndex(fileItem => { return fileItem.uid === file.uid });
      fileList.splice(index, 1);
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

  }
}
