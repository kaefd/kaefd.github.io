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
        statusselect: true,
        headers: [
          { title: 'Kode Supplier', align: 'start', key: 'kode_supplier'},
          { title: 'Nama', align: 'start', key: 'nama' },
          { title: 'Alamat', align: 'start', key: 'alamat' },
          { title: 'Kota', align: 'start', key: 'kota' },
          { title: 'Negara', align: 'start', key: 'negara' },
          { title: '', align: 'start', key: 'actions', sortable: false },
        ],
        items: [],
        form: {
          kode_supplier: '',
          nama: '',
          alamat: '',
          kota: '',
          negara: '',
        }
      }
    },
    methods:{
      suppCode(){
        let s = []
        for (let i = 0; i < this.items.length; i++) {
          s.push(this.items[i].suppCode)
        }
        return s
      },
      ExportToExcel(type, fn, dl) {
       var elt = document.getElementById('tbl_exporttable_to_xls');
       // eslint-disable-next-line no-undef
       var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
       return dl ?
         // eslint-disable-next-line no-undef
         XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
         // eslint-disable-next-line no-undef
         XLSX.writeFile(wb, fn || (this.pageTitle+'.' + (type || 'xlsx')));
        },
    },
    async mounted() {
      try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:8000/supplier', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            const data = await response.json()
            this.items = data
          }
          catch (error) {
            console.log(error);
          }
          
        },
    }
  
</script>
<template>
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
<v-container>
  <v-row no-gutters class="bg-white align-center pa-4 mb-3 rounded-lg ">
    <v-responsive class="d-flex me-2" max-width="300" cols="6" xs="4">
      <div class="d-flex">
        <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              variant="tonal"
              class="text-blue-darken-4 w-50 rounded-select"
              single-line
              hide-details
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
            @click="ExportToExcel('xlsx')"
          ></v-btn>
        </div>
    </v-responsive>
    </v-row>
    <!-- VIEW -->
    <TableVue :disabled="statusselect" :noselect="statusselect" id="tbl_exporttable_to_xls" :screen="400" :headers="headers" :items="items" :search="search" :category="suppCode()" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha"/>
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