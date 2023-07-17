import router from '../router'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://auristeel.com/api-beta',
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
  /*********** GROUP BARANG ***********/
  async getGroupBarang(){
    try {
      const response = await instance.get('/group_barang')
      return response.data;
    } catch (error) {
      return router.push('login')
    }
  },
  /*********** ALAMAT BONGKAR ***********/
  async alamatBongkar(){
    try {
      const response = await instance.get('/alamat_bongkar')
      return response.data;
    } catch (error) {
      return router.push('login')
    }
  },
  /*********** DATA BARANG ***********/
  async getBarang(){
    try {
      const response = await instance.get('/barang?status=1')
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
    let input = {
      kategori_barang : v.kategori_barang,
      kode_barang : v.kode_barang,
      nama_barang: v.nama_barang,
      hs_code: v.hs_code,
      satuan: v.satuan,
      status: 0,
    }
    const payload = JSON.stringify(input);
    let data = {
      barang: payload
    }
    return instance.delete('/barang', { data: data })
  },
  /*********** DATA PELANGGAN ***********/
  async getPelanggan() {
    try {
      const response = await instance.get('/pelanggan?status=1')
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
    let input = {
      kode_pelanggan : value.kode_pelanggan,
      nama : value.kode_pelanggan,
      alamat: value.alamat,
      npwp: value.npwp,
      status: 0,
    }
    const payload = JSON.stringify(input);
    let data = {
      pelanggan: payload
    }
    return instance.delete('/pelanggan', { data: data })
  },
  /*********** DATA SUPPLIER ***********/
  async getSupplier (){
    try {
      const response = await instance.get('/supplier?status=true')
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
  postPemasukan(head, detail) {
    const h = JSON.stringify(head);
    const d = JSON.stringify(detail);
    return instance.post('/pembelian_head?', {
      pembelian_head : h,
      pembelian_detail : d,
    })
  },
  deletePemasukan(head, detail){
    const h = {
      no_pembelian: head.no_pembelian,
      user_input: head.user_input,
      user_batal: 'admin',
      tgl_pembelian: head.tgl_pembelian,
      tgl_input: head.tgl_input,
      tgl_batal: '',
      kode_supplier: head.kode_supplier,
      tipe_dokumen: head.tipe_dokumen,
      no_dokumen: head.no_dokumen,
      tgl_dokumen: head.tgl_dokumen,
      no_invoice: head.no_invoice,
      no_bl: head.no_bl,
      mata_uang: head.mata_uang,
      kurs: head.kurs,
      status: "false"
    }
    const pbl_head = JSON.stringify(h);
    const pbl_detail = JSON.stringify(detail);
    let data = {
      pembelian_head: pbl_head,
      pembelian_detail: pbl_detail,
    }
    return instance.delete('/pembelian_head', { data: data })
  },
  /***********  PRODUKSI ***********/
  async getProduksiHead(param) {
    try {
      const apiUrl = '/produksi_head?'
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
  async getProDBahan(param) {
    try {
      const apiUrl = '/produksi_detail_bahan?'
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
  async getProDBarang(param) {
    try {
      const apiUrl = '/produksi_detail_barang?'
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
  postProduksi(head, detailbahan, detaibarang) {
    const h = JSON.stringify(head);
    const dbahan = JSON.stringify(detailbahan);
    const dbarang = JSON.stringify(detaibarang);
    return instance.post('/produksi_head', {
      produksi_head : h,
      produksi_detail_bahan : dbahan,
      produksi_detail_barang : dbarang,
    })
  },
  /**  PENGIRIMAN **/
  async getPengirimanHead (param){
    try {
      const apiUrl = '/pengiriman_head?'
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
  async getPengirimanDetail (param){
    try {
      const apiUrl = '/pengiriman_detail?'
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
  /** PENJUALAN */
  async getPenjualanHead (param){
    try {
      const apiUrl = '/penjualan_head?'
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
  async getPenjualanDetail (param){
    try {
      const apiUrl = '/penjualan_detail?'
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
  postPengeluaran(head, detail) {
    let pjl_head = {
      no_penjualan: head.no_penjualan,
      tgl_penjualan: head.tgl_penjualan,
      tipe_dokumen: head.tipe_dokumen,
      no_dokumen: head.no_dokumen,
      tgl_dokumen: head.tgl_dokumen,
      kode_pelanggan: head.kode_pelanggan,
      kode_group: head.kode_group,
      total_penjualan: detail[0].total_terjual,
      tgl_input: '',
      user_input: '',
      tgl_batal: '',
      user_batal: '',
      status: 'open'
    }
    const h = JSON.stringify(pjl_head);
    const d = JSON.stringify(detail);
    return instance.post('/penjualan_head?', {
      penjualan_head : h,
      penjualan_detail : d,
    })
  },
  deletePengeluaran(head, detail){
    let penjualan_head = {
      no_penjualan: head.no_penjualan,
      tgl_penjualan: head.tgl_penjualan,
      tipe_dokumen: head.tipe_dokumen,
      no_dokumen: head.no_dokumen,
      tgl_dokumen: head.tgl_dokumen,
      kode_pelanggan: head.kode_pelanggan,
      kode_group: head.kode_group,
      total_penjualan: head.total_penjualan,
      tgl_input: head.tgl_input,
      user_input: head.user_input,
      tgl_batal: head.tgl_batal,
      user_batal: '',
      status: 0
    }
    const ph = JSON.stringify(penjualan_head);
    const pd = JSON.stringify(detail);
    let data = {
      penjualan_head: ph,
      penjualan_detail: pd,
    }
    return instance.delete('/penjualan_head', { data: data })
  },
  /** LOGOUT **/
  logout() {
    localStorage.removeItem('token')
    localStorage.clear();
    sessionStorage.clear();
    router.push('login')
  }
}