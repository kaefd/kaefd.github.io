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
    props:['cetak'],
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
      }
    },
    methods:{
      async fetchData() {
        this.items = await api.getSupplier()
      },
      page(){
        return this.$emit('page', this.pageTitle)
      },
      print(key){
        let title = this.pageTitle
        let header = supplier.headers
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
    <TableVue
      :keyform="supplier.keyform"
      :ishidden="true"
      :disabled="true"
      :noselect="true"
      id="tbl_exporttable_to_xls"
      :screen="400"
      :headers="supplier.headers"
      :items="items"
      :view="true"
      :search="search"
      toolbar_title="Detail Data"
      :pageTitle="pageTitle"/>
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