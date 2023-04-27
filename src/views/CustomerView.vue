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
    TableVue, DialogCard, NavDrawers, AppBar
    },
    data () {
      return {
        drawer: null,
        pageTitle: 'DATA PELANGGAN',
        search: '',
        alpha: 1,
        actIcon: [
          { text: 'Tambah Data', icon: 'mdi-plus', color: 'indigo-darken-1', variant: 'tonal' },
          { text: 'Edit Data', icon: 'mdi-dots-vertical', color: 'grey-darken-1', variant: 'text' },
        ],
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
          { title: 'Kode Pelanggan', key: 'kode_pelanggan'},
          { title: 'Nama', key: 'nama' },
          { title: 'Alamat', key: 'alamat' },
          { title: 'NPWP', key: 'npwp' },
          { title: '', key: 'actions', sortable: false},
        ],
        items:[],
        form: {
          kode_pelanggan: '',
          nama: '',
          alamat: '',
          npwp: '',
        }
      }
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
      async getdata() {
        try {
          const token = localStorage.getItem('token')
          const response = await fetch('http://localhost:8000/pelanggan', {
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
          axios.post('http://localhost:8000/pelanggan', {
            id: '',
            kode_pelanggan: value[0],
            nama: value[1],
            alamat: value[2],
            npwp: value[3],
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
        
        axios.put(`http://localhost:8000/pelanggan/${def.id}`, {
          id: def.id,
          kode_pelanggan: edt[0] || def.kode_pelanggan,
          nama: edt[1] || def.nama,
          alamat: edt[2] || def.alamat,
          npwp: edt[3] || def.npwp,
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
        axios.delete(`http://localhost:8000/pelanggan/${v}`)
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
    <v-row no-gutters class="bg-white align-center justify-between px-4 my-1 mb-3 rounded-lg">
    <v-responsive class="d-flex me-2" max-width="300" cols="6" xs="4">
      <div class="d-flex mt-5">
        <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              class="text-blue-darken-4"
              variant="outlined"
            ></v-text-field>
      </div>
    </v-responsive>
    <v-responsive cols="6" xs="4">
        <div class="d-flex float-right">
          <!-- add data -->
            <DialogCard :noselect="true"  @form="submitForm" :screen="400" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :headers="headers" :items="items" :category="category"  :alpha="alpha"/>
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
    <TableVue :noselect="true" @edit="editForm" @del="del" id="tbl_exporttable_to_xls" :screen="400"  :headers="headers" :items="items" :search="search" :category="category" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" :form="form"/>
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