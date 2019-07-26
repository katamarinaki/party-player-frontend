<template>
  <div 
    class="tab"
    :class="{ active: isActive }"
    @click="toggleTab(index)"
  >
    {{data}}
  </div>
</template>

<script>
export default {
  props: {
    data: String,
    index: Number,
    isActive: Boolean,
    toggleTab: Function
  }
}
</script>

<style scoped>
  .tab {
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
    margin-right: 10px;
  }
  .tab.active {
    border-bottom: 2px solid black;
	}

</style>


