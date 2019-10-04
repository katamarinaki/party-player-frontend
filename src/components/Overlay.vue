<template>
  <div v-if="showOverlay" class="overlay">
    <TrackCard @hide="hideOverlay" :track="currentUnvotedTrack" />
  </div>
</template>

<script>
import TrackCard from '@/components/TrackCard'

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
    return {}
  },
  watch: {},
  computed: {
    currentUnvotedTrack() {
      let all = this.$store.getters.unvotedTracks
      let track = all.length > 0 ? all[0] : null
      return track
    },
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
