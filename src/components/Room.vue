<template>
  <div class="room">
    <div class="room-header">
      <h3>ROOM №{{ $route.params.id }}</h3>
    </div>
    <div class="room-content">
      <div class="video-player">
        <youtube
          :video-id="videoID"
          :fitParent="true"
          :resize="true"
          :playerVars="playerVars"
          ref="youtube"
        />
      </div>
      <Playlist :onClickTrack="playVideo" />
    </div>
  </div>
</template>

<script>
import Playlist from './Playlist'
export default {
  components: {
    Playlist,
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforerouterupdate')
  //   next()
  // },
  created() {
    // this.$http
    //   .get(`${process.env.VUE_APP_SERVER}/rooms/${this.$route.params.id}`)
    //   .then(result => {
    //     this.initRoom(null)
    //   })
    //   .catch(err => {
    //     if (err.response && err.response.status) {
    //       this.$router.push('/404')
    //     }
    //   })
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    },
  },
  data() {
    return {
      playerVars: {
        autoplay: 1,
        controls: 1,
        origin: 'http://localhost:8080',
      },
      videos: [],
      videoID: '',
      searchString: '',
      reformattedSearchString: '',
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
    playVideo(id) {
      this.videoID = id
      this.player.playVideo()
    },
    initRoom() {
      // console.log(roomData)
      // this.search(['gachimuchi', 'remix'])
      // console.log(this.videos)
    },
  },
}
</script>

<style scoped>
.room {
  display: flex;
  flex-direction: column;
}
.room-content {
  display: flex;
  flex-direction: row;
}

.video-player {
  width: 500px;
  margin-right: 50px;
}
</style>
