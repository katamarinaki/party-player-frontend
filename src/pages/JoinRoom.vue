<template>
  <div class="join-room">
    <RoomHeader :title="'PARTY PLAYER'" :backActionNeeded="true" />
    <p class="title">CONNECT TO ROOM</p>
    <form class="join-form" @submit.prevent="joinRoom">
      <input
        class="text-input"
        type="text"
        name="room-code"
        id="room-code"
        placeholder="Code"
        v-model="roomCode"
      />
      <input
        class="text-input password"
        type="password"
        name="room-password"
        id="room-password"
        placeholder="Password"
        v-model="roomPassword"
      />
      <input
        class="button"
        type="submit"
        value="Connect"
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
      roomCode: '',
      roomPassword: '',
      isButtonDisabled: false,
    }
  },
  methods: {
    joinRoom() {
      this.isButtonDisabled = true
      this.$http
        .post(`/rooms/join`, {
          code: this.roomCode,
          password: this.roomPassword,
        })
        .then(result => {
          this.isButtonDisabled = false
          localStorage.setItem('authtoken', result.data.accessToken)
          localStorage.setItem('roomcode', result.data.roomCode)
          this.$http.defaults.headers[
            'Authorization'
          ] = `Bearer ${result.data.accessToken}`
          this.$router.push(`/rooms/${result.data.roomCode}`)
        })
        .catch(e => {
          this.isButtonDisabled = false
          console.log('Error occured while trying connect to room', e)
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
.join-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 5%;
}
.join-form > input {
  width: 100%;
}
.password {
  margin-top: 15px;
}
.button {
  margin-top: 25px;
}
</style>
