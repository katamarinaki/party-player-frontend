<template>
  <div class="overlay-back">
    <div class="modal">
      <div class="names">
        <span class="name-video">Video name</span>
        <br />
        <span class="name-channel">Channel name</span>
      </div>
      <div class="content">
        <div class="score-button dislike-button">👎 14</div>
        <div class="divider"></div>
        <div class="score-button like-button">👍 23</div>
      </div>
      <button class="hide-button">Hide</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
<style scoped>
.overlay-back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000;
  mix-blend-mode: normal;
  opacity: 0.6;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.modal {
  width: 70%;
  height: 30%;
  background: #ffffff;
  padding: 10px;
  position: relative;
}

.names {
  top: 20px;
  left: 20px;
  line-height: 13px;
}

.name-video {
  font-size: 16px;
  color: #000000;
}
.name-channel {
  color: #000000;
  font-size: 13px;
  mix-blend-mode: normal;
  opacity: 0.3;
}

.hide-button {
  background: #61a1ec;
  position: absolute;
  border-radius: 4px;
  bottom: 10%;
  left: 45%;
}

.content {
  position: absolute;
  top: 35%;
  height: 35%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  margin: auto 0;
}

.score-button {
  flex-grow: 2;
  font-size: 210%;
}

.like-button {
  color: #23a87f;
}

.dislike-button {
  color: #af3662;
}

.divider {
  width: 2px;
  border: 1px solid #979797;
}
</style>
