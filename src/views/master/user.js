import api from '@/utils/api'
import {store} from '@/utils/store'
import alert from '@/utils/alert'
export default {
    parameters(value) {
        if(value) return  value
        else return ''
    },
    
    async user (param) {
        store().loader('on')
        let head = await api.getData('/user')
        let detail = await api.getData('/user_otoritas')
        let data = []
        let newData = []
        // for (let j = 0; j < head.length; j++) {
            for (let i = 0; i < head.length; i++) {
                // if(head[i].username == head[j].username) {
                    // let detail = detail.filter(it => it.username == head[i].username)
                    // if(detail[i].jenis_otoritas == 'Data Barang') {
                        newData.push({
                            title: 'Data Barang',
                            key: 'data_barang',
                            username: head[i].username,
                            // value: detail[i].status ? detail[i].status : 'false',
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Barang') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Barang').status,
                            active: false,
                            item: [
                                {title: 'Tambah Barang Baru', key: 'tambah_barang_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Barang Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Barang Baru' && it.username == head[i].username).status},
                                {title: 'Ubah Barang', key: 'ubah_barang', value: detail.find(it => it.jenis_otoritas == 'Ubah Barang' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Ubah Barang' && it.username == head[i].username).status},
                                {title: 'Hapus Barang', key: 'hapus_barang', value: detail.find(it => it.jenis_otoritas == 'Hapus Barang' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Hapus Barang' && it.username == head[i].username).status},
                            ]
                        },
                        {
                            title: 'Data Konversi Barang',
                            key: 'konversi_barang',
                            username: head[i].username,
                            // value: detail[i].status ? detail[i].status : 'false',
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Konversi Barang') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Konversi Barang').status,
                            active: false,
                            item: [
                                {title: 'Tambah Konversi Baru', key: 'tambah_barang_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Konversi Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Konversi Baru' && it.username == head[i].username).status},
                                {title: 'Ubah Konversi', key: 'ubah_konversi', value: detail.find(it => it.jenis_otoritas == 'Ubah Konversi' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Ubah Konversi' && it.username == head[i].username).status},
                                {title: 'Hapus Konversi', key: 'hapus_konversi', value: detail.find(it => it.jenis_otoritas == 'Hapus Konversi' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Hapus Konversi' && it.username == head[i].username).status},
                            ]
                        },
                    // }
                    // if(detail[i].jenis_otoritas == 'Data Pelanggan') {
                        {
                            title: 'Data Pelanggan',
                            key: 'data_pelanggan',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Pelanggan') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Pelanggan').status,
                            active: false,
                            item: [
                                {title: 'Tambah Pelanggan Baru', key: 'tambah_pelanggan_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Pelanggan Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Pelanggan Baru' && it.username == head[i].username).status},
                                {title: 'Ubah Pelanggan', key: 'ubah_pelanggan', value: detail.find(it => it.jenis_otoritas == 'Ubah Pelanggan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Ubah Pelanggan' && it.username == head[i].username).status},
                                {title: 'Hapus Pelanggan', key: 'hapus_pelanggan', value: detail.find(it => it.jenis_otoritas == 'Hapus Pelanggan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Hapus Pelanggan' && it.username == head[i].username).status},
                            ]
                        },
                    // }
                    // if(detail[i].jenis_otoritas == 'Data Supplier') {
                        {
                            title: 'Data Supplier',
                            key: 'data_supplier',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Supplier') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Supplier').status,
                        },
                    // }
                    // if(detail[i].jenis_otoritas == 'Data User') {
                        {
                            title: 'Data User',
                            key: 'data_user',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data User') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data User').status,
                        },
                    // }
                    // if(detail[i].jenis_otoritas == 'Pembelian') {
                        // console.log(detail.find(it => it.jenis_otoritas == 'Persentase'));
                        {
                            title: 'Pembelian',
                            key: 'pembelian',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pembelian') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pembelian').status,
                            active: false,
                            item: [
                                {title: 'Tambah Pembelian Baru', key: 'tambah_pembelian_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Pembelian Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Pembelian Baru' && it.username == head[i].username).status},
                                {title: 'Batal Pembelian', key: 'batal_pembelian', value: detail.find(it => it.jenis_otoritas == 'Batal Pembelian' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Pembelian' && it.username == head[i].username).status},
                                {title: 'Persentase', key: 'persentase', value: detail.find(it => it.jenis_otoritas == 'Persentase' && it.username == head[i].username) != undefined ? detail.find(it => it.jenis_otoritas == 'Persentase' && it.username == head[i].username).status : 'false'},
                            ]
                        },
                    // }
                    // if(detail[i].jenis_otoritas == 'Produksi') {
                        {
                            title: 'Produksi',
                            key: 'produksi',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Produksi') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Produksi').status,
                            active: false,
                            item: [
                                {title: 'Tambah Produksi Baru', key: 'tambah_produksi_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Produksi Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Produksi Baru' && it.username == head[i].username).status},
                                {title: 'Batal Produksi', key: 'batal_produksi', value: detail.find(it => it.jenis_otoritas == 'Batal Produksi' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Produksi' && it.username == head[i].username).status},
                            ]
                        },
                    // }
                    // if(detail[i].jenis_otoritas == 'Penjualan') {
                        {
                            title: 'Penjualan',
                            key: 'penjualan',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Penjualan') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Penjualan').status,
                            active: false,
                            item: [
                                {title: 'Tambah Penjualan Baru', key: 'tambah_penjualan_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Penjualan Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Penjualan Baru' && it.username == head[i].username).status},
                                {title: 'Batal Penjualan', key: 'batal_penjualan', value: detail.find(it => it.jenis_otoritas == 'Batal Penjualan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Penjualan' && it.username == head[i].username).status},
                                {title: 'Status Penjualan', key: 'status_penjualan', value: detail.find(it => it.jenis_otoritas == 'Status Penjualan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Status Penjualan' && it.username == head[i].username).status},
                            ]
                        },
                    // }
                    // if(detail[i].jenis_otoritas == 'Pengiriman') {
                        {
                            title: 'Pengiriman',
                            key: 'pengiriman',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pengiriman') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pengiriman').status,
                            active: false,
                            item: [
                                {title: 'Tambah Pengiriman Baru', key: 'tambah_pengiriman_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Pengiriman Baru' && it.username == head[i].username) == 'true' ? 'true' : (detail.find(it => it.jenis_otoritas == 'Tambah Pengiriman Baru' && it.username == head[i].username) == undefined ? 'false' : 'true')},
                                {title: 'Cetak Surat Jalan', key: 'cetak_surat_jalan', value: detail.find(it => it.jenis_otoritas == 'Cetak Surat Jalan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Cetak Surat Jalan' && it.username == head[i].username).status},
                                {title: 'Cetak DO', key: 'cetak_do', value: detail.find(it => it.jenis_otoritas == 'Cetak DO' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Cetak DO' && it.username == head[i].username).status},
                                {title: 'Batal Pengiriman', key: 'batal_pengiriman', value: detail.find(it => it.jenis_otoritas == 'Batal Pengiriman' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Pengiriman' && it.username == head[i].username).status},
                            ]
                        },
                    // }
                    // if(detail[i].jenis_otoritas == 'Laporan') {
                        {
                            title: 'Laporan',
                            key: 'laporan',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Laporan') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Laporan').status,
                            active: false,
                            item: [
                                {title: 'Laporan Stok Barang', key: 'laporan_stok_barang', value: detail.find(it => it.jenis_otoritas == 'Laporan Stok Barang' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Stok Barang' && it.username == head[i].username).status},
                                {title: 'Laporan Pembelian', key: 'laporan_pembelian', value: detail.find(it => it.jenis_otoritas == 'Laporan Pembelian' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Pembelian' && it.username == head[i].username).status},
                                {title: 'Laporan Penjualan', key: 'laporan_penjualan', value: detail.find(it => it.jenis_otoritas == 'Laporan Penjualan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Penjualan' && it.username == head[i].username).status},
                                {title: 'Laporan Pengiriman', key: 'laporan_pengiriman', value: detail.find(it => it.jenis_otoritas == 'Laporan Pengiriman' && it.username == head[i].username) == 'true' ? 'true' : (detail.find(it => it.jenis_otoritas == 'Laporan Pengiriman' && it.username == head[i].username) == undefined ? 'false' : 'true')},
                                {title: 'Laporan Log User', key: 'laporan_log_user', value: detail.find(it => it.jenis_otoritas == 'Laporan Log User' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Log User' && it.username == head[i].username).status},
                            ]
                        },
                    // }
                    // if(detail[i].jenis_otoritas == 'Pengaturan Umum') {
                        {
                            title: 'Pengaturan Umum',
                            key: 'pengaturan_umum',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pengaturan Umum') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pengaturan Umum').status,
                            active: false,
                            item: [
                                {title: 'Export pdf', key: 'pdf', value: detail.find(it => it.jenis_otoritas == 'Export pdf' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Export pdf' && it.username == head[i].username).status},
                                {title: 'Export xlsx', key: 'xlsx', value: detail.find(it => it.jenis_otoritas == 'Export xlsx' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Export xlsx' && it.username == head[i].username).status},
                            ]
                        })
                    // }
                // }
            // }
        }
        for (let i = 0; i < head.length; i++) {
            data.push({
                head: head[i],
                detail: newData.filter(item => head[i].username == item.username)
            })
            
        }
        store().$patch((state) => { state.items = data })
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
        let ft_kategori = store().state.filter[0].item
        if(input != '') {
            ft_kategori.map((item) => {
                let same = Object.fromEntries(Object.entries(input).filter(([key]) => key == item.key))
                if(same[Object.keys(same)] != undefined) item.show = same[Object.keys(same)]
                else item.show = true
            })
        }
        store().$patch((state) => { state.state.filter[0].item = ft_kategori})
        const filtered = ft_kategori.filter(item => item.show === true)
        // let keys = Object.keys(filtered)
        // let newk = []
        // for (let i = 0; i < keys.length; i++) {
        //     newk.push(keys[i])
        // }
        let x = ''
        await this.user().then(response => x = response)
        const filterData = x.filter(it =>
            filtered.some(k => it.head.kategori_user.includes(k.title))
        )
        if(filtered != '') store().$patch((state) => { state.items = filterData})
        else store().$patch((state) => { state.items = x})
        // console.log(filterData);

        // let x = ''
        // await this.user().then(response => x = response)
        // if(input != '') {
        //     let category = Object.fromEntries(Object.entries(input).filter(([key, value]) => value == true))
        //     let ncategory = Object.fromEntries(Object.entries(input).filter(([key, value]) => value == false))
        //     // x.filter(item => item.kategori_user == Object.keys(category)[0])
        //     console.log(Object.keys(category)[0]);
            
        // }
        // store().$patch((state) => state.state.items = x)

    },
    create(input, fl) {
        store().loader('on')
        let detail = []
        
        for (let i = 0; i < fl.length; i++) {
            detail.push({
                username: input.username,
                jenis_otoritas: fl[i].title,
                status: input[fl[i].title] != undefined ? String(input[fl[i].title]) : 'false'
            })
            if(fl[i].item) {
                for (let j = 0; j < fl[i].item.length; j++) {
                    detail.push({
                        username: input.username,
                        jenis_otoritas: fl[i].item[j].title,
                        status: input[fl[i].item[j].title] != undefined ? String(input[fl[i].item[j].title]) : 'false'
                    })
                }
            }
        }
        let data = {
            username: input.username,
            password: input.password,
            otoritas: JSON.stringify(detail)
        }
        api.create('/user', data).then(res => {
            if(res.status == 200) {
				alert.success(null, res.data)
				store().resetState()
			} else alert.success(null, 'Data Berhasil Disimpan')
            this.user()
        })
        .catch(error => {
			if(error.response.status == 500) {
				alert.failed(null, error.response.data)
			} else alert.failed(null)
		})
        setTimeout(() => {
			store().loader('off')
		}, 2500)
    },
    update(input) {
        store().loader('on')
        let fl = store().detail
        let master = store().master
        let detail = []
        
        for (let i = 0; i < fl.length; i++) {
            detail.push({
                username: master.username,
                jenis_otoritas: fl[i].title,
                status: input[fl[i].title] != undefined ? String(input[fl[i].title]) : (fl[i].value != 'undefined' ? String(fl[i].value) : 'false')
            })
            if(fl[i].item) {
                for (let j = 0; j < fl[i].item.length; j++) {
                    detail.push({
                        username: master.username,
                        jenis_otoritas: fl[i].item[j].title,
                        status: input[fl[i].item[j].title] != undefined ? String(input[fl[i].item[j].title]) : (fl[i].item[j].value != 'undefined' ? String(fl[i].item[j].value) : 'false')
                    })
                }
            }
        }
        let data = {
            username: master.username,
            password: input.password,
            otoritas: JSON.stringify(detail)
        }
        
        api.update('/user', data).then(res => {
            if(res.status == 200) {
				alert.success(null, res.data)
				store().resetState()
			} else alert.success(null, 'Data Berhasil Diupdate')
            this.user()
        })
        .catch(error => {
			if(error.response.status == 500) {
				alert.failed(null, error.response.data)
			} else alert.failed(null)
		})
        setTimeout(() => {
			store().loader('off')
		}, 2500)
    },
    delete(data) {
        alert.confirm('Apakah anda yakin ?', 'Anda akan menghapus '+data.username).then((result) => {
            if(result.isConfirmed) {
                store().loader('on')
                api.delete('user', {username: data.username}).then(res => {
                    if(res.status == 200) {
                        alert.success(null, res.data)
                    } else alert.success(null, 'Data Berhasil Dihapus')
                    this.user()
                }).catch((error) => {
                    if(error.response.status == 500) {
                        alert.failed(null, error.response.data)
                    } else alert.failed(null)
                })
                setTimeout(() => {
                    store().loader('off')
                }, 2500)
            }
        })
    },
}