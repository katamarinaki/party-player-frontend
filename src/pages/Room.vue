<template>
  <div class="room">
    <HeaderInRoom />
    <RoomPlayer v-if="isAdmin" />
    <div class="button-container">
      <router-link class="button" to="search" tag="button" append>
        Add Track
      </router-link>
    </div>
    <RoomPlaylist />
    <button v-show="showOverlayButton" class="button overlay-button" @click="openOverlay">
      Vote For Tracks({{unvotedTracks.length}})
    </button>
    <Overlay v-bind:showOverlay.sync="overlayOpened" />
  </div>
</template>

<script>
import HeaderInRoom from '@/components/HeaderInRoom'
import RoomPlayer from '@/components/RoomPlayer'
import RoomPlaylist from '@/components/RoomPlaylist'
import Overlay from '@/components/Overlay'
import { mapGetters } from 'vuex'
export default {
  components: {
    HeaderInRoom,
    RoomPlayer,
    RoomPlaylist,
    Overlay,
  },
  created() {
    if (this.code && this.code === this.$route.params.code) {
      if (!this.currentRoom.code || this.currentRoom.code != this.code) {
        this.getRoomFromServer()
      }
    } else {
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
          console.log(err.response)
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
    }
  },
  methods: {
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
