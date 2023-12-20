import api from '@/utils/api'
import { store } from '@/utils/store'

export default {
    async items (p) {
        let param = {tgl_awal: p[0], tgl_akhir: p[1]}
        let url = [
            {name: 'pemasukan', key: 'no_pembelian', head: '/pembelian_head', detail: '/pembelian_detail'},
            {name: 'produksi', key: 'no_produksi', head: '/produksi_head', detail: '/produksi_detail_bahan'},
            {name: 'pengeluaran', key: 'no_penjualan', head: '/penjualan_head', detail: '/penjualan_detail'},
            {name: 'pengiriman', key: 'no_pengiriman', head: '/pengiriman_head', detail: '/pengiriman_detail'}
        ]
        let sum = {
            pemasukan: [],
            produksi: [],
            pengeluaran: [],
            pengiriman: []
        }
        let data = []
        for (let i = 0; i < url.length; i++) {
            let h = await api.getData(url[i].head, param)
            let d = await api.getData(url[i].detail, param)
            for (let j = 0; j < h.length; j++) {
                for (let k = 0; k < d.length; k++) {
                    if(h[j][url[i].key] == d[k][url[i].key]) sum[url[i].name].push(d[k].jumlah)
                }
            }
            data.push({
                name: url[i].name,
                data: sum[url[i].name],
                sum: sum[url[i].name].reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)/1000,
            })
        }
        return data
    },
    async chart(value, periode) {
        console.log(periode);
        let w = periode[0]
        let k = periode[1]
        // let awal = w.slice(0, 7)
        // let akhir = k.slice(0, 7)
        // const param = [
        //     {tgl_awal: awal + '-01', tgl_akhir: akhir + '-07'},
        //     {tgl_awal: awal + '-08', tgl_akhir: akhir + '-14'},
        //     {tgl_awal: awal + '-15', tgl_akhir: akhir + '-21'},
        //     {tgl_awal: awal + '-22', tgl_akhir: akhir + '-31'},
        // ]
        let param = {
            tgl_awal: w,
            tgl_akhir: k
        }
        let jumlah = {
            bc23: [],
            bc25: [],
            bc40: [],
            bc41: [],
            ldp: [],
            tld: [],
            other: [],
        }
        let data =  []
        
        // for (let i = 0; i < 4; i++) {
            let c23 = []
            let c25 = []
            let c40 = []
            let c41 = []
            let dp = []
            let tl = []
            let other = []
            let tgl = []
            let head = await api.getData(value.head, param)
            let detail = await api.getData(value.detail, param)
            for (let k = 0; k < head.length; k++) {
                for (let j = 0; j < detail.length; j++) {
                    if(detail[j]['no_'+value.key] == head[k]['no_'+value.key]) {
                        // if(head[k].tipe_dokumen == 'BC23') c23.push(detail[j].jumlah)
                        // if(head[k].tipe_dokumen == 'BC25') c25.push(detail[j].jumlah)
                        // if(head[k].tipe_dokumen == 'BC40') c40.push(detail[j].jumlah)
                        // if(head[k].tipe_dokumen == 'BC41') c41.push(detail[j].jumlah)
                        // if(head[k].tipe_dokumen == 'PPKEK-LDP') dp.push(detail[j].jumlah)
                        // if(head[k].tipe_dokumen == 'PPKEK-TLDDP') tl.push(detail[j].jumlah)
                        // else other.push(detail[j].jumlah)
                        other.push(detail[j].jumlah/1000)
                        tgl.push(head[k]['tgl_'+value.key])
                    }
                }
            }
            // jumlah.bc23.push(c23.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)/1000)
            // jumlah.bc25.push(c25.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)/1000)
            // jumlah.bc40.push(c40.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)/1000)
            // jumlah.bc41.push(c41.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)/1000)
            // jumlah.ldp.push(dp.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)/1000)
            // jumlah.tld.push(tl.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)/1000)
            // jumlah.other.push(other.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)/1000)
        // }
        // for (let i = 0; i < value.series.length; i++) {
        //     if(value.series[i] == 'BC23') data.push({name: 'BC23', sum: jumlah['bc23'].reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0), data: jumlah.bc23})
        //     else if(value.series[i] == 'BC25') data.push({name: 'BC25', sum: jumlah.bc25.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0), data: jumlah.bc25})
        //     else if(value.series[i] == 'BC40') data.push({name: 'BC40', sum: jumlah.bc40.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0), data: jumlah.bc40})
        //     else if(value.series[i] == 'BC41') data.push({name: 'BC41', sum: jumlah.bc41.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0), data: jumlah.bc41})
        //     else if(value.series[i] == 'PPKEK-LDP') data.push({name: 'PPKEK-LDP', sum: jumlah.ldp.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0), data: jumlah.ldp})
        //     else if(value.series[i] == 'PPKEK-TLDDP') data.push({name: 'PPKEK-TLDDP', sum: jumlah.tld.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0), data: jumlah.tld})
        //     else data.push({name: value.series[i], sum: jumlah.other.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0), data: jumlah.other})
        // }
        store().$patch((state) => state.cpr = tgl)
        data = [{
                name: value.key,
                data: other
            }]
        return data
    }
}