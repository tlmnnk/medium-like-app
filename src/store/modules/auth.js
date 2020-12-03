import mutations from '../mutations'
import authApi from '../../services/auth'
import localStorageAdapter from '../../helpers/localStorageAdapter'

const { TOGGLE_SUBMIT, REGISTER_SUCCESS, REGISTER_FAILURE, 
  LOGIN_SUCCESS, LOGIN_FAILURE, GET_CURRENTUSER_START, 
  GET_CURRENTUSER_FAILURE, GET_CURRENTUSER_SUCCESS } = mutations;

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    isLoading: false,
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
    },
    [GET_CURRENTUSER_START](state) {
      state.isLoading = true
    },
    [GET_CURRENTUSER_FAILURE](state) {
      state.isLoading = false
      state.isLoggedIn = false
      state.user = null
    },
    [GET_CURRENTUSER_SUCCESS](state, payload) {
      state.isLoading = false
      state.isLoggedIn = true
      state.user = payload
    }
  },
  getters: {
    isSubmitting: ({ isSubmitting }) => isSubmitting,
    getErrors: ({ errors }) => errors,
    getLogin: ({ user }) => user.username,
    getIsLoggedIn: ({ isLoggedIn }) => isLoggedIn,
    isAnonim: ({ isLoggedIn }) => isLoggedIn === false
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
          console.log(res.data.user);
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
    },
    async getCurrentUser({commit}) {
      commit(GET_CURRENTUSER_START)
      try {
        const res = await authApi.getCurrentUser()
        if (res.status === 200) {
          commit(GET_CURRENTUSER_SUCCESS, res.data.user)
        }
      } catch (err) {
        commit(GET_CURRENTUSER_FAILURE)
      }
    },
  }
}
