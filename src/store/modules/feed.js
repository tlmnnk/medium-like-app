import feedApi from '../../services/feed'
import mutations from '../mutations'

const { GET_FEED_START, GET_FEED_FAILURE, GET_FEED_SUCCESS } = mutations

export default {
  namespaced: true,
  state: {
    feedData: null,
    isLoading: false,
    error: null
  },
  mutations: {
    [GET_FEED_START](state) {
      state.isLoading = true
      state.feedData = null
    },
    [GET_FEED_FAILURE](state) {
      state.isLoading = false
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
    async fetchFeed({commit}, {apiUrl}) {
      commit(GET_FEED_START)
      try {
        const res = await feedApi.getFeed(apiUrl)
        if (res.status === 200) {
          console.log(res.data);
          commit(GET_FEED_SUCCESS, res.data)
        }
      } catch (err) {
        commit(GET_FEED_FAILURE)
      }
    }
  }
}