<script setup>
import TableVue from '../components/TableVue.vue';
import DialogCard from '../components/DialogCard.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';
import axios from 'axios'
</script>


<script>
export default {
    components: {
    TableVue,
    DialogCard,
    AppBar,
    NavDrawers,
},
    props:['page','actIcon'],
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

    async getdata() {
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
      
    },
    wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async updated() {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await this.getdata()
        await this.wait(5000)
      }
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
            return this.successAlert()
          })
          .catch(() => {
            return this.failedAlert()
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
            return this.successAlert()
          })
          .catch(() => {
            return this.failedAlert()
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
          this.$swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                this.$swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              }
            })
          })
          .catch(() => {
            return this.failedAlert()
          })
          
      }
  },
    mounted() {
      this.updated()
    }
  }

</script>
<template>
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
  <v-container>


    <v-row no-gutters class="bg-white align-center px-4 pb-lg-0 pb-4 my-1 mb-3 rounded-lg">
      <v-responsive class="d-flex me-2 w-100" max-width="400" max-height="70" cols="6" xs="4">
        <div class="d-flex mt-4">
          <!-- KATEGORI -->
          <v-label class="text-body-1 text-blue-darken-4 me-3 mt-n5">Kategori</v-label>
          <v-select
            title="Kategori"
            :items="category"
            v-model="selectCategory"
            density="compact"
            variant="outlined"
            class="text-blue-darken-4 me-2 w-25"
            single-line
          ></v-select>
          <!-- SEARCH -->
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
          <div class="d-flex float-lg-right float-sm-left">
            <!-- add data -->
            <DialogCard :noselect="false" @form="submitForm" :screen="400" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :headers="headers" :items="items" :category="category" :alpha="alpha" :submitForm="submitForm"/>
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
      <!-- edit data -->
        <TableVue :noselect="false" @edit="editForm" @del="del" id="tbl_exporttable_to_xls" :screen="400"  :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="this.actIcon[1].text" :btncolor="this.actIcon[1].color" :icon="this.actIcon[1].icon" :iVariant="this.actIcon[1].variant" :alpha="alpha" :form="form"/>
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

</style>