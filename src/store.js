import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: {},
    playlist: [],
    playingTrack: null,
  },
  mutations: {
    setRoom(state, newRoom) {
      state.room = {
        ...newRoom,
      }
    },

    setCurrentTrack(state, track) {
      state.playingTrack = track ? { ...track } : null
    },

    setPlaylist(state, newPlaylist) {
      state.playlist = newPlaylist.map(item => {
        return { ...item }
      })
      if (state.playingTrack == null)
        state.state.playlist.length ? state.playlist.shift() : null
      console.log('New playlist', state.playlist)
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
