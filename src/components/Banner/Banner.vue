<template>
    <div class="wrapper">
      <swiper :options="swiperOption" v-if="bannersData.length > 1">
        <swiper-slide v-for="banner in bannersData" :key="banner.pic">
          <img :src="banner.pic" class="swiper-img">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      bannersData: {},
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 5000
        },
        loop: true
      }
    }
  },
  mounted () {
    this.getBannerByApi()
  },
  methods: {
    getBannerByApi () {
      this.$axios.get('/api/banner?type=1').then(this.getBannerSucc)
    },
    getBannerSucc (res) {
      this.bannersData = res.data.banners
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    overflow hidden
    width 100%
    height 0
    padding-bottom 38.66%
    .swiper-img
      width 100%
</style>
