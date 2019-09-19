<template>
  <div class="player">
    <youtube
      :video-id="videoID"
      :playerVars="playerVars"
      :fitParent="true"
      :resize="true"
      :resizeDelay="0"
      @ended="playerEnded"
      @ready="playerReady"
      ref="youtube"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
  watch:{

  },
  mounted(){
  },

  methods:{


    playerEnded(){
      this.$store.commit("nextTrack");
    },

    currentTrackChanged(newVideo,oldVideo){
      if(newVideo){
          if( !oldVideo || oldVideo.id != newVideo.id){
            this.videoID = newVideo.id
            this.player.playVideo()
          }
      }
      else{
        this.player.stopVideo()
        this.videoID=''
      }
    },



    // callback for when player is ready, we set up watchers for updated state
    playerReady(){
      this.isPlayerReady = true
      //this.$watch("nextVideo",this.nextVideoChanged,{immediate:true})
      this.$watch("currentPlayingTrack",this.currentTrackChanged,{immediate:true})
    }
  },
  computed:{

     ...mapGetters(["currentPlayingTrack","currentPlaylist"]),



     // player api instance, only legit after playerReady fired
     player() {
       return this.$refs.youtube.player;
     }

  }

}
</script>

<style scoped>
.player {
  width: 100px;
}
</style>
