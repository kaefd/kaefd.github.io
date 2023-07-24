import router from '../router'
import axios from 'axios'
import functions from './functions'

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
  
  postLogin(user, pass) {
    return instance.post('/login', {
      username: user,
      password: pass
    })
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
  /*********** OTORITAS ***********/
  async getUser(){
    try {
      const response = await instance.get('/user?status=true')
      return response.data;
    } catch (error) {
      return router.push('login')
    }
  },
  async getOtoritas(value){
    try {
      const apiUrl = '/user_otoritas?'
      const params = {
        username: value
      }
      const response = await instance.get(apiUrl, {params})
      return response.data;
    } catch (error) {
      return router.push('login')
    }
  },
  postUser(data) {
    let user = data.username
    let pass = data.password
    let oto = [
      {
        username: data.username,
        jenis_otoritas: 'Data Barang',
        status:data.data_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Barang Baru',
        status:data.tambah_barang_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Ubah Barang',
        status:data.ubah_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Hapus Barang',
        status:data.hapus_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Data Pelanggan',
        status:data.data_pelanggan
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pelanggan Baru',
        status:data.tambah_pelanggan_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Ubah Pelanggan',
        status:data.ubah_pelanggan
      },
      {
        username: data.username,
        jenis_otoritas: 'Hapus Pelanggan',
        status:data.Hapus_pelanggan
      },
      {
        username: data.username,
        jenis_otoritas: 'Data Supplier',
        status:data.data_supplier
      },
      {
        username: data.username,
        jenis_otoritas: 'Data User',
        status:data.data_user
      },
      {
        username: data.username,
        jenis_otoritas: 'Pembelian',
        status:data.pembelian
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pembelian Baru',
        status:data.tambah_pembelian_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Pembelian',
        status:data.batal_pembelian
      },
      {
        username: data.username,
        jenis_otoritas: 'Produksi',
        status:data.produksi
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Produksi Baru',
        status:data.tambah_produksi_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Produksi',
        status:data.batal_produksi
      },
      {
        username: data.username,
        jenis_otoritas: 'Penjualan',
        status:data.penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Penjualan Baru',
        status:data.tambah_penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Penjualan',
        status:data.batal_penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Pengiriman',
        status:data.pengriman
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pengiriman',
        status:data.tambah_pengiriman
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Pengiriman',
        status:data.batal_pengiriman
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan',
        status:data.laporan
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Stok Barang',
        status:data.laporan_stok_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Pembelian',
        status:data.laporan_pembelian
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Produksi',
        status:data.laporan_produksi
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Penjualan',
        status:data.laporan_penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Log User',
        status:data.laporan_log_user
      },
    ]
    const otoritas = JSON.stringify(oto);
    return instance.post('/user', {
      username : user,
      password : pass,
      otoritas : otoritas,
    })
  },
  editUser(data) {
    let user = data.username
    let pass = data.password
    let oto = [
      {
        username: data.username,
        jenis_otoritas: 'Data Barang',
        status:data.data_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Barang Baru',
        status:data.tambah_barang_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Ubah Barang',
        status:data.ubah_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Hapus Barang',
        status:data.hapus_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Data Pelanggan',
        status:data.data_pelanggan
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pelanggan Baru',
        status:data.tambah_pelanggan_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Ubah Pelanggan',
        status:data.ubah_pelanggan
      },
      {
        username: data.username,
        jenis_otoritas: 'Hapus Pelanggan',
        status:data.Hapus_pelanggan
      },
      {
        username: data.username,
        jenis_otoritas: 'Data Supplier',
        status:data.data_supplier
      },
      {
        username: data.username,
        jenis_otoritas: 'Data User',
        status:data.data_user
      },
      {
        username: data.username,
        jenis_otoritas: 'Pembelian',
        status:data.pembelian
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pembelian Baru',
        status:data.tambah_pembelian_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Pembelian',
        status:data.batal_pembelian
      },
      {
        username: data.username,
        jenis_otoritas: 'Produksi',
        status:data.produksi
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Produksi Baru',
        status:data.tambah_produksi_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Produksi',
        status:data.batal_produksi
      },
      {
        username: data.username,
        jenis_otoritas: 'Penjualan',
        status:data.penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Penjualan Baru',
        status:data.tambah_penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Penjualan',
        status:data.batal_penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Pengiriman',
        status:data.pengriman
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pengiriman',
        status:data.tambah_pengiriman
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Pengiriman',
        status:data.batal_pengiriman
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan',
        status:data.laporan
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Stok Barang',
        status:data.laporan_stok_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Pembelian',
        status:data.laporan_pembelian
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Produksi',
        status:data.laporan_produksi
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Penjualan',
        status:data.laporan_penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Log User',
        status:data.laporan_log_user
      },
    ]
    const otoritas = JSON.stringify(oto);
    return instance.patch('/user', {
      username : user,
      password : pass,
      otoritas : otoritas,
    })
  },
  deleteUser(data) {
    let user = data.username
    let pass = data.password
    let oto = [
      {
        username: data.username,
        jenis_otoritas: 'Data Barang',
        status:data.data_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Barang Baru',
        status:data.tambah_barang_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Ubah Barang',
        status:data.ubah_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Hapus Barang',
        status:data.hapus_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Data Pelanggan',
        status:data.data_pelanggan
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pelanggan Baru',
        status:data.tambah_pelanggan_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Ubah Pelanggan',
        status:data.ubah_pelanggan
      },
      {
        username: data.username,
        jenis_otoritas: 'Hapus Pelanggan',
        status:data.Hapus_pelanggan
      },
      {
        username: data.username,
        jenis_otoritas: 'Data Supplier',
        status:data.data_supplier
      },
      {
        username: data.username,
        jenis_otoritas: 'Data User',
        status:data.data_user
      },
      {
        username: data.username,
        jenis_otoritas: 'Pembelian',
        status:data.pembelian
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pembelian Baru',
        status:data.tambah_pembelian_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Pembelian',
        status:data.batal_pembelian
      },
      {
        username: data.username,
        jenis_otoritas: 'Produksi',
        status:data.produksi
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Produksi Baru',
        status:data.tambah_produksi_baru
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Produksi',
        status:data.batal_produksi
      },
      {
        username: data.username,
        jenis_otoritas: 'Penjualan',
        status:data.penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Penjualan Baru',
        status:data.tambah_penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Penjualan',
        status:data.batal_penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Pengiriman',
        status:data.pengriman
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pengiriman',
        status:data.tambah_pengiriman
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Pengiriman',
        status:data.batal_pengiriman
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan',
        status:data.laporan
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Stok Barang',
        status:data.laporan_stok_barang
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Pembelian',
        status:data.laporan_pembelian
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Produksi',
        status:data.laporan_produksi
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Penjualan',
        status:data.laporan_penjualan
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Log User',
        status:data.laporan_log_user
      },
    ]
    const otoritas = JSON.stringify(oto);
    return instance.delete('/user', {
      username : user,
      password : pass,
      otoritas : otoritas,
      status: false
    })
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
      status: "false",
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
      const response = await instance.get('/supplier?status=1')
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
    // console.log({
    //   pembelian_head : h,
    //   pembelian_detail : d,
    // })
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
  async getLogBarang() {
    try {
      const response = await instance.get('/log_barang?')
      return response.data;
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
  deleteProduksi(head, detailbhn, detailbrg) {
    let produksi_head = {
      no_produksi: head.no_produksi,
      tgl_produksi: head.tgl_produksi,
      kode_group: head.kode_group,
      tgl_input: head.tgl_input,
      user_input: head.user_input,
      tgl_batal: functions.day(),
      user_batal: "admin",
      status: "false",
    }
    const ph = JSON.stringify(produksi_head);
    const dbahan = JSON.stringify(detailbhn);
    const dbarang = JSON.stringify(detailbrg);
    const data = {
      produksi_head : ph,
      produksi_detail_bahan : dbahan,
      produksi_detail_barang : dbarang,
    }
    return instance.delete('/produksi_head', { data: data })
  },
  /***********  PENGIRIMAN ***********/
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
  postPengiriman(head, detail) {
    let h = {
      no_pengiriman: head.no_pengiriman,
      tgl_pengiriman: head.tgl_pengiriman,
      kode_pelanggan: head.kode_pelanggan,
      kode_alamat_bongkar: head.kode_alamat_bongkar,
      supir: head.supir,
      no_polisi: head.no_polisi,
      user_input: 'admin',
      tgl_input: functions.day(),
      tgl_batal:'1999-12-31T17:00:00.000Z',
      user_batal: '',
      status: 'true'
    }
    const ph = JSON.stringify(h);
    const d = JSON.stringify(detail);
    return instance.post('/pengiriman_head?', {
      pengiriman_head : ph,
      pengiriman_detail : d,
    })
  },
  deletePengiriman (head, detail) {
    let pengiriman_head = {
      no_pengiriman: head.no_pengiriman,
      tgl_pengiriman: head.tgl_pengiriman,
      kode_pelanggan: head.kode_pelanggan,
      kode_alamat_bongkar: head.kode_alamat_bongkar,
      supir: head.supir,
      no_polisi: head.no_polisi,
      user_input: head.user_input,
      tgl_input: head.tgl_input,
      tgl_batal: functions.day(),
      user_batal: 'admin',
      status: 'false'
    }
    const ph = JSON.stringify(pengiriman_head);
    const pd = JSON.stringify(detail);
    let data = {
      pengiriman_head: ph,
      pengiriman_detail: pd,
    }
    return instance.delete('/pengiriman_head', { data: data })
  },
  /*********** PENGELUARAN ***********/
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
  async getBelumTerkirim (){
    try {
      const response = await instance.get('/penjualan_head/belum_terkirim')
      return response.data;
    } catch (error) {
      return router.push('login')
    }
  },
  async getBelumTerkirimDetail (){
    try {
      const response = await instance.get('/penjualan_detail/belum_terkirim')
      return response.data;
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
      tgl_input: functions.day(),
      user_input: 'admin',
      tgl_batal: '1999-12-31T17:00:00.000Z',
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
      tgl_batal: functions.day(),
      user_batal: 'admin',
      status: 'false'
    }
    const ph = JSON.stringify(penjualan_head);
    const pd = JSON.stringify(detail);
    let data = {
      penjualan_head: ph,
      penjualan_detail: pd,
    }
    return instance.delete('/penjualan_head', { data: data })
  },
  /*********** LOGOUT ***********/
  logout() {
    localStorage.removeItem('token')
    router.push('login')
  }
}