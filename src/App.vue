<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.button {
  cursor: pointer;
  width: 330px;
  height: 50px;
  padding: 0;
  background: #61a1ec;
  font-size: 16px;
  border-radius: 4px;
  outline: none;
  border: none;
}
.text-input {
  border: none;
  width: 330px;
  height: 50px;
  border-radius: 4px;
  font-size: 16px;
  color: black;
  padding: 0 15px;
  outline: none;
  background-color: #d8d8d8;
}
</style>
