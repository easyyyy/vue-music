<template>
    <div>
<!--      artist {{this.$route.params.id}}-->
      <div class="artist-info-header">
        <div class="artist-nav-bar" :style="NavBarStyle">
          <div class="back" @click="clickBack">
            <span class="iconfont">&#xe626;</span>
          </div>
          <div class="NavBarArtistName" v-show="NavBarNameShow">{{artist.name}}</div>
        </div>
        <van-image
          width="100%"
          height="6rem"
          fit="contain"
          style="position: absolute; z-index: 0"
          :src="artist.picUrl"
        />
        <div class="artist-name">
          {{artist.name}}
        </div>
      </div>
      <el-tabs v-model="active">
        <el-tab-pane label="热门演唱" name="first">
          <SongList :playlist="hotSongs"></SongList>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="second">
          <AlbumList :artistId="artistId"></AlbumList>
        </el-tab-pane>
        <el-tab-pane label="艺人信息" name="third">
          <ArtistDesc :artistId="artistId"></ArtistDesc>
        </el-tab-pane>
      </el-tabs>
<!--      <van-tabs v-model="active" animated swipeable>-->
<!--        <van-tab title="热门演唱">-->
<!--          <div class="artist-hot">-->
<!--            <SongList :playlist="hotSongs"></SongList>-->
<!--          </div>-->
<!--        </van-tab>-->
<!--        <van-tab title="专辑"></van-tab>-->
<!--        <van-tab title="艺人信息"></van-tab>-->
<!--      </van-tabs>-->
    </div>
</template>

<script>
import SongList from '../components/SongList/SongList'
import ArtistDesc from '../components/ArtistDesc/ArtistDesc'
import AlbumList from '../components/AlbumList/AlbumList'
export default {
  name: 'Artist',
  components: {
    SongList,
    ArtistDesc,
    AlbumList
  },
  data () {
    return {
      artistId: parseInt(this.$route.params.id),
      NavBarNameShow: false,
      NavBarStyle: {
        opacity: 0
      },
      hotSongs: [],
      active: 'first',
      artist: {}
    }
  },
  watch: {
  },
  mounted () {
    this.getPlaylistByArtistId()
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getPlaylistByArtistId () {
      this.$axios.get(this.$musicApi + '/artists?id=' + this.$route.params.id).then(this.getPlaylistByArtistIdSucc)
    },
    getPlaylistByArtistIdSucc (res) {
      this.hotSongs = res.data.hotSongs
      this.artist = res.data.artist
    },
    handleScroll () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 250) {
        this.NavBarNameShow = true
        this.NavBarStyle = {
          'background': '#4B4B4B',
          'opacity': scrollTop / 250
        }
      } else {
        this.NavBarNameShow = false
        this.NavBarStyle = {
          // 4b4b4b = 4934475
          'opacity': scrollTop / 250
        }
      }
    },
    clickBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus">
  .artist-info-header
    height 6rem
    .artist-nav-bar
      position fixed
      height .9rem
      width 100%
      z-index 10
      display flex
      flex-direction row
      .NavBarArtistName
        line-height .9rem
        margin-left .25rem
        color white
        font-size .4rem
        font-weight 500
      .back
        line-height .9rem
        margin-left .25rem
        span
          color white
          font-size .4rem
    .artist-name
      position absolute
      font-size .45rem
      font-weight inherit
      color white
      margin-left .3rem
      margin-top 4rem
  .el-tabs__header.is-top
    margin 0
    .el-tabs__nav
      width 100%
      .el-tabs__active-bar.is-top
        width 1.7rem !important
        background-color #C20C0C!important
      .el-tabs__item,is-top
        width 33.3%
        color #C20C0C
        font-weight bold
        text-align center
      #tab-first
        padding-left 20px
      #tab-third
        padding-right 20px
</style>
