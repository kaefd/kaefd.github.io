import api from '@/utils/api'
import {store} from '@/utils/store'
export default {
    async loguser (param, fl) {
        let parameters = "";
		if (param) parameters = param;
		else
			parameters = {
				tgl_awal: store().periode[0],
				tgl_akhir: store().periode[1],
			};
        store().loading = true
        let head = await api.getData('/log_user', parameters)
        store().loading = false
        return head
    },
}