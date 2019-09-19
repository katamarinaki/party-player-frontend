<template>
  <div class="track-card">
    <div class="track-cover">
      <img :src="track.thumbnailSrc" />
    </div>
    <div class="track-content">
      <p class="track-title">{{ track.title }}</p>
      <p class="track-channelname">{{ track.channelTitle }}</p>
      <div class="button-block">
        <input type="button" value="Dislike" />
        <input type="button" value="Like" />
      </div>
      <input class="skip-button" type="button" value="Skip" />
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
}
</script>

<style scoped>
.track-card {
  background-color: yellowgreen;
  width: 300px;
  height: 500px;
}
.track-content {
  padding: 10px 20px;
  height: 70%;
}
p {
  font-size: 16px;
  margin: 0;
}
.track-cover {
  display: inline-block;
  height: 30%;
}
.track-cover > img {
  width: 100%;
  height: 100%;
}
.button-block {
  margin-top: 50px;
}
.skip-button {
  margin-top: 50px;
}
</style>
