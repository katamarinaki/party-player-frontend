import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import plugin from '@/socketPlugin.js'
import { http } from '@/networking'

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
    },

    setPlaylist(state, newPlaylist) {
      state.playlist = newPlaylist.map(item => {
        return { ...item }
      })
      console.log('New playlist', state.playlist)
    },
    pushToPlaylist(state, track) {
      state.playlist.push({ ...track })
    },
    nextTrack(state) {
      //if (state.playlist.length) state.playlist.shift()
      state.room.voteskips = 0

      http
        .get('/tracks/next')
        .then(result => {
          console.log('sent nextTrack')
        })
        .catch(e => {
          console.log('error while sending nextTrack ', e)
        })
    },

    setVotesToSkip(state, votes) {
      state.room.voteskips = votes
    },
    setUsersCount(state, users) {
      state.room.users = users
    },
  },
  actions: {},
  getters: {
    isAdmin(state) {
      let admin = localStorage.getItem(state.room.code)
      if (admin && admin === 'true') return true
      return false
    },

    currentUserCount(state) {
      return state.room.users
    },

    currentVoteCount(state) {
      return state.room.voteskips
    },

    isPlayListEmpty(state) {
      return state.playlist.length === 0
    },
    currentPlayingTrack(state) {
      return { ...state.playlist[0] }
    },
    currentPlaylist(state) {
      return state.playlist
        .map(t => {
          return { ...t }
        })
        .slice(1)
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
