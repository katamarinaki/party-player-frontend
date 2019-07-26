<template>
  <div id="app">
    <Tabs 
      :activeIndex="activeIndex"
      :tabs="tabs"
      :toggleTab="toggleTab"
    />
  </div>
</template>

<script>
import Tabs from './components/Tabs'

export default {
  name: 'app',
  components: {
    Tabs
  },
  data() {
    return {
      tabs: ['CREATE', 'OPEN'],
      activeIndex: 0
    }
  },
  methods: {
    toggleTab(index) {
      this.activeIndex = index
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
