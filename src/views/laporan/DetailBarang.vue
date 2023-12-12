<template>
    <base-table :fields="config.fields" :items="items" :master="true">
        <template #tb-detail>
            <LogBarang v-if="store().dialog" :config="config" :items="items" />
        </template>
    </base-table>
</template>
<script setup lang="ts">
import LogBarang from './LogBarang.vue';
import stokbarang from './stokbarang'
import { store } from '@/utils/store'
</script>
<script lang="ts">
export default {
    // props: {config: {type: Object}},
    data() {
        return {
            items: '',
            config: {
                title: 'Data Barang',
                child: false,
                permission: [
                    {title: 'Detail Data', key: 'lihat', value: true},
                ],
                fields: [
                    {title: 'Kode Group', key: 'kode_group', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kategori Barang', key: 'kategori_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'HS Kode', key: 'hs_code', type: 'text', show: true, sort: 'desc'},
                    {title: 'Satuan', key: 'satuan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Stok Akhir', key: 'stok_akhir', type: 'number', show: true, sort: 'desc'},
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
        async get() {
            // store().loader('on')
            // let data = await stokbarang.detail()
            // if(data) store().loader('off')
            // store().$patch((state) => {
            //     state.dialog = false
            // })
            this.items = await stokbarang.detail()
        }
    },
    beforeMount() {
        // store().resetState()
    },
    mounted() {
        this.get()
    },
}
</script>