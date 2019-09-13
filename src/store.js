import Vue from 'vue'
import Vuex from 'vuex'
import axios from './networking'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    room: {},
  },
  mutations: {
    setToken(state, newToken) {
      localStorage.setItem('authtoken', newToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      state.token = newToken
    },
    setRoom(state, newRoom) {
      state.room = {
        ...newRoom,
        users: [...newRoom.users],
      }
    },
  },
  actions: {},
  getters: {
    currentRoom(state) {
      return {
        ...state.room,
      }
    },
    currentToken(state) {
      return state.token
    },
  },
})
