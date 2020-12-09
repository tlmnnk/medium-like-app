import axios from 'axios'
import LocalStorageAdapter from '../helpers/localStorageAdapter'
import {JWT_TOKEN_NAME} from '../helpers/vars'

const baseURL = 'https://conduit.productionready.io/api'

axios.defaults.baseURL = baseURL

axios.interceptors.request.use(config => {
  const token = LocalStorageAdapter.get(JWT_TOKEN_NAME)
  const authToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authToken
  return config
})

export default axios
