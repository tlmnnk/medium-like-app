import axios from './axios'

const getFollowUrl = slug => `profiles/${slug}/follow`

const getUserProfile = slug => {
  return axios.get(`/profiles/${slug}`)
}

const follow = slug => {
  const url = getFollowUrl(slug)
  return axios.post(url)
}

const unfollow = slug => {
  const url = getFollowUrl(slug)
  return axios.delete(url)
}

export default {
  getUserProfile,
  follow,
  unfollow
}
