import { get, post } from './request'

const HttpManager= {
	//管理员登陆
	Login: (params) => post('/admin/Login', params),
  //管理员退出登陆
  Out: (params) => post('/admin/Out',params),
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
  //获取子分类
  getchildren: () => get('category/getchildren'),
  //更新分类名称
  updateCategory: (params) => post('category/updateCategory',params),
  //删除分类
  delCategory: (params) => post('category/delCategory',params),
  //获取所有产品
  getAllProduct: (params) => get('product/getAllProduct'),
  //添加产品
  //post('product/addproduct')
  //删除商品
  delProduct: (productId) => get(`product/delProduct?productId=${productId}`),
  //上架商品
  sale: (productId) => get(`product/sale?productId=${productId}`),
  //下架商品
  nosale: (productId) => get(`product/nosale?productId=${productId}`),
  //修改商品
  updateProduct: (params) => post("product/updateProduct",params),

  //获取轮播图
  getbanner: () => get('banner/getbanner'),
  //添加轮播图
  // addbanner: () => get('banner/addbanner'),
  //删除轮播图
  delbanner: (bannerId) => get(`banner/delbanner?bannerId=${bannerId}`),

  //获取页头广告
  getAllContent: () => get("content/getAllContent"),
}

export {HttpManager}
