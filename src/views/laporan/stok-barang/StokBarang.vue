<template>
    <div class="w-full h-full">
        <base-page :config="config">
            <template #header-content="items">
                <DetailBarang v-if="otoritas.check('Detail Stok Barang')" :items="items.items"></DetailBarang>
            </template>
        </base-page>
         <!-- CUSTOM DETAIL -->
    </div>
</template>

<script setup>
import otoritas from '@/router/otoritas';
import { store } from '@/utils/store'    
import utils from '@/utils/utils'    
import stokbarang from './stokbarang';
import DetailBarang from './DetailBarang.vue';
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
                title: 'Laporan Stok Barang',
                child: true,
                permission: {
                    create: false,
                    edit: false,
                    delete: false,
                    search: true,
                    select_column: true,
                    export: otoritas.groupCheck('export'),
                    filter: true,
                },
                fields: {
                    head: [
                        {title: 'Kategori Barang', key: 'kategori_barang', type: 'text', show: true, read: {show: true, disabled: true}, sort: 'desc', column: true},
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, read: {show: true, disabled: true}, sort: 'desc', column: true},
                        {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, read: {show: true, disabled: true}, sort: 'desc', column: true},
                        {title: 'HS Kode', key: 'hs_code', type: 'text', show: true, read: {show: true, disabled: true}, sort: 'desc', column: true},
                        {title: 'Satuan', key: 'satuan', type: 'text', show: true, read: {show: true, disabled: true}, sort: 'desc', column: true},
                        {title: 'Stok Akhir', key: 'stok_akhir', type: 'text', show: true, read: {show: true, disabled: true}, sort: 'desc', column: true},
                    ],
                },
                filter: [
                    {title: 'Tanggal', key: 'tanggal', type: 'date', show: true, default:'', rules: ['date:max '+ utils.today()] },
                    {title: 'Kode Group', key: 'kode_group', type: 'option', item: [{key: 'semua', title: 'Semua'}], default: {key: 'semua', title: 'Semua'}, show: true, rules: ['required']},
                    {title: 'Kategori Barang', key: 'kategori_barang', type: 'checkbox', show: true, item: [
                        {title: 'Bahan Baku', key: 'bahan_baku', value: true},
                        {title: 'Bahan Penolong', key: 'bahan_penolong', value: true},
                        {title: 'Barang Setengah Jadi', key: 'barang_setengah_jadi', value: true},
                        {title: 'Barang Jadi', key: 'barang_jadi', value: true},
                        {title: 'Barang Sisa (Scrap)', key: 'scrap', value: true},
                        {title: 'Mesin & Peralatan', key: 'peralatan', value: true}
                    ]},
                ],
            }
        }
    },
    methods: {
        async get() {
            const check = otoritas.check(this.config.title)
            if(!check) return this.$router.push('/')
            const data = await stokbarang.stokbarang()
            let kode_group = await stokbarang.kode_group()
            this.config.filter[1].item = this.config.filter[1].item.concat(kode_group)
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
</script>