<template>
    <base-page :config="config">
        <template #header-content>
            <DetailPengiriman />    
        </template>
    </base-page>
</template>
<script setup>
import DetailPengiriman from './DetailPengiriman.vue'
import track from './track'
import { store } from '@/utils/store';
</script>
<script>
export default {
    props: {user: {type: Object}},
    data() {
        return {
            items: '',
            config: {
                title: 'Pengiriman',
                child: false,
                permission: [],
                fields: [
                    {title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', show: true, sort: 'desc'},
                    {title: 'Tanggal Kirim', key: 'tgl_pengiriman', type: 'date', show: true, sort: 'desc'},
                    {title: 'Tonase', key: 'jumlah', type: 'number', show: true, sort: 'desc'},
                    {title: 'Supir', key: 'supir', type: 'text', show: true, sort: 'desc'},
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
            this.items = await track.pengiriman(this.user)
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