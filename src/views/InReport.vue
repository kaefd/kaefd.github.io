<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import { VDataTable } from 'vuetify/labs/VDataTable'
import PemasukanDetail from './PemasukanDetail.vue';
import api from '../api';
import { ref, onMounted } from 'vue';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import AppBar from '../components/AppBar.vue';

</script>
<script>
  export default {
    components: {
    VDataTable, PemasukanDetail, AppBar
    },
    props:['actIcon', 'cetak'],
    data () {
      return {
        drawer: null,
        search: '',
        periode: [],
        filter: false,
        pageTitle: 'LAPORAN PEMASUKAN BARANG',
        selectdokumen: [],
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        tipedokumen: [
          'BC23',
          'BC40',
          'PPKEK-LDP',
          'PPKEK-TLDDP',
        ],
        headers: [
          { title: 'Nomor Pembelian', key: 'no_pembelian'},
          { title: 'Tanggal Pembelian', key: 'tgl_pembelian' },
          { title: 'Tipe Dokumen', key: 'tipe_dokumen' },
          { title: 'No Dokumen', key: 'no_dokumen' },
          { title: 'Supplier', key: 'nama' },
          { title: 'Kategori Barang', key: 'kategori_barang' },
          { title: 'Nama Barang', key: 'nama_barang' },
          { title: 'HS Code', key: 'hs_code' },
          { title: 'Satuan', key: 'satuan' },
          { title: 'Jumlah Diterima', key: 'jumlah_diterima' },
          { title: 'Total Nilai', key: 'total_nilai' },
          { title: '', key: 'actions', sortable: false},
        ],
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
        details: '',
        items: '',
        pembeliandetl: '',
        barang: '',
        supplier: '',
        filtered: {
          selectdokumen: [],
          periode: []
        },
      }
    },
    created() {
      this.today()
    },
    methods: {
      page(){
        return this.$emit('page', this.pageTitle)
      },
      today() {
        let currentDate = new Date().toJSON().slice(0, 10);
        return this.periode = this.filtered.periode = [currentDate , currentDate]
      },
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
        .catch((error) => {
          return this.$router.push('login');
        })
      },
      getSupplier() {
        const apiUrl = '/supplier'
        api.getData(apiUrl)
        .then(response => {
          this.supplier = response.data
        })
        .catch((error) => {
          return this.$router.push('login');
        })
      },
      getData(){
        api.getData('/barang?status=true')
        .then(response => {
          this.barang = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      numb(value) {
        let val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      pilihtipe() {
        if (this.selectdokumen.length === 0) {
            return this.items;
          } else {
            return this.items.filter(item => this.selectdokumen.includes(item.tipe_dokumen));
          }
      },
      updt() {
        this.getPembelian()
        this.getPembelianDetail()
        this.getSupplier()
        this.getData()
      },
      dataTable(value, col) {
        if(col === 'nama') {
          for (let i = 0; i < this.supplier.length; i++) {
            if(value == this.supplier[i].kode_supplier) {
              return this.supplier[i].nama
            }
          }
        }
        if(col == 'total') {
            return this.numb(value)
        }
        if(col === 'kategori' || col == 'namabrg' || col == 'hscode' || col == 'satuan' || col == 'diterima') {
          for (let i = 0; i < this.pembeliandetl.length; i++) {
            for (let j = 0; j < this.barang.length; j++) {
              if(value == this.pembeliandetl[i].no_pembelian) {
                if(col == 'diterima') {
                  return this.numb(this.pembeliandetl[i].jumlah_diterima)
                }
                if(this.pembeliandetl[i].kode_barang == this.barang[j].kode_barang){
                  if (col == 'kategori') {
                    return this.barang[j].kategori_barang
                  } else if(col == 'namabrg') {
                    return this.barang[j].nama_barang
                  } else if(col == 'hscode') {
                    return this.barang[j].hs_code
                  } else if(col == 'satuan') {
                    return this.barang[j].satuan
                  }
                }
              }
            }
          }
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
            nama: this.dataTable(this.items[i].kode_supplier, 'nama'),
            kategori_barang: this.dataTable(this.items[i].no_pembelian, 'kategori'),
            nama_barang: this.dataTable(this.items[i].no_pembelian, 'namabrg'),
            hs_code: this.dataTable(this.items[i].no_pembelian, 'hscode'),
            satuan: this.dataTable(this.items[i].no_pembelian, 'satuan'),
            jumlah_diterima: this.dataTable(this.items[i].no_pembelian, 'diterima'),
            total_nilai: this.dataTable(this.items[i].total_nilai, 'total'),
          })
        }
        return a
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
        orientation: "potrait",
        unit: "in",
        format: "a4"
      });
      let heading = this.pageTitle
      let columns = this.headers
      // text is placed using x, y coordinates
      doc.setFontSize(14).text(heading, 0.5, 0.5).setFont('Arial', 20);
      doc.autoTable({
        columns,
        body: this.printdata(),
        margin: { left: 0.1, top: 0.75, right: 0.1 },
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
        this.filtered.selectdokumen = []
        this.today()
        this.selectdokumen = []
        this.getPembelian()
      },
      filterdata() {
        this.periode[0] = this.filtered.periode[0]
        this.periode[1] = this.filtered.periode[1]
        this.updt()
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
    }
  }
  const date = ref();
    // For demo purposes assign range from the current date
    onMounted(() => {
      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      date.value = [startDate, endDate];
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
    <v-container class="mb-n10">
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-text-field  v-model="filtered.periode[0]" class="mt-4" label="Tgl Awal" type="date" density="compact" variant="outlined"></v-text-field>
      <v-text-field  v-model="filtered.periode[1]" label="Tgl Akhir" type="date" density="compact" variant="outlined"></v-text-field>
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
    <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
    <v-row no-gutters class="mb-2 mt-n4">
      <v-responsive>
        <!-- BUTTON FILTER -->
        <v-btn @click="filter = !filter " class="rounded-circle text-caption elevation-0 bg-grey-lighten-4 text-indigo me-2" icon="mdi-tune-vertical" size="small">
        </v-btn>
      </v-responsive>
      <v-responsive class="me-0 ms-auto" max-width="450">
        <div class="d-flex">
          <!-- SEARCH -->
          <v-text-field
            v-model="search"
            density="compact"
            variant="text"
            class="text-indigo-darken-4 rounded-xl border text-body-2 font-small"
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
          items-per-page="5"
          :items="pilihtipe()"
          :headers="headers"
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
          <!-- NAMA SUPPLIER -->
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.nama="{item}">
              {{ dataTable(item.raw.kode_supplier, 'nama') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.kategori_barang="{item}">
              {{ dataTable(item.raw.no_pembelian, 'kategori') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.nama_barang="{item}">
              {{ dataTable(item.raw.no_pembelian, 'namabrg') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.hs_code="{item}">
              {{ dataTable(item.raw.no_pembelian, 'hscode') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.satuan="{item}">
              {{ dataTable(item.raw.no_pembelian, 'satuan') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.jumlah_diterima="{item}">
              {{ dataTable(item.raw.no_pembelian, 'diterima') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.total_nilai="{item}">
              {{ dataTable(item.raw.total_nilai, 'total') }}
          </template>
          <!-- BUTTON EDIT -->
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.actions="{item}">
            <PemasukanDetail batalbtn="Pemasukan"
                @del="del"
                :namaSupplier="dataTable(item.raw.kode_supplier, 'nama')"
                :pembelian="dataTable(item.raw.no_pembelian, 'pembelian')"
                :edit="true"
                :datatext="datatext"
                :btn="btn"
                :headDetails="headDetails"
                :details="details"
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
          <!-- NILAI TOTAL -->
          <!--  eslint-disable-next-line vue/valid-v-slot -->
          <!-- <template v-slot:item.total_nilai= "{ item }">
            <td>{{ numb(item.raw.total_nilai) }}</td>
          </template> -->
          <!-- TOTAL NILAI -->
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <!-- <template v-slot:item.rp= "{ item }">
            <td>{{ numb(totalnilai(item.raw)) }}</td>
          </template> -->
        </v-data-table>
      </v-sheet>
    </v-container>
  </template>
