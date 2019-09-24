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
body {
  width: 100%;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.button,
.text-input {
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 16px;
  height: 50px;
  padding: 0 15px;
  width: 100%;
  max-width: 350px;
}
.button {
  cursor: pointer;
  background-color: #61a1ec;
}
.text-input {
  color: black;
  background-color: #d8d8d8;
}
</style>
