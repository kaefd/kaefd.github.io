<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import ScreenDialog2 from '../components/ScreenDialog2.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import api from '../api';
import { ref, onMounted } from 'vue';

</script>

<script>

  export default {
    components: {
    ScreenDialog2, VDataTable
    },
    props:['actIcon', 'cetak'],
    data () {
      return {
        filter: false,
        drawer: null,
        search: '',
        periode: [],
        dialog2: false,
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
        this.today()
        let currentDate = new Date().toJSON().slice(0, 10);
        return this.filtered.periode = [currentDate , currentDate]
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
          console.log(error);
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
          console.log(error);
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
          console.log(error);
        })
      },
      getGroupBarang() {
        
        const apiUrl = '/group_barang?'
        api.getData(apiUrl)
        .then(response => {
          this.groupbarang = response.data
        })
        .catch((error) => {
          console.log(error);
        })
      },
      getBarang() {
        api.getData('/barang?status=true')
        .then(response => {
          this.getbarang = response.data
        })
        .catch(() => {
          window.location.href = '/login'
        })
      },
      // TAMBAH DATA
      inputhead(value, detlbahan, detlbarang) {
        const apiUrl = '/produksi_head?'
        const value1 = JSON.stringify(value);
        const value2 = JSON.stringify(detlbahan);
        const value3 = JSON.stringify(detlbarang);
        api.postData( apiUrl, {
          produksi_head : value1,
          produksi_detail_bahan : value2,
          produksi_detail_barang : value3
        })
        .then(() => {
            window.location.href = '/production' 
          })
          .catch((error) => {
            console.log(error);
          })
      },
      // HAPUS DATA
      // PRODUKSI HEAD
      del(value, detlbahan, detlbarang) {
        this.produksi_head = {
          no_produksi: value.no_produksi,
          tgl_produksi: value.tgl_produksi,
          kode_group: value.kode_group,
          tgl_input: value.tgl_input,
          user_input: value.user_input,
          tgl_batal: value.tgl_batal,
          user_batal: "admin",
          status: 'false'
        }
        // DETAIL BAHAN
        this.produksi_detail_bahan = [{
          no_produksi: detlbahan.no_produksi,
          no_urut: detlbahan.no_urut,
          kode_barang: detlbahan.kode_barang,
          nama_barang: detlbahan.nama_barang,
          hs_code: detlbahan.hs_code,
          jumlah: detlbahan.jumlah,
          satuan: detlbahan.satuan,
          nilai: detlbahan.nilai
      }]
      // DETAIL BARANG
      this.produksi_detail_barang = [{
        no_produksi: detlbarang.no_produksi,
        no_urut: detlbarang.no_urut,
        kode_barang: detlbarang.kode_barang,
        nama_barang: detlbarang.nama_barang,
        hs_code: detlbarang.hs_code,
        jumlah: detlbarang.jumlah,
        satuan: detlbarang.satuan,
        nilai: detlbarang.nilai
      }]
      const ph = JSON.stringify(this.produksi_head);
      const dbahan = JSON.stringify(this.dbahan);
      const dbarang = JSON.stringify(this.dbarang);
        api.deleteData('/produksi_head', {
          produksi_head : ph,
          produksi_detail_bahan : dbahan,
          produksi_detail_barang : dbarang,
        })
        .then(() => {
          window.location.href = '/in'
        })
        .catch((error) => {
          console.log(error);
        })
      },
      selected(){        
        return this.getProduksihead(), this.getProduksiBahan(), this.getProduksiBarang()
      },

      bahanbaku(value) {
        for (let i = 0; i < this.detailbahan.length; i++) {
          if ( this.detailbahan[i].no_produksi == value) {
              return this.detailbahan[i].nama_barang
            }
          }
      },
      jumlah(value) {
        for (let i = 0; i < this.detailbahan.length; i++) {
          if ( this.detailbahan[i].no_produksi == value) {
              return this.detailbahan[i].jumlah
            }
          }
      },

      barangjadi(value) {
        for (let i = 0; i < this.detailbarang.length; i++) {
          if ( this.detailbarang[i].no_produksi == value) {
              return this.detailbarang[i].nama_barang
            }
          }
      },

      jumlahbarang(value) {
        for (let i = 0; i < this.detailbarang.length; i++) {
          if ( this.detailbarang[i].no_produksi == value) {
              return this.detailbarang[i].jumlah
            }
          }
      },
      satuan(value) {
        for (let i = 0; i < this.detailbarang.length; i++) {
          if ( this.detailbarang[i].no_produksi == value) {
              return this.detailbarang[i].satuan
            }
          }
      },

      kodebarang(value) {
        for (let i = 0; i < this.detailbarang.length; i++) {
          if ( this.detailbarang[i].no_produksi == value) {
              return this.detailbarang[i].kode_barang
            }
          }
      },

      kodebahan(value) {
        for (let i = 0; i < this.detailbahan.length; i++) {
          if ( this.detailbahan[i].no_produksi == value) {
              return this.detailbahan[i].kode_barang
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
      print(i){
        if (i == 0) {
          return this.ExportToExcel('xlsx')
        } else if(i == 1) {
          return this.pdf()
        }
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
    today() {
        let currentDate = new Date().toJSON().slice(0, 10);
        return this.periode = [currentDate , currentDate]
      },
    reset() {
      this.filtered.periode = this.today()
      this.today()
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
  <v-navigation-drawer
        class="mt-4 border-0 bg-grey-lighten-4 rounded-xl me-4 elevation-0"
        v-model="filter"
        location="right"
        width="320"
        style="height: fit-content;"
      >
      <v-sheet class="rounded-xl py-5 h-500 bg-white">
        <div class="d-flex align-center">
          <v-span class="text-button ms-4">Filter</v-span>
          <v-btn size="small" icon="mdi-close" @click="filter = false" variant="text" class="me-3 ms-auto">
          </v-btn>
        </div>
        <!-- PERIODE -->
        <v-container class="pt-3 px-4">
          <v-span class="text-caption text-weight-bold">Periode</v-span>
          <v-divider></v-divider>
          <v-text-field v-model="filtered.periode[0]" class="mt-4" label="Tgl Awal" type="date" density="compact" variant="outlined"></v-text-field>
          <v-text-field v-model="filtered.periode[1]" label="Tgl Akhir" type="date" density="compact" variant="outlined"></v-text-field>
          <v-div class="d-flex justify-end">
            <v-btn class="elevation-0 text-small mt-5 me-2 bg-grey-lighten-2" height="42" @click="reset()">Reset</v-btn>
            <v-btn class="elevation-0 text-small mt-5" color="orange-lighten-1" height="42" @click="filterdata()">Filter</v-btn>
          </v-div>
        </v-container>
      </v-sheet>
  </v-navigation-drawer>
    <v-container>
      <v-row no-gutters class="rounded-t-xl align-start mt-n4 mb-2">
        <v-responsive class="d-flex align-center mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
        <!-- PERIODE -->
        <!-- <div class="w-100">
          <v-label v-label class="text-body-2 text-blue-darken-4">Periode</v-label>
          <VueDatePicker v-model="periode" range :clearable="false" :enable-time-picker="false" hide-offset-dates max-range="30" :max-date="new Date()"  @update:model-value="selected()" input-class-name="dp-custom-input"/>
        </div> -->
        <div class="d-flex align-center w-100">
        <!-- TAMBAH DATA -->
        <ScreenDialog2 :headers="headItem" :items="items" :groupbarang="groupbarang" :getbarang="getbarang" @input_kodegroup="input_kodegroup"  @produksimasuk="inputhead" :select_kode="select_kode" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon"/>
        </div>
        <!-- <v-chip class="mt-1 me-1" color="orange" size="small">{{ periode[0] }} - {{ periode[1] }}</v-chip> -->
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto mt-md-2 mt-0" width="200" max-width="450">
        <div class="d-flex justify-sm-end justify-start">
          <!-- SEARCH -->
          <v-text-field
              v-model="search"
              density="compact"
              variant="text"
              class="w-75 text-indigo-darken-4 rounded-xl border me-2 text-body-2 font-small"
              prepend-inner-icon="mdi-magnify"
              placeholder="Search"
              single-line
              hide-details
            >
            </v-text-field>
            <!-- EXPORT DATA -->
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
                  v-for="(c, index) in this.cetak"
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
            <!-- BUTTON FILTER -->
            <v-btn @click="filter = !filter " class="rounded-circle text-caption elevation-0 bg-grey-lighten-4 text-indigo me-2" icon="mdi-tune-vertical" size="small">
            </v-btn>
          </div>
      </v-responsive>
      </v-row>
        <!-- EDIT DATA -->
        <v-sheet class="rounded-b-xl">
        <v-data-table
            id="tbl_exporttable_to_xls"
            :headers="headers"
            :items="items"
            :search="search"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption py-3 rounded-b-xl"
            height="75vh"
            >
            <!-- CUSTOM PAGINATION STYLE -->
            <template v-slot:bottom>
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
              </template>
            <!-- dialog actions -->
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.bahan_baku="{ item }">
              <td>{{ bahanbaku(item.raw.no_produksi) }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.jumlah="{ item }">
              <td>{{ jumlah(item.raw.no_produksi) }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.barang_jadi="{ item }">
              <td>{{ barangjadi(item.raw.no_produksi) }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.jml_barang_jadi="{ item }">
              <td>{{ jumlahbarang(item.raw.no_produksi) }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.satuan="{ item }">
              <td>{{ satuan(item.raw.no_produksi) }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.kodebarang="{ item }">
              <td>{{ kodebarang(item.raw.no_produksi) }}</td>
            </template>
             <!-- eslint-disable-next-line vue/valid-v-slot -->
             <template v-slot:item.kodebahan="{ item }">
              <td>{{ kodebahan(item.raw.no_produksi) }}</td>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.actions="{ item }">
                <ScreenDialog2
                :batalbtn="Produksi"
                :edit="true"
                :detailbahan="[{
                  kode_barang: kodebahan(item.raw.no_produksi),
                  nama_barang: bahanbaku(item.raw.no_produksi),
                  jumlah: jumlah(item.raw.no_produksi),
                  satuan: satuan(item.raw.no_produksi)
                }]"
                :detailbarang="[{
                  kode_barang: kodebarang(item.raw.no_produksi),
                  nama_barang: barangjadi(item.raw.no_produksi),
                  jumlah: jumlahbarang(item.raw.no_produksi),
                  satuan: satuan(item.raw.no_produksi)
                }]"

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
                :disable="true"/>
              </template>
          </v-data-table>
          </v-sheet>
        <!-- <TableVue :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="this.actIcon[1].text" :btncolor="this.actIcon[1].color" :icon="this.actIcon[1].icon" :iVariant="this.actIcon[1].variant" :alpha="alpha" /> -->
  </v-container>

</template>
