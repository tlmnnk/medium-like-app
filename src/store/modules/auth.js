import mutations from '../mutations'
import authApi from '../../services/auth'
import localStorageAdapter from '../../helpers/localStorageAdapter'

const { TOGGLE_REG, REGISTER_SUCCESS, REGISTER_FAILURE } = mutations;

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    user: null,
    errors: null,
    isLoggedIn: null
  },
  mutations: {
    [TOGGLE_REG](state, payload) {
      state.isSubmitting = payload
    },
    [REGISTER_SUCCESS](state, user) {
      state.user = user
      state.isLoggedIn = true
    },
    [REGISTER_FAILURE](state, errors) {
      state.errors = errors
    }
  },
  getters: {
    isSubmitting: ({ isSubmitting }) => isSubmitting,
    getErrors: ({ errors }) => errors
  },
  actions: {
    toggleRegStart({ commit }, payload) {
      commit(TOGGLE_REG, payload)
    },
    async register({commit}, { username, email, password }) {
      commit(TOGGLE_REG, true)
      try {
        const res = await authApi.register({ username, email, password })
        if (res.status === 200) {
          commit(REGISTER_SUCCESS, res.data.user)
          localStorageAdapter.set('jwtToken', res.data.user.token)
        }
      } catch (error) {
        console.log(error.response.data.errors);
        commit(REGISTER_FAILURE, error.response.data.errors)
      }
      commit(TOGGLE_REG, false)
    }
  }
}
