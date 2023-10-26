<script setup>
import functions from '../service/functions'
import {
    VDataTable
} from 'vuetify/labs/VDataTable'
import dialogScroll from '../components/dialog/dialogScroll.vue'
import api from '../service/api'
import datePickerVue from '../components/datepicker/datePicker.vue'
import btnInfoVue from '../components/button/btnInfo.vue'
import BtnOrange from '../components/button/btnOrange.vue'
import BtnCancel from '../components/button/btnCancel.vue'
import TextFieldForm from '../components/form/textFieldForm.vue'
import TextField from '../components/form/textField.vue'
import DialogVue from '../components/dialog/dialogVue.vue'
import CurrencyInput from '../components/form/currencyInput.vue'
import AlertVue from '../components/dialog/alertVue.vue'
</script>

<script>
export default {

    props: [
        'tema',
        'window',
        'windowH',
        'alamatBgkr',
        'hapus',
        'pjl_blmterkirm',
        'pembelianbaru',
        'namaPelanggan',
        'detailkirim',
        'nokirim',
        'nopjl',
        'pjl_detail',
        'alamatBongkar',
        'groupbarang',
        'batalbtn',
        'pengiriman',
        'pemasukan',
        'totalpenjualan',
        'namaTujuan',
        'datainput',
        'pageTitle',
        'pengeluaran',
        'no',
        'tipe',
        'namaSupplier',
        'pengirimanDetail',
        'pembelian',
        'pelanggan',
        'supplier',
        'pembeliandetl',
        'edit',
        'kirim',
        'headers',
        'items',
        'actIcon',
        'icon',
        'btncolor',
        'search',
        'iVariant',
        'headDetails',
        'details',
        'disable',
        'btn',
        'datatext',
        'itemDetail',
        'category',
        'barangKonversi',
        'belumkirim',
        'belumkirim_detail'
    ],
    data() {
        return {
            dialog: false,
            dialog4: false,
            dialogbongkar: false,
            valid: false,
            more: 0,
            btnmore: false,
            moretext: 'lihat lainnya',
            status: '',
            message:'',
            valert: false,
            detaildial: [],
            tipe_dokumen: ['BC25', 'BC41'],
            searched: '',
            barang: '',
            kirim_detail: '',
            item_blmterkirim: '',
            namasupplier: '',
            dataitem: this.items,
            nama_supplier: '',
            nama_pelanggan: '',
            pembelian_input: '',
            kode_pelanggan: this.namaPelanggan,
            inputdata: this.datainput,
            kurs: '',
            required: [
                (value) => {
                    if (value) return true
                    return 'harus diisi !'
                }
            ]
        }
    },

    created() {
        if (this.edit) {
            let k = (this.dataitem.kurs / 1).toFixed(3).replace('.', ',')
            this.kurs = k.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
    },
    computed: {
        heightSizing() {
            let h = ''
            if (this.edit) {
                if (this.window > 1500) {
                    if (this.windowH > 800) {
                        h = '65vh'
                    } else h = '63vh'
                } else if (this.window < 1500) {
                    if (this.windowH > 800) {
                        h = '63vh'
                    } else h = '55vh'
                }
            } else if (!this.edit) {
                if (this.window > 1500) {
                    if (this.windowH > 800) {
                        h = '50vh'
                    } else h = '43vh'
                } else if (this.window < 1500) {
                    if (this.windowH > 800) {
                        h = '50vh'
                    } else h = '40vh'
                }
            }
            return h
        },
        filtersupplier() {
            return this.supplier.filter((item) => {
                return item.nama.toLowerCase().includes(this.searched.toLowerCase())
            })
        },
        filteralamat() {
            // return this.alamatBongkar.filter(item => {
            //         return item.nama.toLowerCase().includes(this.searched.toLowerCase())
            //     })
            if (this.searched != '') {
                return this.searchObj(this.alamatBongkar)
            } else return this.alamatBongkar
        },
        filterkodegroup() {
            return this.groupbarang.filter((item) => {
                return item.kode_group.toLowerCase().includes(this.searched.toLowerCase())
            })
        }
    },
    methods: {
        async fetchData() {
            if (this.edit) {
                let pjl = []
                for (let i = 0; i < this.nopjl.length; i++) {
                    pjl.push(await api.getHeadPenjualan(this.nopjl[i]))
                }
                let data = []
                for (let j = 0; j < this.pjl_detail.length; j++) {
                    for (let k = 0; k < pjl.length; k++) {
                        if (this.pjl_detail[j].no_penjualan == pjl[k][0].no_penjualan) {
                            data.push({
                                no_penjualan: this.pjl_detail[j].no_penjualan,
                                tipe_dokumen: pjl[k][0].tipe_dokumen,
                                no_dokumen: pjl[k][0].no_dokumen,
                                kode_group: this.pjl_detail[j].kode_group,
                                kode_barang: this.pjl_detail[j].kode_barang,
                                kode_konversi: this.pjl_detail[j].kode_konversi,
                                nama_konversi: this.pjl_detail[j].nama_konversi,
                                nama_barang: this.pjl_detail[j].nama_barang,
                                hs_code: this.pjl_detail[j].hs_code,
                                jumlah: this.pjl_detail[j].jumlah,
                                jumlah_konversi: this.pjl_detail[j].jumlah_konversi,
                                satuan_konversi: this.pjl_detail[j].satuan_konversi,
                                satuan: this.pjl_detail[j].satuan,
                                no_urut: this.pjl_detail[j].no_urut,
                                nilai: this.pjl_detail[j].nilai
                            })
                        }
                    }
                }
                const kirim_detail = [...new Set(data.map(JSON.stringify))].map(JSON.parse);
                this.kirim_detail = kirim_detail
            }
        },
        lainnya() {
            let a = this.more + 600
            this.more = a
        },
        checkStok(item, i) {
          if(item.jumlah > item.jumlah_blmterkirim) {
            this.status = 'warn'
            this.message = 'Jumlah melebihi sisa penjualan'
            this.valert = true
            this.detaildial[i] = true
          } else this.detaildial[i] = false
        },
        searchObj(value) {
            let a = {}
            a = value.filter((item) => {
                return item.nama.toLowerCase().includes(this.searched.toLowerCase())
            })
            if (a == '') {
                a = value.filter((item) => {
                    return item.alamat.toLowerCase().includes(this.searched.toLowerCase())
                })
                if (a == '') {
                    a = value.filter((item) => {
                        return item.kabupaten.toLowerCase().includes(this.searched.toLowerCase())
                    })
                }
            }
            return a
        },
        itemmasuk(value) {
            this.pembelian_input = value
        },
        confirm() {
            this.$emit('confirm', this.dataitem, this.kirim_detail)
        },
        totalharga(v) {
            if (this.dataitem.no_penjualan == v) {
                return functions.numb(this.dataitem.total_penjualan)
            }
        },
        deleteditem(del) {
            for (let i = 0; i < this.pembelian_input.length; i++) {
                if (del == this.pembelian_input[i]) {
                    this.pembelian_input.splice(i, 1)
                }
            }
        },
        jumlahtotal(data) {
            let arr = []
            for (let i = 0; i < data.length; i++) {
                arr.push(data[i].jumlah)
            }
            return arr.reduce((total, current) => {
                return total + current
            }, 0)
        },
        async validate() {
            const {
                valid
            } = await this.$refs.form.validate()
            if (valid) {
                // inputata = head
                // pembelian_input = detail
                let a = []
                for (let i = 0; i < this.pembelian_input.length; i++) {
                    let kode = ''
                    if(this.pembelian_input[i].kode_konversi != '') {
                        kode = ""
                    } else kode = this.pembelian_input[i].kode_barang
                    a.push({
                        no_penjualan: this.pembelian_input[i].no_penjualan,
                        // no_pengiriman: this.inputdata.no_pengiriman,
                        kode_barang: kode,
                        // nama_barang: this.pembelian_input[i].nama_barang,
                        // kode_group: this.pembelian_input[i].kode_group,
                        // hs_code: this.pembelian_input[i].hs_code,
                        jumlah: this.pembelian_input[i].jumlah,
                        jumlah_konversi: this.pembelian_input[i].jumlah_konversi,
                        kode_konversi: this.pembelian_input[i].kode_konversi,
                        // satuan_konversi: this.pembelian_input[i].satuan_konversi,
                        // satuan: this.pembelian_input[i].satuan,
                        no_urut: 1,
                        // nilai: this.pembelian_input[i].nilai
                    })
                }
                this.$emit('inputhead', this.inputdata, a)
            }
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>

<template>
<v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
    <template v-slot:activator="{ props }">
        <!-- TAMBAH -->
        <btn-info-vue v-if="!edit" v-bind="props" btn_title="Tambah Baru" icon="mdi-plus" />

        <!-- LIHAT DATA -->
        <v-list-item v-if="edit" v-bind="props" class="text-caption"> Lihat Detail </v-list-item>

        <v-list-item v-if="edit && hapus" class="text-caption" @click="confirm()">
            Batal Pengiriman
        </v-list-item>
    </template>
    <!-- dialog content -->
    <v-card class="bg-light">
        <v-toolbar class="bg-blue-custom text-white" height="50">
            <v-btn icon dark @click=";(pembelian_input = []), (inputdata = []), (dialog = false)" size="small">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="text-button mt-1">{{ 'DETAIL ' + pageTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-container class="h-100 d-flex flex-column mt-5">
            <!-- EDIT -->
            <div v-if="edit" class="d-flex justify-space-between w-100 flex-wrap rounded-lg bg-white py-5 px-3 mb-2">
                <div style="width: 300px;">
                    <div class="d-flex justify-space-between">
                        <span class="text-caption" style="width: 90px; max-width:90px;">No Pengiriman</span>
                        <text-field-form label="No Pengiriman" v-model="dataitem.no_pengiriman" readonly />
                    </div>
                    <div class="d-flex justify-space-between">
                        <span class="text-caption" style="width: 90px; max-width:90px;">Tgl Pengiriman</span>
                        <text-field-form label="Tgl Pengiriman" :model-value="functions.formatDate(dataitem.tgl_pengiriman)" readonly />
                    </div>
                </div>
                <div style="width: 300px;">
                    <div class="d-flex justify-space-between">
                        <span class="text-caption" style="width: 90px; max-width:90px;">Supir</span>
                        <text-field-form label="Supir" :model-value="dataitem.supir" readonly />
                    </div>
                    <div class="d-flex justify-space-between">
                        <span class="text-caption" style="width: 90px; max-width:90px;">No Polisi</span>
                        <text-field-form label="No Polisi" :model-value="dataitem.no_polisi" readonly />
                    </div>
                </div>
                <div style="width: 300px;">
                    <div class="d-flex justify-space-between">
                        <span class="text-caption" style="width: 90px; max-width:90px;">Pelanggan</span>
                        <text-field-form label="Pelanggan" :model-value="dataitem.namaplg" readonly />
                    </div>
                    <div v-if="alamatBgkr" class="d-flex justify-space-between">
                        <span class="text-caption" style="width: 90px; max-width:90px;">Tujuan Bongkar</span>
                        <text-field-form label="Tujuan Bongkar" :model-value="dataitem.nama" readonly />
                    </div>
                </div>
            </div>
            <!-- TAMBAH PENGIRIMAN -->
            <v-form @submit.prevent ref="form">
                <div v-if="!edit" class="d-flex justify-space-between w-100 flex-wrap rounded-lg bg-white py-5 px-3 mb-2">
                    <div style="width: 300px;">
                        <div class="d-flex justify-space-between">
                            <span class="text-caption" style="width: 90px; max-width:90px;">No Pengiriman</span>
                            <text-field-form label="No Pengiriman" v-model="inputdata.no_pengiriman" :rules="required"/>
                        </div>
                        <div class="d-flex justify-space-between">
                            <span class="text-caption" style="width: 90px; max-width:90px;">Tgl Pengiriman</span>
                            <datePickerVue label="Tgl Pengiriman" v-model="inputdata.tgl_pengiriman" :max-date="new Date()" :min-date="functions.last_month()" :rules="required" :tema="tema" />
                        </div>
                    </div>
                    <div style="width: 300px;">
                        <div class="d-flex justify-space-between">
                        <span class="text-caption" style="width: 90px; max-width:90px;">Pelanggan</span>
                            <text-field-form @click="dialog4 = true" label="Pelanggan" v-model="inputdata.nama" :rules="required" readonly></text-field-form>
                        </div>
                        <div class="d-flex justify-space-between">
                            <span class="text-caption" style="width: 90px; max-width:90px;">Tujuan Bongkar</span>
                            <text-field-form @click="dialogbongkar = true, more = 100" label="Tujuan Bongkar" v-model="inputdata.tujuan" :rules="required" readonly></text-field-form>
                        </div>
                    </div>
                    <div style="width: 300px;">
                        <div class="d-flex justify-space-between">
                            <span class="text-caption" style="width: 90px; max-width:90px;">Supir</span>
                            <text-field-form label="Supir" v-model="inputdata.supir" :rules="required" />
                        </div>
                        <div class="d-flex justify-space-between">
                            <span class="text-caption" style="width: 90px; max-width:90px;">No Polisi</span>
                            <text-field-form label="No Polisi" v-model="inputdata.no_polisi" :rules="required" />
                        </div>
                    </div>
                </div>
            </v-form>
            <!-- TABEL EDIT/VIEW -->
            <div class="bg-white rounded-lg pa-3">
                <!-- BUTTON TAMBAH BARANG -->
                <div v-if="!edit" class="text-sm-left text-center my-2">
                    <dialogScroll :window="window" dialog_title="pengeluaran belum terkirim" @reset="reset" :nokirim="inputdata.no_pengiriman" :blmkirim="true" :getKonversi="barangKonversi" :pjl_blmterkirm="pjl_blmterkirm" :belumkirim="belumkirim" :belumkirim_detail="belumkirim_detail" :barang="barang" :itemDetail="itemDetail" @pemasukanitem="itemmasuk" :pengiriman="true" :penjualan="penjualan" :inptbarang="true" :btn="btn" width="400" />
                </div>
                <v-data-table :headers="headDetails" :items="edit ? kirim_detail : pembelian_input" :hover="true" :fixed-header="true" density="compact" class="text-caption py-1 mt-2 h-100" :height="heightSizing">
                    <!-- CUSTOM PAGINATION STYLE -->
                    <template v-slot:bottom>
                        <v-span v-if="edit" class="float-end me-5 text-caption font-weight-medium">Total Jumlah : {{ functions.numb(jumlahtotal(kirim_detail), 2, true) }}</v-span>
                        <v-span v-if="!edit" class="float-end me-5 text-caption font-weight-medium">Total Jumlah : {{ functions.numb(jumlahtotal(pembelian_input), 1, true) }}</v-span>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.jumlah="{ item }">{{ functions.numb(item.raw.jumlah, 1, true) }}</template>
                    <!-- dialog actions -->
                    <!-- CUSTOM KOLOM -->
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <!-- <template v-slot:item.jumlah="{ item }">
                    {{ functions.numb(item.raw.jumlah) }}
                </template> -->
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <!-- <template v-if="!edit" v-slot:item.jumlah_konversi="{ item }">
                   {{ functions.numb(item.raw.jumlah_konversi) }}
                </template> -->
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.actions="{ item, index }">
                        <dialog-vue v-model="detaildial[index]" :persistent="edit ? false : true">
                            <template #titlecard>
                                <v-card-title class="text-center text-grey-darken-3 text-button font-weight-bold">{{!item.raw.konversi ? item.raw.nama_barang : item.raw.nama_konversi}}</v-card-title>
                                <v-card-subtitle class="text-caption text-center mb-2 mt-n3">{{!item.raw.konversi ? item.raw.hs_code : item.raw.kode_konversi}}</v-card-subtitle>
                            </template>
                            <template #content>
                                <v-sheet class="mx-auto mt-5 w-75 bg-transparent">
                                    <div v-if="edit" class="d-flex justify-space-between">
                                        <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">Jumlah (Kg)</span>
                                        <text-field-form  label="Jumlah (Kg)" :model-value="functions.numb(item.raw.jumlah)" active="true" hide-details class="mb-3" readonly />
                                    </div>
                                    <div v-if="!edit && !item.raw.konversi" class="d-flex justify-space-between">
                                        <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">{{ 'Jumlah ('+item.raw.satuan+')' }}</span>
                                        <currency-input :label="'Jumlah ('+item.raw.satuan+')'" v-model="pembelian_input[index].jumlah" active="true" class="mb-3" :options="{ currency: 'EUR', currencyDisplay: 'hidden' }" />
                                    </div>
                                    <div v-if="edit && item.raw.jumlah_konversi" class="d-flex justify-space-between">
                                        <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">{{ 'Jumlah ('+item.raw.satuan_konversi+')' }}</span>
                                        <text-field-form :label="'Jumlah ('+item.raw.satuan_konversi+')'" :model-value="item.raw.jumlah_konversi" active="true" hide-details class="mb-3" readonly />
                                    </div>
                                    <div v-if="!edit && item.raw.konversi" class="d-flex justify-space-between">
                                        <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">Jumlah Konversi</span>
                                        <currency-input label="Jumlah Konversi" v-model="pembelian_input[index].jumlah_konversi" active="true" class="mb-3" :options="{ currency: 'EUR', currencyDisplay: 'hidden' }" />
                                    </div>
                                    <div v-if="!edit && item.raw.konversi" class="d-flex justify-space-between">
                                        <span class="text-caption" style="width: 90px; max-width:90px;">Satuan Konversi</span>
                                        <!-- <text-field-form v-if="edit" label="Satuan Konversi" :model-value="item.raw.satuan_konversi" active="true" hide-details class="mb-3" readonly /> -->
                                        <text-field-form label="Satuan Konversi" v-model="pembelian_input[index].satuan_konversi" active="true" class="mb-3" />
                                    </div>
                                </v-sheet>
                                <div v-if="!edit" class="d-flex me-5 mt-5 ms-auto">
                                    <btn-cancel btn_title="Hapus" @click="deleteditem(item.raw), (detaildial[index] = false)" class="me-2">Hapus</btn-cancel>
                                    <btn-orange btn_title="Simpan" @click="checkStok(item.raw, index)">Simpan</btn-orange>
                                </div>
                            </template>
                        </dialog-vue>
                    </template>
                </v-data-table>
            </div>
            <div v-if="!edit" class="d-flex mb-0 mt-auto me-5 ms-auto">
                <btn-cancel @click=";(pembelian_input = []), (inputdata = []), (dialog = false)" btn_title="Batal" class="mb-3" />
                <btn-orange @click="validate" btn_title="Simpan" class="ms-2 mb-3" />
            </div>
        </v-container>
    </v-card>
    <v-dialog v-model="dialog4" transition="dialog-bottom-transition" width="auto">
        <v-card class="py-5 px-7 rounded-xl mx-auto bg-light dialog-width vh-100">
            <v-div>
                <v-btn v-if="window < 500" icon="mdi-close" class="absolute" variant="text" @click="dialog4 = false"></v-btn>
                <v-card-title class="text-center text-grey-darken-3 mb-3 text-button font-weight-bold">PELANGGAN</v-card-title>
                <text-field v-model="searched" label="Search"></text-field>
            </v-div>
            <v-list class="bg-light">
                <v-for v-for="(s, i) in filtersupplier" :key="i">
                    <v-list-item density="compact" style="cursor: pointer" class="text-caption" @click="
                ;(inputdata.kode_pelanggan = s.kode_pelanggan),
                  (inputdata.nama = s.nama),
                  (dialog4 = false)
              ">
                        {{ s.nama }}
                    </v-list-item>
                </v-for>
            </v-list>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogbongkar" transition="dialog-bottom-transition" width="auto">
        <v-card class="py-5 px-7 rounded-xl mx-auto bg-light dialog-width">
            <v-btn v-if="window < 500" icon="mdi-close" class="absolute" variant="text" @click="dialogbongkar = false"></v-btn>
            <v-card-title class="text-center text-grey-darken-3 mb-3 text-button font-weight-bold">ALAMAT BONGKAR</v-card-title>
            <div>
                <text-field v-model="searched" label="Search"></text-field>
            </div>
            <v-list class="my-4 bg-light">
                <div class="vh-100">
                    <v-list-item v-for="(s, i) in filteralamat.slice(0, more)" :key="i" density="compact" style="cursor: pointer" class="text-caption" @click="
                ;(inputdata.kode_alamat_bongkar = s.kode_pelanggan),
                  (inputdata.tujuan = s.nama),
                  (dialogbongkar = false)
              ">
                        <v-span class="font-weight-medium">{{ s.nama }}</v-span> <br />
                        <v-span class="text-small">
                            {{ s.alamat }} -
                            {{ s.kabupaten }}
                        </v-span>
                        <v-divider></v-divider>
                    </v-list-item>
                </div>
                <!-- SHOW MORE BUTTON -->
                <div v-if="filteralamat.length > more" class="d-flex justify-center align-center">
                    <v-divider length="50"></v-divider>
                    <v-btn @click="lainnya()" variant="text" size="small" class="text-caption">lihat lainnya</v-btn>
                    <v-divider length="50"></v-divider>
                </div>
              </v-list>
        </v-card>
      </v-dialog>
      <AlertVue v-model="valert" :status="status" :message="message" />
</v-dialog>
</template>

<style>
.max-width-25 {
    width: 300px;
}

.btn-custom {
    box-shadow: none;
    width: 100px;
    height: 45px !important;
}

input#input-335.v-field__input {
    width: 200px !important;
}
</style>
