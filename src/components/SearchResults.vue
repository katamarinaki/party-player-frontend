<template>
  <div class="search-results">
    <div v-if="!searchlist.length" class="result no-results">No resluts</div>
    <div v-else v-for="(result, index) in searchlist" :key="index">
      <TrackResult :track="result" @addtrack="addToList" />
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
    searchlist: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
     addToList(track) {
       this.$store.commit("pushToPlaylist",track);
     }
  },
}
</script>

<style scoped>
.search-results {
  padding: 10px;
  overflow-y: scroll;
}
</style>
