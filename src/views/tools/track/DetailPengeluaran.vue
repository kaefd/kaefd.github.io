<template>
    <div class="h-full -mx-5 md:mx-0">
        <base-table :fields="config.fields" :items="items" :master="true" :permission="config"></base-table>
    </div>
</template>
<script setup>
import DetailPengiriman from './DetailPengiriman.vue'
import { store } from '@/utils/store'
import track from './track'
</script>
<script>
export default {
    props: {perm: {type: Object}},
    data() {
        return {
            items: '',
            config: {
                title: 'log pengeluaran',
                child: false,
                permission: [
                    {title: 'Detail Pengiriman', key: 'pengiriman', value: true},
                ],
                fields: [
                    {title: 'Tgl Keluar', key: 'tgl_penjualan', type: 'date', show: true, sort: 'desc'},
                    {title: 'Nopen', key: 'no_dokumen', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tonase', key: 'jumlah', type: 'number', show: true, sort: 'desc'},
                    {title: 'Terkirim', key: 'jumlah_terkirim', type: 'number', show: true, sort: 'desc'},
                    {title: 'Belum terkirim', key: 'belum_terkirim', type: 'number', show: true, sort: 'desc'},
                ],
                field_detail: false,
                dialog_field: false,
                filter: false
            }
        }
    },
    methods: {
        async get () {
            store().loader('on')
            this.items = await track.pengeluaran(this.user)
            store().$patch((state) => { state.state.permission = this.config.permission})
            if(this.items) store().loader('off')
            // store().$patch((state) => {
            //     state.items = data
            //     state.state = this.config
            // })
        },
    },
    beforeMount() {
        // return store().resetState()
    },
    async mounted() {
        this.get()
    }
}
</script>