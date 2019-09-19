<template>
  <div class="search-component">
    <RoomHeader :title="`Search`" :backActionNeeded="true" />
    <SearchInput @newsearch="onSearch" />
    <SearchResults class="results" :results="searchResults" />
  </div>
</template>

<script>
import RoomHeader from './RoomHeader'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
export default {
  components: {
    RoomHeader,
    SearchInput,
    SearchResults,
  },
  methods: {
    onSearch(results) {
      this.searchResults = results
    },
  },
  created() {
    if (!this.code || this.code !== this.$route.params.code) {
      this.$router.push('/join') // прокинуть проп
    }
  },
  computed: {
    code() {
      return localStorage.getItem('roomcode')
    },
  },
  data() {
    return {
      searchResults: [],
    }
  },
}
</script>

<style scoped>
.search-component {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.header,
.search-controls,
.search-results {
  flex-shrink: 0;
}
</style>
