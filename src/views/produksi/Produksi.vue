<template>
    <base-page :config="config">
        <template #base-detail>
            <ProduksiDetail></ProduksiDetail>
        </template>
    </base-page>
</template>
<script setup lang="ts">
import produksi from './produksi'
import ProduksiDetail from './ProduksiDetail.vue'
import { store } from '@/utils/store'
import utils from '@/utils/utils'
</script>
<script lang="ts">
export default {
    data() {
        return {
            config: {
                title: 'Produksi',
                child: true,
                permission: [
                    {title: 'Tambah Produksi', key: 'tambah', value: true, item: {endpoint: 'barang', title: 'Data Barang', child: true, left: ['nama_barang'], right: ['kode_barang']}, show: true},
                    {title: 'Detail Produksi', key: 'lihat', value: true},
                    {title: 'Batal Produksi', key: 'hapus', value: true},
                ],
                fields: [
                    {title: 'No Produksi', key: 'no_produksi', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tgl Produksi', key: 'tgl_produksi', type: 'date', show: true, sort: 'desc'},
                    {title: 'Kode Group', key: 'kode_group', type: 'text', show: true, sort: 'desc'},
                    {title: 'Bahan Baku', key: 'kode_bahan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Jumlah Bahan Baku', key: 'jumlah_bahan', type: 'number', show: true, sort: 'desc'},
                    {title: 'Barang Jadi', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Jumlah Barang Jadi', key: 'jumlah', type: 'number', show: true, sort: 'desc'},
                ],
                field_detail: [
                    {title: 'No Produksi', key: 'no_produksi', type: 'text', show: true, disabled: true},
                    {title: 'Tgl Produksi', key: 'tgl_produksi', type: 'date', show: true, rules: ['required', 'date:min '+utils.last_month(), 'date:max '+ utils.today()]},
                    {title: 'Kode Group', key: 'kode_group', type: 'dialog', rules: ['absolute', 'required'], item: {point: 'kode_group', item: [], title: 'Kode Group', child: false, left: ['kode_group']}, show: true},
                    // {title: 'Kode Group', key: 'kode_group', type: 'dialog', rules: ['absolute'], item: [], show: true, rules: ['required']},
                    {title: 'Kode Bahan', key: 'kode_bahan', type: 'dialog', rules: ['required kode_group', 'required'], item: {point: 'kode_barang', endpoint: 'group_barang?kode_group=', param: 'kode_group', title: 'Stok Barang', child: false, left: ['kode_barang'], right: ['stok_akhir']}, show: true},
                    // {title: 'Nama Bahan', key: 'nama_barang', type: 'text', show: true, rules: ['required']},
                    {title: 'Jumlah', key: 'jumlah_bahan', type: 'number', rules: ['max kode_group.stok_akhir', 'required'], show: true},
                ],
                dialog_field: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, rules: ['unique']},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true},
                    {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                ],
                filter: [
                    {title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', rules: ['date:max tgl_akhir']},
                    {title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', rules: ['date:min tgl_awal', 'date:max tgl_akhir']},
                ],
                // param: ['nilai']
            }
        }
    },
    methods: {
        async get () {
            let data = await produksi.produksi()
            this.config.field_detail[2].item.item = await produksi.kodegroup()
            store().$patch((state) => {
                state.items = data
                state.state = this.config
            })
            console.log(store().state);
            
        }
    },
    beforeMount() {
        return store().resetState()
    },
    async mounted() {
        this.get()
    }
}
</script>