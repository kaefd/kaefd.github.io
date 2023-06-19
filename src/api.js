import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://auristeel.com/api',
  headers: {
    'Permissions-Policy': 'interest-cohort=()',
    'csrf': localStorage.getItem('token'),
    'accept': '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'access-control-allow-credentials': true,
    'access-control-allow-methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
  }
})

export default {
  postLogin(data) {
    return instance.post('/login', data)
  },
  getData (url, data) {
    return instance.get(url, data)
  },
  postData (url, data) {
    return instance.post(url, data)
  },
  putData (url, data) {
    return instance.patch(url, data)
  },
  deleteData (url, payload) {
    return instance.delete(url, {data: payload})
  },
  logout() {
    localStorage.removeItem('token')
    localStorage.clear();
    sessionStorage.clear();
    return window.location.href = '/#/login'
  }
}