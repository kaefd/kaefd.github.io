<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
// components
import '@vuepic/vue-datepicker/dist/main.css'
import PengeluaranDetail from './PengeluaranDetail.vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import textField from '../components/form/textField.vue';
import menuList from '../components/menu/menuList.vue';
import checkBox from '../components/form/checkBox.vue';
import BtnFilter from '../components/button/btnFilter.vue';
import DatePicker from '../components/datepicker/datePicker.vue';
import otoritas from '../service/page/otoritas';
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
        filter:false,
        loading: true,
        authority: '',
        pageTitle: 'laporan pengeluaran barang',
        selectdokumen: [],
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        tipedokumen: [
          'BC25',
          'BC41',
        ],
        headers: [
          { title: 'Nomor Penjualan', key: 'no_penjualan'},
          { title: 'Tgl Penjualan', key: 'tgl_penjualan' },
          { title: 'Tipe Dokumen', key: 'tipe_dokumen' },
          { title: 'No Dokumen', key: 'no_dokumen' },
          { title: 'Tgl Dokumen', key: 'tgl_dokumen' },
          { title: 'Pelanggan', key: 'nama' },
          { title: 'Kode Group', key: 'kode_group' },
          { title: 'Kategori Barang', key: 'kategori_barang' },
          { title: 'Kode Barang', key: 'kode_barang' },
          { title: 'Nama Barang', key: 'nama_barang' },
          { title: 'HS Code', key: 'hs_code' },
          { title: 'Satuan', key: 'satuan' },
          { title: 'Jumlah', key: 'jumlah' },
          { title: '', key: 'actions', sortable: false},
        ],
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
        items: '',
        pjldetail: '',
        pelanggan: '',
        barang: '',
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
        if(user != null) {
          let otority = await api.getOtoritas(user)
          this.authority = otoritas.otoritas(otority)
        }
        if(this.authority != '') {
          this.loading = true
          this.items = await api.getPenjualanHead(this.periode)
          this.pjldetail = await api.getPenjualanDetail(this.periode)
          this.pelanggan = await api.getPelanggan()
          this.barang = await api.getBarang()
          this.loading = false
        } else return  await api.logout()
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
      page(){
        return this.$emit('page', this.pageTitle)
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
        for (let j = 0; j < this.pjldetail.length; j++) {
          if ( this.pjldetail[j].no_penjualan == value ) {
              p.push(this.pjldetail[j])
          }
        }
        return p
      },
      dataTable(value, col) {
        if(col === 'nama') {
          for (let i = 0; i < this.pelanggan.length; i++) {
            if(value == this.pelanggan[i].kode_pelanggan) {
              return this.pelanggan[i].nama
            }
          }
        }
        if(col == 'total') {
            return functions.numb(value)
        }
        if(col == 'kategori' || col == 'kodebrg' || col == 'namabrg' || col == 'hscode' || col == 'satuan' || col == 'jumlah') {
          for (let i = 0; i < this.pjldetail.length; i++) {
            for (let j = 0; j < this.barang.length; j++) {
              if(value == this.pjldetail[i].no_penjualan) {
                if(col == 'kodebrg') {
                  return this.pjldetail[i].kode_barang
                }
                else if (col == 'kategori'){
                  if(this.pjldetail[i].kode_barang == this.barang[j].kode_barang) {
                    return this.barang[j].kategori_barang
                  }
                }
                else if(col == 'namabrg') {
                  return this.pjldetail[i].nama_barang
                }
                else if(col == 'hscode') {
                  return this.pjldetail[i].hs_code
                }
                else if(col == 'satuan') {
                  return this.pjldetail[i].satuan
                }
                else if(col == 'jumlah') {
                  return functions.numb(this.pjldetail[i].jumlah)
                }
              }
            }
          }
        }
      },
      close(v) {
        return this.filter = v
      },
      print(key){
        let title = this.pageTitle
        let header = this.headers
        let item = this.printdata()
        functions.print(key, title, header, item)
      },
      printdata(){
        let a = []
        for (let i = 0; i < this.items.length; i++) {
          a.push({
            no_penjualan: this.items[i].no_penjualan,
            tgl_penjualan: this.items[i].tgl_penjualan,
            tipe_dokumen: this.items[i].tipe_dokumen,
            no_dokumen: this.items[i].no_dokumen,
            tgl_dokumen: this.items[i].tgl_dokumen,
            nama: this.dataTable(this.items[i].kode_pelanggan, 'nama'),
            kode_group: this.dataTable(this.items[i].no_penjualan, 'kodebrg'),
            kategori_barang: this.dataTable(this.items[i].no_penjualan, 'kategori'),
            nama_barang: this.dataTable(this.items[i].no_penjualan, 'namabrg'),
            hs_code: this.dataTable(this.items[i].no_penjualan, 'hscode'),
            satuan: this.dataTable(this.items[i].no_penjualan, 'satuan'),
            jumlah: this.dataTable(this.items[i].no_penjualan, 'jumlah'),
          })
        }
        return a
      },
      reset() {
        this.filtered.selectdokumen = []
        this.periode = [this.tglawal(), functions.day()]
        this.filtered.periode = [this.tglawal(), functions.day()]
        this.selectdokumen = []
        this.getPenjualan()
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
      this.updt()
    }
  }
</script>

<template>
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <!-- PERIODE -->
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
        <v-btn variant="text" color="blue-custom" icon="mdi-reload" size="small" class="rounded-circle" @click="fetchData()"></v-btn>
        </div>
      </v-responsive>
      </v-row>
      <!-- EDIT DATA -->
      <v-sheet :height="window > 776 ? '92%' : '87%'">
      <v-data-table
          id="tbl_exporttable_to_xls"
          :items-per-page="items.length"
          :items="pilihtipe()"
          :headers="headers"
          :search="search"
          :hover="true"
          :fixed-header="true"
          density="compact"
          class="text-caption pt-1 rounded-lg border-sm h-100"
          :height="window > 776 ? '100%' : '92%'"
          >
          <template #bottom>
            <div class="text-caption font-weight-bold w-100 text-right pe-3">Total : {{ items.length }} data</div>
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.tgl_penjualan="{item}">
              {{ functions.formatDate(item.raw.tgl_penjualan) }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.nama="{item}">
              {{ dataTable(item.raw.kode_pelanggan, 'nama') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.kategori_barang="{item}">
              {{ dataTable(item.raw.no_penjualan, 'kategori') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.kode_barang="{item}">
              {{ dataTable(item.raw.no_penjualan, 'kodebrg') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.nama_barang="{item}">
              {{ dataTable(item.raw.no_penjualan, 'namabrg') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.hs_code="{item}">
              {{ dataTable(item.raw.no_penjualan, 'hscode') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.satuan="{item}">
              {{ dataTable(item.raw.no_penjualan, 'satuan') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.jumlah="{item}">
            {{ dataTable(item.raw.no_penjualan, 'jumlah') }}
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.actions="{item}">
              <PengeluaranDetail :window="window" @confirm="confirm" batalbtn="Pengeluaran" :laporan="true" :namaPelanggan="namaPelanggan(item.raw.kode_pelanggan)" :penjualan="penjualan(item.raw.no_penjualan)" :edit="true" :pengeluaran="true" :pageTitle="pageTitle" :headDetails="headDetails" :items="item.raw" :details="details" :headers="headers" :search="search" :category="category" :selectCategory="selectCategory" :disable="true"/>
          </template>
        </v-data-table>
      </v-sheet>
    </v-container>
  <circular-loader :loading="loading" />
</template>
