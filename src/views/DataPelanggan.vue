<script setup>
// SERVICE
import functions from '../service/functions';
// COMPONENTS
import { defineComponent } from 'vue';
import TableVue from '../components/TableVue.vue';
import DialogCard from '../components/DialogCard.vue';
import api from '../service/api';
import AppBar from '../components/AppBar.vue';
import menuList from '../components/menu/menuList.vue';
import textField from '../components/form/textField.vue'
</script>

<script>
  export default defineComponent ({
    name: 'CustomerView',
    props:['actIcon', 'cetak'],
    components: {
      TableVue,
      DialogCard,
      AppBar,
      menuList,
      textField,
    },
    data () {
      return {
        drawer: null,
        pageTitle: 'DATA PELANGGAN',
        statusselect: true,
        confirmdialog: false,
        search: '',
        alpha: 1,
        pilihcetak: '',
        category: [
          'Bahan Baku',
          'Bahan Penolong',
          'Barang Setengah Jadi',
          'Barang Jadi',
          'Barang Sisa (Scrap)',
          'Mesin & Peralatan',
        ],
        headers: [
          { title: 'Kode Pelanggan', key: 'kode_pelanggan', dis: true},
          { title: 'Nama', key: 'nama' },
          { title: 'Alamat', key: 'alamat' },
          { title: 'NPWP', key: 'npwp' },
          { title: '', key: 'actions', sortable: false},
        ],
        items:'',
        keyform: [
          'kode_pelanggan',
          'nama',
          'alamat',
          'npwp',
          'status'
        ],
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
        api.getData('/pelanggan?status=true')
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
      submitForm(value) {
      const myJSON = JSON.stringify(value);
        api.postData( '/pelanggan', {
          pelanggan : myJSON
        })
        .then((response) => {
            this.successAlert(response.data)
            window.location.href = '/pelanggan'
          })
          .catch((error) => {
            this.failedAlert(error.response.data)
          })
      },
      // EDIT DATA
      editForm(value) {
      console.log(value);
      const myJSON = JSON.stringify(value);
        api.putData('/pelanggan', {
          pelanggan : myJSON
        })
        .then(function (response) {
          this.successAlert(response.data)
          })
          .catch(function (error) {
            this.failedAlert(error.response.data);
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
        // api.deleteData('/pelanggan', {
        //   pelanggan : myJSON
        // })
      }
    },
    mounted(){
      this.page()
    }
  })

</script>
<template>
  <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="mt-n4 mb-2">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1" min-width="200">
      <div class="d-flex align-center w-100">
      <!-- TAMBAH DATA -->
      <DialogCard :keyform="keyform" :tambah="tambah" :ishidden="true" :noselect="statusselect"  @form="submitForm" :screen="400" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :headers="headers" :items="items" :category="category"  :alpha="alpha"/>
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
    <TableVue :keyform="keyform" :noselect="statusselect" @edit="editForm" @del="del" id="tbl_exporttable_to_xls" :screen="400"  :headers="headers" :items="items" :search="search" :category="category" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" :form="form"/>
  </v-container>
  </template>

<style>

.w-30 {
  max-width: 32vw;
}
.w-15 {
  width: 15vw !important;
}
</style>