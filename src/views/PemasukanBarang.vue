<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
import otoritas from '../service/page/otoritas';
import pemasukan from '../service/page/pemasukan';
// components
import TableVue from '../components/TableVue.vue';
import PemasukanDetail from './PemasukanDetail.vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import btnFilter from '../components/button/btnFilter.vue';
import textField from '../components/form/textField.vue';
import menuList from '../components/menu/menuList.vue';
import checkBox from '../components/form/checkBox.vue';
import dialogConfirm from '../components/dialog/dialogConfirm.vue';
import { ref, onMounted } from 'vue';
import DatePicker from '../components/datepicker/datePicker.vue';
import BtnOrange from '../components/button/btnOrange.vue';
import BtnCancel from '../components/button/btnCancel.vue';
import AlertVue from '../components/dialog/alertVue.vue';

</script>

<script>
export default {
    components: {
    PemasukanDetail,
    dialogConfirm,
    TableVue,
    filterDrawer,
    textField,
    menuList,
    checkBox,
    DatePicker,
    BtnOrange,
    BtnCancel,
    AlertVue
  },
    props:['cetak', 'tema', 'window'],
    data () {
      return {
        search: '',
        periode: [],
        filter: false,
        confirmdialog: false,
        status: null,
        valert: false,
        authority: '',
        message: '',
        pageTitle: 'PEMASUKAN BARANG',
        btn: 'Tambah Barang',
        sortBy: [{ key: 'no_pembelian', order: 'desc' }],
        selectdokumen: [],
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        barang: '',
        pemasukan_item: '',
        pembelian_head: '',
        pdetail: '',
        items: '',
        supplier: '',
        pembeliandetl: '',
        filtered: {
          selectdokumen: [],
          periode: []
        },
        details: [],
      }
    },
    created() {
       this.periode = [functions.tglawal(), functions.day()]
       this.filtered.periode = [functions.tglawal(), functions.day()]
    },
    methods: {
      page(){
        return this.$emit('page', this.pageTitle)
      },
      async fetchData() {
        let user = localStorage.getItem('user')
        if(user != null) {
          let otority = await api.getOtoritas(user)
          this.authority = otoritas.otoritas(otority)
        }
        if(this.authority != '') {
          this.items = await api.getPemasukanHead(this.periode)
          this.supplier = await api.getSupplier()
          this.pembeliandetl = await api.getPemasukanDetail(this.periode)
          this.barang = await api.getBarang()
        } else  await api.logout()
      },
      // TAMBAH DATA
      inputhead(value, valuedetail) {
        api.postPemasukan(value, valuedetail)
        .then(() => {
          this.status = this.valert = true
          this.message = "Data Berhasil Ditambahkan"
          setTimeout(() => {
            this.valert = false
            this.$router.go();
          }, 2500);
        })
        .catch((error) => {
          this.status = false
          this.valert = true
          this.message =  error.response.data
        })
      },
      // HAPUS DATA
      del() {
        api.deletePemasukan(this.pembelian_head, this.pdetail)
        .then(() => {
          this.status = this.valert = true
          this.message = "Data Berhasil Dibatalkan"
          setTimeout(() => {
            this.valert = false
            this.$router.go();
          }, 2500);
        })
        .catch((error) => {
          this.status = false
          this.valert = true
          this.message =  error.response.data
        })
      },
      confirm(head, detail){
        this.confirmdialog = true
        this.pembelian_head = head
        this.pdetail = detail
      },
      // inisialisasi
      selected(){ 
        this.fetchData()
      },
      // GET DATA PEMBELIAN-DETAIL
      close(v) {
      return this.filter = v
      },
      print(key){
        let title = this.pageTitle
        let header = pemasukan.headers
        let item = pemasukan.pilihtipe(this.selectdokumen, this.items, this.supplier)
        functions.print(key, title, header, item)
      },
      reset() {
        this.def = true
        this.periode = [functions.tglawal(), functions.day()]
        this.filtered.periode = [functions.tglawal(), functions.day()]
        this.filtered.selectdokumen = []
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
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-label class="text-small mt-4">Tgl Awal</v-label>
      <DatePicker v-model="filtered.periode[0]" :max-date="new Date()" :filter="true" :tema="tema"/>
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <DatePicker v-model="filtered.periode[1]" :min-date="filtered.periode[0]" :filter="true" :tema="tema"/>
      <!-- TIPE DOKUMEN -->
      <v-span class="text-caption text-weight-bold">Tipe Dokumen</v-span>
      <v-divider class="mb-6"></v-divider>
        <checkBox
          v-for="label, i in pemasukan.tipedokumen" :key="i"
          v-model="filtered.selectdokumen"
          :label="label"
          :value="label"
        />
    </template>
  </filterDrawer>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="mt-n4">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
          <div class="d-flex align-center w-100">
            <!-- ADD DATA -->
            <PemasukanDetail
            v-if="otoritas.routes(authority, 'Tambah Pembelian Baru')"
            :tema="tema"
            :barang="barang"
            batalbtn="Pemasukan"
            :datainput="pemasukan.datainput"
            @inputhead="inputhead"
            :pemasukan="true"
            :supplier="supplier"
            :edit="false"
            :itemDetail="itemDetail"
            :datatext="datatext"
            :btn="btn"
            :headDetails="pemasukan.headDetails"
            :details="details"
            :headers="pemasukan.headers"
            :items="pemasukan.pilihtipe(selectdokumen, items, supplier)"
            :pembeliandetl="pembeliandetl"
            :search="search"
            :category="pemasukan.tipedokumen"
            :selectCategory="selectCategory"
            :pageTitle="pageTitle"/>
          </div>
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" width="200" max-width="450">
        <div class="d-flex align-center justify-sm-end justify-start mt-md-1 mt-0">
          <!-- SEARCH -->
          <textField  v-model="search" placeholder="Search" icon="mdi-magnify" class="me-2"/>
          <!-- EXPORT DATA -->
          <menuList
            icon="mdi-dots-vertical"
            :items="cetak"
            @result="print"
          />
          <!-- BUTTON FILTER -->
          <btn-filter @click="filter = !filter" />
        </div>
      </v-responsive>
    </v-row>
        <TableVue
          :window="window"
          :sortby="pemasukan.sortBy"
          :hapus="otoritas.routes(authority, 'Batal Pembelian')"
          id="tbl_exporttable_to_xls"
          :items="pemasukan.pilihtipe(selectdokumen, items, supplier)"
          :search="search"
          :headers="pemasukan.headers"
          :masuk="true"
          :supplier="supplier"
          :pembeliandetl="pembeliandetl"
          @confirm="confirm"
          :pageTitle="pageTitle"
          class="mt-2"
        />
        <dialogConfirm v-model="confirmdialog" :object="pageTitle">
        <template #yesButton>
            <btn-orange @click="del(), confirmdialog = false" btn_title="Ya"/>
        </template>
        <template #cancelButton>
          <btn-cancel class="me-2" @click="confirmdialog = false" btn_title="Batal" />
        </template>
        </dialogConfirm>
        <alertVue v-model="valert" :sukses="status" :message="message"/>
  </v-container>
</template>