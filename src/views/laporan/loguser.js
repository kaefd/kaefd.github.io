import api from '@/utils/api'
import {store} from '@/utils/store'
export default {
    async log (param, fl) {
        store().loader('on')
        let head = await api.getData('/log_user', param)
        let data = []
        for (let i = 0; i < head.length; i++) {
            data.push({
                head: head[i],
            })
            
        }
        let field = fl || store().state.fields[0]
        let newdata = data.sort((a, b) => b.head[field.key].localeCompare(a.head[field.key]))
        store().$patch((state) => state.items = newdata)
        store().loader('off')
        return newdata
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
        const periode = Object.fromEntries(
            Object.entries(input).filter(([key, value]) => value !== false)
        )
        if (periode.tgl_awal != undefined) {
			store().$patch((state) => {
				state.periode[0] = periode.tgl_awal;
			});
		}
		if (periode.tgl_akhir != undefined) {
			store().$patch((state) => {
				state.periode[1] = periode.tgl_akhir;
			});
		}
        let x = ''
        await this.log({tgl_awal: store().periode[0], tgl_akhir: store().periode[1]}).then(response => x = response)
        store().$patch((state) => { state.items = x})
    },
}