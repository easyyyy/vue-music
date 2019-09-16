<template>
    <div class="songlist">
      <div class="song" v-for="(song,index) in playlist" :key="index">
        <div class="song-num">{{index+1}}</div>
        <div class="song-div">
          <div class="song-info">
            <div class="song-title">{{song.name}}</div>
            <div class="song-artist-album">{{song.ar[0].name}} - {{song.al.name}}</div>
          </div>
          <div class="song-operate">
            <div class="play-icon" @click="clickSongPlay(song.id)">
              <span class="iconfont">&#xe601;</span>
            </div>
            <div class="more-button" @click="moreButton">
              <span class="iconfont">&#xe67f;</span>
            </div>
            <van-action-sheet
              v-model="show"
              :actions="actions"
              @select="onSelect"
            ></van-action-sheet>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SongList',
  props: {
    playlist: Array
  },
  data () {
    return {
      playingSongId: 0,
      show: false,
      actions: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '描述信息' }
      ]
    }
  },
  methods: {
    clickSongPlay (id) {
      this.playingSongId = id
      this.$axios('/api/song/url?id=' + id).then(this.clickSongPlaySucc)
    },
    moreButton () {
      this.show = true
    },
    onSelect (item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      Toast(item.name)
    },
    clickSongPlaySucc (res) {
      var url = ''
      url = res.data.data[0].url
      var picUrl
      var title
      var artist
      for (var i in this.playlist) {
        if (this.playlist[i].id === this.playingSongId) {
          picUrl = this.playlist[i].al.picUrl
          title = this.playlist[i].name
          artist = this.playlist[i].ar[0].name
        }
      }
      var music = {
        src: url,
        pic: picUrl,
        title: title,
        artist: artist
      }
      this.$store.dispatch('setMusicInfoAndPlaylist', music)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../assets/styles/mixins.styl"
  .songlist
    margin-top 5.5rem
  .song
    display flex
    flex-direction row
    height .9rem
    margin-top .1rem
    margin-bottom .1rem
    .song-num
      height .8rem
      width .7rem
      text-align center
      line-height .8rem
      color #808080
    .song-div
      display flex
      flex-direction row
      border-bottom #DDDDDD solid 1px
      .song-info
        width 4.5rem
        margin-left .2rem
        .song-title
          line-height .4rem
        .song-artist-album
          line-height:.4rem
          font-size .25rem
          color #808080
          ellipse()
      .song-operate
        display flex
        flex-direction row
        .play-icon
          text-align center
          line-height .8rem
          span
            font-size .6rem
            color #808080
        .more-button
          text-align center
          line-height .8rem
          margin-left: .8rem
          span
            font-size .45rem
            color #808080
</style>
