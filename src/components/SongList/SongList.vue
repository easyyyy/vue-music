<template>
    <div>
      <div class="song">
        <div class="song-num">1</div>
        <div class="song-info">
          <div class="song-title">All of Me</div>
          <div class="song-artist-album">John Legend - Love In The Future</div>
        </div>
        <div class="song-operate">
          <div class="play-icon">
            <span class="iconfont">&#xe601;</span>
          </div>
          <div class="more-button">
            <span class="iconfont">&#xe67f;</span>
          </div>
        </div>
      </div>
      <div class="song">
        <div class="song-num">1</div>
        <div class="song-info">
          <div class="song-title">All of Me</div>
          <div class="song-artist-album">John Legend - Love In The Future</div>
        </div>
        <div class="play-icon"></div>
        <div class="more-button"></div>
      </div>
      <div class="song">
        <div class="song-num">1</div>
        <div class="song-info">
          <div class="song-title">All of Me</div>
          <div class="song-artist-album">John Legend - Love In The Future</div>
        </div>
        <div class="play-icon"></div>
        <div class="more-button"></div>
      </div>
      <div class="song">
        <div class="song-num">1</div>
        <div class="song-info">
          <div class="song-title">All of Me</div>
          <div class="song-artist-album">John Legend - Love In The Future</div>
        </div>
        <div class="play-icon"></div>
        <div class="more-button"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SongList'
}
</script>

<style lang="stylus" scoped>
  .song
    display flex
    flex-direction row
    height .9rem
    margin-top .1rem
    margin-bottom .1rem
    .song-num
      height .8rem
      width .7rem
      text-align center
      line-height .8rem
      color #808080
    .song-info
      margin-left .2rem
      border-bottom #DDDDDD solid 1px
      .song-title
        line-height .4rem
      .song-artist-album
        line-height:.4rem
        font-size .08rem
        color #808080
    .song-operate
      display flex
      flex-direction row
      border-bottom #DDDDDD solid 1px
      .play-icon
        text-align center
        line-height .8rem
        margin-left .9rem
        span
          font-size .6rem
          color #808080
      .more-button
        text-align center
        line-height .8rem
        margin-left .7rem
        span
          font-size .45rem
          color #808080
</style>
