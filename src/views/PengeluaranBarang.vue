<script setup>
  // service
  import api from '../service/api';
  import functions from '../service/functions';
  import pengeluaran from '../service/page/pengeluaran';
  import pelanggan from '../service/page/pelanggan';
  // Component
  import { VDataTable } from 'vuetify/labs/VDataTable'
  import PengeluaranDetail from './PengeluaranDetail.vue'
  import { ref, onMounted } from 'vue'
  import filterDrawer from '../components/drawer/filterDrawer.vue'
  import textField from '../components/form/textField.vue'
  import menuList from '../components/menu/menuList.vue'
  import checkBox from '../components/form/checkBox.vue'
  import dialogConfirm from '../components/dialog/dialogConfirm.vue';
import DatePicker from '../components/datepicker/datePicker.vue';

  // plugins
import BtnFilter from '../components/button/btnFilter.vue';
import BtnCancel from '../components/button/btnCancel.vue';
import BtnOrange from '../components/button/btnOrange.vue';
</script>

<script>


  export default {
    components: {
      dialogConfirm,
      PengeluaranDetail,
      VDataTable,
      filterDrawer,
      textField,
      menuList,
      checkBox,
      BtnFilter,
      DatePicker,
      BtnCancel,
      BtnOrange
    },
    props:['cetak'],
    data () {
      return {
        filter: false,
        search: '',
        periode: '',
        checkStatus: [],
        datapelanggan: '',
        dialog2: false,
        confirmdialog: false,
        status: null,
        valert: false,
        message: '',
        pageTitle: 'PENGELUARAN BARANG',
        selectdokumen: [],
        btnTitle: 'Tambah Data',
        btn: 'Tambah Barang',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        filtered: {
          selectdokumen: [],
          periode: [],
          status: []
        },
        penjualan_head: '',
        penjualan_detail: '',
        head: '',
        detail: '',
        groupbarang: '',
        barang: ''
      }
    },
    created() {
      this.periode = [functions.tglawal(), functions.day()]
      this.filtered.periode = [functions.tglawal(), functions.day()] 
    },
    methods: {
      async fetchData() {
        let item = await api.getPenjualanHead(this.periode)
        this.datapelanggan = await api.getPelanggan()
        this.penjualan_head = pengeluaran.items(item, this.datapelanggan)
        this.penjualan_detail = await api.getPenjualanDetail(this.periode)
        this.groupbarang = await api.getGroupBarang()
        this.barang = await api.getBarang()
      },
      close(v) {
        return this.filter = v
      },
      // POST PENJUALAN
      inputhead(value, detail) {
        api.postPengeluaran(value, detail)
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
      // HAPUS PENJUALAN
      del() {
        api.deletePengeluaran(this.head, this.detail)
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
      selected(){
        this.fetchData()
      },
      print(key){
        let title = this.pageTitle
        let header = pengeluaran.headers
        let item = this.penjualan_head
        functions.print(key, title, header, item)
      },
      page(){
        return this.$emit('page', this.pageTitle)
      },
      reset() {
        this.periode = [functions.tglawal(), functions.day()]
        this.filtered.periode = [functions.tglawal(), functions.day()]
        this.filtered.selectdokumen = []
        this.filtered.status = []
        functions.day()
        this.selectdokumen = []
        this.checkStatus = []
        this.selected()
        
      },
      filterdata() {
        this.periode[0] = this.filtered.periode[0]
        this.periode[1] = this.filtered.periode[1]
        this.checkStatus = this.filtered.status
        this.selected()
        this.selectdokumen = this.filtered.selectdokumen
        if(!this.selectdokumen) {
          this.selectdokumen = []
          } else if (this.selectdokumen == []) {
            this.selectdokumen = []
          }

      }
    },
      mounted() {
        this.page()
        this.selected()
    }
  }

  const date = ref();

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
      <!-- PERIODE -->
      <v-span class="text-caption text-weight-bold">Periode</v-span>
      <v-divider></v-divider>
      <v-label>Tgl Awal</v-label>
      <DatePicker v-model="filtered.periode[0]" :filter="true"/>
      <v-label class="text-small mt-1">Tgl Akhir</v-label>
      <DatePicker v-model="filtered.periode[1]" :filter="true" />
      <!-- TIPE DOKUMEN -->
      <v-span class="text-caption text-weight-bold">Tipe Dokumen</v-span>
      <v-divider class="mb-6"></v-divider>
        <checkBox
          v-for="label, i in pengeluaran.tipedokumen" :key="i"
          v-model="filtered.selectdokumen"
          :label="label"
          :value="label"
        />
      <!-- STATUS -->
      <v-span class="text-caption text-weight-bold">Status</v-span>
      <v-divider class="mb-6"></v-divider>
      <checkBox
        v-for="label, i in pengeluaran.status" :key="i"
        v-model="filtered.status"
        :label="label.title"
        :value="label.key"
      />
    </template>
  </filterDrawer>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="rounded-t-xl align-start mt-n4 mb-2">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
        <div class="d-flex align-center w-100">
          <!-- TAMBAH DATA -->
          <PengeluaranDetail
            batalbtn="Pengeluaran"
            :datainput="pengeluaran.datainput"
            :pengeluaran="true"
            :groupbarang="groupbarang"
            :pelanggan="datapelanggan"
            :datatext="datatext"
            :pageTitle="pageTitle"
            :btn="btn"
            :headDetails="pengeluaran.headDetails"
            :headers="pengeluaran.headers"
            :items="pengeluaran.checkstatus(selectdokumen, penjualan_head, checkStatus)"
            :barang="barang"
            :search="search"
            :category="category"
            :selectCategory="selectCategory"
            :alpha="alpha"
            @inputhead="inputhead"
          />
        </div>
          <!-- <v-chip class="mt-1 me-1" color="orange" size="small">{{ periode[0] }} - {{ periode[1] }}</v-chip>
          <v-chip v-if="selectdokumen" class="mt-1" color="orange" size="small">{{ selectdokumen }}</v-chip> -->
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" width="200" max-width="450">
        <div class="d-flex align-center justify-sm-end justify-start mt-md-1 mt-0">
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
            :headers="pengeluaran.headers"
            :items="pengeluaran.checkstatus(selectdokumen, penjualan_head, checkStatus)"
            :search="search"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption py-3 h-100"
            height="100%"
            >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
              <!-- <template v-slot:item.tgl_penjualan="{item}">
                {{ functions.formatDate(item.raw.tgl_penjualan) }}
              </template> -->
            <!-- CUSTOM PAGINATION STYLE -->
            <!-- <template v-slot:bottom> -->
                <!-- <v-row no-gutters class="justify-end align-center my-1">
                  <v-pagination
                    v-model="page"
                    :length="4"
                    size="small"
                    rounded="circle"
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
                  ></v-pagination>
                  <v-spacer></v-spacer>
                  <span>Total: 1978 data</span>
                </v-row> -->
              <!-- </template> -->
            <!-- dialog actions -->
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.tgl_penjualan="{ item }">{{ functions.formatDate(item.raw.tgl_penjualan) }}</template>
             <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.actions="{item}">
              <PengeluaranDetail
              @confirm="confirm"
              batalbtn="Pengeluaran"
              :namaPelanggan="pelanggan.namaPelanggan(pelanggan, item.raw.kode_pelanggan)"
              :penjualan="pengeluaran.penjualan(penjualan_detail,
              item.raw.no_penjualan)"
              :edit="true"
              :pengeluaran="true"
              :pageTitle="pageTitle"
              :headDetails="pengeluaran.headDetails"
              :items="item.raw"
              :headers="pengeluaran.headers"
              :search="search"
              :category="category"
              :selectCategory="selectCategory"
              :disable="true"/>
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
  </v-container>

</template>
