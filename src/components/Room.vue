<template>
  <div class="room">
    <h3>ROOM LOL KEK</h3>
  </div>
</template>

<script>
export default {
  beforeRouteUpdate(to, from, next) {
    console.log('beforerouterupdate')
    next()
  },
  created() {},
  data() {
    return {}
  },
  methods: {
    initRoom() {
      this.$http.get()
    },
  },
}
</script>

<style scoped></style>
