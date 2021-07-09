import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const generateUUIDv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
})

export default new Vuex.Store({
  state: {
    username: localStorage.getItem('dibujakka-username') || undefined,
    token: localStorage.getItem('dibujakka-token') || undefined,
    lastCreatedRoomId: localStorage.getItem('dibujakka-last-created-room-id') || undefined
  },
  getters: {
    showLoginDialog: state => {
      return !state.username;
    }
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
      localStorage.setItem('dibujakka-username', username);
    },
    postRoom(state, { id, name, rounds, players, language }) {
      const path = `/room?id=${id}&name=${name}&totalRounds=${rounds}&maxPlayers=${players}&language=${language}`
      axios.post(path)
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
