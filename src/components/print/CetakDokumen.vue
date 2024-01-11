<template>
    <div class="hddn w-full h-full absolute top-0 left-0 z-10" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-base'">
        <div class="hddn rounded-xl h-full animate__animated animate__fadeIn animate__faster">
            <div class="bodyp hddn bg-scrim p-3 flex items-center justify-between text-lg md:text-xl">
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
            <div id="print" class="w-full h-full flex justify-center py-10 overflow-auto">
                <div class="page w-screen md:w-max h-max">
                    <slot name="dokumen"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {store} from '@/utils/store'
import utils from '@/utils/utils'
</script>
<script>
export default {
    methods: {
        close() {
            store().$patch((state) => {
                state.print = false
                state.suratjalan = false
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
@page {
    margin: 0mm;
}
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
    /* width: 20cm;
    height: 11cm; */
    width: unset !important;
    border: none;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-rendering: optimizeLegibility;
    image-rendering: auto;
}
  #print {
    visibility: visible;
    position: absolute;
    margin: 0;
    padding: 0;
    left: 0;
    top: 0;
    justify-items: start !important;
    align-items: start !important;
    color: black !important;
    text-rendering: optimizeLegibility;
    image-rendering: auto;
  }
}
</style>