<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
import barang from '../service/page/barang';
// component
import TableVue from '../components/TableVue.vue';
import btnFilter from '../components/button/btnFilter.vue';
import menuList from '../components/menu/menuList.vue';
import textField from '../components/form/textField.vue';
import checkBox from '../components/form/checkBox.vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import btnCancel from '../components/button/btnCancel.vue';
import alertVue from '../components/dialog/alertVue.vue';
// plugin
import { defineComponent } from 'vue';
import dialogMaster from '../components/dialog/dialogMaster.vue';
</script>

<script>
export default defineComponent ({
  components: {
    dialogMaster,
    TableVue,
    btnFilter,
    menuList,
    textField,
    checkBox,
    filterDrawer,
    btnCancel,
    alertVue,
  },
    name: 'DataBarang',
    props:['actIcon', 'cetak'],
    data () {
      return {
        dialog: false,
        valert: false,
        status: null,
        message: '',
        search: '',
        filter: false,
        pageTitle: 'DATA BARANG',
        selectCategory: [],
        statusselect: false,
        items: '',
        tambah: {
          kategori_barang: '',
          kode_barang: '',
          nama_barang: '',
          hs_code:'',
          satuan: '',
          status: true
        },
        filtered: {
          kategori_barang: []
        },
      }
    },
    methods: {
    async fetchData() {
      try {
        const item = await api.getBarang()
        this.items = await barang.barang(item)
      } catch (error) {
        return this.$router.push('login')
      }
    },
    close(v) {
      return this.filter = v
    },
    print(key){
      let title = this.pageTitle
      let header = barang.headers
      let item = this.items
      functions.print(key, title, header, item)
    },
    // TAMBAH DATA
    submit(value) {
        api.postBarang(value)
        .then(() => {
            this.status = true
            this.valert = true
            setTimeout(() => {
              this.valert = false
              this.$router.go();
            }, 2500);
          })
          .catch((error) => {
            this.status = false
            this.message =  error.response.data
            this.valert = true
          })
    },
      // EDIT DATA
    editForm(value) {
        api.putBarang(value)
        .then(() => {
          this.status = true
          this.valert = true
          setTimeout(() => {
            this.valert = false
            this.$router.go();
          }, 2500);
          })
        .catch((error) => {
          this.status = false
          this.message = error.response.data
          this.valert = true
        })
    },
    // HAPUS DATA
    del(v) {
      let barang = {
              kategori_barang : v.kategori_barang,
              kode_barang : v.kode_barang,
              nama_barang: v.nama_barang,
              hs_code: v.hs_code,
              satuan: v.satuan,
              status: false,
      }
      const jsonBarang = JSON.stringify(barang);
      console.log(jsonBarang);
        api.deleteData('/barang', {
          barang : jsonBarang
        })
        .then(() => {
          this.status = true
          this.valert = true
          setTimeout(() => {
            this.valert = false
            this.$router.go();
          }, 2500);
        })
        .catch(function (error) {
          this.status = false
          this.message = error.response.data
          this.valert = true
        })
    },
    page(){
        return this.$emit('page', this.pageTitle)
    },
    filterdata() {
      this.selectCategory = this.filtered.kategori_barang
      if(!this.selectCategory) {
        this.selectCategory = []
        } else if (this.selectCategory == []) {
          this.selectCategory = []
        }
    },
    reset() {
      this.filtered.kategori_barang = []
      this.selectCategory = []
    },
    },
    mounted() {
      this.fetchData()
      this.page()
      this.cetak
    }
      
  })

</script>
<template>
  
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <v-span class="text-caption text-weight-bold">Kategori Barang</v-span>
      <v-divider class="mb-6"></v-divider>
      <checkBox
        v-for="label, i in barang.category"
        :key="i"
        v-model="filtered.kategori_barang"
        :label="label"
        :value="label"
      />
    </template>
  </filterDrawer>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="mb-2 mt-n4">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1" min-width="200">
        <div class="d-flex align-center w-100">
          <!-- ADD BUTTON -->
          <dialogMaster
            v-model="dialog"
            toolbar_title="Tambah Data"
            :keyform="barang.keyform"
            :tambah="tambah"
            :ishidden="true"
            :noselect="statusselect"
            @form="submit"
            :screen="400"
            :headers="barang.headers"
            :items="items"
            :category="barang.category"
            :submitForm="submitForm"
          >
            <template #cancel>
              <btnCancel @click="dialog = false" btn_title="Batal" />  
            </template>
          </dialogMaster>
        </div>
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" max-width="450">
        <div class="d-flex align-center justify-sm-end justify-start">
          <!-- SEARCH -->
          <textField  v-model="search" placeholder="Search" class="me-2"/>
          <!-- EXPORT DATA -->
          <menuList
            :items="cetak"
            @result="print"
          />
          <!-- BUTTON FILTER -->
          <btnFilter @click="filter = !filter" />
          </div>
      </v-responsive>
    </v-row>
        <!-- TABLE -->
        <TableVue
        :keyform="barang.keyform"
        :noselect="statusselect"
        @edit="editForm"
        @del="del"
        id="tbl_exporttable_to_xls"
        :headers="barang.headers"
        :items="barang.selected(selectCategory,
        items)"
        :search="search"
        :category="barang.category"
        :selectCategory="selectCategory"
        toolbar_title="Edit Data"
        :form="form"
        :pageTitle="pageTitle"
        />
  </v-container>

  <alertVue v-model="valert" :sukses="status" :message="message"/>
  </template>
  <style>
  
  </style>