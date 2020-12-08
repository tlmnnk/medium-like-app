import axios from './axios'

const favoriteUrl = slug => `/articles/${slug}/favorite`

const addToFavorites = slug => {
  const url = favoriteUrl(slug)
  return axios.post(url)
}

const removeFromFavorites = slug => {
  const url = favoriteUrl(slug)
  return axios.delete(url)
}

export default {
  addToFavorites,
  removeFromFavorites
}
