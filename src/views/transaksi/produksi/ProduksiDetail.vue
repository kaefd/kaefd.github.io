<template>
    <base-table :fields="config.fields" :items="store().detail" :master="false" :dialog_field="store().state.dialog_field"></base-table>
</template>
<script setup>
import { store } from '@/utils/store'
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Detail Produksi Barang',
                fields: [
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true},
                        {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true},
                        {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                        {title: 'Satuan', key: 'satuan', type: 'text', show: true},
                        // {title: 'Nama Konversi', key: 'nama_konversi', type: 'text', show: true},
                        // {title: 'Kode Konversi', key: 'kode_konversi', type: 'text', show: true},
                        // {title: 'Jumlah Konversi', key: 'jumlah_konversi', type: 'text', show: true},
                        // {title: 'Satuan Konversi', key: 'satuan_konversi', type: 'text', show: true},
                ],
                field_detail: false,
                filter: false,
                items: ''
            }
        }
    },
}
</script>