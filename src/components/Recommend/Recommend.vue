<template>
  <div class="recommend-container">
    <Banner></Banner>
    <RecommendArea></RecommendArea>
    <RecommendArea></RecommendArea>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '../Banner/Banner'
import RecommendArea from '../RecommendArea/RecommendArea'
export default {
  name: 'Recommend',
  components: {
    Banner,
    RecommendArea
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
  .test
    width 100%
    height 10rem
    background-color #333333
</style>
