<script setup>
import {
    VDataTable
} from 'vuetify/labs/VDataTable'
import functions from '../service/functions'
import btnCancel from './button/btnCancel.vue'
import btnInfoVue from './button/btnInfo.vue'
import btnOrange from './button/btnOrange.vue'
import DatePicker from './datepicker/datePicker.vue'
import dialogScroll from './dialog/dialogScroll.vue'
import TextField from './form/textField.vue'
import TextFieldForm from './form/textFieldForm.vue'
import DialogVue from './dialog/dialogVue.vue'
import TextButton from './button/textButton.vue'
import CurrencyInput from './form/currencyInput.vue'
import AlertVue from './dialog/alertVue.vue'
import produksi from '../service/page/produksi'
// import api from '../api';
</script>
<script>
export default {
    props: [
        'window',
        'windowH',
        'tema',
        'headers',
        'headItem',
        'edit',
        'hapus',
        'getbarang',
        'getKonversi',
        'detailbahan',
        'groupbarang',
        'detailbarang',
        'select_kode',
        'item'
    ],
    data() {
        return {
            dialog: false,
            dialog2: false,
            dialogBahan: false,
            dialogbhn: [],
            dialogbrg: [],
            dialog5: false,
            valert: false,
            more: 0,
            status: null,
            message: '',
            searched: '',
            inputbahan: '',
            inputbarang: '',
            masuk: '',
            konversi: '',
            inputproduksi: produksi.input,
            btn: ['Tambah Bahan', 'Tambah Barang'],
            required: [
                (value) => {
                    if (value) return true
                    return 'harus diisi !'
                }
            ]
        }
    },
    computed: {
        heightSizing() {
            let h = ''
            if (this.edit) {
                if (this.window > 1500) {
                    if (this.windowH > 800) {
                        h = '60vh'
                    } else h = '55vh'
                } else if (this.window < 1500) {
                    if (this.windowH > 800) {
                        h = '60vh'
                    } else h = '50vh'
                }
            } else if (!this.edit) {
                if (this.window > 1500) {
                    if (this.windowH > 800) {
                        h = '55vh'
                    } else h = '50vh'
                } else if (this.window < 1500) {
                    if (this.windowH > 800) {
                        h = '50vh'
                    } else if (this.windowH < 700) {
                        h = '45vh'
                    } else h = '50vh'
                }
            }
            return h
        },
        filterkodegroup() {
            let a = []
            if(!this.edit) {
                for (let i = 0; i < this.groupbarang.length; i++) {
                    a.push(this.groupbarang[i].kode_group)
                }
                let b = functions.removeDuplicate(a)
                return b.filter((item) => {
                    return item.toLowerCase().includes(this.searched.toLowerCase())
                })
            } else return null
        },
        group_detail() {
            if(!this.edit) {
                let a = []
                for (let i = 0; i < this.filterkodegroup.length; i++) {
                    for (let j = 0; j < this.groupbarang.length; j++) {
                        if (this.filterkodegroup[i] == this.groupbarang[j].kode_group) {
                            a.push(this.groupbarang[j])
                        }
                    }
                }
                return a
            } else return null
        }
    },
    methods: {
        lainnya() {
            let a = this.more + 10
            this.more = a
        },
        bahanmasuk(value) {
            this.inputbahan = value
        },
        barangmasuk(value) {
            this.inputbarang = value
        },
        input_kodegroup(value) {
            if (this.inputproduksi.kode_group == '') {
                this.inputproduksi.kode_group = value
            }
            if (this.inputproduksi.kode_group != '') {
                this.inputbahan = ''
                for (let i = 0; i < this.inputbarang.length; i++) {
                    this.inputbarang.splice(0, this.inputbarang.length)
                }
            }
            this.inputproduksi.kode_group = value
            this.$emit('input_kodegroup', this.inputproduksi.kode_group)
        },
        // stok_detail(value) {
        //     for (let i = 0; i < this.group_detail.length; i++) {
        //         if (this.group_detail[i].kode_barang == value) {
        //             return this.group_detail[i].stok_akhir
        //         }
        //     }
        // },
        // tempStok(value, i) {
        //     if (value.jumlah > this.stok_detail(value.kode_barang)) {
        //         this.status = 'warn'
        //         this.message = 'Jumlah melebihi stok'
        //         this.valert = true
        //         this.dialogbhn[i] = true
        //     } else this.dialogbhn[i] = false
        // },
        deleteditem(del, p) {
            let jenis = []
            if (p == 'bahan') {
                jenis = this.inputbahan
            }
            if (p == 'barang') {
                jenis = this.inputbarang
            }
            for (let i = 0; i < jenis.length; i++) {
                if (del == jenis[i]) {
                    jenis.splice(i, 1)
                }
            }
        },
        jumlahtotal(p, param) {
            let arr = []
            if(param == 'konversi') {
                for (let i = 0; i < p.length; i++) {
                arr.push(p[i].jumlah_konversi)
                }
                return arr.reduce((total, current) => {
                    return total + current
                }, 0)
            } else {
                for (let i = 0; i < p.length; i++) {
                arr.push(p[i].jumlah)
                }
                return arr.reduce((total, current) => {
                    return total + current
                }, 0)
            }
        },
        confirm() {
            this.$emit('confirm', this.item, this.detailbahan, this.detailbarang)
        },
        async validate() {
            const {
                valid
            } = await this.$refs.form.validate()
            if (valid) {
                // detailbahan
                let dtlbahan = this.inputbahan
                let dtlbarang = []
                // for (let i = 0; i < this.inputbahan.length; i++) {
                //     dtlbahan.push({
                //         no_produksi: this.inputbahan[i].no_produksi,
                //         kode_barang: this.inputbahan[i].kode_barang,
                //         nama_barang: this.inputbahan[i].nama_barang,
                //         hs_code: this.inputbahan[i].hs_code,
                //         jumlah: this.inputbahan[i].jumlah,
                //         satuan: this.inputbahan[i].satuan,
                //         no_urut: i + 1,
                //         nilai: this.inputbahan[i].nilai
                //     })
                // }
                // detailbarang
                for (let i = 0; i < this.inputbarang.length; i++) {
                    dtlbarang.push({
                        // no_produksi: this.inputbarang[i].no_produksi,
                        kode_barang: this.inputbarang[i].kode_barang,
                        kode_konversi: this.inputbarang[i].kode_konversi,
                        // nama_barang: this.inputbarang[i].nama_barang,
                        // nama_konversi: this.inputbarang[i].nama_konversi,
                        // hs_code: this.inputbarang[i].hs_code,
                        jumlah: this.inputbarang[i].jumlah,
                        jumlah_konversi: this.inputbarang[i].jumlah_konversi,
                        // satuan: this.inputbarang[i].satuan,
                        // satuan_konversi: this.inputbarang[i].satuan_konversi,
                        // no_urut: i + 1,
                        // nilai: this.inputbahan[0].nilai
                    })
                }
                // 1st = head, 2nd = detailbahan, 3rd = detailbarang
                return this.$emit('inputhead', this.inputproduksi, dtlbahan, dtlbarang)
            }
        },
        check() {
            if(this.inputproduksi.kode_group == '') {
                this.valert = true
                this.status = 'warn'
                this.message = 'Kode group masih kosong!'
            } else this.dialogBahan = true
        }
    },
    mounted() {}
}
</script>

<template>
<v-dialog v-model="dialog" :scrim="false" transition="dialog-bottom-transition" fullscreen>
    <!-- BUTTON DIALOG -->
    <template v-slot:activator="{ props }">
        <btn-info-vue v-if="!edit" btn_title="Tambah Baru" v-bind="props" icon="mdi-plus" />
        <v-menu>
            <template v-slot:activator="{ props }">
                <!-- LIHAT DATA -->
                <text-button id="menu-actions" v-if="edit" v-bind="props" icon="mdi-dots-vertical" />
            </template>
            <v-list>
                <v-list-item class="text-caption" density="compact" v-bind="props">Lihat Data</v-list-item>
                <v-list-item v-if="hapus" class="text-caption" density="compact" @click="confirm()">Batal Produksi</v-list-item>
            </v-list>
        </v-menu>
    </template>
    <!-- dialog content -->
    <v-card>
        <v-toolbar class="bg-blue-custom text-white" height="50">
            <text-button icon="mdi-close" color="white" @click=";(dialog = false), (inputproduksi = inputbahan = inputbarang = [])" />
            <v-toolbar-title class="text-button">DETAIL PRODUKSI</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-container class="mt-5">
            <v-form @submit.prevent ref="form" class="mb-2">
                    <div class="d-flex justify-space-between w-100 flex-wrap">
                            <div class="d-flex justify-space-between">
                                <span class="text-caption" style="width: 90px; max-width:90px;">No Produksi</span>
                                <text-field-form v-if="edit" :model-value="item.no_produksi" label="No Produksi" readonly />
                                <text-field-form v-if="!edit" label="No Produksi" readonly class="bg-grey-lighten-4" v-model="inputproduksi.no_produksi" />
                            </div>
                            <div class="d-flex justify-space-between">
                                <span class="text-caption" style="width: 90px; max-width:90px;">Tgl Produksi</span>
                                <date-picker v-if="!edit" :max-date="new Date()" :min-date="functions.last_month()" label="Tgl Produksi" v-model="inputproduksi.tgl_produksi" :tema="tema" :rules="required"/>
                                <text-field-form v-if="edit" label="Tgl Produksi" :readonly="true" :rules="required" :model-value="functions.formatDate(item.tgl_produksi)" />
                            </div>
                            <div class="d-flex justify-space-between">
                                <span class="text-caption" style="width: 90px; max-width:90px;">Kode Group</span>
                                <text-field-form v-if="edit" label="Kode Group" :model-value="item.kode_group" readonly :rules="required"/>
                                <text-field-form v-if="!edit" label="Kode Group" readonly @click="dialog5 = true, more = 15" v-model="inputproduksi.kode_group" :rules="required" />
                            </div>
                    </div>
                    <v-divider v-if="edit" class="mb-2"></v-divider>
                    <div class="d-flex justify-space-between w-100 flex-wrap">
                            <div class="d-flex justify-space-between">
                                <span class="text-caption" style="width: 90px; max-width:90px;">Bahan Baku</span>
                                <!-- <text-field-form v-if="!edit" readonly @click="check()" label="Bahan Baku" :model-value="inputbahan" /> -->
                                <dialogScroll v-if="!edit" v-model="dialogBahan" :window="window" dialog_title="stok barang" :group_detail="group_detail" :produksi="true" :btn="btn[0]" width="400" :barang="detailbahan" :tambah="true" :bahanbaku="true" :getbarang="select_kode" :kodegroup="inputproduksi.kode_group" @pemasukanitem="bahanmasuk" />
                                <text-field-form v-if="edit" label="Bahan Baku" readonly :model-value="detailbahan.kode_barang + '-' + detailbahan.nama_barang" />
                            </div>
                            <div v-if="edit" class="d-flex justify-space-between">
                                <span v-if="edit" class="text-caption" style="width: 90px; max-width:90px;">Jumlah</span>
                                <text-field-form label="Jumlah" readonly :model-value="functions.numb(detailbahan.jumlah, 2 , true)"/>
                            </div>
                            <div v-if="edit" class="d-flex justify-space-between">
                                <span class="text-caption" style="width: 90px; max-width:90px;">Satuan</span>
                                <text-field-form label="Satuan" readonly :model-value="detailbahan.satuan"/>
                            </div>
                    </div>
                <!-- </v-row> -->
            </v-form>
            <!-- TABLE -->
            <v-row no-gutters justify="center" justify-md="space-between" align="start" class="mx-sm-0 mx-3" min-width="400">
                <v-responsive class="mt-md-0 mt-1 text-sm-left text-center" width="400">
                    <dialogScroll v-if="!edit" dialog_title="data barang" :produksi="true" :inptbarang="true" :kodegroup="inputproduksi.kode_group" :btn="btn[1]" width="400" :barang="detailbarang" :getbarang="getbarang" :getKonversi="getKonversi" :inputbahan="inputbahan" :tambah="true" @pemasukanitem="barangmasuk" />
                    <v-row v-if="edit" no-gutters class="justify-center py-1 text-button rounded border">detail barang</v-row>
                    <v-container class="border-sm rounded-lg mt-2">
                        <v-data-table :headers="edit ? headItem : headers" :items="edit ? detailbarang : inputbarang" :hover="true" :fixed-header="true" density="compact" class="text-body-2 pb-3 px-5 text-caption he" :height="heightSizing">
                            <template v-slot:bottom>
                                <v-span v-if="edit" class="float-end me-5 text-caption font-weight-medium">Jumlah : {{ functions.numb(jumlahtotal(detailbarang), 2, true) }}</v-span>
                                <v-span v-if="edit" class="float-end me-5 text-caption font-weight-medium">Jumlah Konversi : {{ functions.numb(jumlahtotal(detailbarang, 'konversi')) }}</v-span>
                                <v-span v-if="!edit" class="float-end me-5 text-caption font-weight-medium">Jumlah : {{ functions.numb(jumlahtotal(inputbarang), 2, true) }}</v-span>
                                <v-span v-if="!edit" class="float-end me-5 text-caption font-weight-medium">Jumlah Konversi : {{ functions.numb(jumlahtotal(inputbarang, 'konversi')) }}</v-span>
                            </template>
                            <!-- eslint-disable-next-line vue/valid-v-slot -->
                            <template v-slot:item.jumlah="{ item }">
                                {{ functions.numb(item.raw.jumlah, 2, true) }}
                            </template>
                            <!-- eslint-disable-next-line vue/valid-v-slot -->
                            <template v-slot:item.actions="{ item, index }">
                                <DialogVue @update="dialogbrg" :persistent="edit ? false : true" v-model="dialogbrg[index]">
                                    <template #titlecard>
                                        <v-card-title class="text-center text-grey-darken-3 text-button font-weight-bold">{{
                                          item.raw.kode_konversi == '' ? item.raw.nama_barang : item.raw.nama_konversi
                                        }}</v-card-title>
                                        <v-card-subtitle class="text-caption text-center mb-2 mt-n3">{{
                                          item.raw.kode_konversi == '' ? item.raw.kode_barang : item.raw.kode_konversi
                                        }}</v-card-subtitle>
                                    </template>
                                    <template #content>
                                        <v-sheet class="mx-auto mt-5 w-75 bg-transparent">
                                            <div v-if="edit" class="d-flex justify-space-between">
                                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">{{ 'Jumlah ('+item.raw.satuan+')' }}</span>
                                                <text-field-form :model-value="functions.numb(item.raw.jumlah, 2, true)" :label="'Jumlah ('+item.raw.satuan+')'" readonly />
                                            </div>
                                            <div v-if="!edit && !item.raw.konversi" class="d-flex justify-space-between">
                                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">{{ 'Jumlah ('+item.raw.satuan+')' }}</span>
                                                <currency-input v-model="item.raw.jumlah" :label="'Jumlah ('+item.raw.satuan+')'" :options="{ currency: 'EUR', currencyDisplay: 'hidden' }" />
                                            </div>
                                            <div v-if="edit && item.raw.jumlah_konversi" class="d-flex justify-space-between">
                                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">{{ 'Jumlah ('+item.raw.satuan_konversi+')' }}</span>
                                                <text-field-form :model-value="functions.numb(item.raw.jumlah_konversi)" :label="'Jumlah ('+item.raw.satuan_konversi+')'" readonly />
                                            </div>
                                            <div v-if="!edit && item.raw.konversi" class="d-flex justify-space-between">
                                                <span class="text-caption d-flex align-center" style="width: 90px; max-width:90px;">{{ 'Jumlah ('+item.raw.satuan_konversi+')' }}</span>
                                                <currency-input v-model="item.raw.jumlah_konversi" :label="'Jumlah ('+item.raw.satuan_konversi+')'" :options="{ currency: 'EUR', currencyDisplay: 'hidden' }" />
                                            </div>
                                        </v-sheet>
                                        <v-divider class="mt-3 mb-5"></v-divider>
                                        <v-div v-if="!edit" class="d-flex me-5 ms-auto">
                                            <btn-cancel btn_title="Hapus" @click="deleteditem(item.raw, 'barang'), (dialogbrg[index] = false)" class="me-2"></btn-cancel>
                                            <btn-orange btn_title="Simpan" type="submit" @click="dialogbrg[index] = false"></btn-orange>
                                        </v-div>
                                    </template>
                                </DialogVue>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-responsive>
            </v-row>
            <!-- edit data -->
            <v-row no-gutters class="float-end mt-3">
                <btnCancel v-if="!edit" @click=";(dialog = false), (inputproduksi = inputbahan = inputbarang = [])" btn_title="Batal" />
                <btnOrange v-if="!edit" @click="validate" btn_title="Simpan" class="ms-2" />
            </v-row>
        </v-container>
    </v-card>
    <v-dialog v-model="dialog5" transition="dialog-bottom-transition" width="auto">
        <v-card class="py-5 px-7 rounded-xl mx-auto" min-width="300" :width="window < 600 ? '87vw' : '50vw'" height="90vh" max-width="400">
            <v-btn v-if="window < 500" icon="mdi-close" class="absolute" variant="text" @click="dialog5 = false"></v-btn>
            <v-card-title class="text-center text-grey-darken-3 mb-3 text-button font-weight-bold">KODE GROUP</v-card-title>
            <v-div>
                <text-field v-model="searched" label="Search" class="mb-4" />
            </v-div>
            <v-list>
                <v-div v-for="(kode, i) in filterkodegroup.slice(0, more)" :key="i">
                    <v-list-item style="cursor: pointer" class="text-caption" density="compact" @click="input_kodegroup(kode), (dialog5 = false)">
                        <v-span class="text-caption">{{ kode }}</v-span>
                    </v-list-item>
                </v-div>
                <v-div v-if="filterkodegroup.length > more" class="d-flex justify-center align-center">
                    <v-divider length="50"></v-divider>
                    <v-btn @click="lainnya()" variant="text" size="small" class="text-caption">lihat lainnya</v-btn>
                    <v-divider length="50"></v-divider>
                </v-div>
            </v-list>
        </v-card>
    </v-dialog>
    <AlertVue v-model="valert" :sukses="status" :message="message" :status="status" />
</v-dialog>
</template>
