<template>
  <div class="current-track">
    <p class="current-title">Now playing</p>
    <TrackInRoom :track="currentPlayingTrack" />
    <div class="button-container">
      <input
        class="button"
        type="button"
        :value="skipMessage"
        @click="voteSkip"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TrackInRoom from './TrackInRoom'
export default {
  name: 'CurrentTrack',
  components: {
    TrackInRoom,
  },
  methods: {
    voteSkip() {
      if (this.isAdmin) this.$store.commit('nextMeme')
      else
        this.$http
          .post('/tracks/voteforskip')
          .then(result => console.log(result))
          .catch(e => console.log('error voting for skip', e))
    },
  },
  computed: {
    ...mapGetters([
      'isAdmin',
      'currentPlayingTrack',
      'currentUserCount',
      'currentVoteCount',
    ]),
    skipMessage() {
      return (
        `Skip this track` +
        (this.currentVoteCount > 0
          ? ` (${this.currentVoteCount}/${this.currentUserCount})`
          : '')
      )
    },
  },
}
</script>

<style scoped>
.current-track {
  margin: 0 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.current-title {
  width: 100%;
}
.button-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button {
  margin-top: 5px;
  background: none;
  border: 1px solid #242333;
}
</style>
