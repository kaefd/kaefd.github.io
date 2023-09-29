import functions from "../functions";
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
const noDuplicate = (a) => {
    const unique = a.filter((obj, index) => {
        return index === a.findIndex(o => obj.kode_barang === o.kode_barang);
    });

    return unique
}
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
const detail = (brg, groupbarang) => {
    let a = []
    for (let i = 0; i < brg.length; i++) {
        for (let j = 0; j < groupbarang.length; j++) {
            if(brg[i].kode_barang  == groupbarang[j].kode_barang) {
                a.push({
                    kategori_barang: brg[i].kategori_barang,
                    kode_barang: brg[i].kode_barang,
                    nama_barang: brg[i].nama_barang,
                    hs_code: brg[i].hs_code,
                    satuan: brg[i].satuan,
                    kode_group: groupbarang[j].kode_group,
                    stok_akhir: groupbarang[j].stok_akhir
                })
            }
        }
    }
    return a
}
const subDetail = (data, kode) => {
    let a = []
    for (let i = 0; i < data.length; i++) {
        if(data[i].kode_barang  == kode) {
            a.push({
                kategori_barang: data[i].kategori_barang,
                kode_barang: data[i].kode_barang,
                nama_barang: data[i].nama_barang,
                hs_code: data[i].hs_code,
                satuan: data[i].satuan,
                kode_group: data[i].kode_group,
                stok_akhir: functions.numb(data[i].stok_akhir, 1, true)
            })
        }
    }
    return a
}
const log = (kodegroup, kodebrg, log) => {
    let a = []
    for (let i = 0; i < log.length; i++) {
        if(log[i].kode_group == kodegroup && log[i].kode_barang == kodebrg ) {
            a.push({
                tanggal: log[i].tanggal,
                kode_group: log[i].kode_group,
                kode_barang: log[i].kode_barang,
                kategori: log[i].kategori,
                keterangan: log[i].keterangan,
                stok_awal: functions.numb(log[i].stok_awal, 1, true),
                stok_masuk: functions.numb(log[i].stok_masuk, 1, true),
                stok_keluar: functions.numb(log[i].stok_keluar, 1, true),
                stok_akhir: functions.numb(log[i].stok_akhir, 1, true)
            })
        }
    }
    return a
}
export default {
    headLogUser,
    headStokBarang,
    stokBarang,
    noDuplicate,
    detail,
    subDetail,
    log
}