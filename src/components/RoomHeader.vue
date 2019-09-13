<template>
  <div class="header">
    <div v-if="backActionNeeded" class="action-left" @click="$router.back(-1)">
      ⬅️
    </div>
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    backActionNeeded: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.header {
  position: relative;
  height: 80px;
  background-color: gray;
}
.header > p {
  font-size: 24px;
  text-align: center;
  color: white;
}
.action-left {
  padding-top: 10px;
  cursor: pointer;
  color: white;
  height: 100%;
  width: 80px;
  font-size: 32px;
  position: absolute;
  left: 0;
}
</style>
