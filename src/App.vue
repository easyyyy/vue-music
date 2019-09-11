<template>
  <div id="app">
    <router-view/>
    <keep-alive>
      <bottom-player></bottom-player>
    </keep-alive>
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
