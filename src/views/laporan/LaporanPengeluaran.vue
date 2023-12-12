<template>
    <base-page :config="config">
        <template #base-detail>
            <PengeluaranDetail></PengeluaranDetail>
        </template>
    </base-page>
</template>
<script setup lang="ts">
import pengeluaran from '@/views/pengeluaran/pengeluaran'
import PengeluaranDetail from '@/views/pengeluaran/PengeluaranDetail.vue'
import { store } from '@/utils/store'
</script>
<script lang="ts">
export default {
    data() {
        return {
            config: {
                title: 'Laporan Pengeluaran Barang',
                child: true,
                permission: [
                    {title: 'Detail Pengeluaran', key: 'lihat', value: true},
                ],
                fields: [
                    {title: 'No Pengeluaran', key: 'no_penjualan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tgl Keluar', key: 'tgl_penjualan', type: 'date', show: true, sort: 'desc'},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tgl Dokumen', key: 'tgl_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'Pelanggan', key: 'pelanggan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Group', key: 'kode_group', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Hs Kode', key: 'hs_code', type: 'text', show: true, sort: 'desc'},
                    {title: 'Satuan', key: 'satuan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Jumlah', key: 'jumlah', type: 'text', show: true, sort: 'desc'},
                    {title: 'Total Penjualan', key: 'total_penjualan', type: 'number', show: true, sort: 'desc'},
                ],
                field_detail: [
                    {title: 'No Pengeluaran', key: 'no_penjualan', type: 'text', show: true, disabled: true},
                    {title: 'Tgl Keluar', key: 'tgl_penjualan', type: 'date', show: true},
                    {title: 'Pelanggan', key: 'pelanggan', type: 'dialog', item: {point: 'nama', endpoint: 'pelanggan', title: 'Data Pelanggan', child: false, left: ['nama']}, show: true},
                    {title: 'Tgl Dokumen', key: 'tgl_dokumen', type: 'date', show: true},
                    {title: 'Kode Group', key: 'kode_group', type: 'dialog', item: {point: 'kode_group', endpoint: 'group_barang', title: 'Kode Group', child: false, left: ['kode_group']}, show: true},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'option', item: ['BC25', 'BC41'], show: true},
                    {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true},
                ],
                dialog_field: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true},
                    {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                    {title: 'Harga Jual', key: 'harga_jual', type: 'number', show: true},
                    {title: 'Total Harga', key: 'total_harga', type: 'number', show: true}
                ],
                filter: [
                    {title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', rules: ['date:max tgl_akhir']},
                    {title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', rules: ['date:min tgl_awal', 'date:max tgl_akhir']},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'checkbox', item: [
                        {title: 'BC25', key: 'BC25', show: true},
                        {title: 'BC41', key: 'BC41', show: true},
                    ]},
                    {title: 'Status', key: 'status', type: 'checkbox', item: [
                        {title: 'Menunggu', key: 'open', show: true},
                        {title: 'Selesai', key: 'close', show: true},
                    ]},
                ],
                param: ['harga']
            }
        }
    },
    methods: {
        async get () {
            store().loader('on')
            let data = await pengeluaran.pengeluaran()
            if(data) store().loader('off')
            store().$patch((state) => {
                state.items = data
                state.state = this.config
            })
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