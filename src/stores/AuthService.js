import axios from 'axios'


export default {
    isAuthenticated() {
        const token = localStorage.getItem('token')

        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ${token}'
            return true
        } else {
            return false
        }
    },
    logout () {
        // delete jwt token from local storage
        localStorage.removeItem('token')

        // delete authorization header from all request
        delete axios.defaults.headers.common['Authorization']

        // refreh page
        location.reload()
    }
}