<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import ScreenDialog from '../components/ScreenDialog.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import api from '../api';
import { ref, onMounted } from 'vue';

</script>

<script>
export default {
    components: {
    ScreenDialog, VDataTable
    },
    props:['actIcon', 'cetak'],
    data () {
      return {
        drawer: null,
        search: '',
        periode: [],
        filter: false,
        dialog2: false,
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
          { key: 'actions', sortable: false},
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
          {key: 'actions', sortable: false },
        ],
        
        details: [],
        itemDetail: [
                { name: 'Jumlah', key: 'jumlah' },
                { name: 'Jumlah Diterima', key: 'received' },
                { name: 'Nilai Total', key: 'total' }
            ],
        
        datainput: {
          no_pembelian: '',
          tgl_pembelian: '',
          kode_supplier: '',
          tipe_dokumen: '',
          no_dokumen: '',
          tgl_dokumen: '',
          no_invoice: '',
          no_bl: '',
          mata_uang: '',
          kurs: '',
          user_input: 'admin',
          status: 'true'
        },


      }
    },
    created() {
        this.today()
        let currentDate = new Date().toJSON().slice(0, 10);
        return this.filtered.periode = [currentDate , currentDate]
    },
    methods: {
      today() {
        let currentDate = new Date().toJSON().slice(0, 10);
        return this.periode = [currentDate , currentDate]
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
        .catch((error) => {
          console.log(error);
        })
      },
      // TAMBAH DATA
      inputhead(value, valuedetail) {
        const apiUrl = '/pembelian_head?'
        const value1 = JSON.stringify(value);
        const value2 = JSON.stringify(valuedetail);
        api.postData( apiUrl, {
          pembelian_head : value1,
          pembelian_detail : value2
        })
        .then(() => {
            window.location.href = '/in' 
          })
          .catch((error) => {
            console.log(error);
          })
      },
      // HAPUS DATA
      del(value, valuedtl) {
      this.pembelian_head = {
          no_pembelian: value.no_pembelian,
          tgl_pembelian: value.tgl_pembelian,
          kode_supplier: value.kode_supplier,
          tipe_dokumen: value.tipe_dokumen,
          no_dokumen: value.no_dokumen,
          tgl_dokumen: value.tgl_dokumen,
          no_invoice: value.no_invoice,
          no_bl: value.no_bl,
          mata_uang: value.mata_uang,
          kurs: value.kurs,
          user_input: 'admin',
          user_batal: 'admin',
          status: 'false'
      }
      this.pdetail = [{
            no_pembelian: valuedtl.no_pemelian,
            kode_barang: valuedtl.kode_barang,
            nama_barang: valuedtl.nama_barang,
            hs_code: valuedtl.hs_code,
            jumlah: valuedtl.jumlah,
            jumlah_diterima: valuedtl.jumlah_diterima,
            satuan: valuedtl.satuan,
            nilai: valuedtl.nilai,
            no_urut:valuedtl.no_urut,
      }]
      const ph = JSON.stringify(this.pembelian_head);
      const pd = JSON.stringify(this.pdetail);
        api.deleteData('/pembelian_head', {
          pembelian_head : ph,
          pembelian_detail : pd,
        })
        .then(() => {
          window.location.href = '/in'
        })
        .catch((error) => {
          console.log(error);
        })
      },
      // inisialisasi
      selected(){ 
        return this.getPembelian(), this.getPembelianDetail()
      },
      // SELECT TIPE DOKUMEN
      pilihtipe() {
        if (this.selectdokumen.length === 0) {
            return this.items;
          } else {
            return this.items.filter(item => this.selectdokumen.includes(item.tipe_dokumen));
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
        .catch((error) => {
          console.log(error);
        })
      },
      // GET DATA PEMBELIAN-DETAIL
      pembelian(value) {
        for (let j = 0; j < this.pembeliandetl.length; j++) {
          if ( this.pembeliandetl[j].no_pembelian == value ) {
              return this.pembeliandetl[j]
          }
          
        }


      },
      print(i){
          if (i == 0) {
            return this.ExportToExcel('xlsx')
          } else if(i == 1) {
            return this.pdf()
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
      reset() {
        this.filtered.periode = this.today()
        this.filtered.selectdokumen = []
        this.today()
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
  <v-navigation-drawer
        class="mt-4 border-0 bg-grey-lighten-4 rounded-xl me-4 elevation-0"
        v-model="filter"
        location="right"
        width="320"
        style="height: fit-content;"
      >
      <v-sheet class="rounded-xl py-5 h-500 bg-white">
        <div class="d-flex align-center">
          <v-span class="text-button ms-4">Filter</v-span>
          <v-btn size="small" icon="mdi-close" @click="filter = false" variant="text" class="me-3 ms-auto">
          </v-btn>
        </div>
        <!-- PERIODE -->
        <v-container class="mb-n10">
          <v-span class="text-caption text-weight-bold">Periode</v-span>
          <v-divider></v-divider>
          <v-text-field v-model="filtered.periode[0]" class="mt-4" label="Tgl Awal" type="date" density="compact" variant="outlined"></v-text-field>
          <v-text-field v-model="filtered.periode[1]" label="Tgl Akhir" type="date" density="compact" variant="outlined"></v-text-field>
        </v-container>
        <!-- TIPE DOKUMEN -->
        <v-container>
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
            <v-div class="d-flex justify-end mt-12">
              <v-btn class="elevation-0 text-small mt-5 me-2 bg-grey-lighten-2" height="42" @click="reset()">Reset</v-btn>
              <v-btn class="elevation-0 text-small mt-5 text-white" color="orange-lighten-1" height="42" @click="filterdata()">Filter</v-btn>
            </v-div>
        </v-container>
      </v-sheet>
  </v-navigation-drawer>
  
  <v-container>
    <v-row no-gutters class="rounded-t-xl align-start mt-n4 mb-2">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
          <div class="d-flex align-center w-100">
            <!-- ADD DATA -->
            <ScreenDialog batalbtn="Pemasukan" :datainput="datainput" @inputhead="inputhead" :pemasukan="true" :supplier="supplier" :edit="false" :itemDetail="itemDetail" :datatext="datatext" :btn="btn" :headDetails="headDetails" :details="details" :headers="headers" :items="pilihtipe()" :pembeliandetl="pembeliandetl" :search="search" :category="tipedokumen" :selectCategory="selectCategory" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon" :pageTitle="pageTitle"/>
          </div>
          <!-- <v-chip class="mt-1 me-1" color="orange" size="small">{{ periode[0] }} - {{ periode[1] }}</v-chip>
          <v-chip v-if="selectdokumen" class="mt-1" color="orange" size="small">{{ selectdokumen }}</v-chip> -->
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" width="200" max-width="450">
        <div class="d-flex align-center justify-sm-end justify-start mt-md-1 mt-0">
          <!-- SEARCH -->
          <v-text-field
              v-model="search"
              density="compact"
              variant="text"
              class="w-75 text-indigo-darken-4 rounded-xl border text-body-2 font-small"
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
                  v-for="(c, index) in this.cetak"
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
            <!-- BUTTON FILTER -->
            <v-btn @click="filter = !filter " class="rounded-circle text-caption elevation-0 bg-grey-lighten-4 text-indigo" icon="mdi-tune-vertical" size="small">
            </v-btn>
          </div>
      </v-responsive>
      </v-row>

        <!-- EDIT DATA -->
        <v-sheet class="rounded-b-xl">
          <v-data-table
              id="tbl_exporttable_to_xls"
              :items="pilihtipe()"
              :headers="headers"
              :search="search"
              :hover="true"
              :fixed-header="true"
              density="compact"
              class="text-caption py-3 rounded-b-xl h-75"
              height="75vh"
              >
              <!-- CUSTOM PAGINATION STYLE -->
              <template v-slot:bottom>
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
              </template>
              <!-- NAMA SUPPLIER -->
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.kode_supplier="{item}">
                  <td>{{ namaSupplier(item.raw.kode_supplier) }}</td>
              </template>
              <!-- BUTTON EDIT -->
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.actions="{item}">
                <ScreenDialog batalbtn="Pemasukan" @del="del" :namaSupplier="namaSupplier(item.raw.kode_supplier)" :pembelian="pembelian(item.raw.no_pembelian)" :edit="true" :penjualan="false" :itemDetail="itemDetail" :datatext="datatext" :btn="btn" :headDetails="headDetails" :details="details" :headers="headers" :items="item.raw" :search="search" :category="tipedokumen" :selectCategory="selectCategory" :iTitle="actIcon[3].text" :btncolor="actIcon[3].color" :icon="actIcon[3].icon" :iVariant="actIcon[3].variant" :alpha="alpha" :actIcon="actIcon" :pageTitle="pageTitle"/>
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