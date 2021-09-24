const admin = {
  state: {
    id: '',
    name: '',
    openTab:[],//所有打开的路由
    activeIndex:'/info' , //也可以是默认激活路径；激活状态
  },
  getters: {
    id: state => {
      let id = state.id
      if (!id) {
        id = JSON.parse(window.localStorage.getItem('id') || null)
      }
      return id
    },
    name: state => {
      let name = state.name
      if (!name) {
        name = JSON.parse(window.localStorage.getItem('name') || null)
      }
      return name
    },
  },
  mutations: {
    setId: (state, id) => {
      state.id = id
      window.localStorage.setItem('id', JSON.stringify(id))
    },
    setName: (state, name) => {
      state.name = name
      window.localStorage.setItem('name', JSON.stringify(name))
    },
    // 添加tabs
    add_tabs (state, data) {
      this.state.openTab.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.openTab) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.openTab.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.activeIndex = index;
    },
  },
  actions: {},
}
export default admin
