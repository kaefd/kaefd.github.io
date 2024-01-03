<template>
    <div class="h-full -mx-5 md:mx-0">
        <base-table :fields="config.fields" :items="items" :master="true" :permission="config" :s_table="true"></base-table>
    </div>
</template>
<script setup>
import { store } from '@/utils/store';
import track from './track';
</script>
<script>
export default {
    data() {
        return {
            items: '',
            config: {
                title: 'log produksi',
                child: false,
                permission: [],
                fields: [
                    {title: 'No Produksi', key: 'no_produksi', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tgl Produksi', key: 'tgl_produksi', type: 'date', show: true, sort: 'desc'},
                    {title: 'Kode Group', key: 'kode_group', type: 'text', show: true, sort: 'desc'},
                    {title: 'Bahan Baku', key: 'kode_bahan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Jumlah Bahan Baku', key: 'jumlah_bahan', type: 'number', show: true, sort: 'desc'},
                    {title: 'Bahan Jadi', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Jumlah Barang Jadi', key: 'jumlah_barang', type: 'number', show: true, sort: 'desc'},
                ],
                field_detail: false,
                dialog_field: false,
                filter: false
            }
        }
    },
    methods: {
        async get () {
            console.log(store().master);
            store().loader('on')
            // let data = await track.produksi(this.user)
            this.items = await track.produksi(this.user)
            if(this.items) store().loader('off')
        },
    },
    async mounted() {
        this.get()
    }
}
</script>