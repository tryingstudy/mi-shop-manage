const admin = {
  state: {
    id: '',
    name: ''
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
  },
  actions: {}
}
export default admin
