<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
// components
import '@vuepic/vue-datepicker/dist/main.css'
import { VDataTable } from 'vuetify/labs/VDataTable'
import PemasukanDetail from './PemasukanDetail.vue';
import { ref, onMounted } from 'vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import textField from '../components/form/textField.vue';
import menuList from '../components/menu/menuList.vue';
import checkBox from '../components/form/checkBox.vue';
import BtnFilter from '../components/button/btnFilter.vue';
import DatePicker from '../components/datepicker/datePicker.vue';

</script>
<script>
  export default {
    components: {
      VDataTable,
      PemasukanDetail,
      filterDrawer,
      textField,
      menuList,
      checkBox,
        BtnFilter,
        DatePicker,
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
      this.periode = [this.tglawal(), functions.day()]
      this.filtered.periode = [this.tglawal(), functions.day()]
    },
    methods: {
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
        .catch(() => {
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
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getSupplier() {
        const apiUrl = '/supplier'
        api.getData(apiUrl)
        .then(response => {
          this.supplier = response.data
        })
        .catch(() => {
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
            return functions.numb(value)
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
        let item = this.printdata()
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
      this.updt()
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
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-label class="text-small mt-4">Tgl Awal</v-label>
      <DatePicker v-model="filtered.periode[0]" :filter="true"/>
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <DatePicker v-model="filtered.periode[1]" :filter="true" />
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
            icon="mdi-dots-vertical"
            :items="cetak"
            @result="print"
          />
        <!-- BUTTON FILTER -->
        <btn-filter icon="mdi-tune-vertical" @click="filter = !filter" />
          </div>
      </v-responsive>
      </v-row>
      <!-- EDIT DATA -->
      <v-sheet height="90%">
      <v-data-table
          id="tbl_exporttable_to_xls"
          items-per-page="10"
          :items="pilihtipe()"
          :headers="headers"
          :search="search"
          :hover="true"
          :fixed-header="true"
          density="compact"
          class="text-caption py-3 h-100"
          height="100%"
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
          <template v-slot:item.tgl_pembelian="{item}">
              {{ functions.formatDate(item.raw.tgl_pembelian) }}
          </template>
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
            <PemasukanDetail
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
