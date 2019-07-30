<template>
  <div class="tabs">
    <TabItem
      v-for="(tab, index) in tabs"
      :key="index"
      :data="tabs[index]"
      :index="index"
      :isActive="activeIndex === index"
      :toggleTab="toggleTab"
    />
  </div>
</template>

<script>
import TabItem from './TabItem'
export default {
  components: {
    TabItem,
  },
  props: {
    tabs: Array,
    activeIndex: Number,
    toggleTab: Function,
  },
}
</script>

<style scoped>
.tabs {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
}
</style>
