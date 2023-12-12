<template>
    <base-page :config="config"></base-page>
</template>
<script setup lang="ts">
import { store } from '@/utils/store'
import loguser from './loguser'
</script>
<script lang="ts">
export default {
    props: {user: {type: Object}},
    data() {
        return {
            config: {
                title: 'Laporan Log User',
                child: true,
                permission: [],
                fields: [
                    {title: 'Tanggal', key: 'tanggal', type: 'date', show: true, sort: 'desc'},
                    {title: 'Username', key: 'username', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kategori', key: 'kategori', type: 'text', show: true, sort: 'desc'},
                    {title: 'Keterangan', key: 'keterangan', type: 'text', show: true, sort: 'desc'},
                ],
                field_detail: false,
                dialog_field: false,
                filter: [
                    {title: 'Tanggal Awal', key: 'tgl_awal', type: 'date'},
                    {title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date'},
                ]
            }
        }
    },
    methods: {
        async get () {
            store().loader('on')
            let data = await loguser.log(this.user)
            if(data) store().loader('off')
            store().$patch((state) => {
                state.items = data
                state.state = this.config
            })
        },
    },
    beforeMount() {
        return store().resetState()
    },
    async mounted() {
        this.get()
    }
}
</script>