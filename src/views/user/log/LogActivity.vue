<template>
    <base-page :config="config" :s_table="true"></base-page>
</template>

<script setup>
import otoritas from '@/router/otoritas';
import { store } from '@/utils/store'    
import utils from '@/utils/utils'    
import log from './log';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Log Aktivitas',
                child: false,
                permission: {
                    create: false,
                    edit: false,
                    delete: false,
                    search: true,
                    select_column: true,
                    export: false,
                    filter: true,
                    select_column: true,
                },
                fields: {
                    head: [
                        { title: 'Tanggal', key: 'tanggal', type: 'date', show: true, read: {show: true, disabled: true}, create: {show: false, disabled: false}, column: true, sort: 'desc' },
                        { title: 'Username', key: 'username', type: 'text', show: false, read: {show: true, disabled: true}, create: {show: false, disabled: false}, column: true, dialog: false, sort: 'desc' },
                        { title: 'Kategori', key: 'kategori', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: false, disabled: false}, column: true, dialog: false, sort: 'desc' },
                        { title: 'Keterangan', key: 'keterangan', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: false, disabled: false}, column: true, dialog: false, sort: 'desc' },
                    ],
                },
                filter: [
                    { title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', show: true, default: store().periode[0], rules: ['date:max tgl_akhir'] },
                    { title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', show: true, default: store().periode[1], rules: ['date:min tgl_awal', 'date:max ' + utils.today()] },
                ],
            }
        }
    },
    methods: {
        async get() {
            const data = await log.loguser()
            store().data.items = data
        },
    },
    beforeMount() {
        store().resetState()
    },
    mounted() {
        this.get()
        store().init()
    }
}
</script>