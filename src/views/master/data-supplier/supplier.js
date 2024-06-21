import { store } from '@/utils/store'
import api from '@/utils/api'

export default {
    parameters(value) {
		if (value) return value;
		else return "";
	},
    async supplier(param) {
        store().loading = true
        let data = await api.getData("/supplier", this.parameters(param));
        store().data.items = data
        store().loading = false
        return data;
    },
}