<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
import supplier from '../service/page/supplier'
// COMPONENTS
import TableVue from '../components/TableVue.vue';
import menuList from '../components/menu/menuList.vue';
import textField from '../components/form/textField.vue';
</script>
<script>
  export default {
    props:['actIcon', 'cetak'],
    components: {
    TableVue,
    menuList,
    textField,
},
    data () {
      return {
        drawer: false,
        pageTitle:'DATA SUPPLIER',
        search: '',
        alpha: 0,
        items: '',
        tambah: {
          kode_supplier: '',
          nama: '',
          alamat: '',
          kota: '',
          negara: '',
          status: true
        }
      }
    },
    methods:{
      async fetchData() {
        try {
          const item = await api.getSupplier()
          this.items = item;
        } catch (error) {
          console.log(error);
        }
      },
      page(){
        return this.$emit('page', this.pageTitle)
      },
      print(key){
        let title = this.pageTitle
        let header = this.headers
        let item = this.items
        functions.print(key, title, header, item)
      }
    },
    mounted(){
      this.page()
      this.fetchData()
    }
  }  
</script>
<template>
<v-container class="h-100 pt-9">
  <v-row no-gutters class="mt-n4 mb-2">
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
    </div>
    </v-responsive>
    </v-row>
    <!-- VIEW -->
    <TableVue :keyform="supplier.data().keyform" :ishidden="true" :disabled="true" :noselect="true" id="tbl_exporttable_to_xls" :screen="400" :headers="supplier.data().headers" :items="items" :view="true" :search="search" toolbar_title="Detail Data" :btncolor="actIcon[3].color" :icon="actIcon[3].icon" :iVariant="actIcon[3].variant" :alpha="alpha" :pageTitle="pageTitle"/>
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