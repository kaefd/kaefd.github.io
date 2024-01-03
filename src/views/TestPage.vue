<template>
   <span>test</span>
</template>
<script setup>
import { store } from '@/utils/store'
import utils from '@/utils/utils'
import api from '@/utils/api';
</script>
<script>
export default {
    
    methods: {
        async pro() {
            let per = {tgl_awal: '2023-01-01', tgl_akhir: '2023-12-31'}
            let head = await api.getData('produksi_head', per)
            let detail = await api.getData('produksi_detail_barang', per)
            let res = []
            let newh = head.filter(it => 
                it.kode_group == 'PPKEK-LDP-000595'
            )
            for (let i = 0; i < newh.length; i++) {
                for (let j = 0; j < detail.length; j++) {
                    if(newh[i].no_produksi == detail[j].no_produksi) {
                        res.push(detail[j])
                    }
                }
                
            }
            console.log(res);
        },
        async get () {
            let per = {tgl_awal: '2023-01-01', tgl_akhir: '2023-12-31'}
            let head = await api.getData('penjualan_head', per)
            let detail = await api.getData('penjualan_detail', per)
            let res = []
            let newh = head.filter(it => 
                it.kode_group == 'PPKEK-LDP-000595'
                // it.no_dokumen == '000682'
                
            )
            let pjl = []
            let nopen = []
            for (let i = 0; i < newh.length; i++) {
                for (let j = 0; j < detail.length; j++) {
                    if(newh[i].no_penjualan == detail[j].no_penjualan) {
                        if(detail[j].jumlah != detail[j].jumlah_terkirim) {
                            res.push(detail[j].jumlah_terkirim)
                            pjl.push(head[i].no_penjualan)
                        }
                    }
                }
                
            }
            let pgmH = await api.getData('pengiriman_head', per)
            let pgmD = await api.getData('pengiriman_detail', per)
            let pgm = []

            for (let i = 0; i < pgmH.length; i++) {
                for (let j = 0; j < pgmD.length; j++) {
                    if(pgmH[i].no_pengiriman == pgmD[j].no_pengiriman) {
                        if(pgmD[j].kode_group == 'PPKEK-LDP-000867') {
                            if(pgmD[j].kode_barang == 'RS') {
                                pgm.push(pgmD[j].no_pengiriman)
                            }
                        }
                    }
                }
            }
            console.log(pgm);
        }
    },
    // beforeMount() {
    //     return store().resetState()
    // },
    mounted() {
        this.get()
    }
}
</script>