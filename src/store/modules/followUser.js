import profile from '../../services/profile'
import mutations from '../mutations'

const { FOLLOW_USER_START, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS } = mutations

export default {
  namespaced: true,
  mutations: {
    [FOLLOW_USER_START]() {},
    [FOLLOW_USER_SUCCESS]() {},
    [FOLLOW_USER_FAILURE]() {},
  },
  actions: {
    async handleFollow({commit}, {slug, isFollow}) {
      commit(FOLLOW_USER_START)
      try {
        if(isFollow) {
          await profile.unfollow(slug)
        } else {
          await profile.follow(slug)
        }
        commit(FOLLOW_USER_SUCCESS)
      } catch (error) {
        console.log(error);
        commit(FOLLOW_USER_FAILURE)
      }
    }
  }
}
