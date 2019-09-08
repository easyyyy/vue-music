<template>
  <div class="home">
    <bottom-player></bottom-player>
    <div class="test"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import BottomPlayer from '../components/BottomPlayer/BottomPlayer'
export default {
  name: 'home',
  components: {
    BottomPlayer
  }
}
</script>
<style lang="stylus" scoped>
  .test
    width 1rem
    height 1rem
    background-color black
</style>
