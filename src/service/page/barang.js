// service
// import api from "../api"
export default {
  data() {
    return {
      item: '',
      category: [
        'Bahan Baku',
        'Bahan Penolong',
        'Barang Setengah Jadi',
        'Barang Jadi',
        'Barang Sisa (Scrap)',
        'Mesin & Peralatan',
      ],
      headers: [
        { title: 'Kategori Barang', key: 'kategori_barang'},
        { title: 'Kode Barang', key: 'kode_barang' },
        { title: 'Nama Barang', key: 'nama_barang' },
        { title: 'HS Kode', key: 'hs_code' },
        { title: 'Satuan', key: 'satuan' },
        { key: 'actions', align:'center', sortable: false},
      ],
      keyform:[
        'kategori_barang',
        'kode_barang',
        'nama_barang',
        'hs_code',
        'satuan',
        'status',
      ],
    }
  },
    // API DATA BARANG
    // GET
    get(v) {
      return v
    },
    items() {
      return this.item
    },
    // SEARCH
    selected(select, target){
      if (select.length === 0) {
        return target;
      } else {
        return target.filter(item => select.includes(item.kategori_barang))
      }
    },

}
