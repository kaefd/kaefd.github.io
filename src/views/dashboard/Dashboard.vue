<template>
    <div class="py-5 h-max w-full" :class="store().dark ? 'bg-dark-base' : 'bg-base'">
        <div class="w-full h-full">
            <div class="mb-5 px-3 md:px-8">
                <div class="w-full md:w-[24%] min-w-[250px]">
                    <base-input type="date" variant="pills" label="periode" :value="mth" @input="dateInput"></base-input>
                </div>
            </div>
            <div class="px-3 md:px-8 flex flex-wrap items-center justify-center md:justify-between lg:justify-between gap-x-2 xl:gap-x-5 gap-y-5">
                <div v-for="card in cards" class="flex justify-center flex-grow items-center rounded overflow-hidden w-[20vw] min-w-[250px] h-[10vw] min-h-[120px]" :class="store().dark ? 'dark shadow-black' : 'bg-white shadow-slate-300'">
                    <!-- <div class="absolute w-[20%]"> -->
                        <div class="h-full w-full flex justify-between px-7 items-center relative">
                            <div class="flex flex-col h-full justify-center space-y-1">
                                <span class="text-[1rem] lg:text-[1.2vw]">{{ card.title }}</span>
                                <span class="text-[2rem] lg:text-[2vw]" :class="'text-'+card.class">{{ card.content + ' T' }}</span>
                            </div>
                            <div class="text-[3.5rem] md:text-[4.5vw]" :class="'text-'+card.class">
                                <i :class="card.icon"></i>
                            </div>
                        </div>
                    <!-- </div> -->
                    <!-- <div class="w-32 h-28 z-[-1] rounded-2xl ms-auto -me-[4.6rem]" :class="'bg-'+card.class+'-hover'"></div> -->
                </div>
            </div>
            <div class="px-3 md:px-8 flex justify-center md:justify-start space-x-2 my-3">
                <div v-for="card in cards" @click="active(card)" class="h-12 w-28 text-sm rounded flex items-center justify-center capitalize hover:bg-primary-hover cursor-pointer" :class="card.active ? 'bg-primary-hover' : ''">{{ card.key }}</div>
            </div>
            <div class="w-full px-3 md:px-8 mb-3">
                <div class="relative w-full rounded-0 md:rounded px-3 md:px-5 pt-5 capitalize" :class="store().dark ? 'dark' : 'bg-white'">
                    <p class="mx-3 text-lg" :class="store().dark ? 'text-white' : 'text-black'">statistik data {{ activeData.key }}</p>
                    <p class="mx-3 mb-5" :class="store().dark ? 'text-gray-400' : 'text-gray-600'">bulan {{ utils.formatMonth(periode[0]) }}</p>
                    <base-chart :series="chart"/>
                </div>
            </div>
            <div class="px-3 md:px-8">
                <div class="w-full h-[600px] px-3 md:px-5 pt-5 pb-0 md:pb-15 rounded-0 md:rounded" :class="store().dark ? 'dark' : 'bg-white'">
                    <p class="mx-3 text-lg" :class="store().dark ? 'text-white' : 'text-black'">{{ config.title }}</p>
                    <base-table :title="config.title" :fields="config.fields.head" :filter="config.filter" :show_filter="true" :select_column="true" :export="true" :search="true" :items="store().data.items" :permission="config.permission" :s_table="true"></base-table>
                    <!-- <base-table :fields="config.fields" :items="items" :master="true" :permission="config.permission" :s_table="true"></base-table> -->
                </div>
            </div>
        </div>
        <base-loader v-if="store().loading"></base-loader>
    </div>
</template>
<script setup>
import dashboard from './dashboard'
import utils from '@/utils/utils'
import {store} from '@/utils/store'
import stokbarang from '@/views/laporan/stok-barang/stokbarang'
import otoritas from '@/router/otoritas'
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
                permission: {
                    create: false,
                    edit: false,
                    delete: false,
                    search: true,
                    select_column: true,
                    export: false,
                    filter: true,
                },
                fields: {
                    head: [
                        {title: 'Kategori Barang', key: 'kategori_barang', type: 'text', read: {show: true, disabled: true}, sort: 'desc', column: true},
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text', read: {show: true, disabled: true}, sort: 'desc', column: true},
                        {title: 'Nama Barang', key: 'nama_barang', type: 'text', read: {show: true, disabled: true}, sort: 'desc', column: true},
                        {title: 'HS Kode', key: 'hs_code', type: 'text', read: {show: true, disabled: true}, sort: 'desc', column: true},
                        {title: 'Satuan', key: 'satuan', type: 'text', read: {show: true, disabled: true}, sort: 'desc', column: true},
                        {title: 'Stok Akhir', key: 'stok_akhir', type: 'text', read: {show: true, disabled: true}, sort: 'desc', column: true},
                    ],
                },
                filter: [
                    {title: 'Tanggal', key: 'tanggal', type: 'date', show: true, default:'', rules: ['date:max '+ utils.today()] },
                    {title: 'Kode Group', key: 'kode_group', type: 'option', item: [{key: 'semua', title: 'Semua'}], default: {key: 'semua', title: 'Semua'}, show: true, rules: ['required']},
                    {title: 'Kategori Barang', key: 'kategori_barang', type: 'checkbox', show: true, item: [
                        {title: 'Bahan Baku', key: 'bahan_baku', value: true},
                        {title: 'Bahan Penolong', key: 'bahan_penolong', value: true},
                        {title: 'Barang Setengah Jadi', key: 'barang_setengah_jadi', value: true},
                        {title: 'Barang Jadi', key: 'barang_jadi', value: true},
                        {title: 'Barang Sisa (Scrap)', key: 'scrap', value: true},
                        {title: 'Mesin & Peralatan', key: 'peralatan', value: true}
                    ]},
                ],
            }
        }
    },
    methods: {
        active(value) {
            this.cards.map(item => item.active = item == value ? true : false)
            this.activeData = value
            this.updateChart()
        },
        init() {
            const check = otoritas.check("Dashboard")
            if(check) {
                this.updateChart()
                this.get()
                this.chartData()
            } else return this.$router.push('master/data-barang')
        },
        async get () {
            this.items = await stokbarang.stokbarang()
            store().data.items = this.items
            let kode_group = await stokbarang.kode_group()
            this.config.filter[1].item = this.config.filter[1].item.concat(kode_group)
            // store().$patch((state) => { state.state = this.config })
        },
        async chartData() {
            let item = await dashboard.items(this.periode)
            this.chart = await dashboard.chart(this.activeData.chart, this.periode)
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].content = utils.numb(item[i].sum)
            }
        },
        updateChart() {
            this.chart = dashboard.chart(this.activeData.chart, this.periode)
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
    },
    mounted() {
        this.init()
        store().TopBar = true
        store().AppBar = true
        store().init()
        store().loading = true
    }
}
</script>