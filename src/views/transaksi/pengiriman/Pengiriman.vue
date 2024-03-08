<template>
    <base-page :config="config">
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
import otoritas from '@/router/otoritas';
import { store } from '@/utils/store'    
import utils from '@/utils/utils'    
import pengiriman from './pengiriman';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Pengiriman Barang',
                child: true,
                permission: {
                    create: otoritas.check('Tambah Pengiriman Baru'),
                    edit: false,
                    delete: otoritas.check('Batal Pengiriman'),
                    cetak_suratjalan: otoritas.check('Cetak Surat Jalan'),
                    cetak_do: otoritas.check('Cetak DO'),
                    search: true,
                    select_column: true,
                    export: otoritas.groupCheck('export'),
                    filter: true,
                    select_column: true,
                },
                menu: {
                    head: [
                        { title: 'Tambah Pengiriman Baru', key: 'create' },
                        { title: 'Cetak Surat Jalan', key: 'cetak_suratjalan' },
                        { title: 'Cetak Surat Delivery Order', key: 'cetak_do' },
                        { title: 'Batal Pengiriman', key: 'delete' },
                    ],
                    detail: [
                        { title: 'Tambah Detail', key: 'create_detail', read: {show: true, disabled: true}, create: {show: true, disabled: false}, item: {title: 'Penjualan Belum Terkirim', item: '', child: true, left: ['nopen'], right: ['no_penjualan']} },
                        { title: 'Edit Detail', key: 'edit_detail', read: false, create: {show: true, disabled: false} },
                        { title: 'Hapus Detail', key: 'hapus_detail', read: false, create: {show: true, disabled: false} },
                    ]
                },
                fields: {
                    head: [
                        { title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required'] },
                        { title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required', `date:min ${utils.last_month()}`, `date:max ${utils.today()}`] },
                        { title: 'Pelanggan', key: 'pelanggan', type: 'dialog', item: { point: 'nama', key: 'kode_pelanggan', endpoint: 'pelanggan', title: 'Data Pelanggan', child: false, left: ['nama'] }, show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required'] },
                        {
                            title: 'Tujuan Bongkar', key: 'tujuan_bongkar', type: 'dialog', item: {
                                point: 'nama', key: 'kode_pelanggan', endpoint: 'alamat_bongkar', title: 'Alamat Bongkar', child: false, leftCustom: [
                                    { content: ['nama'] },
                                    { content: ['alamat', 'kabupaten'], separate: '-' },
                                ]
                            }, show: otoritas.check('Alamat Bongkar'), read: {show: otoritas.check('Alamat Bongkar'), disabled: true}, create: {show: true, disabled: false}, column: otoritas.check('Alamat Bongkar'), sort: 'desc', rules: ['required']
                        },
                        { title: 'Supir', key: 'supir', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required'] },
                        { title: 'No Polisi', key: 'no_polisi', type: 'text', show: true, read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, sort: 'desc', rules: ['required'] },
                    ],
                    detail: [
                        { title: 'No Penjualan', key: 'no_penjualan', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc' },
                        { title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc' },
                        { title: 'No Dokumen', key: 'no_dokumen', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc' },
                        { title: 'Kode Group', key: 'kode_group', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc' },
                        { title: 'Kode Barang', key: 'kode_barang', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, sort: 'desc', rules: ['unique'] },
                        { title: 'Nama Barang', key: 'nama_barang', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, sort: 'desc' },
                        { title: 'Jumlah', key: 'jumlah', type: 'number', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, sort: 'desc', rules: ['required'] },
                        { title: 'Satuan', key: 'satuan', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc' },
                        // {title: 'Kode Konversi', key: 'kode_konversi', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc'},
                        // {title: 'Nama Konversi', key: 'nama_konversi', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: false, sort: 'desc'},
                        { title: 'Jumlah Konversi', key: 'jumlah_konversi', type: 'number', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, sort: 'desc' },
                        { title: 'Satuan Konversi', key: 'satuan_konversi', type: 'text', read: {show: true, disabled: true}, create: {show: true, disabled: false}, column: true, dialog: true, sort: 'desc' },
                    ],
                },
                filter: [
                    { title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', show: true, default: store().periode[0], rules: ['date:max tgl_akhir'] },
                    { title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', show: true, default: store().periode[1], rules: ['date:min tgl_awal', 'date:max ' + utils.today()] },
                ],
                tbl_footer: [
                    { title: 'Jumlah', key: 'jumlah', type: 'number', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false} },
                    { title: 'Jumlah Konversi', key: 'jumlah_konversi', type: 'number', show: false, read: {show: true, disabled: true}, create: {show: true, disabled: false} },
                ]
            }
        }
    },
    methods: {
        async get() {
            const check = otoritas.check('Pengiriman')
            if(!check) return this.$router.push('/')
            const data = await pengiriman.pengiriman(null, this.config.fields.head[0])
            let blmTerkirim = await pengiriman.blmTerkirim()
            this.config.menu.detail[0].item.item = blmTerkirim
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