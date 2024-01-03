<template>
    <base-page :config="config">
        <template #header-content>
            <DetailProduksi v-if="store().menu.option.key == 'produksi'" />    
            <DetailPengeluaran :perm="config.permission" v-if="store().menu.option.key == 'pengeluaran'" />    
        </template>
    </base-page>
</template>
<script setup>
import DetailProduksi from './DetailProduksi.vue';
import { store } from '@/utils/store'
import utils from '@/utils/utils'
import track from './track';
import DetailPengeluaran from './DetailPengeluaran.vue';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'log pemasukan',
                child: false,
                permission: [
                    {title: 'Detail Produksi', key: 'produksi', value: true},
                    {title: 'Detail Pengeluaran', key: 'pengeluaran', value: true},
                ],
                fields: [
                    {title: 'No Pemasukan', key: 'no_pembelian', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tanggal masuk', key: 'tgl_pembelian', type: 'date', show: true, sort: 'desc'},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'Supplier', key: 'supplier', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tonase', key: 'jumlah', type: 'number', show: true, sort: 'desc'},
                    {title: 'Mata uang', key: 'mata_uang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Total Nilai', key: 'total_nilai', type: 'number', show: true, sort: 'desc'},
                ],
                field_detail: false,
                dialog_field: false,
                filter: [
                    {title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', rules: ['date:max tgl_akhir']},
                    {title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', rules: ['date:min tgl_awal', 'date:max ' +utils.today()]},
                ]
            }
        }
    },
    methods: {
        async get () {
            store().loader('on')
            let data = await track.pemasukan(this.user)
            if(data) store().loader('off')
            store().$patch((state) => {
                state.items = data
                state.state = this.config
            })
        },
    },
    beforeMount() {
        return store().resetState()
    },
    mounted() {
        this.get()
    },
}
</script>