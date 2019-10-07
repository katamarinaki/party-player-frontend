<template>
  <div class="search-results">
    <div v-if="!results.length" class="no-results">
      Search your favorite track on YouTube!
    </div>
    <div class="results" v-else>
      <p class="results-text">Results</p>
      <TrackResult
        v-for="(result, index) in filteredResults"
        :key="index"
        :track="result"
        @addtrack="addToList"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['currentPlaylist', 'currentPlayingTrack']),
    filteredResults() {
      var filtered = this.results.filter(
        t =>
          this.currentPlayingTrack.id != t.id &&
          !this.currentPlaylist.find(t1 => t1.id == t.id)
      )
      return filtered
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
  margin: 20px 7%;
}
.track {
  margin-bottom: 20px;
}
.results-text {
  width: 100%;
  margin: 0 0 10px 0;
}
</style>
