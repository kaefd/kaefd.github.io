import api from '@/utils/api'
import {store} from '@/utils/store'
export default {
    parameters(user, value) {
        if(value && !user) return  value
        else return {
            tgl_awal: store().periode[0],
            tgl_akhir: store().periode[1],
            username: user
        }
    },
    async log (user, param) {
        let head = await api.getData('/log_user', this.parameters(user, param))
        if(!head) api.logout()
        let data = []
        for (let i = 0; i < head.length; i++) {
            data.push({
                head: head[i],
            })
            
        }
        return data
    },
    filterData(input, fl) {
        let data = {}
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < fl.length; j++) {
                if(input[i].title == fl[j].key) data[fl[j].key] = input[i].value
                if(fl[j].item) {
                    for (let k = 0; k < fl[j].item.length; k++) {
                        if(input[i].title == fl[j].item[k]) {
                            let n_fl = fl[j].item[k].replace("-", "")
                            data[n_fl] = input[i].value
                        }
                    }
                }
            }
        }
        return data
    },
    async filtered(input) {
        const filtered = Object.fromEntries(
            Object.entries(input).filter(([key, value]) => value !== false)
        )
        const periode = [filtered.tgl_awal, filtered.tgl_akhir]
        let x = ''
        await this.log($user, {tgl_awal: periode[0], tgl_akhir: periode[1]}).then(response => x = response)
        store().$patch((state) => { state.items = x})
    },
}