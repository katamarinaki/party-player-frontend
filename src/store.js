import Vue from 'vue'
import Vuex from 'vuex'
import axios from './networking'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    room: {
      users: [],
    },
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
        users: [...state.room.users],
      }
    },
    currentToken(state) {
      return state.token
    },
  },
})
