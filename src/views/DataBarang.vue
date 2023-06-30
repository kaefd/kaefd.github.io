<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
import barang from '../service/page/barang';
// component
import TableVue from '../components/TableVue.vue';
import DialogCard from '../components/dialog/DialogCard.vue';
import circleButton from '../components/button/circleButton.vue';
import AppBar from '../components/appbar/AppBar.vue';
import menuList from '../components/menu/menuList.vue';
import textField from '../components/form/textField.vue';
import checkBox from '../components/form/checkBox.vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
// plugin
import { defineComponent } from 'vue';
</script>

<script>
export default defineComponent ({
  components: {
    AppBar,
    TableVue,
    DialogCard,
    circleButton,
    menuList,
    textField,
    checkBox,
    filterDrawer,
  },
    name: 'DataBarang',
    props:['actIcon', 'cetak'],
    data () {
      return {
        search: '',
        filter: false,
        pageTitle: 'DATA BARANG',
        selectCategory: [],
        alpha: 1,
        statusselect: false,
        items: '',
        nama: '',
        tambah: {
            kategori_barang: '',
            kode_barang: '',
            nama_barang: '',
            hs_code: '',
            satuan: '',
            status: true,
          },
        filtered: {
          kategori_barang: []
        }
      }
    },
    created() {
      this.windowWidth
    },
    methods: {
    async fetchData() {
      try {
        const api = await import('../service/api');
        const barang = await import('../service/page/barang');

        const item = await api.default.getBarang();
        this.items = barang.default.barang(item);
      } catch (error) {
        console.log(error);
      }
    },
    close(v) {
      return this.filter = v
    },
    print(key){
      let title = this.pageTitle
      let header = barang.data().headers
      let item = this.items
      functions.print(key, title, header, item)
    },
    // TAMBAH DATA
    submitForm(value) {
        // api.postData( '/barang', {
        //   barang : value
        // })
        // .then(() => {
        //     return this.$router.push('items');
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
        api.postData(value)
        .then(() => {
            return this.$router.push('items');
          })
          .catch((error) => {
            console.log(error);
          })
    },
      // EDIT DATA
    editForm(value) {
      // const myJSON = JSON.stringify(value);
      //   api.putData('/barang', {
      //     barang : myJSON
      //   })
      //   .then(() => {
      //     return this.$router.push('items');
      //   })
      //     .catch((error) => {
      //       console.log(error);
      //   })
        api.putBarang(value)
        .then(() => {
          return this.$router.push('items');
        })
          .catch((error) => {
            console.log(error);
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
      console.log({
        barang : jsonBarang
      });
        // api.deleteData('/barang', {
        //   barang : myJSON
        // })
        // .then(() => {
        //   return this.$router.push('items');
        //   })
        // .catch(function (error) {
        //   console.log(error);
        // })
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
        v-for="label, i in barang.data().category"
        :key="i"
        v-model="filtered.kategori_barang"
        :label="label"
        :value="label"
      />
    </template>
  </filterDrawer>
  <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="mb-2 mt-n4">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1" min-width="200">
        <div class="d-flex align-center w-100">
          <!-- BUTTON FILTER -->
          <circleButton icon="mdi-tune-vertical" @click="filter = !filter" />
          <!-- ADD BUTTON -->
          <DialogCard :keyform="barang.data().keyform" :tambah="tambah" :ishidden="true" :noselect="statusselect" @form="submitForm" :screen="400" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :headers="barang.data().headers" :items="items" :category="barang.data().category" :alpha="alpha" :submitForm="submitForm"/>
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
        <!-- TABLE -->
        <TableVue :windowWidth="windowWidth" :keyform="barang.data().keyform" :noselect="statusselect" @edit="editForm" @del="del" id="tbl_exporttable_to_xls" :screen="400"  :headers="barang.data().headers" :items="barang.selected(selectCategory, items)" :search="search" :category="barang.data().category" :selectCategory="selectCategory" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" :form="form"/>
  </v-container>
  </template>
  <style>
  
  </style>