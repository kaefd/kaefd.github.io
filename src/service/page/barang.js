// service
// import api from "../api"
import functions from "../functions"
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
        { title: 'Nama Barang', key: 'nama' },
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

    // SEARCH
    selected(select, target){
      if (select.length === 0) {
        return target;
      } else {
        return target.filter(item => select.includes(item.kategori_barang))
      }
    },
    slotitem(kode, target, param) {
      for (let i = 0; i < target.length; i++) {
        if(kode == target[i].kode_barang) {
          // kategori barang
          if(param == 'k') {
            return target[i].kategori_barang
          }
          else if( param == 'nm') {
            return target[i].nama_barang
          }
          else if( param == 'hc') {
            return target[i].hs_code
          }
          else if( param =='s') {
            return target[i].satuan
          }
        }
        
      }
    },
    sumStok(kode, target) {
      let sum = []
      for (let i = 0; i < target.length; i++) {
        if(target[i].kode_barang == kode) {
          sum.push(target[i].stok_akhir)
        }
      }
      return functions.numb(sum.reduce((total, current) => {
        return total + current
      }, 0))
    },
    barang (data) {
      // Lakukan pemrosesan data yang diperlukan
      const processedData = data.map((item) => ({
        kategori_barang: item.kategori_barang,
        kode_barang: item.kode_barang,
        nama: item.nama_barang,
        hs_code: item.hs_code,
        satuan: item.satuan,
        // Tambahkan properti lain sesuai kebutuhan
      }));
    
      return processedData;
    }
    
  }