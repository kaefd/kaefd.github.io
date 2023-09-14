import functions from '../functions'

const headers = [
  { title: 'Nomor Produksi', key: 'no_produksi' },
  { title: 'Tgl Produksi', key: 'tgl_produksi' },
  { title: 'Kode Group', key: 'kode_group' },
  { title: 'Bahan Baku', key: 'bahan_baku' },
  { title: 'Jumlah Bahan Baku', key: 'jumlah' },
  { title: 'Barang Jadi', key: 'barang_jadi' },
  { title: 'Jumlah Barang Jadi', key: 'jml_barang_jadi' },
  { title: '', key: 'actions', sortable: false }
]
const headItem = [
  { title: 'Kode Barang', key: 'kode_barang' },
  { title: 'Nama Barang', key: 'nama_barang' },
  { title: 'Jumlah', key: 'jumlah' },
  { title: 'Satuan', key: 'satuan' },
  { title: 'Nama Konversi', key: 'nama_konversi' },
  { title: 'Kode Konversi', key: 'kode_konversi' },
  { title: 'Jumlah Konversi', key: 'jumlah_konversi' },
  { title: 'Satuan Konversi', key: 'satuan_konversi' },
  { title: '', key: 'actions', sortable: false }
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
const detail_items = (no, detail) => {
  let nama = []
  let res = ''
  for (let j = 0; j < detail.length; j++) {
    if (no == detail[j].no_produksi) {
      nama.push(detail[j].nama_barang)
    }
  }
  return nama.toString()
}
const sum = (no, value) => {
  let arr = []
  for (let i = 0; i < value.length; i++) {
    if (no == value[i].no_produksi) {
      arr.push(value[i].jumlah)
    }
  }
  return arr.reduce((total, current) => {
    return total + current
  }, 0)
}
const items = (head, dbahan, dbarang) => {
  let data = []
  for (let i = 0; i < head.length; i++) {
    for (let j = 0; j < dbahan.length; j++) {
      for (let k = 0; k < dbarang.length; k++) {
        if (
          dbahan[j].no_produksi == head[i].no_produksi &&
          dbarang[k].no_produksi == head[i].no_produksi
        ) {
          data.push({
            no_produksi: head[i].no_produksi,
            tgl_produksi: head[i].tgl_produksi,
            tgl_input: head[i].tgl_input,
            kode_group: head[i].kode_group,
            bahan_baku: detail_items(head[i].no_produksi, dbahan),
            jumlah: functions.numb(sum(head[i].no_produksi, dbahan)),
            barang_jadi: detail_items(head[i].no_produksi, dbarang),
            jml_barang_jadi: functions.numb(sum(head[i].no_produksi, dbarang))
          })
        }
      }
    }
  }
  return data
}
const noDuplicate = (a) => {
  const unique = a.filter((obj, index) => {
    return index === a.findIndex((o) => obj.no_produksi === o.no_produksi)
  })

  return unique
}
const bahan = (no_produksi, dbahan) => {
  for (let i = 0; i < dbahan.length; i++) {
    if (dbahan[i].no_produksi == no_produksi) {
      return {
        no_produksi: dbahan[i].no_produksi,
        no_urut: 1,
        kode_barang: dbahan[i].kode_barang,
        nama_barang: dbahan[i].nama_barang,
        hs_code: dbahan[i].hs_code,
        jumlah: dbahan[i].jumlah,
        satuan: dbahan[i].satuan,
        nilai: dbahan[i].nilai
      }
    }
  }
}
const barang = (no_produksi, dbarang) => {
  let data = []
  for (let i = 0; i < dbarang.length; i++) {
    if (dbarang[i].no_produksi == no_produksi) {
      data.push({
        no_produksi: dbarang[i].no_produksi,
        no_urut: 1,
        kode_barang: dbarang[i].kode_barang,
        kode_konversi: dbarang[i].kode_konversi,
        nama_konversi: dbarang[i].nama_konversi,
        satuan_konversi: dbarang[i].satuan_konversi,
        jumlah_konversi: dbarang[i].jumlah_konversi,
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
  detail_items,
  sum
}
