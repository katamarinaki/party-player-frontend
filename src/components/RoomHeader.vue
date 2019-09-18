<template>
  <div class="header">
    <div v-if="backActionNeeded" class="action-left" @click="$router.back(-1)">
      <p>&lt;</p>
    </div>
    <p class="title">{{ title }}</p>
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
  padding: 24px 0;
  border-bottom: 2px solid black;
}
.title {
  margin: 0;
  font-size: 24px;
  text-align: center;
}
.action-left {
  padding-left: 10px;
  cursor: pointer;
  height: 100%;
  width: 80px;
  font-size: 48px;
  position: absolute;
  left: 0;
  top: 0;
}
.action-left > p {
  margin: 12px 0;
}
</style>
