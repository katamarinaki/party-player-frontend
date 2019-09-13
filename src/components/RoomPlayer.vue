<template>
  <div class="player">
    <youtube
      :video-id="videoID"
      :playerVars="playerVars"
      :fitParent="true"
      :resize="true"
      :resizeDelay="0"
      @ended="playNext"
      ref="youtube"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerVars: {
        autoplay: 1,
        controls: 1,
        origin: 'http://localhost:8080',
      },
      videoID: '',
    }
  },
  watch:{
    isNothingToPlay(newState){
      if(!this.isNothingToPlay && this.videoID==="")
        this.playNext()
    }
  },
  methods:{
     playNext(){
       if(this.isNothingToPlay){
         this.videoID=""
         return;
      }
      this.$store.commit("nextTrack")
      let newTrack = this.$store.getters.currentPlayingTrack
      this.videoID = newTrack.id
      this.$refs.youtube.player.playVideo()
     }
  },
  computed:{
     isNothingToPlay(){
       return this.$store.getters.isPlayListEmpty
     },
     
     player(){
       return this.$refs.youtube.player
     }
     
  }
  
}
</script>

<style scoped>
youtube {
  height: 300px;
}
</style>
