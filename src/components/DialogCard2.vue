<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {  required } from '@vuelidate/validators'
import api from '../api';

export default {
    name: 'DialogCard2',
    props: ['hiddenbtn', 'btn', 'itemDetail', 'pemasukan', 'nokirim', 'belumkirim', 'belumkirim_detail', 'blmkirim', 'penjualan', 'pengiriman', 'produksi', 'barang', 'tambah', 'inputbahan', 'pembeliandetl' , 'getbarang'],
    data() {
        return {
            search: '',
            dialog: false,
            dialogchild: [],
            newbarang: this.barang,
            newproduksi: this.getbarang,
            groupbarang: '',
            dialItem:'',
            pjl: '',
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
            return this.numb(this.penjualan_detail.jumlah * this.penjualan_detail.harga_jual)
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
            masuk() {
                return {
                }
            }
        
    },
    methods: {
    pemasukanItem(kode, i) {
        this.state.no_urut = 1
        this.state.hs_code = kode.hs_code
        this.state.satuan = kode.satuan
        let nilai = ''
        for (let i = 0; i < this.groupbarang.length; i++) {
            if(this.groupbarang[i].kode_group == this.pjl_detail(kode.no_penjualan, 'kode')) {
                nilai = this.groupbarang[i].nilai_akhir / this.groupbarang[i].stok_akhir
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
                        no_urut: this.state.no_urut
                    })
        } else if(this.produksi) {
                    this.pemasukan_item.push({
                        no_produksi: '',
                        kode_barang: kode.kode_barang,
                        nama_barang: this.state.nama_barang,
                        hs_code: this.state.hs_code,
                        jumlah: this.state.jumlah,
                        satuan: this.state.satuan,
                        no_urut: this.state.no_urut,
                        nilai: this.state.nilai,
                    })
        } else if(this.penjualan) {
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
                        no_urut: this.state.no_urut
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
                no_urut: 1,
                nilai: nilai

            })
        }
        this.$emit('pemasukanitem', this.pemasukan_item)
        this.clear()
        this.penjualan_detail= {
            jumlah: '',
            nilai: '',
            harga_jual:'',
        }
        this.dialogchild[i] = false
        this.dialog = false
                    
    },
    numb(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    getgroupbarang() {
        api.getData('/group_Barang')
        .then(response => {
        this.groupbarang = response.data
        })
        .catch(() => {
        window.location.href = '/login'
        })
    },
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
        // if kode barang& kode group == v
        // kode group-> belumkirim detail
        // kode barang = kode
        for (let i = 0; i < this.groupbarang.length; i++) {
            if(this.groupbarang[i].kode_group == kodegroup && this.groupbarang[i].kode_barang == kodebrg) {
                return this.numb(this.groupbarang[i].stok_akhir)
            }
        }        
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
        
    },
    mounted() {
        this.getgroupbarang()
    }
} 
</script>

<template>
    <v-dialog v-model="dialog">
        <!-- BUTTON TAMBAH -->
        <template v-slot:activator="{ props }">
            <v-btn
            v-bind="props"
            @update="dialog"
            variant="tonal"
            class="text-body-2 bg-blue-custom text-white rounded-xl elevation-0 text-caption"
            prepend-icon="mdi-plus"
            height="40"
            :disabled="this.getbarang == '' || this.inputbahan == '' ? true : false"
            >
            Tambah Barang
        </v-btn>
    </template>
    <v-card class="py-5 px-2 rounded-xl">
            <v-card-title v-if="blmkirim" class="text-center text-button font-weight-bold mb-3">PENGELUARAN BELUM TERKIRIM</v-card-title>
            <v-card-title v-if="!blmkirim" class="text-center text-button font-weight-bold mb-3">STOK BARANG</v-card-title>
            <v-text-field
                id="input"
                v-model="search"
                append-inner-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                density="compact"
                variant="outlined"
                class="mb-4"
            ></v-text-field>
            <v-list class="me-2">
                <v-infinite-scroll :items="filteredItems" :onLoad="load">
                    <template v-for="(item, b) in filteredItems" :key="item">
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
                                    {{  item.nama_barang }} ({{ pjl_detail(item.no_penjualan, 'kode') }}) <br>
                                    <!-- penjualandetail(jumlah-terkirim) -->
                                    Jumlah belum terkirim: {{ numb(item.jumlah - item.jumlah_terkirim) }}  <br>
                                    Stok barang: {{ stok(pjl_detail(item.no_penjualan, 'kode'), item.kode_barang) }}
                                </v-span>
                            </v-div>
                            <v-spacer></v-spacer>
                            <v-span class="font-weight-medium">{{ item.no_penjualan }}</v-span>
                            </v-div>
                            <v-divider></v-divider>
                        </v-list-item>
                        <v-dialog @update="dialogchild" width="400" v-model="dialogchild[b]">
                            <v-card class="px-7 py-5 w-100 mx-auto rounded-xl">
                                <v-span class="text-button text-center font-weight-bold">{{ item.nama_barang }}</v-span>
                                <v-span class="text-button mt-n3 mb-3 text-center">{{ item.kode_barang }}</v-span>
                                <v-span class="text-caption mt-n5 mb-3 text-center">{{ item.hs_code }}</v-span>
                                <form @submit.prevent="submit" ref="form">
                                    <v-text-field
                                        v-if="penjualan"
                                        v-model="state.jumlah"
                                        label="Jumlah"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        class="mb-3"
                                        :disabled="hiddenbtn"
                                        :error-messages="v$.jumlah.$errors.map(e => e.$message)"
                                        @input="v$.jumlah.$touch"
                                        @blur="v$.jumlah.$touch"
                                    />
                                    <v-text-field
                                        v-if="!penjualan"
                                        v-model="penjualan_detail.jumlah"
                                        label="Jumlah"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        class="mb-3"
                                        :disabled="hiddenbtn"
                                    />
                                    <v-text-field
                                        v-if="!tambah && !penjualan && !pengiriman"
                                        v-model="state.jumlah_diterima"
                                        label="Jumlah Diterima"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        class="mb-3"
                                        :disabled="hiddenbtn"
                                        :error-messages="v$.jumlah_diterima.$errors.map(e => e.$message)"
                                        @input="v$.jumlah_diterima.$touch"
                                        @blur="v$.jumlah_diterima.$touch"
                                    />
                                    <v-text-field
                                        v-if="!tambah && !penjualan && !pengiriman"
                                        v-model="state.nilai"
                                        label="Nilai Total"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        class="mb-3"
                                        :disabled="hiddenbtn"
                                        :error-messages="v$.nilai.$errors.map(e => e.$message)"
                                        @input="v$.nilai.$touch"
                                        @blur="v$.nilai.$touch"
                                    />
                                    <v-text-field
                                        v-if="!tambah && penjualan"
                                        v-model="penjualan_detail.harga_jual"
                                        label="Harga"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        class="mb-3"
                                        :disabled="hiddenbtn"
                                    />
                                    <v-text-field
                                        v-if="!tambah && penjualan"
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
                                </form>
                            </v-card>          
                        </v-dialog>
                    </template>
                </v-infinite-scroll>
            </v-list>
        </v-card>
        
    </v-dialog>
</template>