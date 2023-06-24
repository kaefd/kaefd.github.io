<script setup>
import { defineComponent } from 'vue';
import TableVue from '../components/TableVue.vue';
import DialogCard from '../components/DialogCard.vue';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import api from '../api';
import AppBar from '../components/AppBar.vue';

</script>

<script>
  export default defineComponent ({
    name: 'CustomerView',
    props:['actIcon', 'cetak'],
    components: {
    TableVue, DialogCard, AppBar
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
        <v-text-field
          v-model="search"
          density="compact"
          variant="text"
          class="text-indigo-darken-4 rounded-xl ms-2 border text-body-2 font-small"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search"
          single-line
          hide-details
          >
          </v-text-field>
        <!-- EKSPORT DATA -->
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