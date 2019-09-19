import Vue from 'vue'
import Vuex from 'vuex'
import axios from './networking'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    room: {
      users: [],
    },
    playlist: [],
    playingTrack: {},
  },
  mutations: {
    setToken(state, newToken) {
      localStorage.setItem('authtoken', newToken)
      axios.defaults.headers['Authorization'] = `Bearer ${newToken}`
      state.token = newToken
    },
    setRoom(state, newRoom) {
      state.room = {
        ...newRoom,
        users: [...newRoom.users],
      }
    },
    pushToPlaylist(state, track) {
      state.playlist.push({ ...track })
    },
    nextTrack(state) {
      state.playingTrack = state.playlist.length ? state.playlist.shift() : null
    },
  },
  actions: {},
  getters: {
    isPlayListEmpty(state) {
      return state.playlist.length === 0
    },
    currentPlayingTrack(state) {
      return { ...state.playingTrack }
    },
    currentPlaylist(state) {
      return state.playlist.map(t => {
        return { ...t }
      })
    },
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
