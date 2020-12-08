import mutations from '../mutations'
import authApi from '../../services/auth'
import localStorageAdapter from '../../helpers/localStorageAdapter'
import {JWT_TOKEN_NAME} from '../../helpers/vars'

const { TOGGLE_SUBMIT, REGISTER_SUCCESS, REGISTER_FAILURE, 
  LOGIN_SUCCESS, LOGIN_FAILURE, GET_CURRENTUSER_START, 
  GET_CURRENTUSER_FAILURE, GET_CURRENTUSER_SUCCESS,
  UPDATE_CURRENTUSER_START, UPDATE_CURRENTUSER_FAILURE, UPDATE_CURRENTUSER_SUCCESS,
  LOGOUT } = mutations;

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
    [GET_CURRENTUSER_FAILURE](state, payload) {
      state.isLoading = false
      state.isLoggedIn = false
      state.user = null
      state.errors = payload
    },
    [GET_CURRENTUSER_SUCCESS](state, payload) {
      state.isLoading = false
      state.isLoggedIn = true
      state.user = payload
    },
    [UPDATE_CURRENTUSER_START](state) {
      state.isSubmitting = true
    },
    [UPDATE_CURRENTUSER_FAILURE](state) {
      state.isSubmitting = false
    },
    [UPDATE_CURRENTUSER_SUCCESS](state, payload) {
      state.isSubmitting = false
      state.user = payload
    },
    [LOGOUT](state) {
      state.user = null
      state.isLoggedIn = false    }
  },
  getters: {
    isSubmitting: ({ isSubmitting }) => isSubmitting,
    getErrors: ({ errors }) => errors,
    getLogin: ({ user }) => user.username,
    getIsLoggedIn: ({ isLoggedIn }) => isLoggedIn,
    isAnonim: ({ isLoggedIn }) => isLoggedIn === false,
    currentUser: ({ user }) => user
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
          localStorageAdapter.set(JWT_TOKEN_NAME, res.data.user.token)
        }
      } catch (error) {
        if(error.response) {
          commit(LOGIN_FAILURE, error.response.data.errors)
        } else {
          console.log('login', error)
          commit(LOGIN_FAILURE, error)
        }
        
        
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
        commit(GET_CURRENTUSER_FAILURE, { errors: err.message})
      }
    },
    async updateCurrentuser({commit}, {userInput}) {
      commit(UPDATE_CURRENTUSER_START)
      try {
        const res = await authApi.updateCurrentUser(userInput)
        if (res.status === 200) {
          console.log(res.data.user);
          commit(UPDATE_CURRENTUSER_SUCCESS, res.data.user)
        }
      } catch (err) {
        commit(UPDATE_CURRENTUSER_FAILURE, err.response.data.errors)
      }
    },
    logout({commit}) {
        localStorageAdapter.set(JWT_TOKEN_NAME, '')
        commit(LOGOUT)    
    }
  }
}
