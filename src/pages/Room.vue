<template>
  <div class="room" :class="{ noscroll: isLoading || overlayOpened }">
    <Loading
      :active.sync="isLoading"
      :is-full-page="false"
      :opacity="1.0"
      background-color="#000000"
      color="#ffffff"
    />
    <HeaderInRoom />
    <RoomPlayer v-if="isAdmin" @ready="playerLoaded" />
    <div class="button-container">
      <router-link class="button" to="search" tag="button" append>
        Add Track
      </router-link>
    </div>
    <RoomPlaylist />
    <button
      v-show="showOverlayButton"
      class="button overlay-button"
      @click="openOverlay"
    >
      Vote For Tracks({{ unvotedTracks.length }})
    </button>
    <Overlay v-bind:showOverlay.sync="overlayOpened" />
  </div>
</template>

<script>
import HeaderInRoom from '@/components/HeaderInRoom'
import RoomPlayer from '@/components/RoomPlayer'
import RoomPlaylist from '@/components/RoomPlaylist'
import Overlay from '@/components/Overlay'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import { mapGetters } from 'vuex'
export default {
  components: {
    HeaderInRoom,
    RoomPlayer,
    RoomPlaylist,
    Overlay,
    Loading,
  },
  created() {
    if (this.code && this.code === this.$route.params.code) {
      if (!this.currentRoom.code || this.currentRoom.code != this.code) {
        this.getRoomFromServer()
      }
    } else {
      localStorage.setItem('roomcode', this.$route.params.code)
      this.$http
        .post('/rooms/join', {
          code: this.$route.params.code,
          password: '',
        })
        .then(result => {
          localStorage.setItem('authtoken', result.data.accessToken)
          localStorage.setItem('roomcode', result.data.roomCode)
          this.$http.defaults.headers[
            'Authorization'
          ] = `Bearer ${result.data.accessToken}`
          this.getRoomFromServer()
        })
        .catch(err => {
          console.log(err)
          this.$router.push('/join') // прокинуть проп
        })
    }
  },
  computed: {
    ...mapGetters(['currentRoom', 'isAdmin', 'unvotedTracks']),
    code() {
      return localStorage.getItem('roomcode')
    },

    showOverlayButton() {
      return this.unvotedTracks.length > 0
    },
  },
  data() {
    return {
      overlayOpened: false,
      isLoading: this.isAdmin ? true : false,
    }
  },

  methods: {
    playerLoaded() {
      this.isLoading = false
    },
    openOverlay() {
      this.overlayOpened = true
    },

    openSearch() {
      this.$router.push({ path: '/search', append: true })
    },
    getRoomFromServer() {
      this.$http
        .get(`/rooms`)
        .then(result => {
          this.$store.commit('setRoom', result.data)
        })
        .catch(e => {
          console.log('Error occured while trying to access room', e)
        })
    },
  },
}
</script>

<style scoped>
.room {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.noscroll {
  overflow: hidden;
}

.button-container {
  margin: 20px 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button {
  width: 100%;
}

.overlay-button {
  z-index: 50;
  position: fixed;
  left: -1px;
  bottom: 15px;
  width: fit-content;
}
</style>
