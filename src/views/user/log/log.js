import api from '@/utils/api'
import {store} from '@/utils/store'
export default {
    async loguser (fl, param) {
        let user = JSON.parse(localStorage.getItem('session')).user
        let parameters = {
            username: user,
        	tgl_awal: store().periode[0],
        	tgl_akhir: store().periode[1],
        };
        store().loading = true
        let head = await api.getData('/log_user', parameters)
        store().loading = false
        return head
    },
}