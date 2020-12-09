import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Globalfeed from '../views/Globalfeed.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import UserProfile from '../views/UserProfile.vue'
import Newpost from  '../views/Newpost.vue'
import Settings from  '../views/Settings.vue'
import YourFeed from '../views/YourFeed.vue'
import TagFeed from '../views/TagFeed.vue'
import Article from '../views/Article.vue'
import CreateArticle from '../views/CreateArticle.vue'
import EditArticle from '../views/EditArticle.vue'

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
    component: YourFeed
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed
  },
  {
    path: '/article/new',
    name: 'createArticle',
    component: CreateArticle
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: Article
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    component: EditArticle
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
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/profile/:slug/favorites',
    name: 'userProfileFavorites',
    component: UserProfile
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
