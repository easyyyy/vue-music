<template>
    <div class="songlist">
      <div class="song" v-for="(song,index) in playlist" :key="index">
        <div class="song-num">{{index+1}}</div>
        <div class="song-div">
          <div class="song-info">
            <div class="song-title">{{song.name}}</div>
            <div class="song-artist-album" v-if="song.ar">{{artistsString(song.ar)}} - {{song.al.name}}</div>
<!--            <div class="song-artist-album" v-else-if="song.ar.length > 1">{{song.ar[0].name}}/{{song.ar[1].name}} - {{song.al.name}}</div>-->
            <div class="song-artist-album" v-else-if="song.artists">{{artistsString(song.artists)}} - {{song.album.name}}</div>
<!--            <div class="song-artist-album" v-else-if="song.artists.length > 1">{{song.artists[0].name}}/{{song.artists[1].name}} - {{song.album.name}}</div>-->
          </div>
          <div class="song-operate">
            <div class="play-icon" @click="clickSongPlay(song.id)">
              <span class="iconfont">&#xe601;</span>
            </div>
            <div class="more-button" @click="moreButton(index)">
              <span class="iconfont">&#xe67f;</span>
            </div>
            <van-action-sheet
              v-model="show"
              :actions="actions"
              @select="onSelect"
              :lazy-render="false"
              :round="true"
              style="z-index:100"
            ></van-action-sheet>
          </div>
        </div>
      </div>
      <div class="artists" v-show="artistShow">
        <div v-if="this.playlist[0]">
          <van-popup v-model="artistShow">
            <div class="artists-item" v-for="a in playlist[this.clickId].ar" :key="a.index" @click="clickArtist(a.id)">{{a.name}}</div>
          </van-popup>
        </div>
<!--        <div v-if="playlist[0].artists">-->
<!--          <van-popup v-model="artistShow">-->
<!--            <div v-for="ar in playlist[this.clickId].artists" :key="ar.index">{{ar.name}}</div>-->
<!--          </van-popup>-->
<!--        </div>-->
      </div>
      <div class="space-div"></div>
    </div>
</template>

<script>
// import { Toast } from 'vant'
export default {
  name: 'SongList',
  props: {
    playlist: Array
  },
  data () {
    return {
      artistShow: false,
      playingSongId: 0,
      show: false,
      clickId: 0,
      actions: [
        { name: '添加到下一首播放' },
        { name: '查看歌手详情' },
        { name: '选项', subname: '描述信息' }
      ]
    }
  },
  computed: {
    artistsString () {
      return function (artist) {
        if (artist.length === 1) {
          return artist[0].name
        } else if (artist.length > 1) {
          var str = ''
          for (var i in artist) {
            if (i < artist.length - 1) {
              str = str + artist[i].name + '/'
            } else {
              str = str + artist[i].name
            }
          }
          return str
        }
      }
    }
  },
  methods: {
    clickArtist (id) {
      this.$router.push({
        name: 'artist',
        params: {
          id: id
        }
      })
    },
    clickSongPlay (id) {
      this.playingSongId = id
      this.$axios(this.$musicApi + '/song/url?id=' + id).then(this.clickSongPlaySucc)
    },
    moreButton (index) {
      this.show = true
      this.onClickSongOperate(index)
    },
    changeShow () {
      this.show = false
    },
    onSelect (item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      switch (item.name) {
        case '添加到下一首播放' :
          // console.log('添加到下一首播放' + this.clickId)
          this.$axios(this.$musicApi + '/song/url?id=' + this.playlist[this.clickId].id).then(this.insertSongPlaySucc)
          // this.$store.dispatch('insertPlaylist', { item: this.playlist[this.clickId], index: 1 })
          break
        case '查看歌手详情' :
          this.artistShow = !this.artistShow
          break
      }
    },
    insertSongPlaySucc (res) {
      var url = ''
      url = res.data.data[0].url
      if (url === null) {
        this.$toast('应版权要求无法播放')
        return
      }
      var picUrl
      var title
      var artist
      var artistId
      for (var i in this.playlist) {
        if (this.playlist[i].id === res.data.data[0].id) {
          if (this.playlist[i].al) {
            picUrl = this.playlist[i].al.picUrl
            title = this.playlist[i].name
            artist = this.playlist[i].ar[0].name
            artistId = this.playlist[i].ar[0].id
          } else {
            this.getSongDetail(this.playlist[i].id)
            title = this.playlist[i].name
            artist = this.playlist[i].artists[0].name
            artistId = this.playlist[i].artists[0].id
          }
        }
      }
      var music = {
        src: url,
        pic: picUrl,
        title: title,
        artist: artist,
        artistId: artistId
      }
      this.$store.dispatch('insertPlaylist', { item: music, index: 1 })
    },
    onClickSongOperate (index) {
      this.clickId = index
    },
    clickSongPlaySucc (res) {
      var url = ''
      url = res.data.data[0].url
      if (url === null) {
        this.$toast('应版权要求无法播放')
        return
      }
      var picUrl
      var title
      var artist
      for (var i in this.playlist) {
        if (this.playlist[i].id === this.playingSongId) {
          if (this.playlist[i].al) {
            picUrl = this.playlist[i].al.picUrl
            title = this.playlist[i].name
            artist = this.playlist[i].ar
          } else {
            this.getSongDetail(this.playlist[i].id)
            title = this.playlist[i].name
            artist = this.playlist[i].artists[0].name
          }
        }
      }
      var music = {
        src: url,
        pic: picUrl,
        title: title,
        artist: artist
      }
      this.$store.dispatch('setMusicInfoAndPlaylist', music)
    },
    async getSongDetail (id) {
      await this.$axios.get(this.$musicApi + '/song/detail?ids=' + id).then(this.getSongDetailSucc)
    },
    getSongDetailSucc (res) {
      this.$store.dispatch('setMusicInfoPicUrl', res.data.songs[0].al.picUrl)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../assets/styles/mixins.styl"
  .songlist
    height auto
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
          ellipse()
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
  .artists
    div
      width 3rem
      .artists-item
        line-height .6rem
        text-align center
  .space-div
    width 100%
    height 1rem
</style>
