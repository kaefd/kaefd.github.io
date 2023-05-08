<script setup>
import TableVue from '../components/TableVue.vue';
import DialogCard from '../components/DialogCard.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';
import { defineComponent } from 'vue';
import api from '../api';
</script>


<script>
export default defineComponent ({
  components: {
    TableVue,
    DialogCard,
    AppBar,
    NavDrawers,
  },
    name: 'itemsView',
    props:['actIcon'],
    data () {
      return {
        drawer: null,
        search: '',
        pageTitle: 'DATA BARANG',
        selectCategory: 'semua',
        btnTitle: 'Tambah Data',
        id: ['C', 'R', 'U', 'D'],
        alpha: 1,
        statusselect: false,
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
          { title: 'Kategori Barang', key: 'kategori_barang'},
          { title: 'Kode Barang', key: 'kode_barang' },
          { title: 'Nama Barang', key: 'nama_barang' },
          { title: 'HS Kode', key: 'hs_code' },
          { title: 'Satuan', key: 'satuan' },
          { title: 'Actions', key: 'actions', sortable: false},
        ],
        items: '',
        keyform:[
          'kategori_barang',
          'kode_barang',
          'nama_barang',
          'hs_code',
          'satuan',
          'status',
      ],
      tambah: {
          kategori_barang: '',
          kode_barang: '',
          nama_barang: '',
          hs_code: '',
          satuan: '',
          status: true,
        }
      }
    },
    created() {
        api.getData('/barang?status=true')
        .then(response => {
          this.items = response.data
        })
        .catch(() => {
          window.location.href = '/login'
        })
    },
    methods: {
      selected(){        
        //show row selected
        if(this.selectCategory == 'semua'){
          return this.items
        } else {
          return this.items.filter(item => item.kategori_barang === this.selectCategory )
          }
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
        api.postData( '/barang', {
          barang : value
        })
        .then((response) => {
            this.successAlert(response.data)
            window.location.href = '/'
          })
          .catch((error) => {
            this.failedAlert(error.response.data)
          })
      },
      // EDIT DATA
      editForm(value) {
      const myJSON = JSON.stringify(value);
        api.putData('/barang', {
          barang : myJSON
        })
        .then((response) => {
            this.successAlert(response.data)
          })
          .catch((error) => {
            this.failedAlert(error.response.data);
          })
      },
      // HAPUS DATA
      del(value) {
      this.barang = {
              kategori_barang : value.kategori_barang,
              kode_barang : value.kode_barang,
              nama_barang: value.nama_barang,
              hs_code: value.hs_code,
              satuan: value.satuan,
              status: false,
      }
      const myJSON = JSON.stringify(this.barang);
        api.deleteData('/barang', {
          barang : myJSON
        })
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
            console.log(error);
          })
      },
    },
    mounted() {
        api.getData
      }
      
  })

</script>
<template>

  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
  <v-container>


    <v-row no-gutters class="bg-white align-center pa-4 mb-4 rounded-lg w-100">
      <v-responsive class="d-flex align-center mb-sm-0 mb-3" max-width="300" max-height="70">
        <div class="w-100">
          <!-- KATEGORI -->
          <v-label class="text-body-2 text-blue-darken-4">Kategori</v-label>
          <v-select
            :items="category"
            v-model="selectCategory"
            density="compact"
            variant="tonal"
            class="bg-indigo-lighten-5 text-indigo-darken-4 rounded-lg me-2"
            single-line
            hide-details
          ></v-select>
        </div>
      </v-responsive>
      <v-responsive class="me-0 ms-auto mt-6" max-width="350" min-width="200">
        <div class="d-flex align-center w-100">
            <!-- SEARCH -->
              <v-text-field
                  v-model="search"
                  density="compact"
                  variant="tonal"
                  class="bg-indigo-lighten-5 text-indigo-darken-4 rounded-lg me-2 text-body-2"
                  append-inner-icon="mdi-magnify"
                  single-line
                  hide-details
              ></v-text-field>

            <!-- ADD BUTTON -->
            <DialogCard :keyform="keyform" :tambah="tambah" :ishidden="true" :noselect="statusselect" @form="submitForm" :screen="400" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :headers="headers" :items="items" :category="category" :alpha="alpha" :submitForm="submitForm"/>
            <!-- EXPORT BUTTON -->
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
      <!-- TABLE -->
        <TableVue :keyform="keyform" :noselect="statusselect" @edit="editForm" @del="del" id="tbl_exporttable_to_xls" :screen="400"  :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" :form="form"/>
  </v-container>
  </template>
<style>

.w-30 {
  max-width: 32vw;
}
.w-20 {
  width: 20vw !important;
}
.vh-75 {
  height: 75vh ;
}

.rounded-select .v-input__control {
  border-radius: 7px;
}
.v-select__selection-text {
  font-size: 11pt;
}
.v-field__input {
  font-size: 11pt;
}

</style>