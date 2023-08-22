<script setup>
import barang from '../service/page/barang'
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
        penjualanHead: ''
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
        return data
    },
  },
  methods: {
    async fetchData() {
        let pjl = []
        for (let i = 0; i < this.nopjl.length; i++) {
            pjl.push(await api.getHeadPenjualan(this.nopjl[i]))
        }
        this.penjualanHead = pjl
    },     
    print() {
        window.print()
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
  <v-card id="do" class="overflow-auto bg-grey-lighten-1 sizec">
    <v-sheet class="page mx-auto pa-7">
      <v-span class="text-h5 font-weight-bold d-flex justify-center">DELIVERY ORDER</v-span>
      <!-- TUJUAN KIRIM -->
      <v-div class="d-flex text-body-2 text-regular my-10">
        <v-div class="d-flex flex-column">
          <v-span class="me-2 mb-2">Tgl Pengiriman</v-span>
          <v-span class="me-2 mb-2">Supir/No Polisi</v-span>
          <v-span class="me-2 mb-2">Tujuan Kirim</v-span>
        </v-div>
        <v-div class="d-flex flex-column">
          <v-span class="me-2 mb-2">: {{ functions.formatDate(items.tgl_pengiriman) }}
            <!-- <v-span contenteditable>/ {{ functions.getTime() }}</v-span> -->
          </v-span>
          <v-span class="me-2 mb-2">: {{ items.supir + "/" + items.no_polisi }}</v-span>
          <v-span class="text-start me-2">
              : {{ functions.uppercase(items.namaplg) }} <br/>
              <!-- {{ uppercase(items.kabupaten) }} -->
          </v-span>
        </v-div>
      </v-div>
      <!-- TABEL DETAIL BARANG -->
      <!-- TABEL BARANG -->
      <v-sheet height="60%" width="100%">
        <v-table density="compact" class="mt-10 w-100">
            <thead>
              <tr>
                <th class="text-medium">Barang</th>
                <th class="text-medium">Qty</th>
                <th class="text-medium">Keterangan</th>
                <th class="text-medium">Catatan</th>
              </tr>
            </thead>
            <tbody class="text-body-2">
            <tr
            v-for="item, i in kirim_detail" :key="i"
            >
                <td class="text-medium">{{ item.nama_barang }}</td>
                <td class="text-medium">{{ item.qty }}</td>
                <td class="text-medium" ></td>
                <td class="text-medium" ></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-left font-weight-bold"></td>
            </tr>
            </tbody>
        </v-table>
      </v-sheet>
      <v-span class="d-block text-right font-italic text-caption">Print Date : {{ functions.formatDateTime(new Date) }}</v-span>
    </v-sheet>
  </v-card>
  </v-dialog>
</template>
<style scoped>
.sizec {
  width: auto;
  height: max-content;
}
.page {
    width: 40%;
    min-width: 400px;
    height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: black !important;
}
.text-regular {
  font-size: 10px !important;
}
.text-medium {
  font-size: 10px !important;
  margin-bottom: 1px !important;
  color: black !important;
  font-weight: 400 !important;
}
.text-h5 {
  font-size: 13pt !important;
}
@media print {
  body {
    visibility: hidden;
  }
  .text-h5 {
    font-size: 17pt !important;
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
    font-weight: 400 !important;
  }
}

.v-table--density-compact > .v-table__wrapper > table > tbody > tr > th, .v-table--density-compact > .v-table__wrapper > table > thead > tr > th, .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > th {
    height: 20px !important;
}
.v-table--density-compact > .v-table__wrapper > table > tbody > tr > td, .v-table--density-compact > .v-table__wrapper > table > thead > tr > td, .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > td {
    height: 20px !important;
}
</style>
