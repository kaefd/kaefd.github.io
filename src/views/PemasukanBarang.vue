<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import PemasukanDetail from './PemasukanDetail.vue';
import AppBar from '../components/AppBar.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import api from '../api';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { ref, onMounted } from 'vue';
import { id } from 'date-fns/locale';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import circleButton from '../components/button/circleButton.vue';
import textField from '../components/form/textField.vue';
import menuList from '../components/menu/menuList.vue';
</script>

<script>
export default {
    components: {
      PemasukanDetail,
      VDataTable,
      AppBar,
      filterDrawer,
      circleButton,
      textField,
      menuList,
    },
    props:['actIcon', 'cetak'],
    data () {
      return {
        drawer: null,
        search: '',
        periode: [],
        filter: false,
        dialog2: false,
        confirmdialog: false,
        pageTitle: 'PEMASUKAN BARANG',
        btn: 'Tambah Barang',
        selectdokumen: [],
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        pemasukan_item: '',
        pembelian_head: '',
        pdetail: '',
        // pilihtipe: 'BC40',
        tipedokumen: [
          'BC23',
          'BC40',
          'PPKEK-LDP',
          'PPKEK-TLDDP',
        ],
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
        items: '',
        supplier: '',
        pembeliandetl: '',
        filtered: {
          selectdokumen: [],
          periode: []
        },
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
        details: [],
        datainput: {
          no_pembelian: '',
          tgl_pembelian: '',
          tgl_input: this.today(),
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
    created() {
       this.periode = [this.tglawal(), this.today()]
       this.filtered.periode = [this.tglawal(), this.today()]
    },
    computed: {
      datatable() {
        let a = []
        
        for (let i = 0; i < this.items.length; i++) {
          for (let k = 0; k < this.supplier.length; k++) {
            if(this.items[i].kode_supplier == this.supplier[k].kode_supplier) {
              a.push({
                no_pembelian: this.items[i].no_pembelian,
                tgl_pembelian: this.items[i].tgl_pembelian,
                tipe_dokumen: this.items[i].tipe_dokumen,
                no_dokumen: this.items[i].no_dokumen,
                tgl_dokumen: this.formatDate(this.items[i].tgl_dokumen),
                kode_supplier: this.supplier[k].nama,
                mata_uang: this.items[i].mata_uang,
                total_nilai: this.numb(this.items[i].total_nilai),
                rp: this.numb(this.items[i].total_nilai * this.items[i].kurs),
                no_invoice: this.items[i].no_invoice,
                no_bl: this.items[i].no_bl,
                kurs: this.items[i].kurs,
                user_input: this.items[i].user_input,
                user_batal: this.items[i].user_batal,
                tgl_input: this.items[i].tgl_input,
                tgl_batal: this.items[i].tgl_batal,
                status: this.items[i].status,
              })
            }
          }
        }
        return a
      }
    },
    methods: {
      today() {
        let currentDate = new Date().toJSON().slice(0, 10);
        return currentDate
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
      formatDate(value){
        let options = {
          day: '2-digit',
          year: 'numeric',
          month: 'long'
        }
         return new Date(value).toLocaleDateString('id', options)
      },
      page(){
        return this.$emit('page', this.pageTitle)
      },
      // GET DATA PEMBELIAN-HEAD
      getPembelian() {
        const apiUrl = '/pembelian_head?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, { params })
        .then(response => {
          this.items = response.data
        })
        .catch(() => {
          return this.$router.push({ path: '/login' })
        })
      },
      // TAMBAH DATA
      inputhead(value, valuedetail) {
        // const apiUrl = '/pembelian_head?'
        const value1 = JSON.stringify(value);
        const value2 = JSON.stringify(valuedetail);
        console.log({
          pembelian_head: value1,
          pembelian_detail: value2
        });
        // api.postData( apiUrl, {
        //   pembelian_head : value1,
        //   pembelian_detail : value2
        // })
        // .then(() => {
        //     window.location.href = '/in' 
        //   })
        //   .catch(() => {
        //     console.log();
        //   })
      },
      // HAPUS DATA
      del() {
      let head = ''
      let detail = ''
      head = {
          no_pembelian: this.pembelian_head.no_pembelian,
          tgl_pembelian: this.pembelian_head.tgl_pembelian,
          kode_supplier: this.pembelian_head.kode_supplier,
          tipe_dokumen: this.pembelian_head.tipe_dokumen,
          no_dokumen: this.pembelian_head.no_dokumen,
          tgl_dokumen: this.pembelian_head.tgl_dokumen,
          no_invoice: this.pembelian_head.no_invoice,
          no_bl: this.pembelian_head.no_bl,
          mata_uang: this.pembelian_head.mata_uang,
          kurs: this.pembelian_head.kurs,
          user_input: 'admin',
          user_batal: 'admin',
          status: 'false'
      }
      detail = [{
            no_pembelian: this.pdetail.no_pembelian,
            kode_barang: this.pdetail.kode_barang,
            nama_barang: this.pdetail.nama_barang,
            hs_code: this.pdetail.hs_code,
            jumlah: this.pdetail.jumlah,
            jumlah_diterima: this.pdetail.jumlah_diterima,
            satuan: this.pdetail.satuan,
            nilai: this.pdetail.nilai,
            no_urut:this.pdetail.no_urut,
      }]
      const ph = JSON.stringify(head);
      const pd = JSON.stringify(detail);
        console.log({
          pembelian_head: ph,
          pembelian_detail: pd,
        });
        // api.deleteData('/pembelian_head', {
        //   pembelian_head : ph,
        //   pembelian_detail : pd,
        // })
        // .then(() => {
        //   window.location.href = '/in'
        // })
        // .catch(() => {
        //   console.log();
        // })
      },
      confirm(head, detail){
        this.confirmdialog = true
        this.pembelian_head = head
        this.pdetail = detail
      },
      // inisialisasi
      selected(){ 
        return this.getPembelian(), this.getPembelianDetail()
      },
      // SELECT TIPE DOKUMEN
      pilihtipe() {
        if (this.selectdokumen.length === 0) {
            return this.datatable;
          } else {
            return this.datatable.filter(item => this.selectdokumen.includes(item.tipe_dokumen));
          }
      },
      // API GET DATA SUPPLIER
      // ambil semua data supplier
      getSupplier() {
        const apiUrl = '/supplier'
        api.getData(apiUrl)
        .then(response => {
          this.supplier = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      // GET DATA PEMBELIAN-DETAIL
      getPembelianDetail() {
        const apiUrl = '/pembelian_detail?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, { params })
        .then(response => {
          return this.pembeliandetl = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      // GET DATA PEMBELIAN-DETAIL
      pembelian(value) {
        let p = []
        for (let j = 0; j < this.pembeliandetl.length; j++) {
          if ( this.pembeliandetl[j].no_pembelian == value ) {
              p.push(this.pembeliandetl[j])
          }
        }
        return p
      },
      close(v) {
      return this.filter = v
      },
      print(key){
        if (key == 'xlsx') {
          return this.ExportToExcel('xlsx')
        } else if(key == 'pdf') {
          return this.generatePDF()
        }
      },
      generatePDF() {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter"
      });
      var heading = this.pageTitle
      var columns = this.headers
      // text is placed using x, y coordinates
      doc.setFontSize(16).text(heading, 0.5, 1.0);
      doc.autoTable({
        columns,
        body: this.printdata(),
        margin: { left: 0.5, top: 1.25 }
      })
      .save(`${this.pageTitle}.pdf`);
      },
      // FUNCTION EXPORT TO EXCEL
      ExportToExcel(type, fn, dl) {
       var elt = document.getElementById('tbl_exporttable_to_xls');
       // eslint-disable-next-line no-undef
       var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
       return dl ?
         // eslint-disable-next-line no-undef
         XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
         // eslint-disable-next-line no-undef
         XLSX.writeFile(wb, fn || (this.pageTitle+'.' + (type || 'xlsx')));
      },
      dataTable(value, params) {
        if(params == 'nama') {
          for (let i = 0; i < this.supplier.length; i++) {
            if(this.supplier[i].kode_supplier == value) {
              return this.supplier[i].nama
            }
          }
        }
        else if(params == 'pembelian') {
          let p = []
          for (let j = 0; j < this.pembeliandetl.length; j++) {
            if ( this.pembeliandetl[j].no_pembelian == value ) {
                p.push(this.pembeliandetl[j])
            }
          }
          return p
        }
        else if(params == 'total') {
          return this.numb(value)
        }
        else if(params == 'rp') {
          let kurs = value.kurs
          let nilai = value.total_nilai
          return this.numb(kurs * nilai)
        }
      },
      printdata(){
        let a = []
        for (let i = 0; i < this.items.length; i++) {
          a.push({
            no_pembelian: this.items[i].no_pembelian,
            tgl_pembelian: this.items[i].tgl_pembelian,
            tipe_dokumen: this.items[i].tipe_dokumen,
            no_dokumen: this.items[i].no_dokumen,
            kode_supplier: this.dataTable(this.items[i].kode_supplier, 'nama'),
            kode_group: this.items[i].kode_group,
            kurs: this.items[i].kurs,
            total_nilai: this.dataTable(this.items[i].total_nilai, 'total'),
            rp: this.dataTable(this.items[i], 'rp'),
          })
        }
        return a
      },
      numb(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      totalnilai(data){
          let kurs = data.kurs
          let nilai = data.total_nilai
          return kurs * nilai
      },
      reset() {
        this.periode = [this.tglawal(), this.today()]
        this.filtered.periode = [this.tglawal(), this.today()]
        this.filtered.selectdokumen = []
        this.selectdokumen = []
        this.selected()
      },
      filterdata() {
        this.periode[0] = this.filtered.periode[0]
        this.periode[1] = this.filtered.periode[1]
        this.selected()
        this.selectdokumen = this.filtered.selectdokumen
        if(!this.selectdokumen) {
          this.selectdokumen = []
          } else if (this.selectdokumen == []) {
            this.selectdokumen = []
          }

      }
    },
    mounted() {
      this.selected()
      this.page()
      this.getPembelian()
      this.getSupplier()
      this.getPembelianDetail()
      this.pembelian()
      this.pembeliandetl
    }
  }


    const date = ref()

    // For demo purposes assign range from the current date
    onMounted(() => {
      const startDate = new Date();
      // const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      date.value = [startDate, startDate];
    })

</script>

<template>
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-label class="text-small mt-4">Tgl Awal</v-label>
      <VueDatePicker class="text-small" :clearable="false" v-model="filtered.periode[0]" :format-locale="id" locale="id" cancelText="batal" selectText="pilih" format="PP" />
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <VueDatePicker class="text-small mb-4" :clearable="false" v-model="filtered.periode[1]" :format-locale="id" locale="id" cancelText="batal" selectText="pilih" format="PP" />
      <!-- TIPE DOKUMEN -->
      <v-span class="text-caption text-weight-bold">Tipe Dokumen</v-span>
      <v-divider></v-divider>
        <v-checkbox
          v-for="label, i in tipedokumen" :key="i"
          v-model="filtered.selectdokumen"
          :label="label"
          :value="label"
          color="orange-lighten-1"
          class="mb-n6"
          hide-details
        ></v-checkbox>
    </template>
  </filterDrawer>
  <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="rounded-t-xl align-center mt-n4 mb-2">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
          <div class="d-flex align-center w-100">
            <!-- BUTTON FILTER -->
            <circleButton icon="mdi-tune-vertical" @click="filter = !filter" />
            <!-- ADD DATA -->
            <PemasukanDetail batalbtn="Pemasukan" :datainput="datainput" @inputhead="inputhead" :pemasukan="true" :supplier="supplier" :edit="false" :itemDetail="itemDetail" :datatext="datatext" :btn="btn" :headDetails="headDetails" :details="details" :headers="headers" :items="pilihtipe()" :pembeliandetl="pembeliandetl" :search="search" :category="tipedokumen" :selectCategory="selectCategory" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon" :pageTitle="pageTitle"/>
          </div>
          <!-- <v-chip class="mt-1 me-1" color="orange" size="small">{{ periode[0] }} - {{ periode[1] }}</v-chip>
          <v-chip v-if="selectdokumen" class="mt-1" color="orange" size="small">{{ selectdokumen }}</v-chip> -->
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" width="200" max-width="450">
        <div class="d-flex align-center justify-sm-end justify-start mt-md-1 mt-0">
          <!-- SEARCH -->
          <textField  v-model="search" placeholder="Search" icon="mdi-magnify" class="me-2"/>
          <!-- EXPORT DATA -->
          <menuList
            icon="mdi-dots-vertical"
            :items="cetak"
            @result="print"
          />
        </div>
      </v-responsive>
      </v-row>
        <!-- EDIT DATA -->
        <v-sheet height="90%">
          <v-data-table
            items-per-page="10"
            :headers="headers"
            :items="pilihtipe()"
            :search="search"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption py-3 h-100"
            height="100%"
              >
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.tgl_pembelian="{item}">
                {{ formatDate(item.raw.tgl_pembelian) }}
              </template>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.actions="{item}">
                <PemasukanDetail
                batalbtn="Pemasukan"
                @confirm="confirm"
                :namaSupplier="dataTable(item.raw.kode_supplier, 'nama')"
                :pembelian="dataTable(item.raw.no_pembelian, 'pembelian')"
                :edit="true"
                :itemDetail="itemDetail"
                :datatext="datatext"
                :btn="btn"
                :headDetails="headDetails"
                :details="[details]"
                :headers="headers"
                :items="item.raw"
                :search="search"
                :category="tipedokumen"
                :selectCategory="selectCategory"
                :iTitle="actIcon[3].text"
                :btncolor="actIcon[3].color"
                :icon="actIcon[3].icon"
                :iVariant="actIcon[3].variant"
                :actIcon="actIcon"
                :pageTitle="pageTitle"/>
              </template>
            </v-data-table>
        </v-sheet>
        <v-dialog v-model="confirmdialog" transition="dialog-bottom-transition" width="400">
            <v-card class="rounded-xl">
                <v-card-title class="text-center my-7">Apakah Anda Yakin ?</v-card-title>
                <v-row no-gutters>
                    <v-col>
                        <v-btn
                        color="orange-darken-1"
                        variant="tonal"
                        height="57"
                        class="w-100 rounded-0"
                        @click="confirmdialog = false"
                        >
                        Tidak
                        </v-btn>                  
                    </v-col>
                    <v-col>
                        <v-btn
                        type="submit"
                        color="blue-darken-1"
                        variant="tonal"
                        height="57"
                        class="w-100 rounded-0"
                        @click="del(), confirmdialog = false"
                        >
                        Ya
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
  </v-container>
</template>

<style lang="scss">
.v-data-table-header__content {
  text-align: center;
}

// .dp__active_date{
//   background: #000 !important;
// }
.text-small {
  font-size: 8pt;
}
.label-sm  {
  width: 100px !important;
  height: 35px;
  text-align: center;
}
.h-500 {
  height: 525px !important;
}
</style>