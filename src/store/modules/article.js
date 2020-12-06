import articleApi from '../../services/article'
import mutations from '../mutations'

const { GET_ARTICLE_START, GET_ARTICLE_FAILURE, GET_ARTICLE_SUCCESS,
  DELETE_ARTICLE_START, DELETE_ARTICLE_SUCCESS, DELETE_ARTICLE_FAILURE } = mutations

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
      state.articleData = null
    },
    [GET_ARTICLE_FAILURE](state) {
      state.isLoading = false
    },
    [GET_ARTICLE_SUCCESS](state, data) {
      state.isLoading = false
      state.articleData = data
    },
    [DELETE_ARTICLE_START]() {},
    [DELETE_ARTICLE_SUCCESS]() {},
    [DELETE_ARTICLE_FAILURE]() {}
  },
  getters: {
    articleData: ({articleData}) => articleData,
    isLoading: ({isLoading}) => isLoading,
    error: ({error}) => error,
  },
  actions: {
    async fetchArticle({commit}, {slug}) {
      commit(GET_ARTICLE_START)
      try {
        const res = await articleApi.getArticle(slug)
        if (res.status === 200) {
          console.log(res.data);
          commit(GET_ARTICLE_SUCCESS, res.data.article)
        }
      } catch (err) {
        commit(GET_ARTICLE_FAILURE)
      }
    },
    async deleteArticle({commit}, {slug}) {
      commit(DELETE_ARTICLE_START)
      try {
        const res = await articleApi.deleteArticle(slug)
        if (res.status === 200) {
          commit(DELETE_ARTICLE_SUCCESS)
        }
      } catch (err) {
        commit(DELETE_ARTICLE_FAILURE)
      }
    }
  }
}