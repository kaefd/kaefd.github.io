import axios from 'axios'
import { App} from 'vue'


export default {
    
        App.config.globalProperties.$axios = axios.create({
            baseURL: options.baseUrl,
            headers: {
                Authorization: options.token ? `Bearer ${options.token}` : '',
            }
        })

}