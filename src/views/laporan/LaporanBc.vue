<template>
    <base-page :config="config">
        <!-- <template #header-content>
            <div class="flex flex-col flex-wrap gap-y-2 gap-x-32 pt-1 w-full" :class="store().nav ? 'h-max md:h-max lg:h-[50vh] xl:h-[45vh] 2xl:h-[28vh]' : 'h-max md:h-max lg:h-[43vh] xl:h-[35vh] 2xl:h-[28vh]'">
                <div v-for="fl in config.field_detail.filter(it => it.show == true)">
                    <div class="flex justify-between items-center md:w-72">
                        <label class="w-[24%] break-normal">{{ fl.title }}</label>
                        <base-input :type="fl.type" :value="items[fl.key]" :fl_item="fl.item" :default="fl.default" :label="fl.key" :disabled="true"></base-input>
                    </div>
                </div>
            </div>
        </template> -->
        <template #base-detail>
            <div class="flex flex-col gap-y-2 pt-1 w-full h-full">
                <div class="w-full h-[90%] flex flex-col flex-wrap gap-y-3">
                    <DetailBc />
                </div>
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
            items: "",
            config: {
                title: 'Laporan Bc',
                child: true,
                permission: [
                    {title: 'Detail Pengeluaran', key: 'lihat', value: true},
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
                field_detail: [
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
            }
        }
    },
    methods: {
        async get () {
            let a = otoritas.Cakses('Laporan Bc')
            if(a) {
                store().$patch((state) => {state.state = this.config})
                this.items = await lapbc.pengeluaran(null, this.config.fields[0])
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