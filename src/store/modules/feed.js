import feedApi from '../../services/feed'
import mutations from '../mutations'

const { GET_FEED_START, GET_FEED_FAILURE, GET_FEED_SUCCESS } = mutations

export default {
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    [GET_FEED_START](state) {
      state.isLoading = true
      state.data = null
    },
    [GET_FEED_FAILURE](state) {
      state.isLoading = false
    },
    [GET_FEED_SUCCESS](state, data) {
      state.isLoading = false
      state.data = data
    }
  },
  getters: {
    data: ({data}) => data,
    isLoading: ({isLoading}) => isLoading,
    error: ({error}) => error,
  },
  actions: {
    async fetchFeed({commit}, {apiUrl}) {
      commit(GET_FEED_START)
      try {
        const res = await feedApi.getFeed(apiUrl)
        if (res.status === 200) {
          commit(GET_FEED_SUCCESS, res.data)
        }
      } catch (err) {
        commit(GET_FEED_FAILURE)
      }
    }
  }
}