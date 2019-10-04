import Vue from 'vue'
import Router from 'vue-router'
import CreateRoom from '@/pages/CreateRoom'
import OpenRoom from '@/pages/JoinRoom'
import Home from '@/pages/Home'
import Room from '@/pages/Room'
import Search from '@/pages/Search'
import NotFound from '@/pages/NotFound'
import Test from '@/pages/Test'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: 'Home' },
    },
    {
      path: '/create',
      name: 'createRoom',
      component: CreateRoom,
      meta: { title: 'Create Room' },
    },
    {
      path: '/join',
      name: 'openRoom',
      component: OpenRoom,
      meta: { title: 'Open Romm' },
    },
    {
      path: '/rooms/:code',
      name: 'room',
      component: Room,
      meta: { title: 'Room' },
    },
    {
      path: '/rooms/:code/search',
      name: 'search',
      component: Search,
      meta: { title: 'Search' },
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
      meta: { title: 'Page Not Found' },
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: { title: 'Test' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.params.code) document.title = to.meta.title + ' ' + to.params.code
  next()
})
export default router
