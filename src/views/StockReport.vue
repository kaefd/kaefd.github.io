<script setup>
import TableVue from '../components/TableVue.vue';
import api from '../api';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import AppBar from '../components/AppBar.vue';

</script>

<script>
  export default {
    components: {
    TableVue, AppBar
    },
    props:['page','actIcon', 'cetak'],
    data () {
      return {
        drawer: null,
        search: '',
        searched: '',
        group_barang: [],
        kode_barang: [],
        filter: false,
        dialoggb: false,
        pageTitle: 'LAPORAN STOK BARANG',
        selectCategory: [],
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        alpha: 1,
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
          { title: 'Stok Akhir', key: 'stok_akhir' },
          { title: '', key: 'actions'},
        ],
        items: '',
        barang: '',
        filtered: {
        kategori_barang: [],
        group_barang: [],
        kode_barang: []
      }
      }
    },
    computed: {
      dataitem() {
        let item = ''
        let kode = []
        for (let i = 0; i < this.items.length; i++) {
          kode.push(this.items[i].kode_barang)
        }
        
        return item
      },
      filterkodegroup() {
        return this.barang.filter(item => {
            return item.kode_group.toLowerCase().includes(this.searched.toLowerCase())
        })
      },
      selected(){        
        if (this.selectCategory.length === 0) {
          return this.barang
        } else {
          // barang berdasarkan kategori
          let dt = []
          let a = this.barang.filter(item => this.selectCategory.includes(item.kategori_barang));
          for (let i = 0; i < a.length; i++) {
              dt.push(a[i].kode_barang)
          }
          // item berdasarkan kategori
          return this.barang.filter(it => dt.includes(it.kode_barang))
        }
      },
      kodebarang() {
        let a = []
        for (let i = 0; i < this.barang.length; i++) {
          a.push(this.barang[i].kode_barang)
        }
        return a
      },
      filter_kodebarang() {
        let data = this.selected
        if (this.kode_barang.length === 0) {
          return data
        } else {
          return data.filter(item => this.kode_barang.includes(item.kode_barang));
        }
      },
      
    },
    methods: {
      data(){
        let data = this.filter_kodebarang
        if (this.group_barang.length === 0) {
          return data
        } else {
          return data.filter(item => this.group_barang.includes(item.kode_group));
        }
      },
      addKodeGroup(value){
        return this.filtered.group_barang.push(value)
      },
      pages(){
        return this.$emit('page', this.pageTitle)
      },
      getData() {
        api.getData('/group_barang')
        .then(response => {
          this.items = response.data
        })
        .catch(() => {
          window.location.href = '/login'
        })
      },
      getDataBarang() {
        api.getData('/barang?status=true')
        .then(response => {
          this.barang = response.data
        })
        .catch(() => {
          window.location.href = '/login'
        })
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
         XLSX.writeFile(wb, fn || (this.pageTitle+'.' + (type || 'xlsx')));
      },
      kodegroup() {
        let kode = []
        for (let i = 0; i < this.items.length; i++) {
          kode.push(this.items[i].kode_group)          
        }
        return kode
      },
      filterdata() {
        this.selectCategory = this.filtered.kategori_barang
        if(!this.selectCategory) {
          this.selectCategory = []
        } else if (this.selectCategory == []) {
          this.selectCategory = []
        }
        this.group_barang = this.filtered.group_barang
        this.kode_barang = this.filtered.kode_barang
      },
      reset() {
        this.filtered.group_barang = []
        this.filtered.kode_barang = []
        this.filtered.kategori_barang = []
        this.selectCategory = []
        this.group_barang = []
      },
    },
    mounted() {
      this.getData()
      this.getDataBarang()
      this.pages()
    }
  }
</script>

<template>
  <v-navigation-drawer
        class="border-0 me-4 elevation-0"
        v-model="filter"
        location="left"
        width="320"
      >
      <v-sheet class="rounded-xl py-5">
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
        </v-container>
        <!-- GROUP BARANG -->
        <v-container>
          <v-span class="text-caption text-weight-bold">Kode Group</v-span>
          <v-divider></v-divider>
          <v-combobox
            :items="kodegroup()"
            v-model="filtered.group_barang"
            multiple
            variant="underlined"
            density="compact"
            class="overflow-auto h-50"
            hide-details
            single-line
            hide-selected
            chips
            closable-chips
          ></v-combobox>
        </v-container>
        <!-- KODE BARANG -->
        <v-container>
          <v-span class="text-caption text-weight-bold">Kode Barang</v-span>
          <v-divider></v-divider>
          <v-combobox
            :items="kodebarang"
            v-model="filtered.kode_barang"
            multiple
            variant="underlined"
            density="compact"
            class="overflow-auto h-50"
            hide-details
            single-line
            hide-selected
            chips
            closable-chips
          ></v-combobox>
          <v-div class="d-flex justify-end mt-3">
              <v-btn class="elevation-0 text-small mt-5 me-2 bg-grey-lighten-2" height="42" @click="reset()">Reset</v-btn>
              <v-btn class="elevation-0 text-small mt-5 text-white" color="orange-lighten-1" height="42" @click="filterdata()">Filter</v-btn>
          </v-div>
        </v-container>
      </v-sheet>
  </v-navigation-drawer>
    <v-container>
    <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
        <v-row no-gutters class="mb-2 mt-n4">
          <v-responsive>
            <!-- BUTTON FILTER -->
            <v-btn @click="filter = !filter " class="rounded-circle text-caption elevation-0 bg-grey-lighten-4 text-indigo me-2" icon="mdi-tune-vertical" size="small">
            </v-btn>
          </v-responsive>
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
        </v-row>
        <!-- TABEL -->
        <TableVue
        id="tbl_exporttable_to_xls"
        :stokbarang="items"
        :groupbarang="items"
        :barang="barang"
        :headers="headers"
        :items="data()"
        :search="search"
        :category="category"
        :selectCategory="selectCategory"
        :iTitle="actIcon[1].text"
        :btncolor="actIcon[1].color"
        :icon="actIcon[1].icon"
        :iVariant="actIcon[1].variant"
        :alpha="alpha"
        :laporanstok="true"
        />
  </v-container>


</template>
<style>
.v-field__input {
  overflow: auto !important;
  flex-wrap: nowrap !important;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>