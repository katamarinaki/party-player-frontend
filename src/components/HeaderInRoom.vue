<template>
  <div class="header">
    <div v-if="backActionNeeded" class="action-left" @click="$router.back(-1)">
      <p>&lt;</p>
    </div>
    <p class="title">
      <span class="name">{{ currentRoom.name }}</span>
      <span class="code">{{ currentRoom.code }}</span>
    </p>
    <p class="users">👥 {{ currentRoom.users }}</p>
    <div class="action-right">
      <p>#</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HeaderInRoom',
  computed: {
    ...mapGetters(['currentRoom']),
  },
  props: {
    backActionNeeded: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.header {
  padding-top: 10px;
  width: 100%;
  position: relative;
  height: 80px;
  border-bottom: 2px solid black;
}
.title {
  margin: 0;
  font-size: 18px;
  text-align: center;
}
.code {
  color: lightgray;
  margin-left: 5px;
}
.users {
  color: purple;
  margin: 10px 0;
  text-align: center;
}
.action-left {
  padding-left: 10px;
  cursor: pointer;
  height: 100%;
  width: 80px;
  font-size: 48px;
  position: absolute;
  left: 0;
  top: 0;
}
.action-right {
  text-align: center;
  cursor: pointer;
  height: 100%;
  width: 80px;
  font-size: 36px;
  position: absolute;
  right: 0;
  top: 0;
}
.action-left > p,
.action-right > p {
  margin: 12px 0;
}
</style>
