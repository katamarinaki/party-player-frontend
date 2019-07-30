<template>
  <form class="open-room" @submit.prevent="openRoom">
    <h3>OPEN ROOM</h3>
    <input
      type="text"
      name="room-id"
      id="room-id"
      placeholder="room id" 
      v-model="roomID"
    />
    <input
      type="password"
      name="room-password"
      id="room-password"
      placeholder="room password"
      v-model="roomPassword"
    />
    <input class="button" type="submit" value="Open" />
    <router-link class="button" to="/" tag="button">Back to Menu</router-link>
  </form>
</template>

<script>
export default {
  data() {
    return {
      roomID: '',
      roomPassword: '',
    }
  },
  methods: {
    openRoom() {
      this.$http
        .get(`${process.env.VUE_APP_SERVER}/rooms/${this.roomID}`)
        .then(response => {
          this.$router.push(`/room/${response.data.id}`)
        })
        .catch(() => {
          alert('Error occured while trying open a room')
        })
    },
  },
}
</script>

<style scoped>
.open-room {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
}

.open-room > input {
  width: 200px;
  margin-bottom: 20px;
}

.button {
  height: 50px;
}
</style>
