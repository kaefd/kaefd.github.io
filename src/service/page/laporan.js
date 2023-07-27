import barang from "./barang"

const headLogUser =  [
    { title: 'Tanggal', key: 'tanggal'},
    { title: 'Username', key: 'username' },
    { title: 'Kategori', key: 'kategori' },
    { title: 'Keterangan', key: 'keterangan' },
]
const headStokBarang = [
    { title: 'Kategori Barang', key: 'kategori_barang'},
    { title: 'Kode Barang', key: 'kode_barang' },
    { title: 'Nama Barang', key: 'nama_barang' },
    { title: 'HS Kode', key: 'hs_code' },
    { title: 'Satuan', key: 'satuan' },
    { title: 'Stok Akhir', key: 'stok_akhir' },
    { title: '', key: 'actions'},
]

const stokBarang = (brg, groupbarang) => {
    let a = []
    for (let i = 0; i < brg.length; i++) {
        for (let j = 0; j < groupbarang.length; j++) {
            if(brg[i].kode_barang == groupbarang[j].kode_barang) {
                a.push({
                    kategori_barang: brg[i].kategori_barang,
                    kode_barang: brg[i].kode_barang,
                    nama_barang: brg[i].nama_barang,
                    hs_code: brg[i].hs_code,
                    satuan: brg[i].satuan,
                    kode_group: groupbarang[j].kode_group,
                    stok_akhir: barang.sumStok(brg[i].kode_barang, groupbarang)
                })
            }
        }
    }
    return a
}
export default {
    headLogUser,
    headStokBarang,
    stokBarang,
}