<template>
    <div class="h-full w-full">
        <base-table :fields="config.fields" :items="items" :master="true"></base-table>
    </div>
</template>
<script setup>
</script>
<script>
export default {
    // props: {config: {type: Object}},
    data() {
        return {
            items: '',
            config: {
                title: 'Data Barang',
                child: false,
                permission: [],
                fields: [
                    {title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', show: true},
                    {title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date', show: true},
                    {title: 'Supir', key: 'supir', type: 'text', show: true},
                    {title: 'No Polisi', key: 'no_polisi', type: 'text', show: true},
                    {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                ],
            }
        }
    },
    methods: {
        async get() {
            // store().loader('on')
            // let data = await stokbarang.detail()
            // if(data) store().loader('off')
            // store().$patch((state) => {
            //     state.dialog = false
            // })
            // this.items = await stokbarang.detail()
        }
    },
    beforeMount() {
        // store().resetState()
    },
    mounted() {
        // this.get()
    },
}
</script>