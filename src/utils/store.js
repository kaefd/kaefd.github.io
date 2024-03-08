import { defineStore, acceptHMRUpdate  } from 'pinia'
import utils from '@/utils/utils'
import router from '@/router'

export const store = defineStore('store', {
    state: () => {
        return {
            nav: false,
            dark: false,
            periode: [utils.last_month(), utils.today()],
            state: {},
            data: {}
        }
    },
    actions: {
        resetPeriode() {
            this.periode = [utils.last_month(), utils.today()]
        },
        init() {
            this.resetPeriode()
            this.state = {
                action: 'read',
                data: {}
            }
        },
        resetState() {
            this.data = {}
            this.state = {}
        },
        async getDetail(key, data) {
            let k = key
            let path = router.currentRoute.value.path
            let module = await import(/* @vite-ignore */`../views${path}/${k}`)
            return await module.default.getDetail(data)
        },
        async create(key, head, detail) {
            let k = key
            let path = router.currentRoute.value.path
            let module = await import(/* @vite-ignore */`../views${path}/${k}`)
            return module.default.create(head, detail)
        },
        async edit(key, head) {
            let k = key
            let path = router.currentRoute.value.path
            let module = await import(/* @vite-ignore */`../views${path}/${k}`)
            return module.default.edit(head)
        },
    }
})
// HOT RELOAD MODULE UPDATE
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
  }