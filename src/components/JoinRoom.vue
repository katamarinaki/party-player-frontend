<template>
  <form class="join-room" @submit.prevent="joinRoom">
    <h3>JOIN ROOM</h3>
    <input
      type="text"
      name="room-code"
      id="room-code"
      placeholder="room code"
      v-model="roomCode"
    />
    <input
      type="password"
      name="room-password"
      id="room-password"
      placeholder="room password"
      v-model="roomPassword"
    />
    <input
      class="button"
      type="submit"
      value="Join"
      :disabled="isButtonsDisabled"
    />
    <router-link
      class="button"
      to="/"
      tag="button"
      :disabled="isButtonsDisabled"
    >
      Back to Menu
    </router-link>
  </form>
</template>

<script>
export default {
  data() {
    return {
      roomCode: '',
      roomPassword: '',
      isButtonsDisabled: false,
    }
  },
  methods: {
    joinRoom() {
      this.isButtonsDisabled = true
      this.$http
        .post(`/rooms/join`, {
          code: this.roomCode,
          password: this.roomPassword,
        })
        .then(result => {
          this.isButtonsDisabled = false
          this.$store.commit('setToken', result.data.accessToken)
          localStorage.setItem('roomcode', result.data.roomCode)
          this.$router.push(`/rooms/${result.data.roomCode}`)
        })
        .catch(e => {
          this.isButtonsDisabled = false
          console.log('Error occured while trying create a room' + e)
        })
    },
  },
}
</script>

<style scoped>
.join-room {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
}

.join-room > input {
  width: 200px;
  margin-bottom: 20px;
}

.button {
  height: 50px;
}
</style>
