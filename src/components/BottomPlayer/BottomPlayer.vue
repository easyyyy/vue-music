<template>
    <div class="bottom-player">
      <div class="border-player"></div>
      <div class="music-pic">
        <img :src="musicInfo.pic">
      </div>
      <div class="music-info">
        <span class="music-title">{{musicInfo.title}}</span>
        <div class="music-artist">
          <span>{{musicInfo.artist}}</span>
        </div>
      </div>
      <audio ref="bottomAudio" :src="musicInfo.src"></audio>
      <div class="playSymbol" @click="startPlayOrPause">
        <span class="iconfont" v-if="audio.musicPlaying">&#xe619;</span>
        <span class="iconfont" v-else>&#xe617;</span>
      </div>
      <div class="song-list">
        <span class="iconfont">&#xe61b;</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'BottomPlayer',
  components: {
  },
  data () {
    return {
      audio: {
        musicPlaying: false,
        defaultMusicVolume: 0.1,
        customMusicVolume: 0
      }
    }
  },
  computed: {
    musicInfo: function () {
      return this.$store.state.musicInfo
    }
  },
  watch: {
    musicInfo: function () {
      this.$nextTick(() => {
        this.audio.musicPlaying = false
        this.startPlayOrPause()
      })
    },
    deep: true
  },
  methods: {
    startPlayOrPause () {
      if (this.audio.customMusicVolume === 0) {
        this.$refs.bottomAudio.volume = this.audio.defaultMusicVolume
      } else {
        this.$refs.bottomAudio.volume = this.audio.customMusicVolume
      }
      return this.audio.musicPlaying ? this.pause() : this.play()
    },
    // 播放音频
    play () {
      if (this.audio.customMusicVolume === 0) {
        this.$refs.bottomAudio.volume = this.audio.defaultMusicVolume
      } else {
        this.$refs.bottomAudio.volume = this.audio.customMusicVolume
      }
      this.$refs.bottomAudio.play()
      this.audio.musicPlaying = true
    },
    // 暂停音频
    pause () {
      this.$refs.bottomAudio.pause()
      this.audio.musicPlaying = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../assets/styles/mixins.styl"
  .bottom-player
    position: fixed;
    display: flex;
    flex-direction row
    left: 0
    bottom: 0
    width: 100%;
    z-index: 9999;
    background-color white
    .music-pic
      width 1.2rem
      height 1.2rem
      img
        width: 100%;
        height: auto;
    .music-info
      height 1.2rem
      width 3.5rem
      display flex
      flex-direction column
      .music-title
        line-height .5rem
        margin-left .2rem
        /*margin-top .2rem*/
        ellipse()
      .music-artist
        height .7rem
        font-size .01rem
        margin-left .2rem
        margin-top .2rem
    .playSymbol
      height 1.2rem
      width 1.2rem
      display: flex;
      justify-content: center;
      align-items: center;
      span
        font-size .4rem
    .song-list
      height 1.2rem
      width 1.2rem
      display: flex;
      justify-content: center;
      align-items: center;
      span
        font-size .6rem
</style>
