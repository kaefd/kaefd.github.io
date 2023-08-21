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
      }
  },
  methods: {
    print() {
        window.print()
    }
    
  },
  mounted() {
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
  <v-card id="do" class="overflow-auto bg-orange">
    {{ items }}
    <v-sheet class="page mx-auto pa-7">
      <v-span class="text-h5 font-weight-bold d-flex justify-center">DELIVERY ORDER</v-span>
      <!-- TUJUAN KIRIM -->
      <v-div class="d-flex text-body-2 text-regular my-5 subheader">
        <v-div class="d-flex flex-column justify-space-around">
          <v-span class="me-2">Tgl Pengiriman</v-span>
          <v-span class="me-2">Supir - No Polisi</v-span>
          <v-span class="me-2">Tujuan Kirim</v-span>
        </v-div>
        <v-div class="d-flex flex-column justify-space-around">
          <v-span class="me-2">: Tgl Pengiriman</v-span>
          <v-span class="me-2">: Supir - No Polisi</v-span>
          <v-span class="me-2">: Tujuan Kirim</v-span>
        </v-div>
      </v-div>
      <!-- TABEL DETAIL BARANG -->
      <!-- TABEL BARANG -->
      <v-sheet height="60%" width="100%">
        <v-table density="compact" class="mt-5 w-100">
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
                
            >
                <td class="text-medium"></td>
                <td class="text-medium"></td>
                <td class="text-medium" contenteditable></td>
                <td class="text-medium" contenteditable></td>
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
      <v-span class="d-block text-right font-italic">Print Date : {{ functions.formatDateTime(new Date) }}</v-span>
    </v-sheet>
  </v-card>
  </v-dialog>
</template>
<style scoped>
.page {
    width: 21cm;
    height: 29.7cm;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: black !important;
}
@media print {
  body {
    visibility: hidden;
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
}
.text-regular {
  font-size: 17px !important;
}
.text-medium {
  font-size: 17px !important;
  color: black !important;
  font-weight: 400 !important;
}
.subheader {
  height: 110px;
}
.v-table--density-compact > .v-table__wrapper > table > tbody > tr > th, .v-table--density-compact > .v-table__wrapper > table > thead > tr > th, .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > th {
    height: 20px !important;
}
.v-table--density-compact > .v-table__wrapper > table > tbody > tr > td, .v-table--density-compact > .v-table__wrapper > table > thead > tr > td, .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > td {
    height: 20px !important;
}
</style>
