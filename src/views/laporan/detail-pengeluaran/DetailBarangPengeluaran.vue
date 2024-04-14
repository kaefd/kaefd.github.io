<template>
    <div class="absolute z-[1] top-0 left-0 w-full h-full">
        <base-detail :config="config" @close="close" :h_items="h_items" :d_items="item">
            <template #header-detail>
                <button @click="close()">
                    <i class="ri-arrow-left-line"></i>
                </button>
            </template>
            <template #rowtbl="items">
                <tr v-for="itm, i in items.items" @dblclick="openDetail(itm, items.header)" class="w-full flex items-center break-words" :class="(store().dark ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'), (items.header.length > 1 ? 'justify-around' : 'justify-between'), s_table ? 'cursor-default' : 'cursor-pointer', rowActive[i] == true ? (store().dark ? 'bg-dark-hover' : 'bg-gray-100') : ''">
                    <td v-for="field, f in items.header" scope="row" class="px-6 py-3 w-[15%] min-w-[100px] whitespace-pre-wrap capitalize">
                        {{ field.type == 'number' ? (itm[field.key] > 0 ? utils.numb(itm[field.key]) : 0) : (field.type == 'date' ? utils.formatDate(itm[field.key]) : itm[field.key]) }}
                    </td>
                </tr>
            </template>
        </base-detail>
    </div>
    <template v-if="open_detail">
        <div class="bg-red-500 absolute h-full w-full top-0 left-0 bottom-0 z-30">
            <DetailPengiriman :h_items="head" :h_field="h_field" @close="closed" />
        </div>
    </template>
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
    props: {h_items: {type: Object}},
    data() {
        return {
            item: '',
            rowActive: [],
            open_detail: false,
            head: '',
            h_field: '',
            config: {
                title: 'Pengeluaran',
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
                        // {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        // {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        // {title: 'Jumlah', key: 'jumlah', type: 'number', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Status', key: 'status', type: 'text', show: false, read: {show: false, disabled: true}, column: true, sort: 'desc'},
                    ],
                    detail: [
                        {title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'asc'},
                        {title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date',  read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Supir', key: 'supir', type: 'text', show: true, read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'No Polisi', key: 'no_polisi', type: 'text',  read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text',  read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Jumlah', key: 'jumlah', type: 'number',  read: {show: true, disabled: true}, column: true, sort: 'desc'},
                    ],
                },
                filter: [
                    { title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', show: true, default: store().periode[0], rules: ['date:max tgl_akhir'] },
                    { title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', show: true, default: store().periode[1], rules: ['date:min tgl_awal', 'date:max ' + utils.today()] },
                ],
                tbl_footer: [
                    { title: 'Jumlah', key: 'jumlah', type: 'number', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false} },
                ]
            }
        }
    },
    methods: {
        async get() {
            // const check = otoritas.check('Pengiriman')
            // if(!check) return this.$router.push('/')
            this.item = await pengeluaran.getDetailPJL(this.h_items)
        },
        close() {
            this.$emit('close')
        },
        openDetail(item, header) {
            this.head = item
            this.detail = item
            this.h_field = header
            this.open_detail = true
        },
        closed() {
            this.open_detail = false
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