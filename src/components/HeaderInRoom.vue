<template>
  <div class="header">
    <div
      v-if="backActionNeeded"
      class="action-left"
      @click="$router.back(-1)"
    ></div>
    <p class="title">
      <span class="name">{{ currentRoom.name }}</span>
      <!-- <span class="code">{{ currentRoom.code }}</span> -->
    </p>
    <p class="users">👥 {{ currentRoom.users }}</p>
    <div class="action-right" @click="copyToClipBoot">
      <p><img :src="shareIcon" /></p>
    </div>
    <input type="text" style="display:none;" ref="hiddenInput" :value="link" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import shareIcon from '@/assets/shareIcon.svg'
export default {
  name: 'HeaderInRoom',
  data() {
    return {
      shareIcon,
    }
  },
  computed: {
    ...mapGetters(['currentRoom']),
    link() {
      console.log(window.location.href)
      return window.location.href
    },
  },
  methods: {
    copyToClipBoot() {
      if (!navigator.clipboard) {
        const copyText = this.$refs.hiddenInput
        copyText.focus()
        copyText.select()
        copyText.setSelectionRange(0, 99999) /*For mobile devices*/
        console.log(document.execCommand('copy'))

        return
      }
      navigator.clipboard.writeText(this.link).then(
        function() {
          console.log('Async: Copying to clipboard was successful!')
        },
        function(err) {
          console.error('Async: Could not copy text: ', err)
        }
      )
    },
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
  opacity: 0.6;
  margin-left: 5px;
}

.users {
  margin: 10px 0;
  text-align: center;
}
.action-left {
  border-top: 4px solid white;
  border-left: 4px solid white;
  padding-left: 10px;
  cursor: pointer;
  height: 14px;
  width: 14px;
  transform: rotate(-45deg);
  font-size: 48px;
  position: absolute;
  left: 25px;
  top: 30px;
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
