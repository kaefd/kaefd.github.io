<script setup>
import textField from '../form/textField.vue';
import textFieldForm from '../form/textFieldForm.vue';
import pillsButton from '../button/pillsButton.vue';
import functions from '../../service/functions';
import pemasukan from '../../service/page/pemasukan';

</script>
<script>
export default {
    components: {
  },
    props:['masuk', 'item'],
    data () {
        return {
            data : {
                jumlah: '',
                nilai: '',
                harga_jual:'',
            }
        }
    },
    
    methods: {
    pemasukanItem() {
    // let nilai = ''
    // if(this.pengiriman) {
    //     for (let i = 0; i < this.groupbarang.length; i++) {
    //         if(this.groupbarang[i].kode_group == this.pjl_detail(kode.no_penjualan, 'kode')) {
    //                 for (let j = 0; j < this.belumkirim_detail.length; j++) {
    //                     if(this.groupbarang[i].kode_barang == this.belumkirim_detail[j].kode_barang) {
    //                         nilai = this.groupbarang[i].nilai_akhir / this.groupbarang[i].stok_akhir
    //                     }
    //             }
    //         }
    //     }
    // }
    let data = []
    if(this.masuk) {
        data.push({
            no_pembelian: '',
            kode_barang: this.item.kode_barang,
            nama_barang: this.item.nama_barang,
            hs_code: this.item.hs_code,
            jumlah: this.data.jumlah,
            jumlah_diterima: this.data.jumlah_diterima,
            satuan: this.item.satuan,
            nilai: this.data.nilai,
            no_urut: this.item.no_urut
        })
    }
    // else if(this.produksi) {
    //     for (let i = 0; i < this.groupbarang.length; i++) {
    //         if(this.groupbarang[i].kode_group == this.kodegroup && this.groupbarang[i].kode_barang == this.kodebarang) {
    //             nilai = this.groupbarang[i].nilai_akhir / this.groupbarang[i].stok_akhir
    //         }
    //     }
    //         this.pemasukan_item.push({
    //             no_produksi: '',
    //             kode_barang: kode.kode_barang,
    //             nama_barang: this.state.nama_barang,
    //             hs_code: this.state.hs_code,
    //             jumlah: this.penjualan_detail.jumlah,
    //             satuan: this.state.satuan,
    //             no_urut: 1,
    //             nilai: nilai,
    //         })
    // } else if(this.pengeluaran) {
    //     this.pemasukan_item.push({
    //         no_penjualan: '',
    //         kode_barang: kode.kode_barang,
    //         nama_barang: this.state.nama_barang,
    //         hs_code: this.state.hs_code,
    //         jumlah: this.penjualan_detail.jumlah,
    //         jumlah_terkirim: 0,
    //         satuan: this.state.satuan,
    //         harga_jual: this.penjualan_detail.harga_jual,
    //         total_terjual: this.terjual,
    //         no_urut: 1
    //     })
    // }else if(this.pengiriman) {
    //     this.pemasukan_item.push({
    //         no_penjualan: kode.no_penjualan,
    //         no_pengiriman: this.nokirim,
    //         kode_barang: kode.kode_barang,
    //         nama_barang: kode.nama_barang,
    //         kode_group: this.pjl_detail(kode.no_penjualan, 'kode'),
    //         tipe_dokumen: this.pjl_detail(kode.no_penjualan, 'tipe'),
    //         no_dokumen: this.pjl_detail(kode.no_penjualan, 'no'),
    //         hs_code: this.state.hs_code,
    //         jumlah: this.penjualan_detail.jumlah,
    //         jumlah_terkirim: this.penjualan_detail.jumlah_terkirim,
    //         satuan: this.state.satuan,
    //         no_urut: 1,
    //         nilai: nilai
    //     })
    // }
    this.$emit('pemasukanitem', data)
    this.data = {
        jumlah: '',
        nilai: '',
        harga_jual:'',
    }
    },
    },
}
</script>

<template>
    <v-dialog width="400">
        <v-card class="px-7 py-5 w-100 mx-auto rounded-xl">
            <v-span class="text-button text-center font-weight-bold">{{ item.nama }}</v-span>
            <v-span class="text-button mt-n3 mb-3 text-center">{{ item.kode_barang }}</v-span>
            <v-span class="text-caption mt-n5 mb-3 text-center">{{ item.hs_code }}</v-span>
            <textFieldForm label="Jumlah" v-model="data.jumlah" />
            <textFieldForm label="Jumlah Diterima" v-model="data.jumlah_diterima" />
            <textFieldForm label="Nilai Total" v-model="data.nilai" />
            <v-div class="d-inline w-100">
                <v-btn @click="pemasukanItem()" variant="tonal" class="rounded-xl text-caption elevation-0">Batal</v-btn>
                <v-btn @click="pemasukanItem()" class="rounded-xl text-caption elevation-0 bg-blue-darken-4 w-75 float-end">Simpan</v-btn>
            </v-div>
            <!-- <form @submit.prevent="submit" ref="form">
                <textField
                    v-if="!masuk"
                    v-model="penjualan_detail.jumlah"
                    label="Jumlah"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-3"
                    :disabled="hiddenbtn"
                />
                <v-text-field
                    v-if="masuk"
                    v-model="state.jumlah"
                    label="Jumlah"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-3"
                    :disabled="hiddenbtn"
                />
                <v-text-field
                    v-if="masuk"
                    v-model="state.jumlah_diterima"
                    label="Jumlah Diterima"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-3"
                    :disabled="hiddenbtn"
                />
                <v-text-field
                    v-if="masuk"
                    v-model="state.nilai"
                    label="Nilai Total"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-3"
                />
                <v-text-field
                    v-if="!tambah && pengeluaran"
                    v-model="penjualan_detail.harga_jual"
                    label="Harga"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-3"
                    :disabled="hiddenbtn"
                />
                <v-text-field
                    v-if="!tambah && pengeluaran"
                    :model-value="terjual"
                    label="Total Harga"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-3"
                    readonly
                />
                <v-div class="d-inline w-100">
                    <v-btn @click="dialogchild[b] = false" variant="tonal" class="rounded-xl text-caption elevation-0">Batal</v-btn>
                    <v-btn type="submit" @click="pemasukanItem(item, b)" class="rounded-xl text-caption elevation-0 bg-blue-darken-4 w-75 float-end">Simpan</v-btn>
                </v-div>
            </form> -->
        </v-card>          
    </v-dialog>
</template>