<template>
  <div id="app">
    <router-view/>
    <bottom-player></bottom-player>
  </div>
</template>
<script>
import BottomPlayer from './components/BottomPlayer/BottomPlayer'
export default {
  name: 'App',
  components: {
    BottomPlayer
  },
  data () {
    return {

    }
  },
  methods: {
    swiperleft: function () {
      console.log('swiperleft')
      this.$router.push({ name: 'home' })
    },
    swiperright: function () {
      console.log('swiperright')
      this.$router.push({ name: 'about' })
    }
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
