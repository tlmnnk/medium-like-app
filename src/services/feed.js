import axios from './axios'

const getFeed = (apiUrl, limit = 10, offset = 0) => {
  return axios.get(apiUrl, {
    params: {
      limit,
      offset
    }
  })
}

const getTags = () => {
  return axios.get('/tags')
}

export default {
  getFeed,
  getTags
}
