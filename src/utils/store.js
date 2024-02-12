import { defineStore, acceptHMRUpdate  } from 'pinia'
import router from '@/router'
import barang from '@/views/master/barang'
// import konversi from '../views/master/trash/konversi'
import pelanggan from '../views/master/pelanggan'
import supplier from '../views/master/supplier'
import user from '../views/master/user'
import pemasukan from '@/views/transaksi/pemasukan/pemasukan'
import produksi from '@/views/transaksi/produksi/produksi'
import pengeluaran from '../views/transaksi/pengeluaran/pengeluaran'
import pengiriman from '../views/transaksi/pengiriman/pengiriman'
import stokbarang from '@/views/laporan/stokbarang'
import alert from './alert'
import utils from './utils'
import loguser from '@/views/laporan/loguser'
import lapbc from '@/views/laporan/lapbc'

export const store = defineStore('store', {
  state: () => {
    return {
      nav: false,
      theme: 'light',
      loading: false,
      filter: false,
      column: false,
      dialog: false,
      suratjalan: false,
      do: false,
      kodegroup: '',
      print: false,
      temp: '',
      otoritas: '',
      addDetail: [],
      detailDump: '',
      profile: {
        log: false
      },
      i_dialog: {
        show: false,
        item: ''
      },
      child_detail: false,
      detail_dialog: false,
      periode: [utils.last_month(), utils.today()],
      cpr: '',
      items: '',
      master: '',
      detail: '',
      s_detail: '',
      Rmenu: {
        show: false,
        screenX: 0,
        screenY: 0
      },
      menu: {
        show: false,
        option: '',
        screenX: 0,
        screenY: 0,
      },
      state: ''
    }
  },
  actions: {
    resetState() {
      this.profile = {
        log: false
      }
      this.cpr = ''
      this.nav = false
      this.loading = false
      this.dialog = false,
      this.detail_dialog = false,
      this.detail = ''
      this.temp = ''
      this.s_detail = ''
      this.filter = false
      this.column = false
      this.suratjalan = false
      this.do = false
      this.detailDump = '',
      this.periode = [utils.last_month(), utils.today()],
      this.i_dialog= {
        show: false,
        item: ''
      },
      this.Rmenu = {
        show: false,
        screenX: 0,
        screenY: 0
      },
      this.menu= {
        show: false,
        option: '',
        screenX: 0,
        screenY: 0,
      }
    },
    refreshData() {
      let state = router.currentRoute.value.path.slice(1)
      if(state == 'master/data-barang') return barang.barang()
      // // // else if(state == 'master/konversi-barang') return konversi.konversi()
      else if(state == 'master/data-pelanggan') return pelanggan.pelanggan()
      else if(state == 'master/data-supplier') return supplier.supplier()
      else if(state == 'master/data-user') return user.user()
      else if(state == 'transaksi/pemasukan') return pemasukan.pemasukan()
      else if(state == 'transaksi/produksi') return produksi.produksi()
      else if(state == 'transaksi/pengeluaran') return pengeluaran.pengeluaran()
      else if(state == 'transaksi/pengiriman') return pengiriman.pengiriman()
      else if(state == 'laporan/laporan-stok') return stokbarang.barang()
      else if(state == 'laporan/laporan-pemasukan') return pemasukan.pemasukan()
      else if(state == 'laporan/laporan-pengeluaran') return pengeluaran.pengeluaran()
      else if(state == 'laporan/laporan-pengiriman') return pengiriman.pengiriman()
      else if(state == 'laporan/laporan-bc') return lapbc.pengeluaran()
      else if(state == 'laporan/log-user' || 'log-activity') return loguser.log()
    },
    openDialog () {
      this.$state.dialog = !this.$state.dialog
    },
    loader(param) {
      if(param == 'off') {
        // setTimeout(() => {
          this.$patch((state) => state.loading = false)
        // }, 2500)
      } else this.$patch((state) => state.loading = true)
    },
    search (input, dataitem) {
      return dataitem.filter(item => Object.values(item.head || item).some(value => typeof value == 'string' && value.toLowerCase().includes(input.toLowerCase())))
    },
    filterdata(input, fl) {
      let state = router.currentRoute.value.path.slice(1)
      if(state == 'master/data-barang') return barang.filterData(input, fl)
      // // else if(state == 'master/konversi-barang') return konversi.filterData(input, fl)
      else if(state == 'transaksi/pemasukan') return pemasukan.filterData(input, fl)
      else if(state == 'transaksi/produksi') return produksi.filterData(input, fl)
      else if(state == 'transaksi/pengeluaran') return pengeluaran.filterData(input, fl)
      else if(state == 'transaksi/pengiriman') return pengiriman.filterData(input, fl)
      else if(state == 'laporan/laporan-stok') return stokbarang.filterData(input, fl)
      else if(state == 'laporan/laporan-pemasukan') return pemasukan.filterData(input, fl)
      else if(state == 'laporan/laporan-pengeluaran') return pengeluaran.filterData(input, fl)
      else if(state == 'laporan/laporan-pengiriman') return pengiriman.filterData(input, fl)
      else if(state == 'laporan/laporan-bc') return lapbc.filterData(input, fl)
      else if(state == 'laporan/log-user' || 'log-activity') return loguser.filterData(input, fl)
    },
    filtered(input) {
      let state = router.currentRoute.value.path.slice(1)
      if(state == 'master/data-barang' && input != '') return barang.filtered(input)
      // // else if(state == 'master/konversi-barang' && input != '') return konversi.filtered(input)
      else if(state == 'transaksi/pemasukan' && input != '') return pemasukan.filtered(input)
      else if(state == 'transaksi/produksi' && input != '') return produksi.filtered(input)
      else if(state == 'transaksi/pengeluaran' && input != '') return pengeluaran.filtered(input)
      else if(state == 'transaksi/pengiriman' && input != '') return pengiriman.filtered(input)
      else if(state == 'laporan/laporan-stok' && input != '') return stokbarang.filtered(input)
      else if(state == 'laporan/laporan-pemasukan') return pemasukan.filtered(input)
      else if(state == 'laporan/laporan-pengeluaran') return pengeluaran.filtered(input)
      else if(state == 'laporan/laporan-pengiriman') return pengiriman.filtered(input)
      else if(state == 'laporan/laporan-bc') return lapbc.filtered(input)
      else if(state == 'laporan/log-user' || 'log-activity') return loguser.filtered(input)
    },
    scol(input, fl) {
      let data = {}
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < fl.length; j++) {
                if(input[i].title == fl[j].title) data[fl[j].key] = input[i].value
            }
        }
        return data
    },
    selectedCol(input, fl) {
      let fields = this.$state.state.fields
        if(input != '') {
                fields.map((item) => {
                    let same = Object.fromEntries(Object.entries(input).filter(([key]) => key == item.key))
                    if(same[Object.keys(same)] != undefined) item.show = same[Object.keys(same)]
                    else item.show = true
                })
        }
        this.$patch((state) => { state.state.fields = fields})
    },
    create(data, fl) {
      let state = router.currentRoute.value.path.slice(1)
      if(state == 'master/data-barang' && data != '') return barang.create(data)
      // // if(state == 'master/konversi-barang' && data != '') return konversi.create(data)
      if(state == 'master/data-pelanggan' && data != '') return pelanggan.create(data)
      if(state == 'master/data-user') return user.create(data, fl)
      if(state == 'transaksi/pemasukan' && data != '') return pemasukan.create(data)
      if(state == 'transaksi/produksi' && data != '') return produksi.create(data)
      if(state == 'transaksi/pengeluaran' && data != '') return pengeluaran.create(data)
      if(state == 'transaksi/pengiriman' && data != '') return pengiriman.create(data)
    },
    update(data, fl) {
      let state = router.currentRoute.value.path.slice(1)
      if(state == 'master/data-barang' && data != '') return barang.update(data)
      // // if(state == 'master/konversi-barang' && data != '') return konversi.update(data)
      if(state == 'master/data-pelanggan' && data != '') return pelanggan.update(data)
      if(state == 'master/data-user') return user.update(data, fl)
    },
    delete() {
      let data = this.$state.master
      let state = router.currentRoute.value.path.slice(1)
      if(state == 'master/data-barang' && data != '') return barang.delete(data)
      // // else if(state == 'master/konversi-barang' && data != '') return konversi.delete(data)
      else if(state == 'master/data-pelanggan' && data != '') return pelanggan.delete(data)
      else if(state == 'master/data-user' && data != '') return user.delete(data)
      else if(state == 'transaksi/pemasukan' && data != '') return pemasukan.delete(data)
      else if(state == 'transaksi/produksi' && data != '') return produksi.delete(data)
      else if(state == 'transaksi/pengeluaran' && data != '') return pengeluaran.delete(data)
      else if(state == 'transaksi/pengiriman' && data != '') return pengiriman.delete(data)
      
    },
    validate(rules, input, data) {
      let fl = ''
      let res = []
      let mess = []
      if(rules || typeof rules != 'object') {
        fl = rules.filter(item => item.rules != undefined)
        if(fl == '') {
          for (let i = 0; i < rules.length; i++) {
            let s_rules = rules[i].split(' ')
            let k_rules = s_rules[0]
            let target = s_rules[1]
            if (k_rules == 'required' && target) {
              if(data[target] != undefined) res.push(true)
              else {
                res.push(false)
                mess.push(target.split('_').join(' ') + ' belum diisi')
              }
            } else if (rules[0] == 'absolute') {
              this.detailDump = ''
              res.push(true)
            }
          }
        } else {
          for (let i = 0; i < fl.length; i++) {
            if(fl[i].rules) {
              for (let j = 0; j < fl[i].rules.length; j++) {
                let s_rules = fl[i].rules[j].split(' ')
                let k_rules = s_rules[0]
                let target = s_rules[1]
                if(fl[i].rules[j] == 'unique') {
                  let a = data ? data.find(item => item[fl[i].key] == input[fl[i].key]) : null
                  if(a == undefined || a == null) res.push(true)
                  else {
                    res.push(false)
                    mess.push(input[fl[i].key] + ' sudah diinput')
                  }
                } else if(fl[i].rules[j] == 'required') {
                  if(input && input[fl[i].key] != undefined && input[fl[i].key] != '') res.push(true)
                  else {
                    res.push(false)
                    mess.push('\n'+fl[i].title + '\nbelum diisi')
                  }
                  res.push(true)
                } else if(k_rules == 'min' && input[fl[i].key] != undefined && input[fl[i].key] != '') {
                  if(input[fl[i].key].length >= target) res.push(true)
                  else {
                    res.push(false)
                    mess.push(fl[i].key + ' tidak boleh kurang dari ' + target + ' karakter')
                  }
                }
              }
            } else res.push(true)
          }
        }
      } else res.push(true)
      // false checker
      let f = res.filter(it => it = false)
      if(mess == '' && f == '') return true
      else alert.warning(null, mess)
    }
  }
})
// HOT RELOAD MODULE UPDATE
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
}