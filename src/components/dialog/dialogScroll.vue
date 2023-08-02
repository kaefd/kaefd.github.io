<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {  required } from '@vuelidate/validators'
import api from '../../service/api';
import btnInfo from '../button/btnInfo.vue';
import BtnCancel from '../button/btnCancel.vue';
import BtnOrange from '../button/btnOrange.vue';
import TextField from '../form/textField.vue';
import CurrencyInput from '../form/currencyInput.vue';
import functions from '../../service/functions';

export default {
    components: {
        btnInfo,
        BtnCancel,
        BtnOrange,
        TextField,
        CurrencyInput,
    },
    name: 'DialogCard2',
    props: [
    'hiddenbtn',
    'btn',
    'itemDetail',
    'pemasukan',
    'nokirim',
    'belumkirim',
    'kodegroup',
    'belumkirim_detail',
    'blmkirim',
    'penjualan',
    'pengeluaran',
    'pengiriman',
    'produksi',
    'barang',
    'tambah',
    'inputbahan',
    'pembeliandetl',
    'getbarang',
    'kurs',
    'dialog_title',
    ],
    data() {
        return {
            search: '',
            dialog: false,
            dialogchild: [],
            newbarang: this.barang,
            newproduksi: this.getbarang,
            groupbarang: '',
            bahan: this.inputbahan,
            dialItem:'',
            pjl: '',
            total: '',
            pemasukan_item : [],
            penjualan_detail: {
                jumlah: '',
                nilai: '',
                harga_jual:'',
            }
        }
    },
    setup() {
        const initialState = {
            kode_barang: '',
            nama_barang: '',
            hs_code: '',
            jumlah: '',
            jumlah_diterima: '',
            satuan: '',
            nilai: '',
            no_urut:'',
            status: '',
            harga_jual:'',
      }

      const state = reactive({
        ...initialState,
      })

      const rules = {
        kode_barang: { required },
        nama_barang: { required },
        hs_code: { required },
        jumlah: { required },
        jumlah_diterima: { required },
        satuan: { required },
        nilai: { required },
        no_urut: { required },
        harga_jual: { required },
      }
      const v$ = useVuelidate(rules, state)
      function clear () {
        v$.value.$reset()
        for (const [key, value] of Object.entries(initialState)) {
          state[key] = value
        }
      }

      return { state, clear, v$ }
    },
    computed: {
        terjual() {
            return this.penjualan_detail.jumlah * this.penjualan_detail.harga_jual
        },
        filteredItems() {
            if(!this.tambah && !this.blmkirim) {
                return this.barang.filter(item => {
                    return item.nama_barang.toLowerCase().includes(this.search.toLowerCase())
                })
            } else if(this.blmkirim && !this.tambah ) {
                return this.belumkirim_detail.filter(item => {
                    return item.no_penjualan.toLowerCase().includes(this.search.toLowerCase())
                })
            } else {
                return this.getbarang.filter(item => {
                    return item.nama_barang.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        },
    },
    methods: {
    pjl_detail(v, param) {
        for (let i = 0; i < this.belumkirim.length; i++) {
            if(this.belumkirim[i].no_penjualan == v) {
                if(param == 'tipe') {
                    return this.belumkirim[i].tipe_dokumen
                }
                else if(param == 'no') {
                    return this.belumkirim[i].no_dokumen
                }
                else if(param == 'kode'){
                    return this.belumkirim[i].kode_group
                }
            }
        }
    },
    stok(kodegroup, kodebrg) {
        for (let i = 0; i < this.groupbarang.length; i++) {
            if(this.groupbarang[i].kode_group == kodegroup && this.groupbarang[i].kode_barang == kodebrg) {
                return functions.numb2(this.groupbarang[i].stok_akhir)
            }
        }        
    },
    min(a, b) {
        let result = a - b
        return functions.numb2(result)
    },
    async api () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(Array.from({ length: 10 }, (k, v) => v + this.filteredItems.value.at(-1) + 1))
        }, 1000)
      })
    },
    async load ({ done }) {
      // Perform API call
      const res = await this.api()

      this.filteredItems.push(...res)

      done('ok')
    },
    pemasukanItem(kode, i) {
        this.state.hs_code = kode.hs_code
        this.state.satuan = kode.satuan
        let nilai = ''
        if(this.pengiriman) {
            for (let i = 0; i < this.groupbarang.length; i++) {
                if(this.groupbarang[i].kode_group == this.pjl_detail(kode.no_penjualan, 'kode')) {
                        for (let j = 0; j < this.belumkirim_detail.length; j++) {
                            if(this.groupbarang[i].kode_barang == this.belumkirim_detail[j].kode_barang) {
                                nilai = this.groupbarang[i].nilai_akhir / this.groupbarang[i].stok_akhir
                            }
                    }
                }
            }
        }
        if(this.pemasukan) {
            this.pemasukan_item.push({
                no_pembelian: '',
                kode_barang: kode.kode_barang,
                nama_barang: this.state.nama_barang,
                hs_code: this.state.hs_code,
                jumlah: this.state.jumlah,
                jumlah_diterima: this.state.jumlah_diterima,
                satuan: this.state.satuan,
                nilai: this.state.nilai,
                no_urut: i,
            })
            let arr = []
            for (let i = 0; i < this.pemasukan_item.length; i++) {
                arr.push(this.pemasukan_item[i].nilai)
            }
            let nilai = arr.reduce((total, current) => {
                return total + current;
            })
            this.total = nilai * this.kurs

        } else if(this.produksi) {
            for (let i = 0; i < this.groupbarang.length; i++) {
                if(this.groupbarang[i].kode_group == this.kodegroup && this.groupbarang[i].kode_barang == kode.kode_barang) {
                    nilai = this.groupbarang[i].nilai_akhir / this.groupbarang[i].stok_akhir
                }
            }
                this.pemasukan_item.push({
                    no_produksi: '',
                    kode_barang: kode.kode_barang,
                    nama_barang: this.state.nama_barang,
                    hs_code: this.state.hs_code,
                    jumlah: this.penjualan_detail.jumlah,
                    satuan: this.state.satuan,
                    no_urut: 1,
                    nilai: nilai,
                })
        } else if(this.pengeluaran) {
            this.pemasukan_item.push({
                no_penjualan: '',
                kode_barang: kode.kode_barang,
                nama_barang: this.state.nama_barang,
                hs_code: this.state.hs_code,
                jumlah: this.penjualan_detail.jumlah,
                jumlah_terkirim: 0,
                satuan: this.state.satuan,
                harga_jual: this.penjualan_detail.harga_jual,
                total_terjual: this.terjual,
                no_urut: i
            })
        }else if(this.pengiriman) {
            this.pemasukan_item.push({
                no_penjualan: kode.no_penjualan,
                no_pengiriman: this.nokirim,
                kode_barang: kode.kode_barang,
                nama_barang: kode.nama_barang,
                kode_group: this.pjl_detail(kode.no_penjualan, 'kode'),
                tipe_dokumen: this.pjl_detail(kode.no_penjualan, 'tipe'),
                no_dokumen: this.pjl_detail(kode.no_penjualan, 'no'),
                hs_code: this.state.hs_code,
                jumlah: this.penjualan_detail.jumlah,
                jumlah_terkirim: this.penjualan_detail.jumlah_terkirim,
                satuan: this.state.satuan,
                no_urut: i+1,
                nilai: nilai
            })
        }
        this.$emit('pemasukanitem', this.pemasukan_item, this.total)
        this.clear()
        this.penjualan_detail= {
            jumlah: '',
            nilai: '',
            harga_jual:'',
        }
        this.dialogchild[i] = false
        this.dialog = false
                    
    },

    },
   async mounted() {
        this.groupbarang = await api.getGroupBarang()
        this.bahan
    }
} 
</script>

<template>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="auto">
        <!-- BUTTON TAMBAH -->
        <template v-slot:activator="{ props }">
            <btn-info v-bind="props" :disabled="getbarang == '' || inputbahan == '' ? true : false" btn_title="Tambah Barang" icon="mdi-plus" />
        </template>
        <v-card class="py-5 px-7 rounded-xl" min-width="300" width="35vw" max-width="400">
            <v-card-title class="text-center text-orange text-button font-weight-bold mb-3">{{ dialog_title }}</v-card-title>
            <text-field
                id="input"
                v-model="search"
                label="Search"
                class="mb-4"
            ></text-field>
            <v-list class="me-2 100vh">
                <v-div v-for="(item, b) in filteredItems" :key="item">
                    <v-list-item
                        v-if="!blmkirim"
                        class="text-caption"
                        density="compact"
                        @click="dialogchild[b] = true, state.nama_barang = item.nama_barang"
                        >
                        {{ item.nama_barang }}
                    </v-list-item>
                    <v-list-item
                        v-if="blmkirim"
                        @click="dialogchild[b] = true"
                        class="text-caption"
                        density="compact"
                        >
                        <v-div class="d-flex">
                            <v-div>
                            <!-- penjualandetail belumkirim(tipedokumen-nodokumen) -->
                            <v-span class="font-weight-medium">{{ pjl_detail(item.no_penjualan, 'tipe') }}-{{ pjl_detail(item.no_penjualan, 'no') }}</v-span> <br>
                            <v-span class="text-small">
                                <!-- penjualandetail belumkirim(pjl, nama, kodegroup) -->
                                {{ item.nama_barang }} ({{ pjl_detail(item.no_penjualan, 'kode') }}) <br>
                                <!-- penjualandetail(jumlah-terkirim) -->
                                Jumlah belum terkirim: {{ min(item.jumlah, item.jumlah_terkirim) }}  <br>
                                Stok barang: {{ stok(pjl_detail(item.no_penjualan, 'kode'), item.kode_barang) }}
                            </v-span>
                        </v-div>
                        <v-spacer></v-spacer>
                        <v-span class="font-weight-medium">{{ item.no_penjualan }}</v-span>
                        </v-div>
                        <v-divider></v-divider>
                    </v-list-item>
                    <v-dialog @update="dialogchild" transition="dialog-bottom-transition" width="auto" v-model="dialogchild[b]">
                        <v-card class="py-5 mx-auto rounded-xl" min-width="300" max-width="375" width="35vw">
                            <v-span class="text-button text-orange text-center font-weight-bold">{{ item.nama_barang }}</v-span>
                            <v-span class="text-caption text-center">{{ item.kode_barang }} - {{ item.hs_code }}</v-span>
                            <v-divider class="mt-3 mb-5"></v-divider>
                            <form @submit.prevent="submit" ref="form" class="mx-auto w-75 pt-2 bg-transparent">
                                <currency-input
                                    v-if="!pemasukan"
                                    v-model="penjualan_detail.jumlah"
                                    label="Jumlah"
                                    :hide-details="true"
                                    :disabled="hiddenbtn"
                                    :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                                />
                                <currency-input
                                    v-if="pemasukan"
                                    v-model="state.jumlah"
                                    label="Jumlah"
                                    :hide-details="true"
                                    :disabled="hiddenbtn"
                                    :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                                />
                                <currency-input
                                    v-if="pemasukan"
                                    v-model="state.jumlah_diterima"
                                    label="Jumlah Diterima"
                                    :hide-details="true"
                                    :disabled="hiddenbtn"
                                    :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                                />
                                <currency-input
                                    v-if="pemasukan"
                                    v-model="state.nilai"
                                    label="Nilai Total"
                                    :hide-details="true"
                                    :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                                />
                                <currency-input
                                    v-if="!tambah && pengeluaran"
                                    v-model="penjualan_detail.harga_jual"
                                    label="Harga"
                                    :hide-details="true"
                                    :disabled="hiddenbtn"
                                    :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                                />
                                <currency-input
                                    v-if="!tambah && pengeluaran"
                                    v-model="terjual"
                                    label="Total Harga"
                                    :hide-details="true"
                                    readonly
                                    :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                                />
                            </form>
                            <v-divider class="mt-3"></v-divider>
                            <v-div class="d-inline me-5 ms-auto mt-5">
                                <btn-cancel @click="dialogchild[b] = false" btn_title="batal" />
                                <btn-orange type="submit" @click="pemasukanItem(item, b)" btn_title="Simpan" class="ms-2" />
                            </v-div>
                        </v-card>          
                    </v-dialog>
                </v-div>
        </v-list>
        </v-card>
    </v-dialog>
</template>