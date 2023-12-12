<template>
    <base-table :fields="config.fields" :items="store().detail" :master="false" :dialog_field="config.dialog_field"></base-table>
</template>
<script setup lang="ts">
import { store } from '@/utils/store'
</script>
<script lang="ts">
export default {
    data() {
        return {
            config: {
                title: 'Pemasukan Barang',
                permission: [
                    {title: 'Tambah Data', key: 'tambah', value: true},
                    {title: 'Detail Pemasukan', key: 'lihat', value: true},
                    {title: 'Batal Pemasukan', key: 'batal', value: false},
                ],
                fields: [
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true},
                        {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true},
                        {title: 'HS Code', key: 'hs_code', type: 'text', show: true},
                        {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                        {title: 'Jumlah Diterima', key: 'jumlah_diterima', type: 'number', show: true},
                        {title: 'Satuan', key: 'satuan', type: 'text', show: true},
                        {title: 'Total Nilai', key: 'nilai', type: 'number', show: true}
                ],
                dialog_field: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true},
                    {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                    {title: 'Jumlah Diterima', key: 'jumlah_diterima', type: 'number', show: true},
                    {title: 'Total Nilai', key: 'nilai', type: 'number', show: true}
                ],
                field_detail: false,
                filter: false,
            }
        }
    },
}
</script>