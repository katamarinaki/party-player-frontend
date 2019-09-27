<template>
  <div class="search-controls">
    <input
      class="text-input"
      type="text"
      name="yt-search"
      id="yt-search"
      placeholder="Search on YouTube"
      v-model="searchString"
      @keyup.enter="search()"
    />
    <input class="button" type="button" value="Search" @click="search()" />
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
      // const searchCategory = '&videoCategoryId=10'
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
  margin: 20px 7%;
  display: flex;
  justify-content: center;
}
.text-input {
  flex-shrink: 1;
  border: 1px solid #0e1422;
  border-radius: 3px;
  padding-left: 20px;
}
.button {
  display: none;
  flex-shrink: 6;
  max-width: 100px;
}
</style>
