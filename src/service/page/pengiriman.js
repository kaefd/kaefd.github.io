const headers = [
  { title: 'No Pengiriman', key: 'no_pengiriman', sortable: true},
  { title: 'Tgl Pengiriman', key: 'tgl_pengiriman' },
  { title: 'Pelanggan', key: 'namaplg' },
  { title: 'Tujuan Bongkar', key: 'nama' },
  { title: 'Supir', key: 'supir' },
  { title: 'Polisi', key: 'no_polisi' },
  { title: '', key: 'actions', sortable: false},
]
const headersLaporan = [
  { title: 'No Pengiriman', key: 'no_pengiriman', sortable: true},
  { title: 'Tgl Pengiriman', key: 'tgl_pengiriman' },
  { title: 'Pelanggan', key: 'namaplg' },
  { title: 'Tujuan Bongkar', key: 'nama' },
  { title: 'Supir', key: 'supir' },
  { title: 'Polisi', key: 'no_polisi' },
  {title: 'Kode Group', key: 'kode_group' },
  {title: 'Nama Barang', key: 'nama_barang' },
  {title: 'Hs Code', key: 'hs_code' },
  {title: 'Satuan', key: 'satuan' },
  { title: '', key: 'actions', sortable: false},
]
const headDetails = [
  {title: 'No Penjualan', key: 'no_penjualan' },
  {title: 'Tipe Dokumen', key: 'tipe_dokumen' },
  {title: 'No Dokumen', key: 'no_dokumen' },
  {title: 'Kode Group', key: 'kode_group' },
  {title: 'Kode Barang', key: 'kode_barang' },
  {title: 'Nama Barang', key: 'nama_barang' },
  {title: 'Jumlah', key: 'jumlah' },
  {title: 'Satuan', key: 'satuan' },
  {title: 'Kode Konversi', key: 'kode_konversi' },
  {title: 'Nama Konversi', key: 'nama_konversi' },
  {title: 'Jumlah Konversi', key: 'jumlah_konversi' },
  {title: 'Satuan Konversi', key: 'satuan_konversi' },
  {title: '', key: 'actions', sortable: false },
]
const datainput = {
  no_pengiriman: '',
  tgl_pengiriman: '',
  kode_pelanggan: '',
  kode_alamat_bongkar: '',
  supir: '',
  no_polisi: '',
  user_input: '',
  tgl_input: '',
  tgl_batal:'',
  user_batal: '',
  keterangan: '',
  status: ''
}

const detailpbl = (no, detail, param) => {
  let a = []
  for (let i = 0; i < detail.length; i++) {
    if(detail[i].no_pengiriman == no) {
      if(param == 'nama') {
        a.push(detail[i].nama_barang)
        
      } else a = detail[i]
    }
  }
  if(param == 'nama') {
    let b = [...new Set(a)];
    return b.toString()
  } else return a
}
const items = (head, pelanggan, bongkar, detail) => {
  let data = []
  for (let i = 0; i < head.length; i++) {
    for (let j = 0; j < pelanggan.length; j++) {
      for (let k = 0; k < bongkar.length; k++) {
        if(head[i].kode_pelanggan == pelanggan[j].kode_pelanggan) {
          if(head[i].kode_alamat_bongkar == bongkar[k].kode_pelanggan) {
            data.push({
              no_pengiriman: head[i].no_pengiriman,
              tgl_pengiriman: head[i].tgl_pengiriman,
              kode_pelanggan: pelanggan[j].kode_pelanggan,
              keterangan: head[i].keterangan,
              kode_alamat_bongkar: head[i].kode_alamat_bongkar,
              alamat: bongkar[k].alamat,
              alamat_pelanggan: pelanggan[j].alamat,
              kabupaten: bongkar[k].kabupaten,
              supir: head[i].supir,
              no_polisi: head[i].no_polisi,
              user_input: head[i].user_input,
              user_batal: head[i].user_batal,
              tgl_input: head[i].tgl_input,
              tgl_batal: head[i].tgl_batal,
              nama: bongkar[k].nama,
              namaplg: pelanggan[j].nama,
              kode_barang: detailpbl(head[i].no_pengiriman, detail).kode_barang,
              kode_group: detailpbl(head[i].no_pengiriman, detail).kode_group,
              hs_code: detailpbl(head[i].no_pengiriman, detail).hs_code,
              satuan: detailpbl(head[i].no_pengiriman, detail).satuan,
              nama_barang: detailpbl(head[i].no_pengiriman, detail, 'nama'),
            })
          }
        }
      }
    }
  }
  return data
}
// const suratjalan (value) => {
//   for (let i = 0; i < value.length; i++) {
//   }
// }
const noDuplicate = (a) => {
  const unique = a.filter((obj, index) => {
      return index === a.findIndex(o => obj.nama_barang === o.nama_barang);
  });

  return unique
}
const details = (nopgm, detail, pjl) => {
  let data = []
    for (let j = 0; j < detail.length; j++) {
      for (let k = 0; k < pjl.length; k++) {
        if(detail[j].no_pengiriman == nopgm) {
          if(detail[j].no_penjualan == pjl[k].no_penjualan){
            data.push({
              no_penjualan: detail[j].no_penjualan,
              tipe_dokumen: pjl[k].tipe_dokumen,
              no_dokumen: pjl[k].no_dokumen,
              kode_group: detail[j].kode_group,
              kode_barang: detail[j].kode_barang,
              nama_barang: detail[j].nama_barang,
              hs_code: detail[j].hs_code,
              jumlah: detail[j].jumlah,
              satuan: detail[j].satuan
            })
          }
        }
      }
    }
  return data
}
const konversi = (value) => {
  let a = [] 
  for (let i = 0; i < value.length; i++) {
    a.push({
      kode_barang: value[i].kode_barang,
      kode_konversi: value[i].kode_konversi,
      nama: value[i].nama_konversi,
      satuan_konversi: value[i].satuan_konversi,
      berat: value[i].berat,
      status: value[i].status
    })
  } return a
}
export default {
  headers,
  headDetails,
  datainput,
  headersLaporan,
  items,
  details,
  noDuplicate,
  konversi,
}