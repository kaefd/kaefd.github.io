<template>
    <base-page :config="config">
        <template #base-detail>
            <PemasukanDetail></PemasukanDetail>
        </template>
    </base-page>
</template>
<script setup>
import otoritas from '@/router/otoritas'
import pemasukan from './pemasukan'
import PemasukanDetail from './PemasukanDetail.vue'
import { store } from '@/utils/store'
import utils from '@/utils/utils'
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Pemasukan',
                child: true,
                permission: [
                    {title: 'Tambah Pemasukan', key: 'tambah', item: {endpoint: 'barang', title: 'Data Barang', child: true, left: ['nama_barang'], right: ['kode_barang']}, show: true},
                    {title: 'Detail Pemasukan', key: 'lihat', value: true},
                    {title: 'Batal Pemasukan', key: 'hapus', value: true},
                ],
                fields: [
                    {title: 'No Pemasukan', key: 'no_pembelian', type: 'text', show: true, sort: 'asc'},
                    {title: 'Tgl Masuk', key: 'tgl_pembelian', type: 'date', show: true, sort: 'desc'},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'Supplier', key: 'supplier', type: 'text', show: true, sort: 'desc', item: []},
                    {title: 'Mata Uang', key: 'mata_uang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Total Nilai', key: 'total_nilai', type: 'number', show: true, sort: 'desc'},
                    {title: 'Total Nilai (Rp)', key: 'rupiah', type: 'number', show: true, sort: 'desc'}
                ],
                field_detail: [
                    {title: 'No Pemasukan', key: 'no_pembelian', type: 'text', show: true, disabled: true},
                    {title: 'Tgl Pemasukan', key: 'tgl_pembelian', type: 'date', show: true, rules: ['required', 'date:min '+utils.last_month(), 'date:max '+ utils.today()]},
                    {title: 'Supplier', key: 'supplier', type: 'dialog', rules: ['required'], item: {point: 'nama', endpoint: 'supplier', title: 'Data Supplier', child: false, left: ['nama']}, show: true},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'option', item: ['BC20', 'BC23', 'BC40', 'PPKEK-LDP', 'PPKEK-TLDDP'], show: true, rules: ['required']},
                    {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true, rules: ['required']},
                    {title: 'Tgl Dokumen', key: 'tgl_dokumen', type: 'date', show: true, rules: ['required', 'date:min '+utils.last_month(), 'date:max '+ utils.today()]},
                    {title: 'No Invoice', key: 'no_invoice', type: 'text', show: true, rules: ['required']},
                    {title: 'No BL', key: 'no_bl', type: 'text', show: true, rules: ['required']},
                    {title: 'Mata Uang', key: 'mata_uang', type: 'text', show: true, rules: ['required']},
                    {title: 'Kurs', key: 'kurs', type: 'number', show: true, rules: ['required']},
                    {title: 'Persentase', key: 'persentase', type: 'number', show: true}
                ],
                dialog_field: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: false, rules: ['unique']},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: false},
                    {title: 'Jumlah', key: 'jumlah', type: 'number', show: true, rules: ['required']},
                    {title: 'Jumlah Diterima', key: 'jumlah_diterima', type: 'number', show: true, rules: ['required']},
                    {title: 'Total Nilai', key: 'nilai', type: 'number', show: true, rules: ['required']}
                ],
                filter: [
                    {title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', rules: ['date:max tgl_akhir']},
                    {title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', rules: ['date:min tgl_awal', 'date:max '+utils.today()]},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'checkbox', item: [
                        {title: 'BC20', key: 'BC20', show: true},
                        {title: 'BC23', key: 'BC23', show: true},
                        {title: 'BC40', key: 'BC40', show: true},
                        {title: 'PPKEK-LDP', key: 'PPKEKLDP', show: true},
                        {title: 'PPKEK-TLDDP', key: 'PPKEKTLDDP', show: true}
                    ]},
                ],
                param: [
                    {title: 'Jumlah', key: 'jumlah'},
                    {title: 'Nilai', key: 'nilai'},
                ]
            }
        }
    },
    methods: {
        async get () {
            let a = otoritas.Cakses('Pemasukan Barang')
            if(a) {
                let data = await pemasukan.pemasukan(null, this.config.fields[0])
                store().$patch((state) => {
                    state.items = data
                    state.state = this.config
                    // state.menu.option = ''
                    // state.detail_dialog = false
                    // state.filter = false
                    // state.column = false
                })
            } else this.$router.push('/')
        },
    },
    beforeMount() {
        return store().resetState()
    },
    async mounted() {
        this.get()
    }
}
</script>