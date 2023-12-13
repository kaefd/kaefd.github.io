<template>
    <base-page :config="config">
        <template #detail-page>
            <DetailUser :model="model" :field="config.field_detail"></DetailUser>
        </template></base-page>
</template>
<script setup>
import otoritas from '@/router/otoritas';
import DetailUser from './DetailUser.vue';
import user from './user'
import { store } from '@/utils/store'
</script>
<script>
export default {
    data() {
        return {
            model: '',
            config: {
                title: 'Data User',
                child: false,
                permission: [
                    {title: 'Tambah Data', key: 'tambah', value: true},
                    {title: 'Detail Data', key: 'lihat', value: true},
                    {title: 'Ubah Data', key: 'edit', value: true},
                    {title: 'Hapus Data', key: 'hapus', value: true},
                ],
                fields: [
                    {title: 'Username', key: 'username', type: 'text', show: true, sort: 'desc'},
                ],
                field_detail: [
                    {title: 'Username', key: 'username', type: 'text', show: true, sort: 'desc', rules: ['required']},
                    {title: 'Password', key: 'password', type: 'text', show: true, sort: 'desc', rules: ['required', 'min 8']},
                ],
                filter: false
            }
        }
    },
    methods: {
        async get () {
            let a = otoritas.Cakses('Data User')
            if(a) {
                let mdl = []
                let data = ''
                await user.user().then((res) => {
                    let detail = res[0].detail
                    for (let i = 0; i < detail.length; i++) {
                        mdl.push({
                            title: detail[i].title,
                            key: detail[i].key,
                            value: 'false',
                            active: false,
                            item: detail[i].item != undefined ? detail[i].item.map(it => {
                                return {
                                    title: it.title,
                                    key: it.key,
                                    value: 'false',
                                }
                            }) : null
                        })
                    }
                    this.model = mdl
                    data = res
                })
                store().$patch((state) => {
                    state.items = data
                    state.state = this.config
                })
            } else this.$router.push('/')
        },
    },
    beforeMount() {
        store().resetState()
    },
    mounted() {
        this.get()
    }
}
</script>