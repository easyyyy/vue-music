<template>
  <div>
    <div class="playlist-header" v-show="showAbs">
      <div class="back" @click="clickBack">
        <span class="iconfont">&#xe626;</span>
      </div>
      <div class="playlist-text">歌单</div>
    </div>
    <div class="playlist-info" ref="playlistInfo">
      <div class="background">
        <img :src="album.picUrl" alt="">
      </div>
      <div class="info">
        <div class="playlist-img">
          <img :src="album.picUrl">
        </div>
        <div class="playlist-title">{{album.name}}</div>
      </div>
    </div>
    <div class="playAll-collection">
      <div class="playAll">
        <span class="iconfont">&#xe601;</span>
        <div @click="playAll">
          播放全部
        </div>
      </div>
      <div class="collection">收藏</div>
    </div>
    <SongList :playlist="songs"></SongList>
  </div>
</template>

<script>
import SongList from '../SongList/SongList'
export default {
  name: 'AlbumDetail',
  components: {
    SongList
  },
  data () {
    return {
      songs: [],
      album: {},
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  mounted () {
    this.getAlbumSongs()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    clickBack () {
      this.$router.go(-1)
    },
    handleScroll () {
      const top = document.documentElement.scrollTop
      if (top > 200) {
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    },
    getAlbumSongs () {
      this.$axios.get(this.$musicApi + '/album?id=' + this.$route.params.id).then(this.getAlbumSongsSucc)
    },
    getAlbumSongsSucc (res) {
      this.album = res.data.album
      this.songs = res.data.songs
    },
    playAll () {
      var ids = ''
      for (var i in this.songs) {
        if (i < this.songs.length - 1) {
          ids = ids + this.songs[i].id + ','
        } else {
          ids = ids + this.songs[i].id
        }
      }
      this.$axios(this.$musicApi + '/song/url?id=' + ids).then(this.playAllSucc)
    },
    playAllSucc (res) {
      var data = res.data.data
      var songList = []
      for (var i in this.songs) {
        var src = ''
        for (var d in data) {
          if (data[d].id === this.songs[i].id) {
            src = data[d].url
          }
        }
        var music = {
          src: src,
          pic: this.songs[i].al.picUrl,
          title: this.songs[i].name,
          artist: this.songs[i].ar
        }
        songList.push(music)
      }
      this.$store.dispatch('setMusicPlaylist', songList)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .playlist-header
    width: 100%
    height .8rem
    display flex
    flex-direction row
    position fixed
    top 0
    left 0
    right 0
    z-index 10
    .back
      color white
      line-height .8rem
      margin-left .25rem
      span
        font-size .4rem
    .playlist-text
      margin-left .3rem
      line-height .8rem
      font-size .35rem
      color white
  .playlist-info
    z-index 1
    height 5rem
    .background
      img
        position: absolute;
        height: 5rem;
        width: 100%;
        top: 0;
        -webkit-filter: blur(40px);
        filter: blur(40px);
    .info
      position absolute
      display flex
      flex-direction row
      z-index 5
      top: 1.2rem
      .playlist-img
        width 2rem
        margin-left .6rem
        margin-top .4rem
        img
          height 2.5rem
          width 2.5rem
      .playlist-title
        margin-top: .6rem
        margin-left .7rem
        margin-right .3rem
        font-weight bold
        font-size .35rem
        color white
  .playAll-collection
    border-top-left-radius .3rem
    border-top-right-radius .3rem
    flex-direction row
    display flex
    position relative
    width 100%
    height .8rem
    .playAll
      width 70%
      line-height .8rem
      text-align center
      font-size .3rem
      display flex
      flex-direction row
      span
        font-size .5rem
        margin-right .2rem
        margin-left   1.2rem
    .collection
      border-top-right-radius .3rem
      background-color #C20C0C
      width 30%
      text-align center
      line-height .8rem
      font-size .3rem
      color white
</style>
