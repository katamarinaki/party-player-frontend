import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: {},
    playlist: [],
    playingTrack: {},
  },
  mutations: {
    setRoom(state, newRoom) {
      state.room = {
        ...newRoom,
      }
    },
    setPlaylist(state, newPlaylist) {
      state.playlist = newPlaylist.map(item => {
        return { ...item }
      })
    },
    pushToPlaylist(state, track) {
      state.playlist.push({ ...track })
    },
    nextTrack(state) {
      state.playingTrack = state.playlist.shift()
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
