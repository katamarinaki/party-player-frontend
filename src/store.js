import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: {
      users: [],
    },
    playlist: [],
    playingTrack: {},
  },
  mutations: {
    setRoom(state, newRoom) {
      state.room = {
        ...newRoom,
        users: [...newRoom.users],
      }
    },
    setPlaylist(state, newPlaylist) {
      state.playlist = newPlaylist.map(item => {
        return { ...item }
      })
      console.log(state.playlist)
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
