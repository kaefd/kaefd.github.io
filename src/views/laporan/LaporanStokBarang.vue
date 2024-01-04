<template>
    <base-page :config="config">
        <template #header-content>
            <DetailBarang/>    
        </template>
    </base-page>
</template>
<script setup>
import DetailBarang from './DetailBarang.vue';
import stokbarang from './stokbarang'
import { store } from '@/utils/store'
import utils from '@/utils/utils';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Data Barang',
                child: false,
                permission: [
                    {title: 'Detail Data', key: 'lihat', value: true},
                ],
                fields: [
                    {title: 'Kategori Barang', key: 'kategori_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'HS Kode', key: 'hs_code', type: 'text', show: true, sort: 'desc'},
                    {title: 'Satuan', key: 'satuan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Stok Akhir', key: 'stok_akhir', type: 'text', show: true, sort: 'desc'},
                ],
                field_detail: [
                    {title: 'Kode Group', key: 'kode_group', type: 'text', show: true},
                    {title: 'Kategori Barang', key: 'kategori_barang', type: 'text', show: true},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true},
                    {title: 'HS Kode', key: 'hs_code', type: 'text', show: true},
                    {title: 'Satuan', key: 'satuan', type: 'text', show: true},
                    {title: 'Stok Akhir', key: 'stok_akhir', type: 'number', show: true},
                ],
                filter: [
                    {title: 'Periode', key: 'periode', type: 'date', rules: ['date:max '+ utils.today()]},
                    {title: 'Kategori Barang', key: 'kategori_barang', type: 'checkbox', item: [
                        {title: 'Bahan Baku', key: 'bahan_baku', show: true},
                        {title: 'Bahan Penolong', key: 'bahan_penolong', show: true},
                        {title: 'Barang Setengah Jadi', key: 'barang_setengah_jadi', show: true},
                        {title: 'Barang Jadi', key: 'barang_jadi', show: true},
                        {title: 'Barang Sisa (Scrap)', key: 'scrap', show: true},
                        {title: 'Mesin & Peralatan', key: 'peralatan', show: true}
                    ]},
                    {title: 'Kode Group', key: 'kode_group', type: 'option', item: [], show: true},
                ],
            }
        }
    },
    methods: {
        async get () {
            store().loader('on')
            let data = await stokbarang.barang()
            let kode_group = await stokbarang.kode_group()
            this.config.filter[2].item = kode_group
            if(data) store().loader('off')
            store().$patch((state) => { state.state = this.config })
        },
    },
    beforeMount() {
        store().resetState()
    },
    mounted() {
        this.get()
    },
}
</script>