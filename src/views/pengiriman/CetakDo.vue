<template>
    <div v-if="store().do" class="w-full h-full absolute top-0 left-0 z-10" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-base'">
        <div id="bodyp" class="rounded-xl h-full m-5 animate__animated animate__fadeIn animate__faster" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
            <div id="titlebar" class="p-5 flex items-center justify-between text-xl">
                <div class="flex space-x-3">
                    <button @click="close()">
                        <i class="ri-arrow-left-line"></i>
                    </button>
                    <span class="font-semibold capitalize">{{ store().menu.option.title }}</span>
                </div>
                <button @click="print()" class="mx-3 text-2xl">
                    <i class="ri-printer-line"></i>
                </button>
            </div>
            <div id="suratjalan" class="w-full h-[89%] flex justify-center">
                <div class="page h-full w-full mx-5 border rounded-xl p-5 flex flex-col items-center justify-between gap-y-5 overflow-scroll">
                    <div class="w-full flex flex-col">
                        <div class="w-full flex flex-col gap-y-7 items-center">
                            <span class="font-semibold text-xl uppercase">cetak do</span>
                            <div class="w-full flex gap-x-3 text-[0.9rem]">
                                <div class="flex gap-x-2">
                                    <div class="flex flex-col gap-y-0">
                                        <span class="capitalize">tgl pengiriman</span>
                                        <span class="capitalize">supir/np polisi</span>
                                        <span class="capitalize">tujuan kirim</span>
                                    </div>
                                </div>
                                <div class="flex gap-x-2">
                                    <div class="flex flex-col gap-y-0">
                                        <span class="capitalize">: {{ store().master.tgl_pengiriman }}</span>
                                        <span contenteditable class="capitalize">: </span>
                                        <span class="capitalize">: {{ store().master.pelanggan }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full min-h-max mt-5">
                            <table class="w-full">
                                <thead class="border-b border-black">
                                    <tr class="w-full capitalize">
                                        <th class="w-max whitespace-pre-wrap px-3 font-medium text-left">barang</th>
                                        <th class="w-max whitespace-pre-wrap px-3 font-medium text-left">qty</th>
                                        <th class="w-max whitespace-pre-wrap px-3 font-medium text-left">keterangan</th>
                                        <th class="w-max whitespace-pre-wrap px-3 font-medium text-left">catatan</th>
                                        <th class="w-max whitespace-pre-wrap px-3 font-medium text-left">berat total (kg)</th>
                                    </tr>
                                </thead>
                                <tbody class="w-full">
                                    <tr v-for="(item, i) in store().detail" class="w-full">
                                        <td class="w-max whitespace-pre-wrap px-3 text-left">{{ item.nama_konversi || item.nama_barang }}</td>
                                        <td contenteditable class="w-max whitespace-pre-wrap px-3 text-left">{{ utils.numb(item.jumlah_konversi) }}</td>
                                        <td class="w-max whitespace-pre-wrap px-3 text-left">{{ item.keterangan }}</td>
                                        <td contenteditable class="w-max whitespace-pre-wrap px-3 text-left"></td>
                                        <td class="w-max whitespace-pre-wrap px-3 text-left">{{ item.jumlah }}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <!-- <td class="w-max whitespace-pre-wrap px-3 text-left font-semibold">{{ utils.numb(sum('konversi')) }}</td> -->
                                        <td></td>
                                        <td class="w-max whitespace-pre-wrap px-3 text-left font-semibold">{{ utils.numb(sum('jumlah')) }}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="w-full flex justify-between items-end mb-[25vh]">
                        <span>yang mengajukan</span>
                        <span>mengetahui</span>
                        <span>mengetahui</span>
                        <span>ekspedisi</span>
                    </div>
                    <div class="absolute bottom-[10vh] right-18">
                        <span class="italic">print date: {{ utils.formatDate(utils.today()) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {store} from '@/utils/store'
import utils from '@/utils/utils'
</script>
<script lang="ts">
export default {
    methods: {
        close() {
            store().$patch((state) => {
                state.do = false
            })
        },
        print() {
            window.print()
        },
        sum(p) {
            if(p == 'konversi') {
                let key = this.dataitem.map(item => item.jumlah_konversi)
                let head = Array.from(new Set(key.map(obj => obj.jumlah_konversi))).map(jumlah_konversi => {
                    return key.find(obj => obj.jumlah_konversi === jumlah_konversi)
                })
                let konversi = head.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                return konversi
            }
            if(p == 'jumlah') {
                let key = this.dataitem.map(item => item.jumlah)
                let head = Array.from(new Set(key.map(obj => obj.jumlah))).map(jumlah => {
                    return key.find(obj => obj.jumlah === jumlah)
                })
                let jumlah = head.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                return jumlah
            }
        }
    },
    computed: {
        dataitem () {
            let k = []
            let key = store().detail.map(item => item.nama_barang)
            let head = Array.from(new Set(key.map(obj => obj.nama_barang))).map(nama_barang => {
                return key.find(obj => obj.nama_barang === nama_barang)
            })

            for (let i = 0; i < head.length; i++) {
                let kode = []
                let jumlah = []
                let konversi = []
                let nama = ''
                for (let j = 0; j < store().detail.length; j++) {
                    if(store().detail[j].nama_barang == head[i]) {
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

@media print {
#titlebar {
  visibility: hidden;
}
.page {
    width: 21cm;
    height: 29cm;
    border: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
  #suratjalan {
    visibility: visible;
    position: absolute;
    margin: 0;
    padding: 0;
    left: 0;
    top: 0;
    color: black !important;
    text-rendering: optimizeLegibility;
    image-rendering: auto;
  }
}
</style>