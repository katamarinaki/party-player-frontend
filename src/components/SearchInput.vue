<template>
  <div class="search">
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
      console.log(process.env.VUE_APP_YT_API_KEY)
      this.results = []
      const searchArray = this.searchString.split(' ')
      this.api.q = searchArray.join('+')
      const { baseUrl, part, type, order, maxResults, q, key } = this.api
      const searchCategory = '&videoCategoryId=10'
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
          console.log(res.data.items)
          this.$emit('newsearch', this.results)
          this.api.prevPageToken = res.data.prevPageToken
          this.api.nextPageToken = res.data.nextPageToken
        })
        .catch(error => console.log(error.response))
    },
  },
}
</script>

<style scoped>
.search {
  margin: 10px;
  display: flex;
  height: 2em;
}
.search-input {
  box-sizing: border-box;
  font-size: 20px;
  width: 80%;
}
.search-button {
  margin-left: 5px;
  border-radius: 10px;
  height: 100%;
}
</style>
