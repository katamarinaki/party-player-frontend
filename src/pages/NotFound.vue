<template>
  <div class="not-found">
    THIS PAGE DOES NOT EXIST
    <router-link to="/">GO TO MAIN PAGE</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
.not-found {
  font-size: 34px;
  text-align: center;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
