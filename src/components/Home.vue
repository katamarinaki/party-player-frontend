<template>
  <div class="home">
    <h3>PARTY PLAYER</h3>
    <div class="content">
      <router-link class="button" to="/join" tag="button">
        Join Room
      </router-link>
      <router-link class="button" to="/create" tag="button">
        Create Room
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
  border: 1px solid black;
  border-radius: 10px;
}
h3 {
  text-align: center;
}
.content {
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
