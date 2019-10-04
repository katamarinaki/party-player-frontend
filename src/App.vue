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
  background-color: #04070d;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #ffffff;
}
.text-input {
  color: #ffffff;
  background: none;
  border: none;
  border-bottom: 1px solid #878787;
  outline: none;
  font-size: 16px;
  height: 50px;
  width: 100%;
  max-width: 350px;
}
.text-input::placeholder {
  color: #878787;
}
.button {
  cursor: pointer;
  background-color: #242333;
  color: #ffffff;
  border: none;
  outline: none;
  border-radius: 3px;
  font-size: 16px;
  height: 50px;
  width: 100%;
  max-width: 350px;
}
</style>
