import Vue from 'vue'
import VueRouter from 'vue-router'
import Matches from '../views/Matches.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Matches',
    component: Matches
  },
  {
    path: '/:id',
    name: 'Match',
    component: () => import('../views/Match.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
