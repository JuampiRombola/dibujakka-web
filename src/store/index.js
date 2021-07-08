import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUsername: localStorage.getItem('dibujakka-username'),
    token: localStorage.getItem('dibujakka-token'),
    guestUsername: null,
  },
  getters: {
    showLoginDialog: state => {
      return state.guestUsername === null && state.token === null;
    }
  },
  mutations: {
    guestLogin (state, guestUsername) {
      state.guestUsername = guestUsername;
    },
    login (state, { username, token }) {
      localStorage.setItem('dibujakka-username', username);
      localStorage.setItem('dibujakka-token', token);
    },
    logout () {
      localStorage.setItem('dibujakka-token', null);
    },
    postRoom(state, { name, rounds, players, language }) {
      const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      const path = `/room?id=${uuidv4()}&name=${name}&totalRounds=${rounds}&maxPlayers=${players}&language=${language}`
      axios.post(path)
    }
  },
  actions: {
    getRooms() {
      axios.get('/room')
    }
  },
  modules: {
  }
})
