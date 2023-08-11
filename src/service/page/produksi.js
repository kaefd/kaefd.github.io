import functions from "../functions"

const headers = [
    { title: 'Nomor Produksi', key: 'no_produksi'},
    { title: 'Tgl Produksi', key: 'tgl_produksi' },
    { title: 'Kode Group', key: 'kode_group' },
    { title: 'Bahan Baku', key: 'bahan_baku' },
    { title: 'Jumlah Bahan Baku', key: 'jumlah' },
    { title: 'Barang Jadi', key: 'barang_jadi' },
    { title: 'Jumlah Barang Jadi', key: 'jml_barang_jadi' },
    { title: '', key: 'actions', sortable: false},
  ]
const headItem = [
    { title: 'Kode Barang', key: 'kode_barang' },
    { title: 'Nama Barang', key: 'nama_barang' },
    { title: 'Jumlah', key: 'jumlah' },
    { title: 'Satuan', key: 'satuan' },
    { title: '', key: 'actions', sortable: false },
]
const input = {
    no_produksi: '', 
    kode_group: '',
    tgl_produksi: '',
    tgl_input: functions.day(),
    tgl_batal: '1999-12-31T17:00:00.000Z',
    user_input: 'admin',
    user_batal: '',
    status: 'true'
}
const items = (head, dbahan, dbarang) => {
    let data = []
    for (let i = 0; i < head.length; i++) {
        for (let j = 0; j < dbahan.length; j++) {
            for (let k = 0; k < dbarang.length; k++) {
                if(dbahan[j].no_produksi == head[i].no_produksi && dbarang[k].no_produksi == head[i].no_produksi) {
                    data.push({
                        no_produksi: head[i].no_produksi,
                        tgl_produksi: head[i].tgl_produksi,
                        tgl_input: head[i].tgl_input,
                        kode_group: head[i].kode_group,
                        bahan_baku: dbahan[j].nama_barang,
                        jumlah: functions.numb(dbahan[j].jumlah),
                        barang_jadi: dbarang[k].nama_barang,
                        jml_barang_jadi: functions.numb(dbarang[k].jumlah),
                    })
                }
            }
        }
    }
    return data
}
const noDuplicate = (a) => {
    const unique = a.filter((obj, index) => {
        return index === a.findIndex(o => obj.no_produksi === o.no_produksi);
    });

    return unique
}
const bahan = (no_produksi, dbahan) => {
    let data = []
    for (let i = 0; i < dbahan.length; i++) {
        if(dbahan[i].no_produksi == no_produksi) {
            data.push({
                no_produksi: dbahan[i].no_produksi,
                no_urut: 1,
                kode_barang: dbahan[i].kode_barang,
                nama_barang: dbahan[i].nama_barang,
                hs_code: dbahan[i].hs_code,
                jumlah: dbahan[i].jumlah,
                satuan: dbahan[i].satuan,
                nilai: dbahan[i].nilai
            })
        }
    }
    return data
}
const barang = (no_produksi, dbarang) => {
    let data = []
    for (let i = 0; i < dbarang.length; i++) {
        if(dbarang[i].no_produksi == no_produksi) {
            data.push({
                no_produksi: dbarang[i].no_produksi,
                no_urut: 1,
                kode_barang: dbarang[i].kode_barang,
                nama_barang: dbarang[i].nama_barang,
                jumlah: dbarang[i].jumlah,
                hs_code: dbarang[i].hs_code,
                satuan: dbarang[i].satuan,
                nilai: dbarang[i].nilai
            })
        }
    }
    return data
}
export default {
    headers,
    headItem,
    input,
    items,
    bahan,
    barang,
    noDuplicate,
}