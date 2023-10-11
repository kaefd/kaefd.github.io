// plugin
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

export default {
    // DATE
    day() {
        let currentDate = new Date().toJSON().slice(0, 10);
        return currentDate
    },
    formatDate(value){
        let options = {
          day: '2-digit',
          year: 'numeric',
          month: 'long'
        }
        // let getHour = new Date(value).toLocaleTimeString('id', {timeStyle:'short'})
        let date = new Date(value).toLocaleDateString('id', options)
        if(value != '') {
          return date
        } else return ''
    },
    formatDateTime(value){
      let options = {
        day: '2-digit',
        year: 'numeric',
        month: 'long'
      }
      let getHour = new Date(value).toLocaleTimeString('id', {timeStyle:'short'})
      let date = new Date(value).toLocaleDateString('id', options)
      if(value != '') {
        return date + ' ' + getHour
      } else return ''
    },
    tglawal() {
      // set a month
      let d = new Date();
      // let m = d.getMonth();
      // d.setMonth(d.getMonth() - 1);
      
      // if (d.getMonth() == m) d.setDate(0)

      // set a week
      d.setDate(d.getDate() - 7)

      //tl_awal
      return d.toJSON().slice(0, 10)
    },
    last_month() {
      // set a month
      let d = new Date();
      let m = d.getMonth();
      d.setMonth(d.getMonth() - 1);
      
      if (d.getMonth() == m) d.setDate(0)

      // set a week
      // d.setDate(d.getDate() - 7)

      //tl_awal
      return d.toJSON().slice(0, 10)
    },
    getTime() {
      let getHour = new Date().toLocaleTimeString('id', {timeStyle:'short'})
      return getHour
    },
    // NUMBER
    numb(value, n, fixed) {
        if(fixed) {
          let val = (value / 1).toFixed(n).replace(',', ',')
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        } else return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    numb2(value) {
      let val = (value / 1).toFixed(0).replace(',', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    // PRINT || EXPORT DATA
    generatePDF(title, header, item) {
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "letter"
        });
        let heading = title
        let columns = header
        // text is placed using x, y coordinates
        doc.setFontSize(16).text(heading, 0.5, 1.0);
        doc.autoTable({
          columns,
          body: item,
          margin: { left: 0.5, top: 1.25 }
        })
        .save(`${title}.pdf`);
    },
    ExportToExcel(type, title, fn, dl ) {
        var elt = document.getElementById('tbl_exporttable_to_xls');
        // eslint-disable-next-line no-undef
        var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
        return dl ?
          // eslint-disable-next-line no-undef
          XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
          // eslint-disable-next-line no-undef
          XLSX.writeFile(wb, fn || (title+'.' + (type)));
    },
    print(key, title, header, item){
        if (key == 'xlsx') {
          return this.ExportToExcel('xlsx', title)
        } else if(key == 'pdf') {
          return this.generatePDF(title, header, item)
        }
    },
    // FILTER
    filterObject(target, search) {
      return target.filter(item => {
              let a = item.nama.toLowerCase().includes(search.toLowerCase())
              let c = item.kode_barang != null ? item.kode_barang.toLowerCase().includes(search.toLowerCase()) : ''
              let d = item.kode_konversi != null ? item.kode_konversi.toLowerCase().includes(search.toLowerCase()) : ''
              let e = item.satuan_konversi != null ? item.satuan_konversi.toLowerCase().includes(search.toLowerCase()) : ''
              return a || c || d || e
          })
    },
    // DRAWER
    datafilter(select, filtered) {
      select = filtered
      if(!select) {
        return select = []
        } else if (select == []) {
          return select = []
        }
    },
    uppercase(v) {
      return v.toUpperCase()
    },
    // DATA
    removeDuplicate (data) {
      let uniqueChars = [];
      data.forEach((c) => {
          if (!uniqueChars.includes(c)) {
              uniqueChars.push(c);
          }
      })
      return uniqueChars
    },
    avg (data) {
      let sum = data.reduce((total, current) => {
          return total + current;
      }, 0)
      let avg = sum/data.length
      return this.numb(avg)
    }
  } 