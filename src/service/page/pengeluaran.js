import functions from "../functions"
const tipedokumen = [
    'BC25',
    'BC41',
]
const status = [
    {title: 'menunggu', key: 'open'},
    {title: 'selesai', key: 'close'},
]
const headers = [
    { title: 'Nomor Pengeluaran', key: 'no_penjualan'},
    { title: 'Tanggal Keluar', key: 'tgl_penjualan' },
    { title: 'Tipe Dokumen', key: 'tipe_dokumen' },
    { title: 'No Dokumen', key: 'no_dokumen' },
    { title: 'Pelanggan', key: 'kode_pelanggan' },
    { title: 'Kode Group', key: 'kode_group' },
    { title: 'Total Penjualan', key: 'total_penjualan' },
    { title: '', key: 'actions', sortable: false},
]
const headDetails = [
    {title: 'Kode Barang', key: 'kode_barang' },
    {title: 'Nama Barang', key: 'nama_barang' },
    {title: 'HS Code', key: 'hs_code' },
    {title: 'Jumlah', key: 'jumlah' },
    {title: 'Jumlah Terkirim', key: 'jumlah_terkirim' },
    {title: 'Satuan', key: 'satuan' },
    {title: 'Harga Jual', key: 'harga_jual' },
    {title: 'Total Harga', key: 'total_terjual' },
    {title: '', key: 'actions', sortable: false },
]
const datainput = {
    no_penjualan: '',
    tgl_penjualan: '',
    tipe_dokumen: '',
    no_dokumen: '',
    tgl_dokumen: '',
    kode_pelanggan: '',
    kode_group: '',
    total_penjualan: '',
    tgl_input: '',
    user_input: '',
    tgl_batal: '',
    user_batal: '',
    status: ''
}
const items = (head, pelanggan) => {
  let data = []
  for (let i = 0; i < head.length; i++) {
    for (let j = 0; j < pelanggan.length; j++) {
      if(head[i].kode_pelanggan == pelanggan[j].kode_pelanggan){
        data.push({
          no_penjualan: head[i].no_penjualan,
          tgl_penjualan: head[i].tgl_penjualan,
          tipe_dokumen: head[i].tipe_dokumen,
          no_dokumen: head[i].no_dokumen,
          kode_pelanggan: pelanggan[j].nama,
          kode_group: head[i].kode_group,
          total_penjualan: functions.numb(head[i].total_penjualan)
        })
      }
    }
  }
  return data
}
const pilihtipe = (select, target) => {
  if (select.length === 0) {
      return target;
    } else {
      return target.filter(item => select.includes(item.tipe_dokumen));
    }
}
const penjualan = (detail, target) => {
  let p = []
  for (let j = 0; j < detail.length; j++) {
    if ( detail[j].no_penjualan == target ) {
        p.push(detail[j])
    }
  }
  return p
}
const checkstatus = (select, head, status) => {
  let data = pilihtipe(select, head)
  if (status.length === 0) {
      return data;
    } else {
      return data.filter(item => status.includes(item.status));
    }
}
export default {
  tipedokumen,
  status,
  headers,
  headDetails,
  datainput,
  items,
  pilihtipe,
  penjualan,
  checkstatus
}