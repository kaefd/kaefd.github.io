<template>
    <div class="py-16 ps-0 md:ps-18 w-full h-screen overflow-auto">
        <div class="mb-5 w-full px-5 md:px-8">
            <div class="w-[35vw]">
                <base-input type="date" variant="pills" label="periode" :value="mth" @input="dateInput"></base-input>
            </div>
        </div>
        <div class="px-5 md:px-8 flex flex-wrap items-center justify-center md:justify-start lg:justify-between gap-x-2 xl:gap-x-5 gap-y-5">
            <div v-for="card in cards" class=" flex flex-grow justify-center items-center rounded-2xl shadow-2xl overflow-hidden w-[20vw] min-w-[250px] h-36" :class="store().theme == 'dark' ? 'dark shadow-black' : 'bg-white shadow-slate-300'">
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
        <div class="px-0 md:px-8 w-full flex justify-center md:justify-start space-x-2 mt-8 mb-3">
            <div v-for="card in cards" @click="active(card)" class="h-10 w-20 rounded-lg flex items-center justify-center text-xs capitalize hover:bg-primary-hover cursor-pointer" :class="card.active ? 'bg-primary-hover' : ''">{{ card.key }}</div>
        </div>
        <div class="w-full px-0 md:px-8">
            <div class=" w-full rounded-0 md:rounded-xl p-5 capitalize" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
                <p class="font-bold text-center">statistik data {{ activeData.key }} bulan {{ utils.formatMonth(periode[1]) }}</p>
                <base-chart :chart="chart"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import dashboard from './dashboard'
import utils from '@/utils/utils'
import {store} from '@/utils/store'
</script>
<script lang="ts">
export default {
    data() {
        return {
            activeData: '',
            periode: '',
            mth: '',
            chart: '',
            cards: [
                {title: 'Total Pemasukan', key: 'pembelian', chart: {head: 'pembelian_head', key: 'pembelian', detail: 'pembelian_detail', series: ['BC23', 'BC40', 'PPKEK-LDP', 'PPKEK-TLDDP']}, content: 0, icon: 'ri-inbox-archive-line', class: 'primary', active: true},
                {title: 'Total Produksi', key: 'produksi', chart: {head: 'produksi_head', key: 'produksi', detail: 'produksi_detail_bahan', series: ['Produksi']}, content: 0, icon: 'ri-donut-chart-fill', class: 'secondary', active: false},
                {title: 'Total Pengeluaran', key: 'penjualan', chart: {head: 'penjualan_head', key: 'penjualan', detail: 'penjualan_detail', series: ['BC25', 'BC41']}, content: 0, icon: 'ri-inbox-unarchive-line', class: 'primary', active: false},
                {title: 'Total Pengiriman', key: 'pengiriman', chart: {head: 'pengiriman_head', key: 'pengiriman', detail: 'pengiriman_detail', series: ['pengiriman']}, content: 0, icon: 'ri-send-plane-line', class: 'secondary', active: false},
            ]
        }
    },
    methods: {
        active(value) {
            this.cards.map(item => item.active = item == value ? true : false)
            this.activeData = value
            this.chartData()
        },
        async chartData() {
            store().loader('on')
            this.chart = await dashboard.chart(this.activeData.chart, this.periode)
            let item = await dashboard.items(this.periode)
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].content = utils.numb(item[i].sum)
            }
            if(item) store().loader('off')
        },
        dateInput (val) {
            console.log(val);
            
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
        this.periode = store().periode
        this.mth = this.periode[1]
        this.active(this.cards[0])
        this.chartData()
    },
}
</script>