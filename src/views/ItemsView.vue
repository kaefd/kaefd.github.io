<script setup>
import TableVue from '../components/TableVue.vue';
import DialogCard from '../components/DialogCard.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';
import { defineComponent } from 'vue';
import axios from 'axios'
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
        cardTitle: 'Detail Barang',
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
          { title: '', key: 'actions', sortable: false},
        ],
        items: [],
        form: {
          kategori_barang: '',
          kode_barang: '',
          nama_barang: '',
          hs_code: '',
          satuan: '',
        }
      }
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
    successAlert() {
      this.$swal.fire(
        'Success !',
        'Data berhasil diubah',
        'success'
      )
    },
    failedAlert() {
      this.$swal.fire(
        'Failed !',
        'Gagal melakukan perubahan data !',
        'error'
      )
    },
    submitForm(value) {
        axios.interceptors.request.use(
          config => {
            const token = localStorage.getItem('token')
            if (token) {
              config.headers.Authorization = `Bearer ${token}`
            }
            return config
          },
          error => Promise.reject(error)
        )
        axios.post('http://localhost:8000/barang', {
          id: '',
          kategori_barang: value[0],
          kode_barang: value[1],
          nama_barang: value[2],
          hs_code: value[3],
          satuan: value[4],
          status: true
        })
        .then(() => {
            // return  
            this.successAlert()
            location.reload()
          })
          .catch(() => {
            // return 
            this.failedAlert()
            location.reload()
          })
      },
      editForm(value) {
        let edt = value[0]
        let def = value[1]
        
        axios.interceptors.request.use(
          config => {
            const token = localStorage.getItem('token')
            if (token) {
              config.headers.Authorization = `Bearer ${token}`
            }
            return config
          },
          error => Promise.reject(error)
        )
        
        axios.put(`http://localhost:8000/barang/${def.id}`, {
          id: def.id,
          kategori_barang: edt[0] || def.kategori_barang,
          kode_barang: edt[1] || def.kode_barang,
          nama_barang: edt[2] || def.nama_barang,
          hs_code: edt[3] || def.hs_code,
          satuan: edt[4] || def.satuan,
          status: true
        })
          .then(() => {
            // return 
            this.successAlert()
            location.reload()
          })
          .catch(() => {
            // return 
            this.failedAlert()
            location.reload()
          })
      },
      
      del(v) {
        
        axios.interceptors.request.use(
          config => {
            const token = localStorage.getItem('token')
            if (token) {
              config.headers.Authorization = `Bearer ${token}`
            }
            return config
          },
          error => Promise.reject(error)
        )
        axios.delete(`http://localhost:8000/barang/${v}`)
          .then(() => {
              // return
              this.successAlert()
              location.reload()
          })
          .catch(() => {
              // return
              this.failedAlert()
              location.reload()
          })
          
      }
    },
    async mounted() {
        try {
          const token = localStorage.getItem('token')
          const response = await fetch('http://localhost:8000/barang', {
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
        

      }
      
  })

</script>
<template>

  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
  <v-container>


    <v-row no-gutters class="bg-white align-center pa-4 mb-4 rounded-lg w-100">
      <v-responsive class="d-flex ms-2 align-center mb-sm-0 mb-3" max-width="400" max-height="70">
        <div class="d-flex w-100">
          <!-- KATEGORI -->
          <v-label class="text-body-1 text-blue-darken-4 me-2">Kategori</v-label>
          <v-select
            :items="category"
            v-model="selectCategory"
            density="compact"
            variant="solo"
            class="text-blue-darken-4 rounded-select"
            single-line
            hide-details
          ></v-select>
        </div>
      </v-responsive>
      <v-responsive class="me-0 ms-auto" max-width="400">
        <div class="d-flex align-center w-100">
            <!-- ADD BUTTON -->
            <DialogCard :noselect="statusselect" @form="submitForm" :screen="400" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :headers="headers" :items="items" :category="category" :alpha="alpha" :submitForm="submitForm"/>
            <!-- EXPORT BUTTON -->
            <v-btn
              color="indigo-darken-1"
              icon="mdi-download"
              class="rounded-lg mx-2"
              variant="tonal"
              size="small"
              @click="ExportToExcel('xlsx')"
            ></v-btn>

            <!-- SEARCH -->
            <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                variant="solo"
                class="text-blue-darken-4 rounded-select"
                single-line
                hide-details
            ></v-text-field>

          </div>
      </v-responsive>
      </v-row>
      <!-- EDIT BUTTON -->
        <TableVue :noselect="statusselect" @edit="editForm" @del="del" id="tbl_exporttable_to_xls" :screen="400"  :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" :form="form"/>
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
  border-width: 1px;
  border-style: solid;
  border-radius: 7px;
  border-color: #112ebe;
  box-shadow: none;
}

</style>