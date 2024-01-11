<template #dokumen>
    <div class="page bg-white text-black hover:shadow-2xl p-3 flex flex-col items-center gap-y-5">
        <!-- title -->
        <div class="w-full flex flex-col items-center">
            <span class="font-semibold text-lg uppercase">pt. auri steel metalindo</span>
            <div class="w-full border border-black my-1"></div>
            <span class="font-semibold text-lg uppercase">surat jalan</span>
            <div class="w-full flex justify-between text-[10.5pt]">
                <div class="flex gap-x-2">
                    <span class="uppercase">penerima : </span>
                    <div class="flex flex-col gap-y-0">
                        <span class="uppercase">{{ store().master.pelanggan }}</span>
                        <span class="uppercase">{{ store().master.alamat }}</span>
                        <span class="uppercase">{{ store().master.kabupaten }}</span>
                    </div>
                </div>
                <div class="flex gap-x-2">
                    <div class="capitalize flex flex-col">
                        <span>no surat jalan</span>
                        <span>tgl pengiriman</span>
                        <span>supir/no polisi</span>
                    </div>
                    <div class="flex flex-col">
                        <span>: {{ store().master.no_pengiriman }}</span>
                        <span>: {{ utils.formatDate(store().master.tgl_pengiriman) + '/' }}
                        <span contenteditable>{{ utils.TimeNow().slice(0, 5) }}</span></span>
                        <span>: {{ store().master.supir + '/' + store().master.no_polisi }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full h-[180px] min-h-max">
            <table class="w-full">
                <thead class="border-b border-black">
                    <tr class="w-full capitalize">
                        <th class="w-max whitespace-pre-wrap px-3 font-medium text-left">no</th>
                        <th class="w-max whitespace-pre-wrap px-3 font-medium text-left">nama barang</th>
                        <th class="w-max whitespace-pre-wrap px-3 font-medium text-left">qty</th>
                        <th class="w-max whitespace-pre-wrap px-3 font-medium text-left">satuan</th>
                        <th class="w-max whitespace-pre-wrap px-3 font-medium text-left">berat(Kg)</th>
                        <th class="w-max whitespace-pre-wrap px-3 font-medium text-left">keterangan(Ex.BC)</th>
                    </tr>
                </thead>
                <tbody class="w-full">
                    <tr v-for="(item, i) in dataitem" class="w-full">
                        <td class="w-max whitespace-pre-wrap px-3 text-left">{{ i + 1 }}</td>
                        <td class="w-max whitespace-pre-wrap px-3 text-left">{{ item.nama_barang }}</td>
                        <td contenteditable class="w-max whitespace-pre-wrap px-3 text-left">{{
                            utils.numb(item.jumlah_konversi) }}</td>
                        <td contenteditable class="w-max whitespace-pre-wrap px-3 text-left">{{ item.satuan_konversi }}</td>
                        <td class="w-max whitespace-pre-wrap px-3 text-left">{{ utils.numb(item.jumlah) }}</td>
                        <td class="w-max whitespace-pre-wrap px-3 text-left">{{ item.nopen }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <!-- <td class="w-max whitespace-pre-wrap px-3 text-left font-semibold">{{ utils.numb(sum('konversi')) }}</td> -->
                        <td></td>
                        <td class="w-max whitespace-pre-wrap px-3 text-left font-semibold">{{ utils.numb(sum('jumlah')) }}
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="w-full flex flex-col -mt-5">
            <span>keterangan :</span>
            <span class="ms-3">
                1. Surat Jalan ini merupakan bukti penerimaan barang <br>
                2. Surat Jalan ini bukan bukti penjualan (Faktur/Invoice)
            </span>
            <span>Barang sudah diterima dalam keadaan Baik dan Cukup oleh :</span>
        </div>
        <div class="w-full flex justify-between items-end mt-[2%]">
            <span>(Penerima)</span>
            <span>(Supir)</span>
            <span>(Bag. Gudang)</span>
            <span>(Bag. Exim)</span>
        </div>
    </div>
</template>
<script setup>
import { store } from '@/utils/store'
import utils from '@/utils/utils'
</script>
<script>
export default {
    methods: {
        close() {
            store().$patch((state) => {
                state.suratjalan = false
            })
        },
        print() {
            window.print()
        },
        sum(p) {
            if (p == 'konversi') {
                let key = this.dataitem.map(item => item.jumlah_konversi)
                let konversi = key.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                return konversi
            }
            if (p == 'jumlah') {
                let key = this.dataitem.map(item => item.jumlah)
                let jumlah = key.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                return jumlah
            }
        }
    },
    computed: {
        dataitem() {
            let k = []
            let key = store().detail.map(item => item.nama_barang)

            for (let i = 0; i < key.length; i++) {
                let kode = []
                let jumlah = []
                let konversi = []
                let nama = ''
                for (let j = 0; j < store().detail.length; j++) {
                    if (store().detail[j].nama_barang == key[i]) {
                        nama = store().detail[j].nama_barang
                        kode.push(store().detail[j].no_dokumen + '/' + store().detail[j].kode_group.slice(2, 4))
                        jumlah.push(store().detail[j].jumlah)
                        konversi.push(store().detail[j].jumlah_konversi)
                    }
                }
                k.push({
                    nama_barang: nama,
                    jumlah_konversi: konversi.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
                    satuan: store().detail[i].satuan,
                    jumlah: jumlah.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
                    nopen: [...new Set(kode)].toString(),
                })
            }
            return k
        }
    }
}
</script>
<style scoped>
.page {
    width: 21cm;
    height: 12cm;
}

@media print {
    body {
        visibility: hidden;
    }

    /* .hddn {
  visibility: hidden !important;
  padding: 0 !important;
  margin: 0 !important;
}
 .bodyp {
    visibility: hidden;
    padding: 0 !important;
    margin: 0 !important;
} */
    .page {
        width: 20cm;
        height: 11cm;
        border: none;
        box-shadow: none !important;
        margin: 0 !important;
        /* padding: 0 !important; */
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        visibility: visible;
        text-rendering: optimizeLegibility;
        image-rendering: auto;
    }
}</style>