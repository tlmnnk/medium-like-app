import axios from './axios'

const getArticle = slug => {
  return axios.get(`/articles/${slug}`)
}

export default {
  getArticle
}
