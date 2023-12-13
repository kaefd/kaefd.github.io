<template>
    <base-page :config="config"></base-page>
</template>
<script setup>
import konversi from './konversi'
import { store } from '@/utils/store'
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Konversi Barang',
                permission: [
                    {title: 'Tambah Data', key: 'tambah', value: true},
                    {title: 'Detail Data', key: 'lihat', value: true},
                    {title: 'Ubah Data', key: 'edit', value: true},
                    {title: 'Hapus Data', key: 'hapus', value: true},
                ],
                fields: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Konversi', key: 'kode_konversi', type: 'text', show: true, sort: 'desc'},
                    {title: 'Nama Konversi', key: 'nama_konversi', type: 'text', show: true, sort: 'desc'},
                    {title: 'Satuan Konversi', key: 'satuan_konversi', type: 'text', show: true, sort: 'desc'},
                    {title: 'Berat', key: 'berat', type: 'number', show: true, sort: 'desc'},
                ],
                field_detail: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'option', item: [], show: true},
                    {title: 'Kode Konversi', key: 'kode_konversi', type: 'text', show: true},
                    {title: 'Nama Konversi', key: 'nama_konversi', type: 'text', show: true},
                    {title: 'Satuan Konversi', key: 'satuan_konversi', type: 'text', show: true},
                    {title: 'Berat', key: 'berat', type: 'number', show: true},
                ],
                filter: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'checkbox', item: []},
                ],
            }
        }
    },
    methods: {
        async get () {
            let data = await konversi.konversi()
            let a = []
            let b = []
            for (let i = 0; i < data.length; i++) {
                a.push({
                    title: data[i].head.kode_barang,
                    key: data[i].head.kode_barang,
                    show: true
                })
                b.push(data[i].head.kode_barang)
            }
            let kode = Array.from(new Set(a.map(obj => JSON.stringify(obj)))).map(str => JSON.parse(str))
            let onlyCode =  [...new Set(b)];
            console.log(store().state.filter);
            
            this.config.filter[0].item = kode
            this.config.field_detail[0].item = onlyCode
            store().$patch((state) => {
                state.items = data
                state.state = this.config
            })
            
        }
    },
    beforeMount() {
        store().resetState()
    },
    async mounted() {
        this.get()
    }
}
</script>