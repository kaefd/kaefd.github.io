<template>
    <div class="h-full w-full ps-3 md:ps-[7.2rem] pe-3 top-0 left-0 absolute overflow-hidden">
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
            <div class="h-[95%] md:h-full w-full">
                <div class="w-full flex flex-wrap justify-end">
                    <div v-for="(fl, i) in config.filter" class="w-full md:w-fit flex flex-col flex-wrap">
                        <span class="capitalize">{{ fl.title }}</span>
                        <base-input :type="fl.type" :rules="fl.rules" :label="fl.key" :value="store().periode[i]" @input="input"></base-input>
                    </div>
                </div>
                <div class="h-[73%] md:h-[85%] w-full">
                    <base-table :fields="config.fields" :permission="config" :items="items" :master="true" :s_table="true">
                        <template #tb-detail>
                            <span></span>
                        </template>
                    </base-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {store} from '@/utils/store'
import stokbarang from '@/views/laporan/stokbarang'
import utils from '@/utils/utils';
</script>
<script>
export default {
    props: {config: {type: Object}},
    data() {
        return {
            items: '',
            filter: false,
            config: {
                permission: [],
                fields: [
                    {title: 'Tanggal', key: 'tanggal', type: 'date', show: true, sort: 'desc'},
                    {title: 'Kode Group', key: 'kode_group', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kategori', key: 'kategori', type: 'text', show: true, sort: 'desc'},
                    {title: 'Keterangan', key: 'keterangan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Stok Awal', key: 'stok_awal', type: 'number', show: true, sort: 'desc'},
                    {title: 'Stok Masuk', key: 'stok_masuk', type: 'number', show: true, sort: 'desc'},
                    {title: 'Stok Keluar', key: 'stok_keluar', type: 'number', show: true, sort: 'desc'},
                    {title: 'Stok Akhir', key: 'stok_akhir', type: 'number', show: true, sort: 'desc'},
                ],
                filter: [
                    {title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', rules: ['date:max tgl_akhir']},
                    {title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', rules: ['date:min tgl_awal', 'date:max '+utils.today()]},
                ],
            }
        }
    },
    computed: {
    },
    methods: {
        async get() {
            this.items = await stokbarang.logBarang()
        },
        input(v) {
            if(v.title == 'tgl_awal') store().periode[0] = v.value
            if(v.title == 'tgl_akhir') store().periode[1] = v.value
            this.get()
        },
        close() {
            store().$patch((state) => {
                state.dialog = false
                state.periode = [utils.last_month(), utils.today()]
            })
        }
    },
    mounted() {
        this.get()
    },
}
</script>