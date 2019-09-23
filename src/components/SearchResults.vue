<template>
  <div class="search-results">
    <div v-if="!results.length" class="result no-results">No resluts</div>
    <div v-else v-for="(result, index) in results" :key="index">
      <TrackResult :track="result" @addtrack="addToList" />
    </div>
  </div>
</template>

<script>
import TrackResult from '@/components/TrackResult'
export default {
  components: {
    TrackResult,
  },
  props: {
    results: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    addToList(track) {
      this.$http
        .post('/tracks/add', track)
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
      //this.$store.commit('pushToPlaylist', track)
    },
  },
}
</script>

<style scoped>
.search-results {
  padding: 10px;
  overflow-y: scroll;
}
.no-results {
  overflow-y: hidden;
  text-align: center;
}
</style>
