import config from '@/config'

const which = () => {
    if (config.mode == 'production') return config.server.production
    else return config.server.development
}
const mode = which()

export default mode