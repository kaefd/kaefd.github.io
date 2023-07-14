import router from '../router'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://auristeel.com/api',
  headers: {
    'Permissions-Policy': 'interest-cohort=()',
    'csrf': localStorage.getItem('token'),
    'accept': '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'access-control-allow-credentials': true,
    'access-control-allow-methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
  }
})

export default {
  
  postLogin(data) {
    return instance.post('/login', data)
  },
  getData (url, data) {
    return instance.get(url, data)
  },
  putData (url, data) {
    return instance.patch(url, data)
  },

  deleteData (url, payload) {
    return instance.delete(url, {data: payload})
  },
  /*********** DATA BARANG ***********/
  async getBarang(){
    try {
      const response = await instance.get('/barang?status=true')
      return response.data;
    } catch (error) {
      return router.push('login')
    }
  },
  postBarang(value) {
    const jsonBarang = JSON.stringify(value);
    return instance.post('/barang', {
      barang : jsonBarang
    })
  },
  putBarang(value) {
    const jsonBarang = JSON.stringify(value);
    return instance.patch('/barang', {
      barang: jsonBarang
    })
  },
  deleteBarang(v) {
    let data = {
      kategori_barang : v.kategori_barang,
      kode_barang : v.kode_barang,
      nama_barang: v.nama_barang,
      hs_code: v.hs_code,
      satuan: v.satuan,
      status: false,
    }
    const jsonBarang = JSON.stringify(data);
    return instance.delete('/barang', {
      barang: jsonBarang
    })
  },
  /*********** DATA PELANGGAN ***********/
  async getPelanggan() {
    try {
      const response = await instance.get('/pelanggan?status=true')
      return response.data;
    } catch (error) {
      return router.push('login')
    }
  },
  postPelanggan(value) {
    const myJSON = JSON.stringify(value)
    return instance.post('/pelanggan', {
      pelanggan : myJSON
    })
  },
  putPelanggan(value) {
    const myJSON = JSON.stringify(value)
    return instance.patch('/pelanggan', {
      pelanggan : myJSON
    })
  },
  deletePelanggan(value) {
    let data = {
      kode_pelanggan : value.kode_pelanggan,
      nama : value.kode_pelanggan,
      alamat: value.alamat,
      npwp: value.npwp,
      status: false,
    }
    const json = JSON.stringify(data);
    return instance.delete('/barang', {
      barang: json
    })
  },
  /*********** DATA SUPPLIER ***********/
  async getSupplier (){
    try {
      const response = await instance.get('/supplier')
      return response.data;
    } catch (error) {
      return router.push('login')
    }
  },
  /***********  PEMASUKAN ***********/
  async getPemasukanHead(param){
    try {
      const apiUrl = '/pembelian_head?'
      const params = {
        tgl_awal: param[0],
        tgl_akhir: param[1]
      }
      const response = await instance.get(apiUrl, {params})
      return response.data
    } catch (error) {
      return router.push('login')
    }
  },
  async getPemasukanDetail(param){
    try {
      const apiUrl = '/pembelian_detail?'
      const params = {
        tgl_awal: param[0],
        tgl_akhir: param[1]
      }
      const response = await instance.get(apiUrl, {params})
      return response.data
    } catch (error) {
      return router.push('login')
    }
  },
  /**  PENGIRIMAN **/
  async getPengirimanHead (param1, param2){
    try {
      const apiUrl = '/pengiriman_head?'
      const params = {
        tgl_awal: param1,
        tgl_akhir: param2,
      }
      const response = await instance.get(apiUrl, {params})
      return response.data;
    } catch (error) {
      throw new Error('Gagal mengambil data pengguna');
    }
  },
  async getPengirimanDetail (no){
    try {
      const response = await instance.get('/pengiriman_detail/'+no)
      return response.data;
    } catch (error) {
      throw new Error('Gagal mengambil data pengguna');
    }
  },
  /** PENJUALAN */
  async getPenjualanHead (no){
    try {
      const response = await instance.get('/penjualan_head/'+no)
      return response.data;
    } catch (error) {
      throw new Error('Gagal mengambil data pengguna');
    }
  },
  /** LOGOUT **/
  logout() {
    localStorage.removeItem('token')
    localStorage.clear();
    sessionStorage.clear();
    router.push('login')
  }
}