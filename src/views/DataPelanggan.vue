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
import btnCancel from '../components/button/btnCancel.vue';
import AlertVue from '../components/dialog/alertVue.vue';
</script>

<script>
  export default defineComponent ({
    name: 'CustomerView',
    props:['actIcon', 'cetak'],
    components: {
      TableVue,
      dialogMaster,
      menuList,
      textField,
      btnCancel,
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
        alpha: 1,
        items:'',
        dialog: false,
        tambah: {
          kode_pelanggan: '',
          nama: '',
          alamat: '',
          npwp: '',
          status: true
        }
      }
    },
    created() {
        api.getPelanggan()
        .then(response => {
          this.items = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
    },
    methods: {
      page(){
        return this.$emit('page', this.pageTitle)
      },
      print(key){
        let title = this.pageTitle
        let header = this.headers
        let item = this.items
        functions.print(key, title, header, item)
      },
      // TAMBAH DATA
      submitForm() {
      // const myJSON = JSON.stringify(value);
      //   api.postPelanggan()
      //   .then((response) => {
      //       this.successAlert(response.data)
      //       window.location.href = '/pelanggan'
      //     })
      //     .catch((error) => {
      //       this.failedAlert(error.response.data)
      //     })
      api.postPelanggan()
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
        api.putPelanggan(value)
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
          this.message =  error.response.data
          this.valert = true
        })
      },
      // HAPUS DATA
      del(value) {
      this.pelanggan = {
        kode_pelanggan : value.kode_pelanggan,
        nama : value.kode_pelanggan,
        alamat: value.alamat,
        npwp: value.npwp,
        status: false,
      }
      const myJSON = JSON.stringify(this.pelanggan);
        console.log({
          pelanggan : myJSON
        });
        api.deleteData('/pelanggan', {
          pelanggan : myJSON
        })
      }
    },
    mounted(){
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
      v-model="dialog"
      :keyform="pelanggan.data().keyform"
      :tambah="tambah"
      :ishidden="true"
      :noselect="statusselect"
      @form="submitForm"
      :toolbar_title="actIcon[0].text"
      :btncolor="actIcon[0].color"
      :icon="actIcon[0].icon"
      :iVariant="actIcon[0].variant"
      :headers="pelanggan.data().headers"
      :items="items"
      :category="category"
      :alpha="alpha">
        <template #cancel>
          <btnCancel @click=" dialog = false" btn_title="Batal" />  
        </template>
      </dialogMaster>
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
    <TableVue :keyform="pelanggan.data().keyform" :noselect="statusselect" @edit="editForm" @del="del" id="tbl_exporttable_to_xls" :screen="400"  :headers="pelanggan.data().headers" :items="items" :search="search" :category="category" toolbar_title="Edit Data" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" :form="form" :pageTitle="pageTitle"/>
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