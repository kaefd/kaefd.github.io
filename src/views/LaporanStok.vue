<script setup>
import TableVue from '../components/TableVue.vue';
import api from '../service/api';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import AppBar from '../components/appbar/AppBar.vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import checkBox from '../components/form/checkBox.vue';
import menuList from '../components/menu/menuList.vue';
import textField from '../components/form/textField.vue';
import circleButton from '../components/button/btnOption.vue';
</script>

<script>
  export default {
    components: {
      TableVue,
      AppBar,
      filterDrawer,
      checkBox,
      circleButton,
      menuList,
      textField,
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
          return this.$router.push('login');
        })
      },
      getDataBarang() {
        api.getData('/barang?status=true')
        .then(response => {
          this.barang = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      close(v) {
        return this.filter = v
      },
      print(key){
        if (key == 'xlsx') {
          return this.ExportToExcel('xlsx')
        } else if(key == 'pdf') {
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
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <!-- KATEGORI BARANG -->
      <v-span class="text-caption text-weight-bold">Kategori Barang</v-span>
      <v-divider class="mb-6"></v-divider>
      <checkBox
        v-for="label, i in category"
        :key="i"
        v-model="filtered.kategori_barang"
        :label="label"
        :value="label"
      />      
      <!-- TIPE DOKUMEN -->
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
    </template>
  </filterDrawer>
  <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
    <v-container class="pt-9 h-100">
        <v-row no-gutters class="mb-2 mt-n4">
          <v-responsive>
            <!-- BUTTON FILTER -->
            <circleButton icon="mdi-tune-vertical" @click="filter = !filter" />
          </v-responsive>
          <v-responsive class="me-0 ms-auto" max-width="450">
          <div class="d-flex">
            <!-- SEARCH -->
            <textField  v-model="search" placeholder="Search" icon="mdi-magnify" class="me-2"/>
            <!-- EXPORT DATA -->
            <menuList
              icon="mdi-dots-vertical"
              :items="cetak"
              @result="print"
            />
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