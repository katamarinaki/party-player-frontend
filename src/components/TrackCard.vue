<template>
  <div class="track-card">
    <div v-if="track != null" class="track-cover">
      <img :src="track.thumbnailSrc" />
    </div>
    <div class="track-content">
      <p v-if="track != null" class="track-title">{{ track.title }}</p>
      <p v-if="track != null" class="track-channelname">
        {{ track.channelTitle }}
      </p>
      <div v-if="track != null" class="button-block">
        <div class="vote-button" @click="dislike">
          <p class="dislike">
            <img class="thumb-img" :src="thumbDown" />
          </p>
          <p class="vote-text big">No</p>
          <p class="vote-text">Swipe to left</p>
        </div>
        <div class="divider"></div>
        <div class="vote-button" @click="like">
          <p class="like">
            <img class="thumb-img" :src="thumbUp" />
          </p>
          <p class="vote-text big">Yes</p>
          <p class="vote-text">Swipe to right</p>
        </div>
      </div>
      <div class="button-container">
        <input class="button" type="button" value="Hide" @click="hideOverlay" />
      </div>
    </div>
  </div>
</template>

<script>
import thumbDown from '@/assets/thumbDown.svg'
import thumbUp from '@/assets/thumbUp.svg'

export default {
  props: {
    track: {
      type: Object,
      default: () => {
        return {
          title: 'Я крутой чел',
          channelTitle: 'Алексей Пивоваров',
          thumbnailSrc:
            'https://sun9-43.userapi.com/c854028/v854028637/dd6f6/Xr4q52zuGCs.jpg',
          likes: 100,
          dislikes: 10,
        }
      },
    },
  },
  data() {
    return {
      thumbDown,
      thumbUp,
    }
  },
  watch: {
    track: {
      handler: function(newVal) {
        if (!newVal) this.hideOverlay()
      },
      immediate: true,
    },
  },
  methods: {
    hideOverlay() {
      this.$emit('hide')
    },

    dislike() {
      if (!this.track) return
      const trackUUID = this.track.uuid
      this.$store.commit('voteTrack', { uuid: trackUUID, vote: -1 })
      this.$http.post('/tracks/dislike', { trackUUID }).catch(e => {
        console.log('error while disliking track:', trackUUID, e)
      })
    },
    like() {
      if (!this.track) return
      const trackUUID = this.track.uuid
      this.$store.commit('voteTrack', { uuid: trackUUID, vote: 1 })
      this.$http.post('/tracks/like', { trackUUID }).catch(e => {
        console.log('error while liking track:', trackUUID, e)
      })
    },
  },
}
</script>

<style scoped>
.thumb-img {
  height: 32px;
}

.track-card {
  width: 80%;
  color: white;
  background-color: #0d0f19;
  border: 1px solid rgba(114, 114, 114, 0.1);
  box-sizing: border-box;
  box-shadow: 0px 2px 40px rgba(28, 28, 28, 0.5);
  border-radius: 8px;
  overflow: hidden;
}
.track-content {
  padding: 15px 20px;
}
p {
  font-size: 16px;
  margin: 0;
}
.track-cover {
  width: 100%;
  height: 30%;
}
.track-cover > img {
  width: 100%;
  height: 100%;
}
.track-channelname {
  margin-top: 5px;
  opacity: 0.3;
}
.button-block {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.vote-button {
  cursor: pointer;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dislike {
  color: #4d1414;
  font-size: 32px;
}
.like {
  color: #00c6ba;
  font-size: 32px;
}
.vote-text.big {
  font-size: 32px;
}
.button-container {
  margin: 25px 25% 0 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.divider {
  width: 2px;
  border: 1px solid #979797;
  opacity: 0.1;
}
.button {
  background: none;
  border: 1px solid #242333;
}
</style>
