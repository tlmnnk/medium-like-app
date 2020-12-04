import axios from './axios'

const getFeed = (apiUrl, limit = 10, offset = 0) => {
  return axios.get(apiUrl, {
    params: {
      limit,
      offset
    }
  })
}

export default {
  getFeed
}
