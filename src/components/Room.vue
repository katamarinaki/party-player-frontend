<template>
  <div class="room">
    <h3>ROOM LOL KEK {{ $route.params.id }}</h3>
  </div>
</template>

<script>
export default {
  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforerouterupdate')
  //   next()
  // },
  created() {
    this.$http
      .get(`${process.env.VUE_APP_SERVER}/rooms/${this.$route.params.id}`)
      .then(result => {
        alert(result)
      })
      .catch(err => {
        if (err.response && err.response.status) {
          this.$router.push('/404')
        }
      })
  },
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
