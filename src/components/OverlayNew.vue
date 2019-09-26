<template>
  <div class="overlay">
    <TrackCard />
  </div>
</template>

<script>
import TrackCard from './TrackCard'
export default {
  components: {
    TrackCard,
  },
  data() {
    return {}
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
