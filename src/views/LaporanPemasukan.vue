<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
// components
import '@vuepic/vue-datepicker/dist/main.css'
import PemasukanDetail from './PemasukanDetail.vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import textField from '../components/form/textField.vue';
import menuList from '../components/menu/menuList.vue';
import checkBox from '../components/form/checkBox.vue';
import BtnFilter from '../components/button/btnFilter.vue';
import DatePicker from '../components/datepicker/datePicker.vue';
import otoritas from '../service/page/otoritas';
import pemasukan from '../service/page/pemasukan';
import CircularLoader from '../components/animate/circularLoader.vue';

</script>
<script>
  export default {
    props:['tema', 'cetak', 'window'],
    data () {
      return {
        drawer: null,
        search: '',
        periode: [],
        filter: false,
        loading: true,
        pageTitle: 'LAPORAN PEMASUKAN BARANG',
        selectdokumen: [],
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        authority: '',
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
          { title: 'Supplier', key: 'kode_supplier' },
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
        dataitems: '',
        barang: '',
        supplier: '',
        filtered: {
          selectdokumen: [],
          periode: []
        },
      }
    },
    created() {
      this.periode = [this.tglawal(), functions.day()]
      this.filtered.periode = [this.tglawal(), functions.day()]
    },
    methods: {
      async fetchData() {
        let user = localStorage.getItem('user')
        if(user != '') {
          let otority = await api.getOtoritas(user)
          this.authority = otoritas.otoritas(otority)
        }
        if(this.authority != '') {
          this.loading = true
          this.items = await api.getPemasukanHead(this.periode)
          this.supplier = await api.getSupplier()
          this.pembeliandetl = await api.getPemasukanDetail(this.periode)
          this.barang = await api.getBarang()
          this.dataitems = pemasukan.pilihtipe(this.selectdokumen, this.items, this.supplier, this.pembeliandetl, this.barang)
          this.loading = false
        } else return  await api.logout()
      },
      page(){
        return this.$emit('page', this.pageTitle)
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
      pilihtipe() {
        if (this.selectdokumen.length === 0) {
            return this.items;
          } else {
            return this.items.filter(item => this.selectdokumen.includes(item.tipe_dokumen));
          }
      },
      updt() {
        this.fetchData()
      },
      dataTable(value, col) {
        if(col === 'nama') {
          for (let i = 0; i < this.supplier.length; i++) {
            if(value == this.supplier[i].kode_supplier) {
              return this.supplier[i].nama
            }
          }
        }
        if(col == 'pembelian') {
          let p = []
          for (let j = 0; j < this.pembeliandetl.length; j++) {
            if ( this.pembeliandetl[j].no_pembelian == value ) {
                p.push(this.pembeliandetl[j])
            }
          }
          return p
        }

        if(col == 'total') {
            return functions.numb(value, 2)
        }
        if(col === 'kategori' || col == 'namabrg' || col == 'hscode' || col == 'satuan' || col == 'diterima') {
          for (let i = 0; i < this.pembeliandetl.length; i++) {
            for (let j = 0; j < this.barang.length; j++) {
              if(value == this.pembeliandetl[i].no_pembelian) {
                if(col == 'diterima') {
                  return functions.numb(this.pembeliandetl[i].jumlah_diterima)
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
      close(v) {
        return this.filter = v
      },
      print(key){
        let title = this.pageTitle
        let header = this.headers
        let item = this.dataitems
        functions.print(key, title, header, item)
      },
      reset() {
        this.filtered.selectdokumen = []
        this.periode = [this.tglawal(), functions.day()]
        this.filtered.periode = [this.tglawal(), functions.day()]
        this.selectdokumen = []
        this.getPembelian()
      },
      filterdata() {
        let awal = this.filtered.periode[0]
        let akhir = this.filtered.periode[1]
        this.periode[0] = new Date(awal).toJSON().slice(0, 10)
        this.periode[1] = new Date(akhir).toJSON().slice(0, 10)
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
      this.fetchData()
    }
  }
</script>

<template>
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-label class="text-small mt-4">Tgl Awal</v-label>
      <DatePicker teleport-center v-model="filtered.periode[0]" :max-date="new Date()" :filter="true" :tema="tema"/>
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <DatePicker teleport-center v-model="filtered.periode[1]" class="mb-4" :min-date="filtered.periode[0]" :filter="true" :tema="tema"/>
      <!-- TIPE DOKUMEN -->
      <v-span class="text-caption text-weight-bold">Tipe Dokumen</v-span>
      <v-divider class="mb-6"></v-divider>
        <checkBox
          v-for="label, i in tipedokumen" :key="i"
          v-model="filtered.selectdokumen"
          :label="label"
          :value="label"
        />
    </template>
  </filterDrawer>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="mb-2 mt-n4">
      <v-responsive class="me-0 ms-auto" max-width="450">
        <div class="d-flex">
          <!-- SEARCH -->
          <textField  v-model="search" placeholder="Search" icon="mdi-magnify" class="me-2"/>
          <!-- EXPORT DATA -->
          <menuList
            v-if="otoritas.routes(authority, 'Pengaturan Umum')"
            :otority="authority"
            icon="mdi-dots-vertical"
            :items="cetak"
            @result="print"
          />
        <!-- BUTTON FILTER -->
        <btn-filter icon="mdi-tune-vertical" @click="filter = !filter" />
        <v-btn variant="text" color="indigo" icon="mdi-reload" size="small" class="rounded-circle" @click="fetchData()"></v-btn>
          </div>
      </v-responsive>
      </v-row>
      <!-- EDIT DATA -->
      <v-sheet :height="window > 776 ? '94%' : '87%'">
      <v-data-table-virtual
          id="tbl_exporttable_to_xls"
          items-per-page="10"
          :items="dataitems"
          :headers="headers"
          :search="search"
          :hover="true"
          :fixed-header="true"
          density="compact"
          class="text-caption pt-1 rounded-lg border-sm h-100"
          :height="window > 776 ? '100%' : '92%'"
          >
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.tgl_pembelian="{item}">
              {{ functions.formatDate(item.raw.tgl_pembelian) }}
          </template>
          <!-- BUTTON EDIT -->
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.actions="{item}">
            <PemasukanDetail
                :window="window"
                :tema="tema"
                batalbtn="Pemasukan"
                @confirm="confirm"
                :laporan="true"
                :namaSupplier="dataTable(item.raw.kode_supplier, 'nama')"
                :pembelian="dataTable(item.raw.no_pembelian, 'pembelian')"
                :total="dataTable(item.raw.total_nilai, 'total')"
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
                :pageTitle="pageTitle"/>
          </template>
        </v-data-table-virtual>
      </v-sheet>
    </v-container>
  <circular-loader :loading="loading" />
  </template>
