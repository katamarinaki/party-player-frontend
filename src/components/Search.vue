<template>
  <div class="search-component">
    <RoomHeader :name="room.name" />
    <SearchInput @newsearch="onSearch" />
    <SearchResults :searchlist="searchResults" />
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
    room() {
      return this.$store.getters.currentRoom
    },
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
</style>
