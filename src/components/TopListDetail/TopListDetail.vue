<template>
    <div>
      <div class="toplist-item" @click="onClick(item.id)">
        <div class="cover-img">
          <img :src="item.coverImgUrl" alt=""/>
        </div>
        <div class="top-list-name">
            <span>{{item.name}}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'TopListDetail',
  props: {
    item: Object
  },
  methods: {
    onClick (id) {
      this.$router.push({
        name: 'playlist',
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .toplist-item
    display flex
    flex-direction row
    margin-left .2rem
    margin-bottom .15rem
    margin-top .1rem
    .cover-img
      width 2rem
      height 2rem
      img
        width: 100%;
        height: auto;
    .top-list-name
      width 4rem
      span
        margin-left .3rem
        margin-top .3rem
        font-size .3rem
</style>
