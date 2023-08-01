const headers = [
  { title: 'No Pengiriman', key: 'no_pengiriman'},
  { title: 'Tgl Pengiriman', key: 'tgl_pengiriman' },
  { title: 'Pelanggan', key: 'namaplg' },
  { title: 'Tujuan Bongkar', key: 'nama' },
  { title: 'Supir', key: 'supir' },
  { title: 'Polisi', key: 'no_polisi' },
  { title: '', key: 'actions', sortable: false},
]
const headDetails = [
  {title: 'No Penjualan', key: 'no_penjualan' },
  {title: 'Tipe Dokumen', key: 'tipe_dokumen' },
  {title: 'No Dokumen', key: 'no_dokumen' },
  {title: 'Kode Group', key: 'kode_group' },
  {title: 'Kode Barang', key: 'kode_barang' },
  {title: 'Nama Barang', key: 'nama_barang' },
  {title: 'HS Code', key: 'hs_code' },
  {title: 'Jumlah', key: 'jumlah' },
  {title: 'Satuan', key: 'satuan' },
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
  status: ''
}
const items = (head, pelanggan, bongkar) => {
  let data = []
  for (let i = 0; i < head.length; i++) {
    for (let j = 0; j < pelanggan.length; j++) {
      for (let k = 0; k < bongkar.length; k++) {
        if(head[i].kode_pelanggan == pelanggan[j].kode_pelanggan) {
          if(head[i].kode_alamat_bongkar == bongkar[k].kode_pelanggan) {
            data.push({
              no_pengiriman: head[i].no_pengiriman,
              tgl_pengiriman: head[i].tgl_pengiriman,
              kode_pelanggan: head[j].kode_pelanggan,
              kode_alamat_bongkar: head[j].kode_alamat_bongkar,
              alamat: bongkar[k].alamat,
              supir: head[i].supir,
              no_polisi: head[i].no_polisi,
              user_input: head[i].user_input,
              user_batal: head[i].user_batal,
              tgl_input: head[i].tgl_input,
              tgl_batal: head[i].tgl_batal,
              nama: bongkar[k].nama,
              namaplg: pelanggan[j].nama,
            })
          }
        }
      }
    }
  }
  return data
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
export default {
  headers,
  headDetails,
  datainput,
  items,
  details,
}