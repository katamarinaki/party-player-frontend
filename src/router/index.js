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

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/create',
      name: 'createRoom',
      component: CreateRoom,
    },
    {
      path: '/join',
      name: 'openRoom',
      component: OpenRoom,
    },
    {
      path: '/rooms/:code',
      name: 'room',
      component: Room,
    },
    {
      path: '/rooms/:code/search',
      name: 'search',
      component: Search,
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
  ],
})
