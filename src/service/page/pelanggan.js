// service
// import api from "../api"
export default {
    data() {
      return {
        headers: [
          { title: 'Kode Pelanggan', key: 'kode_pelanggan', dis: true},
          { title: 'Nama', key: 'nama' },
          { title: 'Alamat', key: 'alamat' },
          { title: 'NPWP', key: 'npwp' },
          { title: '', key: 'actions', sortable: false},
        ],
        keyform: [
          'kode_pelanggan',
          'nama',
          'alamat',
          'npwp',
          'status'
        ],
      }
    },
    namaPelanggan(pelanggan, kode) {
      for (let i = 0; i < pelanggan.length; i++) {
        if ( pelanggan[i].kode_pelanggan == kode ) {
            return pelanggan[i].nama
        }
      }
    },
  }
  