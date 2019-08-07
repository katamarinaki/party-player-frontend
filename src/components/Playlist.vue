<template>
  <div class="playlist">
    <div class="search-panel">
      <input
        class="search-input"
        type="text"
        name="yt-search"
        id="yt-search"
        placeholder="search on YT"
        v-model="searchString"
        @keyup.enter="searchOnYT()"
      />
      <input
        class="search-button"
        type="button"
        value="Search"
        @click="searchOnYT()"
      />
    </div>
    <div class="tracklist">
      <div v-if="!videos.length" class="track no-tracks">No tracks</div>
      <div
        v-else
        class="track"
        v-for="(track, index) in videos"
        :key="index"
        @click="onClickTrack(track.id)"
      >
        <span>{{ track.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onClickTrack: Function,
  },
  data() {
    return {
      searchString: '',
      videos: [],
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
    searchOnYT() {
      this.videos = []
      const searchArray = this.searchString.split(' ')
      this.api.q = searchArray.join('+')
      const { baseUrl, part, type, order, maxResults, q, key } = this.api
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}`
      this.$http
        .get(apiUrl)
        .then(res => {
          res.data.items.map(videoObj => {
            this.videos.push({
              id: videoObj.id.videoId,
              title: videoObj.snippet.title,
              channelTitle: videoObj.snippet.channelTitle,
            })
          })
          this.api.prevPageToken = res.data.prevPageToken
          this.api.nextPageToken = res.data.nextPageToken
        })
        .catch(error => alert(error))
    },
  },
  computed: {},
}
</script>

<style scoped>
.playlist {
  height: 400px;
  width: 250px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.search-panel {
  display: flex;
  justify-content: space-between;
  height: 50px;
}

.search-input {
  border: none;
  margin-left: 10px;
}

.search-input:focus {
  outline: none;
}

.search-button {
  border-radius: 10px;
}

.track {
  height: 30px;
  padding: 5px;
  font-size: 12px;
}

.track:hover:not(.no-tracks) {
  cursor: pointer;
  background-color: lightgray;
}

.track:not(:last-child) {
  border-bottom: 1px solid gray;
}

.tracklist {
  border-top: 1px solid black;
  overflow-y: auto;
}

.no-tracks {
  text-align: center;
}
</style>
