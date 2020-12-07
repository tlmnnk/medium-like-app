import articleApi from '../../services/article'
import mutations from '../mutations'

const {CREATE_ARTICLE_START, CREATE_ARTICLE_FAILURE, CREATE_ARTICLE_SUCCESS} = mutations

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    serverValiationErrors: null
  },
  getters: {
    isSubmitting: ({isSubmitting}) => isSubmitting,
    serverValiationErrors: ({serverValiationErrors}) => serverValiationErrors
  },
  mutations: {
    [CREATE_ARTICLE_START](state) {
      state.isSubmitting = true
    },
    [CREATE_ARTICLE_FAILURE](state, payload) {
      state.isSubmitting = false
      state.serverValiationErrors = payload
    },
    [CREATE_ARTICLE_SUCCESS](state) {
      state.isSubmitting = false
    },
  },
  actions: {
    async createArticle({commit}, {articleInput}) {
      commit(CREATE_ARTICLE_START)
      try {
        const res = await articleApi.createArticle(articleInput)
        if (res.status === 200) {
          console.log(res.data);
          commit(CREATE_ARTICLE_SUCCESS)
          return res.data.article
        }
      } catch (err) {
        commit(CREATE_ARTICLE_FAILURE, err.data.errors)
      }
    }
  }
}