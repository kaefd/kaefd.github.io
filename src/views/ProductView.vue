<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import ScreenDialog2 from '../components/ScreenDialog2.vue';
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
    ScreenDialog2, VDataTable, AppBar
    },
    props:['actIcon', 'cetak'],
    data () {
      return {
        filter: false,
        drawer: null,
        search: '',
        periode: [],
        dialog2: false,
        pageTitle: 'PRODUKSI BARANG',
        selectCategory: 'semua',
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        headers: [
          { title: 'Nomor Produksi', key: 'no_produksi'},
          { title: 'Tgl Produksi', key: 'tgl_produksi' },
          { title: 'Kode Group', key: 'kode_group' },
          { title: 'Bahan Baku', key: 'bahan_baku' },
          { title: 'Jumlah Bahan Baku', key: 'jumlah' },
          { title: 'Barang Jadi', key: 'barang_jadi' },
          { title: 'Jumlah Barang Jadi', key: 'jml_barang_jadi' },
          { title: '', key: 'actions', sortable: false},
        ],
        filtered: {
          periode: []
        },
        items: '',
        detailbahan: '',
        detailbarang: '',
        groupbarang: '',
        getbarang:'',
        getbahan:'',
        select_kode: [],
        headItem: [
            { title: 'Kode Barang', key: 'kode_barang' },
            { title: 'Nama Barang', key: 'nama_barang' },
            { title: 'Jumlah', key: 'jumlah' },
            { title: 'Satuan', key: 'satuan' },
            { title: '', key: 'actions', sortable: false },
        ],

      }
    },
    created() {
        this.periode = [this.tglawal(), this.today()]
        this.filtered.periode = [this.tglawal(), this.today()]
    },
    methods: {
      getProduksihead() {
        const apiUrl = '/produksi_head?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.items = response.data
        })
        .catch((error) => {
          console.log(error);
        })
      },
      getProduksiBahan() {
        const apiUrl = '/produksi_detail_bahan?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.detailbahan = response.data
        })
        .catch((error) => {
          console.log(error);
        })
      },
      getProduksiBarang() {
        const apiUrl = '/produksi_detail_barang?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.detailbarang = response.data
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
      getBarang() {
        api.getData('/barang?status=true')
        .then(response => {
          this.getbarang = response.data
        })
        .catch(() => {
          window.location.href = '/login'
        })
      },
      // TAMBAH DATA
      inputhead(value, detlbahan, detlbarang) {
        // const apiUrl = '/produksi_head?'
        const value1 = JSON.stringify(value);
        const value2 = JSON.stringify(detlbahan);
        const value3 = JSON.stringify(detlbarang);
        console.log({
          produksi_head : value1,
          produksi_detail_bahan : value2,
          produksi_detail_barang : value3
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
      // HAPUS DATA
      // PRODUKSI HEAD
      del(value, detlbahan, detlbarang) {
        let produksi_head = {
          no_produksi: value.no_produksi,
          tgl_produksi: value.tgl_produksi,
          kode_group: value.kode_group,
          tgl_input: value.tgl_input,
          user_input: value.user_input,
          tgl_batal: value.tgl_batal,
          user_batal: "admin",
          status: 'false'
        }
      const ph = JSON.stringify(produksi_head);
      const dbahan = JSON.stringify(detlbahan);
      const dbarang = JSON.stringify(detlbarang);
      console.log({
        produksi_head : ph,
        produksi_detail_bahan : dbahan,
        produksi_detail_barang : dbarang,
      });
        // api.deleteData('/produksi_head', {
        //   produksi_head : ph,
        //   produksi_detail_bahan : dbahan,
        //   produksi_detail_barang : dbarang,
        // })
        // .then(() => {
        //   window.location.href = '/in'
        // })
        // .catch((error) => {
        //   console.log(error);
        // })
      },
      selected(){        
        return this.getProduksihead(), this.getProduksiBahan(), this.getProduksiBarang()
      },
      dataTable(value, params) {
        for (let i = 0; i < this.detailbahan.length; i++) {
          for (let j = 0; j < this.detailbarang.length; j++) {
            if (this.detailbahan[i].no_produksi == value) {
              if(params == 'baku') {
                return this.detailbahan[i].nama_barang
              }
              else if(params == 'jumlah') {
                return this.detailbahan[i].jumlah
              }
              else if(params == 'kodebhn') {
                return this.detailbahan[i].kode_barang
              }
            }
            else if(this.detailbarang[j].no_produksi == value) {
              if(params == 'brgjadi') {
                return this.detailbarang[j].nama_barang
              }
              else if(params == 'jumlahbrg') {
                return this.detailbarang[j].jumlah
              }
              else if(params == 'satuan') {
                return this.detailbarang[j].satuan
              }
              else if(params == 'kodebrg') {
                return this.detailbarang[j].kode_barang
              }
            }
          }
        }
      },
      input_kodegroup(value) {
        let kode = ''
          for (let i = 0; i < this.groupbarang.length; i++) {
            if(this.groupbarang[i].kode_group == value) {
              // cari nama_Barang yang kode barangnya sama
                kode = this.groupbarang[i].kode_barang
              }
            }

          for (let j = 0; j < this.getbarang.length; j++) {
              if( kode == this.getbarang[j].kode_barang) {
                return this.select_kode =[ this.getbarang[j]]
              }
          }
      },
      detail(val, i){
        let detail = ''
        if( i == 'bahan' ){
          detail = this.detailbahan
        } else if( i == 'barang') {
          detail = this.detailbarang
        }
        for (let i = 0; i < detail.length; i++) {
          if( val == detail[i].no_produksi ) {
            return detail[i]
          }
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
        body: this.printdata(),
        margin: { left: 0.5, top: 1.25 }
      })
      .save(`${this.pageTitle}.pdf`);
      },
      printdata(){
        let a = []
        for (let i = 0; i < this.items.length; i++) {
          a.push({
            no_produksi: this.items[i].no_produksi,
            tgl_produksi: this.items[i].tgl_produksi,
            kode_group: this.items[i].kode_group,
            bahan_baku: this.dataTable(this.items[i].no_produksi, 'baku'),
            jumlah: this.dataTable(this.items[i].no_produksi, 'jumlah'),
            barang_jadi: this.dataTable(this.items[i].no_produksi, 'brgjadi'),
            jml_barang_jadi: this.dataTable(this.items[i].no_produksi, 'jumlahbrg'),
          })
        }
        return a
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
      reset() {
        this.periode = [this.tglawal(), this.today()]
        this.filtered.periode = [this.tglawal(), this.today()]
        this.selected()
      
      },
      filterdata() {
        this.periode[0] = this.filtered.periode[0]
        this.periode[1] = this.filtered.periode[1]
        this.selected()
      }
      },
      mounted() {
          this.getProduksihead()
          this.getProduksiBahan()
          this.getProduksiBarang()
          this.getGroupBarang()
          this.getBarang()
          this.page()
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
      <v-sheet class="rounded-xl py-5 h-500 bg-white">
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
          <v-div class="d-flex justify-end pt-12">
            <v-btn class="elevation-0 text-small mt-12 me-2 bg-grey-lighten-2" height="42" @click="reset()">Reset</v-btn>
            <v-btn class="elevation-0 text-small mt-12" color="orange-lighten-1" height="42" @click="filterdata()">Filter</v-btn>
          </v-div>
        </v-container>
      </v-sheet>
  </v-navigation-drawer>
    <v-container>
    <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
      <v-row no-gutters class="rounded-t-xl align-start mt-n4 mb-2">
        <v-responsive class="d-flex align-center mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
        <!-- PERIODE -->
        <!-- <div class="w-100">
          <v-label v-label class="text-body-2 text-blue-darken-4">Periode</v-label>
          <VueDatePicker v-model="periode" range :clearable="false" :enable-time-picker="false" hide-offset-dates max-range="30" :max-date="new Date()"  @update:model-value="selected()" input-class-name="dp-custom-input"/>
        </div> -->
        <div class="d-flex align-center w-100">
        <!-- BUTTON FILTER -->
        <v-btn @click="filter = !filter " class="rounded-circle text-caption elevation-0 bg-grey-lighten-4 text-indigo me-2" icon="mdi-tune-vertical" size="small">
        </v-btn>
        <!-- TAMBAH DATA -->
        <ScreenDialog2 :headers="headItem" :items="items" :groupbarang="groupbarang" :getbarang="getbarang" @input_kodegroup="input_kodegroup"  @inputhead="inputhead" :produksi="true" :select_kode="select_kode" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon"/>
        </div>
        <!-- <v-chip class="mt-1 me-1" color="orange" size="small">{{ periode[0] }} - {{ periode[1] }}</v-chip> -->
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto mt-md-2 mt-0" width="200" max-width="450">
        <div class="d-flex justify-sm-end justify-start">
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
            <!-- EXPORT DATA -->
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
            :items="items"
            :search="search"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption py-3 rounded-b-xl"
            height="63vh"
            >
            <!-- dialog actions -->
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.bahan_baku="{ item }">
              <td>{{ dataTable(item.raw.no_produksi, 'baku') }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.tgl_produksi="{item}">
                {{ formatDate(item.raw.tgl_produksi) }}
              </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.jumlah="{ item }">
              <td>{{ dataTable(item.raw.no_produksi, 'jumlah') }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.barang_jadi="{ item }">
              <td>{{ dataTable(item.raw.no_produksi, 'brgjadi') }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.jml_barang_jadi="{ item }">
              <td>{{ dataTable(item.raw.no_produksi, 'jumlahbrg') }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.actions="{ item }">
                <ScreenDialog2
                :batalbtn="Produksi"
                :edit="true"
                :produksi_bahan="detail(item.raw.no_produksi, 'bahan')"
                :produksi_barang="detail(item.raw.no_produksi, 'barang')"
                :detailbahan="[{
                  kode_barang: dataTable(item.raw.no_produksi, 'kodebhn'),
                  nama_barang: dataTable(item.raw.no_produksi, 'baku'),
                  jumlah: dataTable(item.raw.no_produksi, 'jumlah'),
                  satuan: dataTable(item.raw.no_produksi, 'satuan')
                }]"
                :detailbarang="[{
                  kode_barang: dataTable(item.raw.no_produksi, 'kodebrg'),
                  nama_barang: dataTable(item.raw.no_produksi, 'brgjadi'),
                  jumlah: dataTable(item.raw.no_produksi, 'jumlahbrg'),
                  satuan: dataTable(item.raw.no_produksi, 'satuan')
                }]"
                @del="del"
                :headItem="headItem"
                :item="item.raw"
                :details="details"
                :headers="headers"
                :items="items"
                :search="search"
                :category="category"
                :selectCategory="selectCategory"
                :iTitle="actIcon[1].text"
                :btncolor="actIcon[1].color"
                :icon="actIcon[1].icon"
                :iVariant="actIcon[1].variant"
                :alpha="alpha"
                :actIcon="actIcon"
                :disable="true"
                />
              </template>
          </v-data-table>
          </v-sheet>
        <!-- <TableVue :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="this.actIcon[1].text" :btncolor="this.actIcon[1].color" :icon="this.actIcon[1].icon" :iVariant="this.actIcon[1].variant" :alpha="alpha" /> -->
  </v-container>

</template>
