// service
// import api from "../api"
import functions from "../functions"
export default {
    data() {
      return {
        headers: [
          { title: 'Nomor Pemasukan', key: 'no_pembelian'},
          { title: 'Tanggal Masuk', key: 'tgl_pembelian' },
          { title: 'Tipe Dokumen', key: 'tipe_dokumen' },
          { title: 'No Dokumen', key: 'no_dokumen' },
          { title: 'Supplier', key: 'kode_supplier' },
          { title: 'Mata Uang', key: 'mata_uang' },
          { title: 'Total Nilai', key: 'total_nilai' },
          { title: 'Total Nilai(Rp)', key: 'rp' },
          { key: 'actions'},
        ],
        tipedokumen: [
          'BC23',
          'BC40',
          'PPKEK-LDP',
          'PPKEK-TLDDP',
        ],
        headDetails:[
          {title: 'Kode Barang', key: 'kode_barang' },
          {title: 'Nama Barang', key: 'nama_barang' },
          {title: 'HS Code', key: 'hs_code' },
          {title: 'Jumlah', key: 'jumlah' },
          {title: 'Jumlah Diterima', key: 'jumlah_diterima' },
          {title: 'Satuan', key: 'satuan' },
          {title: 'Total Nilai', key: 'nilai' },
          {key: 'actions'},
        ],
        datainput: {
          no_pembelian: '',
          tgl_pembelian: '',
          tgl_input: functions.day(),
          kode_supplier: '',
          tipe_dokumen: '',
          no_dokumen: '',
          tgl_dokumen: '',
          no_invoice: '',
          no_bl: '',
          mata_uang: '',
          kurs: '',
          user_input: '',
          user_batal: '',
          status: ''
        },
      }
    },
    datatable(item, supplier) {
        let a = []
        for (let i = 0; i < item.length; i++) {
          for (let k = 0; k < supplier.length; k++) {
            if(item[i].kode_supplier == supplier[k].kode_supplier) {
              a.push({
                no_pembelian: item[i].no_pembelian,
                tgl_pembelian: item[i].tgl_pembelian,
                tipe_dokumen: item[i].tipe_dokumen,
                no_dokumen: item[i].no_dokumen,
                tgl_dokumen: functions.formatDate(item[i].tgl_dokumen),
                kode_supplier: supplier[k].nama,
                mata_uang: item[i].mata_uang,
                total_nilai: functions.numb(item[i].total_nilai),
                rp: functions.numb(item[i].total_nilai * item[i].kurs),
                no_invoice: item[i].no_invoice,
                no_bl: item[i].no_bl,
                kurs: item[i].kurs,
                user_input: item[i].user_input,
                user_batal: item[i].user_batal,
                tgl_input: item[i].tgl_input,
                tgl_batal: item[i].tgl_batal,
                status: item[i].status,
              })
            }
          }
        }
        return a
    },
    pembelian(value) {
      let p = []
      for (let j = 0; j < this.pembeliandetl.length; j++) {
        if ( this.pembeliandetl[j].no_pembelian == value ) {
            p.push(this.pembeliandetl[j])
        }
      }
      return p
    },
    dataTable(value, params, supplier, detail) {
      if(params == 'nama') {
        for (let i = 0; i < supplier.length; i++) {
          if(supplier[i].kode_supplier == value) {
            return supplier[i].nama
          }
        }
      }
      else if(params == 'pembelian') {
        let p = []
        for (let j = 0; j < detail.length; j++) {
          if ( detail[j].no_pembelian == value ) {
              p.push(detail[j])
          }
        }
        return p
      }
      else if(params == 'total') {
        return functions.numb(value)
      }
      else if(params == 'rp') {
        let kurs = value.kurs
        let nilai = value.total_nilai
        return functions.numb(kurs * nilai)
      }
    },
    printdata(item, supplier, detail){
      let a = []
      for (let i = 0; i < item.length; i++) {
        a.push({
          no_pembelian: item[i].no_pembelian,
          tgl_pembelian: item[i].tgl_pembelian,
          tipe_dokumen: item[i].tipe_dokumen,
          no_dokumen: item[i].no_dokumen,
          kode_supplier: this.dataTable(item[i].kode_supplier, 'nama', supplier, detail),
          kode_group: item[i].kode_group,
          kurs: item[i].kurs,
          mata_uang: item[i].mata_uang,
          total_nilai: this.dataTable(item[i].total_nilai, 'total', supplier, detail),
          rp: this.dataTable(item[i], 'rp'),
        })
      }
      return a
    },
    pilihtipe(select, item, supplier) {
      if (select.length === 0) {
          return this.datatable(item, supplier);
        } else {
          return this.datatable(item, supplier).filter(item => select.includes(item.tipe_dokumen));
        }
    },
    
  }
  