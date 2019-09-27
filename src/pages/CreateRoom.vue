<template>
  <div class="create-room">
    <RoomHeader :title="'PARTY PLAYER'" :backActionNeeded="true" />
    <p class="title">CREATE A ROOM</p>
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
        class="text-input password"
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
import RoomHeader from '@/components/RoomHeader'
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
          localStorage.setItem(result.data.roomCode, 'true')
          localStorage.setItem('authtoken', result.data.accessToken)
          localStorage.setItem('roomcode', result.data.roomCode)
          this.$http.defaults.headers[
            'Authorization'
          ] = `Bearer ${result.data.accessToken}`
          this.$router.push(`/rooms/${result.data.roomCode}`)
        })
        .catch(e => {
          this.isButtonDisabled = false
          console.log('Error occured while trying create a room', e)
        })
    },
  },
}
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  margin: 30% 0 0 7%;
  text-align: left;
}
.create-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 7%;
}
.create-form > input {
  width: 100%;
}
.password {
  margin-top: 15px;
}
.button {
  margin-top: 25px;
}
</style>
