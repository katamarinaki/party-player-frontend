<template>
  <div class="search-controls">
    <input
      class="search-input"
      type="text"
      name="yt-search"
      id="yt-search"
      placeholder="search on YT"
      v-model="searchString"
      @keyup.enter="search()"
    />
    <input
      class="search-button"
      type="button"
      value="Search"
      @click="search()"
    />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SearchControl',
  data() {
    return {
      searchString: '',
      results: [],
      api: {
        baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
        part: 'snippet',
        type: 'video',
        order: 'viewCount',
        maxResults: 12,
        q: '',
        key: process.env.VUE_APP_YT_API_KEY,
        prevPageToken: '',
        nextPageToken: '',
      },
    }
  },
  methods: {
    search() {
      this.results = []
      const searchArray = this.searchString.split(' ')
      this.api.q = searchArray.join('+')
      const { baseUrl, part, type, order, maxResults, q, key } = this.api
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}`
      axios
        .get(apiUrl)
        .then(res => {
          res.data.items.map(videoObj => {
            this.results.push({
              id: videoObj.id.videoId,
              title: videoObj.snippet.title,
              channelTitle: videoObj.snippet.channelTitle,
              thumbnailSrc: videoObj.snippet.thumbnails.default.url,
            })
          })
          this.$emit('newsearch', this.results)
          // this.api.prevPageToken = res.data.prevPageToken
          // this.api.nextPageToken = res.data.nextPageToken
        })
        .catch(error => console.log(error.response))
    },
  },
}
</script>

<style scoped>
.search-controls {
  margin: 10px;
  display: flex;
  height: 3em;
}
.search-input {
  padding: 5px;
  font-size: 20px;
  width: 100%;
}
.search-button {
  margin-left: 5px;
  border-radius: 10px;
  height: 100%;
}
</style>
