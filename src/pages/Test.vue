<template>
  <div class="test">
    <RoomPlaylist />
    <CardsOverlay></CardsOverlay>
  </div>
</template>

<script>
import RoomPlaylist from '@/components/RoomPlaylist'
import CardsOverlay from '@/components/CardsOverlay'

export default {
  components: {
    RoomPlaylist,
    CardsOverlay,
  },
}
</script>

<style scoped>
.test {
  width: 100%;
  height: 100%;
}
</style>
