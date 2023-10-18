<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import api from '../../service/api'
import btnInfo from '../button/btnInfo.vue'
import BtnCancel from '../button/btnCancel.vue'
import BtnOrange from '../button/btnOrange.vue'
import TextField from '../form/textField.vue'
import CurrencyInput from '../form/currencyInput.vue'
import functions from '../../service/functions'
import TextFieldForm from '../form/textFieldForm.vue'
import AlertVue from './alertVue.vue'
import dialogSearch from './dialogSearch.vue'

export default {
    components: {
        btnInfo,
        BtnCancel,
        BtnOrange,
        TextField,
        CurrencyInput,
        TextFieldForm,
        AlertVue,
        dialogSearch,
    },
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
        'pjl_blmterkirm',
        'window',
        'group_detail',
        'inptbarang',
        'bahanbaku',
        'getKonversi'
    ],
    data() {
        return {
            search: '',
            dialog: false,
            valert: false,
            konversi: null,
            status: '',
            more: 100,
            split: 0,
            moretext: 'lihat lainnya',
            btnmore: false,
            kodebahan: '',
            message: '',
            dialogchild: [],
            newbarang: this.barang,
            newproduksi: this.getbarang,
            groupbarang: '',
            bahan: this.inputbahan,
            dialItem: '',
            pjl: '',
            res: '',
            total: '',
            pemasukan_item: [],
            penjualan_detail: {
                jumlah: 0,
                nilai: '',
                harga_jual: '',
                jumlah_konversi: 0,
            }
        }
    },
    setup() {
        const initialState = {
            kode_barang: '',
            kode_konversi: '',
            nama_barang: '',
            nama_konversi: '',
            persentase: 0,
            hs_code: '',
            jumlah: 0,
            jumlah_konversi: 0,
            jumlah_diterima: 0,
            satuan: '',
            satuan_konversi: '',
            nilai: '',
            no_urut: '',
            status: '',
            harga_jual: ''
        }

        const state = reactive({
            ...initialState
        })

        const rules = {
            kode_barang: {
                required
            },
            nama_barang: {
                required
            },
            hs_code: {
                required
            },
            jumlah: {
                required
            },
            jumlah_diterima: {
                required
            },
            satuan: {
                required
            },
            nilai: {
                required
            },
            no_urut: {
                required
            },
            harga_jual: {
                required
            }
        }
        const v$ = useVuelidate(rules, state)

        function clear() {
            v$.value.$reset()
            for (const [key, value] of Object.entries(initialState)) {
                state[key] = value
            }
        }

        return {
            state,
            clear,
            v$
        }
    },
    computed: {
        terjual() {
            return this.penjualan_detail.jumlah * this.penjualan_detail.harga_jual
        },
        filteredItems() {
            if (!this.tambah && !this.blmkirim) {
                // return this.barang.filter(item => {
                //     return item.kode_barang.toLowerCase().includes(this.search.toLowerCase())
                // })
                if (this.search != '') {
                    return this.searchBarang(this.barang)
                } else return this.barang
            } else if (this.blmkirim && !this.tambah) {
                // return this.pjl_blmterkirm.filter(item => {
                //     return item.no_dokumen.toLowerCase().includes(this.search.toLowerCase())
                // })
                if (this.search != '') {
                    return this.searchObj(this.pjl_blmterkirm)
                } else return this.pjl_blmterkirm
            } else if (this.produksi && this.konversi) {
                // return this.getbarang.filter(item => {
                //     return item.nama_barang.toLowerCase().includes(this.search.toLowerCase())
                // })
                if (this.search != '') {
                    return this.searchBarang(this.getKonversi)
                } else return this.getKonversi
            } else {
                if (this.search != '') {
                    return this.searchBarang(this.getbarang)
                } else return this.getbarang
            }
        }
    },
    methods: {
        lainnya() {
            let a = this.more + 100
            this.more = a
        },
        stok_detail(value) {
            for (let i = 0; i < this.group_detail.length; i++) {
                if (this.group_detail[i].kode_barang == value) {
                    return this.group_detail[i].stok_akhir
                }
            }
        },
        searchBarang(value) {
            if(!this.konversi) {
                return value.filter((item) => {
                    let a = item.kode_barang.toLowerCase().includes(this.search.toLowerCase())
                    let b = item.nama_barang.toLowerCase().includes(this.search.toLowerCase())
                    return a || b
                })
            } else {
                return value.filter((item) => {
                    let a = item.nama_konversi.toLowerCase().includes(this.search.toLowerCase())
                    let b = item.kode_konversi.toLowerCase().includes(this.search.toLowerCase())
                    let c = item.kode_barang.toLowerCase().includes(this.search.toLowerCase())
                    let d = item.satuan_konversi.toLowerCase().includes(this.search.toLowerCase())
                    return a || b || c || d
                })
            }
            
        },
        searchObj(value) {
            return value.filter((item) => {
                let nopen = item.no_dokumen + ''
                let a = nopen.toLowerCase().includes(this.search.toLowerCase())
                let b = item.nama_barang.toLowerCase().includes(this.search.toLowerCase())
                let c = item.no_penjualan.toLowerCase().includes(this.search.toLowerCase())
                let kode = item.kode_group + ''
                let d = kode.toLowerCase().includes(this.search.toLowerCase())
                let tipe = item.tipe_dokumen + ''
                let e = tipe.toLowerCase().includes(this.search.toLowerCase())
                let f = item.kode_barang.toLowerCase().includes(this.search.toLowerCase())
                return a || b || c || d || e || f
            })
        },
        stok(kodegroup, kodebrg) {
            for (let i = 0; i < this.groupbarang.length; i++) {
                if (
                    this.groupbarang[i].kode_group == kodegroup &&
                    this.groupbarang[i].kode_barang == kodebrg
                ) {
                    return functions.numb2(this.groupbarang[i].stok_akhir)
                }
            }
        },
        min(a, b) {
            let result = a - b
            return functions.numb2(result)
        },
        async api() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(Array.from({
                        length: 10
                    }, (k, v) => v + this.filteredItems.value.at(-1) + 1))
                }, 1000)
            })
        },
        async load({
            done
        }) {
            // Perform API call
            const res = await this.api()

            this.filteredItems.push(...res)

            done('ok')
        },
        barangKonversi(value, i) {
            if(value) {
                this.state.kode_konversi = value.kode_konversi
                this.state.nama_konversi = value.nama
                this.state.satuan_konversi = value.satuan_konversi
            } else {
                setTimeout(() => {
                    this.dialogchild[i] = false
                }, 1000)
            }
        },
        async pemasukanItem(kode, i) {
            this.state.hs_code = kode.hs_code
            this.state.satuan = kode.satuan
            let nilai = ''
            // if (this.pengiriman) {
            //     for (let i = 0; i < this.groupbarang.length; i++) {
            //         for (let j = 0; j < this.pjl_blmterkirm.length; j++) {
            //             if (this.groupbarang[i].kode_group == this.pjl_blmterkirm[j].kode_group) {
            //                 for (let j = 0; j < this.belumkirim_detail.length; j++) {
            //                     if (this.groupbarang[i].kode_barang == this.belumkirim_detail[j].kode_barang) {
            //                         nilai = this.groupbarang[i].nilai_akhir / this.groupbarang[i].stok_akhir
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
            // PEMASUKAN
            if (this.pemasukan) {
                this.check(kode)
                if (this.res) {
                    this.pemasukan_item.push({
                        no_pembelian: '',
                        kode_barang: kode.kode_barang,
                        nama_barang: this.state.nama_barang,
                        hs_code: this.state.hs_code,
                        jumlah: this.state.jumlah,
                        jumlah_diterima: this.state.jumlah_diterima,
                        satuan: this.state.satuan,
                        nilai: this.state.nilai,
                        persentase: this.state.persentase,
                        no_urut: ''
                    })
                    let arr = []
                    for (let i = 0; i < this.pemasukan_item.length; i++) {
                        arr.push(this.pemasukan_item[i].nilai)
                    }
                    let nilai = arr.reduce((total, current) => {
                        return total + current
                    })
                    this.total = nilai * this.kurs
                    this.dialog = false
                    this.dialogchild[i] = false
                } else {
                    this.dialogchild[i] = false
                    this.status = 'warn'
                    this.message = 'Barang sudah pernah diinput'
                    this.valert = true
                }
          } else if (this.produksi) {
                this.check(kode)
                if(this.inptbarang || this.penjualan_detail.jumlah <= this.stok_detail(kode.kode_barang)) {
                  if (this.res) {
                      for (let i = 0; i < this.groupbarang.length; i++) {
                          if (
                              this.groupbarang[i].kode_group == this.kodegroup &&
                              this.groupbarang[i].kode_barang == kode.kode_barang
                          ) {
                              nilai = this.groupbarang[i].nilai_akhir / this.groupbarang[i].stok_akhir
                          }
                      }
                      this.kodebahan = kode.kode_barang
                      let kodekonversi = ''
                      let jml = 0
                      if(this.konversi) {
                        let berat = await this.hitungBerat(kode)
                        let brg = await api.getBarang({kode_barang: kode.kode_barang})
                        kodekonversi = kode.kode_konversi
                        jml = berat * this.penjualan_detail.jumlah_konversi
                        this.state.nama_barang = brg[0].nama_barang
                        this.state.satuan = brg[0].satuan
                      } else {
                        kodekonversi = this.state.kode_konversi
                        jml = this.penjualan_detail.jumlah
                      }
                      this.pemasukan_item.push({
                          no_produksi: '',
                          kode_group: kode.kode_group,
                          kode_barang: kode.kode_barang,
                          kode_konversi: kodekonversi,
                          nama_barang: this.state.nama_barang,
                          nama_konversi: this.state.nama_konversi,
                          hs_code: this.state.hs_code,
                          jumlah: jml,
                          jumlah_konversi: this.penjualan_detail.jumlah_konversi,
                          satuan: this.state.satuan,
                          satuan_konversi: kode.satuan_konversi,
                          no_urut: '',
                          konversi: kodekonversi == '' ? false : true
                        //   nilai: nilai
                      })
                      this.dialog = false
                      this.dialogchild[i] = false
                  } else {
                      this.dialogchild[i] = false
                      this.status = 'warn'
                      this.message = 'Barang sudah pernah diinput'
                      this.valert = true
                  }
                } else {
                      this.dialogchild[i] = true
                      this.status = 'warn'
                      this.message = 'Jumlah melebihi stok'
                      this.valert = true
                  }
            } else if (this.pengeluaran) {
                this.check(kode)
                if (this.res) {
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
                        no_urut: ''
                    })
                    this.dialog = false
                    this.dialogchild[i] = false
                } else {
                    this.dialogchild[i] = false
                    this.status = 'warn'
                    this.message = 'Barang sudah pernah diinput'
                    this.valert = true
                }
            } else if (this.pengiriman) {
                this.check(kode)
                if(this.penjualan_detail.jumlah <= (kode.jumlah - kode.jumlah_terkirim)) {
                  if (this.res) {
                    let jml = 0
                    let nama = ''
                    if (this.konversi) {
                        let berat = await this.hitungBerat(kode)
                        let brg = await api.getBarang({kode_barang: kode.kode_barang})
    
                        jml = berat * this.penjualan_detail.jumlah_konversi
    
                        nama = brg[0].nama_barang
                        this.state.satuan = brg[0].satuan
                    } else {
                        jml = this.penjualan_detail.jumlah
                        nama = kode.nama_barang
                    }

                      this.pemasukan_item.push({
                          no_penjualan: kode.no_penjualan,
                          no_pengiriman: this.nokirim,
                          kode_barang: kode.kode_barang,
                          nama_barang: nama,
                          kode_group: kode.kode_group,
                          tipe_dokumen: kode.tipe_dokumen,
                          no_dokumen: kode.no_dokumen,
                          hs_code: this.state.hs_code,
                          jumlah: jml,
                          kode_konversi: this.state.kode_konversi,
                          nama_konversi: this.state.nama_konversi,
                          jumlah_konversi: this.penjualan_detail.jumlah_konversi,
                          satuan_konversi: this.state.satuan_konversi,
                          jumlah_terkirim: this.penjualan_detail.jumlah_terkirim,
                          jumlah_blmterkirim: (kode.jumlah - kode.jumlah_terkirim),
                          satuan: this.state.satuan,
                          no_urut: '',
                          konversi: this.state.kode_konversi == '' ? false : true
                        //   nilai: nilai

                      })
                      this.dialog = false
                      this.dialogchild[i] = false
                  } else {
                      this.dialogchild[i] = false
                      this.status = 'warn'
                      this.message = 'Barang sudah pernah diinput'
                      this.valert = true
                  }
                } else {
                      this.dialogchild[i] = true
                      this.status = 'warn'
                      this.message = 'Jumlah melebihi sisa penjualan'
                      this.valert = true
                  }
            }
            this.check(kode)
            this.$emit('pemasukanitem', this.pemasukan_item, this.total)
            this.clear()
            this.penjualan_detail = {
                jumlah: '',
                nilai: '',
                harga_jual: '',
                jumlah_konversi: 0,
                satuan_konversi: ''
            }
        },
        check(value) {
            if (!this.pengiriman && !this.produksi) {
                if (this.pemasukan_item == '') {
                    this.res = true
                } else if (this.pemasukan_item != '') {
                    for (let i = 0; i < this.pemasukan_item.length; i++) {
                        if (value.kode_barang == this.pemasukan_item[i].kode_barang) {
                            this.res = false
                            break
                        } else if (value.kode_barang != this.pemasukan_item[i].kode_barang) {
                            this.res = true
                        }
                    }
                }
            } else if (this.pengiriman) {
                if (this.pemasukan_item == '') {
                    this.res = true
                } else if (this.pemasukan_item != '') {
                    for (let i = 0; i < this.pemasukan_item.length; i++) {
                        if (value.no_dokumen == this.pemasukan_item[i].no_dokumen) {
                            if (value.kode_group == this.pemasukan_item[i].kode_group) {
                                if(!this.konversi) {
                                    if (value.kode_barang == this.pemasukan_item[i].kode_barang) {
                                        if(this.pemasukan_item[i].kode_konversi == '') {
                                            this.res = false
                                            break
                                        } else this.res = true
                                    } else this.res = true
                                 }
                                 if(this.konversi) {
                                    if(this.state.kode_konversi == this.pemasukan_item[i].kode_konversi) {
                                        this.res = false
                                        break
                                    } else this.res = true
                                } else this.res = true
                            }
                        } else if (value.no_dokumen != this.pemasukan_item[i].no_dokumen) {
                            this.res = true
                        }
                    }
                }
            }
            else if (this.produksi && !this.bahanbaku) {
                if (this.pemasukan_item == '') {
                    this.res = true
                } else if (this.pemasukan_item != '') {
                    for (let i = 0; i < this.pemasukan_item.length; i++) {
                        if (value.kode_group == this.pemasukan_item[i].kode_group) {
                            if(!this.konversi) {
                                if (value.kode_barang == this.pemasukan_item[i].kode_barang) {
                                    if(this.pemasukan_item[i].kode_konversi == '') {
                                        this.res = false
                                        break
                                    } else this.res = true
                                } else this.res = true
                            }
                            if(this.konversi) {
                                if (value.kode_konversi == this.pemasukan_item[i].kode_konversi) {
                                    this.res = false
                                    break
                                } else this.res = true
                            }
                        } else this.res = true
                    }
                }
            }
        },
        async hitungBerat(kode) {
            let param = ''
            if(this.kodegroup) {
                param = {
                    kode_konversi: kode.kode_konversi,
                    kode_group: this.kodegroup
                }
            } else {
                param = {
                    kode_konversi: this.state.kode_konversi,
                    kode_group: kode.kode_group,
                }
            }
            return await api.getBerat(param)
        },
        pro(value, b) {
            if(!this.bahanbaku) {
                this.dialogchild[b] = true
            } else {
                this.kodebahan = value
                this.$emit('pemasukanitem', this.kodebahan)
            }
        },
        filter_konversi(kode) {
            let a = []
            let data = this.getKonversi
            for (let i = 0; i < data.length; i++) {
                if(kode == data[i].kode_barang) {
                    a.push(data[i])
                }
            }
            return a
        },
        valid (p) {
            if (p == 'group') {
                if (this.kodegroup != '' || this.pengiriman) {
                    this.dialog = true
                    this.valert = false
                } else {
                    this.valert = true
                    this.message = 'Kode Group Masih Kosong !'
                    this.status = 'warn'
                    this.dialog = false
                }
            }
        }
    },
    async mounted() {
        this.groupbarang = await api.getGroupBarang()
        this.bahan
    }
}
</script>

<template>
<btn-info v-if="!bahanbaku" @click="more = 100, konversi = false, valid('group')" btn_title="Tambah Barang" class="me-3"></btn-info>
<btn-info v-if="!bahanbaku && produksi || pengiriman" @click="more = 100, konversi = true, valid('group')" btn_title="Tambah Konversi"></btn-info>
<v-dialog v-model="dialog" transition="dialog-bottom-transition" width="auto">
    <!-- BUTTON TAMBAH -->
    <template v-slot:activator="{ props }">
        <text-field-form v-if="bahanbaku" readonly v-bind="props" @click="more = 15" label="Bahan Baku" v-model="kodebahan" />
    </template>
    <v-card class="py-5 px-7 rounded-xl vh-100 mx-auto bg-light" min-width="300" width="30vw" max-width="400">
        <v-btn v-if="window < 500" icon="mdi-close" class="absolute" variant="text" @click="dialog = false">
        </v-btn>
        <v-card-title class="text-center text-grey-darken-3 text-button font-weight-bold mb-3 px-12">{{
        dialog_title
        }}</v-card-title>
        <v-div>
            <text-field id="input" v-model="search" label="Search" class="mb-4"></text-field>
        </v-div>
        <v-list class="me-2 bg-light">
            <div v-for="(item, b) in filteredItems.slice(0, more)" :key="item">
                <v-list-item v-if="!blmkirim && konversi" class="text-caption" density="compact" @click=";(pro(item.kode_konversi, b)), (state.nama_konversi = item.nama_konversi)">
                    <v-div class="d-flex justify-space-between text-caption">
                        <v-span>{{ item.nama_konversi }}</v-span>
                    </v-div>
                </v-list-item>
                <v-list-item v-if="!blmkirim && !konversi" class="text-caption" density="compact" @click=";(pro(item.kode_barang, b)), (state.nama_barang = item.nama_barang)">
                    <v-div class="d-flex justify-space-between text-caption">
                        <v-span>{{ item.nama_barang }}</v-span>
                        <v-span v-if="!inptbarang">{{ stok_detail(item.kode_barang) }}</v-span>
                        <v-span v-if="inptbarang">{{ item.kode_barang }}</v-span>
                    </v-div>
                </v-list-item>
                <v-list-item v-if="blmkirim" @click="dialogchild[b] = true" class="text-caption" density="compact">
                    <v-div class="d-flex">
                        <v-div>
                            <!-- penjualandetail belumkirim(tipedokumen-nodokumen) -->
                            <v-span class="font-weight-medium">{{ item.tipe_dokumen }}-{{ item.no_dokumen }}</v-span>
                            <br />
                            <v-span class="text-small">
                                <!-- penjualandetail belumkirim(pjl, nama, kodegroup) -->
                                {{ item.nama_barang }} ({{ item.kode_group }}) <br />
                                <!-- penjualandetail(jumlah-terkirim) -->
                                Jumlah belum terkirim: {{ min(item.jumlah, item.jumlah_terkirim) }} <br />
                                Stok barang: {{ stok(item.kode_group, item.kode_barang) }}
                            </v-span>
                        </v-div>
                        <v-spacer></v-spacer>
                        <v-span class="font-weight-medium">{{ item.no_penjualan }}</v-span>
                    </v-div>
                    <v-divider></v-divider>
                </v-list-item>
                <v-dialog v-if="!bahanbaku" @update="dialogchild" :persistent="true" transition="dialog-bottom-transition" width="auto" v-model="dialogchild[b]">
                    <v-card class="py-5 mx-auto rounded-xl" min-width="300" max-width="375" width="35vw">
                        <v-span class="text-button text-grey-darken-3 text-center font-weight-bold">{{item.nama_barang || item.nama_konversi}}</v-span>
                        <v-span v-if="!konversi" class="text-caption text-center">{{ item.kode_barang +'-'+ item.hs_code }}</v-span>
                        <v-span v-else-if="konversi" class="text-caption text-center">{{ item.kode_konversi }}</v-span>
                        <v-divider class="mt-3 mb-5"></v-divider>
                        <form @submit.prevent="submit" ref="form" class="mx-auto w-75 pt-2 bg-transparent">
                            <div v-if="pengiriman && konversi" class="d-flex justify-space-between">
                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">Kode Konversi</span>
                                <dialogSearch :button="false" label="Kode Konversi" :objectFilter="filter_konversi(item.kode_barang)" :index="b" card-title="Barang Konversi" @pilihObjek="barangKonversi" />
                            </div>
                            <div v-if="!pemasukan && !konversi" class="d-flex justify-space-between">
                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">Jumlah (KG)</span>
                                <currency-input v-model="penjualan_detail.jumlah" label="Jumlah (KG)" :hide-details="true" :disabled="hiddenbtn" :options="{ currency: 'EUR', currencyDisplay: 'hidden' }" />
                            </div>
                            <div v-if="!pemasukan && konversi" class="d-flex justify-space-between">
                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">Jumlah (konversi)</span>
                                <currency-input v-model="penjualan_detail.jumlah_konversi" label="Jumlah (konversi)" :hide-details="true" :disabled="hiddenbtn" :options="{ currency: 'EUR', currencyDisplay: 'hidden' }" />
                            </div>
                            <div v-if="pengiriman && konversi" class="d-flex justify-space-between">
                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">Satuan konversi</span>
                                <text-field-form v-model="state.satuan_konversi" label="Satuan konversi" readonly :hide-details="true" />
                            </div>
                            <div v-if="pemasukan" class="d-flex justify-space-between">
                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">Jumlah (KG)</span>                            
                                <currency-input v-model="state.jumlah" label="Jumlah (KG)" :hide-details="true" :disabled="hiddenbtn" :options="{ currency: 'EUR', currencyDisplay: 'hidden' }" />
                            </div>
                            <div v-if="pemasukan" class="d-flex justify-space-between">
                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">Jumlah Diterima</span>
                                <currency-input v-if="pemasukan" v-model="state.jumlah_diterima" label="Jumlah Diterima" :hide-details="true" :disabled="hiddenbtn" :options="{ currency: 'EUR', currencyDisplay: 'hidden' }" />
                            </div>
                            <div v-if="pemasukan" class="d-flex justify-space-between">
                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">Nilai Total</span>
                                <currency-input v-model="state.nilai" label="Nilai Total" :hide-details="true" :options="{ currency: 'EUR', currencyDisplay: 'hidden' }" />
                            </div>
                            <div v-if="!tambah && pengeluaran" class="d-flex justify-space-between">
                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">Harga</span>
                                <currency-input v-model="penjualan_detail.harga_jual" label="Harga" :hide-details="true" :disabled="hiddenbtn" :options="{ currency: 'EUR', currencyDisplay: 'hidden' }" />
                            </div>
                            <div v-if="!tambah && pengeluaran" class="d-flex justify-space-between">
                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">Total Harga</span>
                                <currency-input v-model="terjual" label="Total Harga" :hide-details="true" readonly :options="{ currency: 'EUR', currencyDisplay: 'hidden' }" />
                            </div>
                        </form>
                        <v-divider class="mt-3"></v-divider>
                        <v-div class="d-inline me-5 ms-auto mt-5">
                            <btn-cancel @click="dialogchild[b] = false" btn_title="batal" />
                            <btn-orange type="submit" @click="pemasukanItem(item, b)" btn_title="Simpan" class="ms-2" />
                        </v-div>
                    </v-card>
                </v-dialog>
            </div>
            <!-- SHOW MORE BUTTON -->
            <v-div v-if="filteredItems.length > more" class="d-flex justify-center align-center">
                <v-divider length="50"></v-divider>
                <v-btn @click="lainnya()" variant="text" size="small" class="text-caption">lihat lainnya</v-btn>
                <v-divider length="50"></v-divider>
            </v-div>
        </v-list>
    </v-card>
</v-dialog>
<alertVue v-model="valert" :status="status" :message="message" />
</template>
