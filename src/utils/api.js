import axios from 'axios'
import mode from '@/mode'
import router from '@/router'
import {store} from '@/utils/store'
import config from '@/config'
import alert from './alert'

const session = JSON.parse(localStorage.getItem('session'))
const instance = axios.create({
  baseURL: config.server[mode.server],
  headers: {
    csrf: session?.token,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache; no-store; must-revalidate',
  },
})
export default {
  postLogin(data) {
    return instance.post('/login', data)
  },
  async getData(url, param) {
    try {
      const response = await instance.get(url, { params: param })
      return response.data
    } catch (error) {
      if(error.response.data == 'Bad Token') return this.logout()
      alert.failed(null, error.response.data)
      return false
    }
  },
  create(url, param) {
    return instance.post(url, param)
  },
  update(url, param) {
    return instance.patch(url, param)
  },
  delete(url, data) {
    return instance.delete(url, {data: data})
  },
  logout() {
    localStorage.removeItem('otoritas')
    localStorage.removeItem('otoritas')
    store().loading = false
    store().resetState()
    return router.push('/login')
  }
}