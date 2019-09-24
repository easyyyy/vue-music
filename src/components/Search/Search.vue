<template>
    <div class="search">
      <div class="search-input">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </div>
      <van-divider :style="{color: '#1989fa', borderColor: '#C0C0C0', marginBottom: '.1rem', marginTop: '.1rem'}" />
      <div class="hots" v-show="hotsShow">
        <div class="hot" v-for="hot in hots" :key="hot.index" @click="clickHot(hot.first)">
          <span>{{hot.first}}</span>
        </div>
      </div>
      <div class="search-main" v-show="!hotsShow">
        <SongList :playlist="searchSong"></SongList>
      </div>
    </div>
</template>

<script>
import SongList from '../SongList/SongList'
export default {
  name: 'Search',
  components: {
    SongList
  },
  data () {
    return {
      value: '',
      hots: [],
      hotsShow: true,
      offset: 0,
      songCount: 0,
      searchSong: []
    }
  },
  computed: {
    tab () {
      return this.$store.state.Tab
    }
  },
  watch: {
    value () {
      this.offset = 0
      this.searchSong = []
    },
    tab: function () {
      if (this.tab !== '搜索') {
        window.onscroll = function () {
        }
      } else {
        var that = this
        window.onscroll = function () {
          // 变量scrollTop是滚动条滚动时，距离顶部的距离
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          // 变量windowHeight是可视区的高度
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
          // 变量scrollHeight是滚动条的总高度
          var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
          // 滚动条到底部的条件
          if (scrollTop + windowHeight === scrollHeight) {
            // 写后台加载数据的函数
            that.onSearch()
          }
        }
      }
    },
    deep: true
  },
  mounted () {
    this.getSearchHot()
    var that = this
    window.onscroll = function () {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 变量windowHeight是可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 变量scrollHeight是滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      if (scrollTop + windowHeight === scrollHeight) {
        // 写后台加载数据的函数
        that.onSearch()
      }
    }
  },
  created () {
  },
  destroyed () {
    window.onscroll = function () {
    }
  },
  methods: {
    clickHot (hot) {
      this.value = hot
      this.onSearch()
    },
    onSearch () {
      this.$axios.get('/api/search?keywords=' + this.value + '&&limit=10&&offset=' + this.offset).then(this.onSearchSucc)
      this.hotsShow = false
    },
    onCancel () {
      this.hotsShow = true
    },
    onSearchSucc (res) {
      this.offset = this.offset + 10
      for (var song in res.data.result.songs) {
        this.searchSong.push(res.data.result.songs[song])
      }
      this.songCount = res.data.result.songCount
    },
    getSearchHot () {
      this.$axios.get('/api/search/hot').then(this.getSearchHotSucc)
    },
    getSearchHotSucc (res) {
      this.hots = res.data.result.hots
    }
  }
}
</script>

<style lang="stylus" scoped>
  .search
    display flex
    flex-direction column
    .search-main >>> .songlist{
      margin-top 0
    }
    .hots
      display inline
      width 100%
      .hot
        height .5rem
        display:inline-block
        zoom:1;
        border 1px solid #DDDDDD
        border-radius .5rem
        margin-right 0.2rem
        margin-left .2rem
        margin-top .2rem
        span
          margin-left .2rem
          margin-right .2rem
          line-height .5rem
</style>
