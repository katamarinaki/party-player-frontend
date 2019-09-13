<template>
  <div class="search-results">
    <div v-if="!results.length" class="no-results">No results</div>
    <div v-else v-for="(result, index) in results" :key="index">
      <TrackResult :track="result" />
    </div>
  </div>
</template>

<script>
import TrackResult from './TrackResult'
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
