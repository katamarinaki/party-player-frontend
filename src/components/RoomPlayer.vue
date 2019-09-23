<template>
  <div class="player">
    <youtube
      class="player-iframe"
      :video-id="videoID"
      :playerVars="playerVars"
      :fitParent="true"
      :resize="true"
      :resizeDelay="0"
      @ended="playerEnded"
      @ready="playerReady"
      @error="playerError"
      ref="youtube"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      playerVars: {
        autoplay: 1,
        controls: 1,
        origin: 'http://localhost:8080',
        host: 'http://www.youtube.com',
      },
      videoID: '',
      isPlayerReady: false,
    }
  },
  watch: {},
  mounted() {},

  methods: {
    playerEnded() {
      this.$store.commit('nextMeme')
    },

    currentTrackChanged(newVideo, oldVideo) {
      if (newVideo) {
        if (!oldVideo || oldVideo.id != newVideo.id) {
          this.videoID = newVideo.id
          this.player.playVideo()
        }
      } else {
        this.player.stopVideo()
        this.videoID = ''
      }
    },

    playerError() {
      console.log('Error with youtube player')
      //this.$store.commit("nextMeme");
    },

    // callback for when player is ready, we set up watchers for updated state
    playerReady() {
      this.isPlayerReady = true
      //this.$watch("nextVideo",this.nextVideoChanged,{immediate:true})
      this.$watch('currentPlayingTrack', this.currentTrackChanged, {
        immediate: true,
      })
    },
  },
  computed: {
    ...mapGetters(['currentPlayingTrack', 'currentPlaylist']),

    // player api instance, only legit after playerReady fired
    player() {
      return this.$refs.youtube.player
    },
  },
}
</script>

<style scoped>
.player {
  width: 100%;
}
.player-iframe {
  width: 100%;
}
</style>
