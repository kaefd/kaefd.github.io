const data_barang = [
    'Data Barang',
    'Tambah Barang Baru',
    'Ubah Barang',
    'Hapus Barang'
]
const data_pelanggan = [
    'Data Pelanggan',
    'Tambah Pelanggan Baru',
    'Ubah Pelanggan',
    'Hapus Pelanggan',
]
const data_supplier = [
    'Data Supplier'
]
const data_user = [
    'Data User',
]
const pembelian = [
    'Pembelian',
    'Batal Pembelian',
    'Tambah Pembelian Baru',
]
const produksi = [
    'Produksi',
    'Tambah Produksi Baru',
    'Batal Produksi',
]
const penjualan = [
    'Penjualan',
    'Tambah Penjualan Baru',
    'Batal Penjualan',
]
const pengiriman = [
    'Pengiriman',
    'Batal Pengiriman',
    'Tambah Pengiriman Baru',
]
const laporan = [
    'Laporan',
    'Laporan Stok Barang',
    'Laporan Pembelian',
    'Laporan Produksi',
    'Laporan Penjualan',
    'Laporan Log User'
]
const laporan_stok = [
    'Laporan Stok Barang'
]
const laporan_pembelian = [
    'Laporan Pembelian',
]
const laporan_produksi = [
    'Laporan Produksi',
]
const laporan_penjualan = [
    'Laporan Penjualan',
]
const laporan_log = [
    'Laporan Log User'
]
const otoritas = (data) => {
    let a = []
    for (let i = 0; i < data.length; i++) {
        if(data[i].status == 'true') {
            a.push({
                username: data[i].username,
                jenis_otoritas: data[i].jenis_otoritas,
                status: data[i].status
            })
        }
    }
    return a
}
const routes = (data, target) => {
    for (let i = 0; i < data.length; i++) {
        if(data[i].jenis_otoritas == target) {
            let a = data[i].status
            if( a == 'true') {
                return true
            } else false
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
// const item = (data, user) => {
//     const a = []
//     for (let i = 0; i < data.length; i++) {
//         if(data[i].username == user) {
//             a.push({
                // data_barang: data[i].status,
                // tambah_barang: data[i].status,
                // ubah_barang: data[i].status,
                // hapus_barang: data[i].status,
                // data_pelanggan: data[i].status,
                // tambah_pelanggan: data[i].status,
                // ubah_pelanggan: data[i].status,
                // hapus_pelanggan: data[i].status,
                // data_supplier: data[i].status,
                // data_user: data[i].status,
                // pembelian: data[i].status,
                // tambah_pembelian: data[i].status,
                // batal_pembelian: data[i].status,
                // produksi: data[i].status,
                // tambah_produksi: data[i].status,
                // batal_produksi: data[i].status,
                // penjualan: data[i].status,
                // tambah_penjualan: data[i].status,
                // batal_penjualan: data[i].status,
                // pengiriman: data[i].status,
                // tambah_pengiriman: data[i].status,
                // batal_pengiriman: data[i].status,
                // laporan: data[i].status,
                // laporan_stok_barang: data[i].status,
                // laporan_pembelian: data[i].status,
                // laporan_produksi: data[i].status,
                // laporan_penjualan: data[i].status,
                // laporan_log_user: data[i].status
//             })
//         }
//     }
//     return a
// }
export default {
    data_barang,
    data_pelanggan,
    data_supplier,
    data_user,
    pembelian,
    produksi,
    penjualan,
    pengiriman,
    laporan,
    laporan_stok,
    laporan_pembelian,
    laporan_produksi,
    laporan_penjualan,
    laporan_log,
    otoritas,
    routes,
    all,
    items,
}