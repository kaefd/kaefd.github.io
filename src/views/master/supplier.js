import api from '@/utils/api'
import {store} from '@/utils/store'
export default {
    parameters(value) {
        if(value) return  value
        else return ''
    },
    async supplier (param) {
        let head = await api.getData('/supplier?status=true', this.parameters(param))
        let data = []
        for (let i = 0; i < head.length; i++) {
            data.push({
                head: head[i],
            })
            
        }
        return data
    },
}