import Vue from 'vue'
import Router from 'vue-router'
import CreateRoom from '../components/CreateRoom'
import OpenRoom from '../components/JoinRoom'
import Home from '../components/Home'
import Room from '../components/Room'
import Search from '../components/Search'
import NotFound from '../components/NotFound'
import Test from '../components/Test'

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
