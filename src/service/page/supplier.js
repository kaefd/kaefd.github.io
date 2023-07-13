// service
// import api from "../api"
const headers = [
    { title: 'Kode Supplier', align: 'start', key: 'kode_supplier', dis: true},
    { title: 'Nama', align: 'start', key: 'nama', dis: true },
    { title: 'Alamat', align: 'start', key: 'alamat', dis: true },
    { title: 'Kota', align: 'start', key: 'kota', dis: true },
    { title: 'Negara', align: 'start', key: 'negara', dis: true },
    { title: '', align: 'start', key: 'actions', sortable: false },
]
const keyform = [
    'kode_supplier',
    'nama',
    'alamat',
    'kota',
    'negara',
    'status'
]
export default {
  headers,
  keyform
}
  