<template #dokumen>
    <div class="page tnr bg-white text-black hover:shadow-2xl p-3 flex flex-col items-center gap-y-2">
        <!-- title -->
        <div class="w-full flex flex-col items-center">
            <span class="font-semibold text-[16px] uppercase">pt. auri steel metalindo</span>
            <div class="w-full border border-black my-1"></div>
            <span class="font-semibold text-[16px] uppercase">surat jalan</span>
            <div class="w-full flex justify-between text-sm">
                <div class="flex gap-x-2">
                    <span class="uppercase">penerima : </span>
                    <div class="flex flex-col gap-y-0">
                        <span class="uppercase">{{ head.pelanggan }}</span>
                        <span class="uppercase w-4/5">{{ head.alamat }}</span>
                        <!-- <span class="uppercase">{{ head.kabupaten }}</span> -->
                    </div>
                </div>
                <div class="flex gap-x-2">
                    <div class="capitalize flex flex-col">
                        <span>no surat jalan</span>
                        <span>tgl pengiriman</span>
                        <span>supir/no polisi</span>
                    </div>
                    <div class="flex flex-col">
                        <span>: {{ head.no_pengiriman }}</span>
                        <span>: {{ utils.formatDate(head.tgl_pengiriman) + '/' }}
                        <span>{{ utils.TimeNow().slice(0, 5) }}</span></span>
                        <span>: {{ head.supir + '/' + head.no_polisi }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full h-[180px] min-h-max">
            <table class="w-full">
                <thead class="border-b border-black text-[15px]">
                    <tr class="w-full capitalize font-semibold">
                        <th class="w-max whitespace-pre-wrap px-3 text-left">no</th>
                        <th class="w-max whitespace-pre-wrap px-3 text-left">nama barang</th>
                        <th class="w-max whitespace-pre-wrap px-3 text-right">qty</th>
                        <th class="w-max whitespace-pre-wrap px-3 text-left">satuan</th>
                        <th class="w-max whitespace-pre-wrap px-3 text-right">berat(Kg)</th>
                        <th class="w-max whitespace-pre-wrap px-3 text-left">keterangan(Ex.BC)</th>
                    </tr>
                </thead>
                <tbody class="w-full text-[15px]">
                    <tr v-for="(item, i) in dataitem" class="w-full">
                        <td class="w-max whitespace-pre-wrap px-3 text-left">{{ i + 1 }}</td>
                        <td class="w-max whitespace-pre-wrap px-3 text-left">{{ item.nama_barang }}</td>
                        <td class="w-max whitespace-pre-wrap px-3 text-right">{{
                            utils.numb(item.jumlah_konversi) }}</td>
                        <td class="w-max whitespace-pre-wrap px-3 text-left">{{ item.satuan_konversi }}</td>
                        <td class="w-max whitespace-pre-wrap px-3 text-right">{{ utils.numb(item.jumlah) }}</td>
                        <td class="max-w-[400px] whitespace-pre-wrap px-3 text-left">
                            <span>{{ item.nopen }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <!-- <td class="w-max whitespace-pre-wrap px-3 text-left font-semibold">{{ utils.numb(sum('konversi')) }}</td> -->
                        <td></td>
                        <td class="w-max whitespace-pre-wrap px-3 text-right font-semibold">{{ utils.numb(sum('jumlah')) }}
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="w-full flex flex-col -mt-5 text-sm">
            <span>Keterangan :</span>
            <span class="ms-3">
                1. Surat Jalan ini merupakan bukti penerimaan barang <br>
                2. Surat Jalan ini bukan bukti penjualan (Faktur/Invoice)
            </span>
            <span>Barang sudah diterima dalam keadaan Baik dan Cukup oleh :</span>
        </div>
        <div class="w-full flex justify-between items-end mt-[2%] text-xs">
            <span>(Penerima)</span>
            <span>(Supir)</span>
            <span>(Bag. Gudang)</span>
            <span>(Bag. Exim)</span>
        </div>
        <div class="onlyPrinted flex w-full justify-end -mt-2">
            <!-- <span class="italic text-xs">Print by: {{ `${user} / ${utils.formatDate(utils.today())} ${utils.TimeNow()}` }}</span> -->
            <span class="text-[10px]">{{ utils.Code(user) }}</span>
        </div>
    </div>
</template>
<script setup>
import { store } from '@/utils/store'
import utils from '@/utils/utils'
import pengiriman from '../pengiriman/pengiriman'
</script>
<script>
export default {
    props: {
        head: {type: Object, required: true},
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem('session')).user,
            detail: ''
        }
    },
    methods: {
        async get() {
            this.detail = await pengiriman.getDetail(this.head)
        },
        sum(p) {
            if (p == 'konversi') {
                let j = []
                for (let i = 0; i < this.detail.length; i++) {
                    j.push(this.detail[i].jumlah_konversi)
                }
                let jumlah = j.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                return jumlah
            }
            if (p == 'jumlah') {
                let j = []
                for (let i = 0; i < this.detail.length; i++) {
                    j.push(this.detail[i].jumlah)
                }
                let jumlah = j.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                return jumlah
            }
        }
    },
    computed: {
        dataitem() {
				let k = [];
                if(this.detail != '') {
                    let key = this.detail.map((item) => item.nama_barang);
                    let head = [...new Set(key)]
    
                    for (let i = 0; i < head.length; i++) {
                        let kode = [];
                        let jumlah = [];
                        let konversi = [];
                        let nama = "";
                        for (let j = 0; j < this.detail.length; j++) {
                            if (this.detail[j].nama_barang == head[i]) {
                                nama = this.detail[j].nama_barang;
                                kode.push(
                                    this.detail[j].no_dokumen +
                                        "/" +
                                        this.detail[j].tipe_dokumen.slice(2, 4)
                                );
                                jumlah.push(this.detail[j].jumlah);
                                konversi.push(this.detail[j].jumlah_konversi);
                            }
                        }
                        k.push({
                            nama_barang: nama,
                            jumlah_konversi: konversi.reduce(
                                (accumulator, currentValue) => accumulator + currentValue,
                                0
                            ),
                            satuan: this.detail[i].satuan,
                            satuan_konversi: this.detail[i].satuan_konversi,
                            jumlah: jumlah.reduce(
                                (accumulator, currentValue) => accumulator + currentValue,
                                0
                            ),
                            nopen: ([...new Set(kode)].toString()).replaceAll(",", ", "),
                        });
                    }
                    return k;
                }
		},
    },
    mounted() {
        this.get()
    }
}
</script>
<style scoped>
.tnr {
    font-family: Arial, Helvetica, sans-serif !important;
}
.page {
    width: 20cm;
    height: 12cm;
}
.onlyPrinted {
    visibility: hidden;
}
@media print {
.onlyPrinted {
    visibility: visible;
}
}
</style>