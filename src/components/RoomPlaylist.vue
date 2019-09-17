<template>
  <div class="playlist">
    <div class="playlist-empty" v-if="!playlist.tracks.length">No Tracks</div>
    <swipe-list
      v-else
      ref="playlist"
      :items="playlist.tracks"
      @active="closeAll"
      @swipeout:click="closeAll"
    >
      <template v-slot="{ item }">
        <TrackInRoom @click="close(index)" />
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
      <template v-slot:empty>
        <div>list is empty ( filtered or just empty )</div>
      </template>
    </swipe-list>
  </div>
</template>

<script>
// TO DO - добавить кастомный ID в темплейт плейлиста
import { SwipeList, SwipeOut } from 'vue-swipe-actions'
import 'vue-swipe-actions/dist/vue-swipe-actions.css'
import TrackInRoom from './TrackInRoom'

export default {
  components: {
    SwipeOut,
    SwipeList,
    TrackInRoom,
  },
  props: {
    playlist: {
      type: Object,
      default: () => {
        return { tracks: [] }
      },
    },
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
