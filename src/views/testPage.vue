<script setup>
import api from '../service/api';
import functions from '../service/functions';
</script>
<script>
export default {
    data () {
        return {
            produksi: '',
            bahanproduksi: '',
            barangproduksi: '',
            pengeluaran: '',
            pengeluarandetail: '',
            pengiriman: '',
            pengirimandetail: '',
            hpro: [
                {title: 'no_produksi', key: 'no_produksi'},
                {title: 'kode_group', key: 'kode_group'},
                {title: 'barang_jadi', key: 'barang_jadi'},
                {title: 'jumlah', key: 'jumlah'},
            ],
            hpjl: [
                {title: 'no_penjualan', key: 'no_penjualan'},
                {title: 'kode_group', key: 'kode_group'},
                {title: 'no_dokumen', key: 'no_dokumen'},
                {title: 'kode_barang', key: 'kode_barang'},
                {title: 'jumlah', key: 'jumlah'},
                {title: 'terkirim', key: 'terkirim'},
            ],
            hpgm: [
                {title: 'no_pengiriman', key: 'no_pengiriman'},
                {title: 'no_penjualan', key: 'no_penjualan'},
                {title: 'kode_group', key: 'kode_group'},
                {title: 'kode_barang', key: 'kode_barang'},
                {title: 'jumlah', key: 'jumlah'},
            ]
        }
    },
    computed: {
        pro() {
            let a = []
            for (let i = 0; i < this.produksi.length; i++) {
                for (let j = 0; j < this.barangproduksi.length; j++) {
                    if(this.produksi[i].no_produksi == this.barangproduksi[j].no_produksi) {
                        a.push({
                            no_produksi: this.produksi[i].no_produksi,
                            kode_group: this.produksi[i].kode_group,
                            barang_jadi: this.barangproduksi[j].kode_barang,
                            jumlah: this.barangproduksi[j].jumlah,
                        })
                    }
                } 
            }
            return a
        },
        pjl() {
            let a = []
            for (let i = 0; i < this.pengeluaran.length; i++) {
                for (let j = 0; j < this.pengeluarandetail.length; j++) {
                    if(this.pengeluaran[i].no_penjualan == this.pengeluarandetail[j].no_penjualan) {
                        a.push({
                            no_penjualan: this.pengeluaran[i].no_penjualan,
                            kode_group: this.pengeluaran[i].kode_group,
                            no_dokumen: this.pengeluaran[i].no_dokumen,
                            kode_barang: this.pengeluarandetail[j].kode_barang,
                            jumlah: this.pengeluarandetail[j].jumlah,
                            terkirim: this.pengeluarandetail[j].jumlah_terkirim,
                        })
                    }
                } 
            }
            return a
        },
        pgm() {
            let a = []
            let b = []
                for (let j = 0; j < this.pengirimandetail.length; j++) {
                    // if(this.pengirimandetail[j].kode_barang == 'SPA') {
                        a.push({
                            no_pengiriman: this.pengirimandetail[j].no_pengiriman,
                            no_penjualan: this.pengirimandetail[j].no_penjualan,
                            kode_group: this.pengirimandetail[j].kode_group,
                            kode_barang: this.pengirimandetail[j].kode_barang,
                            jumlah: this.pengirimandetail[j].jumlah,
                        })
                        b.push(this.pengirimandetail[j].no_pengiriman)
                    // }
            }
            // let uniq = [...new Set(b)];
            // for (let i = 0; i < uniq.length; i++) {
            //     api.deletePengiriman(uniq[i])
            // }
            return a
        }
    },
    methods: {
        async fetch() {
            let produksi = await api.getProduksiHead(['2023-01-01', '2023-10-28'])
            // let bahanproduksi = await api.getProDBahan(['2023-01-01', '2023-10-28'])
            this.barangproduksi = await api.getProDBarang(['2023-01-01', '2023-10-28'])
            let pengeluaran = await api.getPenjualanHead(['2023-01-01', '2023-10-28'])
            this.pengeluarandetail = await api.getPenjualanDetail(['2023-01-01', '2023-10-28'])
            let pengirimandetail = await api.getPengirimanDetail(['2023-01-01', '2023-10-28'])
            this.pengiriman = await api.getPengirimanHead(['2023-01-01', '2023-10-28'])
            this.produksi = produksi.filter(item => item.kode_group == 'PPKEK-LDP-000790')
            // this.barangproduksi = barangproduksi.filter(item => item.kode_barang == 'SBJ')
            this.pengeluaran = pengeluaran.filter(item => item.kode_group == 'PPKEK-LDP-000790')
            // this.pengeluarandetail = pengeluarandetail.filter(item => item.kode_barang == 'SBJ')
            this.pengirimandetail = pengirimandetail.filter(item => item.kode_group == 'PPKEK-LDP-000790')
        },
        sum(param) {
            let a = ''
            if(param == 'pro') a = this.pro
            else if(param == 'pjl') a = this.pjl
            else if(param =='pgm') a = this.pgm
                let arr = []
                for (let i = 0; i < a.length; i++) {
                    arr.push(a[i].jumlah)
                }
                return arr.reduce((total, current) => {
                    return total + current;
                }, 0);
        }
    },
    mounted() {
        this.fetch()
    }
    
}
</script>
<template>
    <!-- cari produksi dengan kodegroup 2040 (barang spandek) -->
    <!-- cari pengelurana dengan kodegroup 2040 barng spandek -->
    <!-- cari pengiriman dengan kodegroup 2040 barng spandek -->
    <div class="d-flex justify-space-between">
        <div class="h-100">
            <v-data-table
            :headers="hpro"
            :items="pro"
            density="compact"
            class="h-100 text-caption"
            height="250"
            ></v-data-table>
            total tonase produksi: {{ functions.numb(sum('pro')) }} ton
            <v-data-table
            :headers="hpjl"
            :items="pjl"
            density="compact"
            class="h-100 text-caption"
            height="250"
            ></v-data-table>
            total tonase pengeluaran: {{ functions.numb(sum('pjl')) }} ton
        </div>
        <div class="h-100">
            <v-data-table
            :headers="hpgm"
            :items="pgm"
            density="compact"
            class="h-100 text-caption"
            height="550"
            ></v-data-table>
            total tonase pengiriman: {{ functions.numb(sum('pgm')) }} ton
        </div>
    </div>

</template>