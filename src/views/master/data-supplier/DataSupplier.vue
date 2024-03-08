<template>
    <base-page :config="config"></base-page>
</template>

<script setup>
import otoritas from '@/router/otoritas';
import { store } from '@/utils/store'    
import utils from '@/utils/utils'    
import supplier from './supplier';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Data Supplier',
                child: false,
                permission: {
                    create: otoritas.check('Tambah Supplier Baru'),
                    edit: otoritas.check('Ubah Supplier'),
                    delete: otoritas.check('Hapus Supplier'),
                    search: true,
                    select_column: true,
                    export: otoritas.groupCheck('export'),
                    filter: false,
                    select_column: true,
                },
                menu: {
                    head: [
                        { title: 'Tambah Supplier Baru', key: 'create' },
                        { title: 'Edit Data Supplier', key: 'edit' },
                        { title: 'Hapus Data Supplier', key: 'delete' },
                    ],
                },
                fields: {
                    head: [
                        {title: 'Kode Supplier', key: 'kode_supplier', type: 'text',show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: true}, column: true, sort: 'desc', edit: false, rules:['required']},
                        {title: 'Nama Supplier', key: 'nama', type: 'text',show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: false}, column: true, sort: 'desc', rules:['required']},
                        {title: 'Alamat', key: 'alamat', type: 'text',show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: false}, column: true, sort: 'desc', rules:['required']},
                        {title: 'Kota', key: 'kota', type: 'text',show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: false}, column: true, sort: 'desc', rules:['required']},
                        {title: 'Negara', key: 'negara', type: 'text',show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: false}, column: true, sort: 'desc', rules:['required']},
                    ],
                },
            }
        }
    },
    methods: {
        async get() {
            const check = otoritas.check(this.config.title)
            if(!check) return this.$router.push('/')
            await supplier.supplier(null, this.config.fields.head[0])
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