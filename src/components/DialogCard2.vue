<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {  required } from '@vuelidate/validators'

export default {
    name: 'DialogCard2',
    props: ['hiddenbtn', 'btn', 'itemDetail', 'pemasukan', 'penjualan', 'produksi', 'barang', 'tambah', 'inputbahan', 'pembeliandetl' , 'getbarang'],
    data() {
        return {
            search: '',
            dialog: false,
            dialogchild: [],
            newbarang: this.barang,
            newproduksi: this.getbarang,
            dialItem:'',
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
            if(!this.tambah) {
                return this.barang.filter(item => {
                    return item.nama_barang.toLowerCase().includes(this.search.toLowerCase())
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
        
    },
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
    <v-card class="py-5 px-5 rounded-xl">
            <v-card-title class="text-center mb-3">Stok Barang</v-card-title>
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

            <v-list>
                    <v-for v-for="item, b in filteredItems" :key="b">
                        <v-dialog @update="dialogchild" width="400" v-model="dialogchild[b]">
                            <template v-slot:activator="{ props }">
                                <v-list-item
                                    v-bind="props"
                                    class="mx-3"
                                    @click="state.nama_barang = item.nama_barang"
                                    >
                                    {{ item.nama_barang }}
                                </v-list-item>
                            </template>
                            <v-card class="px-7 py-5 w-100 mx-auto rounded-xl">
                                <v-span class="text-button text-center font-weight-bold">{{ item.nama_barang }}</v-span>
                                <v-span class="text-button mt-n2 mb-3 text-center">{{ item.kode_barang }}</v-span>
                                <form @submit.prevent="submit" ref="form">
                                    
                                    <v-text-field
                                        v-if="!penjualan"
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
                                        v-if="penjualan"
                                        v-model="penjualan_detail.jumlah"
                                        label="Jumlah"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        class="mb-3"
                                        :disabled="hiddenbtn"
                                    />
                                    <v-text-field
                                        v-if="!tambah && !penjualan"
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
                                        v-if="!tambah && !penjualan"
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
                                        v-if="!tambah && this.penjualan"
                                        v-model="penjualan_detail.harga_jual"
                                        label="Harga"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        class="mb-3"
                                        :disabled="hiddenbtn"
                                    />
                                    <v-text-field
                                        v-if="!tambah && this.penjualan"
                                        :model-value="terjual"
                                        label="Total Harga"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        class="mb-3"
                                        readonly
                                    />
                                    <v-div class="d-inline w-100">
                                        <v-btn @click="dialogchild[b] = false" variant="tonal" class="rounded-xl text-caption elevation-0 w-auto">Batal</v-btn>
                                        <v-btn type="submit" @click="pemasukanItem(item, b)" class="rounded-xl text-caption elevation-0 bg-blue-darken-4 w-75">Simpan</v-btn>
                                    </v-div>
                                </form>
                                </v-card>          
                            </v-dialog>
                        </v-for>
                </v-list>
        </v-card>
        
    </v-dialog>
</template>