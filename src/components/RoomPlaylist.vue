<template>
  <div class="playlist">
    <div class="playlist-empty" v-if="isPlayListEmpty">No Tracks</div>
    <template v-else>
      <CurrentTrack />
      <div class="playlist-title">
        <span>Tracklist</span>
        <span class="green">Swipe left to like</span>
        <span class="red">Swipe right to dislike</span>
      </div>
      <swipe-list
        ref="playlist"
        :items="currentPlaylist"
        @swipeout:click="closeAll"
        v-touch:end="closeAll"
      >
        <template v-slot="{ item, index }">
          <TrackInRoom
            :track="item"
            v-touch:swipe.left="swipeLeft(index)"
            v-touch:swipe.right="swipeRight(index)"
          />
        </template>
        <template v-slot:left="{ index }">
          <div class="dislike">
            <div>👎</div>
          </div>
        </template>
        <template v-slot:right="{ index }">
          <div class="like">
            <div>👍</div>
          </div>
        </template>
      </swipe-list>
    </template>
  </div>
</template>

<script>
// TO DO - добавить кастомный ID в темплейт плейлиста
import { SwipeList } from 'vue-swipe-actions'
import 'vue-swipe-actions/dist/vue-swipe-actions.css'
import TrackInRoom from '@/components/TrackInRoom'
import { mapGetters } from 'vuex'
import CurrentTrack from './CurrentTrack'

export default {
  components: {
    CurrentTrack,
    SwipeList,
    TrackInRoom,
  },
  methods: {
    swipeLeft(index) {
      return this.like.bind(this, index)
    },
    swipeRight(index) {
      return this.dislike.bind(this, index)
    },
    close(item) {
      console.log(item)
      this.$refs.playlist.closeActions(item.id)
    },
    dislike(index) {
      //console.log('dislike')
      const trackUUID = this.currentPlaylist[index].uuid
      this.$http
        .post('/tracks/dislike', { trackUUID })
        .then(() => {
          console.log('disliked ', trackUUID)
        })
        .catch(e => {
          console.log('error while disliking track:', trackUUID, e)
        })
    },
    like(index) {
      console.log('like')
      const trackUUID = this.currentPlaylist[index].uuid
      this.$http
        .post('/tracks/like', { trackUUID })
        .then(() => {
          console.log('liked ', trackUUID)
        })
        .catch(e => {
          console.log('error while liking track:', trackUUID, e)
        })
    },
    closeAll() {
      this.$refs.playlist.closeActions()
    },
  },
  computed: {
    ...mapGetters([
      'currentPlaylist',
      'currentPlayingTrack',
      'isPlayListEmpty',
      'isAdmin',
      'currentUserCount',
      'currentVoteCount',
    ]),
    skipMessage() {
      return (
        `Skip this track` +
        (this.currentVoteCount > 0
          ? ` ${this.currentVoteCount}/${this.currentUserCount}`
          : '')
      )
    },
  },
}
</script>

<style scoped>
.playlist {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.button-container {
  margin: 2px 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.playlist-empty {
  text-align: center;
}

.playlist-title {
  margin: 10px 5%;
  font-size: 16px;
}
.red {
  margin-left: 10px;
  color: red;
}
.green {
  margin-left: 10px;
  color: green;
}
.dislike {
  background-color: red;
}
.like {
  background-color: green;
}

.like,
.dislike {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 24px;
  width: 200px;
}
</style>
