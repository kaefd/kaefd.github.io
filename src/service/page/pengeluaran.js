// service
// import api from "../api"
export default {
    data() {
      return {
        tipedokumen: [
            'BC25',
            'BC41',
          ],
          status: [
            {title: 'menunggu', key: 'open'},
            {title: 'selesai', key: 'close'},
          ],
          headers: [
            { title: 'Nomor Pengeluaran', key: 'no_penjualan'},
            { title: 'Tanggal Keluar', key: 'tgl_penjualan' },
            { title: 'Tipe Dokumen', key: 'tipe_dokumen' },
            { title: 'No Dokumen', key: 'no_dokumen' },
            { title: 'Pelanggan', key: 'kode_pelanggan' },
            { title: 'Kode Group', key: 'kode_group' },
            { title: 'Total Penjualan', key: 'total_penjualan' },
            { title: '', key: 'actions', sortable: false},
          ],
          headDetails:[
            {title: 'Kode Barang', key: 'kode_barang' },
            {title: 'Nama Barang', key: 'nama_barang' },
            {title: 'HS Code', key: 'hs_code' },
            {title: 'Jumlah', key: 'jumlah' },
            {title: 'Jumlah Terkirim', key: 'jumlah_terkirim' },
            {title: 'Satuan', key: 'satuan' },
            {title: 'Harga Jual', key: 'harga_jual' },
            {title: 'Total Harga', key: 'total_terjual' },
            {title: '', key: 'actions', sortable: false },
          ],
          datainput: {
            no_penjualan: '',
            tgl_penjualan: '',
            tipe_dokumen: '',
            no_dokumen: '',
            tgl_dokumen: '',
            kode_pelanggan: '',
            kode_group: '',
            total_penjualan: '',
            tgl_input: '',
            user_input: '',
            tgl_batal: '',
            user_batal: '',
            status: ''
          }
      }
    },
    pilihtipe(select, target) {
      if (select.length === 0) {
          return target;
        } else {
          return target.filter(item => select.includes(item.tipe_dokumen));
        }
    },
    penjualan(detail, target) {
      let p = []
      for (let j = 0; j < detail.length; j++) {
        if ( detail[j].no_penjualan == target ) {
            p.push(detail[j])
        }
      }
      return p
    },
    checkstatus(select, head, status) {
      var data = this.pilihtipe(select, head)
      if (status.length === 0) {
          return data;
        } else {
          return data.filter(item => status.includes(item.status));
        }
    },
  }
  