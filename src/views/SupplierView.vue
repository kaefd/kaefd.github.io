<script setup>
import TableVue from '../components/TableVue.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';
import api from '../api';
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
          { title: 'Kode Supplier', align: 'start', key: 'kode_supplier', dis: true},
          { title: 'Nama', align: 'start', key: 'nama', dis: true },
          { title: 'Alamat', align: 'start', key: 'alamat', dis: true },
          { title: 'Kota', align: 'start', key: 'kota', dis: true },
          { title: 'Negara', align: 'start', key: 'negara', dis: true },
          { title: '', align: 'start', key: 'actions', sortable: false },
        ],
        items: [],
        keyform: [
          'kode_supplier',
          'nama',
          'alamat',
          'kota',
          'negara',
          'status'
      ],
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
    created() {
        api.getData('/supplier?status=true')
        .then(response => {
          this.items = response.data
        })
        .catch(() => {
          window.location.href = '/login'
        })

        
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
        successAlert(m) {
          this.$swal.fire(
            'Berhasil !',
            m,
            'success'
          )
        },
        failedAlert(m) {
          this.$swal.fire(
            'Gagal !',
            m,
            'error'
          )
        },
  }  
</script>
<template>
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
<v-container>
  <v-row no-gutters class="bg-white align-center pa-4 mb-3 rounded-lg ">
    <v-responsive class="d-flex me-2" max-width="300" cols="6" xs="4">
        <!-- SEARCH -->
        <v-text-field
          density="compact"
          variant="tonal"
          class="bg-indigo-lighten-5 text-indigo-darken-4 rounded-lg"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
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
    <TableVue :keyform="keyform" :ishidden="true" :disabled="true" :noselect="true" id="tbl_exporttable_to_xls" :screen="400" :headers="headers" :items="items" :search="search" :category="suppCode()" :iTitle="actIcon[3].text" :btncolor="actIcon[3].color" :icon="actIcon[3].icon" :iVariant="actIcon[3].variant" :alpha="alpha"/>
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