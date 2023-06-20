<script setup>
import TableVue from '../components/TableVue.vue';
import DialogCard from '../components/DialogCard.vue';
import AppBar from '../components/AppBar.vue';
import { defineComponent } from 'vue';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import api from '../api';
</script>


<script>
export default defineComponent ({
  components: {
    AppBar,
    TableVue,
    DialogCard,
    
  },
    name: 'itemsView',
    props:['actIcon', 'cetak'],
    data () {
      return {
        search: '',
        filter: false,
        pageTitle: 'DATA BARANG',
        selectCategory: [],
        btnTitle: 'Tambah Data',
        alpha: 1,
        pilihcetak: '',
        statusselect: false,
        show : false,
        category: [
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
          { key: 'actions', align:'center', sortable: false},
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
        },
      filtered: {
        kategori_barang: []
      }
      }
    },
    created() {
      this.windowWidth
        
    },
    methods: {
    getData(){
        api.getData('/barang?status=true')
        .then(response => {
          this.items = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
    },
    selected(){        
        if (this.selectCategory.length === 0) {
          return this.items;
        } else {
          return this.items.filter(item => this.selectCategory.includes(item.kategori_barang));
        }
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
      let heading = this.pageTitle
      let columns = this.headers
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
    page(){
        return this.$emit('page', this.pageTitle)
    },
    filterdata() {
        this.selectCategory = this.filtered.kategori_barang
        if(!this.selectCategory) {
          this.selectCategory = []
          } else if (this.selectCategory == []) {
            this.selectCategory = []
          }

      },
      reset() {
        this.filtered.kategori_barang = []
        this.selectCategory = []
        
      },
    },
    mounted() {
        this.getData()
        this.page()
        this.cetak
      }
      
  })

</script>
<template>
  <v-navigation-drawer
        class="border-0 me-4 elevation-0"
        v-model="filter"
        location="left"
        width="320"
      >
      <v-sheet class="py-5 bg-transparent">
        <div class="d-flex align-center">
          <v-span class="text-button ms-4">Filter</v-span>
          <v-btn size="small" icon="mdi-close" @click="filter = false" variant="text" class="me-3 ms-auto">
          </v-btn>
        </div>
        <!-- KATEGORI BARANG -->
        <v-container class="py-3 px-4">
          <v-span class="text-caption text-weight-bold">Kategori Barang</v-span>
          <v-divider></v-divider>
            <v-checkbox
              v-for="label, i in category" :key="i"
              v-model="filtered.kategori_barang"
              :label="label"
              :value="label"
              color="orange-lighten-1"
              class="mb-n6"
              hide-details
            ></v-checkbox>
            <v-div class="d-flex justify-end mt-12">
              <v-btn class="elevation-0 text-small mt-5 me-2 bg-grey-lighten-2" height="42" @click="reset()">Reset</v-btn>
              <v-btn class="elevation-0 text-small mt-5 text-white" color="orange-lighten-1" height="42" @click="filterdata()">Filter</v-btn>
            </v-div>
        </v-container>
      </v-sheet>
  </v-navigation-drawer>
  <v-container>
    <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
    <v-row no-gutters class="mb-2 mt-n4">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1" min-width="200">
        <div class="d-flex align-center w-100">
          <!-- KATEGORI -->
          <!-- <v-select
            label="Kategori Barang"
            :items="category"
            v-model="selectCategory"
            density="compact"
            variant="tonal"
            class="bg-indigo-lighten-5 text-indigo-darken-4 rounded-left"
            single-line
            hide-details
          ></v-select> -->
          <!-- BUTTON FILTER -->
          <v-btn @click="filter = !filter " class="rounded-circle text-caption elevation-0 bg-grey-lighten-4 text-indigo me-2" icon="mdi-tune-vertical" size="small">
          </v-btn>
          <!-- ADD BUTTON -->
          <DialogCard :keyform="keyform" :tambah="tambah" :ishidden="true" :noselect="statusselect" @form="submitForm" :screen="400" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :headers="headers" :items="items" :category="category" :alpha="alpha" :submitForm="submitForm"/>
          </div>
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" max-width="450">
        <div class="d-flex align-center justify-sm-end justify-start">
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
      </v-row>
        <!-- TABLE -->
        <TableVue :windowWidth="windowWidth" :keyform="keyform" :noselect="statusselect" @edit="editForm" @del="del" id="tbl_exporttable_to_xls" :screen="400"  :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" :form="form"/>
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
  
  .v-select__selection-text {
    font-size: 11pt;
  }
  .font-small {
    font-size: 1rem !important;
  }
  .rounded-right{
    border-radius: 7px 0px 0px 7px;
  }
  .rounded-left{
    border-radius: 0px 7px 7px 0px;
  }
  .bg-blue-custom {
    background: #3B7AA9;
  }
  .text-blue-custom {
    color: #3B7AA9 !important;
  }
  .dp__input {
    font-size: 10pt !important;
    height: 43px !important;
    border-color: #ababab !important;
  }
  </style>