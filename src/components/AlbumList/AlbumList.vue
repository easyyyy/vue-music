<template>
    <div>
      <div class="album" v-for="album in hotAlbums" :key="album.index" @click="handleAlbumClick(album.id)">
        <div class="album-pic">
          <img :src="album.picUrl" alt="">
        </div>
        <div class="album-desc">
          <div class="album-title">{{album.name}}</div>
          <div class="album-time-num">2019.9.16 歌曲{{album.size}}</div>
<!--          <van-divider :style="{ height: '.05rem' }">-->
<!--          </van-divider>-->
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AlbumList',
  props: {
    artistId: Number
  },
  data () {
    return {
      hotAlbums: []
    }
  },
  mounted () {
    this.getArtistAlbumListById()
  },
  methods: {
    handleAlbumClick (id) {
      this.$router.push({
        name: 'AlbumDetail',
        params: {
          id: id
        }
      })
    },
    getArtistAlbumListById () {
      this.$axios.get(this.$musicApi + '/artist/album?id=' + this.artistId).then(this.getArtistAlbumListByIdSucc)
    },
    getArtistAlbumListByIdSucc (res) {
      this.hotAlbums = res.data.hotAlbums
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../assets/styles/mixins.styl"
  .album
    width 100%
    height 1.2rem
    display flex
    flex-direction row
    .album-pic
      height 1.2rem
      margin-left .12rem
      margin-top .05rem
      margin-bottom .05rem
      img
        height 1.2rem
        border-radius .05rem
    .album-desc
      display flex
      flex-direction column
      width 80%
      .album-title
        line-height .7rem
        font-size .3rem
        font-weight 600
        margin-left .2rem
        ellipse()
      .album-time-num
        line-height .45rem
        margin-left .2rem
        font-size .2rem
        color #4B4B4B
</style>
