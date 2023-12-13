<template>
    <base-page :config="config">
        <!-- <template #base-detail>
            <PemasukanDetail></PemasukanDetail>
        </template> -->
    </base-page>
</template>
<script setup>
import supplier from './supplier'
// import PemasukanDetail from './PemasukanDetail.vue'
import { store } from '@/utils/store'
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Data Supplier',
                permission: [
                    {title: 'Detail Data', key: 'lihat', value: true},
                ],
                fields: [
                    {title: 'Kode Supplier', key: 'kode_supplier', type: 'text', show: true, sort: 'desc'},
                    {title: 'Nama', key: 'nama', type: 'text', show: true, sort: 'desc'},
                    {title: 'Alamat', key: 'alamat', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kota', key: 'kota', type: 'text', show: true, sort: 'desc'},
                    {title: 'Negara', key: 'negara', type: 'text', show: true, sort: 'desc'},
                ],
                field_detail: [
                    {title: 'Kode Supplier', key: 'kode_supplier', type: 'text', show: true},
                    {title: 'Nama', key: 'nama', type: 'text', show: true},
                    {title: 'Alamat', key: 'alamat', type: 'text', show: true},
                    {title: 'Kota', key: 'kota', type: 'text', show: true},
                    {title: 'Negara', key: 'negara', type: 'text', show: true},
                ],
                filter: false,
            }
        }
    },
    methods: {
        async get () {
            store().loader('on')
            let data = await supplier.supplier()
            if(data) store().loader('off')
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