// get api user otoritas
// create new router berdasrkan otoritas
import api from '@/utils/api'

export default {
    async routing() {
        const user = localStorage.getItem('user')
        const otoritas = await api.getData('user_otoritas', {username: user})
        // store().$patch((state) => { state.otoritas = otoritas})
    }
}