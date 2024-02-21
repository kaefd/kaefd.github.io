<template>
    <base-table :fields="config.fields" :items="store().detail || passItem" :master="s_table"
        :dialog_field="d_field || store().state.dialog_field" :s_table="s_table" :custom="custom">
        <template #body-row>
            <slot name="body-table"></slot>
        </template>
    </base-table>
</template>
<script setup>
import { store } from '@/utils/store'
import lapbc from '@/views/laporan/lapbc';
</script>
<script>
export default {
    props: ['passItem', 'd_field', 's_table', 'custom'],
    data() {
        return {
            items: this.passItem,
            config: {
                title: 'Detail Pengiriman Barang',
                fields: [
                    { title: 'No Penjualan', key: 'no_penjualan', type: 'text', show: true },
                    { title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', show: true },
                    { title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true },
                    { title: 'Kode Group', key: 'kode_group', type: 'text', show: true },
                    { title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true },
                    { title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true },
                    { title: 'Jumlah', key: 'jumlah', type: 'number', show: true },
                    { title: 'Satuan', key: 'satuan', type: 'text', show: true },
                    // {title: 'Kode Konversi', key: 'kode_konversi', type: 'text', show: true},
                    // {title: 'Nama Konversi', key: 'nama_konversi', type: 'text', show: true},
                    { title: 'Jumlah Konversi', key: 'jumlah_konversi', type: 'number', show: true },
                    { title: 'Satuan Konversi', key: 'satuan_konversi', type: 'text', show: true },
                ],
                field_detail: false,
                filter: false,
            }
        }
    },
    methods: {
        get() {
            // console.log(store().master);
            // if (this.$router.currentRoute.value.path == '/laporan/laporan-bc') {
            //     if (this.items.no_pengiriman) {
            //         const item = await lapbc.content_detail(this.items.no_pengiriman)
            //         console.log(item);
            //         store().$patch((state) => {
            //             state.detail = item
            //         })
            //     }
            // }

        },
    },
    mounted() {
    }
}
</script>