<script setup>
// SERVICE
import functions from '../service/functions';
import pelanggan from '../service/page/pelanggan';
// COMPONENTS
import { defineComponent } from 'vue';
import TableVue from '../components/TableVue.vue';
import dialogMaster from '../components/dialog/dialogMaster.vue';
import api from '../service/api';
import menuList from '../components/menu/menuList.vue';
import textField from '../components/form/textField.vue'
import AlertVue from '../components/dialog/alertVue.vue';
import otoritas from '../service/page/otoritas';
</script>

<script>
  export default defineComponent ({
    name: 'CustomerView',
    props:['cetak', 'user', 'window'],
    components: {
      TableVue,
      dialogMaster,
      menuList,
      textField,
      AlertVue
    },
    data () {
      return {
        pageTitle: 'DATA PELANGGAN',
        statusselect: true,
        status: '',
        message: '',
        valert: false,
        search: '',
        items:'',
        dialog: false,
        akses: '',
        authority: '',
        tambah: {
          kode_pelanggan: '',
          nama: '',
          alamat: '',
          npwp: '',
          status: 'true'
        }
      }
    },
    methods: {
      async fetchData() {
        let user = localStorage.getItem('user')
        if(user != '') {
         this.akses = await api.getOtoritas(user)
          this.authority = otoritas.otoritas(this.akses)
        }
        if(otoritas.routes(this.akses, 'Data Pelanggan')) {
          this.items = await api.getPelanggan()
        } else return  await api.logout()
      },
      page(){
        return this.$emit('page', this.pageTitle)
      },
      print(key){
        let title = this.pageTitle
        let header = pelanggan.headers
        let item = this.items
        functions.print(key, title, header, item)
      },
      // TAMBAH DATA
      submitForm(value) {
        api.postPelanggan(value)
        .then(() => {
          this.status = true
          this.valert = true
          this.message = "Data Berhasil Ditambahkan"
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
      editForm() {
        let data = {
          "kode_pelanggan": "ASMT",
          "nama": "Auristeel Metalindo Terboyo",
          "alamat": "Semarang",
          "npwp": "0.0.0.0",
          "status": "true"
        }
        api.putPelanggan(data)
        .then(() => {
          this.status = true
          this.valert = true
          this.message = "Data Berhasil Diubah"
          setTimeout(() => {
            this.valert = false
            // this.$router.go();
          }, 2500);
        })
        .catch(function (error) {
          this.status = false
          this.message =  error.response.data
          this.valert = true
        })
      },
      // HAPUS DATA
      del(value) {
        api.deletePelanggan(value)
        .then(() => {
          this.status = true
          this.valert = true
          this.message = "Data Berhasil Dihapus"
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
      }
    },
    mounted(){
      this.fetchData()
      this.page()
    }
  })
</script>
<template>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="mt-n4 mb-2">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1" min-width="200">
      <div class="d-flex align-center w-100">
      <!-- TAMBAH DATA -->
      <dialogMaster
        v-if="otoritas.routes(authority, 'Tambah Pelanggan Baru')"
        :keyform="pelanggan.keyform"
        :tambah="tambah"
        :ishidden="true"
        :noselect="statusselect"
        @form="submitForm"
        :headers="pelanggan.headers"
        :items="items"
        :category="category"
        toolbar_title="Tambah Data"
      />
    </div>
    </v-responsive>
    <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" max-width="450">
      <div class="d-flex align-center justify-sm-end justify-start">
        <!-- SEARCH -->
        <textField  v-model="search" placeholder="Search" icon="mdi-magnify" class="me-2"/>
        <!-- EXPORT DATA -->
        <menuList
          icon="mdi-dots-vertical"
          :items="cetak"
          @result="print"
        />
      </div>
    </v-responsive>
    </v-row>
    <!-- edit -->
    <TableVue
      id="tbl_exporttable_to_xls"
      :create="otoritas.routes(authority, 'Tambah Pelanggan Baru')"
      :update="otoritas.routes(authority, 'Ubah Pelanggan')"
      :hapus="otoritas.routes(authority, 'Hapus Pelanggan')"
      :window="window"
      :keyform="pelanggan.keyform"
      :noselect="statusselect"
      @edit="editForm"
      @del="del"
      :headers="pelanggan.headers"
      :items="items"
      :search="search"
      :category="category"
      toolbar_title="Edit Data"
      :form="form"
      :pageTitle="pageTitle"
    />
  </v-container>
  <AlertVue v-model="valert" :sukses="status" :message="message"/>
  </template>

<style>

.w-30 {
  max-width: 32vw;
}
.w-15 {
  width: 15vw !important;
}
</style>