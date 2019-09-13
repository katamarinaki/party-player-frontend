<template>
  <div class="header">
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
}
</script>

<style scoped>
.header {
  height: 80px;
  background-color: gray;
}
p {
  font-size: 24px;
  text-align: center;
  color: white;
}
</style>
