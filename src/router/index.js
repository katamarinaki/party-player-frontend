import Vue from 'vue'
import Router from 'vue-router'
import CreateRoom from '../components/CreateRoom'
import OpenRoom from '../components/OpenRoom'
import Home from '../components/Home'
import Room from '../components/Room'
import NotFound from '../components/NotFound'

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
      path: '/open',
      name: 'openRoom',
      component: OpenRoom,
    },
    {
      path: '/rooms/:id',
      name: 'room',
      component: Room,
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
    },
  ],
})
