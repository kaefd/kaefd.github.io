<template>
    <div class="w-full h-full flex">
        <base-page :config="config">
            <template #row-table="items">
                <tr v-for="item, i in items.items" @dblclick="openDetail(item, items.header)" class="w-full flex items-center break-words" :class="(store().dark ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'), (items.header.length > 1 ? 'justify-around' : 'justify-between'), s_table ? 'cursor-default' : 'cursor-pointer', rowActive[i] == true ? (store().dark ? 'bg-dark-hover' : 'bg-gray-100') : ''">
                    <td v-for="field, f in items.header" scope="row" class="px-6 py-3 w-[15%] min-w-[100px] whitespace-pre-wrap capitalize">
                        {{ field.type == 'number' ? (item[field.key] > 0 ? utils.numb(item[field.key]) : 0) : (field.type == 'date' ? utils.formatDate(item[field.key]) : item[field.key]) }}
                    </td>
                </tr>
            </template>
        </base-page>
         <!-- CUSTOM DETAIL -->
         <div v-if="open_detail">
            <DetailPengiriman v-if="open_detail" :h_items="head" :h_field="h_field" @close="close" />
         </div>
    </div>
</template>

<script setup>
import otoritas from '@/router/otoritas';
import { store } from '@/utils/store'    
import utils from '@/utils/utils'    
import pengeluaran from './pengeluaran';
import DetailPengiriman from './DetailPengiriman.vue';
</script>
<script>
export default {
    data() {
        return {
            rowActive: [],
            open_detail: false,
            h_field: '',
            head: '',
            config: {
                title: 'Laporan Detail Pengeluaran',
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
                        {title: 'No Pengeluaran', key: 'no_penjualan', type: 'text', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Tgl Keluar', key: 'tgl_penjualan', type: 'date', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Kode Group', key: 'kode_group', type: 'text', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Jumlah', key: 'jumlah', type: 'number', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Status', key: 'status', type: 'text', show: true, read: {show: false, disabled: true}, column: true, sort: 'desc'},
                    ],
                    detail: [
                        {title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'asc'},
                        {title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date',  read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Pelanggan', key: 'pelanggan', type: 'text',  read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Tujuan Bongkar', key: 'tujuan_bongkar', type: 'text', show: '', sort: 'desc'},
                        {title: 'Supir', key: 'supir', type: 'text',  read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'No Polisi', key: 'no_polisi', type: 'text',  read: {show: true, disabled: true}, column: true, sort: 'desc'},
                    ],
                },
                filter: [
                { title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', show: true, default: store().periode[0], rules: ['date:max tgl_akhir'] },
                    { title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', show: true, default: store().periode[1], rules: ['date:min tgl_awal', 'date:max ' + utils.today()] },
                    { title: 'Tipe Dokumen', key: 'tipe_dokumen', show: true, type: 'checkbox', item: [
                        {title: 'BC25', key: 'BC25', value: true},
                        {title: 'BC41', key: 'BC41', value: true},
                    ]},
                    { title: 'Status', key: 'status', show: true, type: 'option', rules: ['required'], default: {title: 'semua', key: 'semua', value: true}, item: [
                        {title: 'Semua', key: 'semua'},
                        {title: 'Menunggu', key: 'open'},
                        {title: 'Selesai', key: 'close'},
                    ]},
                ],
            }
        }
    },
    methods: {
        async get() {
            const check = otoritas.check(this.config.title)
            if(!check) return this.$router.push('/')
            const data = await pengeluaran.pengeluaran(null, this.config.fields.head[0])
            store().data.items = data
        },
        openDetail(item, header) {
            this.head = item
            this.h_field = header
            this.open_detail = true
        },
        close() {
            this.open_detail = false
        }
    },
    beforeMount() {
        store().resetState()
    },
    mounted() {
        this.get()
        store().init()
    }
}
</script>./detail-pengeluaran./pengeluaran