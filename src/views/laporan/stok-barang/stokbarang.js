import api from '@/utils/api'
import utils from '@/utils/utils'
import {store} from '@/utils/store'
import router from '@/router'
export default {
    kodeg(v) {
        return v
    },
    async stokbarang (param) {
        // if(param.tgl_awal) return this.logBarang()
        store().loading = true
        let url = param && param.tanggal ? 'group_barang/tanggal' : '/group_barang'
        let barang = await api.getData('/barang?status=true')
        let group = await api.getData(url, param)
        if(!group) {
            setTimeout(() => {
				router.go()
			}, 2500)
        }
        barang.map(item => {
            let stok = group.filter(it => it.kode_barang == item.kode_barang)
            let sumStok = []
            let kode = []
            for (let i = 0; i < stok.length; i++) {
                sumStok.push(stok[i].stok_akhir)
                kode.push(stok[i].kode_group)
            }
            let akhir = sumStok.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
            item.stok_akhir = utils.numb(akhir)
            item.kode_group = [...new Set(kode)]
        })
        let newBrg = barang.filter(item => item.stok_akhir != 0)
        store().loading = false
        return newBrg
    },
    async getDetail(head) {
        store().loading = true
        let data = []
        let detail = head.kode_group
        let barang = await api.getData('/barang?status=true')

		for (let i = 0; i < detail.length; i++) {
			let h = await api.getData(`group_barang?kode_group=${detail[i]}&kode_barang=${head.kode_barang}`)
			data.push({
				kode_group: h[0].kode_group,
				kategori_barang: barang.find(b => b.kode_barang == h[0].kode_barang).kategori_barang,
				kode_barang: h[0].kode_barang,
				nama_barang: barang.find(b => b.kode_barang == h[0].kode_barang).nama_barang,
				hs_code: barang.find(b => b.kode_barang == h[0].kode_barang).hs_code,
				satuan: barang.find(b => b.kode_barang == h[0].kode_barang).satuan,
				stok_akhir: h[0].stok_akhir,
			})
		}
        store().loading = false
        return data
    },
    async kode_group() {
        const kode = []
        const group = await api.getData('group_barang')
        for (let i = 0; i < group.length; i++) {
            kode.push({
                key: group[i].kode_group,
                title: group[i].kode_group
            })
        }
        let array = kode.map(JSON.stringify);
        let uniqueSet = new Set(array);
        let data = Array.from(uniqueSet).map(JSON.parse);
        return data
    },
    async logBarang(kode_group, kode_barang) {
        // let group = await api.getData('group_barang')
        const params = {
            tgl_awal: store().periode[0],
            tgl_akhir: store().periode[1],
            kode_group: kode_group,
            kode_barang: kode_barang
        }
        const log = await api.getData('/log_barang?', params)
        // let data = store().master
        // let newG = group.filter(item => item.kode_barang == data.kode_barang)
        // newG.map(item => {
        //     let brg = barang.find(it => it.kode_barang == item.kode_barang)
        //     item.kategori_barang = brg.kategori_barang
        //     item.nama_barang = brg.nama_barang
        //     item.hs_code = brg.hs_code
        //     item.satuan = brg.satuan
        // })
        return log
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
        if(input.kode_group != undefined) store().$patch((state) => state.kodegroup = input.kode_group)
        const periode = Object.fromEntries(
            Object.entries(input).filter(([key, value]) => value !== false && value !== true)
        )
        // store().$patch((state) => { state.periode = [periode.tgl_awal, periode.tgl_akhir]})

        let ft_kategori = store().state.filter[1].item
        let ft_kode = input.kode_group
        
        if(input != '') {
            ft_kategori.map((item) => {
                let same = Object.fromEntries(Object.entries(input).filter(([key]) => key == item.key))
                if(same[Object.keys(same)] != undefined) item.show = same[Object.keys(same)]
                else item.show = true
            })
        }
        store().$patch((state) => { 
            state.state.filter[1].item = ft_kategori
        })
        const filtered = ft_kategori.filter(item => item.show === true)
       
        let x = ''
        let param = store().kodegroup == 'Semua' ? null : {kode_group: store().kodegroup}
        await this.barang(param).then(response => x = response)
        const filterData = x.filter(it => {
                let a = filtered.some(k => it.head.kategori_barang.includes(k.title))
                // let b = it.head.kode_group.find(k => k == input.kode_group) != undefined
                return a
            }
        )
        if(filtered != '') store().$patch((state) => { state.items = filterData})
        else store().$patch((state) => { state.items = x})
    },
}