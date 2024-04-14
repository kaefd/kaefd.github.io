<template>
    <base-page :config="config"></base-page>
</template>

<script setup>
import otoritas from '@/router/otoritas';
import { store } from '@/utils/store'    
import utils from '@/utils/utils'    
import pengeluaran from './pengeluaran';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Pengeluaran Barang',
                child: true,
                permission: {
                    create: otoritas.check('Tambah Penjualan Baru'),
                    edit: false,
                    delete: otoritas.check('Batal Penjualan'),
                    search: true,
                    select_column: true,
                    export: otoritas.groupCheck('export'),
                    filter: true,
                    select_column: true,
                },
                menu: {
                    head: [
                        { title: 'Tambah Pengeluaran Baru', key: 'create' },
                        { title: 'Batal Pengeluaran', key: 'delete' },
                    ],
                    detail: [
                        { title: 'Tambah Detail', key: 'create_detail', read: {show: true, disabled: true}, create: {show: true, disabled: false}, item: {endpoint: 'barang', title: 'Data Barang', child: true, left: ['nama_barang'], right: ['kode_barang']} },
                        { title: 'Edit Detail', key: 'edit_detail', read: false, create: {show: true, disabled: false} },
                        { title: 'Hapus Detail', key: 'delete_detail', read: false, create: {show: true, disabled: false} },
                    ]
                },
                fields: {
                    head: [
                        {title: 'No Pengeluaran', key: 'no_penjualan', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: true}, column: true, sort: 'asc' },
                        {title: 'Tgl Keluar', key: 'tgl_penjualan', type: 'date', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required', `date:min ${utils.last_month()}`, `date:max ${utils.today()}`]},
                        {title: 'Pelanggan', key: 'pelanggan', type: 'dialog', item: { point: 'nama', key: 'kode_pelanggan', endpoint: 'pelanggan', title: 'Data Pelanggan', child: false, left: ['nama'] }, show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required'] },
                        {title: 'Tgl Dokumen', key: 'tgl_dokumen', type: 'date', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required', `date:min ${utils.last_month()}`, `date:max ${utils.today()}`]},
                        {title: 'Kode Group', key: 'kode_group', type: 'dialog', item: {point: 'kode_group', key: 'kode_group', item: [], title: 'Kode Group', child: false, left: ['kode_group']}, show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required']},
                        {title: 'Tipe Dokumen', key: 'tipe_dokumen', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, type: 'auto', default: {
                            key: 'kode_group',
                            set: [
                                {input: 'BC23', value: 'BC25'},
                                {input: 'BC40', value: 'BC41'},
                                {input: 'PPKEK-LDP', value: 'BC25'},
                                {input: 'PPKEK-TLDDP', value: 'BC41'},
                            ],
                        }, column: true, sort: 'desc', rules: ['required', `date:min ${utils.last_month()}`, `date:max ${utils.today()}`]},
                        {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required']},
                        {title: 'Total Penjualan', key: 'total_penjualan', type: 'number', show: true, read: {show: false, disabled: true}, create: {show: false, disabled: false}, column: true, sort: 'desc', rules: ['required']},
                        {title: 'Status', key: 'status', type: 'text', show: false, read: {show: false, disabled: true}, create: {show: false, disabled: false}, column: true, sort: 'desc'},
                        {title: 'Status', key: 'status_', type: 'text', show: true, read: {show: false, disabled: true}, create: {show: false, disabled: false}, column: true, sort: 'desc'},
                    ],
                    detail: [
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, rules: ['unique']},
                        {title: 'Nama Barang', key: 'nama_barang', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true,},
                        {title: 'HS Code', key: 'hs_code', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false,},
                        {title: 'Jumlah', key: 'jumlah', type: 'number', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, rules: ['required']},
                        {title: 'Jumlah Terkirim', key: 'jumlah_terkirim', type: 'number', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false,},
                        {title: 'Satuan', key: 'satuan', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false,},
                        {title: 'Harga Jual', key: 'harga_jual', type: 'number', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, rules: ['required']},
                        {title: 'Total Harga', key: 'total_harga', type: 'auto', default: {
                            key: 'total_harga',
                            f: '*',
                            set: [
                                {input: 'jumlah', value: 'jumlah'},
                                {input: 'harga_jual', value: 'harga_jual'},
                            ]
                        }, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true,}
                    ],
                },
                filter: [
                    { title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', show: true, default: store().periode[0], rules: ['date:max tgl_akhir'] },
                    { title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', show: true, default: store().periode[1], rules: ['date:min tgl_awal', 'date:max ' + utils.today()] },
                    { title: 'Tipe Dokumen', key: 'tipe_dokumen', show: true, type: 'checkbox', item: [
                        {title: 'BC25', key: 'BC25', value: true},
                        {title: 'BC41', key: 'BC41', value: true},
                    ]},
                    { title: 'Status', key: 'status', show: true, type: 'option', rules: ['required'], default: {title: 'semua', key: 'semua', value: true}, item: [
                        {title: 'Semua', key: 'semua'},
                        {title: 'Menunggu', key: 'open'},
                        {title: 'Selesai', key: 'close'},
                    ]},
                ],
                tbl_footer: [
                    { title: 'Jumlah', key: 'jumlah', type: 'number', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false} },
                    { title: 'Total Harga', key: 'total_harga', type: 'number', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false} },
                ]
            }
        }
    },
    methods: {
        async get() {
            const check = otoritas.check('Penjualan')
            if(!check) return this.$router.push('/')
            const data = await pengeluaran.pengeluaran(null, this.config.fields.head[0])
            let kode = await pengeluaran.kodegroup()
            this.config.fields.head[4].item.item = kode
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