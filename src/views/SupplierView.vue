<script setup>
import TableVue from '../components/TableVue.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';

</script>
<script>
  export default {
    props:['actIcon'],
    components: {
    TableVue
},
    data () {
      return {
        drawer: false,
        pageTitle:'DATA SUPPLIER',
        search: '',
        alpha: 0,
        headers: [
          { title: 'Kode Supplier', align: 'start', key: 'suppCode'},
          { title: 'Nama', align: 'start', key: 'suppName' },
          { title: 'Alamat', align: 'start', key: 'address' },
          { title: 'Kota', align: 'start', key: 'city' },
          { title: 'Negara', align: 'start', key: 'country' },
          { title: '', align: 'start', key: 'actions', sortable: false },
        ],
        items: [
          {
            suppCode: '57554u',
            suppName: 159,
            address: 6.0,
            npwp: 24,
            city: 'Kendal',
            country: 'Indonesia'
          },
          {
            suppCode: 'Bahan Penolong',
            suppName: 375,
            address: 0.0,
            npwp: 94,
            city: 'Semarang',
            country: 'Indonesia'
          },
          {
            suppCode: 'Bahan Baku',
            suppName: 518,
            address: 26.0,
            npwp: 65,
            city: 'Jakarta',
            country: 'Indonesia'
          },
          {
            suppCode: 'Bahan  Setengah Jadi',
            suppName: 262,
            address: 16.0,
            npwp: 23,
            city: 'Solo',
            country: 'Indonesia'
          },
          {
            suppCode: 'Barang Sisa (Scrap)',
            suppName: 356,
            address: 16.0,
            npwp: 49,
            city: 'Sidney',
            country: 'Australia'
          },
          {
            suppCode: 'Bahan Baku',
            suppName: 237,
            address: 9.0,
            npwp: 37,
            city: 'Kendal',
            country: 'Indonesia'

          },
          {
            suppCode: 'Bahan Baku',
            suppName: 392,
            address: 0.2,
            npwp: 98,
            city: 'Kendal',
            country: 'Indonesia'
          },
        ],
      }
    },
    methods:{
      suppCode(){
        let s = []
        for (let i = 0; i < this.items.length; i++) {
          s.push(this.items[i].suppCode)
        }
        return s
      }
    }
  }
</script>
<template>
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
<v-container>
  <v-row no-gutters class="bg-white align-center px-4 my-1 mb-3 rounded-lg ">
    <v-responsive class="d-flex me-2" max-width="300" cols="6" xs="4">
      <div class="d-flex mt-5">
        <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              variant="outlined"
              class="text-blue-darken-4"
            ></v-text-field>
      </div>
    </v-responsive>
    <v-responsive cols="6" xs="4">
        <div class="d-flex float-right">
            <v-btn
            color="indigo-darken-1"
            icon="mdi-download"
            class="rounded-lg ms-2"
            variant="tonal"
            size="small"
          ></v-btn>
        </div>
    </v-responsive>
    </v-row>
    <!-- edit -->
    <TableVue :screen="400"  :headers="headers" :items="items" :search="search" :category="this.suppCode()" :iTitle="this.actIcon[1].text" :btncolor="this.actIcon[1].color" :icon="this.actIcon[1].icon" :iVariant="this.actIcon[1].variant" :alpha="this.alpha"/>
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