<template>
    <div>
      <SongList></SongList>
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
      trackIds: []
    }
  },
  mounted () {
    this.getPlaylist()
  },
  methods: {
    getPlaylist () {
      this.$axios.get('/api/playlist/detail?id=' + this.$route.params.id).then(this.getPlaylistSucc)
    },
    getPlaylistSucc (res) {
      this.trackIds = res.data.playlist.trackIds
    }
  }
}
</script>

<style scoped>

</style>
