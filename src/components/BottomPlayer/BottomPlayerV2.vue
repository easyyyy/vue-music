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
    <div class="song-list" @click="clickPlaylistTest">
      <span class="iconfont">&#xe61b;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomPlayerV2',
  components: {
  },
  data () {
    return {
      timeNow: '',
      timeDuration: '',
      tag: 0,
      playingSong: {},
      playlist: [],
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
    },
    // eslint-disable-next-line vue/no-dupe-keys
    playlistX: function () {
      return this.$store.state.playlist
    }
  },
  watch: {
    timeNow: function () {
      console.log(this.timeNow)
    },
    timeDuration: function () {
      console.log(this.timeDuration)
    },
    musicInfo: function () {
      this.$nextTick(() => {
        this.audio.musicPlaying = false
        this.startPlayOrPause()
      })
    },
    playlistX: function () {
      this.tag = 0
    },
    deep: true
  },
  mounted () {
    this.addEventListeners()
  },
  beforeDestroyed () {
    this.removeEventListeners()
  },
  methods: {
    // 加入监听事件 监听音乐播放时间，音乐时长
    addEventListeners: function () {
      const self = this
      self.$refs.bottomAudio.addEventListener('timeupdate', self._currentTime)
      self.$refs.bottomAudio.addEventListener('canplay', self._durationTime)
    },
    removeEventListeners: function () {
      const self = this
      self.$refs.bottomAudio.removeEventListener('timeupdate', self._currentTime)
      self.$refs.bottomAudio.removeEventListener('canplay', self._durationTime)
    },
    // 获取当前音乐播放时间，音乐时长
    _currentTime: function () {
      const self = this
      self.timeNow = parseInt(self.$refs.bottomAudio.currentTime)
    },
    _durationTime: function () {
      const self = this
      self.timeDuration = parseInt(self.$refs.bottomAudio.duration)
    },
    checkEnd () {
      this.$refs.bottomAudio.addEventListener('ended', this.musicPlayingEnd, false)
    },
    musicPlayingEnd () {
      this.audio.musicPlaying = false
      this.tag = this.tag + 1
      var nextSong = this.playlistX[this.tag]
      this.$store.dispatch('setMusicInfo', nextSong)
      this.startPlayOrPause()
    },
    startPlayOrPause () {
      if (this.audio.customMusicVolume === 0) {
        this.$refs.bottomAudio.volume = this.audio.defaultMusicVolume
      } else {
        this.$refs.bottomAudio.volume = this.audio.customMusicVolume
      }
      this.checkEnd()
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
    },

    clickPlaylistTest () {
      // this.$refs.bottomAudio.src = 'http://m7.music.126.net/20190911205538/35b656fb70c06c4ace94de2844f4d376/ymusic/005c/0652/065c/76b9806e9b18362b7fe91691a4986d4c.mp3'
      // this.$refs.bottomAudio.play()
      // 测试指定时间播放
      var audio = this.$refs.bottomAudio
      audio.currentTime = 100
      audio.play()
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
