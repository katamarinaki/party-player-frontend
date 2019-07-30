<template>
  <form class="create-room" @submit.prevent="createRoom">
    <h3>CREATE ROOM</h3>
    <input
      type="text"
      name="room-name"
      id="room-name"
      placeholder="room name"
      v-model="roomName"
    />
    <input
      type="password"
      name="room-password"
      id="room-password"
      placeholder="room password (optional)"
      v-model="roomPassword"
    />
    <input class="button" type="submit" value="Create" />
    <router-link class="button" to="/" tag="button">Back to Menu</router-link>
  </form>
</template>

<script>
export default {
  data() {
    return {
      roomName: '',
      roomPassword: '',
    }
  },
  methods: {
    createRoom() {
      this.$http
        .post(`${process.env.VUE_APP_SERVER}/rooms`, {
          name: this.roomName,
          password: this.roomPassword,
        })
        .then(() => {
          console.log('room created')
          this.$router.push('/')
        })
        .catch(() => {
          alert('Error occured while trying create a room')
        })
    },
  },
}
</script>

<style scoped>
.create-room {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
}

.create-room > input {
  width: 200px;
  margin-bottom: 20px;
}

.button {
  height: 50px;
}
</style>
