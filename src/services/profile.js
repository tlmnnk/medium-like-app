import axios from './axios'

const getUserProfile = slug => {
  return axios.get(`/profiles/${slug}`)
}

export default {
  getUserProfile
}
