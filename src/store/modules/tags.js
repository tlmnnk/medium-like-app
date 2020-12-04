import feedApi from '../../services/feed'
import mutations from '../mutations'

const { GET_TAGS_START, GET_TAGS_SUCCESS, GET_TAGS_FAILURE } = mutations

export default {
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    [GET_TAGS_START](state) {
      state.isLoading = true
      state.feedData = null
    },
    [GET_TAGS_SUCCESS](state) {
      state.isLoading = false
    },
    [GET_TAGS_FAILURE](state, data) {
      state.isLoading = false
      state.feedData = data
    }
  },
  getters: {
    tagsData: ({data}) => data,
    isLoading: ({isLoading}) => isLoading,
    error: ({error}) => error,
  },
  actions: {
    async fetchTags({commit}) {
      commit(GET_TAGS_START)
      try {
        const res = await feedApi.getTags()
        if (res.status === 200) {
          console.log(res.data)
          commit(GET_TAGS_SUCCESS, res.data.tags)
        }
      } catch (err) {
        commit(GET_TAGS_FAILURE)
      }
    }
  }
}
