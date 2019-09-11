<template>
    <div>
      <SongList :playlist="playlist"></SongList>
    </div>
</template>

<script>
import SongList from '../components/SongList/SongList'
export default {
  name: 'SongListDetail',
  components: {
    SongList
  },
  data () {
    return {
      trackIds: [],
      playlist: []
    }
  },
  mounted () {
    this.getPlaylistSongId()
  },
  methods: {
    getPlaylistSongId () {
      this.$axios.get('/api/playlist/detail?id=' + this.$route.params.id).then(this.getPlaylistSongIdSucc)
    },
    getPlaylistSongIdSucc (res) {
      this.trackIds = res.data.playlist.trackIds
      var url = '/api/song/detail?ids='
      for (var i in this.trackIds) {
        if (this.trackIds.length - 1 > i) {
          url = url + this.trackIds[i].id + ','
        } else {
          url = url + this.trackIds[i].id
        }
      }
      this.$axios.get(url).then(this.getPlaylistSucc)
    },
    getPlaylistSucc (res) {
      var songs = res.data.songs
      this.playlist = songs
    }
  }
}
</script>

<style scoped>

</style>
