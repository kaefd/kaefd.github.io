<script>
import api from '../api';
export default {
    props: ['items', 'namaPelanggan', 'namaTujuan', 'pengiriman', 'alamatPelanggan','nokirim', 'detail_kirim', 'nopjl'],
    data () {
        return {
            jalan: false,
            kirim: [this.pengiriman],
            detailpengiriman: ''
        }
    },
    methods: {
        getDetail() {
            const apiUrl = '/penjualan_head/' + this.nopjl
            api.getData(apiUrl)
            .then(response => {
            this.detailpengiriman = response.data
            })
            .catch((error) => {
            console.log(error);
            })
        },
        uppercase(v) {
            return v.toUpperCase()
        },
        print() {
            window.print()
        },
        sum() {
            let arr = []
            for (let i = 0; i < this.kirim.length; i++) {
                arr.push(this.kirim[i].jumlah)
            }
            return arr.reduce((total, current) => {
                return total + current;
            }, 0);
        }
    },

    mounted() {
        this.getDetail()
    }
}
</script>

<template>
    <v-dialog
        v-model="jalan"
        fullscreen
        :scrim="false">
        <template v-slot:activator="{ props }">
            <v-list-item class="text-small" v-bind="props">Cetak Surat Jalan</v-list-item>
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
            <v-sheet class="mx-auto text-center pa-3 page">
                <v-span class="text-h6 font-weight-bold">PT. AURI STEEL METALINDO</v-span>
                <v-divider thickness="3" color="black" class="border-opacity-100 mt-3 mb-1"></v-divider>
                <v-span class="text-h6 font-weight-bold">SURAT JALAN</v-span>
                <v-div class="d-flex mt-3">
                    <!-- PENERIMA -->
                    <v-div class="d-flex  text-body-2">
                        <v-span class="me-2">PENERIMA :</v-span>
                        <v-span class="text-start w-50">
                            {{ uppercase(namaTujuan) }} <br/>
                            {{ uppercase(alamatPelanggan) }}
                        </v-span>
                    </v-div>
                    <v-spacer></v-spacer>
                    <!-- TUJUAN -->
                    <v-div class="d-flex">
                        <!-- NO SURAT JALAN -->
                        <v-div class="d-flex flex-column">
                            <v-span class="me-2 text-start">No Surat Jalan</v-span>
                            <v-span class="me-2 text-start">Tgl Pengiriman</v-span>
                            <v-span class="me-2 text-start">Nama Supir</v-span>
                        </v-div>
                        <!-- TGL PENGIRIMAN -->
                        <v-div class="d-flex flex-column">
                            <v-span class="text-start">: PJS-{{ items.no_pengiriman.slice(4) }}</v-span>
                            <v-span class="text-start">: {{ items.tgl_pengiriman }}</v-span>
                            <v-span class="text-start">: {{ items.supir }}/{{ items.no_polisi }}</v-span>
                        </v-div>
                    </v-div>
                </v-div>
                <!-- TABEL BARANG -->
                <v-table density="compact" class="text-body-1 my-5 pb-5">
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
                    <tbody>
                    <tr
                        v-for="item, i in kirim"
                        :key="i"
                    >
                        <td class="text-left">{{ i+1 }}</td>
                        <td class="text-left">{{ item.nama_barang }}</td>
                        <td class="text-left" contenteditable>{{ item.qty }}</td>
                        <td class="text-left" contenteditable></td>
                        <td class="text-left">{{ item.jumlah }}</td>
                        <td class="text-left">{{ detailpengiriman[i].no_dokumen }}/{{ detailpengiriman[i].tipe_dokumen.slice(2) }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="text-left font-weight-bold">{{ sum() }}</td>
                    </tr>
                    </tbody>
                </v-table>
                <v-div class="d-flex flex-column align-start text-body-1">
                    <v-text class="d-flex flex-column align-start">
                        Keterangan
                        <v-span class="ms-3">1. Surat Jalan ini merupakan bukti penerimaan barang</v-span>
                        <v-span class="ms-3">1. Surat Jalan ini bukan bukti penjualan (Faktur/Invoice)</v-span>
                        Barang sudah diterima dalam keadaan Baik dan Cukup oleh :
                    </v-text>
                    <v-div class="d-flex justify-space-between w-100">
                        <v-div class="mt-16">(Penerima)</v-div>
                        <v-div class="mt-16">(Supir)</v-div>
                        <v-div class="mt-16">(Bag. Gudang)</v-div>
                        <v-div class="mt-16">(Bag. Exim)</v-div>
                    </v-div>
                </v-div>
            </v-sheet>
        </v-card>
    </v-dialog>
</template>
<style>
.page {
    width: 21cm;
    height: 12cm
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
</style>