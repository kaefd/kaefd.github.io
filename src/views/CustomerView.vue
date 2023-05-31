<script setup>
import { defineComponent } from 'vue';
import TableVue from '../components/TableVue.vue';
import DialogCard from '../components/DialogCard.vue';
import api from '../api';

</script>

<script>
  export default defineComponent ({
    name: 'CustomerView',
    props:['actIcon', 'cetak'],
    components: {
    TableVue, DialogCard
    },
    data () {
      return {
        drawer: null,
        pageTitle: 'DATA PELANGGAN',
        statusselect: true,
        search: '',
        alpha: 1,
        pilihcetak: '',
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
      page(){
        return this.$emit('page', this.pageTitle)
      },
      print(i){
          if (i == 0) {
            return this.ExportToExcel('xlsx')
          } else if(i == 1) {
            return this.pdf()
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
    },
    mounted(){
      this.page()
    }
  })

</script>
<template>
  <v-container>
    <v-row no-gutters class="rounded-t-xl align-start mb-2">
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
                v-for="(c, index) in this.cetak"
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