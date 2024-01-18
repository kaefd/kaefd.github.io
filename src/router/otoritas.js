import {store} from '../utils/store';

export default {
  akses(o) {
    let otoritas = store().otoritas
    for (let i = 0; i < otoritas.length; i++) {
      if(o == 'Dashboard') return true
      else if(o == 'Master') {
          if(otoritas[i].jenis_otoritas == 'Data Barang' || otoritas[i].jenis_otoritas == 'Data Pelanggan' || otoritas[i].jenis_otoritas == 'Data Supplier' || otoritas[i].jenis_otoritas == 'Data Konversi Barang' || otoritas[i].jenis_otoritas == 'Data User') return true
      }
      else if(o == 'Transaksi') {
        if(otoritas[i].jenis_otoritas == 'Pembelian' || otoritas[i].jenis_otoritas == 'Produksi' || otoritas[i].jenis_otoritas == 'Penjualan' || otoritas[i].jenis_otoritas == 'Pengiriman') return true
      }
      // else if(o == 'Pemasukan Barang') {
      //     if(otoritas[i].jenis_otoritas == 'Pembelian') return true
      // }
      // else if(o == 'Produksi Barang') {
      //     if(otoritas[i].jenis_otoritas == 'Produksi') return true
      // }
      // else if(o == 'Pengeluaran Barang') {
      //     if(otoritas[i].jenis_otoritas == 'Penjualan') return true
      // }
      // else if(o == 'Pengiriman Barang') {
      //     if(otoritas[i].jenis_otoritas == 'Pengiriman') return true
      // }
      else if(o == 'Laporan') {
          if(otoritas[i].jenis_otoritas == 'Laporan' || otoritas[i].jenis_otoritas == 'Laporan Stok Barang' || otoritas[i].jenis_otoritas == 'Laporan Pembelian' || otoritas[i].jenis_otoritas == 'Laporan Pengeluaran' || otoritas[i].jenis_otoritas == 'Laporan Pengiriman' || otoritas[i].jenis_otoritas == 'Laporan Bc' || otoritas[i].jenis_otoritas == 'Laporan Log User') return true
      }
    }
  },
  Cakses(o) {
    let otoritas = store().otoritas
    for (let i = 0; i < otoritas.length; i++) {
      if(o == 'Data Barang') {if(otoritas[i].jenis_otoritas == 'Data Barang') return true}
      else if(o == 'Konversi Barang') {if(otoritas[i].jenis_otoritas == 'Data Konversi Barang') return true}
      else if(o == 'Data Pelanggan') {if(otoritas[i].jenis_otoritas == 'Data Pelanggan') return true}
      else if(o == 'Data Supplier') {if(otoritas[i].jenis_otoritas == 'Data Supplier') return true}
      else if(o == 'Data User') {if(otoritas[i].jenis_otoritas == 'Data User') return true}
      else if(o == 'Pemasukan Barang') {if(otoritas[i].jenis_otoritas == 'Pembelian') return true}
      else if(o == 'Produksi Barang') {if(otoritas[i].jenis_otoritas == 'Produksi') return true}
      else if(o == 'Pengeluaran Barang') {if(otoritas[i].jenis_otoritas == 'Penjualan') return true}
      else if(o == 'Pengiriman Barang') {if(otoritas[i].jenis_otoritas == 'Pengiriman') return true}
      else if(o == 'Laporan Stok Barang') {if(otoritas[i].jenis_otoritas == 'Laporan Stok Barang') return true}
      else if(o == 'Laporan Pemasukan') {if(otoritas[i].jenis_otoritas == 'Laporan Pembelian') return true}
      else if(o == 'Laporan Pengeluaran') {if(otoritas[i].jenis_otoritas == 'Laporan Penjualan') return true}
      else if(o == 'Laporan Pengiriman') {if(otoritas[i].jenis_otoritas == 'Laporan Pengiriman') return true}
      else if(o == 'Laporan Bc') {if(otoritas[i].jenis_otoritas == 'Laporan Bc') return true}
      else if(o == 'Laporan Log User') {if(otoritas[i].jenis_otoritas == 'Laporan Log User') return true}
    }
  },
  check(value) {
    let otoritas = store().otoritas
    const page = store().state.title
    if(value == 'lihat') {
      if(page) {
        let o = otoritas.find(item => item.jenis_otoritas == page)
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined || p != undefined) return true
        else return false
      }
    }
    if(value == 'tambah') {
      if(page == 'Data Barang') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Tambah Barang Baru')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Data Pelanggan') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Tambah Pelanggan Baru')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Konversi Barang') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Tambah Konversi Baru')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Data User') {
        let p = store().state.permission.find(item => item.key == value)
        if(p != undefined) return true
        else return false
      }
      if(page == 'Pemasukan') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Tambah Pembelian Baru')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Produksi') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Tambah Produksi Baru')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Pengeluaran') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Tambah Penjualan Baru')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Pengiriman') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Tambah Pengiriman Baru')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
    }
    if(value == 'edit') {
      if(page == 'Data Barang') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Ubah Barang')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Data Pelanggan') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Ubah Pelanggan')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Konversi Barang') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Ubah Konversi')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Data User') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Data User')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
    }
    if(value == 'hapus') {
      if(page == 'Data Barang') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Hapus Barang')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Data Pelanggan') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Hapus Pelanggan')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Konversi Barang') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Hapus Konversi')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Pemasukan') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Batal Pembelian')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Produksi') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Batal Produksi')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Pengeluaran') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Batal Penjualan')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
      if(page == 'Pengiriman') {
        let o = otoritas.find(item => item.jenis_otoritas == 'Batal Pengiriman')
        let p = store().state.permission.find(item => item.key == value)
        if(o != undefined && p != undefined) return true
        else return false
      }
    }
    if(value == 'pdf') {
      if(page != undefined ) {
        let o = otoritas.find(item => item.jenis_otoritas == 'Export pdf')
        if(o != undefined) return true
        else return false
      }
    }
    if(value == 'xlsx') {
      if(page != undefined) {
        let o = otoritas.find(item => item.jenis_otoritas == 'Export xlsx')
        if(o != undefined) return true
        else return false
      }
    }
    if(value == 'Persentase') {
      if(page != undefined) {
        let o = otoritas.find(item => item.jenis_otoritas == 'Persentase')
        if(o != undefined) return true
        else return false
      }
    }
    if(value == 'suratjalan') {
      if(page != undefined) {
        let o = otoritas.find(item => item.jenis_otoritas == 'Cetak Surat Jalan')
        if(o != undefined) return true
        else return false
      }
    }
    if(value == 'do') {
      if(page != undefined) {
        let o = otoritas.find(item => item.jenis_otoritas == 'Cetak DO')
        if(o != undefined) return true
        else return false
      }
    }
  },
}