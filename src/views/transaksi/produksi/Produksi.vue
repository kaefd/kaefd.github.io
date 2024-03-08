<template>
    <base-page :config="config"></base-page>
</template>

<script setup>
import otoritas from '@/router/otoritas';
import { store } from '@/utils/store'    
import utils from '@/utils/utils'    
import produksi from './produksi';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Produksi Barang',
                child: true,
                permission: {
                    create: otoritas.check('Tambah Produksi Baru'),
                    edit: false,
                    delete: otoritas.check('Batal Produksi'),
                    search: true,
                    select_column: true,
                    export: otoritas.groupCheck('export'),
                    filter: true,
                    select_column: true,
                },
                menu: {
                    head: [
                        { title: 'Tambah Produksi Baru', key: 'create' },
                        { title: 'Batal Produksi', key: 'delete' },
                    ],
                    detail: [
                        { title: 'Tambah Detail', key: 'create_detail', read: {show: true, disabled: true}, create: {show: true, disabled: false}, item: {endpoint: 'barang', title: 'Data Barang', child: true, left: ['nama_barang'], right: ['kode_barang']} },
                        { title: 'Edit Detail', key: 'edit_detail', read: false, create: {show: true, disabled: false} },
                        { title: 'Hapus Detail', key: 'hapus_detail', read: false, create: {show: true, disabled: false} },
                    ]
                },
                fields: {
                    head: [
                        {title: 'No Produksi', key: 'no_produksi', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: true}, column: true, sort: 'desc' },
                        {title: 'Tgl Produksi', key: 'tgl_produksi', type: 'date', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required', `date:min ${utils.last_month()}`, `date:max ${utils.today()}`]},
                        {title: 'Kode Group', key: 'kode_group', type: 'dialog', item: {point: 'kode_group', key: 'kode_group', item: [], title: 'Kode Group', child: false, left: ['kode_group']}, show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required']},
                        {title: 'Bahan Baku', key: 'kode_bahan', type: 'dialog', rules: ['required kode_group', 'required'], item: {point: 'kode_barang', endpoint: 'group_barang?kode_group=', param: 'kode_group', title: 'Stok Barang', child: false, left: ['kode_barang'], right: ['stok_akhir']}, show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc'},
                        {title: 'Jumlah Bahan Baku', key: 'jumlah_bahan', type: 'number', show: true, read: {show: true, disabled: true}, create: {show: false, disabled: false}, column: true, sort: 'desc', rules: ['required']},
                        {title: 'Barang Jadi', key: 'kode_barang', type: 'text', show: true, read: {show: false, disabled: true}, create: {show: false, disabled: false}, column: true, sort: 'desc'},
                        {title: 'Jumlah Barang Jadi', key: 'jumlah', type: 'number', show: true, read: {show: false, disabled: true}, create: {show: false, disabled: false}, column: true, sort: 'desc', rules: ['required']},
                    ],
                    detail: [
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, rules: ['unique']},
                        {title: 'Nama Barang', key: 'nama_barang', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true,},
                        {title: 'Jumlah', key: 'jumlah', type: 'number', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, rules: ['required']},
                        {title: 'Satuan', key: 'satuan', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false,},
                    ],
                },
                filter: [
                    { title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', show: true, default: store().periode[0], rules: ['date:max tgl_akhir'] },
                    { title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', show: true, default: store().periode[1], rules: ['date:min tgl_awal', 'date:max ' + utils.today()] },
                ],
                tbl_footer: [
                    { title: 'Jumlah', key: 'jumlah', type: 'number', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false} },
                ]
            }
        }
    },
    methods: {
        async get() {
            const check = otoritas.check('Produksi')
            if(!check) return this.$router.push('/')
            const data = await produksi.produksi(null, this.config.fields.head[0])
            this.config.fields.head[2].item.item = await produksi.kodegroup()
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