<template>
    <base-page :config="config">
        <template #base-detail>
            <PengeluaranDetail></PengeluaranDetail>
        </template>
    </base-page>
</template>
<script setup>
import otoritas from '@/router/otoritas'
import pengeluaran from './pengeluaran'
import PengeluaranDetail from './PengeluaranDetail.vue'
import { store } from '@/utils/store'
import utils from '@/utils/utils'
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Pengeluaran',
                child: true,
                permission: [
                    {title: 'Tambah Pengeluaran', key: 'tambah', item: {endpoint: 'barang', title: 'Data Barang', child: true, left: ['nama_barang'], right: ['kode_barang']}, show: true},
                    {title: 'Detail Pengeluaran', key: 'lihat', value: true},
                    {title: 'Batal Pengeluaran', key: 'hapus', value: true},
                ],
                fields: [
                    {title: 'No Pengeluaran', key: 'no_penjualan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tgl Keluar', key: 'tgl_penjualan', type: 'date', show: true, sort: 'desc'},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'Pelanggan', key: 'pelanggan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Group', key: 'kode_group', type: 'text', show: true, sort: 'desc'},
                    {title: 'Total Penjualan', key: 'total_penjualan', type: 'number', show: true, sort: 'desc'},
                ],
                field_detail: [
                    {title: 'No Pengeluaran', key: 'no_penjualan', type: 'text', show: true, disabled: true},
                    {title: 'Tgl Keluar', key: 'tgl_penjualan', type: 'date', show: true, rules: ['required', 'date:min '+utils.last_month(), 'date:max '+ utils.today()]},
                    {title: 'Pelanggan', key: 'pelanggan', type: 'dialog', item: {point: 'nama', endpoint: 'pelanggan', title: 'Data Pelanggan', child: false, left: ['nama']}, show: true, rules: ['required']},
                    {title: 'Tgl Dokumen', key: 'tgl_dokumen', type: 'date', show: true, rules: ['required', 'date:min '+utils.last_month(), 'date:max '+ utils.today()]},
                    {title: 'Kode Group', key: 'kode_group', type: 'dialog', item: {point: 'kode_group', item: [], title: 'Kode Group', child: false, left: ['kode_group']}, show: true, rules: ['required']},
                    // {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'option', item: ['BC25', 'BC41'], show: true, rules: ['required']},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'auto', default: {
                        key: 'kode_group',
                        set: [
                            {input: 'BC23', value: 'BC25'},
                            {input: 'BC40', value: 'BC41'},
                            {input: 'PPKEK-LDP', value: 'BC25'},
                            {input: 'PPKEK-TLDDP', value: 'BC41'},
                        ],
                    }, show: true, rules: ['required']},
                    {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true, rules: ['required']},
                ],
                dialog_field: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', rules: ['unique'], show: false},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: false},
                    {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                    {title: 'Harga Jual', key: 'harga_jual', type: 'number', show: true},
                    // {title: 'Total Harga', key: 'total_harga', type: 'number', show: true}
                    {title: 'Total Harga', key: 'total_harga', type: 'auto', default: {
                        key: 'total_harga',
                        f: '*',
                        set: [
                            {input: 'jumlah', value: 'jumlah'},
                            {input: 'harga_jual', value: 'harga_jual'},
                        ]
                    }, show: true}
                ],
                filter: [
                    {title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', rules: ['date:max tgl_akhir']},
                    {title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', rules: ['date:min tgl_awal', 'date:max tgl_akhir']},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'checkbox', item: [
                        {title: 'BC25', key: 'BC25', show: true},
                        {title: 'BC41', key: 'BC41', show: true},
                    ]},
                    {title: 'Status', key: 'status', type: 'checkbox', item: [
                        {title: 'Menunggu', key: 'open', show: true},
                        {title: 'Selesai', key: 'close', show: true},
                    ]},
                ],
                param: [
                    {title: 'Jumlah', key: 'jumlah'},
                    {title: 'harga', key: 'total_harga'},
                ]
            }
        }
    },
    methods: {
        async get () {
            let a = otoritas.akses('Pengeluaran Barang')
            if(a) {
                let data = await pengeluaran.pengeluaran()
                let kode = await pengeluaran.kodegroup()
                this.config.field_detail[4].item.item = kode
                store().$patch((state) => {
                    state.items = data
                    state.state = this.config
                })
            } else this.$router.push('/')
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