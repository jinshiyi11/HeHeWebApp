import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import FeedsView from '@/views/FeedsView'
import AlbumView from '@/views/AlbumView'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  console.log('scrollBehavior:' + savedPosition)
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'FeedsView',
    component: FeedsView
  }, {
    path: '/album/:feedId',
    name: 'AlbumView',
    component: AlbumView
  }],
  scrollBehavior
})
