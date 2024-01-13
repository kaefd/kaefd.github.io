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
                title: 'Pengeluaran Barang',
                fields: [
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true},
                        {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true},
                        {title: 'HS Code', key: 'hs_code', type: 'text', show: true},
                        {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                        {title: 'Jumlah Terkirim', key: 'jumlah_terkirim', type: 'number', show: true},
                        {title: 'Satuan', key: 'satuan', type: 'text', show: true},
                        {title: 'Harga Jual', key: 'harga_jual', type: 'number', show: true},
                        {title: 'Total Harga', key: 'total_harga', type: 'number', show: true}
                ],
                field_detail: false,
                filter: false,
                items: ''
            }
        }
    },
}
</script>