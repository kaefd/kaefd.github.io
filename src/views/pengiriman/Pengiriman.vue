<template>
    <base-page :config="config">
        <template #base-detail>
            <PengirimanDetail></PengirimanDetail>
        </template>
        <template #left="data_left">
            <div class="flex flex-col py-2">
                <span class="font-semibold">{{data_left.data_left.nopen}}</span>
                <div class="flex space-x-2">{{ data_left.data_left.nama_barang + ' (' + data_left.data_left.kode_group + ')' }}</div>
                <span>belum terkirim: {{ utils.numb(data_left.data_left.belum_terkirim) }}</span>
                <span>stok barang: {{ utils.numb(data_left.data_left.stok_akhir) }}</span>
            </div>
        </template>
    </base-page>
</template>
<script setup>
import pengiriman from './pengiriman'
import PengirimanDetail from './PengirimanDetail.vue'
import { store } from '@/utils/store'
import utils from '@/utils/utils'
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Pengiriman',
                child: true,
                permission: [
                    {title: 'Tambah Pengiriman', key: 'tambah', item: {title: 'Penjualan Belum Terkirim', item: '', child: true, left: ['nopen'], right: ['no_penjualan']}},
                    {title: 'Detail Pengiriman', key: 'lihat', value: true},
                    {title: 'Cetak Surat Jalan', key: 'suratjalan', value: true},
                    {title: 'Cetak DO', key: 'do', value: true},
                    {title: 'Batal Pengiriman', key: 'hapus', value: true},
                ],
                fields: [
                    {title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date', show: true, sort: 'desc'},
                    {title: 'Pelanggan', key: 'pelanggan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tujuan Bongkar', key: 'tujuan_bongkar', type: 'text', show: true, sort: 'desc'},
                    {title: 'Supir', key: 'supir', type: 'text', show: true, sort: 'desc'},
                    {title: 'No Polisi', key: 'no_polisi', type: 'text', show: true, sort: 'desc'},
                ],
                field_detail: [
                    {title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', show: true, rules: ['required']},
                    {title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date', show: true, rules: ['required', 'date:min '+utils.last_month(), 'date:max '+ utils.today()]},
                    {title: 'Pelanggan', key: 'pelanggan', type: 'dialog', item: {point: 'nama', endpoint: 'pelanggan', title: 'Data Pelanggan', child: false, left: ['nama']}, show: true, rules: ['required']},
                    {title: 'Tujuan Bongkar', key: 'tujuan_bongkar', type: 'dialog', item: {point: 'nama', endpoint: 'alamat_bongkar', title: 'Alamat Bongkar', child: false, leftCustom: [
                        {content: ['nama']},
                        {content: ['alamat', 'kabupaten'], separate: '-'},
                    ]}, show: true, rules: ['required']},
                    {title: 'Supir', key: 'supir', type: 'text', show: true, rules: ['required']},
                    {title: 'No Polisi', key: 'no_polisi', type: 'text', show: true, rules: ['required']},
                ],
                dialog_field: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, rules: ['unique']},
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
            let data = await pengiriman.pengiriman()
            let blmTerkirim = await pengiriman.blmTerkirim()
            this.config.permission[0].item.item = blmTerkirim
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