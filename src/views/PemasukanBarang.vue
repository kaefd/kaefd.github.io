<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
import pemasukan from '../service/page/pemasukan';
// components
import TableVue from '../components/TableVue.vue';
import PemasukanDetail from './PemasukanDetail.vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import btnFilter from '../components/button/btnFilter.vue';
import textField from '../components/form/textField.vue';
import menuList from '../components/menu/menuList.vue';
import checkBox from '../components/form/checkBox.vue';
import dialogConfirm from '../components/dialog/dialogConfirm.vue';
import squareButton from '../components/button/buttonVue.vue';
import { ref, onMounted } from 'vue';
import DatePicker from '../components/datepicker/datePicker.vue';
</script>

<script>
export default {
    components: {
    PemasukanDetail,
    dialogConfirm,
    TableVue,
    filterDrawer,
    squareButton,
    textField,
    menuList,
    checkBox,
    DatePicker
},
    props:['actIcon', 'cetak'],
    data () {
      return {
        search: '',
        periode: [],
        filter: false,
        confirmdialog: false,
        pageTitle: 'PEMASUKAN BARANG',
        btn: 'Tambah Barang',
        selectdokumen: [],
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        pemasukan_item: '',
        pembelian_head: '',
        pdetail: '',
        // pilihtipe: 'BC40',
        items: '',
        supplier: '',
        pembeliandetl: '',
        filtered: {
          selectdokumen: [],
          periode: []
        },
        details: [],
      }
    },
    created() {
       this.periode = [functions.tglawal(), functions.day()]
       this.filtered.periode = [functions.tglawal(), functions.day()]
    },
    computed: {
    },
    methods: {
      page(){
        return this.$emit('page', this.pageTitle)
      },
      async fetchData() {
        this.items = await api.getPemasukanHead(this.periode)
        this.supplier = await api.getSupplier()
        this.pembeliandetl = await api.getPemasukanDetail(this.periode)
      },
      // TAMBAH DATA
      inputhead(value, valuedetail) {
        // const apiUrl = '/pembelian_head?'
        const value1 = JSON.stringify(value);
        const value2 = JSON.stringify(valuedetail);
        console.log({
          pembelian_head: value1,
          pembelian_detail: value2
        });
        // api.postData( apiUrl, {
        //   pembelian_head : value1,
        //   pembelian_detail : value2
        // })
        // .then(() => {
        //     window.location.href = '/in' 
        //   })
        //   .catch(() => {
        //     console.log();
        //   })
      },
      // HAPUS DATA
      del() {
      let head = ''
      let detail = ''
      head = {
          no_pembelian: this.pembelian_head.no_pembelian,
          tgl_pembelian: this.pembelian_head.tgl_pembelian,
          kode_supplier: this.pembelian_head.kode_supplier,
          tipe_dokumen: this.pembelian_head.tipe_dokumen,
          no_dokumen: this.pembelian_head.no_dokumen,
          tgl_dokumen: this.pembelian_head.tgl_dokumen,
          no_invoice: this.pembelian_head.no_invoice,
          no_bl: this.pembelian_head.no_bl,
          mata_uang: this.pembelian_head.mata_uang,
          kurs: this.pembelian_head.kurs,
          user_input: 'admin',
          user_batal: 'admin',
          status: 'false'
      }
      detail = [{
            no_pembelian: this.pdetail.no_pembelian,
            kode_barang: this.pdetail.kode_barang,
            nama_barang: this.pdetail.nama,
            hs_code: this.pdetail.hs_code,
            jumlah: this.pdetail.jumlah,
            jumlah_diterima: this.pdetail.jumlah_diterima,
            satuan: this.pdetail.satuan,
            nilai: this.pdetail.nilai,
            no_urut:this.pdetail.no_urut,
      }]
      const ph = JSON.stringify(head);
      const pd = JSON.stringify(detail);
        console.log({
          pembelian_head: ph,
          pembelian_detail: pd,
        });
        // api.deleteData('/pembelian_head', {
        //   pembelian_head : ph,
        //   pembelian_detail : pd,
        // })
        // .then(() => {
        //   window.location.href = '/in'
        // })
        // .catch(() => {
        //   console.log();
        // })
      },
      confirm(head, detail){
        this.confirmdialog = true
        this.pembelian_head = head
        this.pdetail = detail
      },
      // inisialisasi
      selected(){ 
        this.fetchData()
      },
      // GET DATA PEMBELIAN-DETAIL
      close(v) {
      return this.filter = v
      },
      print(key){
        let title = this.pageTitle
        let header = pemasukan.data().headers
        let item = pemasukan.printdata(this.items, this.supplier, this.pembeliandetl)
        functions.print(key, title, header, item)
      },
      reset() {
        this.def = true
        this.periode = [functions.tglawal(), functions.day()]
        this.filtered.periode = [functions.tglawal(), functions.day()]
        this.filtered.selectdokumen = []
        this.selectdokumen = []
        this.selected()
      },
      filterdata() {
        this.periode[0] = this.filtered.periode[0]
        this.periode[1] = this.filtered.periode[1]
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
      this.fetchData()
      this.periode
      this.selected()
      this.page()
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
      <!-- TIPE DOKUMEN -->
      <v-span class="text-caption text-weight-bold">Tipe Dokumen</v-span>
      <v-divider class="mb-6"></v-divider>
        <checkBox
          v-for="label, i in pemasukan.data().tipedokumen" :key="i"
          v-model="filtered.selectdokumen"
          :label="label"
          :value="label"
        />
    </template>
  </filterDrawer>
  <v-container class="pt-9 h-100">
    <v-row no-gutters class="mt-n4">
      <v-responsive class="d-flex align-center mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
          <div class="d-flex align-center w-100">
            <!-- ADD DATA -->
            <PemasukanDetail batalbtn="Pemasukan" :datainput="pemasukan.data().datainput" @inputhead="inputhead" :pemasukan="true" :supplier="supplier" :edit="false" :itemDetail="itemDetail" :datatext="datatext" :btn="btn" :headDetails="pemasukan.data().headDetails" :details="details" :headers="pemasukan.data().headers" :items="pemasukan.pilihtipe(selectdokumen, items, supplier)" :pembeliandetl="pembeliandetl" :search="search" :category="pemasukan.data().tipedokumen" :selectCategory="selectCategory" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon" :pageTitle="pageTitle"/>
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
        <TableVue
          id="tbl_exporttable_to_xls"
          :items="pemasukan.pilihtipe(selectdokumen, items, supplier)"
          :search="search"
          :headers="pemasukan.data().headers"
          :masuk="true"
          :supplier="supplier"
          :pembeliandetl="pembeliandetl"
          @confirm="confirm"
          :pageTitle="pageTitle"
          class="py-3"
        />
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

<style lang="scss">
.v-data-table-header__content {
  text-align: center;
}

// .dp__active_date{
//   background: #000 !important;
// }
.text-small {
  font-size: 8pt;
}
.label-sm  {
  width: 100px !important;
  height: 35px;
  text-align: center;
}
.h-500 {
  height: 525px !important;
}
</style>