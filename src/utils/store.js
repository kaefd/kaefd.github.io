import { defineStore, acceptHMRUpdate  } from 'pinia'
import utils from '@/utils/utils'
import router from '@/router'
import barang from '@/views/master/data-barang/barang.js'
import pelanggan from '@/views/master/data-pelanggan/pelanggan.js'
import supplier from '@/views/master/data-supplier/supplier.js'
import user from '@/views/master/data-user/user.js'
import pembelian from '@/views/transaksi/pemasukan/pembelian.js'
import produksi from '@/views/transaksi/produksi/produksi.js'
import pengeluaran from '@/views/transaksi/pengeluaran/pengeluaran.js'
import pengiriman from '@/views/transaksi/pengiriman/pengiriman.js'
import lap_pembelian from '@/views/laporan/pemasukan/pembelian.js'
import lap_pengeluaran from '@/views/laporan/pengeluaran/pengeluaran.js'
import lap_pengiriman from '@/views/laporan/pengiriman/pengiriman.js'
import stokbarang from '@/views/laporan/stok-barang/stokbarang.js'
import det_pengeluaran from '@/views/laporan/detail-pengeluaran/pengeluaran.js'
import loguser from '@/views/laporan/log-user/loguser'

export const store = defineStore('store', {
    state: () => {
        return {
            nav: false,
            dark: false,
            filter: undefined,
            periode: [utils.last_month(), utils.today()],
            state: {},
            data: {}
        }
    },
    actions: {
        resetPeriode() {
            this.periode = [utils.last_month(), utils.today()]
        },
        init() {
            this.resetPeriode()
            this.filter = undefined,
            this.state = {
                action: 'read',
                data: {}
            }
        },
        resetState() {
            this.data = {}
            this.state = {}
            this.filter = undefined

        },
        async get(k, data) {
            let path = router.currentRoute.value.path
            if(path == '/laporan/pemasukan' && k == 'pembelian') return await lap_pembelian[k](data)
            if(path == '/laporan/pengeluaran' && k == 'pengeluaran') return await lap_pengeluaran[k](data)
            if(path == '/laporan/pengiriman' && k == 'pengiriman') return await lap_pengiriman[k](data)
            if(path == '/laporan/detail-pengeluaran') return await det_pengeluaran[k](data)
            if(path == '/laporan/log-user') return await loguser[k](data)
            if(path == '/laporan/stok-barang' || path == '/dashboard') return await stokbarang[k](data)
            if(k == 'user') return await user[k](data)
            if(k == 'barang') return await barang[k](data)
            if(k == 'pelanggan') return await pelanggan[k](data)
            if(k == 'supplier') return await supplier[k](data)
            if(k == 'pembelian' && path != '/laporan/pemasukan') return await pembelian[k](data)
            if(k == 'produksi') return await produksi[k](data)
            if(k == 'pengeluaran') return await pengeluaran[k](data)
            if(k == 'pengiriman') return await pengiriman[k](data)
        },
        async getDetail(key, data) {
            let k = key
            let path = router.currentRoute.value.path
            if(path == '/laporan/pemasukan' && k == 'pembelian') return await lap_pembelian.getDetail(data)
            if(path == '/laporan/pengeluaran' && k == 'pengeluaran') return await lap_pengeluaran.getDetail(data)
            if(path == '/laporan/pengiriman' && k == 'pengiriman') return await lap_pengiriman.getDetail(data)
            if(path == '/laporan/detail-pengeluaran') return await det_pengeluaran.getDetail(data)
            // if(path == '/laporan/log-user') return await loguser.getDetail(data)
            if(path == '/laporan/stok-barang') return await stokbarang.getDetail(data)
            if(k == 'user') return await user.getDetail(data)
            if(k == 'pembelian' && path != '/laporan/pemasukan') return await pembelian.getDetail(data)
            if(k == 'produksi') return await produksi.getDetail(data)
            if(k == 'pengeluaran') return await pengeluaran.getDetail(data)
            if(k == 'pengiriman') return await pengiriman.getDetail(data)
            // let module = await import(/* @vite-ignore */`../views${path}/${k}.js`)
        },
        create(key, head, detail) {
            let k = key
            let path = router.currentRoute.value.path
            if(k == 'user') return user.create(head, detail)
            if(k == 'barang') return barang.create(head, detail)
            if(k == 'pelanggan') return pelanggan.create(head, detail)
            if(k == 'supplier') return supplier.create(head, detail)
            if(k == 'pembelian' && path != '/laporan/pemasukan') return pembelian.create(head, detail)
            if(k == 'produksi') return produksi.create(head, detail)
            if(k == 'pengeluaran') return pengeluaran.create(head, detail)
            if(k == 'pengiriman') return pengiriman.create(head, detail)
        },
        edit(key, head) {
            let k = key
            if(k == 'user') return user.edit(head)
            if(k == 'barang') return barang.edit(head)
            if(k == 'pelanggan') return pelanggan.edit(head)
        },
        delete(key, v) {
            let k = key
            let path = router.currentRoute.value.path
            if(k == 'user') return user.delete(v)
            if(k == 'barang') return barang.delete(v)
            if(k == 'pelanggan') return pelanggan.delete(v)
            if(k == 'supplier') return supplier.delete(v)
            if(k == 'pembelian' && path != '/laporan/pemasukan') return pembelian.delete(v)
            if(k == 'produksi') return produksi.delete(v)
            if(k == 'pengeluaran') return pengeluaran.delete(v)
            if(k == 'pengiriman') return pengiriman.delete(v)
        },
    }
})
// HOT RELOAD MODULE UPDATE
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
  }