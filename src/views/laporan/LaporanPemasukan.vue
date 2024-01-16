<template>
    <base-page :config="config">
        <template #base-detail>
            <PemasukanDetail></PemasukanDetail>
        </template>
    </base-page>
</template>
<script setup>
import pemasukan from '@/views/transaksi/pemasukan/pemasukan'
import PemasukanDetail from '@/views/transaksi/pemasukan/PemasukanDetail.vue'
import { store } from '@/utils/store'
import otoritas from '@/router/otoritas';
import utils from '@/utils/utils';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Laporan Pemasukan Barang',
                child: true,
                permission: [
                    {title: 'Detail Pemasukan', key: 'lihat', value: true},
                ],
                fields: [
                    {title: 'No Pemasukan', key: 'no_pembelian', type: 'text', show: true, sort: 'asc'},
                    {title: 'Tgl Masuk', key: 'tgl_pembelian', type: 'date', show: true, sort: 'desc'},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'Supplier', key: 'supplier', type: 'text', show: true, sort: 'desc', item: []},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, sort: 'desc',},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc',},
                    {title: 'HS Kode', key: 'hs_code', type: 'text', show: true, sort: 'desc',},
                    {title: 'Mata Uang', key: 'mata_uang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Total Nilai', key: 'total_nilai', type: 'number', show: true, sort: 'desc'},
                    {title: 'Total Nilai (Rp)', key: 'rupiah', type: 'number', show: true, sort: 'desc'}
                ],
                field_detail: [
                    {title: 'No Pemasukan', key: 'no_pembelian', type: 'text', show: true, disabled: true},
                    {title: 'Tgl Pemasukan', key: 'tgl_pembelian', type: 'date', show: true},
                    {title: 'Supplier', key: 'supplier', type: 'dialog', item: {point: 'nama', endpoint: 'supplier', title: 'Data Supplier', child: false, left: ['nama']}, show: true},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'option', item: ['BC20', 'BC23', 'BC40', 'PPKEK-LDP', 'PPKEK-TLDDP'], show: true},
                    {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true},
                    {title: 'Tgl Dokumen', key: 'tgl_dokumen', type: 'date', show: true},
                    {title: 'No Invoice', key: 'no_invoice', type: 'text', show: true},
                    {title: 'No BL', key: 'no_bl', type: 'text', show: true},
                    {title: 'Mata Uang', key: 'mata_uang', type: 'text', show: true},
                    {title: 'Kurs', key: 'kurs', type: 'number', show: true},
                    {title: 'Persentase', key: 'persentase', type: 'number', show: true}
                ],
                dialog_field: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: false},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: false},
                    {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                    {title: 'Jumlah Diterima', key: 'jumlah_diterima', type: 'number', show: true},
                    {title: 'Total Nilai', key: 'nilai', type: 'number', show: true}
                ],
                filter: [
                    {title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', rules: ['date:max tgl_akhir']},
                    {title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', rules: ['date:min tgl_awal', 'date:max '+ utils.today()]},
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
                    {title: 'Nilai', key: 'nilai'}
                ]
            }
        }
    },
    methods: {
        async get () {
            let a = otoritas.Cakses('Laporan Pemasukan')
            if(a) {
                store().loader('on')
                let data = await pemasukan.pemasukan(null, this.config.fields[0])
                if(data) store().loader('off')
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
</script>@/views/transaksi/pemasukan/pemasukan