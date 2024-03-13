<template>
    <base-page :config="config"></base-page>
</template>

<script setup>
import otoritas from '@/router/otoritas';
import { store } from '@/utils/store'    
import utils from '@/utils/utils'    
import pembelian from './pembelian';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Pemasukan Barang',
                child: true,
                permission: {
                    create: otoritas.check('Tambah Pembelian Baru'),
                    edit: false,
                    delete: otoritas.check('Batal Pembelian'),
                    search: true,
                    select_column: true,
                    export: otoritas.groupCheck('export'),
                    filter: true,
                    select_column: true,
                },
                menu: {
                    head: [
                        { title: 'Tambah Pemasukan Baru', key: 'create' },
                        { title: 'Batal Pemasukan', key: 'delete' },
                    ],
                    detail: [
                        { title: 'Tambah Detail', key: 'create_detail', read: {show: true, disabled: true}, create: {show: true, disabled: false}, item: {endpoint: 'barang', title: 'Data Barang', child: true, left: ['nama_barang'], right: ['kode_barang']} },
                        { title: 'Edit Detail', key: 'edit_detail', read: false, create: {show: true, disabled: false} },
                        { title: 'Hapus Detail', key: 'hapus_detail', read: false, create: {show: true, disabled: false} },
                    ]
                },
                fields: {
                    head: [
                        { title: 'No Pemasukan', key: 'no_pembelian', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: true}, column: true, sort: 'desc' },
                        { title: 'Tgl Masuk', key: 'tgl_pembelian', type: 'date', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required', 'date:min ' + utils.last_month(), 'date:max ' + utils.today()] },
                        { title: 'Tipe Dokumen', key: 'tipe_dokumen', show: true, type: 'option', item: [
                            {key: 'BC23', title: 'BC23'},
                            {key: 'BC40', title: 'BC40'},
                            {key: 'PPKEK-TLDDP', title: 'PPKEK-TLDDP'},
                            {key: 'PPKEK-LDP', title: 'PPKEK-LDP'},
                        ], read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc', rules: ['required'] },
                        { title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc', rules: ['required'] },
                        { title: 'Supplier', key: 'supplier', type: 'dialog', item: {point: 'nama', key: 'kode_supplier', endpoint: 'supplier', title: 'Data Supplier', child: false, left: ['nama']}, show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc', rules: ['required'] },
                        { title: 'Invoice', key: 'no_invoice', type: 'text', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: false, dialog: false, sort: 'desc', rules: ['required'] },
                        { title: 'No BL', key: 'no_bl', type: 'text', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: false, dialog: false, sort: 'desc', rules: ['required'] },
                        { title: 'Mata Uang', key: 'mata_uang', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc', rules: ['required'] },
                        { title: 'Total Nilai', key: 'total_nilai', type: 'number', show: true, read: {show: false, disabled: true}, create: {show: false, disabled: false}, column: true, dialog: false, sort: 'desc', rules: ['required'] },
                        { title: 'Kurs', key: 'kurs', type: 'number', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc', rules: ['required'] },
                        { title: 'Total Nilai(Rp)', key: 'rupiah', type: 'number', show: true, read: {show: false, disabled: true}, create: {show: false, disabled: false}, column: true, dialog: false, sort: 'desc', rules: ['required'] },
                    ],
                    detail: [
                        { title: 'Kode Barang', key: 'kode_barang', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, sort: 'desc', rules: ['unique'] },
                        { title: 'Nama Barang', key: 'nama_barang', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, sort: 'desc' },
                        { title: 'HS Code', key: 'hs_code', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc' },
                        { title: 'Jumlah', key: 'jumlah', type: 'number', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, sort: 'desc', rules: ['required'] },
                        { title: 'Jumlah Diterima', key: 'jumlah_diterima', type: 'number', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, sort: 'desc', rules: ['required'] },
                        { title: 'Satuan', key: 'satuan', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc' },
                        { title: 'Total Nilai', key: 'nilai', type: 'number', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, sort: 'desc',rules: ['required'] },
                    ],
                },
                filter: [
                    { title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', show: true, default: store().periode[0], rules: ['date:max tgl_akhir'] },
                    { title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', show: true, default: store().periode[1], rules: ['date:min tgl_awal', 'date:max ' + utils.today()] },
                    { title: 'Tipe dokumen', key: 'tipe_dokumen', type: 'checkbox', show: true, item: [
                        {title: 'BC23', key: 'BC23', value: true},
                        {title: 'BC40', key: 'BC40', value: true},
                        {title: 'PPKEK-LDP', key: 'PPKEK-LDP', value: true},
                        {title: 'PPKEK-TLDDP', key: 'PPKEK-TLDDP', value: true},
                    ]},
                ],
                tbl_footer: [
                    { title: 'Jumlah', key: 'jumlah', type: 'number', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false} },
                    { title: 'Total Nilai', key: 'nilai', type: 'number', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false} },
                ]
            }
        }
    },
    methods: {
        async get() {
            const check = otoritas.check('Pembelian')
            if(!check) return this.$router.push('/')
            const data = await pembelian.pembelian(null, this.config.fields.head[0])
            store().data.items = data
        },
    },
    beforeMount() {
        store().resetState()
    },
    mounted() {
        this.get()
        store().init()
    }
}
</script>