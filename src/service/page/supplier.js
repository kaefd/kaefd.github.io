// service
// import api from "../api"
export default {
    data() {
      return {
        item: '',
        headers: [
            { title: 'Kode Supplier', align: 'start', key: 'kode_supplier', dis: true},
            { title: 'Nama', align: 'start', key: 'nama', dis: true },
            { title: 'Alamat', align: 'start', key: 'alamat', dis: true },
            { title: 'Kota', align: 'start', key: 'kota', dis: true },
            { title: 'Negara', align: 'start', key: 'negara', dis: true },
            { title: '', align: 'start', key: 'actions', sortable: false },
        ],
        keyform: [
            'kode_supplier',
            'nama',
            'alamat',
            'kota',
            'negara',
            'status'
        ],
      }
    },
  }
  