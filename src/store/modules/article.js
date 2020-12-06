import feedApi from '../../services/feed'
import mutations from '../mutations'

const { GET_ARTICLE_START, GET_ARTICLE_FAILURE, GET_ARTICLE_SUCCESS } = mutations

export default {
  namespaced: true,
  state: {
    articleData: null,
    isLoading: false,
    error: null
  },
  mutations: {
    [GET_ARTICLE_START](state) {
      state.isLoading = true
      state.feedData = null
    },
    [GET_ARTICLE_FAILURE](state) {
      state.isLoading = false
    },
    [GET_ARTICLE_SUCCESS](state, data) {
      state.isLoading = false
      state.articleData = data
    }
  },
  getters: {
    articleData: ({articleData}) => articleData,
    isLoading: ({isLoading}) => isLoading,
    error: ({error}) => error,
  },
  actions: {
    async getArticle({commit}, slug) {
      commit(GET_ARTICLE_START)
      try {
        const res = await feedApi.getArticle(slug)
        if (res.status === 200) {
          console.log(res.data);
          commit(GET_ARTICLE_SUCCESS, res.data)
        }
      } catch (err) {
        commit(GET_ARTICLE_FAILURE)
      }
    }
  }
}