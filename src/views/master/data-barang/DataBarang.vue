<template>
    <base-page :config="config"></base-page>
</template>

<script setup>
import otoritas from '@/router/otoritas';
import { store } from '@/utils/store'    
import utils from '@/utils/utils'    
import barang from './barang';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Data Barang',
                child: false,
                permission: {
                    create: otoritas.check('Tambah Barang Baru'),
                    edit: otoritas.check('Ubah Barang'),
                    delete: otoritas.check('Hapus Barang'),
                    search: true,
                    select_column: true,
                    export: otoritas.groupCheck('export'),
                    filter: true,
                    select_column: true,
                },
                menu: {
                    head: [
                        { title: 'Tambah Barang Baru', key: 'create' },
                        { title: 'Edit Data Barang', key: 'edit' },
                        { title: 'Hapus Data Barang', key: 'delete' },
                    ],
                },
                fields: {
                    head: [
                        {title: 'Kategori Barang', key: 'kategori_barang', type: 'option', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: false}, column: true, sort: 'desc', rules:['required'], item: [
                            {title: 'Bahan Baku', key: 'Bahan Baku'},
                            {title: 'Bahan Penolong', key: 'Bahan Penolong'},
                            {title: 'Barang Setengah Jadi', key: 'Barang Setengah Jadi'},
                            {title: 'Barang Jadi', key: 'Barang Jadi'},
                            {title: 'Barang Sisa (Scrap)', key: 'Barang Sisa (Scrap)'},
                            {title:  'Mesin & Peralatan', key: 'Mesin & Peralatan'}
                        ]},
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: true}, column: true, sort: 'desc', rules:['required']},
                        {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: false}, column: true, sort: 'desc', rules:['required']},
                        {title: 'HS Kode', key: 'hs_code', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: false}, column: true, sort: 'desc', rules:['required']},
                        {title: 'Satuan', key: 'satuan', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, edit: {show: true, disabled: false}, column: true, sort: 'desc', rules:['required']},
                    ],
                },
                filter: [
                    {title: 'Kategori Barang', key: 'kategori_barang', show: true, type: 'checkbox', item: [
                        {title: 'Bahan Baku', key: 'bahan_baku', value: true},
                        {title: 'Bahan Penolong', key: 'bahan_penolong', value: true},
                        {title: 'Barang Setengah Jadi', key: 'barang_setengah_jadi', value: true},
                        {title: 'Barang Jadi', key: 'barang_jadi', value: true},
                        {title: 'Barang Sisa (Scrap)', key: 'scrap', value: true},
                        {title: 'Mesin & Peralatan', key: 'peralatan', value: true}
                    ]},
                ],
            }
        }
    },
    methods: {
        async get() {
            const check = otoritas.check(this.config.title)
            if(!check) return this.$router.push('/')
            store().data.items = await barang.barang(null, this.config.fields.head[0])
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