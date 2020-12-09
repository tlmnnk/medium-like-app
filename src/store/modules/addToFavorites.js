import addToFavoritesApi from '../../services/addToFavorites'
import mutations from '../mutations'

const { ADD_TO_FAVORITES_START, ADD_TO_FAVORITES_FAILURE, ADD_TO_FAVORITES_SUCCESS } = mutations

export default {
  namespaced: true,
  mutations: {
    [ADD_TO_FAVORITES_START]() {},
    [ADD_TO_FAVORITES_FAILURE]() {},
    [ADD_TO_FAVORITES_SUCCESS]() {},
  },
  actions: {
    async handleLikeArticle({commit}, {slug, isFavorited}) {
      commit(ADD_TO_FAVORITES_START)
      try {
        if(isFavorited) {
          await addToFavoritesApi.removeFromFavorites(slug)
        } else {
          await addToFavoritesApi.addToFavorites(slug)
        }
        commit(ADD_TO_FAVORITES_SUCCESS)
      } catch (error) {
        commit(ADD_TO_FAVORITES_FAILURE)
      }
    }
  }
}
