<template>
  <div class="home">
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
  color: black;
  width: 100%;
  height: 100%;
}
h3 {
  font-weight: bold;
  margin: 0;
}
.content {
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.header {
  font-size: 38px;
  font-weight: bolder;
  margin: 40px 35px;
  text-align: center;
}
.buttons {
  margin: 50px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.button:nth-child(2) {
  margin-top: 24px;
}
.button {
  background-color: #d8d8d8;
  font-size: 32px;
  width: 320px;
  height: 140px;
}
</style>
