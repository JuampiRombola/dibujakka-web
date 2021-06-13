import Vue from 'vue'
import Vuex from 'vuex'

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
    }
  },
  actions: {
  },
  modules: {
  }
})
