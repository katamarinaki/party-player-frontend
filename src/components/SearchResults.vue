<template>
  <div class="search-results">
    <div v-if="!results.length" class="no-results">
      Search your favorite track on YouTube!
    </div>
    <div class="results" v-else>
      <TrackResult
        v-for="(result, index) in results"
        :key="index"
        :track="result"
        @addtrack="addToList"
      />
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
.no-results {
  text-align: center;
}
.results {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 7%;
}
.track {
  margin-top: 10px;
}
</style>
