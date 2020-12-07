import mutations from '../mutations'

const {UPDATE_CURRENTUSER_START, UPDATE_CURRENTUSER_FAILURE, UPDATE_CURRENTUSER_SUCCESS } = mutations;

export default {
  namaspaced: true,
  state: {
    isSubmitting: false,
    validationErrors: null
  },
  getters: {
    isSubmitting: ({isSubmitting}) => isSubmitting,
    validationErrors: ({validationErrors}) => validationErrors
  },
  mutations: {
    [UPDATE_CURRENTUSER_START](state){
      state.isSubmitting = true
    },
    [UPDATE_CURRENTUSER_SUCCESS](state){
      state.isSubmitting = false
    },
    [UPDATE_CURRENTUSER_FAILURE](state, payload){
      state.isSubmitting = false,
      state.validationErrors = payload
    }
  },
  actions: {}
}
