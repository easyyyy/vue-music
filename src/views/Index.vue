<template>
    <div>
      <Header :route-path="this.$route.path" @choiceTab="choiceTab"></Header>
<!--      <Recommend v-show="tabState.recommend"></Recommend>-->
<!--      <RankingList v-show="tabState.ranking"></RankingList>-->
      <van-tabs v-model="active" animated>
        <van-tab title="推荐"><Recommend></Recommend></van-tab>
        <van-tab title="排行榜"><RankingList></RankingList></van-tab>
        <van-tab title="搜索">内容 3</van-tab>
      </van-tabs>
    </div>
</template>

<script>
import Header from '../components/Header/Header'
import Recommend from '../components/Recommend/Recommend'
import RankingList from '../components/RankingList/RankingList'
export default {
  name: 'Index',
  components: {
    Header,
    Recommend,
    RankingList
  },
  data () {
    return {
      tabState: {
        recommend: true,
        ranking: false,
        search: false
      },
      active: 0
    }
  },
  methods: {
    choiceTab (event) {
      this.tabState = event
    }
  }
}
</script>

<style scoped>

</style>
