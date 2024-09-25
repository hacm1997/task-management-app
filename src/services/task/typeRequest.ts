import axios from 'axios'
import { VITE_TAKS_SERVICE_URL } from '../config'

export const typeRequest = (method: string) => {
  return axios.create({
    baseURL: VITE_TAKS_SERVICE_URL,
    method: method,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
    }
  })
}