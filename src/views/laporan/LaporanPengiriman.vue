<template>
    <base-page :config="config">
        <template #base-detail>
            <PengirimanDetail></PengirimanDetail>
        </template>
    </base-page>
</template>
<script setup lang="ts">
import pengiriman from '@/views/pengiriman/pengiriman'
import PengirimanDetail from '@/views/pengiriman/PengirimanDetail.vue'
import { store } from '@/utils/store'
</script>
<script lang="ts">
export default {
    data() {
        return {
            config: {
                title: 'Laporan Pengiriman Barang',
                child: true,
                permission: [
                    {title: 'Detail Pengiriman', key: 'lihat', value: true},
                ],
                fields: [
                    {title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date', show: true, sort: 'desc'},
                    {title: 'Pelanggan', key: 'pelanggan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Group', key: 'kode_group', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Satuan', key: 'satuan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tujuan Bongkar', key: 'tujuan_bongkar', type: 'text', show: true, sort: 'desc'},
                    {title: 'Supir', key: 'supir', type: 'text', show: true, sort: 'desc'},
                    {title: 'No Polisi', key: 'no_polisi', type: 'text', show: true, sort: 'desc'},
                ],
                field_detail: [
                    {title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', show: true},
                    {title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date', show: true},
                    {title: 'Pelanggan', key: 'pelanggan', type: 'dialog', item: {point: 'nama', endpoint: 'pelanggan', title: 'Data Pelanggan', child: false, left: ['nama']}, show: true},
                    {title: 'Tujuan Bongkar', key: 'tujuan_bongkar', type: 'dialog', item: {point: 'nama', endpoint: 'alamat_bongkar', title: 'Alamat Bongkar', child: false, leftCustom: [
                        {content: ['nama']},
                        {content: ['alamat', 'kabupaten'], separate: '-'},
                    ]}, show: true},
                    {title: 'Supir', key: 'supir', type: 'text', show: true},
                    {title: 'No Polisi', key: 'no_polisi', type: 'text', show: true},
                ],
                dialog_field: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true},
                    {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                    {title: 'Jumlah Konversi', key: 'jumlah_konversi', type: 'number', show: true},
                ],
                filter: [
                    {title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', rules: ['date:max tgl_akhir']},
                    {title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', rules: ['date:min tgl_awal', 'date:max tgl_akhir']},
                ],
            }
        }
    },
    methods: {
        async get () {
            store().loader('on')
            let data = await pengiriman.pengiriman()
            if(data) store().loader('off')
            store().$patch((state) => {
                state.items = data
                state.state = this.config
            })
        }
    },
    beforeMount() {
        return store().resetState()
    },
    async mounted() {
        this.get()
    }
}
</script>