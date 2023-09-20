<script setup>
// service
import api from '../service/api'
import functions from '../service/functions'
import otoritas from '../service/page/otoritas'
import pemasukan from '../service/page/pemasukan'
// components
import TableVue from '../components/TableVue.vue'
import PemasukanDetail from './PemasukanDetail.vue'
import filterDrawer from '../components/drawer/filterDrawer.vue'
import btnFilter from '../components/button/btnFilter.vue'
import textField from '../components/form/textField.vue'
import menuList from '../components/menu/menuList.vue'
import checkBox from '../components/form/checkBox.vue'
import dialogConfirm from '../components/dialog/dialogConfirm.vue'
import DatePicker from '../components/datepicker/datePicker.vue'
import BtnOrange from '../components/button/btnOrange.vue'
import BtnCancel from '../components/button/btnCancel.vue'
import AlertVue from '../components/dialog/alertVue.vue'
import CircularLoader from '../components/animate/circularLoader.vue'
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
    AlertVue,
    CircularLoader
  },
  props: ['cetak', 'tema', 'window', 'windowH'],
  data() {
    return {
      search: '',
      periode: [],
      filter: false,
      confirmdialog: false,
      loading: true,
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
      dataitems: '',
      supplier: '',
      pembeliandetl: '',
      filtered: {
        selectdokumen: [],
        periode: []
      },
      details: []
    }
  },
  created() {
    this.periode = [functions.tglawal(), functions.day()]
    this.filtered.periode = [functions.tglawal(), functions.day()]
  },
  methods: {
    page() {
      return this.$emit('page', this.pageTitle)
    },
    async fetchData() {
      let user = localStorage.getItem('user')
      if (user != null) {
        let otority = await api.getOtoritas(user)
        this.authority = otoritas.otoritas(otority)
      }
      if (this.authority != '') {
        this.loading = true
        this.items = await api.getPemasukanHead(this.periode)
        this.supplier = await api.getSupplier()
        this.pembeliandetl = await api.getPemasukanDetail(this.periode)
        this.barang = await api.getBarang()
        this.dataitems = pemasukan.pilihtipe(this.selectdokumen, this.items, this.supplier, this.pembeliandetl, this.barang)
        this.loading = false
      } else await api.logout()
    },
    // TAMBAH DATA
    inputhead(value, valuedetail) {
      api
        .postPemasukan(value, valuedetail)
        .then(() => {
          this.message = 'Data Berhasil Ditambahkan'
          this.status = this.valert = true
          setTimeout(() => {
            this.valert = false
            this.$router.go()
          }, 2500)
        })
        .catch((error) => {
          this.status = false
          this.valert = true
          this.message = error.response.data
        })
    },
    // HAPUS DATA
    del() {
      api
        .deletePemasukan(this.pembelian_head, this.pdetail)
        .then(() => {
          this.message = 'Data Berhasil Dibatalkan'
          this.status = this.valert = true
          setTimeout(() => {
            this.valert = false
            this.$router.go()
          }, 2500)
        })
        .catch((error) => {
          this.status = false
          this.message = error.response.data
          this.valert = true
        })
    },
    confirm(head, detail) {
      this.confirmdialog = true
      this.pembelian_head = head
      this.pdetail = detail
    },
    // inisialisasi
    selected() {
      this.fetchData()
    },
    // GET DATA PEMBELIAN-DETAIL
    close(v) {
      return (this.filter = v)
    },
    print(key) {
      let title = this.pageTitle
      let header = pemasukan.headers
      let item = this.dataitems
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
      let awal = this.filtered.periode[0]
      let akhir = this.filtered.periode[1]
      this.periode[0] = new Date(awal).toJSON().slice(0, 10)
      this.periode[1] = new Date(akhir).toJSON().slice(0, 10)
      this.selected()
      this.selectdokumen = this.filtered.selectdokumen
      if (!this.selectdokumen) {
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
</script>

<template>
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-label class="text-small mt-4">Tgl Awal</v-label>
      <DatePicker
        teleport-center
        v-model="filtered.periode[0]"
        :max-date="new Date()"
        :filter="true"
        :tema="tema"
      />
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <DatePicker
        teleport-center
        class="mb-4"
        v-model="filtered.periode[1]"
        :min-date="filtered.periode[0]"
        :filter="true"
        :tema="tema"
      />
      <!-- TIPE DOKUMEN -->
      <v-span class="text-caption text-weight-bold">Tipe Dokumen</v-span>
      <v-divider class="mb-6"></v-divider>
      <checkBox
        v-for="(label, i) in pemasukan.tipedokumen"
        :key="i"
        v-model="filtered.selectdokumen"
        :label="label"
        :value="label"
      />
    </template>
  </filterDrawer>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="mt-n4">
      <v-responsive
        class="d-flex align-center mb-sm-0 mb-1 me-sm-2 me-0"
        width="200"
        max-width="350"
      >
        <div class="d-flex align-center w-100">
          <!-- ADD DATA -->
          <PemasukanDetail
            :window="window"
            :windowH="windowH"
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
            :items="dataitems"
            :pembeliandetl="pembeliandetl"
            :search="search"
            :category="pemasukan.tipedokumen"
            :selectCategory="selectCategory"
            :pageTitle="pageTitle"
          />
        </div>
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" width="200" max-width="450">
        <div class="d-flex align-center justify-sm-end justify-start mt-md-1 mt-0">
          <!-- SEARCH -->
          <textField v-model="search" placeholder="Search" icon="mdi-magnify" class="me-2" />
          <!-- EXPORT DATA -->
          <menuList
            v-if="otoritas.routes(authority, 'Pengaturan Umum')"
            :otority="authority"
            icon="mdi-dots-vertical"
            :items="cetak"
            @result="print"
          />
          <!-- BUTTON FILTER -->
          <btn-filter @click="filter = !filter" />
          <v-btn
            variant="text"
            color="indigo"
            icon="mdi-reload"
            size="small"
            class="rounded-circle"
            @click="fetchData()"
          ></v-btn>
        </div>
      </v-responsive>
    </v-row>
    <TableVue
      :window="window"
      :windowH="windowH"
      :sortby="pemasukan.sortBy"
      :hapus="otoritas.routes(authority, 'Batal Pembelian')"
      :view_persentase="otoritas.routes(authority, 'Persentase')"
      id="tbl_exporttable_to_xls"
      :items="dataitems"
      :search="search"
      :headers="pemasukan.headers"
      :masuk="true"
      :supplier="supplier"
      :pembeliandetl="pembeliandetl"
      @confirm="confirm"
      :pageTitle="pageTitle"
      class="mt-2"
    />
    <dialogConfirm
      v-model="confirmdialog"
      :object="pageTitle"
      :item="pembelian_head.no_pembelian"
      mess="Membatalkan"
    >
      <template #yesButton>
        <btn-orange @click="del(), (confirmdialog = false)" btn_title="Ya" />
      </template>
      <template #cancelButton>
        <btn-cancel class="me-2" @click="confirmdialog = false" btn_title="Batal" />
      </template>
    </dialogConfirm>
    <alertVue v-model="valert" :sukses="status" :message="message" />
    <circular-loader :loading="loading" />
  </v-container>
</template>
