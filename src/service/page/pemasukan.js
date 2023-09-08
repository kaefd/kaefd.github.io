import functions from "../functions"

const sortBy = [{ key: 'no_pembelian', order: 'desc' }]
const headers = [
  { title: 'Nomor Pemasukan', key: 'no_pembelian'},
  { title: 'Tanggal Masuk', key: 'tgl_pembelian' },
  { title: 'Tipe Dokumen', key: 'tipe_dokumen' },
  { title: 'No Dokumen', key: 'no_dokumen' },
  { title: 'Supplier', key: 'kode_supplier' },
  { title: 'Mata Uang', key: 'mata_uang' },
  { title: 'Total Nilai', key: 'total_nilai' },
  { title: 'Total Nilai(Rp)', key: 'rp' },
  { key: 'actions'},
]
const tipedokumen = [
  'BC23',
  'BC40',
  'PPKEK-LDP',
  'PPKEK-TLDDP',
]
const headDetails = [
  {title: 'Kode Barang', key: 'kode_barang' },
  {title: 'Nama Barang', key: 'nama_barang' },
  {title: 'HS Code', key: 'hs_code' },
  {title: 'Jumlah', key: 'jumlah' },
  {title: 'Jumlah Diterima', key: 'jumlah_diterima' },
  {title: 'Satuan', key: 'satuan' },
  {title: 'Total Nilai', key: 'nilai' },
  {key: 'actions'},
]
const datainput = {
  no_pembelian: '',
  tgl_pembelian: '',
  tgl_input: functions.day(),
  tgl_batal: '1999-12-31T17:00:00.000Z',
  kode_supplier: '',
  tipe_dokumen: '',
  no_dokumen: '',
  persentase: '',
  tgl_dokumen: '',
  no_invoice: '',
  no_bl: '',
  total_nilai: '',
  mata_uang: '',
  kurs: '',
  user_input: '',
  user_batal: '',
  status: "true"
}
const headTitle = () => {
  let a = []
  for(let i = 0; i < headers.length; i++) {
    a.push(headers[i].title)
  }
  return a
}
const detailpbl = (no, detail, param) => {
  let a = []
  for (let i = 0; i < detail.length; i++) {
    if(detail[i].no_pembelian == no) {
      if(param == 'nama') {
        a.push(detail[i].nama_barang)
        
      } else a = detail[i]
    }
  }
  if(param == 'nama') {
    return a.toString()
  } else return a
}
const barang = (target, value) => {
  for (let i = 0; i < value.length; i++) {
    if(value[i].kode_barang == target) {
      return value[i].kategori_barang
    }
  }
}
const datatable = (item, supplier, detail, dtbarang) => {
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
          total_nilai: functions.numb(item[i].total_nilai, 2, true),
          rp: functions.numb(item[i].total_nilai * item[i].kurs, 2, true),
          no_invoice: item[i].no_invoice,
          no_bl: item[i].no_bl,
          kurs: item[i].kurs,
          persentase: item[i].persentase,
          user_input: item[i].user_input,
          user_batal: item[i].user_batal,
          tgl_input: item[i].tgl_input,
          tgl_batal: item[i].tgl_batal,
          status: item[i].status,
          nama_barang: detailpbl(item[i].no_pembelian, detail, 'nama'),
          kode_barang: detailpbl(item[i].no_pembelian, detail).kode_barang,
          hs_code: detailpbl(item[i].no_pembelian, detail).hs_code,
          satuan: detailpbl(item[i].no_pembelian, detail).satuan,
          jumlah_diterima: functions.numb(detailpbl(item[i].no_pembelian, detail).jumlah_diterima),
          jumlah: detailpbl(item[i].no_pembelian, detail).jumlah,
          nilai: detailpbl(item[i].no_pembelian, detail).nilai,
          kategori_barang: barang(detailpbl(item[i].no_pembelian, detail).kode_barang, dtbarang),
        })
      }
    }
  }
    return a
}
const pembelian = (value) => {
  let p = []
  for (let j = 0; j < this.pembeliandetl.length; j++) {
    if ( this.pembeliandetl[j].no_pembelian == value ) {
        p.push(this.pembeliandetl[j])
    }
  }
  return p
}
const dataTable = (value, params, supplier, detail) => {
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
}
const printdata = (item, supplier, detail) => {
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
}
const pilihtipe = (select, item, supplier, detail, barang) => {
  if (select.length === 0) {
      return datatable(item, supplier, detail, barang);
    } else {
      return datatable(item, supplier, detail, barang).filter(item => select.includes(item.tipe_dokumen));
    }
}
const sum = (data) => {
  let arr = []
  for (let i = 0; i < data.length; i++) {
      arr.push(data[i].jumlah)
  }
  return arr.reduce((total, current) => {
      return total + current;
  }, 0);
}
export default {
  sortBy,
  headers,
  tipedokumen,
  headDetails,
  datainput,
  datatable,
  headTitle,
  pembelian,
  dataTable,
  printdata,
  pilihtipe,
  sum,
  detailpbl,
}