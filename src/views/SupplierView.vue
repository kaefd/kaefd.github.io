<script setup>
import TableVue from '../components/TableVue.vue';
import api from '../api';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import AppBar from '../components/AppBar.vue';

</script>
<script>
  export default {
    props:['actIcon', 'cetak'],
    components: {
    TableVue, AppBar
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
          return this.$router.push('login');
        })

        
    },

    methods:{
      page(){
        return this.$emit('page', this.pageTitle)
      },
      suppCode(){
        let s = []
        for (let i = 0; i < this.items.length; i++) {
          s.push(this.items[i].suppCode)
        }
        return s
      },
      print(i){
          if (i == 0) {
            return this.ExportToExcel('xlsx')
          } else if(i == 1) {
            return this.generatePDF()
          }
      },
      generatePDF() {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter"
      });
      var heading = this.pageTitle
      var columns = this.headers
      // text is placed using x, y coordinates
      doc.setFontSize(16).text(heading, 0.5, 1.0);
      doc.autoTable({
        columns,
        body: this.items,
        margin: { left: 0.5, top: 1.25 }
      })
      .save(`${this.pageTitle}.pdf`);
      },
      ExportToExcel(type, fn, dl) {
       var elt = document.getElementById('tbl_exporttable_to_xls');
       // eslint-disable-next-line no-undef
       var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
       return dl ?
         // eslint-disable-next-line no-undef
         XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
         // eslint-disable-next-line no-undef
         XLSX.writeFile(wb, fn || (this.pageTitle+'.' + (type)));
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

        mounted(){
          this.page()
        }
  }  
</script>
<template>
<v-container>
  <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
  <v-row no-gutters class="mt-n4 mb-2">
    <v-responsive class="me-0 ms-auto" max-width="450">
      <div class="d-flex">
        <!-- SEARCH -->
        <v-text-field
          v-model="search"
          density="compact"
          variant="text"
          class="text-indigo-darken-4 rounded-xl border text-body-2 font-small"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search"
          single-line
          hide-details
        >
        </v-text-field>
      <!-- EXPORT BUTTON -->
      <v-btn
        id="cetak"
        color="indigo"
        icon="mdi-dots-vertical"
        class="rounded-xl mx-2 elevation-0 bg-grey-lighten-4 text-indigo"
        size="small"
      ></v-btn>
      <v-menu activator="#cetak" transition="slide-y-transition">
        <v-list>
          <v-list-item
            v-for="(c, index) in cetak"
            :key="index"
            :value="index"
            @click="print(index)"
            density="compact"
            class="text-caption"
            :prepend-icon="c.icon"
          >
          {{ c.title }}
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    </v-responsive>
    <!-- <v-responsive cols="6" xs="4">
        <div class="d-flex float-right">
            
        </div>
    </v-responsive> -->
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