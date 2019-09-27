<template>
  <div class="track-container">
    <div class="track-image">
      <img :src="track.thumbnailSrc" alt="track" />
    </div>
    <div class="track-text">
      <p class="track-name">{{ track.title }}</p>
      <p class="track-channel">{{ track.channelTitle }}</p>
      <p class="track-metrics">
        <span class="dislikes">
          <span class="icon">👎</span>
          {{ track.dislikes }}
        </span>
        <span class="likes">
          <span class="icon">👍</span>
          {{ track.likes }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    track: {
      type: Object,
      default: () => {
        return {
          id: '123',
          title: 'Я крутой чел',
          channelTitle: 'Алексей Пивоваров',
          thumbnailSrc:
            'https://sun9-43.userapi.com/c854028/v854028637/dd6f6/Xr4q52zuGCs.jpg',
          likes: 0,
          dislikes: 0,
        }
      },
    },
  },
}
</script>

<style scoped>
.track-container {
  overflow: hidden;
  border-radius: 5px;
  background-color: #0c0e13;
  width: 100%;
  max-width: 350px;
  height: 80px;
}
.track-image {
  vertical-align: top;
  display: inline-block;
  width: 35%;
  height: 100%;
}
.track-image > img {
  width: 100%;
  height: 100%;
}
.track-text {
  padding: 10px;
  vertical-align: top;
  display: inline-block;
  width: 65%;
  height: 100%;
}
p {
  color: #ffffff;
  margin: 0;
  font-size: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.5em;
  white-space: nowrap;
}
p.track-channel {
  margin-top: 5px;
  opacity: 0.6;
}
.add-button {
  display: inline-block;
  height: 100%;
  width: 10%;
  font-size: 36px;
}
.likes {
  margin-left: 25px;
  opacity: 0.5;
}
.dislikes {
  opacity: 0.5;
}
.likes > .icon {
  color: #00c6ba;
  opacity: 1;
}
.dislikes > .icon {
  color: #4d1414;
  opacity: 1;
}
</style>
