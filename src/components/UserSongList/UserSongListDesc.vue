<template>
    <div>
      <div class="album" @click="clickSonglist(playlist.id)">
        <div class="album-pic">
          <img :src='playlist.coverImgUrl' alt="">
        </div>
        <div class="album-desc">
          <div class="album-title">{{playlist.name}}</div>
          <div class="album-time-num">{{playlist.trackCount}}首</div>
          <!--          <van-divider :style="{ height: '.05rem' }">-->
          <!--          </van-divider>-->
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'UserSongListDesc',
  props: {
    playlist: Object
  },
  methods: {
    clickSonglist (id) {
      this.$router.push({
        name: 'playlist',
        params: {
          id: id
        }
      })
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
    margin-top .1rem
    margin-bottom .1rem
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
