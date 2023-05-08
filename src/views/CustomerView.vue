<script setup>
import { defineComponent } from 'vue';
import TableVue from '../components/TableVue.vue';
import DialogCard from '../components/DialogCard.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';
import api from '../api';

</script>

<script>
  export default defineComponent ({
    name: 'CustomerView',
    props:['actIcon'],
    components: {
    TableVue, DialogCard, NavDrawers, AppBar
    },
    data () {
      return {
        drawer: null,
        pageTitle: 'DATA PELANGGAN',
        statusselect: true,
        search: '',
        alpha: 1,
        category: [
          'semua',
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
          window.location.href = '/login'
        })

        
    },
    methods: {
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
      console.log(value);
      this.pelanggan = {
              kode_pelanggan : value.kode_pelanggan,
              nama : value.kode_pelanggan,
              alamat: value.alamat,
              npwp: value.npwp,
              status: false,
      }
      const myJSON = JSON.stringify(this.pelanggan);
        api.deleteData('/pelanggan', {
          pelanggan : myJSON
        })
        // ALERT
            this.$swal.fire({
              title: 'Apakah anda yakin?',
              text: "",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ya'
            }).then((response) => {
              if (response.isConfirmed) {
                this.$swal.fire(
                  'Berhasil !',
                  'Data Berhasil Dihapus!',
                  'success'
                )
              }
            })
          .catch(function (error) {
            this.failedAlert(error.response.data)
          })
      }
    }
  })

</script>
<template>
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
  <v-container>
    <v-row no-gutters class="bg-white align-center justify-between rounded-lg pa-4 mb-4">
    <v-responsive class="d-flex me-2" max-width="300">
        <!-- SEARCH -->
        <v-text-field
              v-model="search"
              density="compact"
              class="bg-indigo-lighten-5 text-indigo-darken-4 rounded-lg me-2"
              variant="tonal"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
        ></v-text-field>
    </v-responsive>
    <v-responsive>
        <div class="d-flex float-right">
          <!-- TAMBAH DATA -->
            <DialogCard :keyform="keyform" :tambah="tambah" :ishidden="true" :noselect="statusselect"  @form="submitForm" :screen="400" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :headers="headers" :items="items" :category="category"  :alpha="alpha"/>
            <!-- EKSPORT DATA -->
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