<script setup>
import LineChart from '../components/chart/LineChart.vue';
import DatePicker from '../components/datepicker/datePicker.vue';
// import textField from '../components/form/textField.vue'
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
            chartLine: {
                series: [],
                xaxis: [],
                stroke: {
                    show: true,
                    curve: 'smooth',
                    width: 1
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                    }
                },
            },
            cardData: [
                {title: 'Pemasukan', value: 0},
                {title: 'Produksi', value: 0},
                {title: 'Pengeluaran', value: 0},
                {title: 'Pengiriman', value: 0}
            ]
        }
    },
    created() {
        this.active[0] = true
        this.dash_periode
    },
    computed: {
        dash_periode() {
            let m = this.periode.month
            let y = this.periode.year

            let awal = m < 9 ? y+'-'+'0'+(m+1)+'-'+'01' : (m > 11 ? y+'-'+(m)+'-'+'01' : y+'-'+(m+1)+'-'+'01')
            let akhir = m < 8 ? y+'-'+'0'+(m+2)+'-'+'01' : (m > 11 ? y+'-'+(m)+'-'+'01' : y+'-'+(m+2)+'-'+'01')
            // let akhir = m < 10 ? y+'-'+'0'+(m+2)+'-'+'01' : (m > 9 ? y+'-'+(m+2)+'-'+'01' : ( m > 11 ? y+'-'+(m)+'-'+'01' : y+'-'+(m+2)+'-'+'01'))
            if(this.periode == '') {
                return ['2023-09-01', '2023-10-01']
            } else return [awal, akhir]
        }
    },
    methods: {
        page() {
            return this.$emit('page', this.pageTitle)
        },
        actived(index) {
            let a = ''
            for (let i = 0; i < this.grafik.length; i++) {
                if(i == index) {
                    if(this.grafik[i] == 'Pemasukan') {
                        this.active[i] = true
                        a = this.pemasukan()
                    }
                    else if(this.grafik[i] == 'Produksi') {
                        this.active[i] = true
                        a = this.produksi()
                    }
                    else if(this.grafik[i] == 'Pengeluaran') {
                        this.active[i] = true
                        a = this.pengeluaran()
                    }
                    else if(this.grafik[i] == 'Pengiriman') {
                        this.active[i] = true
                        a = this.pengiriman()
                    }
                }
                else this.active[i] = false
            }
            return a
        },
        fetch() {
            this.pemasukan(),
            this.produksi(),
            this.pengeluaran()
            this.pengiriman()
        },
        async pemasukan() {
            let ldp = []
            let tld = []
            let bc2 = []
            let bc4 = []
            let all = []
            let b = []
            let data = await api.getPemasukanHead(this.dash_periode)
            for (let i = 0; i < data.length; i++) {
                if(data[i].tipe_dokumen == 'BC23') {
                    bc2.push(functions.numb(data[i].total_nilai))
                }
                if(data[i].tipe_dokumen == 'BC40') {
                    bc4.push(functions.numb(data[i].total_nilai))
                }
                if(data[i].tipe_dokumen == 'PPKEK-LDP') {
                    ldp.push(functions.numb(data[i].total_nilai))
                }
                if(data[i].tipe_dokumen == 'PPKEK-TLDDP') {
                    tld.push(functions.numb(data[i].total_nilai))
                }
                all.push(functions.numb(data[i].total_nilai))
                b.push(data[i].tgl_pembelian)
            }
            this.chartLine.xaxis = ' '
            this.chartLine.series = [
                {name: 'BC23', type: 'column', color: '#FFD89D', data: bc2},
                {name: 'BC40', type: 'column', color: '#245F86', data: bc4},
                {name: 'PPKEK-LDP', type: 'column', color: '#ff9800', data: ldp},
                {name: 'PPKEK-TLDDP', type: 'column', color: '#5fa0cb', data: tld},
                {name: 'Semua', type: 'area', color: '#cbe1eb', data: all},
            ]
            this.cardData[0].value = data.length
        },
        async produksi() {
            let a = []
            let b = []
            let head = await api.getProduksiHead(this.dash_periode)
            let barang = await api.getProDBahan(this.dash_periode)
            for (let i = 0; i < head.length; i++) {
                for (let j = 0; j < barang.length; j++) {
                    if(head[i].no_produksi == barang[j].no_produksi) {
                        a.push(functions.numb(barang[i].jumlah, 1, true))
                        b.push(head[i].tgl_produksi)
                    }
                }
            }
            this.chartLine.stroke.show = true
            this.chartLine.xaxis = ' '
            this.chartLine.series = [
                {name: 'area', type: 'area', color: '#cbe1eb', data: a},
                {name: 'column', type: 'column', color: '#245F86', data: a},
            ]
            this.cardData[1].value = head.length
        },
        async pengeluaran() {
            let open = []
            let close = []
            let bc2 = []
            let bc4 = []
            let all = []
            let b = []
            let data = await api.getPenjualanHead(this.dash_periode)
            let detail = await api.getPenjualanDetail(this.dash_periode)
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < detail.length; j++) {
                    if(data[i].no_penjualan == detail[j].no_penjualan) {
                        if(data[i].tipe_dokumen == 'BC25') {
                            bc2.push(functions.numb(data[i].total_penjualan))
                        }
                        if(data[i].tipe_dokumen == 'BC41') {
                            bc4.push(functions.numb(data[i].total_penjualan))
                        }
                        if(detail[j].jumlah_terkirim == detail[j].jumlah) {
                            close.push(functions.numb(data[i].total_penjualan))
                        }
                        if(detail[j].jumlah_terkirim != detail[j].jumlah) {
                            open.push(functions.numb(data[i].total_penjualan))
                        }
                        all.push(functions.numb(data[i].total_penjualan))
                        b.push(data[i].tgl_pembelian)
                    }
                }
            }
            this.chartLine.xaxis = ' '
            this.chartLine.series = [
                {name: 'BC23', type: 'column', color: '#FFD89D', data: bc2},
                {name: 'BC40', type: 'column', color: '#245F86', data: bc4},
                {name: 'open', type: 'column', color: '#ff9800', data: open},
                {name: 'close', type: 'column', color: '#5fa0cb', data: close},
                {name: 'Semua', type: 'area', color: '#cbe1eb', data: all},
            ]
            this.cardData[2].value = data.length
        },
        async pengiriman() {
            let a = []
            let b = []
            let head = await api.getPengirimanHead(this.dash_periode)
            let detail = await api.getPengirimanDetail(this.dash_periode)
            for (let i = 0; i < head.length; i++) {
                for (let j = 0; j < detail.length; j++) {
                    if(head[i].no_pengiriman == detail[j].no_pengiriman) {
                        a.push(functions.numb(detail[j].jumlah, 1, true))
                        b.push(head[i].tgl_pengiriman)
                    }
                }
            }
            this.chartLine.stroke.show = true
            this.chartLine.xaxis = ' '
            this.chartLine.series = [
            {name: 'column', type: 'column', color: '#FF9800', data: a},
            ]
            this.cardData[3].value = head.length
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
        <DatePicker v-model="periode" :on-vnode-mounted="actived(0)"  variant="sas" :month="true" label="Periode" class="mb-4 w-100" />
        <div class="d-flex justify-space-between flex-wrap space-x-1">
            <div v-for="card, c in cardData" :key="c" class="card-wrapper d-flex justify-center mb-3 mb-md-0">
                <div class="absolute preview-card"></div>
                <v-card class="w-100 h-100 card elevation-0 px-5 d-flex align-center">
                    <div class="w-100 d-flex justify-space-around align-center">
                        <div class="d-flex flex-column">
                            <span class="text-body-2 font-weight-medium text-grey-darken-2">Total {{ card.title }}</span>
                            <h1 :class="c % 2 ? 'text-orange' : 'text-blue-custom'">{{card.value}}</h1>
                        </div>
                        <div class="d-flex">
                            <img v-if="c % 2" src="../assets/img/masuk.png" alt="logo" style="width: 55px; height: 50px" />
                            <img v-else src="../assets/img/blue.png" alt="logo" style="width: 55px; height: 50px" />
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
        <div class="d-flex justify-space-between mt-5 w-100 h-400">
            <v-card class="table h-100 py-2 elevation-0 w-100">
                <div class="d-flex justify-space-around h-100 w-100">
                    <v-list class="d-flex flex-column text-caption rounded-s-xl h-100" active-color="orange">
                        <v-list-item v-for="list, i in grafik" :key="i" class="mb-1 list" @click="actived(i)" :active="active[i]" :class="{'active-list':active[i]}">{{ list }}</v-list-item>
                    </v-list>
                    <!-- <apexchart class="text-black" width="500" type="line" :options="options" :series="series" :stroke="stroke"></apexchart> -->
                    <LineChart :chart="chartLine" width="900" height="320" />
                    <v-btn @click="full = !full" variant="text" icon="mdi-fullscreen" color="blue-custom" class="text-h5"></v-btn>
                </div>
            </v-card>
            <!-- <v-card class="elevation-0 card2 h-100 pa-5">

            </v-card> -->
        </div>
    </v-container>
    <v-dialog v-model="full" width="auto" transition="dialog-bottom-transition">
        <v-card class="h-100 ma-auto d-flex justify-center align-center px-10 py-3 rounded-xl">
            <LineChart :chart="chartLine" width="800" />
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