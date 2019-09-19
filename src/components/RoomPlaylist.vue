<template>
  <div class="playlist">
    <div class="playlist-empty" v-if="!currentPlaylist.length">No Tracks</div>
    <template v-else>
      <TrackInRoom :track="currentPlayingTrack" />
      <swipe-list
        ref="playlist"
        :items="currentPlaylist"
        @active="closeAll"
        @swipeout:click="closeAll"
      >
        <template v-slot="{ item }">
          <TrackInRoom :track="item" @click="close(index)" />
        </template>
        <template v-slot:left="{ index }">
          <div class="dislike" @click="$emit('like', index)">
            <i>👎</i>
          </div>
        </template>
        <template v-slot:right="{ index }">
          <div class="like" @click="$emit('dislike', index)">
            <i>👍</i>
          </div>
        </template>
      </swipe-list>
    </template>
  </div>
</template>

<script>
// TO DO - добавить кастомный ID в темплейт плейлиста
import { SwipeList, SwipeOut } from 'vue-swipe-actions'
import 'vue-swipe-actions/dist/vue-swipe-actions.css'
import TrackInRoom from './TrackInRoom'
import { mapGetters } from 'vuex'

export default {
  components: {
    SwipeOut,
    SwipeList,
    TrackInRoom,
  },
  methods: {
    close(item) {
      console.log(item)
      this.$refs.playlist.closeActions(item.id)
    },
    dislike(index) {
      console.log('dislike')
      this.$refs.playlist.closeActions(index)
    },
    like(index) {
      console.log('like')
      this.$refs.playlist.closeActions(index)
    },
    closeAll() {
      this.$refs.playlist.closeActions()
    },
  },
  computed: {
    ...mapGetters(['currentPlaylist', 'currentPlayingTrack']),
  },
}
</script>

<style scoped>
.playlist {
  margin-top: 10px;
  overflow-y: auto;
}

.playlist-empty {
  text-align: center;
}

.dislike {
  background-color: red;
}
.like {
  background-color: green;
}

.like,
.dislike {
  color: white;
  font-size: 48px;
  width: 50px;
}
.dislike > i {
  text-align: center;
}
</style>
