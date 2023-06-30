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
     return new Date(value).toLocaleDateString('id', options)
    },
    tglawal() {
      let d = new Date();
      let m = d.getMonth();
      d.setMonth(d.getMonth() - 1);
      
      // If still in same month, set date to last day of 
      // previous month
      if (d.getMonth() == m) d.setDate(0);
      d.setHours(0, 0, 0, 0);
  
      //tl_awal
      return d.toJSON().slice(0, 10)
    },
    // NUMBER
    numb(value) {
        let val = (value / 1).toFixed(2).replace(',', ',')
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
    filterObject(target, keyname, search) {
      return target.filter(item => {
              return item.$refs(keyname).toLowerCase().includes(search.toLowerCase())
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
}