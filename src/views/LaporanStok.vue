<script setup>
import TableVue from '../components/TableVue.vue';
import api from '../service/api';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import checkBox from '../components/form/checkBox.vue';
import menuList from '../components/menu/menuList.vue';
import textField from '../components/form/textField.vue';
import BtnFilter from '../components/button/btnFilter.vue';
import otoritas from '../service/page/otoritas';
import barang from '../service/page/barang';
</script>

<script>
import laporan from '../service/page/laporan';
import functions from '../service/functions';
import CircularLoader from '../components/animate/circularLoader.vue';
import DatePicker from '../components/datepicker/datePicker.vue';
  export default {
    components: {
      TableVue,
      filterDrawer,
      checkBox,
      menuList,
      textField,
        BtnFilter,
        CircularLoader,
    },
    props:['page', 'cetak', 'window'],
    data () {
      return {
        drawer: null,
        search: '',
        searched: '',
        periode: [],
        group_barang: [],
        kode_barang: [],
        filter: false,
        dialoggb: false,
        loading: true,
        pageTitle: 'laporan stok barang',
        selectCategory: [],
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        authority:'',
        items: '',
        logbrg: '',
        databarang: '',
        filtered: {
        periode: [],
        kategori_barang: [],
        group_barang: [],
        kode_barang: []
      }
      }
    },
    computed: {
      selected(){
        this.periode = [functions.tglawal(), functions.day()]
        this.filtered.periode = [functions.tglawal(), functions.day()]
        if (this.selectCategory.length === 0) {
          return laporan.stokBarang(this.databarang, this.items)
        } else {
          // barang berdasarkan kategori
          let dt = []
          let a = laporan.stokBarang(this.databarang, this.items).filter(item => this.selectCategory.includes(item.kategori_barang));
          for (let i = 0; i < a.length; i++) {
              dt.push(a[i].kode_barang)
          }
          // item berdasarkan kategori
          return laporan.stokBarang(this.databarang, this.items).filter(it => dt.includes(it.kode_barang))
        }
      },
      filter_kodebarang() {
        let data = laporan.noDuplicate(this.selected)
        if (this.kode_barang.length === 0) {
          return data
        } else {
          return data.filter(item => this.kode_barang.includes(item.kode_barang));
        }
      },
      dataItem(){
        let data = this.filter_kodebarang
        if (this.group_barang.length === 0) {
          return data
        } else {
          let a = data.filter(item => this.group_barang.includes(item.kode_group));
          return a
        }
      },
      kodeGroup () {
            let a = []
            for (let i = 0; i < this.items.length; i++) {
                a.push(this.items[i].kode_group)
            }
            return functions.removeDuplicate(a)
      }
    },
    methods: {
      async fetchData() {
        let user = localStorage.getItem('user')
        if(user != null) {
          let otority = await api.getOtoritas(user)
          this.authority = otoritas.otoritas(otority)
        }
        if(this.authority != '') {
          this.loading = true
          this.items = await api.getGroupBarang()
          this.databarang = await api.getBarang()
          this.logbrg = await api.getLogBarang(this.periode)
          this.loading = false
        } else return  await api.logout()
      },
      pages(){
        return this.$emit('page', this.pageTitle)
      },
      close(v) {
        return this.filter = v
      },
      print(key){
        let title = this.pageTitle
        let header = laporan.headStokBarang
        let item = this.dataItem
        functions.print(key, title, header, item)
      },
      filterdata() {
        let awal = this.filtered.periode[0]
        let akhir = this.filtered.periode[1]
        this.periode[0] = new Date(awal).toJSON().slice(0, 10)
        this.periode[1] = new Date(akhir).toJSON().slice(0, 10)
        this.selectCategory = this.filtered.kategori_barang
        this.fetchData()
        if(!this.selectCategory) {
          this.selectCategory = []
        } else if (this.selectCategory == []) {
          this.selectCategory = []
        }
        this.group_barang = this.filtered.group_barang
        this.kode_barang = this.filtered.kode_barang
      },
      reset() {
        this.periode = [this.tglawal(), functions.day()]
        this.filtered.periode = [this.tglawal(), functions.day()]
        this.filtered.group_barang = []
        this.filtered.kode_barang = []
        this.filtered.kategori_barang = []
        this.selectCategory = []
        this.group_barang = []
      },
    },
    mounted() {
      this.fetchData()
      this.pages()
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
      <!-- KATEGORI BARANG -->
      <v-span class="text-caption text-weight-bold">Kategori Barang</v-span>
      <v-divider class="mb-6"></v-divider>
      <checkBox
        v-for="label, i in barang.category"
        :key="i"
        v-model="filtered.kategori_barang"
        :label="label"
        :value="label"
      />      
      <!-- TIPE DOKUMEN -->
      <v-span class="text-caption text-weight-bold">Kode Group</v-span>
      <v-divider></v-divider>
      <v-combobox
        :items="kodeGroup"
        v-model="filtered.group_barang"
        multiple
        variant="underlined"
        density="compact"
        class="overflow-auto"
        hide-details
        single-line
        hide-selected
        chips
        closable-chips
      ></v-combobox>
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
            <v-btn variant="text" color="blue-custom" icon="mdi-reload" size="small" class="rounded-circle" @click="fetchData()"></v-btn>
          </div>
        </v-responsive>
        </v-row>
        <!-- TABEL -->
        <TableVue
        :window="window"
        id="tbl_exporttable_to_xls"
        :groupbarang="items"
        :stok="laporan.detail(databarang, items)"
        :barang="databarang"
        :logbrg="logbrg"
        :headers="laporan.headStokBarang"
        :items="dataItem"
        :search="search"
        :category="barang.category"
        :selectCategory="selectCategory"
        :laporanstok="true"
        />
  </v-container>
  <circular-loader :loading="loading" />
</template>
<style>
</style>