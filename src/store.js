import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import plugin from './socketPlugin.js'

export default new Vuex.Store({
  plugins: [plugin],
  state: {
    room: {
      code: null,
    },
    playlist: [],
    playingTrack: null,
    connectedToWS: false,
  },
  mutations: {
    setRoom(state, newRoom) {
      state.room = newRoom
        ? {
            code: newRoom.code,
            name: newRoom.name,
            users: newRoom.users,
            voteskips: newRoom.voteskips,
          }
        : {}
      state.playlist = newRoom.playlist.map(item => {
        return { ...item }
      })
      if (state.playingTrack == null)
        state.playingTrack = state.playlist.length
          ? state.playlist.shift()
          : null
    },

    setCurrentTrack(state, track) {
      state.playingTrack = track ? { ...track } : null
    },

    setPlaylist(state, newPlaylist) {
      state.playlist = newPlaylist.map(item => {
        return { ...item }
      })
      if (state.playingTrack == null)
        state.playingTrack = state.playlist.length
          ? state.playlist.shift()
          : null
      console.log('New playlist', state.playlist)
    },
    pushToPlaylist(state, track) {
      state.playlist.push({ ...track })
    },
    nextTrack(state) {
      state.playingTrack = state.playlist.length ? state.playlist.shift() : null
      //send next track to back
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
