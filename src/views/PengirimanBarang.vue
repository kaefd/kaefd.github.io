<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
import barang from '../service/page/barang';
import pengiriman from '../service/page/pengiriman';
// component
import { VDataTable } from 'vuetify/labs/VDataTable'
import PengirimanDetail from './PengirimanDetail.vue';
import SuratJalan from './SuratJalan.vue';
import { ref, onMounted } from 'vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import textField from '../components/form/textField.vue';
import menuList from '../components/menu/menuList.vue';
import dialogConfirm from '../components/dialog/dialogConfirm.vue';
// plugins
import BtnFilter from '../components/button/btnFilter.vue';
import DatePicker from '../components/datepicker/datePicker.vue';
import TextButton from '../components/button/textButton.vue';
import otoritas from '../service/page/otoritas';
import BtnCancel from '../components/button/btnCancel.vue';
import AlertVue from '../components/dialog/alertVue.vue';
import BtnOrange from '../components/button/btnOrange.vue';
import pengeluaran from '../service/page/pengeluaran';
</script>

<script>

  export default {
    components: {
      SuratJalan,
      dialogConfirm,
      PengirimanDetail,
      VDataTable,
      filterDrawer,
      textField,
      menuList,
      BtnFilter,
      DatePicker,
      TextButton,
      AlertVue,
        BtnOrange,
        BtnCancel,
    },
    props :['cetak', 'tema', 'user', 'window'],
    data () {
      return {
        drawer: null,
        search: '',
        filter: false,
        confirmdialog: false,
        valert: false,
        authority: '',
        status: '',
        pjl_terkirim: '',
        pjl_blmterkirm: '',
        message: '',
        periode: [],
        checkStatus: 'menunggu',
        pageTitle: 'PENGIRIMAN BARANG',
        selectCategory: '',
        btn: 'Tambah Barang',
        filtered: {
          periode: []
        },
        sortBy: [{ key: 'no_pengiriman', order: 'desc' }],
        pengirimanHead: '',
        penjualanHead: '',
        head: '',
        detail: '',
        kirim_detail: '',
        pelanggan: '',
        alamatBongkar: '',
        nopjl: '',
      }
    },
    created() {
      this.periode = [functions.tglawal(), functions.day()]
      this.filtered.periode = [functions.tglawal(), functions.day()]
    },
    methods: {
      page(){
        return this.$emit('page', this.pageTitle)
      },
      async fetchData() {
        let user = localStorage.getItem('user')
        if(user != null) {
          let otority = await api.getOtoritas(user)
          this.authority = otoritas.otoritas(otority)
        }
        if(this.authority != '') {
          let item = await api.getPengirimanHead(this.periode)
          this.alamatBongkar = await api.alamatBongkar()
          this.pelanggan = await api.getPelanggan()
          this.pengirimanHead = pengiriman.items(item, this.pelanggan, this.alamatBongkar)
          this.penjualanHead = await api.getPenjualanHead(this.periode)
          this.kirim_detail = await api.getPengirimanDetail(this.periode)
          let blm_kirim = await api.getBelumTerkirim()
          let blm_kirim_detail = await api.getBelumTerkirimDetail()
          this.pjl_blmterkirm = pengeluaran.item_blmterikirim(blm_kirim, blm_kirim_detail)
        } else return await api.logout()
      },
      close(v) {
        return this.filter = v
      },
      Penjualandetl(value) {
        let a = []
        for (let i = 0; i < this.kirim_detail.length; i++) {
          if ( this.kirim_detail[i].no_pengiriman == value ) {
              a.push(this.kirim_detail[i].no_penjualan)
          }
        }
        return a
      },
      pjl_detail(value) {
        let a = []
          for (let j = 0; j < this.kirim_detail.length; j++) {
              if(this.kirim_detail[j].no_pengiriman == value) {
                a.push(this.kirim_detail[j])
              }
        }
        return a
      },
      selected() {
        this.fetchData()
      },
      print(key){
        let title = this.pageTitle
        let header = pengiriman.headers
        let item = this.pengirimanHead
        functions.print(key, title, header, item)
      },
      reset() {
        this.periode = [functions.tglawal(), functions.day()]
        this.filtered.periode = [functions.tglawal(), functions.day()]
        this.selected()
      },
      filterdata() {
        this.periode[0] = this.filtered.periode[0]
        this.periode[1] = this.filtered.periode[1]
        this.selected()
      },
      inputhead(head, detail) {
        api.postPengiriman(head, detail)
        .then(() => {
          this.status = this.valert = true
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
        api.deletePengiriman(this.head, this.detail)
        .then(() => {
          this.status = this.valert = true
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
      confirm(head, detail){
        this.confirmdialog = true
        this.head = head
        this.detail = detail
      },
    },
    mounted(){
      this.page()
      this.fetchData()
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
      <DatePicker v-model="filtered.periode[0]" :max-date="new Date()" :filter="true" :tema="tema"/>
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <DatePicker v-model="filtered.periode[1]" :min-date="filtered.periode[0]" :filter="true" :tema="tema"/>
    </template>
  </filterDrawer>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="rounded-t-xl align-end mt-n4 mb-2">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1" min-width="200">
        <div class="d-flex align-center w-100">
          <!-- TAMBAH DATA -->
          <PengirimanDetail
          v-if="otoritas.routes(authority, 'Tambah Pengiriman Baru')"
          :tema="tema"
          :pjl_blmterkirm="pjl_blmterkirm"
          @inputhead="inputhead"
          :alamatBongkar="alamatBongkar"
          :kirim="true"
          :supplier="pelanggan"
          :datainput="pengiriman.datainput"
          :pageTitle="pageTitle"
          :headDetails="pengiriman.headDetails"
          :details="items"
          :headers="pengiriman.headers"
          :items="items"
          :search="search"
          :category="barang.category"
          :selectCategory="selectCategory"
          :datatext="datatext"/>
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
          <!-- BUTTON FILTER -->
          <btn-filter @click="filter = !filter" />
        </div>
      </v-responsive>
      </v-row>
        <!-- EDIT DATA -->
        <v-sheet :height="window > 776 ? '94%' : '87%'">
        <v-data-table
            v-model:sort-by="sortBy"
            id="tbl_exporttable_to_xls" 
            items-per-page="10"
            :headers="pengiriman.headers"
            :items="pengirimanHead"
            :search="search"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption pt-1 pb-12 border-sm rounded-lg h-100"
            :height="window > 776 ? '100%' : '92%'"
            >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.tgl_pengiriman="{item}">
                {{ functions.formatDate(item.raw.tgl_pengiriman) }}
              </template>
             <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.actions="{ item }">
                  <v-menu transition="slide-y-transition">
                    <!-- activator -->
                    <template v-slot:activator="{ props }">
                      <text-button v-bind="props" icon="mdi-dots-vertical" />
                    </template>
                    <!-- list item -->
                    <v-list density="compact" class="px-3">
                      <v-list-item class="pa-0">
                        <PengirimanDetail
                          :window="window"
                          :hapus="otoritas.routes(authority, 'Batal Pengiriman')"
                          batalbtn="Pengiriman"
                          :kirim="true"
                          :edit="true"
                          @confirm="confirm"
                          :pengiriman="Penjualandetl(item.raw.no_pengiriman)"
                          :nokirim="item.raw.no_pengiriman"
                          :nopjl="Penjualandetl(item.raw.no_pengiriman)"
                          :pjl_detail="pjl_detail(item.raw.no_pengiriman)"
                          :pageTitle="pageTitle"
                          :headDetails="pengiriman.headDetails"
                          :headers="pengiriman.headers"
                          :items="item.raw"
                          :disable="true"
                          />
                      </v-list-item>
                      <SuratJalan
                        :pengiriman="Penjualandetl(item.raw.no_pengiriman)"
                        :items="item.raw"
                        :nokirim="item.raw.no_pengiriman"
                        :nopjl="Penjualandetl(item.raw.no_pengiriman)"
                        :pjl_detail="pjl_detail(item.raw.no_pengiriman)"
                      />
                    </v-list>
                  </v-menu>
            </template>
            </v-data-table>
        </v-sheet>
        <dialogConfirm v-model="confirmdialog" :object="pageTitle">
        <template #yesButton>
          <btn-orange class="ms-2" @click="del(), confirmdialog = false" btn_title="Ya"/>
        </template>
        <template #cancelButton>
          <btn-cancel @click="confirmdialog = false" btn_title="Batal" />
        </template>
        </dialogConfirm>
        <alert-vue v-model="valert" :sukses="status" :message="message"/>
  </v-container>

</template>
