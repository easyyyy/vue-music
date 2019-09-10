<template>
    <div>
      <div class="area-title">
        <div class="title-detail">
          热门歌单 >
        </div>
      </div>
      <div class="song-list">
        <div class="song-list-single" v-for="s in songList" :key="s.index" @click="clickPlayList(s.id)">
          <img :src="s.coverImgUrl" alt="">
          <div>{{s.name}}</div>
        </div>
      </div>
      <SongList></SongList>
    </div>
</template>

<script>
import SongList from '../SongList/SongList'
export default {
  name: 'RecommendArea',
  mounted () {
    this.getHighQualitySongLists()
  },
  components: {
    SongList
  },
  data () {
    return {
      songList: []
    }
  },
  methods: {
    getHighQualitySongLists () {
      this.$axios.get('/api/top/playlist?limit=6').then(this.getHighQualitySongListsSucc)
    },
    getHighQualitySongListsSucc (res) {
      this.songList = res.data.playlists
    },
    clickPlayList (id) {
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
  .area-title
    height .8rem
    width 100%
    line-height .8rem
    font-size .3rem
    font-weight bolder
    .title-detail
      margin-left .2rem
      letter-spacing 1px
  .song-list-single
    width 31.6%
    height 40%
    display inline-block
    margin-left .1rem
    margin-bottom  .25rem
    img
      width: 100%;
      height: auto;
    div
      color: #333;
      font-size: .2rem;
      line-height: .35rem;
      display: -webkit-box;
      -webkit-line-clamp:2;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      margin-top .15rem
</style>
