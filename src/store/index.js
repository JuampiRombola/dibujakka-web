import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const generateUUIDv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
})

export default new Vuex.Store({
  state: {
    username: localStorage.getItem('dibujakka-username') || undefined,
    token: localStorage.getItem('dibujakka-token') || undefined,
    lastCreatedRoomId: localStorage.getItem('dibujakka-last-created-room-id') || undefined,
    showNameForm: false,
  },
  getters: {
    showLoginDialog: state => {
      return !state.username || state.showNameForm;
    }
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
      state.showNameForm = false
      localStorage.setItem('dibujakka-username', username);
    },
    showNameForm (state) {
      state.showNameForm = true
    },
    generateUserToken (state) {
      const uuid = generateUUIDv4();
      state.token = uuid
      localStorage.setItem('dibujakka-token', uuid)
    },
    generateLastCreatedRoomId (state) {
      const uuid = generateUUIDv4();
      state.lastCreatedRoomId = uuid
      localStorage.setItem('dibujakka-last-created-room-id', uuid)
    }
  },
  actions: {
  },
  modules: {
  }
})
