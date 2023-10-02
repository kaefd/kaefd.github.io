<script setup>
import TableVue from '../components/TableVue.vue';
import api from '../service/api';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import checkBox from '../components/form/checkBox.vue';
import BtnFilter from '../components/button/btnFilter.vue';
import TextField from '../components/form/textField.vue';
import DatePicker from '../components/datepicker/datePicker.vue';
import laporan from '../service/page/laporan';
import functions from '../service/functions';
import CircularLoader from '../components/animate/circularLoader.vue';
import otoritas from '../service/page/otoritas';
</script>

<script>

  export default {
    components: {
      filterDrawer,
        BtnFilter,
        TextField,
        DatePicker,
        CircularLoader
    },
    props:['tema', 'cetak', 'user', 'window'],
    data () {
      return {
        drawer: null,
        search: '',
        periode: [],
        filter: false,
        loading: true,
        akses: '',
        pageTitle: 'laporan log user',
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        authority: '',
        selectuser:[],
        items: '',
        users: '',
        filtered: {
          selectuser: [],
          periode: []
        }
      }
    },
    created() {
      this.periode = [functions.tglawal(), functions.day()]
      this.filtered.periode = [functions.tglawal(), functions.day()]
    },
    computed : {
      datauser () {
        let a = []
        for (let i = 0; i < this.users.length; i++) {
          a.push(this.users[i].username)
        } return a
      }
    },
    methods: {
      async fetchData() {
        let user = localStorage.getItem('user')
        // if(user != null) {
        //   this.loading = true
        //   this.users = await api.getUser()
        //   this.items = await api.getLogUser(this.periode)
        //   this.loading = false
        // } else await api.logout()
        if(user != null) {
          this.akses = await api.getOtoritas(user)
          this.authority = otoritas.otoritas(this.akses)
        }
        if(otoritas.routes(this.akses, 'Laporan Log User')) {
          this.loading = true
          this.users = await api.getUser()
          this.items = await api.getLogUser(this.periode)
          this.loading = false
        } else return await api.logout()
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
        this.fetchData()
      },
      reset() {
        this.filtered.selectuser = []
        this.periode = [this.tglawal(), this.today()]
        this.filtered.periode = [this.tglawal(), this.today()]
        this.selectuser = []
        this.getLogUser()
      },
      filterdata() {
        let awal = this.filtered.periode[0]
        let akhir = this.filtered.periode[1]
        this.periode[0] = new Date(awal).toJSON().slice(0, 10)
        this.periode[1] = new Date(akhir).toJSON().slice(0, 10)
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
</script>

<template>
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <!-- PERIODE -->
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-label class="text-small mt-4">Tgl Awal</v-label>
      <DatePicker teleport-center v-model="filtered.periode[0]" :max-date="new Date()" :filter="true" :tema="tema"/>
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <DatePicker teleport-center v-model="filtered.periode[1]" class="mb-4" :min-date="filtered.periode[0]" :filter="true" :tema="tema"/>
      <!-- TIPE DOKUMEN -->
      <v-span class="text-caption text-weight-bold">User</v-span>
      <v-divider></v-divider>
      <v-combobox
        :items="datauser"
        v-model="filtered.selectuser"
        multiple
        variant="underlined"
        density="compact"
        class="overflow-auto"
        hide-details
        single-line
        hide-selected
        chips
        closable-chips
      ></v-combobox>
    </template>
  </filterDrawer>

  <v-container class="pt-9 h-100">
    <v-row no-gutters class="mb-2 mt-n4">
      <v-responsive class="me-0 ms-auto" max-width="450">
        <div class="d-flex">
          <!-- SEARCH -->
          <text-field
            v-model="search"
            placeholder="Search"
          >
          </text-field>
        <!-- BUTTON FILTER -->
        <btn-filter class="ms-2" @click="filter = !filter " />
        </div>
      </v-responsive>
      </v-row>
      <!-- edit data -->
        <TableVue
          :window="window"
          id="tbl_exporttable_to_xls"
          :headers="laporan.headLogUser"
          :items="selected()"
          :search="search"
          :category="category"
          :selectCategory="selectCategory"
          :log="true"
          />
  </v-container>
  <circular-loader :loading="loading" />
</template>
