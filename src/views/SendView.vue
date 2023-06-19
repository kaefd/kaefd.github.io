<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import PengirimanDetail from './PengirimanDetail.vue';
import SuratJalan from './SuratJalan.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { ref, onMounted } from 'vue';
import api from '../api';
import AppBar from '../components/AppBar.vue';
</script>

<script>

  export default {
    components: {
    SuratJalan, PengirimanDetail, VDataTable, AppBar
    },
    props:['actIcon', 'cetak'],
    data () {
      return {
        drawer: null,
        search: '',
        tgl:'',
        filter: false,
        periode: [],
        checkStatus: 'menunggu',
        dialog2: false,
        pageTitle: 'PENGIRIMAN BARANG',
        selectCategory: '',
        btnTitle: 'Tambah Data',
        btn: 'Tambah Barang',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        category: [
          'Bahan Baku',
          'Bahan Penolong',
          'Barang Setengah Jadi',
          'Barang Jadi',
          'Barang Sisa (Scrap)',
          'Mesin & Peralatan',
        ],
        headers: [
          { title: 'No Pengiriman', key: 'no_pengiriman'},
          { title: 'Tgl Pengiriman', key: 'tgl_pengiriman' },
          { title: 'Pelanggan', key: 'kode_pelanggan' },
          { title: 'Tujuan Bongkar', key: 'kode_alamat_bongkar' },
          { title: 'Supir', key: 'supir' },
          { title: 'Polisi', key: 'no_polisi' },
          { title: '', key: 'actions', sortable: false},
        ],
        filtered: {
          periode: []
        },
        pengirimanHead: '',
        penjualanHead: '',
        kirim_detail: '',
        pelanggan: '',
        alamatBongkar: '',
        headDetails:[
          {title: 'No Penjualan', key: 'no_penjualan' },
          {title: 'Tipe Dokumen', key: 'tipe_dokumen' },
          {title: 'No Dokumen', key: 'no_dokumen' },
          {title: 'Kode Group', key: 'kode_group' },
          {title: 'Kode Barang', key: 'kode_barang' },
          {title: 'Nama Barang', key: 'nama_barang' },
          {title: 'HS Code', key: 'hs_code' },
          {title: 'Jumlah', key: 'jumlah' },
          {title: 'Satuan', key: 'satuan' },
          {title: '', key: 'actions', sortable: false },
        ],
        datainput: {
          no_pengiriman: '',
          tgl_pengiriman: '',
          kode_pelanggan: '',
          kode_alamat_bongkar: '',
          supir: '',
          no_polisi: '',
          user_input: '',
          tgl_input: '',
          tgl_batal:'',
          user_batal: '',
          status: ''
        },
        nokirim: '0',
        detailkirim: '',
        no: '',
        tipe: ''

      }
    },
    created() {
      this.nokirim
      this.periode = [this.tglawal(), this.today()]
      this.filtered.periode = [this.tglawal(), this.today()]
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
      // GET DATA PENGIRIMAN-HEAD
      getPengirimanHead() {
        const apiUrl = '/pengiriman_head?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, { params })
        .then(response => {
          this.pengirimanHead = response.data
        })
        .catch((error) => {
          console.log(error);
        })
      },
      // GET PENGIRIMAN DETAIL
      getPengirimanDetail() {
        const apiUrl = '/pengiriman_detail?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, { params })
        .then(response => {
          this.kirim_detail = response.data
        })
        .catch((error) => {
          console.log(error);
        })
      },
      // PENJUALAN HEAD
      getPenjualanHead() {
        const apiUrl = '/penjualan_head?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, { params })
        .then(response => {
          this.penjualanHead = response.data
        })
        .catch((error) => {
          console.log(error);
        })
      },
      tujuanBongkar(){
        const apiUrl = '/alamat_bongkar'
        api.getData(apiUrl)
        .then(response => {
        this.alamatBongkar = response.data
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
      namaPelanggan(value) {
        for (let i = 0; i < this.pelanggan.length; i++) {
          if ( this.pelanggan[i].kode_pelanggan == value ) {
              return this.pelanggan[i].nama
          }
          
        }
      },
      alamatPelanggan(value) {
        for (let i = 0; i < this.pelanggan.length; i++) {
          if ( this.pelanggan[i].kode_pelanggan == value ) {
              return this.pelanggan[i].alamat
          }
          
        }
      },
      Penjualandetl(value) {
        for (let i = 0; i < this.kirim_detail.length; i++) {
          if ( this.kirim_detail[i].no_pengiriman == value ) {
              return this.kirim_detail[i]
          }
          
        }
      },
      pjl_detail(value) {
        for (let i = 0; i < this.pengirimanHead.length; i++) {
          for (let j = 0; j < this.penjualanHead.length; j++) {
            if ( this.pengirimanHead[i].no_pengiriman == value ) {
              if(this.penjualanHead[j].no_penjualan == this.pengirimanHead.no_penjualan) {
                return this.penjualanHead[j]
              } 
            }else 'salah'
          }
        }
      },
      namaTujuan(value){
        for (let i = 0; i < this.alamatBongkar.length; i++) {
          if ( this.alamatBongkar[i].kode_pelanggan == value ) {
              return this.alamatBongkar[i].nama
          }
          
        }
      },
      selected() {
        this.getPengirimanHead(), this.getPengirimanDetail(), this.getPenjualanHead()
      },
      printdata() {
        let a = []
        for (let i = 0; i < this.pengirimanHead.length; i++) {
          a.push({
            no_pengiriman: this.pengirimanHead[i].no_pengiriman,
            tgl_pengiriman: this.pengirimanHead[i].tgl_pengiriman,
            kode_pelanggan: this.namaPelanggan(this.pengirimanHead[i].kode_pelanggan),
            kode_alamat_bongkar: this.namaTujuan(this.pengirimanHead[i].kode_alamat_bongkar),
            supir: this.pengirimanHead[i].supir,
            no_polisi: this.pengirimanHead[i].no_polisi,
          })
        }
        return a
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
      reset() {
        this.periode = [this.tglawal(), this.today()]
        this.filtered.periode = [this.tglawal(), this.today()]
        this.selected()
        
      },
      filterdata() {
        this.periode[0] = this.filtered.periode[0]
        this.periode[1] = this.filtered.periode[1]
        this.selected()

      },
      print(i){
        if (i == 0) {
          return this.ExportToExcel('xlsx')
        } else if(i == 1) {
          return this.generatePDF()
        }
      },
      inputhead(head, detail) {
        let h = {
          no_pengiriman: head.no_pengiriman,
          tgl_pengiriman: head.tgl_pengiriman,
          kode_pelanggan: head.kode_pelanggan,
          kode_alamat_bongkar: head.kode_alamat_bongkar,
          supir: head.supir,
          no_polisi: head.no_polisi,
          user_input: 'admin',
          tgl_input: this.tgl,
          tgl_batal:head.tgl_batal,
          user_batal: head.user_batal,
          status: true
        }
        // const apiUrl = '/pembelian_head?'
        const value1 = JSON.stringify(h);
        const value2 = JSON.stringify(detail);
        console.log({
          pengiriman_head: value1,
          pengiriman_detail: value2
        });
        // api.postData( apiUrl, {
        //   pengiriman_head : value1,
        //   pengiriman_detail : value2
        // })
        // .then(() => {
        //     window.location.href = '/in' 
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
      },
      // HAPUS DATA
      del(head, valuedtl) {
      let pengiriman_head = {
          no_pengiriman: head.no_pengiriman,
          tgl_pengiriman: head.tgl_pengiriman,
          kode_pelanggan: head.kode_pelanggan,
          kode_alamat_bongkar: head.kode_alamat_bongkar,
          supir: head.supir,
          no_polisi: head.no_polisi,
          user_input: head.user_input,
          tgl_input: head.tgl_input,
          tgl_batal:head.tgl_batal,
          user_batal: 'admin',
          status: false
      }
      const ph = JSON.stringify(pengiriman_head);
      const pd = JSON.stringify(valuedtl);
        console.log({
          pengiriman_head: ph,
          pengiriman_detail: pd,
        });
        // api.deleteData('/pembelian_head', {
        //   pembelian_head : ph,
        //   pembelian_detail : pd,
        // })
        // .then(() => {
        //   window.location.href = '/in'
        // })
        // .catch((error) => {
        //   console.log(error);
        // })
      },

    },
    mounted(){
      this.page()
      this.getPengirimanHead()
      this.getPengirimanDetail()
      this.getPelanggan()
      this.getPenjualanHead()
      this.tujuanBongkar()
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
        <v-container class="pt-3 px-4">
          <v-span class="text-caption text-weight-bold">Periode</v-span>
          <v-divider></v-divider>
          <v-text-field v-model="filtered.periode[0]" class="mt-4" label="Tgl Awal" type="date" density="compact" variant="outlined"></v-text-field>
          <v-text-field v-model="filtered.periode[1]" label="Tgl Akhir" type="date" density="compact" variant="outlined"></v-text-field>
        </v-container>
        <!-- KATEGORI BARANG -->
        <v-container class="py-3 px-4">            
          <v-div class="d-flex justify-end">
            <v-btn class="elevation-0 text-small mt-5 me-2 bg-grey-lighten-2" height="42" @click="reset()">Reset</v-btn>
            <v-btn class="elevation-0 text-small mt-5" color="orange-lighten-1" height="42" @click="filterdata()">Filter</v-btn>
          </v-div>
        </v-container>
      </v-sheet>
  </v-navigation-drawer>
  <v-container>
    <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
    <v-row no-gutters class="rounded-t-xl align-start mt-n4 mb-2">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1" min-width="200">
        <div class="d-flex align-center w-100">
          <!-- BUTTON FILTER -->
          <v-btn @click="filter = !filter " class="rounded-circle text-caption elevation-0 bg-grey-lighten-4 text-indigo me-2" icon="mdi-tune-vertical" size="small">
          </v-btn>
          <!-- TAMBAH DATA -->
          <PengirimanDetail @inputhead="inputhead" :kirim="true" :edit="false" :supplier="pelanggan" :datainput="datainput" :pageTitle="pageTitle" :btn="btn" :headDetails="headDetails" :details="items" :headers="headers" :items="items" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon" :datatext="datatext"/>
        </div>
        <!-- <v-chip class="mt-1 me-1" color="orange" size="small">{{ periode[0] }} - {{ periode[1] }}</v-chip> -->
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" max-width="450">
        <div class="d-flex align-center justify-sm-end justify-start">
          <!-- SEARCH -->
          <v-text-field
              v-model="search"
              density="compact"
              variant="text"
              class="text-indigo-darken-4 rounded-xl border me-2 text-body-2 font-small"
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
      <v-sheet class="p-4">
        <v-data-table
            id="tbl_exporttable_to_xls" 
            items-per-page="10"
            :headers="headers"
            :items="pengirimanHead"
            :search="search"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption py-3 px-5 h-75"
            height="63vh"
            >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.tgl_pengiriman="{item}">
                {{ formatDate(item.raw.tgl_pengiriman) }}
              </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.kode_pelanggan="{ item }">
              <td>{{ namaPelanggan(item.raw.kode_pelanggan) }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.kode_alamat_bongkar="{ item }">
              <td>{{ namaTujuan(item.raw.kode_alamat_bongkar) }}</td>
            </template>
             <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.actions="{ item }">
                <v-btn size="small" variant="text" color="grey-darken-2">
                  <v-icon>mdi-dots-vertical</v-icon>
                  <v-menu activator="parent" transition="slide-y-transition">
                    <v-list density="compact" class="px-3">
                      <v-list-item class="pa-0">
                        <PengirimanDetail
                          batalbtn="Pengiriman"
                          :kirim="true"
                          :edit="true"
                          @del="del"
                          :namaPelanggan="namaPelanggan(item.raw.kode_pelanggan)"
                          :alamatPelanggan="alamatPelanggan(item.raw.kode_pelanggan)"
                          :namaTujuan="namaTujuan(item.raw.kode_alamat_bongkar)"
                          :pengiriman="Penjualandetl(item.raw.no_pengiriman)"
                          :nokirim="item.raw.no_pengiriman"
                          :detail_kirim="kirim_detail"
                          :nopjl="Penjualandetl(item.raw.no_pengiriman).no_penjualan"
                          :pjl_detail="pjl_detail(item.raw.no_pengiriman)"
                          :pageTitle="pageTitle"
                          :headDetails="headDetails"
                          :headers="headers"
                          :items="item.raw"
                          :iTitle="actIcon[3].text"
                          :btncolor="actIcon[3].color"
                          :icon="actIcon[3].icon"
                          :iVariant="actIcon[3].variant"
                          :alpha="alpha"
                          :actIcon="actIcon"
                          :disable="true"
                          />
                      </v-list-item>
                      <SuratJalan
                        :alamatPelanggan="alamatPelanggan(item.raw.kode_pelanggan)"
                        :namaPelanggan="namaPelanggan(item.raw.kode_pelanggan)"
                        :namaTujuan="namaTujuan(item.raw.kode_alamat_bongkar)"
                        :pengiriman="Penjualandetl(item.raw.no_pengiriman)"
                        :items="item.raw"
                        :nokirim="item.raw.no_pengiriman"
                        :detail_kirim="kirim_detail"
                        :nopjl="Penjualandetl(item.raw.no_pengiriman).no_penjualan"
                      />
                    </v-list>
                  </v-menu>
              </v-btn>
            </template>
            </v-data-table>
        </v-sheet>
  </v-container>

</template>
