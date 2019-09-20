<template>
  <div class="playlist">
    <div class="playlist-empty" v-if="!currentPlaylist.length">No Tracks</div>
    <template v-else>
      <p class="playlist-title">
        <span>Tracklist</span>
        <span class="red">Swipe right to like</span>
        <span class="green">Swipe left to dislike</span>
      </p>
      <TrackInRoom :track="currentPlayingTrack" />
      <input class="button" type="button" :value="`Skip this track (10)`" />
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
      //console.log('dislike')
      const trackID = playlist[index].id
      this.$http
        .post("/tracks/dislike",{trackID})
        .then(()=>{
          console.log("disliked ",trackID)
        }).
        catch((e)=>{
          console.log("error while disliking track:",trackID,e);
        })
      this.$refs.playlist.closeActions(index)
    },
    like(index) {
      //console.log('like')
      this.$http
        .post("/tracks/like",{trackID})
        .then(()=>{
          console.log("liked ",trackID)
        }).
        catch((e)=>{
          console.log("error while liking track:",trackID,e);
        })
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
  overflow-y: auto;
}

.button {
  margin-left: 20px;
}

.playlist-empty {
  text-align: center;
}

.playlist-title {
  margin-left: 10px;
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
  color: white;
  font-size: 48px;
  width: 50px;
}
.dislike > i {
  text-align: center;
}
</style>
