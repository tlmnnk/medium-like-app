import profileApi from '../../services/profile'
import mutations from '../mutations'

const {GET_USER_PROFILE_START, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_SUCCESS} = mutations

export default {
  namespaced: true,
  state: {
    userProfileData: null,
    isLoading: false,
    error: null
  },
  getters : {
    userProfileData: ({userProfileData}) => userProfileData,
    isLoading: ({isLoading}) => isLoading,
    error: ({error}) => error
  },
  mutations: {
    [GET_USER_PROFILE_START](state) {
      state.isLoading = true,
      state.userProfileData = null
    },
    [GET_USER_PROFILE_FAILURE](state, payload) {
      state.isLoading = false,
      state.error = payload
    },
    [GET_USER_PROFILE_SUCCESS](state, payload) {
      state.isLoading = false,
      state.userProfileData = payload
    },
  },
  actions: {
    async getUserProfile ({commit}, {slug}) {
      commit(GET_USER_PROFILE_START)
      try {
        const res = await profileApi.getUserProfile(slug)
        if(res.status === 200) {
          commit(GET_USER_PROFILE_SUCCESS, res.data.profile)
        }
      } catch (error) {
        commit(GET_USER_PROFILE_SUCCESS, error.response.data.errors)
      }
    }
  }
}