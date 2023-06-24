<script setup>
import TableVue from '../components/TableVue.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import api from '../api';
import { ref, onMounted } from 'vue';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import AppBar from '../components/AppBar.vue';

</script>

<script>

  export default {
    components: {
      AppBar
    },
    props:['actIcon', 'cetak'],
    data () {
      return {
        drawer: null,
        search: '',
        periode: [],
        filter: false,
        pageTitle: 'LAPORAN LOG USER',
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        datauser: [
          'admin',
          'beacukai',
        ],
        headers: [
          { title: 'Tanggal', key: 'tanggal'},
          { title: 'Username', key: 'username' },
          { title: 'Kategori', key: 'kategori' },
          { title: 'Keterangan', key: 'keterangan' },
        ],
        selectuser:[],
        items: '',
        user: '',
        filtered: {
          selectuser: [],
          periode: []
        }
      }
    },
    created() {
      this.periode = [this.tglawal(), this.today()]
      this.filtered.periode = [this.tglawal(), this.today()]
    },
    methods: {
      today() {
        let currentDate = new Date().toJSON().slice(0, 10);
        return currentDate
      },
      tglawal() {
        let d = new Date();
        let m = d.getMonth();
        d.setMonth(d.getMonth() - 1);
        
        // If still in same month, set date to last day of 
        // previous month
        if (d.getMonth() == m) d.setDate(0);
        d.setHours(0, 0, 0, 0);
    
        //tl_awal
        return d.toJSON().slice(0, 10)
      },
      formatDate(value){
        let options = {
          day: '2-digit',
          year: 'numeric',
          month: 'long'
        }
         return new Date(value).toLocaleDateString('id', options)
      },
      getUser(){
        const apiUrl = '/user?'
        api.getData(apiUrl)
        .then(response => {
          this.user = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getLogUser() {
        const apiUrl = '/log_user?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, { params })
        .then(response => {
          this.items = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      selected(){        
        if (this.selectuser.length === 0) {
            return this.items;
          } else {
            return this.items.filter(item => this.selectuser.includes(item.username));
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
        orientation: "potrait",
        unit: "in",
        format: "a4"
      });
      let heading = this.pageTitle
      let columns = this.headers
      // text is placed using x, y coordinates
      doc.setFontSize(14).text(heading, 0.5, 0.5).setFont('Arial', 20);
      doc.autoTable({
        columns,
        body: this.items,
        margin: { left: 0.1, top: 0.75, right: 0.1 },
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
      page(){
        return this.$emit('page', this.pageTitle)
      },
      updt() {
        this.getUser()
        this.getLogUser()
      },
      reset() {
        this.filtered.selectuser = []
        this.periode = [this.tglawal(), this.today()]
        this.filtered.periode = [this.tglawal(), this.today()]
        this.selectuser = []
        this.getLogUser()
      },
      filterdata() {
        this.periode[0] = this.filtered.periode[0]
        this.periode[1] = this.filtered.periode[1]
        this.updt()
        this.selectuser = this.filtered.selectuser
        if(!this.selectuser) {
          this.selectuser = []
          } else if (this.selectuser == []) {
            this.selectuser = []
          }
      }
    },
    mounted() {
      this.page()
      this.updt()
    }
  }

  const date = ref();

    // For demo purposes assign range from the current date
    onMounted(() => {
      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      date.value = [startDate, endDate];
    })
</script>

<template>
  <v-navigation-drawer
    class="border-0 me-4 elevation-0"
    v-model="filter"
    location="left"
    width="320"
  >
  <v-sheet class="rounded-xl py-5 bg-white">
    <div class="d-flex align-center">
      <v-span class="text-button ms-4">Filter</v-span>
      <v-btn size="small" icon="mdi-close" @click="filter = false" variant="text" class="me-3 ms-auto">
      </v-btn>
    </div>
    <!-- PERIODE -->
    <v-container class="mb-n10">
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-text-field  v-model="filtered.periode[0]" class="mt-4" label="Tgl Awal" type="date" density="compact" variant="outlined"></v-text-field>
      <v-text-field  v-model="filtered.periode[1]" label="Tgl Akhir" type="date" density="compact" variant="outlined"></v-text-field>
    </v-container>
    <!-- TIPE DOKUMEN -->
    <v-container>
      <v-span class="text-caption text-weight-bold">User</v-span>
      <v-divider></v-divider>
        <v-checkbox
          v-for="label, i in datauser" :key="i"
          v-model="filtered.selectuser"
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
  <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
  <v-container class="pt-9 h-100">
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
      <!-- EDIT DATA -->
      <v-data-table
          id="tbl_exporttable_to_xls"
          :items-per-page="selected().length"
          :items="selected()"
          :headers="headers"
          :search="search"
          :hover="true"
          :fixed-header="true"
          density="compact"
          class="text-caption py-3 h-100"
          height="100%"
          >
          <!-- CUSTOM PAGINATION STYLE -->
          <template v-slot:bottom>
            
          </template>
        </v-data-table>
      <!-- edit data -->
        <TableVue id="tbl_exporttable_to_xls" :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha"/>
  </v-container>

</template>
