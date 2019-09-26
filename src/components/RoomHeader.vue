<template>
  <div class="header">
    <div
      v-if="backActionNeeded"
      class="action-left"
      @click="$router.back(-1)"
    ></div>
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
}
.title {
  margin: 0;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
}
.action-left {
  border-top: 4px solid white;
  border-left: 4px solid white;
  padding-left: 10px;
  cursor: pointer;
  height: 14px;
  width: 14px;
  transform: rotate(-45deg);
  font-size: 48px;
  position: absolute;
  left: 25px;
  top: 30px;
}
.action-left > p {
  margin: 12px 0;
}
</style>
