<template>
  <div id="app">
    <transition name="van-slide-down">
      <router-view v-if="isRouterAlive"/>
    </transition>
      <keep-alive>
      <BottomPlayerV2></BottomPlayerV2>
    </keep-alive>
  </div>
</template>
<script>
import BottomPlayerV2 from './components/BottomPlayer/BottomPlayerV2'
export default {
  name: 'App',
  components: {
    BottomPlayerV2
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
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
