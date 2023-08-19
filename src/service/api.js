import router from '../router'
import axios from 'axios'
import functions from './functions'

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

const user = localStorage.getItem('user')
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
  /*********** OTORITAS ***********/
  async getUser(value){
    try {
      const params = {
        username : value
      }
      const response = await instance.get('/user?', { params })
      return response.data;
    } catch (error) {
      return this.logout()
    }
  },
  async getLogUser (param) {
    try {
      const apiUrl = '/log_user?'
      const params = {
        tgl_awal: param[0],
        tgl_akhir: param[1]
      }
      const response = await instance.get(apiUrl, {params})
      return response.data;
    } catch (error) {
      return this.logout()
    }
  },
  async getOtoritas(value){
    try {
      const response = await instance.get('/user_otoritas/'+value)
      return response.data;
    } catch (error) {
      return this.logout()
    }
  },
  postUser(data) {
    let user = data.username
    let pass = data.password
    let oto = [
      {
        username: data.username,
        jenis_otoritas: 'Data Barang',
        status: String(data.data_barang[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Barang Baru',
        status: String(data.data_barang[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Ubah Barang',
        status: String(data.data_barang[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Hapus Barang',
        status: String(data.data_barang[3].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Data Pelanggan',
        status: String(data.data_pelanggan[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pelanggan Baru',
        status: String(data.data_pelanggan[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Ubah Pelanggan',
        status: String(data.data_pelanggan[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Hapus Pelanggan',
        status: String(data.data_pelanggan[3].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Data Supplier',
        status: String(data.data_supplier[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Data User',
        status: String(data.data_user[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Pembelian',
        status: String(data.pembelian[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pembelian Baru',
        status: String(data.pembelian[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Pembelian',
        status: String(data.pembelian[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Produksi',
        status: String(data.produksi[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Produksi Baru',
        status: String(data.produksi[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Produksi',
        status: String(data.produksi[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Penjualan',
        status: String(data.penjualan[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Penjualan Baru',
        status: String(data.penjualan[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Penjualan',
        status: String(data.penjualan[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Pengiriman',
        status: String(data.pengiriman[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pengiriman Baru',
        status: String(data.pengiriman[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Pengiriman',
        status: String(data.pengiriman[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Cetak Surat Jalan',
        status: String(data.pengiriman[3].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Cetak DO',
        status: String(data.pengiriman[4].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Alamat Bongkar',
        status: String(data.pengiriman[5].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan',
        status: String(data.laporan[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Stok Barang',
        status: String(data.laporan[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Pembelian',
        status: String(data.laporan[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Produksi',
        status: String(data.laporan[3].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Penjualan',
        status: String(data.laporan[4].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Log User',
        status: String(data.laporan[5].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Pengiriman',
        status: String(data.laporan[6].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Pengaturan Umum',
        status: String(data.setelan[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Export pdf',
        status: String(data.setelan[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Export xlsx',
        status: String(data.setelan[2].status)
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
        status: String(data.data_barang[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Barang Baru',
        status: String(data.data_barang[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Ubah Barang',
        status: String(data.data_barang[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Hapus Barang',
        status: String(data.data_barang[3].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Data Pelanggan',
        status: String(data.data_pelanggan[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pelanggan Baru',
        status: String(data.data_pelanggan[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Ubah Pelanggan',
        status: String(data.data_pelanggan[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Hapus Pelanggan',
        status: String(data.data_pelanggan[3].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Data Supplier',
        status: String(data.data_supplier[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Data User',
        status: String(data.data_user[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Pembelian',
        status: String(data.pembelian[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pembelian Baru',
        status: String(data.pembelian[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Pembelian',
        status: String(data.pembelian[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Produksi',
        status: String(data.produksi[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Produksi Baru',
        status: String(data.produksi[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Produksi',
        status: String(data.produksi[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Penjualan',
        status: String(data.penjualan[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Penjualan Baru',
        status: String(data.penjualan[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Penjualan',
        status: String(data.penjualan[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Pengiriman',
        status: String(data.pengiriman[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Tambah Pengiriman Baru',
        status: String(data.pengiriman[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Batal Pengiriman',
        status: String(data.pengiriman[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Cetak Surat Jalan',
        status: String(data.pengiriman[3].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Cetak DO',
        status: String(data.pengiriman[4].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Alamat Bongkar',
        status: String(data.pengiriman[5].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan',
        status: String(data.laporan[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Stok Barang',
        status: String(data.laporan[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Pembelian',
        status: String(data.laporan[2].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Produksi',
        status: String(data.laporan[3].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Penjualan',
        status: String(data.laporan[4].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Log User',
        status: String(data.laporan[5].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Laporan Pengiriman',
        status: String(data.laporan[6].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Pengaturan Umum',
        status: String(data.setelan[0].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Export pdf',
        status: String(data.setelan[1].status)
      },
      {
        username: data.username,
        jenis_otoritas: 'Export xlsx',
        status: String(data.setelan[2].status)
      },
    ]
    const otoritas = JSON.stringify(oto);
    return instance.patch('/user', {
      username : user,
      password : pass,
      otoritas : otoritas,
    })
  },
  deleteUser(username) {
    const apiUrl  = '/user'
    let data = {
      username: username
    }
    return instance.delete(apiUrl, {
      data: data
    })
  },
  /*********** GROUP BARANG ***********/
  async getGroupBarang(){
    try {
      const response = await instance.get('/group_barang')
      return response.data;
    } catch (error) {
      return this.logout()
    }
  },
  /*********** ALAMAT BONGKAR ***********/
  async alamatBongkar(){
    try {
      const response = await instance.get('/alamat_bongkar')
      return response.data;
    } catch (error) {
      return this.logout()
    }
  },
  /*********** DATA BARANG ***********/
  async getBarang(){
    try {
      const response = await instance.get('/barang?status=true')
      return response.data;
    } catch (error) {
      return this.logout()
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
      kode_barang : v.kode_barang,
    }
    return instance.delete('/barang', { data: input })
  },
  /*********** DATA PELANGGAN ***********/
  async getPelanggan() {
    try {
      const response = await instance.get('/pelanggan')
      return response.data;
    } catch (error) {
      return this.logout()
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
    }
    return instance.delete('/pelanggan', { data: input })
  },
  /*********** DATA SUPPLIER ***********/
  async getSupplier (){
    try {
      const response = await instance.get('/supplier?status=true')
      return response.data;
    } catch (error) {
      return this.logout()
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
      return this.logout()
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
      return this.logout()
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
      // pembelian_head: pbl_head,
      // pembelian_detail: pbl_detail,
      no_pembelian: head.no_pembelian
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
      return this.logout()
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
      return this.logout()
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
      return this.logout()
    }
  },
  async getLogBarang() {
    try {
      const response = await instance.get('/log_barang?')
      return response.data;
    } catch (error) {
      return this.logout()
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
    // return console.log({
    //     produksi_head : h,
    //     produksi_detail_bahan : dbahan,
    //     produksi_detail_barang : dbarang,
    //   })
  },
  deleteProduksi(head, detailbhn, detailbrg) {
    let produksi_head = {
      no_produksi: head.no_produksi,
      tgl_produksi: head.tgl_produksi,
      kode_group: head.kode_group,
      tgl_input: head.tgl_input,
      user_input: head.user_input,
      tgl_batal: functions.day(),
      user_batal: user,
      status: "false",
    }
    const ph = JSON.stringify(produksi_head);
    const dbahan = JSON.stringify(detailbhn);
    const dbarang = JSON.stringify(detailbrg);
    const data = {
      // produksi_head : ph,
      // produksi_detail_bahan : dbahan,
      // produksi_detail_barang : dbarang,
      no_produksi: head.no_produksi
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
      return this.logout()
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
      return this.logout()
    }
  },
  postPengiriman(head, detail) {
    let h = {
      no_pengiriman: head.no_pengiriman,
      tgl_pengiriman: head.tgl_pengiriman,
      kode_pelanggan: head.kode_pelanggan,
      kode_alamat_bongkar: head.kode_alamat_bongkar,
      supir: head.supir,
      keterangan: "",
      no_polisi: head.no_polisi,
      user_input: user,
      tgl_input: functions.day(),
      tgl_batal:'1999-12-31T17:00:00.000Z',
      user_batal: "",
      status: 'true'
    }
    const ph = JSON.stringify(h);
    const d = JSON.stringify(detail);
    return instance.post('/pengiriman_head?', {
      pengiriman_head : ph,
      pengiriman_detail : d,
    })
    // return console.log({
    //   pengiriman_head : ph,
    //   pengiriman_detail : d,
    // })
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
      user_batal: user,
      status: 'false'
    }
    const ph = JSON.stringify(pengiriman_head);
    const pd = JSON.stringify(detail);
    let data = {
      // pengiriman_head: ph,
      // pengiriman_detail: pd,
      no_pengiriman: head.no_pengiriman
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
      return this.logout()
    }
  },
  async getHeadPenjualan (param){
    try {
      const apiUrl = '/penjualan_head/'+param
      
      const response = await instance.get(apiUrl)
      return response.data
    } catch (error) {
      console.log(error);
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
      return this.logout()
    }
  },
  async getBelumTerkirim (){
    try {
      const response = await instance.get('/penjualan_head/belum_terkirim')
      return response.data;
    } catch (error) {
      return this.logout()
    }
  },
  async getBelumTerkirimDetail (){
    try {
      const response = await instance.get('/penjualan_detail/belum_terkirim')
      return response.data;
    } catch (error) {
      return this.logout()
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
      user_input: user,
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
    const pjl = {
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
      tgl_batal: new Date(),
      user_batal: user,
      status: 'false'
    }
    const ph = JSON.stringify(pjl);
    const pd = JSON.stringify(detail);
    let data = {
      // penjualan_head: ph,
      // penjualan_detail: pd,
      no_penjualan: head.no_penjualan
    }
    return instance.delete('/penjualan_head', { data: data })
  },
  /*********** LOGOUT ***********/
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return router.push('login')
  }
}