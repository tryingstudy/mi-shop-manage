import { get, post } from './request'

const HttpManager= {
	//管理员登陆
	Login: (params) => post('/admin/Login', params),
  //图表所需要的数据
  getData: () => get('/admin/getData'),
  //获取所有用户
  getAllUser: () => get('/user/getAllUser'),
  //添加用户
  addUser: (params) => post('/user/addUser',params),
  //修改用户信息
  updateUser: (params) => post('/user/updateUser',params),
  //删除用户
   delUser: (id) => get(`user/delUser?id=${id}`),
   //获取所有分类
   getCategory: () => get('category/getcategory'),
   //获取父节点
   getfather: () => get('category/getfather')
}

export {HttpManager}
