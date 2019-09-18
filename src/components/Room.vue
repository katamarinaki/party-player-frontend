<template>
  <div class="room">
    <RoomHeader :name="room.name" />
    <RoomPlayer />
    <router-link class="addtrack-button" to="search" tag="button" append>
      Add Track
    </router-link>
    <RoomPlaylist :playlist="room.playlist" />
  </div>
</template>

<script>
import RoomHeader from './RoomHeader'
import RoomPlayer from './RoomPlayer'
import RoomPlaylist from './RoomPlaylist'
export default {
  components: {
    RoomHeader,
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
          this.$store.commit('setToken', result.data.accessToken)
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
    return {}
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
          console.log(e.response)
          console.log('Error occured while trying to access room' + e)
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
}

.addtrack-button {
  height: 30px;
  font-size: 16px;
}
</style>
