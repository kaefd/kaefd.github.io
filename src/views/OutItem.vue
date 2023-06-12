<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import ScreenDialog from '../components/ScreenDialog.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import api from '../api';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { ref, onMounted } from 'vue';
import AppBar from '../components/AppBar.vue';

</script>

<script>


  export default {
    components: {
    ScreenDialog, VDataTable, AppBar
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
        headDetails:[
          {title: 'Kode Barang', key: 'kode_barang' },
          {title: 'Nama Barang', key: 'nama_barang' },
          {title: 'HS Code', key: 'hs_code' },
          {title: 'Jumlah', key: 'jumlah' },
          {title: 'Jumlah Terkirim', key: 'jumlah_terkirim' },
          {title: 'Satuan', key: 'satuan' },
          {title: 'Harga Jual', key: 'harga_jual' },
          {title: 'Total Terjual', key: 'total_terjual' },
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
      this.today()
      let currentDate = new Date().toJSON().slice(0, 10);
        return this.filtered.periode = [currentDate , currentDate]  
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
        return this.periode = [currentDate , currentDate]
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
        .catch((error) => {
          console.log(error);
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
        .catch((error) => {
          console.log(error);
        })
      },
      getGroupBarang() {
        const apiUrl = '/group_barang?'
        api.getData(apiUrl)
        .then(response => {
          this.groupbarang = response.data
        })
        .catch((error) => {
          console.log(error);
        })
      },
      getPelanggan() {
        const apiUrl = '/pelanggan'
        api.getData(apiUrl)
        .then(response => {
          this.pelanggan = response.data
        })
        .catch((error) => {
          console.log(error);
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
        //     console.log(error);
        //   })
      },
      namaPelanggan(value) {
        for (let i = 0; i < this.pelanggan.length; i++) {
          if ( this.pelanggan[i].kode_pelanggan == value ) {
              return this.pelanggan[i].nama
          }
          
        }

      },
      penjualan(value) {
        for (let j = 0; j < this.penjualan_detail.length; j++) {
          if ( this.penjualan_detail[j].no_penjualan == value ) {
              return this.penjualan_detail[j]
          }
          
        }


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
      print(i){
          if (i == 0) {
            return this.ExportToExcel('xlsx')
          } else if(i == 1) {
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
        body: this.items,
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
        this.periode = this.today()
        this.filtered.periode = this.today()
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
  <v-navigation-drawer
        class="border-0 me-4 elevation-0"
        v-model="filter"
        location="left"
        width="320"
      >
      <v-sheet class="rounded-xl py-5 bg-white">
        <div class="d-flex align-center">
          <v-span class="text-button ms-4">Filter</v-span>
          <v-btn size="small" icon="mdi-close" @click="filter = false" variant="text" class="me-3 ms-auto">
          </v-btn>
        </div>
        <!-- PERIODE -->
        <v-container class="mb-n7">
          <v-span class="text-caption text-weight-bold">Periode</v-span>
          <v-divider></v-divider>
          <v-text-field v-model="filtered.periode[0]" class="mt-4" label="Tgl Awal" type="date" density="compact" variant="outlined"></v-text-field>
          <v-text-field v-model="filtered.periode[1]" label="Tgl Akhir" type="date" density="compact" variant="outlined"></v-text-field>
        </v-container>
        <!-- TIPE DOKUMEN -->
        <v-container>
          <v-span class="text-caption text-weight-bold">Tipe Dokumen</v-span>
          <v-divider></v-divider>
          <v-div class="d-flex">
          <v-checkbox
              v-for="label, i in tipedokumen" :key="i"
              v-model="filtered.selectdokumen"
              :label="label"
              :value="label"
              color="orange-lighten-1"
              class="mb-n6"
              hide-details
            ></v-checkbox>
          </v-div>
          </v-container>
          <v-container>
            <v-span class="text-caption text-weight-bold">Status</v-span>
          <v-divider></v-divider>
          <v-div class="d-flex">
          <v-checkbox
              v-for="label, i in status" :key="i"
              v-model="filtered.status"
              :label="label.title"
              :value="label.key"
              color="orange-lighten-1"
              class="mb-n6"
              hide-details
            ></v-checkbox>
          </v-div>
            <v-div class="d-flex justify-end mt-12 pt-12">
              <v-btn class="elevation-0 text-small me-2 bg-grey-lighten-2" height="42" @click="reset()">Reset</v-btn>
              <v-btn class="elevation-0 text-small" color="orange-lighten-1" height="42" @click="filterdata()">Filter</v-btn>
            </v-div>
        </v-container>
      </v-sheet>
  </v-navigation-drawer>
  <v-container>
    <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
    <v-row no-gutters class="rounded-t-xl align-start mt-n4 mb-2">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
        <div class="d-flex align-center w-100">
          <!-- BUTTON FILTER -->
          <v-btn @click="filter = !filter " class="rounded-circle text-caption elevation-0 bg-grey-lighten-4 text-indigo me-2" icon="mdi-tune-vertical" size="small">
          </v-btn>
          <!-- TAMBAH DATA -->
          <ScreenDialog
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
          <!-- TIPE DOKUMEN -->
          <!-- <div class="w-50">
            <v-label class="text-body-2 text-wrap2 text-blue-darken-4">Tipe Dokumen</v-label>
            <v-select
              :items="tipedokumen"
              v-model="selectdokumen"
              density="compact"
              variant="tonal"
              class="bg-indigo-lighten-5  text-blue-darken-4 rounded-lg me-2"
              single-line
              hide-details
            ></v-select>
          </div> -->
          <!-- PERIODE -->
          <!-- <div class="w-100">
            <v-label v-label class="text-body-2 text-blue-darken-4">Periode</v-label>
            <VueDatePicker v-model="periode" range :clearable="false" :enable-time-picker="false" hide-offset-dates max-range="30" :max-date="new Date()"  @update:model-value="selected()" input-class-name="dp-custom-input"/>
          </div> -->
        </div>
          <!-- <v-chip class="mt-1 me-1" color="orange" size="small">{{ periode[0] }} - {{ periode[1] }}</v-chip>
          <v-chip v-if="selectdokumen" class="mt-1" color="orange" size="small">{{ selectdokumen }}</v-chip> -->
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" width="200" max-width="450">
        <div class="d-flex align-center justify-sm-end justify-start mt-md-1 mt-0">
          
          <!-- status  -->
          <!-- <v-div class="w-50">
            <v-label class="text-body-2 text-blue-darken-4">Status</v-label>
            <v-select
              :items="status"
              item-title="title"
              item-value="key"
              v-model="checkStatus"
              density="compact"
              variant="tonal"
              class="text-blue-darken-4 bg-indigo-lighten-5 rounded-lg me-2"
              single-line
              hide-details
            ></v-select>
          </v-div> -->
          <!-- SEARCH -->
            <v-text-field
              v-model="search"
              density="compact"
              variant="text"
              class="w-75 text-indigo-darken-4 rounded-xl border me-2 text-body-2 font-small"
              prepend-inner-icon="mdi-magnify"
              placeholder="Search"
              single-line
              hide-details
            >
            </v-text-field>
            <!-- EXPORT BUTTON -->
            <v-btn
              id="cetak"
              color="indigo"
              icon="mdi-dots-vertical"
              class="rounded-xl mx-2 elevation-0 bg-grey-lighten-4 text-indigo"
              size="small"
            ></v-btn>
            <v-menu activator="#cetak" transition="slide-y-transition">
              <v-list>
                <v-list-item
                  v-for="(c, index) in cetak"
                  :key="index"
                  :value="index"
                  @click="print(index)"
                  density="compact"
                  class="text-caption"
                  :prepend-icon="c.icon"
                >
                {{ c.title }}
                </v-list-item>
              </v-list>
            </v-menu>
        </div>
      </v-responsive>
      </v-row>
        <!-- EDIT DATA -->
        <v-sheet class="rounded-b-xl">
        <v-data-table
            id="tbl_exporttable_to_xls" 
            items-per-page="10"
            :headers="headers"
            :items="checkstatus()"
            :search="search"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption py-3 rounded-b-xl"
            height="63vh"
            >
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
              <ScreenDialog batalbtn="Pengeluaran" :namaPelanggan="namaPelanggan(item.raw.kode_pelanggan)" :pembelian="penjualan(item.raw.no_penjualan)" :edit="true" :pengeluaran="true" :pageTitle="pageTitle" :headDetails="headDetails" :items="item.raw" :details="details" :headers="headers" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[3].text" :btncolor="actIcon[3].color" :icon="actIcon[3].icon" :iVariant="actIcon[3].variant" :alpha="alpha" :actIcon="actIcon" :disable="true"/>
            </template>
          </v-data-table>
        </v-sheet>
  </v-container>

</template>
