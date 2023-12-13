<template>
    <base-page :config="config"></base-page>
</template>
<script setup>
import barang from './barang'
import otoritas from '@/router/otoritas'
import { store } from '@/utils/store'
</script>
<script>
export default {
    props: {
        otority: {type: Object}
    },
    data() {
        return {
            config: {
                title: 'Data Barang',
                child: false,
                permission: [
                    {title: 'Tambah Data', key: 'tambah'},
                    {title: 'Detail Data', key: 'lihat'},
                    {title: 'Ubah Data', key: 'edit'},
                    {title: 'Hapus Data', key: 'hapus'}
                ],
                fields: [
                    {title: 'Kategori Barang', key: 'kategori_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'HS Kode', key: 'hs_code', type: 'text', show: true, sort: 'desc'},
                    {title: 'Satuan', key: 'satuan', type: 'text', show: true, sort: 'desc'},
                ],
                field_detail: [
                    {title: 'Kategori Barang', key: 'kategori_barang', type: 'option', show: true, item: ['Bahan Baku', 'Bahan Penolong', 'Barang Setengah Jadi', 'Barang Jadi', 'Barang Sisa (Scrap)', 'Mesin & Peralatan']},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true},
                    {title: 'HS Kode', key: 'hs_code', type: 'text', show: true},
                    {title: 'Satuan', key: 'satuan', type: 'text', show: true},
                ],
                filter: [
                    {title: 'Kategori Barang', key: 'kategori_barang', type: 'checkbox', item: [
                        {title: 'Bahan Baku', key: 'bahan_baku', show: true},
                        {title: 'Bahan Penolong', key: 'bahan_penolong', show: true},
                        {title: 'Barang Setengah Jadi', key: 'barang_setengah_jadi', show: true},
                        {title: 'Barang Jadi', key: 'barang_jadi', show: true},
                        {title: 'Barang Sisa (Scrap)', key: 'scrap', show: true},
                        {title: 'Mesin & Peralatan', key: 'peralatan', show: true}
                    ]},
                ],
            }
        }
    },
    methods: {
        async get () {
            let data = await barang.barang()
            store().$patch((state) => {
                state.items = data
                state.state = this.config
            })
        },
    },
    beforeMount() {
        store().resetState()
        
    },
    mounted() {
        this.get()
    },
}
</script>