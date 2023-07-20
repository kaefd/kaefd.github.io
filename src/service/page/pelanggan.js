// service
// import api from "../api"
  const headers = [
    { title: 'Kode Pelanggan', key: 'kode_pelanggan', dis: true},
    { title: 'Nama', key: 'nama' },
    { title: 'Alamat', key: 'alamat' },
    { title: 'NPWP', key: 'npwp' },
    { title: '', key: 'actions', align: 'end', sortable: false}
  ]
  const keyform = [
    'kode_pelanggan',
    'nama',
    'alamat',
    'npwp',
    'status'
  ]
  const namaPelanggan = (pelanggan, kode) => {
    for (let i = 0; i < pelanggan.length; i++) {
      if ( pelanggan[i].kode_pelanggan == kode ) {
          return pelanggan[i].nama
      }
    }
  }
export default {
  headers,
  keyform,
  namaPelanggan
}
  