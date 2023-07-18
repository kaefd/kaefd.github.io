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
import squareButton from '../components/button/buttonVue.vue';
// plugins
import BtnFilter from '../components/button/btnFilter.vue';
import DatePicker from '../components/datepicker/datePicker.vue';
import TextButton from '../components/button/textButton.vue';
</script>

<script>

  export default {
    components: {
      SuratJalan,
      squareButton,
      dialogConfirm,
      PengirimanDetail,
      VDataTable,
      filterDrawer,
      textField,
      menuList,
        BtnFilter,
        DatePicker,
        TextButton
    },
    props:['actIcon', 'cetak'],
    data () {
      return {
        drawer: null,
        search: '',
        tgl:'',
        filter: false,
        confirmdialog: false,
        valert: false,
        status: '',
        message: '',
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
      async fetchData() {
        let item = await api.getPengirimanHead(this.periode)
        this.alamatBongkar = await api.alamatBongkar()
        this.pelanggan = await api.getPelanggan()
        this.pengirimanHead = pengiriman.items(item, this.pelanggan, this.alamatBongkar)
        this.penjualanHead = await api.getPenjualanHead(this.periode)
        this.kirim_detail = await api.getPengirimanDetail(this.periode)
      },
      close(v) {
        return this.filter = v
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
            // this.$router.go();
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
      <DatePicker v-model="filtered.periode[0]" :filter="true"/>
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <DatePicker v-model="filtered.periode[1]" :filter="true" />
    </template>
  </filterDrawer>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="rounded-t-xl align-start mt-n4 mb-2">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1" min-width="200">
        <div class="d-flex align-center w-100">
          <!-- TAMBAH DATA -->
          <PengirimanDetail @inputhead="inputhead" :alamatBongkar="alamatBongkar" :kirim="true" :edit="false" :supplier="pelanggan" :datainput="pengiriman.datainput" :pageTitle="pageTitle" :btn="btn" :headDetails="pengiriman.headDetails" :details="items" :headers="pengiriman.headers" :items="items" :search="search" :category="barang.category" :selectCategory="selectCategory" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon" :datatext="datatext"/>
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
      <v-sheet height="90%">
        <v-data-table
            id="tbl_exporttable_to_xls" 
            items-per-page="10"
            :headers="pengiriman.headers"
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
                          batalbtn="Pengiriman"
                          :kirim="true"
                          :edit="true"
                          @confirm="confirm"
                          :pengiriman="Penjualandetl(item.raw.no_pengiriman)"
                          :nokirim="item.raw.no_pengiriman"
                          :detail_kirim="pengiriman.details(item.raw.no_pengiriman, kirim_detail, penjualanHead)"
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
                        :detail_kirim="kirim_detail"
                        :nopjl="Penjualandetl(item.raw.no_pengiriman)"
                      />
                    </v-list>
                  </v-menu>
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
