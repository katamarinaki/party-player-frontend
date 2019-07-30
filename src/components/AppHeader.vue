<template>
  <div id="app-header">
    <Tabs :activeIndex="activeIndex" :tabs="tabs" :toggleTab="toggleTab" />
  </div>
</template>

<script>
import Tabs from './Tabs'

export default {
  name: 'AppHeader',
  components: {
    Tabs,
  },
  data() {
    return {
      tabs: ['HOME', 'CREATE ROOM', 'OPEN ROOM'],
      activeIndex: 0,
    }
  },
  methods: {
    toggleTab(index) {
      this.activeIndex = index
    },
  },
}
</script>

<style scoped></style>
