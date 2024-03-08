<template>
    <div class="w-full h-[93%]">
        <base-table :title="config.title" :fields="config.fields.head" :show_filter="false" :select_column="true" :export="false" :search="true" :items="items" :permission="config.permission" @openDetail="resTable">
            <template #body-row="items">
                <tr v-for="item, i in items.items" @dblclick="openDetail(item, items.header)" class="w-full flex items-center break-words" :class="(store().dark ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'), (items.header.length > 1 ? 'justify-around' : 'justify-between'), s_table ? 'cursor-default' : 'cursor-pointer', rowActive[i] == true ? (store().dark ? 'bg-dark-hover' : 'bg-gray-100') : ''">
                    <td v-for="field, f in items.header" scope="row" class="px-6 py-3 w-[15%] min-w-[100px] whitespace-pre-wrap capitalize">
                        {{ field.type == 'number' ? (item[field.key] > 0 ? utils.numb(item[field.key]) : 0) : (field.type == 'date' ? utils.formatDate(item[field.key]) : item[field.key]) }}
                    </td>
                </tr>
            </template>
        </base-table>
        <!-- CUSTOM DETAIL -->
        <div v-if="open_detail">
            <DetailLogBarang v-if="open_detail" :h_items="head" :h_field="h_field" @close="close" />
         </div>
    </div>
</template>
<script setup>
import utils from '@/utils/utils';
import stokbarang from './stokbarang'
import { store } from '@/utils/store';
import DetailLogBarang from './DetailLogBarang.vue';
</script>
<script>
    export default {
        props: {
            items: {type: Object}
        },
        data() {
            return {
                rowActive: [],
                open_detail: false,
                h_field: '',
                head: '',
                config: {
                    title: "Detail Stok Barang",
                    permission: {
                        create: false,
                        edit: false,
                        delete: false,
                        search: true,
                        select_column: true,
                        export: false,
                        filter: false,
                    },
                    fields: {
                        head: [
                            {title: 'Kode Group', key: 'kode_group', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                            {title: 'Kategori Barang', key: 'kategori_barang', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                            {title: 'Kode Barang', key: 'kode_barang', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                            {title: 'Nama Barang', key: 'nama_barang', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                            {title: 'HS Kode', key: 'hs_code', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                            {title: 'Satuan', key: 'satuan', type: 'text', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                            {title: 'Stok Akhir', key: 'stok_akhir', type: 'number', read: {show: true, disabled: true}, column: true, sort: 'desc'},
                        ],
                    },
                }
            }
        },
        methods: {
            openDetail(item, header) {
                this.head = item
                this.h_field = header
                this.open_detail = true
            },
            close() {
                this.open_detail = false
            }
        },
        mounted() {
        },
    }
</script>