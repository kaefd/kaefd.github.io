<template>
    <div class="bg-red-500 h-full w-full absolute left-0 bottom-0 z-[1]">
        <base-detail :config="config" @close="close" :h_items="items">
        <template #header-detail>
                <button @click="close()">
                    <i class="ri-arrow-left-line"></i>
                </button>
            </template>
            <template #header-content="h_field">
                <div class="h-[93%] w-full">
                    <base-table :title="config.title" :fields="h_field.h_field" :h_items="h_items" :show_filter="true" :filter="config.filter" :select_column="true" :export="false" :search="true" :items="items" :permission="config.permission" :s_table="true" @reqToReload="get"></base-table>
                </div>
            </template>
        </base-detail>
    </div>
</template>
<script setup>
import { store } from '@/utils/store'
import utils from '@/utils/utils'
import stokbarang from './stokbarang'
</script>
<script>
export default {
    props: {
        h_items: {type: Object}
    },
    data() {
        return {
            items: '',
            config: {
                title: "Log Barang",
                permission: {
                    create: false,
                    edit: false,
                    delete: false,
                    search: true,
                    select_column: true,
                    export: false,
                    filter: true,
                },
                fields: {
                    head: [
                        {title: 'Tanggal', key: 'tanggal', type: 'date', read: {show: true, disabled: true}, column: true, sort: 'asc'},
                        {title: 'Kode Group', key: 'kode_group', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Kategori', key: 'kategori', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'keterangan', key: 'keterangan', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Stok Awal', key: 'stok_awal', type: 'number', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Stok Masuk', key: 'stok_masuk', type: 'number', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Stok Keluar', key: 'stok_keluar', type: 'number', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        {title: 'Stok Akhir', key: 'stok_akhir', type: 'number', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                    ]
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
            store().loading = true
            this.items = await stokbarang.logBarang(this.h_items)
            store().loading = false
        },
        close() {
            this.$emit('close')
        }
    },
    mounted() {
        this.get()
    },
}
</script>