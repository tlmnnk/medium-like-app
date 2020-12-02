import mutations from '../mutations'
import authApi from '../../services/auth'
import localStorageAdapter from '../../helpers/localStorageAdapter'

const { TOGGLE_SUBMIT, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE } = mutations;

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    user: null,
    errors: null,
    isLoggedIn: null
  },
  mutations: {
    [TOGGLE_SUBMIT](state, payload) {
      state.isSubmitting = payload
    },
    [REGISTER_SUCCESS](state, user) {
      state.user = user
      state.errors = null
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
      commit(TOGGLE_SUBMIT, payload)
    },
    async register({commit}, { username, email, password }) {
      commit(TOGGLE_SUBMIT, true)
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
      commit(TOGGLE_SUBMIT, false)
    },
    async login({commit}, creds) {
      commit(TOGGLE_SUBMIT, true)
      try {
        const res = await authApi.login(creds)
        if (res.status === 200) {
          commit(LOGIN_SUCCESS, res.data.user)
          localStorageAdapter.set('jwtToken', res.data.user.token)
        }
      } catch (error) {
        console.log(error.response.data.errors)
        commit(LOGIN_FAILURE, error.response.data.errors)
      }
      commit(TOGGLE_SUBMIT, false)
    }
  }
}
