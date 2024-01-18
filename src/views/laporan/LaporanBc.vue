<template>
    <base-page :config="config">
        <template #header-content>
            <div class="w-full h-[90%] flex flex-col flex-wrap gap-y-3">
                <DetailBc />
            </div>
        </template>
    </base-page>
</template>
<script setup>
import { store } from '@/utils/store'
import utils from '@/utils/utils';
import otoritas from '@/router/otoritas';
import DetailBc from './DetailBc.vue';
import lapbc from './lapbc';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Laporan Bc',
                child: false,
                permission: [
                    {title: 'Detail Bc', key: 'lihat', value: true},
                ],
                fields: [
                    {title: 'No Pengeluaran', key: 'no_penjualan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tgl Keluar', key: 'tgl_penjualan', type: 'date', show: true, sort: 'desc'},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Group', key: 'kode_group', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Jumlah', key: 'jumlah', type: 'number', show: true, sort: 'desc'},
                ],
                filter: [
                    {title: 'Tanggal Awal', key: 'tgl_awal', type: 'date', rules: ['date:max tgl_akhir']},
                    {title: 'Tanggal Akhir', key: 'tgl_akhir', type: 'date', rules: ['date:min tgl_awal', 'date:max '+ utils.today()]},
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
            let a = otoritas.Cakses('Laporan Bc')
            if(a) {
                store().$patch((state) => {state.state = this.config})
                await lapbc.pengeluaran(null, this.config.fields[0])
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