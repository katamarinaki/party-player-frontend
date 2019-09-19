<template>
  <div class="room">
    <HeaderInRoom
      :title="currentRoom.name"
      :code="currentRoom.code"
      :users="currentRoom.users.length"
    />
    <RoomPlayer v-if="isAdmin" />
    <router-link class="button" to="search" tag="button" append>
      Add Track
    </router-link>
    <RoomPlaylist :playlist="currentPlaylist" />
  </div>
</template>

<script>
import HeaderInRoom from './HeaderInRoom'
import RoomPlayer from './RoomPlayer'
import RoomPlaylist from './RoomPlaylist'
import { mapGetters } from 'vuex'
export default {
  components: {
    HeaderInRoom,
    RoomPlayer,
    RoomPlaylist,
  },
  created() {
    if (this.code && this.code === this.$route.params.code) {
      this.getRoomFromServer()
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
    ...mapGetters(['currentRoom', 'currentPlayingTrack', 'currentPlaylist']),
    code() {
      return localStorage.getItem('roomcode')
    },
  },
  data() {
    return {
      isAdmin: true,
    }
  },
  methods: {
    openSearch() {
      this.$router.push({ path: '/search', append: true })
    },
    getRoomFromServer() {
      this.$http
        .get(`/rooms`)
        .then(result => {
          this.$store.commit('setRoom', result.data)
          console.log(result.data)
          this.$store.commit('setPlaylist', result.data.playlist.tracks)
          console.log(this.currentPlaylist)
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.button {
  margin-top: 20px;
}
</style>
