import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import feed from './modules/feed'
import tags from './modules/tags'
import article from './modules/article'
import createArticle from './modules/createArticle'
import editArticle from './modules/editArticle'
import settings from './modules/settings'
import addToFavorites from './modules/addToFavorites'
import userProfile from './modules/userProfile'
import followUser from './modules/followUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    feed,
    tags,
    article,
    createArticle,
    editArticle,
    settings,
    addToFavorites,
    userProfile,
    followUser
  }
})
