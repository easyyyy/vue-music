import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicInfo: {},
    playlist: [],
    PlayerMainShow: false,
    Tab: ''
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
    },
    insertPlaylist (state, dict) {
      state.playlist.splice(dict['index'], 0, dict['item'])
    },
    setTab (state, m) {
      state.Tab = m
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
    },
    insertPlaylist (context, dict) {
      context.commit('insertPlaylist', dict)
    },
    setTab (context, tab) {
      context.commit('setTab', tab)
    }
  }
})
