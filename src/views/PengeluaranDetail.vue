<script setup>
import functions from '../service/functions';
</script>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import dialogScroll from '../components/dialog/dialogScroll.vue';
import datePickerVue from '../components/datepicker/datePicker.vue';
import BtnInfo from '../components/button/btnInfo.vue';
import textFieldForm from '../components/form/textFieldForm.vue';
import BtnCancel from '../components/button/btnCancel.vue';
import BtnOrange from '../components/button/btnOrange.vue';
import dialogSearch from '../components/dialog/dialogSearch.vue';
import TextField from '../components/form/textField.vue';
import DialogVue from '../components/dialog/dialogVue.vue';
import CurrencyInput from '../components/form/currencyInput.vue';
import pemasukan from '../service/page/pemasukan';
export default {
    components: {
        dialogScroll,
        VDataTable,
        datePickerVue,
        BtnInfo,
        textFieldForm,
        BtnCancel,
        BtnOrange,
        dialogSearch,
        TextField,
        DialogVue,
        CurrencyInput
    },
    props:[ 'tema', 'window', 'windowH', 'hapus', 'pembelianbaru', 'namaPelanggan', 'laporan', 'groupbarang', 'barang', 'batalbtn', 'penjualan', 'pemasukan', 'alamatBongkar', 'namaTujuan', 'datainput', 'pageTitle', 'pengeluaran', 'dokumenpjl', 'namaSupplier', 'pengirimanDetail', 'pembelian', 'pelanggan', 'supplier', 'pembeliandetl', 'edit', 'kirim', 'headers', 'items', 'actIcon', 'icon', 'btncolor', 'search', 'iVariant', 'headDetails', 'details','disable', 'btn', 'datatext', 'itemDetail', 'category'],
    data () {
      return {
        dialog: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialogb: false,
        dialogkodeg: false,
        valid: false,
        detaildial: [],
        arr: [],
        tipe_dokumen: ['BC25', 'BC41'],
        searched: '',
        nama:'',
        namasupplier: '',
        dataitem: this.items,
        nama_supplier : '',
        nama_pelanggan : '',
        tujuan_bongkar: '',
        pembelian_input: '',
        inputdata: this.datainput,
        kurs: '',
        pemasukan_detail: '',
        penjualan_detail : [this.penjualan],
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
                    } else h ='50vh'
                } else if(this.window < 1500) {
                    if(this.windowH > 800) {
                        h = '60vh'
                    } else h ='47vh'
                }
            } else if(!this.edit) {
                if(this.window > 1500) {
                    if(this.windowH > 800) {
                        h = '40vh'
                    } else h ='32vh'
                } else if(this.window < 1500) {
                    if(this.windowH > 800) {
                        h = '40vh'
                    } else h ='32vh'
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
            return this.alamatBongkar.filter(item => {
                    return item.nama.toLowerCase().includes(this.searched.toLowerCase())
                })
            },
        filterkodegroup() {
            let a = []
            for (let i = 0; i < this.groupbarang.length; i++) {
                a.push(this.groupbarang[i].kode_group)
            }
            let b = functions.removeDuplicate(a)
            return b.filter((item) => {
                return item.toLowerCase().includes(this.searched.toLowerCase())
            })
        },
    },
    methods:{
        itemmasuk(v) {
            this.pembelian_input = v
        },
        confirm() {
            this.$emit('confirm', this.dataitem, this.penjualan)
        },
        tipeDokumen (data) {
            this.inputdata.kode_group = data
            let a = ''
            // BC DETECT
            if(data.slice(0, 4) == 'BC23') {
                a = 'BC25'
            }
            if(data.slice(0, 4) == 'BC40') {
                a = 'BC41'
            }
            if(data.slice(0, 9) == 'PPKEK-LDP') {
                a = 'BC25'
            }
            if(data.slice(0, 11) == 'PPKEK-TLDDP') {
                a = 'BC41'
            }
            return this.inputdata.tipe_dokumen = a
        },
        deleteditem(del) {
            for (let i = 0; i < this.pembelian_input.length; i++) {
                if( del == this.pembelian_input[i] ) {
                    this.pembelian_input.splice(i,1);
                }
            }
        },
        jumlahtotal(data, p) {
            let arr = []
            for (let i = 0; i < data.length; i++) {
                if(p == 'jumlah') {
                    arr.push(data[i].jumlah)
                }
                if(p == 'nilai') {
                    arr.push(data[i].jumlah * data[i].harga_jual)
                }
            }
            return arr.reduce((total, current) => {
                return total + current;
            }, 0);
        },
        pilihObjek(s){
            this.inputdata.kode_pelanggan = s.kode_pelanggan
            this.namasupplier = s.nama
            this.dialog4 = false 
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
                        kode_barang: this.pembelian_input[i].kode_barang,
                        nama_barang: this.pembelian_input[i].nama_barang,
                        hs_code: this.pembelian_input[i].hs_code,
                        jumlah: this.pembelian_input[i].jumlah,
                        jumlah_terkirim: this.pembelian_input[i].jumlah_terkirim,
                        satuan: this.pembelian_input[i].satuan,
                        harga_jual: this.pembelian_input[i].harga_jual,
                        total_terjual: this.pembelian_input[i].total_terjual,
                        no_urut: i + 1
                    })
                    
                }
                this.$emit('inputhead', this.inputdata, a)
            }
        },
        
    },
    mounted() {
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
            <btn-info v-if="!edit" icon="mdi-plus" btn_title="Tambah Baru" v-bind="props" />
           <v-menu>
            <template v-slot:activator="{ props }">
                <!-- LIHAT DATA -->
                <v-btn
                id="menu-actions"
                v-if="edit"
                size="small"
                variant="text"
                color="grey-darken-2"
                v-bind="props"
                icon
                >
                <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
                <v-list>
                  <v-list-item class="text-caption" density="compact" v-bind="props" >Lihat Data</v-list-item>
                  <v-list-item v-if="!laporan && hapus" class="text-caption" density="compact" @click="confirm()" >Batal Pengeluaran</v-list-item>
                </v-list>
            </v-menu>
          </template>
          <!-- dialog content -->
            <v-card>
                <v-toolbar class="bg-blue-custom text-white" height="50">
                    <v-btn
                        icon
                        dark
                        @click="inputdata= {}, pembelian_input=[], dialog = false"
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
                        <text-field-form label="No Penjualan" :model-value="items.no_penjualan" readonly />
                        <text-field-form label="Tgl Penjualan" :model-value="functions.formatDate(items.tgl_penjualan)" readonly/>
                    </v-responsive>
                    <v-responsive class="pt-2 mx-3 pt-2" width="250">
                        <text-field-form label="Pelanggan" :model-value="items.nama" readonly />
                        <text-field-form label="Kode Group" :model-value="items.kode_group" readonly />
                    </v-responsive>
                    <v-responsive class="pt-2 mx-md-0 mx-3" width="250">
                        <text-field-form label="Tipe Dokumen" :model-value="items.tipe_dokumen" readonly />
                        <text-field-form label="No Dokumen" :model-value="items.no_dokumen" readonly />
                        <text-field-form label="Tgl Dokumen" :model-value="functions.formatDate(items.tgl_dokumen)" readonly />
                    </v-responsive>
                </v-row>
                <!-- TAMBAH PENGELUARAN -->
                <v-form  @submit.prevent ref="form" class="mx-3">
                <v-row no-gutters v-if="!edit && pengeluaran" justify="center" justify-md="space-between" align="start" min-width="400">
                    <v-responsive class="pt-2 mx-md-0 mx-3 overflow-visible" width="250">
                        <text-field-form label="No Pengeluaran" v-model= "inputdata.no_penjualan" readonly class="bg-grey-lighten-4" />
                        <datePickerVue label="Tgl Keluar" v-model="inputdata.tgl_penjualan" :rules="required" :tema="tema"/>
                    </v-responsive>
                    <v-responsive class="pt-2 mx-3" width="250">
                        <dialogSearch v-if="!edit" :window="window" label="Pelanggan" :objectFilter="pelanggan" @pilihObjek="pilihObjek" cardTitle="PELANGGAN" max-width="400" :rules="required"/>
                        <text-field-form
                        label="Kode Group"
                        @click="dialogkodeg = true"
                        v-model="inputdata.kode_group"
                        readonly
                        :rules="required"
                        />
                    </v-responsive>
                    <v-responsive class="pt-2 mx-md-0 mx-3 overflow-visible" width="250">
                        <text-field-form label="Tipe Dokumen" v-model="inputdata.tipe_dokumen" :rules="required" readonly />                                
                        <!-- <v-menu activator="#tipe" class="elevation-0">
                            <v-list>
                              <v-list-item
                                v-for="(item, index) in tipe_dokumen"
                                :key="index"
                                :value="index"
                                density="compact"
                              >
                                <v-list-item-title @click="inputdata.tipe_dokumen = item" class="text-caption">{{ item }}</v-list-item-title>
                              </v-list-item>
                            </v-list>
                        </v-menu> -->
                        <text-field-form label="No Dokumen" v-model="inputdata.no_dokumen" :rules="required" />
                        <datePickerVue label="Tgl Dokumen" v-model="inputdata.tgl_dokumen" :rules="required" :tema="tema"/>
                    </v-responsive>
                </v-row>
                </v-form>
                <!-- BUTTON TAMBAH BARANG -->
                <v-container v-if="!edit" :pembelianbaru="pembelianbaru" :pembeliandetl="pembeliandetl" class="text-sm-left text-center mb-n5">
                    <dialogScroll :window="window" dialog_title="Data Barang" @reset="reset" :pengeluaran="true"  :barang="barang" :itemDetail="itemDetail" @pemasukanitem="itemmasuk" :btn="btn" width="400" />
                </v-container>
                <!-- TABEL EDIT/VIEW -->
                <v-container>
                    <v-data-table
                        :headers="headDetails"
                        :items="edit ? penjualan : pembelian_input"
                        :hover="true"
                        :fixed-header="true"
                        density="compact"
                        class="text-caption py-1 mt-2 px-5 border-sm rounded-lg h-100"
                        :height="heightSizing"
                    >
                    <!-- CUSTOM PAGINATION STYLE -->
                    <template v-slot:bottom>
                        <v-span v-if="edit" class="float-end me-5 text-caption font-weight-medium">Total Jumlah : {{ functions.numb(pemasukan.sum(penjualan)) }} / Total harga: {{ functions.numb(jumlahtotal(penjualan, 'nilai'), 2, true) }}</v-span>
                        <v-span v-if="!edit" class="float-end me-5 text-caption font-weight-medium">Total Jumlah : {{ functions.numb(jumlahtotal(pembelian_input, 'jumlah')) }} / Total harga: {{ functions.numb(jumlahtotal(pembelian_input, 'nilai'), 2, true) }}</v-span>
                    </template>
                    <!-- dialog actions -->
                    <!-- CUSTOM KOLOM -->
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.jumlah="{item}">
                        {{functions.numb(item.raw.jumlah)}}
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.jumlah_terkirim="{item}">
                        {{functions.numb(item.raw.jumlah_terkirim)}}
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.harga_jual="{item}">
                        {{functions.numb(item.raw.harga_jual, 2, true)}}
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.total_terjual="{item, index}">
                        <v-if v-if="edit">
                            {{ functions.numb(item.raw.jumlah * item.raw.harga_jual, 2, true) }}
                        </v-if>
                        <v-if v-if="!edit">
                            {{ functions.numb(pembelian_input[index].jumlah * pembelian_input[index].harga_jual, 2, true) }}
                        </v-if>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.tipe_dokumen>
                        {{ dokumenpjl.tipe_dokumen }}
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.no_dokumen>
                        {{ dokumenpjl.no_dokumen }}
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.actions="{ item, index }">
                        <dialog-vue v-model="detaildial[index]">
                            <template #titlecard>
                                <v-card-title class="text-center text-orange text-button font-weight-bold">{{ item.raw.nama_barang }}</v-card-title>
                                <v-card-subtitle class="text-caption text-center mb-2 mt-n3">{{ item.raw.hs_code }}</v-card-subtitle>
                            </template>
                            <template #content>
                                <v-div class="mx-auto mt-5 w-75">
                                <text-field-form
                                    v-if="edit"
                                    label="Jumlah"
                                    :model-value="functions.numb(item.raw.jumlah)"
                                    active="true"
                                    readonly
                                    hide-details
                                    class="mb-3"
                                />
                                <currency-input
                                    v-if="!edit"
                                    label="Jumlah"
                                    v-model="pembelian_input[index].jumlah"
                                    active="true"
                                    hide-details
                                    class="mb-3"
                                    :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                                />
                                <text-field-form
                                    v-if="edit"
                                    label="Harga"
                                    :model-value="functions.numb(item.raw.harga_jual, 2, true)"
                                    readonly
                                    hide-details
                                    class="mb-3"
                                />
                                <currency-input
                                    v-if="!edit"
                                    label="Harga"
                                    v-model="pembelian_input[index].harga_jual"
                                    hide-details
                                    class="mb-3"
                                    :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                                />
                                <text-field-form
                                    label="Total Harga"
                                    :model-value="edit ? functions.numb(item.raw.harga_jual * item.raw.jumlah) : pembelian_input[index].harga_jual * pembelian_input[index].jumlah"
                                    readonly
                                    hide-details
                                    class="mb-3"
                                />
                                </v-div>
                                <v-divider class="mb-5"></v-divider>
                                <v-div v-if="!edit" class="d-flex me-5 ms-auto">
                                    <btn-cancel btn_title="Hapus" @click="deleteditem(item.raw), detaildial[index] = false" :hidden="disable" class="me-2">Hapus</btn-cancel>
                                    <btn-orange btn_title="Simpan" :hidden="disable" @click="detaildial[index] = false">Simpan</btn-orange>
                                </v-div>
                            </template>
                        </dialog-vue>
                    </template>
                    </v-data-table>
                </v-container>
                <v-div class="d-flex mb-0 mt-auto me-5 ms-auto">
                    <btn-cancel v-if="!edit" @click="dialog = false, inputdata= {}, pembelian_input=[]" btn_title="Batal" class="mb-3"/>
                    <btn-orange v-if="!edit" @click="validate" :hidden="disable" btn_title="Simpan" class="ms-2 mb-3" />
                </v-div>
            </v-container>
        </v-card>
        <v-dialog v-model="dialogkodeg" transition="dialog-bottom-transition" width="auto">
            <v-card class="py-5 px-7 rounded-xl mx-auto" min-width="300" :width="window < 600 ? '87vw' : '50vw'" height="90vh" max-width="400">
                <v-btn v-if="window < 500" icon="mdi-close" class="absolute" variant="text" @click="dialogkodeg = false"></v-btn>
                <v-card-title class="text-center text-orange mb-3 text-button font-weight-bold">KODE GROUP</v-card-title>
                <v-div>
                    <text-field v-model="searched" label="Search" class="mb-4"/>
                </v-div>
                <v-list>
                    <v-for v-for="kode, i in filterkodegroup.slice(0, 20)" :key="i">
                        <v-list-item
                        style="cursor: pointer;"
                        class="text-caption"
                        density="compact"
                        @click="tipeDokumen(kode), dialogkodeg = false "
                        >
                            {{ kode }}
                        </v-list-item>
                    </v-for>
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