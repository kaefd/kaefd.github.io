<script setup>
import TableVue from '../components/TableVue.vue';
import api from '../service/api';
import { ref, onMounted } from 'vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import checkBox from '../components/form/checkBox.vue';
import BtnFilter from '../components/button/btnFilter.vue';
import TextField from '../components/form/textField.vue';
import DatePicker from '../components/datepicker/datePicker.vue';
import otoritas from '../service/page/otoritas';
</script>

<script>

  export default {
    components: {
      filterDrawer,
      checkBox,
        BtnFilter,
        TextField,
        DatePicker
    },
    props:['tema', 'cetak', 'user'],
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
        authority: '',
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
        users: '',
        filtered: {
          selectuser: [],
          periode: []
        }
      }
    },
    async created() {
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
          this.users = response.data
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
      close(v) {
        return this.filter = v
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
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <!-- PERIODE -->
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-label class="text-small mt-4">Tgl Awal</v-label>
      <DatePicker v-model="filtered.periode[0]" :filter="true" :tema="tema"/>
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <DatePicker v-model="filtered.periode[1]" :filter="true" :tema="tema"/>
      <!-- TIPE DOKUMEN -->
      <v-span class="text-caption text-weight-bold">Tipe Dokumen</v-span>
      <v-divider class="mb-6"></v-divider>
        <checkBox
          v-for="label, i in datauser" :key="i"
          v-model="filtered.selectuser"
          :label="label"
          :value="label"
        />
    </template>
  </filterDrawer>

  <v-container class="pt-9 h-100">
    <v-row no-gutters class="mb-2 mt-n4">
      <v-responsive>
        <div class="d-flex">
          <!-- SEARCH -->
          <text-field
            v-model="search"
            placeholder="Search"
          >
          </text-field>
        <!-- BUTTON FILTER -->
        <btn-filter @click="filter = !filter " />
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
        <TableVue
          id="tbl_exporttable_to_xls"
          :headers="headers"
          :items="selected()"
          :search="search"
          :category="category"
          :selectCategory="selectCategory"
          />
  </v-container>

</template>
