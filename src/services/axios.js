import axios from 'axios'
import LocalStorageAdapter from '../helpers/localStorageAdapter'

const baseURL = 'https://conduit.productionready.io/api'

axios.defaults.baseURL = baseURL

axios.interceptors.request.use(config => {
  const token = LocalStorageAdapter.get('jwtToken')
  const authToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authToken
  return config
})

export default axios
