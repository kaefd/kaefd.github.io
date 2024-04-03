<template>
    <base-detail :config="config" @close="close" :h_items="h_items" :d_items="[h_items]">
        <template #header-detail>
            <button @click="close()">
                <i class="ri-arrow-left-line"></i>
            </button>
        </template>
    </base-detail>
</template>

<script setup>
import otoritas from '@/router/otoritas';
import { store } from '@/utils/store'    
import utils from '@/utils/utils'    
import pengiriman from '@/views/transaksi/pengiriman/pengiriman.js';
</script>
<script>
export default {
    props: {h_items: {type: Object}},
    data() {
        return {
            items: '',
            config: {
                title: 'Pengiriman',
                child: true,
                permission: {
                    create: false,
                    edit: false,
                    delete: false,
                    search: true,
                    select_column: true,
                    export: otoritas.groupCheck('export'),
                    filter: true,
                    select_column: true,
                },
                fields: {
                    head: [
                        { title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc' },
                        { title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date', read: {show: true, disabled: true}, column: true, sort: 'desc' },
                        { title: 'Pelanggan', key: 'pelanggan', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc' },
                        {
                            title: 'Tujuan Bongkar', key: 'tujuan_bongkar', type: 'text', read: {show: otoritas.check('Alamat Bongkar'), disabled: true}, column: otoritas.check('Alamat Bongkar'), sort: 'desc'
                        },
                        { title: 'Supir', key: 'supir', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc' },
                        { title: 'No Polisi', key: 'no_polisi', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc' },
                    ],
                    detail: [
                        { title: 'No Penjualan', key: 'no_penjualan', type: 'text', read: {show: true, disabled: true}, column: true, dialog: false, sort: 'desc' },
                        { title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', read: {show: true, disabled: true}, column: true, dialog: false, sort: 'desc' },
                        { title: 'No Dokumen', key: 'no_dokumen', type: 'text', read: {show: true, disabled: true}, column: true, dialog: false, sort: 'desc' },
                        { title: 'Kode Group', key: 'kode_group', type: 'text', read: {show: true, disabled: true}, column: true, dialog: false, sort: 'desc' },
                        { title: 'Kode Barang', key: 'kode_barang', type: 'text', read: {show: true, disabled: true}, column: true, dialog: true, sort: 'desc' },
                        { title: 'Nama Barang', key: 'nama_barang', type: 'text', read: {show: true, disabled: true}, column: true, dialog: true, sort: 'desc' },
                        { title: 'Jumlah', key: 'jumlah', type: 'number', read: {show: true, disabled: true}, column: true, dialog: true, sort: 'desc' },
                        { title: 'Satuan', key: 'satuan', type: 'text', read: {show: true, disabled: true}, column: true, dialog: false, sort: 'desc' },
                        { title: 'Jumlah Konversi', key: 'jumlah_konversi', type: 'number', read: {show: true, disabled: true}, column: true, dialog: true, sort: 'desc' },
                        { title: 'Satuan Konversi', key: 'satuan_konversi', type: 'text', read: {show: true, disabled: true}, column: true, dialog: true, sort: 'desc' },
                    ],
                },
                filter: [
                    { title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', show: true, default: store().periode[0], rules: ['date:max tgl_akhir'] },
                    { title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', show: true, default: store().periode[1], rules: ['date:min tgl_awal', 'date:max ' + utils.today()] },
                ],
                tbl_footer: [
                    { title: 'Jumlah', key: 'jumlah', type: 'number', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false} },
                    { title: 'Jumlah Konversi', key: 'jumlah_konversi', type: 'number', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false} },
                ]
            }
        }
    },
    methods: {
        async get() {
            // const check = otoritas.check('Pengiriman')
            // if(!check) return this.$router.push('/')
            const data = await pengiriman.getDetail(this.h_items)
            this.items = data
        },
        close() {
            this.$emit('close')
        }
    },
    // beforeMount() {
    //     store().resetState()
    // },
    mounted() {
        this.get()
        // store().init()
    }
}
</script>