import articleApi from '../../services/article'
import mutations from '../mutations'

const {EDIT_ARTICLE_START, EDIT_ARTICLE_FAILURE, EDIT_ARTICLE_SUCCESS,
  GET_ARTICLE_START, GET_ARTICLE_SUCCESS, GET_ARTICLE_FAILURE} = mutations

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    isLoading: false,
    article: null,
    serverValiationErrors: null
  },
  getters: {
    isSubmitting: ({isSubmitting}) => isSubmitting,
    isLoading: ({isLoading}) => isLoading,
    article: ({article}) => article,
    serverValiationErrors: ({serverValiationErrors}) => serverValiationErrors
  },
  mutations: {
    [GET_ARTICLE_START](state) {
      state.isLoading = true
      state.article =  null
    },
    [GET_ARTICLE_FAILURE](state) {
      state.isLoading = false
      state.article =  null
    },
    [GET_ARTICLE_SUCCESS](state, payload) {
      state.isLoading = false
      state.article =  payload
    },
    [EDIT_ARTICLE_START](state) {
      state.isSubmitting = true
    },
    [EDIT_ARTICLE_FAILURE](state, payload) {
      state.isSubmitting = false
      state.serverValiationErrors = payload
    },
    [EDIT_ARTICLE_SUCCESS](state) {
      state.isSubmitting = false
    },
  },
  actions: {
    async updateArticle({commit}, {slug, articleInput}) {
      commit(EDIT_ARTICLE_START)
      try {
        const res = await articleApi.updateArticle(slug, articleInput)
        if (res.status === 200) {
          console.log(res.data);
          commit(EDIT_ARTICLE_SUCCESS)
        }
      } catch (err) {
        commit(EDIT_ARTICLE_FAILURE, err.res.data.errors)
      }
    },
    async getArticle({commit}, {slug}) {
      commit(GET_ARTICLE_START)
      try {
        const res = await articleApi.getArticle(slug)
        if (res.status === 200) {
          commit(GET_ARTICLE_SUCCESS, res.data.article)
          return res.data.article
        }
      } catch (err) {
        commit(GET_ARTICLE_FAILURE, err.res.data.errors)
      }
    }
  }
}