<template>
  <div v-if="show" class="overlay">
    <TrackCard v-if="show" @hide="hideOverlay" :track="currentUnvotedTrack" />
  </div>
</template>

<script>
import TrackCard from '@/components/TrackCard'
export default {
  props: ['show'],
  components: {
    TrackCard,
  },
  methods: {
    hideOverlay() {
      this.$emit('update:show', false)
    },
  },
  data() {
    return {}
  },
  computed: {
    currentUnvotedTrack() {
      let all = this.$store.getters.unvotedTracks
      let track = all.length > 0 ? all[0] : {}
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
  width: 100vw;
  height: 100vh;
  background: #000000;
  mix-blend-mode: normal;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
