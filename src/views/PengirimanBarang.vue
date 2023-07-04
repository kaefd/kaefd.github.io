<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
// component
import { VDataTable } from 'vuetify/labs/VDataTable'
import PengirimanDetail from './PengirimanDetail.vue';
import SuratJalan from './SuratJalan.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, onMounted } from 'vue';
import AppBar from '../components/appbar/AppBar.vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import textField from '../components/form/textField.vue';
import menuList from '../components/menu/menuList.vue';
import dialogConfirm from '../components/dialog/dialogConfirm.vue';
import squareButton from '../components/button/buttonVue.vue';
// plugins
import { id } from 'date-fns/locale';
import BtnFilter from '../components/button/btnFilter.vue';

</script>

<script>

  export default {
    components: {
      SuratJalan,
      squareButton,
      dialogConfirm,
      PengirimanDetail,
      VDataTable,
      AppBar,
      filterDrawer,
      textField,
      menuList,
        BtnFilter,
    },
    props:['actIcon', 'cetak'],
    data () {
      return {
        drawer: null,
        search: '',
        tgl:'',
        filter: false,
        confirmdialog: false,
        periode: [],
        checkStatus: 'menunggu',
        dialog2: false,
        pageTitle: 'PENGIRIMAN BARANG',
        selectCategory: '',
        btnTitle: 'Tambah Data',
        btn: 'Tambah Barang',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        category: [
          'Bahan Baku',
          'Bahan Penolong',
          'Barang Setengah Jadi',
          'Barang Jadi',
          'Barang Sisa (Scrap)',
          'Mesin & Peralatan',
        ],
        headers: [
          { title: 'No Pengiriman', key: 'no_pengiriman'},
          { title: 'Tgl Pengiriman', key: 'tgl_pengiriman' },
          { title: 'Pelanggan', key: 'kode_pelanggan' },
          { title: 'Tujuan Bongkar', key: 'kode_alamat_bongkar' },
          { title: 'Supir', key: 'supir' },
          { title: 'Polisi', key: 'no_polisi' },
          { title: '', key: 'actions', sortable: false},
        ],
        filtered: {
          periode: []
        },
        pengirimanHead: '',
        penjualanHead: '',
        head: '',
        detail: '',
        kirim_detail: '',
        pelanggan: '',
        alamatBongkar: '',
        headDetails:[
          {title: 'No Penjualan', key: 'no_penjualan' },
          {title: 'Tipe Dokumen', key: 'tipe_dokumen' },
          {title: 'No Dokumen', key: 'no_dokumen' },
          {title: 'Kode Group', key: 'kode_group' },
          {title: 'Kode Barang', key: 'kode_barang' },
          {title: 'Nama Barang', key: 'nama_barang' },
          {title: 'HS Code', key: 'hs_code' },
          {title: 'Jumlah', key: 'jumlah' },
          {title: 'Satuan', key: 'satuan' },
          {title: '', key: 'actions', sortable: false },
        ],
        datainput: {
          no_pengiriman: '',
          tgl_pengiriman: '',
          kode_pelanggan: '',
          kode_alamat_bongkar: '',
          supir: '',
          no_polisi: '',
          user_input: '',
          tgl_input: '',
          tgl_batal:'',
          user_batal: '',
          status: ''
        },
        nokirim: '0',
        detailkirim: '',
        no: '',
        tipe: ''

      }
    },
    created() {
      this.nokirim
      this.periode = [functions.tglawal(), functions.day()]
      this.filtered.periode = [functions.tglawal(), functions.day()]
    },
    methods: {
      page(){
        return this.$emit('page', this.pageTitle)
      },
      // GET DATA PENGIRIMAN-HEAD
      getPengirimanHead() {
        const apiUrl = '/pengiriman_head?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, { params })
        .then(response => {
          this.pengirimanHead = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      // GET PENGIRIMAN DETAIL
      getPengirimanDetail() {
        const apiUrl = '/pengiriman_detail?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, { params })
        .then(response => {
          this.kirim_detail = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      // PENJUALAN HEAD
      getPenjualanHead() {
        const apiUrl = '/penjualan_head?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, { params })
        .then(response => {
          this.penjualanHead = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      tujuanBongkar(){
        const apiUrl = '/alamat_bongkar'
        api.getData(apiUrl)
        .then(response => {
        this.alamatBongkar = response.data
        })
        .catch(() => {
        return this.$router.push('login');
        })
        },
      getPelanggan() {
        const apiUrl = '/pelanggan'
        api.getData(apiUrl)
        .then(response => {
          this.pelanggan = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      close(v) {
        return this.filter = v
      },
      namaPelanggan(value) {
        for (let i = 0; i < this.pelanggan.length; i++) {
          if ( this.pelanggan[i].kode_pelanggan == value ) {
              return this.pelanggan[i].nama
          }
          
        }
      },
      alamatPelanggan(value) {
        for (let i = 0; i < this.pelanggan.length; i++) {
          if ( this.pelanggan[i].kode_pelanggan == value ) {
              return this.pelanggan[i].alamat
          }
          
        }
      },
      Penjualandetl(value) {
        let a = []
        for (let i = 0; i < this.kirim_detail.length; i++) {
          if ( this.kirim_detail[i].no_pengiriman == value ) {
              a.push(this.kirim_detail[i])
          }
        }
        return a
      },
      pjl_detail(value) {
        for (let i = 0; i < this.pengirimanHead.length; i++) {
          for (let j = 0; j < this.penjualanHead.length; j++) {
            if ( this.pengirimanHead[i].no_pengiriman == value ) {
              if(this.penjualanHead[j].no_penjualan == this.pengirimanHead.no_penjualan) {
                return this.penjualanHead[j]
              } 
            }else 'salah'
          }
        }
      },
      namaTujuan(value){
        for (let i = 0; i < this.alamatBongkar.length; i++) {
          if ( this.alamatBongkar[i].kode_pelanggan == value ) {
              return this.alamatBongkar[i].nama
          }
          
        }
      },
      selected() {
        this.getPengirimanHead(), this.getPengirimanDetail(), this.getPenjualanHead()
      },
      printdata() {
        let a = []
        for (let i = 0; i < this.pengirimanHead.length; i++) {
          a.push({
            no_pengiriman: this.pengirimanHead[i].no_pengiriman,
            tgl_pengiriman: this.pengirimanHead[i].tgl_pengiriman,
            kode_pelanggan: this.namaPelanggan(this.pengirimanHead[i].kode_pelanggan),
            kode_alamat_bongkar: this.namaTujuan(this.pengirimanHead[i].kode_alamat_bongkar),
            supir: this.pengirimanHead[i].supir,
            no_polisi: this.pengirimanHead[i].no_polisi,
          })
        }
        return a
      },
      print(key){
        let title = this.pageTitle
        let header = this.headers
        let item = this.printdata()
        functions.print(key, title, header, item)
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

      },
      inputhead(head, detail) {
        let h = {
          no_pengiriman: head.no_pengiriman,
          tgl_pengiriman: head.tgl_pengiriman,
          kode_pelanggan: head.kode_pelanggan,
          kode_alamat_bongkar: head.kode_alamat_bongkar,
          supir: head.supir,
          no_polisi: head.no_polisi,
          user_input: 'admin',
          tgl_input: this.tgl,
          tgl_batal:head.tgl_batal,
          user_batal: head.user_batal,
          status: true
        }
        // const apiUrl = '/pembelian_head?'
        const value1 = JSON.stringify(h);
        const value2 = JSON.stringify(detail);
        console.log({
          pengiriman_head: value1,
          pengiriman_detail: value2
        });
        // api.postData( apiUrl, {
        //   pengiriman_head : value1,
        //   pengiriman_detail : value2
        // })
        // .then(() => {
        //     window.location.href = '/in' 
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
      },
      // HAPUS DATA
      del() {
      let pengiriman_head = {
          no_pengiriman: this.head.no_pengiriman,
          tgl_pengiriman: this.head.tgl_pengiriman,
          kode_pelanggan: this.head.kode_pelanggan,
          kode_alamat_bongkar: this.head.kode_alamat_bongkar,
          supir: this.head.supir,
          no_polisi: this.head.no_polisi,
          user_input: this.head.user_input,
          tgl_input: this.head.tgl_input,
          tgl_batal:this.head.tgl_batal,
          user_batal: this.head.user_batal,
          status: false
      }
      const ph = JSON.stringify(pengiriman_head);
      const pd = JSON.stringify(this.detail);
        console.log({
          pengiriman_head: ph,
          pengiriman_detail: pd,
        });
        // api.deleteData('/pembelian_head', {
        //   pembelian_head : ph,
        //   pembelian_detail : pd,
        // })
        // .then(() => {
        //   window.location.href = '/in'
        // })
        // .catch((error) => {
        //   console.log(error);
        // })
      },
      confirm(head, detail){
        this.confirmdialog = true
        this.head = head
        this.detail = detail
      },
      
    },
    mounted(){
      this.page()
      this.getPengirimanHead()
      this.getPengirimanDetail()
      this.getPelanggan()
      this.getPenjualanHead()
      this.tujuanBongkar()
    }
    
  }
  const date = ref()

    // For demo purposes assign range from the current date
    onMounted(() => {
      const startDate = new Date();
      // const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      date.value = [startDate, startDate];
    })

</script>

<template>
  <filterDrawer v-model="filter" @close="close" @reset="reset" @filterdata="filterdata">
    <template #default>
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-label class="text-small mt-4">Tgl Awal</v-label>
      <VueDatePicker class="text-small" :clearable="false" v-model="filtered.periode[0]" :format-locale="id" locale="id" cancelText="batal" selectText="pilih" format="PP" />
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <VueDatePicker class="text-small mb-4" :clearable="false" v-model="filtered.periode[1]" :format-locale="id" locale="id" cancelText="batal" selectText="pilih" format="PP" />
    </template>
  </filterDrawer>
  <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="rounded-t-xl align-start mt-n4 mb-2">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1" min-width="200">
        <div class="d-flex align-center w-100">
          <!-- BUTTON FILTER -->
          <btn-filter @click="filter = !filter" />
          <!-- TAMBAH DATA -->
          <PengirimanDetail @inputhead="inputhead" :kirim="true" :edit="false" :supplier="pelanggan" :datainput="datainput" :pageTitle="pageTitle" :btn="btn" :headDetails="headDetails" :details="items" :headers="headers" :items="items" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon" :datatext="datatext"/>
        </div>
        <!-- <v-chip class="mt-1 me-1" color="orange" size="small">{{ periode[0] }} - {{ periode[1] }}</v-chip> -->
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" max-width="450">
        <div class="d-flex align-center justify-sm-end justify-start">
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
        <!-- EDIT DATA -->
      <v-sheet height="90%">
        <v-data-table
            id="tbl_exporttable_to_xls" 
            items-per-page="10"
            :headers="headers"
            :items="pengirimanHead"
            :search="search"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption py-3 px-5 h-100"
            height="100%"
            >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.tgl_pengiriman="{item}">
                {{ functions.formatDate(item.raw.tgl_pengiriman) }}
              </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.kode_pelanggan="{ item }">
              <td>{{ namaPelanggan(item.raw.kode_pelanggan) }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.kode_alamat_bongkar="{ item }">
              <td>{{ namaTujuan(item.raw.kode_alamat_bongkar) }}</td>
            </template>
             <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.actions="{ item }">
                <v-btn size="small" variant="text" color="grey-darken-2">
                  <v-icon>mdi-dots-vertical</v-icon>
                  <v-menu activator="parent" transition="slide-y-transition">
                    <v-list density="compact" class="px-3">
                      <v-list-item class="pa-0">
                        <PengirimanDetail
                          batalbtn="Pengiriman"
                          :kirim="true"
                          :edit="true"
                          @confirm="confirm"
                          :namaPelanggan="namaPelanggan(item.raw.kode_pelanggan)"
                          :alamatPelanggan="alamatPelanggan(item.raw.kode_pelanggan)"
                          :namaTujuan="namaTujuan(item.raw.kode_alamat_bongkar)"
                          :pengiriman="Penjualandetl(item.raw.no_pengiriman)"
                          :nokirim="item.raw.no_pengiriman"
                          :detail_kirim="kirim_detail"
                          :nopjl="Penjualandetl(item.raw.no_pengiriman)"
                          :pjl_detail="pjl_detail(item.raw.no_pengiriman)"
                          :pageTitle="pageTitle"
                          :headDetails="headDetails"
                          :headers="headers"
                          :items="item.raw"
                          :iTitle="actIcon[3].text"
                          :btncolor="actIcon[3].color"
                          :icon="actIcon[3].icon"
                          :iVariant="actIcon[3].variant"
                          :alpha="alpha"
                          :actIcon="actIcon"
                          :disable="true"
                          />
                      </v-list-item>
                      <SuratJalan
                        :alamatPelanggan="alamatPelanggan(item.raw.kode_pelanggan)"
                        :namaPelanggan="namaPelanggan(item.raw.kode_pelanggan)"
                        :namaTujuan="namaTujuan(item.raw.kode_alamat_bongkar)"
                        :pengiriman="Penjualandetl(item.raw.no_pengiriman)"
                        :items="item.raw"
                        :nokirim="item.raw.no_pengiriman"
                        :detail_kirim="kirim_detail"
                        :nopjl="Penjualandetl(item.raw.no_pengiriman)"
                      />
                    </v-list>
                  </v-menu>
              </v-btn>
            </template>
            </v-data-table>
        </v-sheet>
        <dialogConfirm v-model="confirmdialog" :object="pageTitle">
          <template #yesButton>
              <squareButton type="submit" variant="outlined" color="orange-lighten-1" @click="del(), confirmdialog = false" btn_title="Ya"/>
          </template>
          <template #cancelButton>
            <squareButton type="submit" variant="outlined" color="grey" @click="confirmdialog = false" btn_title="Batal" />
          </template>
        </dialogConfirm>
  </v-container>

</template>
