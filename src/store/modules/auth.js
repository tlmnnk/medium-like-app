import mutations from '../mutations'

const { TOGGLE_REG } = mutations;

export default {
  namespaced: true,
  state: {
    isSubmitting: false
  },
  mutations: {
    [TOGGLE_REG](state) {
      state.isSubmitting = true
    }
  },
  getters: {
    isSubmitting: ({ isSubmitting }) => isSubmitting
  },
  actions: {
    toggleRegStart({ commit }, payload) {
      commit(TOGGLE_REG, payload)
    }
  }
}
