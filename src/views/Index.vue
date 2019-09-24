<template>
    <div>
      <Header :route-path="this.$route.path"></Header>
<!--      <Recommend v-show="tabState.recommend"></Recommend>-->
<!--      <RankingList v-show="tabState.ranking"></RankingList>-->
      <van-tabs v-model="active" animated swipeable @change="onClick">
        <van-tab title="推荐"><Recommend></Recommend></van-tab>
        <van-tab title="排行榜"><RankingList></RankingList></van-tab>
        <van-tab title="搜索"><Search></Search></van-tab>
      </van-tabs>
    </div>
</template>

<script>
import Header from '../components/Header/Header'
import Recommend from '../components/Recommend/Recommend'
import RankingList from '../components/RankingList/RankingList'
import Search from '../components/Search/Search'
export default {
  name: 'Index',
  components: {
    Header,
    Recommend,
    RankingList,
    Search
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    onClick (name, title) {
      // if (title !== '搜索') {
      //   window.onscroll = function () {
      //   }
      //   console.log(window.onscroll)
      // }
      this.$store.dispatch('setTab', title)
    }
  }
}
</script>

<style scoped>

</style>
