import api from '@/utils/api'
import utils from '@/utils/utils'
import {store} from '@/utils/store'
export default {
    async pemasukan (param) {
        store().loader('on')
        let parameters = ''
        if(param) parameters = param
        else parameters = {
            tgl_awal: store().periode[0],
            tgl_akhir: store().periode[1],
        }
        let head = await api.getData('/pembelian_head', parameters)
        let detail = await api.getData('/pembelian_detail', parameters)
        let supplier = await api.getData('/supplier')
        let data = []
        if(!head) api.logout()
        head.map((item) => {
            let sp = supplier.filter(it => it.kode_supplier == item.kode_supplier)
            let dtl = detail.filter(it => it.no_pembelian == item.no_pembelian)
            let kode = []
            let nama = []
            let hsc = []
            let jumlah = ''
            for (let i = 0; i < dtl.length; i++) {
                kode.push(dtl[i].kode_barang)
                nama.push(dtl[i].nama_barang)
                jumlah = dtl[i].jumlah
            }
            item.supplier = sp != '' ? sp[0].nama : item.kode_supplier
            item.kode_barang = [...new Set(kode)].toString()
            item.nama_barang = [...new Set(nama)].toString()
            item.hs_code = [...new Set(hsc)].toString()
            item.rupiah = item.total_nilai * item.kurs,
            item.jumlah = jumlah
        })
        for (let i = 0; i < head.length; i++) {
            data.push({
                head: head[i],
                detail: detail.filter(item => head[i].no_pembelian == item.no_pembelian)
            })
            
        }
        store().loader('off')
        return data
    },
    async produksi () {
        let parameters = {
            tgl_awal: store().periode[0],
            tgl_akhir: store().periode[1],
        }
        store().loader('on')
        let tipe = store().master.tipe_dokumen
        let no = store().master.no_dokumen
        let kode = tipe+'-'+no

        let head = await api.getData('/produksi_head', parameters)
        let bahan = await api.getData('/produksi_detail_bahan', parameters)
        let barang = await api.getData('/produksi_detail_barang', parameters)
        if(!head) api.logout()
        let data = []
        let a = []
        let newh = head.filter(it => it.kode_group == kode)
        for (let i = 0; i < newh.length; i++) {
            let b = bahan.filter(item => item.no_produksi == newh[i].no_produksi)
            let c = barang.filter(item => item.no_produksi == newh[i].no_produksi)
            let kodebrg = [];
            let jml = []
            for (let j  = 0; j < c.length; j++) {
                kodebrg.push(c[j].kode_barang)
                jml.push(c[j].jumlah)
            }
            a.push({
                no_produksi: newh[i].no_produksi,
                tgl_produksi: newh[i].tgl_produksi,
                kode_group: newh[i].kode_group,
                kode_bahan: b[0].kode_barang,
                jumlah_bahan: b[0].jumlah,
                kode_barang: [...new Set(kodebrg)].toString(),
                jumlah_barang: jml.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
            })
            
        }
        for (let i = 0; i < a.length; i++) {
            data.push({
                head: a[i],
                detail: barang.filter(item => a[i].no_produksi == item.no_produksi)
            })
            
        }
        store().loader('off')
        return data
    },
    async pengeluaran (param) {
        let parameters = ''
        if(param) parameters = param
        else parameters = {
            tgl_awal: store().periode[0],
            tgl_akhir: store().periode[1],
        }
        store().loader('on')
        let head = await api.getData('/penjualan_head', parameters)
        let detail = await api.getData('/penjualan_detail', parameters)
        let pelanggan = await api.getData('/pelanggan')

        let data = []
        head.map(item => {
            let dtl = detail.filter(it => it.no_penjualan == item.no_penjualan)
            let kode = []
            let nama = []
            let hsc = []
            let satuan = []
            let jumlah = []
            let terkirim = 0
            let blm_terkirim = 0
            for (let i = 0; i < dtl.length; i++) {
                kode.push(dtl[i].kode_barang)
                nama.push(dtl[i].nama_barang)
                hsc.push(dtl[i].hs_code)
                satuan.push(dtl[i].satuan)
                jumlah.push(dtl[i].jumlah)
                terkirim = dtl[i].jumlah_terkirim
                blm_terkirim = dtl[i].jumlah - dtl[i].jumlah_terkirim
            }
            item.pelanggan = pelanggan.filter(it => it.kode_pelanggan == item.kode_pelanggan)[0].nama
            item.kode_barang = [...new Set(kode)].toString()
            item.nama_barang = [...new Set(nama)].toString()
            item.hs_code = [...new Set(hsc)].toString()
            item.satuan = [...new Set(satuan)].toString()
            item.jumlah = jumlah.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0)
            item.jumlah_terkirim = terkirim
            item.belum_terkirim = blm_terkirim
        })
        detail.map(item => item.total_harga = item.harga_jual * item.jumlah)
        for (let i = 0; i < head.length; i++) {
            data.push({
                head: head[i],
                detail: detail.filter(item => head[i].no_penjualan == item.no_penjualan)
            })
            
        }
        store().loader('off')
        return data
    },
    filterData(input, fl) {
        let data = {}
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < fl.length; j++) {
                if(input[i].title == fl[j].key) data[fl[j].key] = input[i].value
                if(fl[j].item) {
                    for (let k = 0; k < fl[j].item.length; k++) {
                        // data[fl[j].item[k].key] = input[i].title == fl[j].item[k].title ? input[i].value : fl[j].item[k].show
                        if(input[i].title == fl[j].item[k].title) data[fl[j].item[k].key] = input[i].value
                    }
                }
            }
        }
        return data
    },
    async filtered(input) {
        const periode = Object.fromEntries(
            Object.entries(input).filter(([key, value]) => value !== false && value !== true)
        )
        // store().$patch((state) => { state.periode = [periode.tgl_awal, periode.tgl_akhir]})
        if(periode.tgl_awal != undefined) {store().$patch((state) => { state.periode[0] = periode.tgl_awal })}
        if(periode.tgl_akhir != undefined) {store().$patch((state) => { state.periode[1] = periode.tgl_akhir })}
        
        let filterData = ''
        let p = {
            tgl_awal: store().periode[0],
            tgl_akhir: store().periode[1]
        }
        await this.pemasukan(p).then(response => filterData = response)
        if(filterData != '') store().$patch((state) => { state.items = filterData})
    },
}