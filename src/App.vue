<template>
  <div id="app">
    <transition name="van-slide-down">
      <router-view v-show="!this.$store.state.PlayerMainShow"/>
    </transition>
      <keep-alive>
      <BottomPlayerV2></BottomPlayerV2>
    </keep-alive>
  </div>
</template>
<script>
import BottomPlayer from './components/BottomPlayer/BottomPlayer'
import BottomPlayerV2 from './components/BottomPlayer/BottomPlayerV2'
export default {
  name: 'App',
  components: {
    BottomPlayer,
    BottomPlayerV2
  },
  data () {
    return {

    }
  },
  methods: {
  }

}
</script>
<style lang="stylus">
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
