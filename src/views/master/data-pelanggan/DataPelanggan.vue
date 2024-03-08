<template>
    <base-page :config="config"></base-page>
</template>

<script setup>
import otoritas from '@/router/otoritas';
import { store } from '@/utils/store'    
import Pelanggan from './pelanggan';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Data Pelanggan',
                child: false,
                permission: {
                    create: otoritas.check('Tambah Pelanggan Baru'),
                    edit: otoritas.check('Ubah Pelanggan'),
                    delete: otoritas.check('Hapus Pelanggan'),
                    search: true,
                    select_column: true,
                    export: otoritas.groupCheck('export'),
                    filter: false,
                    select_column: true,
                },
                menu: {
                    head: [
                        { title: 'Tambah Pelanggan Baru', key: 'create' },
                        { title: 'Edit Pelanggan', key: 'edit' },
                        { title: 'Hapus Pelanggan', key: 'delete' },
                    ],
                },
                fields: {
                    head: [
                    {title: 'Kode Pelanggan', key: 'kode_pelanggan', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: true}, column: true, sort: 'desc', rules:['required']},
                    {title: 'Nama Pelanggan', key: 'nama', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: false}, column: true, sort: 'desc', rules:['required']},
                    {title: 'Alamat', key: 'alamat', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: false}, column: true, sort: 'desc', rules:['required']},
                    ],
                },
            }
        }
    },
    methods: {
        async get() {
            const check = otoritas.check(this.config.title)
            if(!check) return this.$router.push('/')
            await Pelanggan.pelanggan(null, this.config.fields.head[0])
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