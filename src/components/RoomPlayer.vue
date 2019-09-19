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
     //pops  next track out of playlist
     //plays if it exists
     playNext(){
      this.$store.commit("nextTrack")
    },

    async playVideo() {
       await this.player.playVideo()
    },

    async cueNext(){
       await this.player.cueVideoById()
    },

    nextVideoChanged(newVideo,oldVideo){
      if(newVideo){
        if(!oldVideo || oldVideo.id!=newVideo.id)
          this.player.cueVideoById(newVideo.id)
      }
      else{
        this.player.cueVideoById("");
      }
    },



    playerEnded(){
      this.player.playVideo().then(()=>this.$store.commit("nextTrack"));
    },


    // callback for when player is ready, we set up watchers for updated state
    playerReady(){
      this.isPlayerReady = true
      this.$watch("nextVideo",this.nextVideoChanged,{immediate:true})
      //this.$watch("currentPlayingTrack",this.currentTrackChanged,{immediate:true})
    }
  },
  computed:{

     ...mapGetters(["currentPlayingTrack","currentPlaylist"]),



     nextVideo(){
       this.currentPlaylist.length ? this.currentPlaylist[0] : null
     },

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
