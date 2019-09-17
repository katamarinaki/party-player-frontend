<template>
  <div class="track-container">
    <div class="track-image">
      <img :src="track.thumbnailSrc" alt="track" />
    </div>
    <div class="track-text">
      <p class="track-name">{{ track.title }}</p>
      <p class="track-channel">{{ track.channelTitle }}</p>
      <p class="track-metrics">
        <span class="dislikes">👎 100</span>
        <span class="likes">👍 200</span>
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
        }
      },
    },
  },
}
</script>

<style scoped>
.track-container {
  margin: 10px 0;
  overflow: hidden;
  border-radius: 5px;
  background-color: lightgray;
  width: 100%;
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
  padding: 5px;
  vertical-align: top;
  display: inline-block;
  width: 65%;
  height: 100%;
}
p {
  margin: 0;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.5em;
  white-space: nowrap;
}
p.track-channel {
  margin-top: 5px;
  color: gray;
}
.add-button {
  display: inline-block;
  height: 100%;
  width: 10%;
  font-size: 36px;
}
.likes {
  margin-left: 10px;
  color: green;
}
.dislikes {
  color: red;
}
</style>
