<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
// components
import { VDataTable } from 'vuetify/labs/VDataTable'
import ScreenDialog2 from '../components/ScreenDialog2.vue';
import { ref, onMounted } from 'vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import textField from '../components/form/textField.vue';
import menuList from '../components/menu/menuList.vue';
import dialogConfirm from '../components/dialog/dialogConfirm.vue';
import BtnFilter from '../components/button/btnFilter.vue';
import datePickerVue from '../components/datepicker/datePicker.vue';
import BtnCancel from '../components/button/btnCancel.vue';
import BtnOrange from '../components/button/btnOrange.vue';
import produksi from '../service/page/produksi';
import alertVue from '../components/dialog/alertVue.vue';
import otoritas from '../service/page/otoritas';
</script>
<script>
  export default {
    components: {
      ScreenDialog2,
      VDataTable,
      textField,
      menuList,
      dialogConfirm,
      BtnFilter,
      datePickerVue,
      BtnCancel,
      BtnOrange,
      alertVue,
    },
    props:['cetak', 'tema', 'user'],
    data () {
      return {
        filter: false,
        drawer: null,
        search: '',
        periode: [],
        dialog2: false,
        confirmdialog: false,
        valert: false,
        authority: '',
        status: null,
        message: '',
        pageTitle: 'PRODUKSI BARANG',
        selectCategory: 'semua',
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        filtered: {
          periode: []
        },
        items: '',
        detailbahan: '',
        head: '',
        detailbhn: '',
        detailbrg: '',
        detailbarang: '',
        groupbarang: '',
        getbarang:'',
        getbahan:'',
        temp: '',
        select_kode: [],
      }
    },
    created() {
      this.periode = [functions.tglawal(), functions.day()]
      this.filtered.periode = [functions.tglawal(), functions.day()]
    },
    methods: {
      async fetchData(){
        let user = localStorage.getItem('user')
        if(user != null) {
          let otority = await api.getOtoritas(user)
          this.authority = otoritas.otoritas(otority)
        }
        if(this.authority != '') {
          let head = await api.getProduksiHead(this.periode)
          this.detailbahan = await api.getProDBahan(this.periode)
          this.detailbarang = await api.getProDBarang(this.periode)
          this.items = produksi.items(head, this.detailbahan, this.detailbarang)
          this.groupbarang = await api.getGroupBarang()
          this.getbarang = await api.getBarang()
        } else return await api.logout()
      },
      // TAMBAH DATA
      inputhead(value, detlbahan, detlbarang) {
        api.postProduksi(value, detlbahan, detlbarang)
        .then(() => {
          this.status = this.valert = true
          this.message = "Data Berhasil Ditambahkan"
          setTimeout(() => {
            this.valert = false
            this.$router.go();
          }, 2500);
        })
        .catch((error) => {
          this.status = false
          this.valert = true
          this.message =  error.response.data
        })
      },
      // HAPUS DATA
      del() {
        api.deleteProduksi(this.head, this.detailbhn, this.detailbrg)
        .then(() => {
          this.status = this.valert = true
          this.message = "Data Berhasil Dibatalkan"
          setTimeout(() => {
            this.valert = false
            this.$router.go();
          }, 2500);
        })
        .catch((error) => {
          this.status = false
          this.valert = true
          this.message =  error.response.data
        })
      },
      confirm(head, detailbrg, detailbhn){
        this.confirmdialog = true
        this.head = head
        this.detailbrg = detailbrg
        this.detailbhn = detailbhn
      },
      selected(){        
        return this.fetchData()
      },
      input_kodegroup(value) {
       
        let kode = []
        let data = []
        for (let i = 0; i < this.groupbarang.length; i++) {
          if(this.groupbarang[i].kode_group == value) {
            kode.push(this.groupbarang[i].kode_barang)
          }
        }

        for (let j = 0; j < this.getbarang.length; j++) {
          for (let k = 0; k < kode.length; k++) {
            if(this.getbarang[j].kode_barang == kode[k]) {
              data.push(this.getbarang[j])
            }
          }
        }
        this.temp = data
        return this.select_kode = kode
      },
      close(v) {
        return this.filter = v
      },
      print(key){
        let title = this.pageTitle
        let header = produksi.headers
        let item = this.items
        functions.print(key, title, header, item)
      },
      page(){
          return this.$emit('page', this.pageTitle)
      },
      reset() {
        this.periode = [this.tglawal(), functions.day()]
        this.filtered.periode = [this.tglawal(), functions.day()]
        this.selected()
      
      },
      filterdata() {
        this.periode[0] = this.filtered.periode[0]
        this.periode[1] = this.filtered.periode[1]
        this.selected()
      }
      },
      mounted() {
          this.fetchData()
          this.page()
      }
  }
  const date = ref();

    onMounted(() => {
      const startDate = new Date();
      date.value = [startDate, startDate];
    })
</script>
<template>
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-label class="text-small mt-4">Tgl Awal</v-label>
      <datePickerVue :max-date="new Date()" v-model="filtered.periode[0]" :filter="true" :tema="tema"/>
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <datePickerVue :min-date="filtered.periode[0]" v-model="filtered.periode[1]" :filter="true" :tema="tema"/>
    </template>
  </filterDrawer>
    <v-container class="pt-9 h-100">
      <v-row no-gutters class="align-end mt-n4 mb-2">
        <v-responsive class="d-flex align-start mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
        <div class="d-flex align-center w-100">
          <!-- TAMBAH DATA -->
          <ScreenDialog2
          v-if="otoritas.routes(authority, 'Tambah Produksi Baru')"
          :tema="tema"
          :headers="produksi.headItem"
          :items="items"
          :groupbarang="groupbarang"
          :getbarang="getbarang"
          @input_kodegroup="input_kodegroup"
          @inputhead="inputhead"
          :select_kode="temp"/>
        </div>
        <!-- <v-chip class="mt-1 me-1" color="orange" size="small">{{ periode[0] }} - {{ periode[1] }}</v-chip> -->
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto mt-md-2 mt-0" width="200" max-width="450">
        <div class="d-flex justify-sm-end justify-start">
          <!-- SEARCH -->
          <textField  v-model="search" placeholder="Search" icon="mdi-magnify" class="me-2"/>
            <!-- EXPORT DATA -->
            <menuList
              icon="mdi-dots-vertical"
              :items="cetak"
              @result="print"
            />
            <!-- BUTTON FILTER -->
            <btn-filter @click="filter = !filter" />
          </div>
      </v-responsive>
      </v-row>
        <!-- EDIT DATA -->
        <v-sheet height="94%" class="bg-transparent">
        <v-data-table
            id="tbl_exporttable_to_xls"
            items-per-page="10"
            :headers="produksi.headers"
            :items="items"
            :search="search"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption pt-1 pb-12 h-100 border-sm rounded-lg"
            height="100%">
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.tgl_produksi="{ item }">{{ functions.formatDate(item.raw.tgl_produksi) }}</template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.actions="{ item }">
                <ScreenDialog2
                :hapus="otoritas.routes(authority, 'Batal Pembelian')"
                batalbtn="Produksi"
                :edit="true"
                :detailbahan="produksi.bahan(item.raw.no_produksi, detailbahan)"
                :detailbarang="produksi.barang(item.raw.no_produksi, detailbarang)"
                @confirm="confirm"
                :headItem="produksi.headItem"
                :item="item.raw"
                :headers="produksi.headers"
                />
            </template>
          </v-data-table>
          </v-sheet>
        <dialogConfirm v-model="confirmdialog" :object="pageTitle">
          <template #yesButton>
              <btn-orange @click="del(), confirmdialog = false" btn_title="Ya"/>
          </template>
          <template #cancelButton>
            <btn-cancel class="me-2" @click="confirmdialog = false" btn_title="Batal" />
          </template>
        </dialogConfirm>
      <alertVue v-model="valert" :sukses="status" :message="message" />
  </v-container>

</template>
