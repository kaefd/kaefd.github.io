<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import PengeluaranDetail from './PengeluaranDetail.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import api from '../api';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { ref, onMounted } from 'vue';
import AppBar from '../components/AppBar.vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import circleButton from '../components/button/circleButton.vue';
import textField from '../components/form/textField.vue';
import menuList from '../components/menu/menuList.vue';
import checkBox from '../components/form/checkBox.vue';

</script>

<script>


  export default {
    components: {
      PengeluaranDetail,
      VDataTable,
      AppBar,
      filterDrawer,
      circleButton,
      textField,
      menuList,
      checkBox,
    },
    props:['cetak','actIcon'],
    data () {
      return {
        filter: false,
        drawer: null,
        search: '',
        periode: '',
        checkStatus: [],
        pelanggan: '',
        dialog2: false,
        confirmdialog: false,
        pageTitle: 'PENGELUARAN BARANG',
        selectdokumen: [],
        btnTitle: 'Tambah Data',
        btn: 'Tambah Barang',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        filtered: {
          selectdokumen: [],
          periode: [],
          status: []
        },
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
        penjualan_head: '',
        penjualan_detail: '',
        head: '',
        detail: '',
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
        groupbarang: '',
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
    created() {
      this.periode = [this.tglawal(), this.today()]
      this.filtered.periode = [this.tglawal(), this.today()] 
    },
    computed: {
      pilihtipe() {
        if (this.selectdokumen.length === 0) {
            return this.penjualan_head;
          } else {
            return this.penjualan_head.filter(item => this.selectdokumen.includes(item.tipe_dokumen));
          }
      },
      tglinput() {
        let currentDate = new Date().toJSON().slice(0, 10);
        return currentDate
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
      close(v) {
        return this.filter = v
      },
      getPenjualanHead() {
        
        const apiUrl = '/penjualan_head?'
        const params = {
        tgl_awal: this.periode[0],
        tgl_akhir: this.periode[1],  
        
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.penjualan_head = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getPenjualanDetail() {
        
        const apiUrl = '/penjualan_detail?'
        const params = {
        tgl_awal: this.periode[0],
        tgl_akhir: this.periode[1],  
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.penjualan_detail = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getGroupBarang() {
        const apiUrl = '/group_barang?'
        api.getData(apiUrl)
        .then(response => {
          this.groupbarang = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getPelanggan() {
        const apiUrl = '/pelanggan'
        api.getData(apiUrl)
        .then(response => {
          this.pelanggan = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      // POST PENJUALAN
      inputhead(value, detail) {
        let head = {
          no_penjualan: value.no_penjualan,
          tgl_penjualan: value.tgl_penjualan,
          tipe_dokumen: value.tipe_dokumen,
          no_dokumen: value.no_dokumen,
          tgl_dokumen: value.tgl_dokumen,
          kode_pelanggan: value.kode_pelanggan,
          kode_group: value.kode_group,
          total_penjualan: detail[0].total_terjual,
          tgl_input: this.tglinput,
          user_input: 'admin',
          tgl_batal: value.tgl_batal,
          user_batal: value.user_batal,
          status: 'open'
        }
        // const apiUrl = '/penjualan_head?'
        const value1 = JSON.stringify(head);
        const value2 = JSON.stringify(detail);
        console.log({
          penjualan_head : value1,
          penjualan_detail : value2,
        });
        // api.postData( apiUrl, {
        //   produksi_head : value1,
        //   produksi_detail_bahan : value2,
        //   produksi_detail_barang : value3
        // })
        // .then(() => {
        //     window.location.href = '/production' 
        //   })
        //   .catch((error) => {
        //     return this.$router.push('login');
        //   })
      },
      del() {
        let penjualan_head = {
          no_penjualan: this.head.no_penjualan,
          tgl_penjualan: this.head.tgl_penjualan,
          tipe_dokumen: this.head.tipe_dokumen,
          no_dokumen: this.head.no_dokumen,
          tgl_dokumen: this.head.tgl_dokumen,
          kode_pelanggan: this.head.kode_pelanggan,
          kode_group: this.head.kode_group,
          total_penjualan: this.head.total_penjualan,
          tgl_input: this.head.tgl_input,
          user_input: this.head.user_input,
          tgl_batal: this.head.tgl_batal,
          user_batal: '',
          status: false
      }
      const ph = JSON.stringify(penjualan_head);
      const pd = JSON.stringify(this.detail);
        console.log({
          penjualan_head: ph,
          penjualan_detail: pd,
        });
        // api.deleteData('/pembelian_head', {
        //   pembelian_head : ph,
        //   pembelian_detail : pd,
        // })
        // .then(() => {
        //   window.location.href = '/in'
        // })
        // .catch((error) => {
        //   return this.$router.push('login');
        // })
      },
      confirm(head, detail){
        this.confirmdialog = true
        this.head = head
        this.detail = detail
      },
      namaPelanggan(value) {
        for (let i = 0; i < this.pelanggan.length; i++) {
          if ( this.pelanggan[i].kode_pelanggan == value ) {
              return this.pelanggan[i].nama
          }
          
        }

      },
      penjualan(value) {
        let p = []
        for (let j = 0; j < this.penjualan_detail.length; j++) {
          if ( this.penjualan_detail[j].no_penjualan == value ) {
              p.push(this.penjualan_detail[j])
          }
        }
        return p
      },
      selected(){        
        this.getPenjualanHead(),
        this.getPenjualanDetail(),
        this.getPelanggan()
      },
      numb(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
      statuspenjualan() {
        for (let i = 1; i < this.status.length; i++) {
         if(this.checkStatus == this.status[i].title)
            this.checkStatus = this.status[i].key
        }
      },
      checkstatus() {
        var data = this.pilihtipe
        if (this.checkStatus.length === 0) {
            return data;
          } else {
            return data.filter(item => this.checkStatus.includes(item.status));
          }
      },
      printdata() {
        let a = []
        for (let i = 0; i < this.penjualan_head.length; i++) {
          a.push({
            no_penjualan: this.penjualan_head[i].no_penjualan,
            tgl_penjualan: this.penjualan_head[i].tgl_penjualan,
            tipe_dokumen: this.penjualan_head[i].tipe_dokumen,
            no_dokumen: this.penjualan_head[i].no_dokumen,
            kode_pelanggan: this.penjualan_head[i].kode_pelanggan,
            kode_group: this.penjualan_head[i].kode_group,
            total_penjualan: this.numb(this.penjualan_head[i].total_penjualan),
          })
        }
        return a
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
      page(){
        return this.$emit('page', this.pageTitle)
      },
      reset() {
        this.periode = [this.tglawal(), this.today()]
        this.filtered.periode = [this.tglawal(), this.today()]
        this.filtered.selectdokumen = []
        this.filtered.status = []
        this.today()
        this.selectdokumen = []
        this.checkStatus = []
        this.selected()
        
      },
      filterdata() {
        this.periode[0] = this.filtered.periode[0]
        this.periode[1] = this.filtered.periode[1]
        this.checkStatus = this.filtered.status
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
        this.page()
        this.selected()
        this.getPenjualanHead()
        this.getPenjualanDetail()
        this.getPelanggan()
        this.penjualan()
        this.getGroupBarang()
        this.pilihtipe
    }
  }

  const date = ref();

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
      <!-- PERIODE -->
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-label class="text-small mt-4">Tgl Awal</v-label>
      <VueDatePicker class="text-small" :clearable="false" v-model="filtered.periode[0]" :format-locale="id" locale="id" cancelText="batal" selectText="pilih" format="PP" />
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <VueDatePicker class="text-small mb-4" :clearable="false" v-model="filtered.periode[1]" :format-locale="id" locale="id" cancelText="batal" selectText="pilih" format="PP" />
      <!-- TIPE DOKUMEN -->
      <v-span class="text-caption text-weight-bold">Tipe Dokumen</v-span>
      <v-divider class="mb-6"></v-divider>
        <checkBox
          v-for="label, i in tipedokumen" :key="i"
          v-model="filtered.selectdokumen"
          :label="label"
          :value="label"
        />
      <!-- STATUS -->
      <v-span class="text-caption text-weight-bold">Status</v-span>
      <v-divider class="mb-6"></v-divider>
      <checkBox
        v-for="label, i in status" :key="i"
        v-model="filtered.status"
        :label="label.title"
        :value="label.key"
        />
    </template>
  </filterDrawer>
  <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="rounded-t-xl align-start mt-n4 mb-2">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
        <div class="d-flex align-center w-100">
          <!-- BUTTON FILTER -->
          <circleButton icon="mdi-tune-vertical" @click="filter = !filter" />
          <!-- TAMBAH DATA -->
          <PengeluaranDetail
            batalbtn="Pengeluaran"
            :datainput="datainput"
            :pengeluaran="true"
            :groupbarang="groupbarang"
            :supplier="pelanggan"
            :datatext="datatext"
            :pageTitle="pageTitle"
            :btn="btn"
            :headDetails="headDetails"
            :details="details"
            :headers="headers"
            :items="checkstatus()"
            :search="search"
            :category="category"
            :selectCategory="selectCategory"
            :iTitle="actIcon[0].text"
            :btncolor="actIcon[0].color"
            :icon="actIcon[0].icon"
            :iVariant="actIcon[0].variant"
            :alpha="alpha"
            :actIcon="actIcon"
            @inputhead="inputhead"
          />
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
            id="tbl_exporttable_to_xls" 
            items-per-page="10"
            :headers="headers"
            :items="checkstatus()"
            :search="search"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption py-3 h-100"
            height="100%"
            >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.tgl_penjualan="{item}">
                {{ formatDate(item.raw.tgl_penjualan) }}
              </template>
            <!-- CUSTOM PAGINATION STYLE -->
            <!-- <template v-slot:bottom> -->
                <!-- <v-row no-gutters class="justify-end align-center my-1">
                  <v-pagination
                    v-model="page"
                    :length="4"
                    size="small"
                    rounded="circle"
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
                  ></v-pagination>
                  <v-spacer></v-spacer>
                  <span>Total: 1978 data</span>
                </v-row> -->
              <!-- </template> -->
            <!-- dialog actions -->
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.total_penjualan="{ item }">
              <td>{{ numb(item.raw.total_penjualan) }}</td>
            </template>
             <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.actions="{item}">
              <PengeluaranDetail @confirm="confirm" batalbtn="Pengeluaran" :namaPelanggan="namaPelanggan(item.raw.kode_pelanggan)" :penjualan="penjualan(item.raw.no_penjualan)" :edit="true" :pengeluaran="true" :pageTitle="pageTitle" :headDetails="headDetails" :items="item.raw" :details="details" :headers="headers" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[3].text" :btncolor="actIcon[3].color" :icon="actIcon[3].icon" :iVariant="actIcon[3].variant" :alpha="alpha" :actIcon="actIcon" :disable="true"/>
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
                       @click=" confirmdialog = false"
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
