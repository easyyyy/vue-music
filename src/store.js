import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicInfo: {},
    playlist: []
  },
  mutations: {
    setMusicInfoAndPlaylist (state, m) {
      state.musicInfo = m
      state.playlist.unshift(m)
    },
    setMusicInfo (state, m) {
      state.musicInfo = m
    },
    setMusicPlaylist (state, m) {
      state.musicInfo = m[0]
      state.playlist = m
    }
  },
  actions: {
    setMusicInfoAndPlaylist (context, musicInfo) {
      context.commit('setMusicInfoAndPlaylist', musicInfo)
    },
    setMusicInfo (context, musicInfo) {
      context.commit('setMusicInfo', musicInfo)
    },
    setMusicPlaylist (context, playlist) {
      context.commit('setMusicPlaylist', playlist)
    }
  }
})
