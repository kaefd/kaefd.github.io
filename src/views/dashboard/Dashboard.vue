<template>
    <div class="pt-16 pb-5 h-screen ps-0 md:ps-20 overflow-auto">
        <div class="mb-5 ms-0 md:ms-4 px-3 md:px-5">
            <div class="w-[35vw]">
                <base-input type="date" variant="pills" label="periode" :value="mth" @input="dateInput"></base-input>
            </div>
        </div>
        <div class="ms-0 md:ms-4 px-3 md:px-5 flex flex-wrap items-center justify-center md:justify-between lg:justify-between gap-x-2 xl:gap-x-5 gap-y-5">
            <div v-for="card in cards" class=" flex flex-grow justify-center items-center rounded-2xl overflow-hidden w-[20vw] min-w-[250px] h-36" :class="store().theme == 'dark' ? 'dark shadow-black' : 'bg-white shadow-slate-300'">
                <!-- <div class="absolute w-[20%]"> -->
                    <div class="h-full w-full flex justify-between px-5 items-center relative">
                        <div class="flex flex-col h-full justify-center space-y-1">
                            <span>{{ card.title }}</span>
                            <span class="text-3xl" :class="'text-'+card.class">{{ card.content + ' T' }}</span>
                        </div>
                        <div class="text-[3.5rem]" :class="'text-'+card.class">
                            <i :class="card.icon"></i>
                        </div>
                    </div>
                <!-- </div> -->
                <!-- <div class="w-32 h-28 z-[-1] rounded-2xl ms-auto -me-[4.6rem]" :class="'bg-'+card.class+'-hover'"></div> -->
            </div>
        </div>
        <div class="ms-0 md:ms-4 px-3 md:px-5 flex justify-center md:justify-start space-x-2 mt-5 mb-3">
            <div v-for="card in cards" @click="active(card)" class="h-10 w-20 rounded-lg flex items-center justify-center text-xs capitalize hover:bg-primary-hover cursor-pointer" :class="card.active ? 'bg-primary-hover' : ''">{{ card.key }}</div>
        </div>
        <div class="ms-0 md:ms-4 px-3 md:px-5 mb-3">
            <div class="w-full rounded-0 md:rounded-xl px-3 md:px-5 pt-5 capitalize" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
                <p class="mx-3">statistik data {{ activeData.key }}</p>
                <p class="mx-3 mb-5 text-sm">bulan {{ utils.formatMonth(periode[0]) }}</p>
                <base-chart :series="chart"/>
            </div>
        </div>
        <div class="ms-0 md:ms-4 px-3 md:px-5">
            <div class="w-full h-[600px] px-3 md:px-5 pt-5 pb-0 md:pb-12 rounded-0 md:rounded-xl" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
                <p class="mx-3">{{ config.title }}</p>
                <p class="mx-3 text-sm">Bulan {{utils.formatMonth(new Date())}}</p>
                <base-table :fields="config.fields" :items="items" :master="true" :permission="config" :s_table="config.permission != '' ? false : true"></base-table>
            </div>
        </div>
    </div>
</template>
<script setup>
import dashboard from './dashboard'
import utils from '@/utils/utils'
import {store} from '@/utils/store'
import stokbarang from '@/views/laporan/stokbarang'
</script>
<script>
export default {
    data() {
        return {
            activeData: '',
            periode: '',
            mth: '',
            chart: '',
            cards: [
                {title: 'Total Pemasukan', key: 'pemasukan', chart: {head: 'pembelian_head', key: 'pembelian', detail: 'pembelian_detail', series: ['BC23', 'BC40', 'PPKEK-LDP', 'PPKEK-TLDDP']}, content: 0, icon: 'ri-inbox-archive-line', class: 'primary', active: true},
                {title: 'Total Produksi', key: 'produksi', chart: {head: 'produksi_head', key: 'produksi', detail: 'produksi_detail_bahan', series: ['Produksi']}, content: 0, icon: 'ri-donut-chart-fill', class: 'secondary', active: false},
                {title: 'Total Pengeluaran', key: 'pengeluaran', chart: {head: 'penjualan_head', key: 'penjualan', detail: 'penjualan_detail', series: ['BC25', 'BC41']}, content: 0, icon: 'ri-inbox-unarchive-line', class: 'primary', active: false},
                {title: 'Total Pengiriman', key: 'pengiriman', chart: {head: 'pengiriman_head', key: 'pengiriman', detail: 'pengiriman_detail', series: ['pengiriman']}, content: 0, icon: 'ri-send-plane-line', class: 'secondary', active: false},
            ],
            items: '',
            config: {
                title: 'Data Stok Barang',
                child: false,
                permission: [],
                fields: [
                    {title: 'Kategori Barang', key: 'kategori_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true, sort: 'desc'},
                    {title: 'Stok Akhir', key: 'stok_akhir', type: 'text', show: true, sort: 'desc'},
                ],
                filter: [],
            }
        }
    },
    methods: {
        active(value) {
            this.cards.map(item => item.active = item == value ? true : false)
            this.activeData = value
            this.updateChart()
        },
        async get () {
            store().loader('on')
            this.items = await stokbarang.barang()
            if(this.items) store().loader('off')
            // store().$patch((state) => { state.state = this.config })
        },
        async chartData() {
            store().loader('on')
            let item = await dashboard.items(this.periode)
            this.chart = await dashboard.chart(this.activeData.chart, this.periode)
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].content = utils.numb(item[i].sum)
            }
            if(item) store().loader('off')
        },
        async updateChart() {
            this.chart = await dashboard.chart(this.activeData.chart, this.periode)
        },
        dateInput (val) {
            const m = val.value.month + 1
            const mt = m < 10 ? '0' + m : m
            const y = val.value.year
            const awal = y + '-' + mt + '-01'
            const akhir = y + '-' + mt + '-31'
            this.periode = [awal, akhir]
            this.chartData()
            
        }
    },
    beforeMount() {
        store().resetState()
        const pr = new Date(store().periode[1])
        const mnt = pr.getMonth()
        const yr = pr.getFullYear()
        const p = {
            title: 'periode',
            value: {
                month: mnt,
                year: yr
            }
        }
        const m = p.value.month + 1
        const mt = m < 10 ? '0' + m : m
        const y = p.value.year
        const awal = y + '-' + mt + '-01'
        const akhir = y + '-' + mt + '-31'

        this.periode = [awal, akhir]
        // this.periode = store().periode
        this.mth = awal
        this.active(this.cards[0])
        this.updateChart()
    },
    mounted() {
        store().loader('on')
        this.chartData()
        this.get()
        store().loader('off')
    }
}
</script>