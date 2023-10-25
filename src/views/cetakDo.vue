<script setup>
// import barang from '../service/page/barang'
import tableMain from '../components/form/tableMain.vue'
import api from '../service/api'
import functions from '../service/functions';
</script>
<script>
export default {
  component: {
    tableMain
  },
  props: ['items', 'namaTujuan', 'pengiriman', 'alamatPelanggan','nokirim', 'pjl_detail', 'nopjl'],
  data () {
      return {
        doDialog: null,
        kirim: this.pengiriman,
        detailpengiriman: '',
        penjualanHead: '',
        konversi: ''
      }
  },
  computed: {
    kirim_detail() {
        let data = []
        for (let j = 0; j < this.pjl_detail.length; j++) {
            for (let k = 0; k < this.penjualanHead.length; k++) {
                if(this.pjl_detail[j].no_penjualan == this.penjualanHead[k][0].no_penjualan) {
                    data.push({
                        no_penjualan: this.pjl_detail[j].no_penjualan,
                        tipe_dokumen: this.penjualanHead[k][0].tipe_dokumen,
                        no_dokumen: this.penjualanHead[k][0].no_dokumen,
                        kode_group: this.pjl_detail[j].kode_group,
                        kode_barang: this.pjl_detail[j].kode_barang,
                        kode_konversi: this.pjl_detail[j].kode_konversi,
                        nama_konversi: this.pjl_detail[j].nama_konversi,
                        nama_barang: this.pjl_detail[j].nama_barang,
                        hs_code: this.pjl_detail[j].hs_code,
                        jumlah: this.pjl_detail[j].jumlah,
                        satuan: this.pjl_detail[j].satuan,
                        jumlah_konversi: this.pjl_detail[j].jumlah_konversi,
                        satuan_konversi: this.pjl_detail[j].satuan_konversi
                    })
                }
            }
        }
        const a = [...new Set(data.map(JSON.stringify))].map(JSON.parse);
        return a
    },
  },
  methods: {
    async fetchData() {
        let pjl = []
        for (let i = 0; i < this.nopjl.length; i++) {
            pjl.push(await api.getHeadPenjualan(this.nopjl[i]))
        }
        this.penjualanHead = pjl
        this.konversi = await api.getKonversi()
    },     
    print() {
        window.print()
    },
    sum(param) {
            let arr = []
            for (let i = 0; i < this.kirim_detail.length; i++) {
              if(param == 'qty') arr.push(this.kirim_detail[i].jumlah_konversi)
              else if(param == 'jumlah') arr.push(this.kirim_detail[i].jumlah)
            }
            return arr.reduce((total, current) => {
                return total + current;
            }, 0);
        }
    
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<template>
<v-dialog
    v-model="doDialog"
    fullscreen
    :scrim="false">
    <template v-slot:activator="{ props }">
        <v-list-item class="text-caption" v-bind="props">Cetak DO</v-list-item>
    </template>
    <v-toolbar class="bg-blue-custom" height="50">
      <v-btn
          icon
          @click="doDialog = false"
          size="small"
          class="text-white"
      >
      <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-span class="text-button mt-1 text-white">Cetak DO</v-span>
      <v-spacer></v-spacer>
      <v-btn
      icon
      class="text-white"
      @click="print()"
      >
          <v-icon>mdi-printer</v-icon>
      </v-btn>
  </v-toolbar>
  <v-card id="do" class="overflow-auto bg-grey-lighten-1">
    <v-sheet class="page mx-auto pa-7">
      <v-span class="text-h5 font-weight-bold d-flex justify-center">DELIVERY ORDER</v-span>
      <!-- TUJUAN KIRIM -->
      <div class="d-flex text-body-2 text-regular my-10 preview">
        <div class="d-flex flex-column">
          <v-span class="me-2 space">Tgl Pengiriman</v-span>
          <v-span class="me-2 space">Supir/No Polisi</v-span>
          <v-span class="me-2 space">Tujuan Kirim</v-span>
        </div>
        <div class="d-flex flex-column">
          <v-span class="me-2 space">: {{ functions.formatDate(items.tgl_pengiriman) }}
            <!-- <v-span contenteditable>/ {{ functions.getTime() }}</v-span> -->
          </v-span>
          <v-span class="me-2 space" contenteditable>:</v-span>
          <v-span class="text-start me-2 space">
              : {{ functions.uppercase(items.namaplg) }} <br/>
              <!-- {{ uppercase(items.kabupaten) }} -->
          </v-span>
        </div>
      </div>
      <!-- TABEL DETAIL BARANG -->
      <!-- TABEL BARANG -->
      <v-sheet height="35vh" width="100%">
        <v-table density="compact" class="mt-10 w-100 preview">
            <thead>
              <tr>
                <th class="text-medium text-center">Barang</th>
                <th class="text-medium text-center">Qty</th>
                <th class="text-medium text-center">Keterangan</th>
                <th class="text-medium text-center">Catatan</th>
                <th class="text-medium text-center">Berat total (Kg)</th>
              </tr>
            </thead>
            <tbody class="text-body-2">
            <tr
            v-for="item, i in kirim_detail" :key="i"
            >
                <td class="text-medium">{{ item.nama_konversi ? item.nama_konversi : item.nama_barang }}</td>
                <td class="text-medium" contenteditable="">{{ item.jumlah_konversi }}</td>
                <td class="text-medium" contenteditable>{{ item.keterangan }}</td>
                <td class="text-medium" contenteditable ></td>
                <td class="text-medium text-right" >{{ item.jumlah }}</td>
            </tr>
            <tr>
                <td></td>
                <td class="text-medium total" contenteditable>{{ sum('qty') }}</td>
                <td></td>
                <td></td>
                <td class="text-right text-medium total">{{ sum('jumlah') }}</td>
            </tr>
            </tbody>
        </v-table>
      </v-sheet>
      <div class="d-flex flex-column justify-space-between h-100">
        <div class="w-100 d-flex justify-space-between text-caption text-preview">
          <span>yang mengajukan</span>
          <span>mengetahui</span>
          <span>mengetahui</span>
          <span>ekspedisi</span>
        </div>
        <span class="d-block text-right font-italic text-caption text-preview text-grey-darken-3 float-bottom mb-2">Print Date : {{ functions.formatDateTime(new Date) }}</span>
      </div>
    </v-sheet>
  </v-card>
  </v-dialog>
</template>
<style scoped>
.text-h5 {
    font-size: 10pt !important;
  }
  .preview {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .text-preview {
    font-size: 8px !important;
  }
  .h-preview {
   margin-top: 10vh;
  }
  .page {
    width: 30vw;
    min-width: 400px;
    margin-top: 15px;
    margin-bottom: 15px;
    height: 565px !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: black !important;
  }
  .space {
    margin-bottom: 0px;
  }
  .text-regular {
  font-size: 8px !important;
  color: black !important;
  }
  .text-medium {
    font-size: 8px !important;
    color: black !important;
    font-weight: 400 !important;
  }
@media print {
  body {
    visibility: hidden;
  }
  .space {
    margin-bottom: 3px;
  }
  .text-h5 {
    font-size: 17pt !important;
  }
  .preview {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .h-preview {
    margin-top: 25vh;
  }
  .text-preview {
    font-size: 17px !important;
  }
  .page {
    width: 21cm;
    height: 29.7cm;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: black !important;
}
  #do {
    visibility: visible;
    position: absolute;
    text-rendering: optimizeLegibility;
    image-rendering: auto;
    width: 21cm;
    height: 29.7cm;
    left: 0;
    top: 0;
    color: black !important;
  }
  .text-regular {
  font-size: 17px !important;
  color: black !important;
  }
  .text-medium {
    font-size: 17px !important;
    color: black !important;
  }
  .total {
    font-weight: 700 !important;
  }
}

.v-table--density-compact > .v-table__wrapper > table > tbody > tr > th, .v-table--density-compact > .v-table__wrapper > table > thead > tr > th, .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > th {
    height: 30px !important;
}
.v-table--density-compact > .v-table__wrapper > table > tbody > tr > td, .v-table--density-compact > .v-table__wrapper > table > thead > tr > td, .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > td {
    height: 30px !important;
}
</style>
<!-- yang mengajukan, mengetahui mengetahui ekspedisi -->