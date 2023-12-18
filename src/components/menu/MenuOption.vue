<template>
        <div class="absolute border rounded w-40 max-h-min min-h-12 space-y-1" :class="store().theme == 'dark' ? 'dark' : 'bg-white'"
            :style="elementStyle">
            <div v-for="menu in menuOpt" @click="option(menu)"
                class="p-3 w-full cursor-pointer" :class="store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'">
                <span>{{ menu.title }}</span>
            </div>
        </div>
    <div v-if="store().menu.show" @click="close()" class="fixed top-0 left-0 h-full w-full z-[-2]"></div>
</template>
<script setup>
import {store} from '@/utils/store'
import otoritas from '@/router/otoritas'
</script>
<script>
export default {
    computed: {
        elementStyle() {
            return {
                position: 'absolute',
                left: store().menu.screenX + 'px',
                top: store().menu.screenY-100 + 'px',
            }
        },
        menuOpt () {
            let menu = [
                {title: 'Detail', key: 'detail'},
                {title: 'Hapus', key: 'hapus_detail'}
            ]
            if(store().menu.option.key == 'lihat') return menu.slice(0, 1)
            else if(store().menu.option.key == 'tambah') return menu
            else {
                if(store().state.title == 'Data User') return store().state.permission.filter(item => item.key != 'tambah' && otoritas.Cakses('Data User') == true)
                else return store().state.permission.filter(item => item.key != 'tambah' && otoritas.check(item.key) == true)
            }
        }
    },
    methods: {
        option(value) {
            let same = store().state.permission.filter((item) => item.key == value.key)
            if(same != '') store().$patch((state) => { state.menu.option = value })
            if (value.key == 'lihat') {
                store().$patch((state) => { 
                    state.detail_dialog = true
                    state.menu.show = false
                 })
            } else if (value.key == 'tambah') {
                store().$patch((state) => {
                    state.detail_dialog = true
                    state.master = '',
                    state.detail= ''
                })
            }else if (value.key == 'edit') {
                store().$patch((state) => {
                    state.detail_dialog = true
                })
            } else if (value.key == 'suratjalan') {
                store().$patch((state) => {
                    state.suratjalan = true
                })
            } else if (value.key == 'do') {
                store().$patch((state) => {
                    state.do = true
                })
            } else if (value.key == 'hapus') {
                store().delete()
            } else if (value.key == 'detail') {
                store().openDialog()
            } else if (value.key == 'hapus_detail') {
                let data = store().detail.filter(item => item != store().s_detail)
                store().detail.splice(0, store().detail.length, ...data)
            }
            store().$patch((state) => { state.menu.show = false })
        },
        close() {
            store().$patch((state) => {
                state.menu.show = false
            })
        },
    }
}
</script>