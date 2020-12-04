import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Globalfeed from '../views/Globalfeed.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import Newpost from  '../views/Newpost.vue'
import Settings from  '../views/Settings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: Globalfeed
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: Globalfeed
  },
  {
    path: '/tag/:slug',
    name: 'tag',
    component: Globalfeed
  },
  {
    path: '/article/new',
    name: 'createArticle',
    component: Globalfeed
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: Globalfeed
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    component: Globalfeed
  },
  {
    path: '/settings',
    name: 'settings',
    component: Globalfeed
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile/:slug',
    name: 'User',
    component: User
  },
  {
    path: '/profile/:slug/favorites',
    name: 'userFavorites',
    component: User
  },
  {
    path: '/newpost',
    name: 'Newpost',
    component: Newpost
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
