import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicInfo: {}
  },
  mutations: {
    setMusicInfo (state, m) {
      state.musicInfo = m
    },
    setMusicPlaying (state, flag) {
      state.musicInfo.musicPlaying = flag
    }
  },
  actions: {
    setMusicInfo (context, musicInfo) {
      context.commit('setMusicInfo', musicInfo)
    },
    setMusicPlaying (context, flag) {
      context.commit('setMusicPlaying', flag)
    }
  }
})
