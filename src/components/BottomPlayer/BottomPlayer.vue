<template>
    <div class="bottom-player">
<!--      <aplayer class="bottom-aplayer"-->
<!--               :music="musicInfo"-->
<!--      />-->
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
// import Aplayer from 'vue-aplayer'
export default {
  name: 'BottomPlayer',
  components: {
    // Aplayer
  },
  data () {
    return {
      musicInfo: {
        title: 'secret base~君がくれたもの~',
        artist: 'Silent Siren',
        src: 'https://m701.music.126.net/20190908134951/dcbd8107b7d7deca91613e210be0a2f3/jdyyaac/0e5c/0308/5352/964cbb346f4b2f75765ad8cddfef5ef7.m4a',
        pic: 'http://p1.music.126.net/VUVZae4Iz0R8ogx73utGcA==/109951164007486241.jpg?param=130y130'
      },
      audio: {
        musicPlaying: false,
        defaultMusicVolume: 0.1,
        customMusicVolume: 0
      }
    }
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
    display: flex;
    flex-direction row
    position absolute
    left: 0
    bottom: 0
    width: 100%;
    z-index: 9999;
    .music-pic
      width 1.2rem
      height 1.2rem
      img
        width: 100%;
        height: auto;
    .music-info
      height 1.2rem
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
