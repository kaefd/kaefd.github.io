<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
import barang from '../service/page/barang';
import otoritas from '../service/page/otoritas';
// component
import TableVue from '../components/TableVue.vue';
import btnFilter from '../components/button/btnFilter.vue';
import menuList from '../components/menu/menuList.vue';
import textField from '../components/form/textField.vue';
import checkBox from '../components/form/checkBox.vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import alertVue from '../components/dialog/alertVue.vue';
import dialogMaster from '../components/dialog/dialogMaster.vue';
// plugin
import { defineComponent } from 'vue';
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
    alertVue,
  },
    name: 'DataBarang',
    props:['cetak', 'tema', 'user'],
    data () {
      return {
        dialog: false,
        valert: false,
        status: null,
        authority: '',
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
          status: 1
        },
        filtered: {
          kategori_barang: []
        },
      }
    },
    methods: {
      async fetchData() {
        if(this.user != '') {
          this.items = await api.getBarang()
          let user = await api.getOtoritas(this.user)
          this.authority = otoritas.otoritas(user)
        } else return this.$router.push('login')
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
              this.status = this.valert = true
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
        // EDIT DATA
      editForm(value) {
          api.putBarang(value)
          .then(() => {
            this.status = this.valert = true
            setTimeout(() => {
              this.valert = false
              this.$router.go();
            }, 2500);
            })
          .catch((error) => {
            this.status = false
            this.valert = true
            this.message = error.response.data
          })
      },
      // HAPUS DATA
      del(v) {
        api.deleteBarang(v)
        .then(() => {
          this.status = this.valert = true
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
          <!-- TAMBAH DATA BARU -->
          <dialogMaster
            v-if="otoritas.routes(authority, 'Tambah Barang Baru')"
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
          />
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
          :create="otoritas.routes(authority, 'Tambah Barang Baru')"
          :update="otoritas.routes(authority, 'Ubah Barang')"
          :delete="otoritas.routes(authority, 'Hapus Barang')"
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
  <!-- ALERT -->
  <alertVue v-model="valert" :sukses="status" :message="message"/>
  </template>