import axios from 'axios'
import mode from '@/mode'
import router from '@/router'
import {store} from '@/utils/store'
import config from '@/config'
import alert from './alert'

const instance = axios.create({
  baseURL: config.server[mode.server] ,
  headers: {
    csrf: localStorage.getItem('token'),
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
      return this.logout()
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
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    store().resetState()
    store().$patch((state) => { state.theme = 'light' })
    return router.push('/login')
  }
}