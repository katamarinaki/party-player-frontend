<template>
  <div class="search-container">
    <RoomHeader :title="`Search`" :backActionNeeded="true" />
    <SearchInput @newsearch="onSearch" />
    <SearchResults :results="searchResults" />
  </div>
</template>

<script>
import RoomHeader from '@/components/RoomHeader'
import SearchInput from '@/components/SearchInput'
import SearchResults from '@/components/SearchResults'
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

<style scoped></style>
