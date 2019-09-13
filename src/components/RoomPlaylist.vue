<template>
  <div class="playlist">
    <div v-if="!playlist.length" class="track no-tracks">No tracks</div>
    <div
      v-else
      class="track"
      v-for="(track, index) in playlist"
      :key="index"
      @click="onClickTrack(track.id)"
    >
      <span>{{ track.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Object,
      default: () => {
        return { tracks: [] }
      },
    },
  },
}
</script>

<style scoped>
.track {
  height: 30px;
  padding: 5px;
  font-size: 12px;
}

.track:hover:not(.no-tracks) {
  cursor: pointer;
  background-color: lightgray;
}

.track:not(:last-child) {
  border-bottom: 1px solid gray;
}

.playlist {
  margin-top: 10px;
  border-top: 1px solid black;
  overflow-y: auto;
}

.no-tracks {
  text-align: center;
}
</style>
