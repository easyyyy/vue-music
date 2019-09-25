<template>
  <div class="ranking-list">
    <div v-for="item in toplist" :key="item.index">
      <TopListDetail :item="item"></TopListDetail>
    </div>
  </div>
</template>

<script>
import TopListDetail from '../TopListDetail/TopListDetail'
export default {
  name: 'Index',
  components: {
    TopListDetail
  },
  data () {
    return {
      toplist: []
    }
  },
  mounted () {
    this.getTopListDetail()
  },
  methods: {
    getTopListDetail () {
      this.$axios.get(this.$musicApi + '/toplist/detail').then(this.getTopListDetailSucc)
    },
    getTopListDetailSucc (res) {
      this.toplist = res.data.list
    }
  }
}
</script>

<style lang="stylus" scoped>
  .test
    width 100%
    height 10rem
    background-color #25a4bb
</style>
