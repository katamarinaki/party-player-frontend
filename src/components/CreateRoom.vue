<template>
  <div class="create-room">
    <RoomHeader :title="'PARTY PLAYER'" :backActionNeeded="true" />
    <p class="title">Create a room</p>
    <form class="create-form" @submit.prevent="createRoom">
      <input
        class="text-input"
        type="text"
        name="room-name"
        id="room-name"
        placeholder="Name (optional)"
        v-model="roomName"
      />
      <input
        class="text-input"
        type="password"
        name="room-password"
        id="room-password"
        placeholder="Password (optional)"
        v-model="roomPassword"
      />
      <input
        class="button"
        type="submit"
        value="Create"
        :disabled="isButtonDisabled"
      />
    </form>
  </div>
</template>

<script>
import RoomHeader from './RoomHeader'
export default {
  components: {
    RoomHeader,
  },
  data() {
    return {
      roomName: '',
      roomPassword: '',
      isButtonDisabled: false,
    }
  },
  methods: {
    createRoom() {
      this.isButtonDisabled = true
      this.$http
        .post(`/rooms/create`, {
          name: this.roomName,
          password: this.roomPassword,
        })
        .then(result => {
          this.isButtonDisabled = false
          this.$store.commit('setToken', result.data.accessToken)
          localStorage.setItem('roomcode', result.data.roomCode)
          this.$router.push(`/rooms/${result.data.roomCode}`)
        })
        .catch(e => {
          this.isButtonDisabled = false
          console.log('Error occured while trying create a room' + e)
        })
    },
  },
}
</script>

<style scoped>
.create-room {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 32px;
  margin: 50px 0 0 0;
  text-align: center;
}
.create-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 20px;
}
#room-password {
  margin-top: 5px;
}
.button {
  margin-top: 20px;
}
</style>
