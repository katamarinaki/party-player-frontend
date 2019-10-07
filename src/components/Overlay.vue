<template>
  <div v-if="showOverlay" class="overlay">
    <TrackCard @hide="hideOverlay" :track="track" />
  </div>
</template>

<script>
import TrackCard from '@/components/TrackCard'
import { mapGetters } from 'vuex'
export default {
  props: ['showOverlay'],
  components: {
    TrackCard,
  },
  methods: {
    hideOverlay() {
      this.$emit('update:showOverlay', false)
    },
  },
  data() {
    return {
      track: null,
    }
  },
  watch: {
    unvotedTracks: {
      handler(newTracks) {
        if (this.track) {
          var updCur = newTracks.find(t => this.track.uuid == t.uuid)
          if (updCur) this.track = updCur
          else this.track = newTracks.length > 0 ? newTracks[0] : null
        }
        this.track = newTracks.length > 0 ? newTracks[0] : null
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(['unvotedTracks']),
  },
}
</script>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  mix-blend-mode: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.track-card {
  margin-top: 20%;
}
</style>
