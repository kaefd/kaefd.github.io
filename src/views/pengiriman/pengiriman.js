import api from '@/utils/api'
import alert from '@/utils/alert'
import {store} from '@/utils/store'
export default {
    // parameters(value) {
    //     if(value) return  value
    //     else return {
    //         tgl_awal: store().periode[0],
    //         tgl_akhir: store().periode[1],
    //     }
    // },
    async pengiriman (param) {
        let parameters = ''
        if(param) parameters = param
        else parameters = {
            tgl_awal: store().periode[0],
            tgl_akhir: store().periode[1],
        }
        store().loader('on')
        let head = await api.getData('/pengiriman_head', parameters)
        let detail = await api.getData('/pengiriman_detail', parameters)
        let bongkar = await api.getData('/alamat_bongkar')
        let pelanggan = await api.getData('/pelanggan')
        head.map(item => {
            let dtl = detail.filter(p => p.no_pengiriman == item.no_pengiriman)
            let kodeg = []
            let kode = []
            let nama = []
            let satuan = []
            for (let i = 0; i < dtl.length; i++) {
                kodeg.push(dtl[i].kode_group)
                kode.push(dtl[i].kode_barang)
                nama.push(dtl[i].nama_barang)
                satuan.push(dtl[i].satuan)
            }
            item.tujuan_bongkar = bongkar.filter(it => it.kode_pelanggan == item.kode_alamat_bongkar)[0].nama,
            item.alamat = bongkar.filter(it => it.kode_pelanggan == item.kode_alamat_bongkar)[0].alamat
            item.kabupaten = bongkar.filter(it => it.kode_pelanggan == item.kode_alamat_bongkar)[0].kabupaten,
            item.pelanggan = pelanggan.filter(p => p.kode_pelanggan == item.kode_pelanggan)[0].nama
            item.kode_group = [...new Set(kodeg)].toString()
            item.kode_barang = [...new Set(kode)].toString()
            item.nama_barang = [...new Set(nama)].toString()
            item.satuan = [...new Set(satuan)].toString()
        })
        // detail.map(async item => {
        //     let p = {
        //         tgl_awal: '2023-09-01',
        //         tgl_akhir: '2023-11-30',
        //         no_penjualan: item.no_penjualan
        //     }
        //     let pjl = await api.getData('/penjualan_head?', p)
        //     item.no_dokumen = pjl[0].no_dokumen
        //     item.tipe_dokumen = pjl[0].tipe_dokumen
        // })
        let data = []
        for (let i = 0; i < head.length; i++) {
            data.push({
                head: head[i],
                detail: detail.filter(item => head[i].no_pengiriman == item.no_pengiriman)
            })
            
        }
        store().loader('off')
        return data
    },
    detail(data) {
        data.map(async item => {
            let p = {
                tgl_awal: '2023-09-01',
                tgl_akhir: '2023-11-30',
                no_penjualan: item.no_penjualan
            }
            let pjl = await api.getData('/penjualan_head?', p)
            item.no_dokumen = pjl[0].no_dokumen
            item.tipe_dokumen = pjl[0].tipe_dokumen
        })
        store().$patch((state) => {state.detail = data})
    },
    async blmTerkirim() {
        let head = await api.getData('penjualan_head/belum_terkirim')
        let detail = await api.getData('penjualan_detail/belum_terkirim')
        let stokBarang = await api.getData('group_barang')
        // const data = await Promise.all(head.map(async item => {
        //     let stok = stokBarang.find(async s => {
        //         const kg = s.kode_group == await item.kode_group
        //         const kb = s.kode_barang == detail.find(async d => d.no_penjualan == await item.no_penjualan).kode_barang
        //         return kg && kb
        //     })
        //     item.nopen = item.tipe_dokumen + '-' + item.no_dokumen
        //     item.nama_barang = detail.find(d => d.no_penjualan == item.no_penjualan)
        //     item.blm_terkirim = detail.find(async d => d.no_penjualan == await item.no_penjualan).jumlah - detail.find(async d => d.no_penjualan == await item.no_penjualan).jumlah_terkirim
        //     item.stok_barang = stok.stok_akhir
        // }))
        let data = []
        for (let i = 0; i < head.length; i++) {
            for (let j = 0; j < detail.length; j++) {
                if(detail[j].no_penjualan == head[i].no_penjualan) {
                    for (let k = 0; k < stokBarang.length; k++) {
                        if(stokBarang[k].kode_group == head[i].kode_group && stokBarang[k].kode_barang == detail[j].kode_barang) {
                            data.push({
                                kode_barang: detail[j].kode_barang,
                                nama_barang: detail[j].nama_barang,
                                no_penjualan: head[i].no_penjualan,
                                kode_group: head[i].kode_group,
                                nopen: head[i].tipe_dokumen + '-' + head[i].no_dokumen,
                                tipe_dokumen: head[i].tipe_dokumen,
                                no_dokumen: head[i].no_dokumen,
                                belum_terkirim: detail[j].jumlah - detail[j].jumlah_terkirim,
                                stok_akhir: stokBarang[k].stok_akhir,
                                satuan: detail[j].satuan,
                            })
                        }
                    }
                }
            }
        }
        return data
    },
    filterData(input, fl) {
        let data = {}
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < fl.length; j++) {
                if(input[i].title == fl[j].key) data[fl[j].key] = input[i].value
                if(fl[j].item) {
                    for (let k = 0; k < fl[j].item.length; k++) {
                        if(input[i].title == fl[j].item[k]) {
                            let n_fl = fl[j].item[k].replace("-", "")
                            data[n_fl] = input[i].value
                        }
                    }
                }
            }
        }
        return data
    },
    async filtered(input) {
        const periode = Object.fromEntries(
            Object.entries(input).filter(([key, value]) => value !== false)
        )
        // const periode = [filtered.tgl_awal, filtered.tgl_akhir]
        let x = ''
        store().$patch((state) => { 
            state.periode[0] = periode.tgl_awal || state.periode[0]
            state.periode[1] = periode.tgl_akhir || state.periode[1]
        })
        let p = {
            tgl_awal: store().periode[0],
            tgl_akhir: store().periode[1]
        }
        await this.pengiriman(p).then(response => x = response)
        store().$patch((state) => { state.items = x})
    },
    create(data) {
        let detail = store().detail
        let newDetail = []
        for (let i = 0; i < detail.length; i++) {
            newDetail.push({
                no_pengiriman: data.no_pengiriman,
                no_penjualan: detail[i].no_penjualan,
                no_urut: 1,
                kode_barang: detail[i].kode_barang,
                jumlah:detail[i].jumlah,
                kode_konversi:detail[i].kode_konversi || '',
                jumlah_konversi:detail[i].jumlah_konversi || 0,
            })
        }
        let json = JSON.stringify(newDetail)
        let payload = {
            no_pengiriman: data.no_pengiriman,
            tgl_pengiriman: data.tgl_pengiriman,
            kode_pelanggan: data.pelanggan.kode_pelanggan,
            kode_alamat_bongkar: data.tujuan_bongkar.kode_pelanggan,
            keterangan: data.keterangan || '',
            supir: data.supir,
            no_polisi: data.no_polisi,
            pengiriman_detail: json
        }
        api.create('/pengiriman_head', payload).then(res => {
            alert.success(null, res.data).then(
                setTimeout(() => {
                    location.reload()
                }, 2500)
            )
        })
    },
    delete(data) {
        alert.confirm('Apakah anda yakin ?', 'Anda akan menghapus '+data.no_pengiriman).then((result) => {
            if(result.isConfirmed) {
                api.delete('pengiriman_head', {no_pengiriman: data.no_pengiriman}).then(result => {
                    alert.success(null, 'Data Berhasil Dihapus').then(
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