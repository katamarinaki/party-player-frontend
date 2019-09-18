<template>
  <div class="room">
    <HeaderInRoom
      :title="room.name"
      :code="room.code"
      :users="room.users.length"
    />
    <RoomPlayer v-if="isAdmin" />
    <router-link class="button" to="search" tag="button" append>
      Add Track
    </router-link>
    <RoomPlaylist :playlist="room.playlist" />
  </div>
</template>

<script>
import HeaderInRoom from './HeaderInRoom'
import RoomPlayer from './RoomPlayer'
import RoomPlaylist from './RoomPlaylist'
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
          //this.$store.commit('setToken', result.data.accessToken)
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
    room() {
      return this.$store.getters.currentRoom
    },
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

.addtrack-button {
  height: 30px;
  font-size: 16px;
}
</style>
