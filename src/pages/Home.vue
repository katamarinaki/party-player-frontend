<template>
  <div class="home">
    <p class="header">WELCOME TO</p>
    <p class="header">PARTY PLAYER</p>
    <div class="buttons">
      <router-link class="button" to="/create" tag="button">
        Create a room
      </router-link>
      <router-link class="button" to="/join" tag="button">
        Connect to room
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.home {
  width: 100%;
}
.header {
  margin: 0 10%;
  font-size: 24px;
  font-weight: bolder;
  text-align: left;
}
.header:first-child {
  margin-top: 30%;
}
.buttons {
  margin: 100px 7%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.button:nth-child(2) {
  margin-top: 24px;
}
</style>
