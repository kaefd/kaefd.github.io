<script setup>
import DatePicker from '../components/datepicker/datePicker.vue';
import textField from '../components/form/textField.vue'
import api from '../service/api';
import functions from '../service/functions';
</script>
<script>
export default {
    data () {
        return {
            pageTitle: 'Dashboard',
            periode: '',
            newperiode: '',
            full: false,
            grafik: ['Pemasukan', 'Produksi', 'Pengeluaran', 'Pengiriman'],
            active:[],
            options: {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: ''
                },
                stroke: {
                    curve: 'smooth',
                },
                colors: ["#65a3cd"]
            },
            series: [{
                name: 'series-1',
                data: ''
            }]
        }
    },
    created() {
        this.active[0] = true
        this.newperiode = ['2023-09-01', '2023-10-01']
    },
    computed: {
        dash_periode() {
            let m = this.periode.month
            let y = this.periode.year

            let awal = m < 9 ? y+'-'+'0'+(m+1)+'-'+'01' : (m > 11 ? y+'-'+(m)+'-'+'01' : y+'-'+(m+1)+'-'+'01')
            let akhir = m < 8 ? y+'-'+'0'+(m+2)+'-'+'01' : (m > 11 ? y+'-'+(m)+'-'+'01' : y+'-'+(m+2)+'-'+'01')
            // let akhir = m < 10 ? y+'-'+'0'+(m+2)+'-'+'01' : (m > 9 ? y+'-'+(m+2)+'-'+'01' : ( m > 11 ? y+'-'+(m)+'-'+'01' : y+'-'+(m+2)+'-'+'01'))

            return this.newperiode =[awal, akhir]
        }
    },
    methods: {
        page() {
            return this.$emit('page', this.pageTitle)
        },
        actived(index) {
            for (let i = 0; i < this.grafik.length; i++) {
                if(i == index) this.active[i] = true
                else this.active[i] = false
            }
        },
        async fetch() {
            let a = []
            let b = []
            let data = await api.getPemasukanHead(this.dash_periode)
            for (let i = 0; i < data.length; i++) {
                a.push(functions.numb(data[i].total_nilai))
                b.push(data[i].tgl_pembelian)
            }
            this.options.xaxis.categories = b
            this.series[0].data = a
        },
    },
    mounted() {
        this.page()
            this.fetch()
    }
}
</script>

<template>
    <v-container class="w-100 h-100">
        <DatePicker teleport-center v-model="periode"  variant="sas" :vnode-mounted="fetch()" :month="true" label="Periode" class="mb-4 w-100" />
        <div class="d-flex justify-space-between flex-wrap space-x-1">
            <div v-for="i in 4" :key="i" class="card-wrapper d-flex justify-center mb-3 mb-md-0">
                <div class="absolute preview-card"></div>
                <v-card class="w-100 h-100 card elevation-0 px-5 d-flex align-center">
                    <div class="w-100 d-flex justify-space-around align-center">
                        <div class="d-flex flex-column">
                            <span class="text-body-2 font-weight-medium text-grey-darken-2">Total Pemasukan</span>
                            <h1 :class="i % 2 ? 'text-orange' : 'text-blue-custom'">50</h1>
                        </div>
                        <div class="d-flex">
                            <img v-if="i % 2" src="../assets/img/masuk.png" alt="logo" style="width: 55px; height: 50px" />
                            <img v-else src="../assets/img/blue.png" alt="logo" style="width: 55px; height: 50px" />
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
        <div class="d-flex justify-space-between mt-5 w-100 h-400">
            <v-card class="table h-100 py-2 elevation-0">
                <div class="d-flex justify-space-around h-100">
                    <v-list class="d-flex flex-column text-caption rounded-s-xl h-100" active-color="orange">
                        <v-list-item v-for="list, i in grafik" :key="i" class="mb-1 list" @click="actived(i)" :active="active[i]" :class="{'active-list':active[i]}">{{ list }}</v-list-item>
                    </v-list>
                    <apexchart class="text-black" width="500" type="line" :options="options" :series="series" :stroke="stroke"></apexchart>
                    <v-btn @click="full = !full" variant="text" icon="mdi-fullscreen" color="blue-custom" class="text-h5"></v-btn>
                </div>
            </v-card>
            <v-card class="elevation-0 card2 h-100 pa-5">

            </v-card>
        </div>
    </v-container>
    <v-dialog v-model="full" width="auto">
        <v-card class="vh-100 ma-auto pa-10 rounded-xl">
            <apexchart class="text-black" width="800" type="line" :options="options" :series="series" :stroke="stroke"></apexchart>
        </v-card>
    </v-dialog>
</template>
<style>
.preview-card {
    height: 110px;
    width: 10%;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.075) !important;
}
.card-wrapper{
    height: 110px;
    width: 23%;
    border-radius: 20px !important;
}
.card{
    border-radius: 20px !important;
}
.table {
    width: 67%;
    border-radius: 20px !important;
}
.card2 {
    border-radius: 20px !important;
    width: 30%;
}
.h-400 {
    height: 60%;
}
.shadow-sm {
    box-shadow: 0 12px 30px 0 rgba(0, 0, 0, 0.041) !important;
}
.active-list {
    border-right-width: 4px;
    border-right-color: rgb(255, 166, 0);
}
.list:hover {
    background: rgba(255, 166, 0, 0.096);
}
.apexcharts-menu {
    background: rgba(255, 255, 255, 0.048) !important;
    position: absolute;
    top: 100%;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 3px;
    right: 10px;
    min-width: 110px;
    transition: .15s ease all;
    pointer-events: none;
}
.apexcharts-menu-item:hover {
    background: var(--v-theme-surface) !important;
}
.apexcharts-active  {
    background:  rgba(255, 255, 255, 0.349) !important;
}
.apexcharts-tooltip-title {
    background: rgba(167, 167, 167, 0.521) !important;
}
</style>