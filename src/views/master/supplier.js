import api from '@/utils/api'
import {store} from '@/utils/store'
export default {
    parameters(value) {
        if(value) return  value
        else return ''
    },
    async supplier (param) {
        store().loader('on')
        let head = await api.getData('/supplier?status=true', this.parameters(param))
        let data = []
        for (let i = 0; i < head.length; i++) {
            data.push({
                head: head[i],
            })
            
        }
        store().loader('off')
        return data
    },
}