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

    voteTrack(state, pay) {
      const track = state.playlist.find(t => t.uuid == pay.uuid)
      if (track.voted != pay.vote) {
        if (track.voted == -1) {
          track.dislikes -= 1
          track.likes += 1
        } else if (track.voted == 1) {
          track.dislikes += 1
          track.likes -= 1
        } else {
          pay.vote == 1 ? (track.likes += 1) : (track.dislikes -= 1)
        }
        track.voted = pay.vote
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
    nextMeme(state) {
      //if (state.playlist.length) state.playlist.shift()
      state.room.voteskips = 0

      http.get('/tracks/next').catch(e => {
        console.log('error while sending nextMeme ', e)
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
    unvotedTracks(state) {
      return state.playlist
        .map(t => {
          return { ...t }
        })
        .slice(1)
        .filter(t => t.voted == 0)
    },

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
