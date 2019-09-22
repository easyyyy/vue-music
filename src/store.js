import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicInfo: {},
    playlist: [],
    PlayerMainShow: false
  },
  mutations: {
    setMusicInfoAndPlaylist (state, m) {
      state.musicInfo = m
      state.playlist.unshift(m)
    },
    setMusicInfo (state, m) {
      state.musicInfo = m
    },
    setMusicInfoPicUrl (state, url) {
      state.musicInfo.pic = url
    },
    setMusicPlaylist (state, m) {
      state.musicInfo = m[0]
      state.playlist = m
    },
    setPlayerMainShow (state, m) {
      state.PlayerMainShow = m
    }
  },
  actions: {
    setMusicInfoAndPlaylist (context, musicInfo) {
      context.commit('setMusicInfoAndPlaylist', musicInfo)
    },
    setMusicInfo (context, musicInfo) {
      context.commit('setMusicInfo', musicInfo)
    },
    setMusicInfoPicUrl (context, picurl) {
      context.commit('setMusicInfoPicUrl', picurl)
    },
    setMusicPlaylist (context, playlist) {
      context.commit('setMusicPlaylist', playlist)
    },
    setPlayerMainShow (context, showBool) {
      context.commit('setPlayerMainShow', showBool)
    }
  }
})
