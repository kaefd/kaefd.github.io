<script setup>
// service
import api from '../service/api'
import functions from '../service/functions'
import barang from '../service/page/barang'
import otoritas from '../service/page/otoritas'
// component
import TableVue from '../components/TableVue.vue'
import btnFilter from '../components/button/btnFilter.vue'
import menuList from '../components/menu/menuList.vue'
import textField from '../components/form/textField.vue'
import filterDrawer from '../components/drawer/filterDrawer.vue'
import alertVue from '../components/dialog/alertVue.vue'
import dialogMaster from '../components/dialog/dialogMaster.vue'
import circularLoader from '../components/animate/circularLoader.vue'
// plugin
import { defineComponent } from 'vue'
</script>

<script>
export default defineComponent({
  components: {
    dialogMaster,
    TableVue,
    btnFilter,
    menuList,
    textField,
    filterDrawer,
    alertVue,
    circularLoader
  },
  name: 'BarangKonversi',
  props: ['cetak', 'tema', 'window'],
  data() {
    return {
      dialog: false,
      valert: false,
      status: null,
      loading: true,
      authority: '',
      akses: '',
      message: '',
      search: '',
      filter: false,
      pageTitle: 'BARANG KONVERSI',
      pilihKodeBarang: [],
      statusselect: false,
      items: '',
      fresh: false,
      kodebarang: '',
      headers: [
        {title: 'Kode Barang', key: 'kode_barang'},
        {title: 'Kode Konversi', key: 'kode_konversi'},
        {title: 'Nama Konversi', key: 'nama_konversi'},
        {title: 'Satuan Konversi', key: 'satuan_konversi'},
        {title: 'Berat', key: 'berat'},
        {key: 'actions', sortable: false},
      ],
      keyform: [
        'kode_barang',
        'kode_konversi',
        'nama_konversi',
        'satuan_konversi',
        'berat',
        'status',
      ],
      tambah: {
        kode_barang: '',
        kode_konversi: '',
        nama_konversi: '',
        satuan_konversi: '',
        berat: '',
        status: 'true'
      },
      filtered: {
        kode_barang: []
      }
    }
  },
  methods: {
    async fetchData() {
      let user = localStorage.getItem('user')
      if (user != null) {
        this.akses = await api.getOtoritas(user)
        this.authority = otoritas.otoritas(this.akses)
      }
      if (otoritas.routes(this.akses, 'Barang Konversi')) {
        this.loading = true
        this.items = await api.getKonversi()
        let brg = await api.getBarang()
        this.kodebarang = barang.kodebarang(brg)
        this.loading = false
      } else return await api.logout()
    },
    close(v) {
      return (this.filter = v)
    },
    print(key) {
      let title = this.pageTitle
      let header = this.headers
      let item = this.items
      functions.print(key, title, header, item)
    },
    // TAMBAH DATA
    submit(value) {
      api
        .postKonversi(value)
        .then(() => {
          this.status = this.valert = true
          this.message = 'Data Berhasil Ditambahkan'
          setTimeout(() => {
            this.valert = false
            this.fetchData()
          }, 2500)
        })
        .catch((error) => {
          this.status = false
          this.valert = true
          this.message = error.response.data
        })
    },
    // EDIT DATA
    editForm(value) {
      api
        .putKonversi(value)
        .then(() => {
          this.status = this.valert = true
          this.message = 'Data Berhasil Diubah'
          setTimeout(() => {
            this.valert = false
            // this.fetchData();
            this.fetchData()
          }, 2500)
        })
        .catch((error) => {
          this.status = false
          this.valert = true
          this.message = error.response.data
        })
    },
    // HAPUS DATA
    del(v) {
      api
        .deleteKonversi(v)
        .then(() => {
          this.status = this.valert = true
          this.message = 'Data Berhasil Dihapus'
          setTimeout(() => {
            this.valert = false
            this.fetchData()
          }, 2500)
        })
        .catch(function (error) {
          this.status = false
          this.message = error.response.data
          this.valert = true
        })
    },
    page() {
      return this.$emit('page', this.pageTitle)
    },
    filterdata() {
      this.pilihKodeBarang = this.filtered.kode_barang
      if (!this.pilihKodeBarang) {
        this.pilihKodeBarang = []
      } else if (this.pilihKodeBarang == []) {
        this.pilihKodeBarang = []
      }
    },
    reset() {
      this.filtered.kode_barang = []
      this.pilihKodeBarang = []
    }
  },
  mounted() {
    this.page()
    this.fetchData()
    this.cetak
  }
})
</script>
<template>
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <v-span class="text-caption text-weight-bold">Kode Barang</v-span>
      <v-divider class="mb-6"></v-divider>
      <!-- <checkBox
        v-for="(label, i) in barang.category"
        :key="i"
        v-model="filtered.kategori_barang"
        :label="label"
        :value="label"
      /> -->
      <v-combobox
        :items="kodebarang"
        v-model="filtered.kode_barang"
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
      <v-responsive class="d-flex align-center mb-sm-0 mb-1" min-width="200">
        <div class="d-flex align-center w-100">
          <!-- TAMBAH DATA BARU -->
          <dialogMaster
            v-if="otoritas.routes(authority, 'Tambah Barang Konversi')"
            toolbar_title="Tambah Barang Konversi"
            :keyform="keyform"
            :tambah="tambah"
            :ishidden="true"
            :noselect="statusselect"
            @form="submit"
            :screen="400"
            :headers="headers"
            :items="items"
            :category="kodebarang"
          />
        </div>
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" max-width="450">
        <div class="d-flex align-center justify-sm-end justify-start">
          <!-- SEARCH -->
          <textField v-model="search" placeholder="Search" class="me-2" />
          <!-- EXPORT DATA -->
          <menuList
            v-if="otoritas.routes(authority, 'Pengaturan Umum')"
            :otority="authority"
            :items="cetak"
            @result="print"
          />
          <!-- BUTTON FILTER -->
          <btnFilter @click="filter = !filter" />
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
    <!-- TABLE -->
    <TableVue
      :create="otoritas.routes(authority, 'Tambah Barang Konversi')"
      :update="otoritas.routes(authority, 'Ubah Barang Konversi')"
      :hapus="otoritas.routes(authority, 'Hapus Barang Konversi')"
      :window="window"
      :keyform="keyform"
      :noselect="statusselect"
      @edit="editForm"
      @del="del"
      id="tbl_exporttable_to_xls"
      :headers="headers"
      :items="items"
      :search="search"
      :category="kodebarang"
      :selectCategory="pilihKodeBarang"
      toolbar_title="Edit Data"
      :pageTitle="pageTitle"
    />
  </v-container>
  <!-- ALERT -->
  <alertVue v-model="valert" :sukses="status" :message="message" />
  <circular-loader :loading="loading" />
</template>