<script setup>
import api from '../service/api';
import functions from '../service/functions';
</script>
<script>
export default {
    props: ['items', 'namaTujuan', 'pengiriman', 'alamatPelanggan','nokirim', 'pjl_detail', 'nopjl'],
    data () {
        return {
            jalan: false,
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
                            satuan: this.pjl_detail[j].satuan
                        })
                    }
                }
            }
            return data
        }
    },
    methods: {
        async fetchData() {
            let pjl = []
            for (let i = 0; i < this.nopjl.length; i++) {
                pjl.push(await api.getHeadPenjualan(this.nopjl[i]))
            }
            this.penjualanHead = pjl
            
        },
        uppercase(v) {
            return v.toUpperCase()
        },
        print() {
            window.print()
        },
        sum() {
            let arr = []
            for (let i = 0; i < this.kirim_detail.length; i++) {
                arr.push(this.kirim_detail[i].jumlah)
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
        v-model="jalan"
        fullscreen
        :scrim="false">
        <template v-slot:activator="{ props }">
            <v-list-item class="text-caption" v-bind="props">Cetak Surat Jalan</v-list-item>
        </template>
        <v-toolbar class="bg-blue-custom">
            <v-btn
                icon
                @click="jalan = false"
                size="small"
                class="text-white"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-span class="text-button mt-1 text-white">cetak surat jalan</v-span>
            <v-spacer></v-spacer>
            <v-btn
            icon
            class="text-white"
            @click="print()"
            >
                <v-icon>mdi-printer</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card id="suratjalan">
            <v-sheet class="mx-auto text-center py-3 px-7 page">
                <v-span class="text-h6 font-weight-bold">PT. AURI STEEL METALINDO</v-span>
                <v-divider thickness="3" color="black" class="border-opacity-100 mt-3 mb-1"></v-divider>
                <v-span class="text-h6 font-weight-bold">SURAT JALAN</v-span>
                <v-div class="d-flex mt-3">
                    <!-- PENERIMA -->
                    <v-div class="d-flex text-med">
                        <v-span class="me-2">PENERIMA :</v-span>
                        <v-span class="text-start">
                            {{ uppercase(items.nama) }} <br/>
                            {{ uppercase(items.alamat) }}
                        </v-span>
                    </v-div>
                    <v-spacer></v-spacer>
                    <!-- TUJUAN -->
                    <v-div class="d-flex text-med">
                        <!-- NO SURAT JALAN -->
                        <v-div class="d-flex flex-column">
                            <v-span class="me-2 text-start">No Surat Jalan</v-span>
                            <v-span class="me-2 text-start">Tgl Pengiriman</v-span>
                            <v-span class="me-2 text-start">Nama Supir</v-span>
                        </v-div>
                        <!-- TGL PENGIRIMAN -->
                        <v-div class="d-flex flex-column">
                            <v-span class="text-start">: PJS-{{ items.no_pengiriman.slice(4) }}</v-span>
                            <v-span class="text-start">: {{ functions.formatDate(items.tgl_pengiriman) }}<v-span contenteditable></v-span></v-span>
                            <v-span class="text-start">: {{ items.supir }}/{{ items.no_polisi }}</v-span>
                        </v-div>
                    </v-div>
                </v-div>
                <!-- TABEL BARANG -->
                <v-table density="compact" class="text-body-2 mt-2">
                    <thead>
                    <tr>
                        <th class="text-left bg-white">No</th>
                        <th class="text-left bg-white">Nama Barang</th>
                        <th class="text-left bg-white">Qty</th>
                        <th class="text-left bg-white">Satuan</th>
                        <th class="text-left bg-white">Berat (KG)</th>
                        <th class="text-left bg-white">Keterangan(Ex.BC)</th>
                    </tr>
                    </thead>
                    <tbody class="text-small">
                    <tr
                        v-for="item, i in kirim_detail"
                        :key="i"
                    >
                        <td class="text-left">{{ i+1 }}</td>
                        <td class="text-left">{{ item.nama_barang }}</td>
                        <td class="text-left" contenteditable>{{ item.qty }}</td>
                        <td class="text-left" contenteditable></td>
                        <td class="text-left">{{ functions.numb2(item.jumlah) }}</td>
                        <td class="text-left">{{ kirim_detail[i].no_dokumen }}/{{ kirim_detail[i].tipe_dokumen.slice(2) }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="text-left font-weight-bold">{{ functions.numb2(sum()) }}</td>
                    </tr>
                    </tbody>
                </v-table>
                <v-div class="d-flex flex-column align-start justify-space-between text-small">
                    <v-text class="d-flex flex-column align-start">
                        Keterangan
                        <v-span class="ms-3">1. Surat Jalan ini merupakan bukti penerimaan barang</v-span>
                        <v-span class="ms-3">1. Surat Jalan ini bukan bukti penjualan (Faktur/Invoice)</v-span>
                        Barang sudah diterima dalam keadaan Baik dan Cukup oleh :
                    </v-text>
                    <v-div class="d-flex justify-space-between w-100 mt-15">
                        <v-div>(Penerima)</v-div>
                        <v-div>(Supir)</v-div>
                        <v-div>(Bag. Gudang)</v-div>
                        <v-div>(Bag. Exim)</v-div>
                    </v-div>
                </v-div>
            </v-sheet>
        </v-card>
    </v-dialog>
</template>
<style scoped>
.page {
    width: 21cm;
    height: 12cm;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold !important;
}
@media print {
  body {
    visibility: hidden;
  }
  #suratjalan {
    visibility: visible;
    position: absolute;
    width: 21cm;
    height: 12cm;
    left: 0;
    top: 0;
  }
}
.text-small {
    font-size: 10pt !important;
    font-weight: 500;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: black !important;
}
.v-table--density-compact > .v-table__wrapper > table > tbody > tr > th, .v-table--density-compact > .v-table__wrapper > table > thead > tr > th, .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > th {
    height: 20px !important;
}
.v-table--density-compact > .v-table__wrapper > table > tbody > tr > td, .v-table--density-compact > .v-table__wrapper > table > thead > tr > td, .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > td {
    height: 13px !important;
}
</style>