<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import ScreenDialog from '../components/ScreenDialog.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import api from '../api';

import { ref, onMounted } from 'vue';

</script>

<script>
  export default {
    components: {
    ScreenDialog, AppBar, NavDrawers,VueDatePicker, VDataTable
    },
    props:['actIcon'],
    data () {
      return {
        drawer: null,
        search: '',
        periode: '',
        dialog2: false,
        pageTitle: 'PEMASUKAN BARANG',
        btn: 'Tambah Barang',
        selectdokumen: 'semua',
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        // pilihtipe: 'BC40',
        tipedokumen: [
          'semua',
          'BC23',
          'BC40',
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
          { title: '', key: 'actions', sortable: false},
        ],
        items: '',
        supplier: '',
        headDetails:[
          {title: 'Kode Barang', key: 'kode_barang' },
          {title: 'Nama Barang', key: 'nama_barang' },
          {title: 'HS Code', key: 'hs_code' },
          {title: 'Jumlah', key: 'jumlah' },
          {title: 'Jumlah Diterima', key: 'jumlah_diterima' },
          {title: 'Satuan', key: 'satuan' },
          {title: 'Total Nilai', key: 'total_nilai' },
          {title: '', key: 'actions', sortable: false },
        ],

        details: [],
        datatext: [
            { name: 'No Pemasukan', key: 'nokeluar', type: 'text' },
            { name: 'Tgl Masuk', key: 'tgkeluar', type: 'date' },
            { name: 'Supplier', key: 'customer', type: 'select' },
            { name: 'Tipe Dokumen', key: 'doctype', type: 'select' },
            { name: 'No Dokumen', key: 'doctno', type: 'text' },
            { name: 'Tgl Dokumen', key: 'doctdate', type: 'date' },
            { name: 'No Invoice', key: 'noinvoice', type: 'text' },
            { name: 'No BL', key: 'nobl', type: 'text' },
            { name: 'Mata Uang', key: 'matauang', type: 'text' },
            { name: 'Kurs', key: 'kurs', type: 'text' },
        ],
        itemDetail: [
                { name: 'Jumlah', key: 'jumlah' },
                { name: 'Jumlah Diterima', key: 'received' },
                { name: 'Nilai Total', key: 'total' }
            ]


      }
    },
    created() {
        let currentDate = new Date().toJSON().slice(0, 10);
        return  this.periode = [currentDate , currentDate]// "2022-06-17"
    },

    methods: {
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
        .catch((error) => {
          console.log(error);
        })
      },     
      selected(){        
        return this.getPembelian()
      },
      // SELECT TIPE DOKUMEN
      pilihtipe() {
        if(this.selectdokumen == 'semua'){
          return this.items
        } else {
          return this.items.filter(item => item.tipe_dokumen === this.selectdokumen )
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
        .catch((error) => {
          console.log(error);
        })
      },

      // GET NAMA SUPPLIER
      // parameter value adalah kode supplier dalam kolom data pembelian
      // jika kode supplier == kode_supplier -> tampilkan nama supplier
      namaSupplier(value) {
        for (let i = 0; i < this.supplier.length; i++) {
          if ( this.supplier[i].kode_supplier == value ) {
              return this.supplier[i].nama
          }
          
        }

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
       numb(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
       totalnilai(data){
          let kurs = data.kurs
          let nilai = data.total_nilai
          return kurs * nilai
      },
       successAlert(m) {
        this.$swal.fire(
          'Berhasil !',
          m,
          'success'
        )
      },
      failedAlert(m) {
        this.$swal.fire(
          'Gagal !',
          m,
          'error'
        )
      },
    },
    mounted() {
      this.getPembelian()
      this.selected()
      this.getSupplier()
      this.pilihtipe()
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
  
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
  <v-container>
    <v-row no-gutters class="bg-white align-center pa-4 mb-3 rounded-lg">
      <v-responsive class="me-2 w-100" max-width="350">
          <div class="d-flex align-center w-100">

            <!-- PILIH TIPE DOKUMEN -->
            <div class="w-100">
              <v-label class="text-body-2 text-wrap text-blue-darken-4">Tipe Dokumen</v-label>
              <v-select
                :items="tipedokumen"
                v-model="selectdokumen"
                density="compact"
                variant="tonal"
                class="bg-indigo-lighten-5 text-indigo-darken-4 rounded-lg me-2"
                single-line
                hide-details
              ></v-select>
            </div>
            <!-- PERIODE -->
            <div class="w-100">
              <v-label v-label class="text-body-2 text-blue-darken-4 pe-7">Periode</v-label>
              <VueDatePicker :teleport="true" v-model="periode" range :enable-time-picker="false" :clearable="false" hide-offset-dates max-range="30" :max-date="new Date()"  @update:model-value="selected()" input-class-name="dp-custom-input"/>
            </div>
          </div>
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" max-width="350">
          <div class="d-flex align-center pt-6">
            <div class="d-flex align-center w-100">
              <!-- SEARCH -->
              <v-text-field
                v-model="search"
                density="compact"
                label="search"
                variant="tonal"
                class="bg-indigo-lighten-5 text-indigo-darken-4 rounded-lg me-2"
                single-line
                hide-details
              ></v-text-field>
  
              <!-- ADD DATA -->
              <ScreenDialog :itemDetail="itemDetail" :datatext="datatext" :btn="btn" :headDetails="headDetails" :details="details" :headers="headers" :items="pilihtipe()" :search="search" :category="tipedokumen" :selectCategory="selectCategory" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon" :pageTitle="pageTitle"/>
              
              <!-- EXPORT DATA   -->
              <v-btn
                color="indigo-darken-1"
                icon="mdi-download"
                class="rounded-lg ms-2"
                variant="tonal"
                size="small"
                @click="ExportToExcel('xlsx')"
            ></v-btn>
          </div>
          </div>
      </v-responsive>
      </v-row>

        <!-- EDIT DATA -->
        <v-sheet class="pt-5 rounded-lg">
          <v-data-table
              id="tbl_exporttable_to_xls"
              :items="pilihtipe()"
              :headers="headers"
              :search="search"
              :hover="true"
              :fixed-header="true"
              density="comfortable"
              class="text-caption py-3 px-5 rounded-select"
              height="400"
              >
              <!-- NAMA SUPPLIER -->
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.kode_supplier="{item}">
                  <td>{{ namaSupplier(item.raw.kode_supplier) }}</td>
              </template>
              <!-- BUTTON EDIT -->
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.actions="{item}">
                <ScreenDialog :edit="true" :itemDetail="itemDetail" :datatext="datatext" :btn="btn" :headDetails="headDetails" :details="details" :headers="headers" :items="item.raw" :search="search" :category="tipedokumen" :selectCategory="selectCategory" :iTitle="actIcon[3].text" :btncolor="actIcon[3].color" :icon="actIcon[3].icon" :iVariant="actIcon[3].variant" :alpha="alpha" :actIcon="actIcon" :pageTitle="pageTitle"/>
              </template>
              <!-- NILAI TOTAL -->
              <!--  eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.total_nilai= "{ item }">
                <td>{{ numb(item.raw.total_nilai) }}</td>
              </template>
              <!-- TOTAL NILAI -->
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.rp= "{ item }">
                <td>{{ numb(totalnilai(item.raw)) }}</td>
              </template>
            </v-data-table>
        </v-sheet>
  </v-container>

</template>

<style lang="scss">
.v-data-table-header__content {
  text-align: center;
}

.dp-custom-input {
  background-color: #e8eaf6;
  border-radius: 7px;
  border: none;
  height: 40px;
}

</style>