import feedApi from '../../services/feed'
import mutations from '../mutations'

const { GET_FEED_START, GET_FEED_FAILURE, GET_FEED_SUCCESS } = mutations

export default {
  namespaced: true,
  state: {
    feedData: null,
    isLoading: false,
    error: null,
    currentPage: 1
  },
  mutations: {
    [GET_FEED_START](state) {
      state.error = null
      state.isLoading = true
      state.feedData = null
    },
    [GET_FEED_FAILURE](state, payload) {
      state.isLoading = false
      state.error = payload
    },
    [GET_FEED_SUCCESS](state, data) {
      state.isLoading = false
      state.feedData = data
    }
  },
  getters: {
    feedData: ({feedData}) => feedData,
    isLoading: ({isLoading}) => isLoading,
    error: ({error}) => error,
  },
  actions: {
    async fetchFeed({commit}, {apiUrl, limit, offset}) {
      commit(GET_FEED_START)
      try {
        const res = await feedApi.getFeed(apiUrl, limit, offset)
        if (res.status === 200) {
          console.log(res.data);
          commit(GET_FEED_SUCCESS, res.data)
        }
      } catch (err) {
        commit(GET_FEED_FAILURE, {message: err.message})
        console.log(err.message);
      }
    }
  }
}