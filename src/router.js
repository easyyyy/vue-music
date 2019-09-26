import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import PlayListDetail from './views/PlayListDetail'
import Artist from './views/Artist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: PlayListDetail
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: Artist
    }
  ]
})
