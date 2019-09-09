<template>
    <div>
      <Header :route-path="this.$route.path" @choiceTab="choiceTab"></Header>
      <Recommend v-show="tabState.recommend"></Recommend>
      <RankingList v-show="tabState.ranking"></RankingList>
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
      }
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
