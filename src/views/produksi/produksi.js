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
    async produksi (param) {
        let parameters = ''
        if(param) parameters = param
        else parameters = {
            tgl_awal: store().periode[0],
            tgl_akhir: store().periode[1],
        }
        store().loader('on')
        let head = await api.getData('/produksi_head', parameters)
        let bahan = await api.getData('/produksi_detail_bahan', parameters)
        let barang = await api.getData('/produksi_detail_barang', parameters)
        if(!head) api.logout()
        let data = []
        let a = []
        for (let i = 0; i < head.length; i++) {
            let b = bahan.filter(item => item.no_produksi == head[i].no_produksi)
            let c = barang.filter(item => item.no_produksi == head[i].no_produksi)
            let kodebrg = [];
            let jml = []
            for (let j  = 0; j < c.length; j++) {
                kodebrg.push(c[j].kode_barang)
                jml.push(c[j].jumlah)
            }
            a.push({
                no_produksi: head[i].no_produksi,
                tgl_produksi: head[i].tgl_produksi,
                kode_group: head[i].kode_group,
                kode_bahan: b[0].kode_barang,
                jumlah_bahan: b[0].jumlah,
                kode_barang: [...new Set(kodebrg)].toString(),
                jumlah: jml.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
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
    async kodegroup() {
        let array = await api.getData('group_barang')
        let head = Array.from(new Set(array.map(obj => obj.kode_group))).map(kode_group => {
            return array.find(obj => obj.kode_group === kode_group)
        })
        return head
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
        await this.produksi(p).then(response => x = response)
        store().$patch((state) => { state.items = x})
    },
    create(data) {
        let detail = store().detail
        let newDetail = []
        for (let i = 0; i < detail.length; i++) {
            let kode_konversi = detail[i].kode_konversi || ''
            let jml_konversi = detail[i].kode_konversi || 0
            newDetail.push({
                kode_barang: detail[i].kode_barang,
                jumlah:detail[i].jumlah,
                kode_konversi: kode_konversi,
                jumlah_konversi: jml_konversi
            })
        }
        let json = JSON.stringify(newDetail)
        let payload = {
            tgl_produksi: data.tgl_produksi,
            kode_group: data.kode_group.kode_group,
            kode_bahan: data.kode_bahan.kode_barang,
            produksi_detail_barang: json
        }
        console.log(payload);
        api.create('/produksi_head', payload).then(res => {
            alert.success(null, res.data).then(
                setTimeout(() => {
                    location.reload()
                }, 2500)
            )
        })
        .catch(error => {
            alert.failed(null, error.response.data)
        })
    },
    delete(data) {
        alert.confirm('Apakah anda yakin ?', 'Anda akan menghapus '+data.no_produksi).then((result) => {
            if(result.isConfirmed) {
                api.delete('produksi_head', {no_produksi: data.no_produksi}).then(result => {
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