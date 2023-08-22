<script setup>
import functions from '../service/functions';
</script>
<script >
import { VDataTable } from 'vuetify/labs/VDataTable'
import dialogScroll from '../components/dialog/dialogScroll.vue';
import api from '../service/api';
import datePickerVue from '../components/datepicker/datePicker.vue';
import btnInfoVue from '../components/button/btnInfo.vue';
import BtnOrange from '../components/button/btnOrange.vue';
import BtnCancel from '../components/button/btnCancel.vue';
import TextFieldForm from '../components/form/textFieldForm.vue';
import TextField from '../components/form/textField.vue';
import DialogVue from '../components/dialog/dialogVue.vue';
import CurrencyInput from '../components/form/currencyInput.vue';
export default {
    components: {
    dialogScroll,
    VDataTable,
    datePickerVue,
    btnInfoVue,
    BtnOrange,
    BtnCancel,
    TextFieldForm,
    TextField,
    DialogVue,
    CurrencyInput
    },
    props:['tema', 'window', 'windowH', 'alamatBgkr', 'hapus', 'pjl_blmterkirm', 'pembelianbaru', 'namaPelanggan','detailkirim', 'nokirim', 'nopjl', 'pjl_detail', 'alamatBongkar', 'groupbarang', 'batalbtn', 'pengiriman', 'pemasukan', 'totalpenjualan', 'namaTujuan', 'datainput', 'pageTitle', 'pengeluaran', 'no', 'tipe', 'namaSupplier', 'pengirimanDetail', 'pembelian', 'pelanggan', 'supplier', 'pembeliandetl', 'edit', 'kirim', 'headers', 'items', 'actIcon', 'icon', 'btncolor', 'search', 'iVariant', 'headDetails', 'details','disable', 'btn', 'datatext', 'itemDetail', 'category'],
    data () {
      return {
        dialog: false,
        dialog4: false,
        dialogbongkar: false,
        valid: false,
        detaildial: [],
        tipe_dokumen: ['BC25', 'BC41'],
        searched: '',
        barang: '',
        belumkirim: '',
        belumkirim_detail: '',
        kirim_detail: '',
        item_blmterkirim: '',
        namasupplier: '',
        dataitem: this.items,
        nama_supplier : '',
        nama_pelanggan : '',
        pembelian_input: '',
        kode_pelanggan: this.namaPelanggan,
        inputdata: this.datainput,
        kurs: '',
        required: [
        value => {
          if (value)  return true
          return 'harus diisi !'
        },
      ],

      }
    },
    
    created() {
        if(this.edit) {
                let k = (this.dataitem.kurs / 1).toFixed(3).replace('.', ',')
                this.kurs = k.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
    },
    computed: {
        heightSizing() {
            let h = ''
            if(this.edit) {
                if(this.window > 1500) {
                    if(this.windowH > 800) {
                        h = '60vh'
                    } else h ='55vh'
                } else if(this.window < 1500) {
                    if(this.windowH > 800) {
                        h = '60vh'
                    } else h ='55vh'
                }
            } else if(!this.edit) {
                if(this.window > 1500) {
                    if(this.windowH > 800) {
                        h = '50vh'
                    } else h ='43vh'
                } else if(this.window < 1500) {
                    if(this.windowH > 800) {
                        h = '50vh'
                    } else h ='43vh'
                }
            }
            return h
        },
        filtersupplier() {
            return this.supplier.filter(item => {
                    return item.nama.toLowerCase().includes(this.searched.toLowerCase())
                })
            },
        filteralamat() {
            // return this.alamatBongkar.filter(item => {
            //         return item.nama.toLowerCase().includes(this.searched.toLowerCase())
            //     })
            if(this.searched != '') {
                return this.searchObj(this.alamatBongkar)
            } else return this.alamatBongkar
            },
        filterkodegroup() {
            return this.groupbarang.filter(item => {
                    return item.kode_group.toLowerCase().includes(this.searched.toLowerCase())
            })
        },
    },
    methods:{
        async fetchData() {
            this.belumkirim = await api.getBelumTerkirim()
            this.belumkirim_detail = await api.getBelumTerkirimDetail()
            if(this.edit) {
                let pjl = []
                for (let i = 0; i < this.nopjl.length; i++) {
                    pjl.push(await api.getHeadPenjualan(this.nopjl[i]))
                }
                let data = []
                for (let j = 0; j < this.pjl_detail.length; j++) {
                    for (let k = 0; k < pjl.length; k++) {
                        if(this.pjl_detail[j].no_penjualan == pjl[k][0].no_penjualan) {
                            data.push({
                                no_penjualan: this.pjl_detail[j].no_penjualan,
                                tipe_dokumen: pjl[k][0].tipe_dokumen,
                                no_dokumen: pjl[k][0].no_dokumen,
                                kode_group: this.pjl_detail[j].kode_group,
                                kode_barang: this.pjl_detail[j].kode_barang,
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
                this.kirim_detail = data
            }
        },
        searchObj(value) {
            let a = {}
            a = value.filter(item => {
                return item.nama.toLowerCase().includes(this.searched.toLowerCase())
            })
            if(a == '') {
                a = value.filter(item => {
                    return item.alamat.toLowerCase().includes(this.searched.toLowerCase())
                })
                if(a == '') {
                    a = value.filter(item => {
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
        totalharga(v){
            if (this.dataitem.no_penjualan == v ) {
                return functions.numb(this.dataitem.total_penjualan)
            }
        },
        deleteditem(del) {
            for (let i = 0; i < this.pembelian_input.length; i++) {
                if( del == this.pembelian_input[i] ) {
                    this.pembelian_input.splice(i,1);
                }
            }
        },
        jumlahtotal(data) {
            let arr = []
            for (let i = 0; i < data.length; i++) {
                arr.push(data[i].jumlah)
            }
            return arr.reduce((total, current) => {
                return total + current;
            }, 0);
        },
        async validate () {
            const { valid } = await this.$refs.form.validate()
            if (valid){
                // inputata = head
                // pembelian_input = detail
                let a = []
                for (let i = 0; i < this.pembelian_input.length; i++) {
                    a.push({
                        no_penjualan: this.pembelian_input[i].no_penjualan,
                        no_pengiriman: this.inputdata.no_pengiriman,
                        kode_barang: this.pembelian_input[i].kode_barang,
                        nama_barang: this.pembelian_input[i].nama_barang,
                        kode_group: this.pembelian_input[i].kode_group,
                        hs_code: this.pembelian_input[i].hs_code,
                        jumlah: this.pembelian_input[i].jumlah,
                        jumlah_konversi: this.pembelian_input[i].jumlah_konversi,
                        satuan_konversi: this.pembelian_input[i].satuan_konversi,
                        satuan: this.pembelian_input[i].satuan,
                        no_urut: 1,
                        nilai: this.pembelian_input[i].nilai
                    })
                    
                }
                this.$emit('inputhead', this.inputdata, a)
            }
        },
    },
    mounted() {
        this.fetchData()
    }
}

</script>

<template>
    <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          fullscreen
        >
        <template v-slot:activator="{ props }">
            <!-- TAMBAH -->
            <btn-info-vue v-if="!edit" v-bind="props" btn_title="Tambah Baru" icon="mdi-plus" />

           <!-- LIHAT DATA -->
            <v-list-item
            v-if="edit"
            v-bind="props"
            class="text-caption"
            >
            Lihat Detail
            </v-list-item>
            
            <v-list-item
            v-if="edit && hapus"
            class="text-caption"
            @click="confirm()"
            >
            Batal Pengiriman
            </v-list-item>
          </template>
          <!-- dialog content -->
            <v-card>
                <v-toolbar class="bg-blue-custom text-white" height="50">
                    <v-btn
                        icon
                        dark
                        @click="pembelian_input = [], inputdata = [], dialog = false"
                        size="small"
                    >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="text-button mt-1">{{ 'DETAIL '+ pageTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-container class="h-100 d-flex flex-column mt-5">
                <!-- EDIT -->
                <v-row no-gutters v-if="edit" justify="center" justify-md="space-between" align="start" min-width="400" class="mx-3">
                    <v-responsive class="pt-2 mx-md-0 mx-3" width="250">
                        <text-field-form label="No Pengiriman" v-model= "dataitem.no_pengiriman" readonly />
                        <text-field-form label="Tgl Pengiriman" :model-value="functions.formatDate(dataitem.tgl_pengiriman)" readonly />
                    </v-responsive>
                    <v-responsive class="pt-2 mx-3" width="250">
                        <text-field-form label="Supir" :model-value="dataitem.supir" readonly />
                        <text-field-form label="No Polisi" :model-value="dataitem.no_polisi" readonly />
                    </v-responsive>
                    <v-responsive class="pt-2 mx-md-0 mx-3" width="250">
                        <text-field-form label="Pelanggan" :model-value="dataitem.namaplg" readonly />
                        <text-field-form v-if="alamatBgkr" label="Tujuan Bongkar" :model-value="dataitem.nama" readonly />
                    </v-responsive>
                </v-row>
                <!-- TAMBAH PENGIRIMAN -->
                <v-form  @submit.prevent ref="form" class="mx-3">
                    <v-row  v-if="!edit" no-gutters justify="center" justify-md="space-between">
                        <v-responsive class="pt-2 mx-md-0 mx-3 overflow-visible" width="250">
                            <text-field-form label="No Pengiriman" v-model= "inputdata.no_pengiriman"/>
                            <datePickerVue label="Tgl Pengiriman" v-model="inputdata.tgl_pengiriman" :rules="required" :tema="tema"/>
                        </v-responsive>
                        <v-responsive class="pt-2 mx-3" width="250">
                            <text-field-form
                                @click="dialog4 = true"
                                label="Pelanggan"
                                v-model="inputdata.nama"
                                :rules="required"
                                readonly
                            >
                            </text-field-form>
                            <text-field-form
                                @click="dialogbongkar = true"
                                label="Tujuan Bongkar"
                                v-model="inputdata.tujuan"
                                :rules="required"
                                readonly
                            >
                            </text-field-form>
                        </v-responsive>
                        <v-responsive class="pt-2 mx-md-0 mx-3" width="250">
                            <text-field-form label="Supir" v-model="inputdata.supir" :rules="required" />
                            <text-field-form label="No Polisi" v-model="inputdata.no_polisi" :rules="required" />
                        </v-responsive>
                    </v-row>
                </v-form>
                <!-- BUTTON TAMBAH BARANG -->
                <v-container v-if="!edit" class="text-sm-left text-center mt-n5 mb-n5">
                    <dialogScroll :window="window" dialog_title="pengeluaran belum terkirim" @reset="reset" :nokirim="inputdata.no_pengiriman" :blmkirim="true" :pjl_blmterkirm="pjl_blmterkirm" :belumkirim="belumkirim" :belumkirim_detail="belumkirim_detail" :barang="barang" :itemDetail="itemDetail" @pemasukanitem="itemmasuk" :pengiriman="true" :penjualan="penjualan" :btn="btn" width="400" />
                </v-container>
                <!-- TABEL EDIT/VIEW -->
                <v-container>
                    <v-data-table
                    :headers="headDetails"
                    :items="edit ? kirim_detail : pembelian_input"
                    :hover="true"
                    :fixed-header="true"
                    density="compact"
                    class="text-caption py-1 rounded-lg border-sm mt-2 h-100"
                    :height="heightSizing"
                >
                <!-- CUSTOM PAGINATION STYLE -->
                <template v-slot:bottom>
                    <v-span v-if="edit" class="float-end me-5 text-caption font-weight-medium">Total Jumlah : {{ functions.numb(jumlahtotal(kirim_detail), 2, true) }}</v-span>
                    <v-span v-if="!edit" class="float-end me-5 text-caption font-weight-medium">Total Jumlah : {{ functions.numb(jumlahtotal(pembelian_input)) }}</v-span>
                </template>
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
                    <dialog-vue v-model="detaildial[index]">
                        <template #titlecard>
                            <v-card-title class="text-center text-orange text-button font-weight-bold">{{ item.raw.nama_barang }}</v-card-title>
                            <v-card-subtitle class="text-caption text-center mb-2 mt-n3">{{ item.raw.hs_code }}</v-card-subtitle>
                        </template>
                        <template #content>
                            <v-sheet class="mx-auto mt-5 w-75">
                                <text-field-form
                                    v-if="edit"
                                    label="Jumlah (Tonase)"
                                    :model-value="functions.numb(item.raw.jumlah)"
                                    active="true"
                                    hide-details
                                    class="mb-3"
                                    readonly
                                />
                                <currency-input
                                    v-if="!edit"
                                    label="Jumlah (Tonase)"
                                    v-model="pembelian_input[index].jumlah"
                                    active="true"
                                    class="mb-3"
                                    :options="{ currency: 'EUR', currencyDisplay: 'hidden'}"
                                />
                                <text-field-form
                                    v-if="edit"
                                    label="Qty"
                                    :model-value="item.raw.jumlah_konversi"
                                    active="true"
                                    hide-details
                                    class="mb-3"
                                    readonly
                                />
                                <currency-input
                                    v-if="!edit"
                                    label="Qty"
                                    v-model="pembelian_input[index].jumlah_konversi"
                                    active="true"
                                    class="mb-3"
                                    :options="{ currency: 'EUR', currencyDisplay: 'hidden'}"
                                />
                                <text-field-form
                                    v-if="edit"
                                    label="Satuan Konversi"
                                    :model-value="item.raw.satuan_konversi"
                                    active="true"
                                    hide-details
                                    class="mb-3"
                                    readonly
                                />
                                <text-field-form
                                    v-if="!edit"
                                    label="Satuan Konversi"
                                    v-model="pembelian_input[index].satuan_konversi"
                                    active="true"
                                    class="mb-3"
                                />
                            </v-sheet>
                            <v-divider class="mt-3 mb-5"></v-divider>
                            <v-div v-if="!edit" class="d-flex me-5 ms-auto">
                                <btn-cancel btn_title="Hapus" @click="deleteditem(item.raw), detaildial[index] = false" class="me-2">Hapus</btn-cancel>
                                <btn-orange btn_title="Simpan" @click="detaildial[index] = false">Simpan</btn-orange>
                            </v-div>
                        </template>
                    </dialog-vue>
                </template>
                    </v-data-table>
                </v-container>
                <v-div v-if="!edit" class="d-flex mb-0 mt-auto me-5 ms-auto">
                    <btn-cancel @click="pembelian_input = [], inputdata = [], dialog=false" btn_title="Batal" class="mb-3" />
                    <btn-orange @click="validate" btn_title="Simpan" class="ms-2 mb-3" />
                </v-div>
                </v-container>
            </v-card>
            <v-dialog v-model="dialog4" transition="dialog-bottom-transition" width="auto">
            <v-card class="py-5 px-7 rounded-xl mx-auto" min-width="300" :width="window < 600 ? '87vw' : '50vw'" height="90vh" max-width="400">
            <v-div>
                <v-btn v-if="window < 500" icon="mdi-close" class="absolute" variant="text" @click="dialog4 = false"></v-btn>
                <v-card-title class="text-center text-orange mb-3 text-button font-weight-bold">PELANGGAN</v-card-title>
                <text-field
                    v-model="searched"
                    label="Search"
                ></text-field>
            </v-div>
            <v-list>
                <v-for v-for="s, i in filtersupplier" :key="i">
                    <v-list-item
                    density="compact"
                    style="cursor: pointer;"
                    class="text-caption"
                    @click="inputdata.kode_pelanggan = s.kode_pelanggan, inputdata.nama = s.nama, dialog4 = false "
                    >
                        {{ s.nama }}
                    </v-list-item>
                </v-for>
            </v-list>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogbongkar" transition="dialog-bottom-transition" width="auto">
            <v-card class="py-5 px-7 rounded-xl mx-auto" min-width="300" height="90vh" max-width="400">
                <v-btn v-if="window < 500" icon="mdi-close" class="absolute" variant="text" @click="dialogbongkar = false"></v-btn>
                <v-card-title class="text-center text-orange mb-3 text-button font-weight-bold">ALAMAT BONGKAR</v-card-title>
                    <v-div>
                        <text-field
                            v-model="searched"
                            label="Search"
                        ></text-field>
                    </v-div>
                    <v-list class="my-4">
                    <v-div class="vh-100">
                        <v-list-item
                        v-for="s, i in filteralamat.slice(0, 15)" :key="i"
                        density="compact"
                        style="cursor: pointer;"
                        class="text-caption"
                        @click="inputdata.kode_alamat_bongkar = s.kode_pelanggan, inputdata.tujuan = s.nama, dialogbongkar = false "
                        >
                            <v-span class="font-weight-medium">{{ s.nama }}</v-span> <br>
                            <v-span class="text-small">
                                {{ s.alamat }} -
                                {{ s.kabupaten }}
                            </v-span>
                            <v-divider></v-divider>
                        </v-list-item>
                    </v-div>
                    </v-list>
            </v-card>
        </v-dialog>
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