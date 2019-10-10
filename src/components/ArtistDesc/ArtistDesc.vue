<template>
    <div>
      <div class="desc">
        <div class="desc-title">
          <span class="iconfont title-icon">&#xe603;</span>
          简介
        </div>
        <div class="desc-detail">{{briefDesc}}</div>
      </div>
      <div class="desc" v-for="item in introduction" :key="item.index">
        <div class="desc-title">
          <span class="iconfont title-icon">&#xe603;</span>
          {{item.ti}}
        </div>
        <div class="desc-detail">{{item.txt}}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ArtistDesc',
  props: {
    artistId: Number
  },
  data () {
    return {
      briefDesc: '',
      introduction: []
    }
  },
  mounted () {
    this.getArtistDescById()
  },
  methods: {
    getArtistDescById () {
      this.$axios.get(this.$musicApi + '/artist/desc?id=' + this.artistId).then(this.getArtistDescByIdSucc)
    },
    getArtistDescByIdSucc (res) {
      this.briefDesc = res.data.briefDesc
      this.introduction = res.data.introduction
    }
  }
}
</script>

<style lang="stylus" scoped>
  .desc
    .desc-title
      font-size .3rem
      margin-top .3rem
      font-weight 600
      .title-icon
        color #C20C0C
        margin-left .1rem
    .desc-detail
      margin .3rem .2rem .3rem .2rem
      font-size .2rem
      line-height .4rem
      color #4B4B4B
</style>
