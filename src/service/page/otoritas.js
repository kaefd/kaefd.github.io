const otoritas = (data) => {
    let a = []
    for (let i = 0; i < data.length; i++) {
        if(data[i].status == 'true') {
            a.push({
                username: data[i].username,
                jenis_otoritas: data[i].jenis_otoritas,
            })
        }
    }
    return a
}
const routes = (data, target) => {
    for (let i = 0; i < data.length; i++) {
        if(data[i].jenis_otoritas == target) {
            return data[i].jenis_otoritas
        }
    }
}

const all = (data, user) => {
    let a = []
    for (let i = 0; i < data.length; i++) {
        if(data[i].username == user) {
            a.push({
                jenis_otoritas: data[i].jenis_otoritas,
                status: data[i].status,
            })
        }
    }
    return a
}

const items = (data) => {
    let a = []
    for (let i = 0; i < data.length; i++) {
        if(data[i].jenis_otoritas == 'Data Barang') {
            a.push({
                data_barang: true
            })
        } if(data[i].jenis_otoritas == 'Tambah Barang Baru') {
            a.push({
                tambah_barang: true
            })
        } if(data[i].jenis_otoritas == 'Ubah Barang') {
            a.push({
                edit_barang: true
            })
        } if(data[i].jenis_otoritas == 'Hapus Barang') {
            a.push({
                hapus_barang: true
            })
        } if(data[i].jenis_otoritas == 'Data Pelanggan') {
            a.push({
                data_pelanggan: true
            })
        } if(data[i].jenis_otoritas == 'Tambah Pelanggan Baru') {
            a.push({
                tambah_pelanggan: true
            })
        } if(data[i].jenis_otoritas == 'Ubah Pelanggan') {
            a.push({
                edit_pelanggan: true
            })
        } if(data[i].jenis_otoritas == 'Hapus Pelanggan') {
            a.push({
                hapus_pelanggan: true
            })
        } if(data[i].jenis_otoritas == 'Data Supplier') {
            a.push({
                data_supplier: true
            })
        } if(data[i].jenis_otoritas == 'Pembelian') {
            a.push({
                pembelian: true
            })
        } if(data[i].jenis_otoritas == 'Tambah Pembelian') {
            a.push({
                tambah_pembelian: true
            })
        } if(data[i].jenis_otoritas == 'Batal Pembelian') {
            a.push({
                batal_pembelian: true
            })
        } if(data[i].jenis_otoritas == 'Produksi') {
            a.push({
                produksi: true
            })
        } if(data[i].jenis_otoritas == 'Tambah Produksi') {
            a.push({
                tambah_produksi: true
            })
        } if(data[i].jenis_otoritas == 'Batal Produksi') {
            a.push({
                batal_produksi: true
            })
        } if(data[i].jenis_otoritas == 'Penjualan') {
            a.push({
                penjualan: true
            })
        } if(data[i].jenis_otoritas == 'Tambah Penjualan') {
            a.push({
                tambah_penjualan: true
            })
        } if(data[i].jenis_otoritas == 'Pengiriman') {
            a.push({
                pengiriman: true
            })
        } if(data[i].jenis_otoritas == 'Tambah Pengiriman') {
            a.push({
                tambah_pengiriman: true
            })
        } if(data[i].jenis_otoritas == 'Batal Pengiriman') {
            a.push({
                batal_pengiriman: true
            })
        } if(data[i].jenis_otoritas == 'Laporan') {
            a.push({
                laporan: true
            })
        } if(data[i].jenis_otoritas == 'Laporan Stok Barang') {
            a.push({
                laporan_stok: true
            })
        } if(data[i].jenis_otoritas == 'Laporan Pembelian') {
            a.push({
                laporan_pembelian: true
            })
        } if(data[i].jenis_otoritas == 'Laporan Produksi') {
            a.push({
                laporan_produksi: true
            })
        } if(data[i].jenis_otoritas == 'Laporan Penjualan') {
            a.push({
                laporan_penjualan: true
            })
        } if(data[i].jenis_otoritas == 'Laporan Log User') {
            a.push({
                laporan_log: true
            })
        }
    }
    return a
}
export default {
    otoritas,
    routes,
    all,
    items,
}