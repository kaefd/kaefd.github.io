<script setup>
// service
import api from '../service/api';
import functions from '../service/functions';
// components
import { VDataTable } from 'vuetify/labs/VDataTable'
import ScreenDialog2 from '../components/ScreenDialog2.vue';
import { ref, onMounted } from 'vue';
import AppBar from '../components/AppBar.vue';
import filterDrawer from '../components/drawer/filterDrawer.vue';
import circleButton from '../components/button/circleButton.vue';
import textField from '../components/form/textField.vue';
import menuList from '../components/menu/menuList.vue';
// plugins
import '@vuepic/vue-datepicker/dist/main.css'
import { id } from 'date-fns/locale';

</script>

<script>
  export default {
    components: {
      ScreenDialog2,
      VDataTable,
      AppBar,
      circleButton,
      textField,
      menuList,
    },
    props:['actIcon', 'cetak'],
    data () {
      return {
        filter: false,
        drawer: null,
        search: '',
        periode: [],
        dialog2: false,
        confirmdialog: false,
        pageTitle: 'PRODUKSI BARANG',
        selectCategory: 'semua',
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        headers: [
          { title: 'Nomor Produksi', key: 'no_produksi'},
          { title: 'Tgl Produksi', key: 'tgl_produksi' },
          { title: 'Kode Group', key: 'kode_group' },
          { title: 'Bahan Baku', key: 'bahan_baku' },
          { title: 'Jumlah Bahan Baku', key: 'jumlah' },
          { title: 'Barang Jadi', key: 'barang_jadi' },
          { title: 'Jumlah Barang Jadi', key: 'jml_barang_jadi' },
          { title: '', key: 'actions', sortable: false},
        ],
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
        select_kode: [],
        headItem: [
            { title: 'Kode Barang', key: 'kode_barang' },
            { title: 'Nama Barang', key: 'nama_barang' },
            { title: 'Jumlah', key: 'jumlah' },
            { title: 'Satuan', key: 'satuan' },
            { title: '', key: 'actions', sortable: false },
        ],

      }
    },
    created() {
        this.periode = [this.tglawal(), functions.day()]
        this.filtered.periode = [this.tglawal(), functions.day()]
    },
    methods: {
      getProduksihead() {
        const apiUrl = '/produksi_head?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.items = response.data
        })
        .catch((error) => {
          return this.$router.push('login');
        })
      },
      getProduksiBahan() {
        const apiUrl = '/produksi_detail_bahan?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.detailbahan = response.data
        })
        .catch((error) => {
          return this.$router.push('login');
        })
      },
      getProduksiBarang() {
        const apiUrl = '/produksi_detail_barang?'
        const params = {
          tgl_awal: this.periode[0],
          tgl_akhir: this.periode[1],
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.detailbarang = response.data
        })
        .catch((error) => {
          return this.$router.push('login');
        })
      },
      getGroupBarang() {
        const apiUrl = '/group_barang?'
        api.getData(apiUrl)
        .then(response => {
          this.groupbarang = response.data
        })
        .catch((error) => {
          return this.$router.push('login');
        })
      },
      getBarang() {
        api.getData('/barang?status=true')
        .then(response => {
          this.getbarang = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      // TAMBAH DATA
      inputhead(value, detlbahan, detlbarang) {
        // const apiUrl = '/produksi_head?'
        const value1 = JSON.stringify(value);
        const value2 = JSON.stringify(detlbahan);
        const value3 = JSON.stringify(detlbarang);
        console.log({
          produksi_head : value1,
          produksi_detail_bahan : value2,
          produksi_detail_barang : value3
        });
        // api.postData( apiUrl, {
        //   produksi_head : value1,
        //   produksi_detail_bahan : value2,
        //   produksi_detail_barang : value3
        // })
        // .then(() => {
        //     window.location.href = '/production' 
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
      },
      // HAPUS DATA
      // PRODUKSI HEAD
      del() {
        let produksi_head = {
          no_produksi: this.head.no_produksi,
          tgl_produksi: this.head.tgl_produksi,
          kode_group: this.head.kode_group,
          tgl_input: this.head.tgl_input,
          user_input: this.head.user_input,
          tgl_batal: this.head.tgl_batal,
          user_batal: this.head.user_batal,
          status: 'false'
        }
      const ph = JSON.stringify(produksi_head);
      const dbahan = JSON.stringify(this.detailbhn);
      const dbarang = JSON.stringify(this.detailbrg);
      console.log({
        produksi_head : ph,
        produksi_detail_bahan : dbahan,
        produksi_detail_barang : dbarang,
      });
        // api.deleteData('/produksi_head', {
        //   produksi_head : ph,
        //   produksi_detail_bahan : dbahan,
        //   produksi_detail_barang : dbarang,
        // })
        // .then(() => {
        //   window.location.href = '/in'
        // })
        // .catch((error) => {
        //   console.log(error);
        // })
      },
      confirm(head, detailbrg, detailbhn){
        this.confirmdialog = true
        this.head = head
        this.detailbrg = detailbrg
        this.detailbhn = detailbhn
      },
      selected(){        
        return this.getProduksihead(), this.getProduksiBahan(), this.getProduksiBarang()
      },
      dataTable(value, params) {
        for (let i = 0; i < this.detailbahan.length; i++) {
          for (let j = 0; j < this.detailbarang.length; j++) {
            if (this.detailbahan[i].no_produksi == value) {
              if(params == 'baku') {
                return this.detailbahan[i].nama_barang
              }
              else if(params == 'jumlah') {
                return functions.numb(this.detailbahan[i].jumlah)
              }
              else if(params == 'kodebhn') {
                return this.detailbahan[i].kode_barang
              }
            }
            else if(this.detailbarang[j].no_produksi == value) {
              if(params == 'brgjadi') {
                return this.detailbarang[j].nama_barang
              }
              else if(params == 'jumlahbrg') {
                return functions.numb(this.detailbarang[j].jumlah)
              }
              else if(params == 'satuan') {
                return this.detailbarang[j].satuan
              }
              else if(params == 'kodebrg') {
                return this.detailbarang[j].kode_barang
              }
            }
          }
        }
      },
      input_kodegroup(value) {
        let kode = ''
          for (let i = 0; i < this.groupbarang.length; i++) {
            if(this.groupbarang[i].kode_group == value) {
              // cari nama_Barang yang kode barangnya sama
                kode = this.groupbarang[i].kode_barang
              }
            }

          for (let j = 0; j < this.getbarang.length; j++) {
              if( kode == this.getbarang[j].kode_barang) {
                return this.select_kode =[ this.getbarang[j]]
              }
          }
      },
      detail(val, i){
        let detail = ''
        if( i == 'bahan' ){
          detail = this.detailbahan
        } else if( i == 'barang') {
          detail = this.detailbarang
        }
        for (let i = 0; i < detail.length; i++) {
          if( val == detail[i].no_produksi ) {
            return detail[i]
          }
        }
      },
      close(v) {
        return this.filter = v
      },
      print(key){
        let title = this.pageTitle
        let header = this.headers
        let item = this.printdata()
        functions.print(key, title, header, item)
      },
      printdata(){
        let a = []
        for (let i = 0; i < this.items.length; i++) {
          a.push({
            no_produksi: this.items[i].no_produksi,
            tgl_produksi: this.items[i].tgl_produksi,
            kode_group: this.items[i].kode_group,
            bahan_baku: this.dataTable(this.items[i].no_produksi, 'baku'),
            jumlah: this.dataTable(this.items[i].no_produksi, 'jumlah'),
            barang_jadi: this.dataTable(this.items[i].no_produksi, 'brgjadi'),
            jml_barang_jadi: this.dataTable(this.items[i].no_produksi, 'jumlahbrg'),
          })
        }
        return a
      },
      page(){
          return this.$emit('page', this.pageTitle)
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
          this.getProduksihead()
          this.getProduksiBahan()
          this.getProduksiBarang()
          this.getGroupBarang()
          this.getBarang()
          this.page()
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
      <v-row no-gutters class="align-start mt-n4 mb-2">
        <v-responsive class="d-flex align-start mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
        <!-- PERIODE -->
        <!-- <div class="w-100">
          <v-label v-label class="text-body-2 text-blue-darken-4">Periode</v-label>
          <VueDatePicker v-model="periode" range :clearable="false" :enable-time-picker="false" hide-offset-dates max-range="30" :max-date="new Date()"  @update:model-value="selected()" input-class-name="dp-custom-input"/>
        </div> -->
        <div class="d-flex align-center w-100">
          <!-- BUTTON FILTER -->
          <circleButton icon="mdi-tune-vertical" @click="filter = !filter" />
          <!-- TAMBAH DATA -->
          <ScreenDialog2 :headers="headItem" :items="items" :groupbarang="groupbarang" :getbarang="getbarang" @input_kodegroup="input_kodegroup"  @inputhead="inputhead" :produksi="true" :select_kode="select_kode" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon"/>
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
          </div>
      </v-responsive>
      </v-row>
        <!-- EDIT DATA -->
        <v-sheet height="90%">
        <v-data-table
            id="tbl_exporttable_to_xls"
            items-per-page="10"
            :headers="headers"
            :items="items"
            :search="search"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption py-3 h-100"
            height="100%"
            >
            <!-- dialog actions -->
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.bahan_baku="{ item }">
              <td>{{ dataTable(item.raw.no_produksi, 'baku') }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.tgl_produksi="{item}">
                {{ functions.formatDate(item.raw.tgl_produksi) }}
              </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.jumlah="{ item }">
              <td>{{ dataTable(item.raw.no_produksi, 'jumlah') }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.barang_jadi="{ item }">
              <td>{{ dataTable(item.raw.no_produksi, 'brgjadi') }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.jml_barang_jadi="{ item }">
              <td>{{ dataTable(item.raw.no_produksi, 'jumlahbrg') }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.actions="{ item }">
                <ScreenDialog2
                :batalbtn="Produksi"
                :edit="true"
                :produksi_bahan="detail(item.raw.no_produksi, 'bahan')"
                :produksi_barang="detail(item.raw.no_produksi, 'barang')"
                :detailbahan="[{
                  kode_barang: dataTable(item.raw.no_produksi, 'kodebhn'),
                  nama_barang: dataTable(item.raw.no_produksi, 'baku'),
                  jumlah: dataTable(item.raw.no_produksi, 'jumlah'),
                  satuan: dataTable(item.raw.no_produksi, 'satuan')
                }]"
                :detailbarang="[{
                  kode_barang: dataTable(item.raw.no_produksi, 'kodebrg'),
                  nama_barang: dataTable(item.raw.no_produksi, 'brgjadi'),
                  jumlah: dataTable(item.raw.no_produksi, 'jumlahbrg'),
                  satuan: dataTable(item.raw.no_produksi, 'satuan')
                }]"
                @confirm="confirm"
                :headItem="headItem"
                :item="item.raw"
                :details="details"
                :headers="headers"
                :items="items"
                :search="search"
                :category="category"
                :selectCategory="selectCategory"
                :iTitle="actIcon[1].text"
                :btncolor="actIcon[1].color"
                :icon="actIcon[1].icon"
                :iVariant="actIcon[1].variant"
                :alpha="alpha"
                :actIcon="actIcon"
                :disable="true"
                />
              </template>
          </v-data-table>
          </v-sheet>
          <v-dialog v-model="confirmdialog" transition="dialog-bottom-transition" width="400">
            <v-card class="rounded-xl">
                <v-card-title class="text-center my-7">Apakah Anda Yakin ?</v-card-title>
                <v-row no-gutters>
                    <v-col>
                        <v-btn
                        color="orange-darken-1"
                        variant="tonal"
                        height="57"
                        class="w-100 rounded-0"
                        @click="confirmdialog = false"
                        >
                        Tidak
                        </v-btn>                  
                    </v-col>
                    <v-col>
                        <v-btn
                        type="submit"
                        color="blue-darken-1"
                        variant="tonal"
                        height="57"
                        class="w-100 rounded-0"
                        @click="del(), confirmdialog = false"
                        >
                        Ya
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
        <!-- <TableVue :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="this.actIcon[1].text" :btncolor="this.actIcon[1].color" :icon="this.actIcon[1].icon" :iVariant="this.actIcon[1].variant" :alpha="alpha" /> -->
  </v-container>

</template>
