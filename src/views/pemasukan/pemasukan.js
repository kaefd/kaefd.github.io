import api from '@/utils/api'
import {store} from '@/utils/store'
import alert from '@/utils/alert'
export default {
    // parameters(value) {
    //     if(value) return  value
    //     else return {
    //         tgl_awal: store().periode[0],
    //         tgl_akhir: store().periode[1],
    //     }
    // },
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
            for (let i = 0; i < dtl.length; i++) {
                kode.push(dtl[i].kode_barang)
                nama.push(dtl[i].nama_barang)
                hsc.push(dtl[i].hs_code)
            }
            item.supplier = sp != '' ? sp[0].nama : item.kode_supplier
            item.kode_barang = [...new Set(kode)].toString()
            item.nama_barang = [...new Set(nama)].toString()
            item.hs_code = [...new Set(hsc)].toString()
            item.rupiah = item.total_nilai * item.kurs
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
    filterData(input, fl) {
        let data = {}
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < fl.length; j++) {
                if(input[i].title == fl[j].key) data[fl[j].key] = input[i].value
                if(fl[j].item) {
                    for (let k = 0; k < fl[j].item.length; k++) {
                        if(input[i].title == fl[j].item[k].title) {
                            // let n_fl = fl[j].item[k].replace("-", "")
                            data[fl[j].item[k].key] = input[i].value
                        }
                    }
                }
            }
        }
        return data
    },
    async filtered(input) {
        let periode = Object.fromEntries(
            Object.entries(input).filter(([key, value]) => value !== false && value !== true)
        )
        // if(periode) store().$patch((state) => { state.periode = [periode.tgl_awal, periode.tgl_akhir]})
        
        let ft_kategori = store().state.filter[2].item
        if(input != '') {
            ft_kategori.map((item) => {
                let same = Object.fromEntries(Object.entries(input).filter(([key]) => key == item.key))
                if(same[Object.keys(same)] != undefined) item.show = same[Object.keys(same)]
                else item.show = true
            })
        }
        store().$patch((state) => { state.state.filter[2].item = ft_kategori})
        const filtered = ft_kategori.filter(item => item.show === true)
        let x = ''
        store().$patch((state) => { 
            state.periode[0] = periode.tgl_awal || state.periode[0]
            state.periode[1] = periode.tgl_akhir || state.periode[1]
        })
        let p = {
            tgl_awal: store().periode[0],
            tgl_akhir: store().periode[1]
        }
        // if(periode) p = {tgl_awal: periode.tgl_awal, tgl_akhir: periode.tgl_akhir}
        // else p = false
        // if(p) {
            await this.pemasukan(p).then(response => x = response)
            let filterData = x.filter(it =>
                filtered.some(k => it.head.tipe_dokumen.includes(k.title))
            )
            if(filtered != '') store().$patch((state) => { state.items = filterData})
            else store().$patch((state) => { state.items = x })
        // }
        // } else alert.warning(null, x)
        // const periode = [filtered.tgl_awal, filtered.tgl_akhir]
        // let keys = Object.keys(filtered)
        // let newk = []
        // for (let i = 0; i < keys.length; i++) {
        //     if(keys[i] != 'tgl_awal' && keys[i] != 'tgl_akhir') {
        //         if(keys[i] == 'PPKEKLDP') newk.push('PPKEK-LDP')
        //         else if(keys[i] == 'PPKEKTLDDP') newk.push('PPKEK-TLDDP')
        //         else newk.push(keys[i])
        //     }
        // }
        // let x = ''
        // await this.pemasukan({tgl_awal: periode[0], tgl_akhir: periode[1]}).then(response => x = response)
        // const filterData = x.filter(it =>
        //     newk.some(k => it.head.tipe_dokumen.includes(k))
        // )
        // if(newk != '') store().$patch((state) => { state.items = filterData})
        // else store().$patch((state) => { state.items = x})

    },
    create(data) {
        let detail = store().detail
        let newDetail = []
        for (let i = 0; i < detail.length; i++) {
            newDetail.push({
                kode_barang: detail[i].kode_barang,
                jumlah:detail[i].jumlah,
                jumlah_diterima:detail[i].jumlah_diterima,
                nilai:detail[i].nilai
            })
        }
        let json = JSON.stringify(newDetail)
        let payload = {
            tgl_pembelian: data.tgl_pembelian,
            tipe_dokumen: data.tipe_dokumen,
            no_dokumen: data.no_dokumen,
            tgl_dokumen: data.tgl_dokumen,
            kode_supplier: data.supplier.kode_supplier,
            no_invoice: data.no_invoice,
            no_bl: data.no_bl,
            persentase: data.persentase,
            mata_uang: data.mata_uang,
            kurs: data.kurs,
            pembelian_detail: json
        }
        api.create('/pembelian_head', payload).then(res => {
            alert.success(null, res.data).then(
                setTimeout(() => {
                    location.reload()
                }, 2500)
            )
        })
    },
    delete(data) {
        alert.confirm('Apakah anda yakin ?', 'Anda akan menghapus '+data.no_pembelian).then((result) => {
            if(result.isConfirmed) {
                api.delete('pembelian_head', {no_pembelian: data.no_pembelian}).then(result => {
                    alert.success(null, 'Data Berhasil Dibatalkan').then(
                        setTimeout(() => {
                            location.reload()
                        }, 2500))
                }).catch((error) => {
                    alert.failed('Gagal !', error.response.data)
                })
            }
        })
    },
}