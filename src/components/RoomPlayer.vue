<template>
  <div class="player">
    <youtube
      :video-id="videoID"
      :playerVars="playerVars"
      :fitParent="true"
      :resize="true"
      :resizeDelay="0"
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
}
</script>

<style scoped>
youtube {
  height: 300px;
}
</style>
