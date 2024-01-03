<template>
    <div class="h-full w-full ps-3 md:ps-24 pe-3 md:pe-0 top-0 left-0 absolute overflow-hidden">
        <div class="rounded-xl w-full h-full mt-5 p-5" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
            <div class="flex items-center space-x-3 text-lg md:text-xl mb-5">
                <button @click="close()">
                    <i class="ri-arrow-left-line"></i>
                </button>
                <span class="font-semibold capitalize">Detail Log Barang</span>
            </div>
            <!-- <div class="flex items-center justify-center md:justify-end space-x-2 w-full">
                <div class="flex space-x-2 items-center">
                    <button @click="filter = !filter" class="h-[40px] w-[40px] rounded-full hover:bg-primary-hover"><i
                            class="ri-filter-line text-primary text-base"></i></button>
                </div>
            </div>
            <base-filter :fields="store().state.filter" :column="false" :items="store().items"></base-filter> -->
            <div class="h-[95%] md:h-full -mx-5">
                <base-table :fields="config.fields" :items="items" :master="true" :s_table="s_table">
                    <template #tb-detail>
                        <span></span>
                    </template>
                </base-table>
            </div>
        </div>
    </div>
</template>
<script setup>
import {store} from '@/utils/store'
import stokbarang from '@/views/laporan/stokbarang'
</script>
<script>
export default {
    props: {config: {type: Object}, items: {type: Array}},
    data() {
        return {
            s_table: true,
            items: '',
            filter: false,
            config: {
                fields: [
                    {title: 'Tanggal', key: 'tanggal', type: 'date', show: true},
                    {title: 'Kode Group', key: 'kode_group', type: 'text', show: true},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true},
                    {title: 'Kategori', key: 'kategori', type: 'text', show: true},
                    {title: 'Keterangan', key: 'keterangan', type: 'text', show: true},
                    {title: 'Stok Awal', key: 'stok_awal', type: 'number', show: true},
                    {title: 'Stok Masuk', key: 'stok_masuk', type: 'number', show: true},
                    {title: 'Stok Keluar', key: 'stok_keluar', type: 'number', show: true},
                    {title: 'Stok Akhir', key: 'stok_akhir', type: 'number', show: true},
                ],
                filter: [
                    {title: 'Tanggal Awal', key: 'tgl_awal', type: 'date'},
                    {title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date'},
                ],
            }
        }
    },
    methods: {
        async get() {
            // store().loader('on')
            // let data = await stokbarang.logBarang()
            // if(data) store().loader('off')
            // store().$patch((state) => {
            //     state.items = data
            //     state.state = this.config
            //     // state.menu.option = ''
            //     // state.detail_dialog = false
            //     // state.filter = false
            //     // state.column = false
            // })
            this.items = await stokbarang.logBarang()
        },
        close() {
            store().$patch((state) => state.dialog = false)
        }
    },
    mounted() {
        this.get()
    },
}
</script>