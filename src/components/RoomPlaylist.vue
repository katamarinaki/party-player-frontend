<template>
  <div class="playlist">
    <div class="playlist-empty" v-if="isPlayListEmpty">No Tracks</div>
    <template v-else>
      <CurrentTrack />
      <div class="playlist-title">
        <span>Tracklist</span>
        <span class="red">Swipe right to dislike</span>
        <span class="green">Swipe left to like</span>
      </div>
      <swipe-list
        class="list"
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
            <img :src="thumb" />
          </div>
        </template>
        <template v-slot:right="{ index }">
          <div class="like">
            <img :src="thumb" />
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
import CurrentTrack from '@/components/CurrentTrack'
import thumb from '@/assets/whiteThumb.svg'

import { mapGetters } from 'vuex'

export default {
  components: {
    CurrentTrack,
    SwipeList,
    TrackInRoom,
  },
  data() {
    return {
      thumb,
    }
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
  margin: 2px 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.playlist-empty {
  text-align: center;
}
.list {
  margin: 0 7%;
}
.list * {
  margin-bottom: 20px;
}
.playlist-title {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px;
  padding-left: 7%;
  font-size: 12px;
  text-align: left;
}
.red {
  margin-left: 5%;
  color: #4d1414;
}
.green {
  margin-left: 10px;
  color: #00c6ba;
}
.dislike {
  margin-right: 10px;
  background-color: #4d1414;
}
.like {
  margin-left: 10px;
  background-color: #00c6ba;
}

.dislike>img{
  transform: rotate(-180deg);
}

.like,
.dislike {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  width: 200px;
}
</style>
