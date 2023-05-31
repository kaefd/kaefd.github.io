<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import DialogCard2 from './DialogCard2.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import api from '../api';

</script>

<script>
export default {
    components: {
    DialogCard2, VDataTable, VueDatePicker
    },
    props:['pembelianbaru', 'namaPelanggan', 'groupbarang', 'batalbtn', 'pemasukan', 'alamatBongkar', 'namaTujuan', 'datainput', 'pageTitle', 'pengeluaran', 'dokumenpjl', 'namaSupplier', 'pengirimanDetail', 'pembelian', 'pelanggan', 'supplier', 'pembeliandetl', 'edit', 'kirim', 'headers', 'items', 'actIcon', 'icon', 'btncolor', 'search', 'iVariant', 'headDetails', 'details','disable', 'btn', 'datatext', 'itemDetail', 'category'],
    data () {
      return {
        dialog: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialogb: false,
        confirmdialog: false,
        dialogkodeg: false,
        valid: false,
        tipe_dokumen: ['BC23', 'BC40'],
        barang: '',
        searched: '',
        namasupplier: '',
        dataitem: this.items,
        nama_supplier : this.namaSupplier,
        nama_pelanggan : this.namaPelanggan,
        tujuan_bongkar: this.namaTujuan,
        pembelian_detail : [this.pembelian],
        pembelian_input: '',
        inputdata: this.datainput,
        kurs: '',
        pemasukan_detail: '',
        penjualan: this.pengeluaran,
        required: [
        value => {
          if (value)  return true

          return 'harus diisi !'
        },
      ],

      }
    },
    
    created() {
        this.pembelian_detail
        this.kirim
        
        api.getData('/barang?status=true')
            .then(response => {
            this.barang = response.data
            })
            .catch(() => {
            window.location.href = '/login'
            })

        if(this.edit) {
            let k = (this.dataitem.kurs / 1).toFixed(3).replace('.', ',')
            this.kurs = k.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
            
    },
    computed: {
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
            return this.groupbarang.filter(item => {
                    return item.kode_group.toLowerCase().includes(this.searched.toLowerCase())
                })
            },
    },
    methods:{
        numb(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        itemmasuk(value) {

            this.pembelian_input = value
        },
        confirm() {
            this.$emit('del', this.dataitem, this.pembelian_detail)
           
        },
        totalharga(v){
                if (this.dataitem.no_penjualan == v ) {
                    return this.numb(this.dataitem.total_penjualan)
                }
                
            
        },
        deleteditem(del) {
            this.$nextTick(() => {
                for (let i = 0; i < this.pembelian_input.length; i++) {
                    if(this.pembelian_input[i] == del) {
                        this.pembelian_input[i] = ''
                }
            }
                
            })
        },
        async validate () {
        const { valid } = await this.$refs.form.validate()

        if (valid){
            
            this.$emit('inputhead', this.inputdata, this.pembelian_input)
        }
      },
        
    },
    
    mounted() {
        
        api.getData
        this.items
        this.dataitem
        this.edit
        this.pengeluaran
        this.namaSupplier
        this.namaPelanggan
        this.pembelian
        this.penjualan
        
        
        
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
            <v-btn
            v-if="!edit"
            v-bind="props"
            class="text-body-2 bg-blue-custom text-white rounded-xl elevation-0 text-caption"
            prepend-icon="mdi-plus"
            height="42"
            >
            Tambah Baru
            </v-btn>

           <!-- LIHAT DATA -->
            <v-btn
            v-if="edit"
            v-bind="props"
            class="text-body-2  rounded-lg"
            :color="btncolor"
            :icon="icon"
            :variant="iVariant"
            height="30"
            width="30"
            >
            </v-btn>
          </template>
          
          <!-- dialog content -->
            <v-card>
                <v-toolbar class="bg-blue-custom text-white">
                <v-btn
                    icon
                    dark
                    @click="this.pembelian_input = [], dialog = false"
                    size="small"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="text-button mt-1">{{ 'DETAIL '+ pageTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>

                <v-container class="mt-5">
                    <!-- EDIT -->
                    <v-row v-if="edit">
                    <v-col>
                        <v-text-field
                            :label="this.penjualan ? 'No Penjualan' : (this.kirim ? 'No Pengiriman' : 'No Pemasukan'  )"
                            :model-value= "this.penjualan ? dataitem.no_penjualan : (this.kirim ? dataitem.no_pengiriman : dataitem.no_pembelian)"
                            variant="outlined"
                            density="compact"
                            style="min-width: 200px; max-width:300px"
                            readonly
                        >
                        </v-text-field>
                        <v-text-field
                            :label="this.penjualan ? 'Tgl Penjualan' : (this.kirim ? 'Tgl Pengiriman' : 'Tgl Pemasukan')"
                            :model-value="this.penjualan ? dataitem.tgl_penjualan : (this.kirim ? dataitem.tgl_pengiriman :  dataitem.tgl_pembelian)"
                            variant="outlined"
                            density="compact"
                            style="min-width: 200px; max-width:300px"
                            readonly
                        >
                        </v-text-field>
                        <v-text-field
                            v-if="!this.penjualan && !this.kirim"
                            label="Nama Supplier"
                            :model-value="nama_supplier"
                            variant="outlined"
                            density="compact"
                            style="min-width: 200px; max-width:300px"
                            readonly
                        >
                        </v-text-field>

                        </v-col>
                        <v-col>
                            <v-text-field
                                v-if="this.kirim"
                                label="Pelanggan"
                                :model-value="kode_pelanggan"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="this.kirim"
                                label="Tujuan Bongkar"
                                :model-value="tujuan_bongkar"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="this.penjualan"
                                label="Kode Group"
                                :model-value="dataitem.kode_group"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="!this.penjualan && !this.kirim"
                                label="Tipe Dokumen"
                                :model-value="dataitem.tipe_dokumen"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="!this.penjualan && !this.kirim "
                                label="No Dokumen"
                                :model-value="dataitem.no_dokumen"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="!this.penjualan && !this.kirim"
                                label="Tgl Dokumen"
                                :model-value="dataitem.tgl_dokumen"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="this.penjualan"
                                label="Tipe Dokumen"
                                :model-value="dataitem.tipe_dokumen"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                        </v-col>
                        <v-col>
                            
                            <v-text-field
                                v-if="this.penjualan"
                                label="No Dokumen"
                                :model-value="dataitem.no_dokumen"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="this.penjualan"
                                label="Tgl Dokumen"
                                :model-value="dataitem.tgl_dokumen"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="!this.penjualan && !this.kirim"
                                label="No Invoice"
                                :model-value="dataitem.no_invoice"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="!this.penjualan && !this.kirim"
                                label="No BL"
                                :model-value="dataitem.no_bl"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="!this.penjualan && !this.kirim"
                                label="Mata Uang"
                                :model-value="dataitem.mata_uang"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="!this.penjualan && !this.kirim"
                                label="Kurs"
                                :model-value="kurs"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <!-- SUPIR -->
                            <v-text-field
                                v-if="this.kirim"
                                label="Supir"
                                :model-value="dataitem.supir"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <!-- NO POLISI -->
                            <v-text-field
                                v-if="this.kirim"
                                label="No Polisi"
                                :model-value="dataitem.no_polisi"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            
                        </v-col>

                    </v-row>
                    <v-form  @submit.prevent ref="form">
                    <!-- TAMBAH PEMASUKAN -->
                        <v-row v-if="!this.edit && this.pemasukan">
                            <!-- PEMASUKAN ITEM -->
                            <v-col>
                                <v-text-field
                                    label="No Pemasukan"
                                    v-model= "inputdata.no_pembelian"
                                    variant="outlined"
                                    density="compact"
                                    class="bg-grey-lighten-4 mb-5 border-0"
                                    style="min-width: 200px; max-width:300px"
                                    hide-details
                                    readonly
                                >
                                </v-text-field>
                                <VueDatePicker
                                    placeholder="Tgl Pemasukan"
                                    v-model="inputdata.tgl_pembelian"
                                    required
                                    :enable-time-picker="false"
                                    style="min-width: 200px; max-width:300px"
                                    class="mb-5"
                                />
                                <!-- SUPPLIER -->
                                <v-dialog v-if="!edit" v-model="dialog4">
                                    <template v-slot:activator="{props}">
                                        <v-text-field
                                            v-bind="props"
                                            label="Supplier"
                                            v-model="namasupplier"
                                            variant="outlined"
                                            density="compact"
                                            style="min-width: 200px; max-width:300px"
                                            class="mb-5"
                                            hide-details
                                            :rules="required"
                                        >
                                    </v-text-field>

                                    </template>
                                    
                                    <v-card class="py-5 px-5 rounded-xl mx-auto" width="400">
                                        <v-btn icon="mdi-close" variant="plain" @click="dialog4 = false"></v-btn>
                                        <v-card-title v-if="!this.kirim" class="text-center text-blue-darken-4 mb-3">SUPPLIER</v-card-title>
                                        <v-card-title v-if="this.kirim" class="text-center text-blue-darken-4 mb-3">PELANGGAN</v-card-title>
                                        <v-text-field
                                            v-model="searched"
                                            append-inner-icon="mdi-magnify"
                                            label="Search"
                                            single-line
                                            hide-details
                                            density="compact"
                                            variant="outlined"
                                            class="mb-4"
                                        ></v-text-field>
                                        <v-list>
                                            <v-for v-for="s, i in filtersupplier" :key="i">
                                                <v-list-item
                                                v-if="!this.kirim"
                                                style="cursor: pointer;"
                                                @click="inputdata.kode_supplier = s.kode_supplier, namasupplier=s.nama, dialog4 = false "
                                                >
                                                    {{ s.nama }}
                                                </v-list-item>
                                                <v-list-item
                                                v-if="this.kirim"
                                                style="cursor: pointer;"
                                                @click="inputdata.kode_pelanggan = s.kode_pelanggan, dialog4 = false "
                                                >
                                                    {{ s.nama }}
                                                </v-list-item>
                                            </v-for>
                                        </v-list>
                                    </v-card>
                                </v-dialog>
                            </v-col>
                            <!-- DOKUMEN -->
                            <v-col>
                                <v-select
                                    label="Tipe Dokumen"
                                    v-model="inputdata.tipe_dokumen"
                                    :items="tipe_dokumen"
                                    :rules="required"
                                    variant="outlined"
                                    density="compact"
                                    class="mb-5"
                                    hide-details
                                    style="min-width: 200px; max-width:300px"
                                >
                                </v-select>
                                <v-text-field
                                    label="No Dokumen"
                                    v-model="inputdata.no_dokumen"
                                    variant="outlined"
                                    density="compact"
                                    class="mb-5"
                                    hide-details
                                    :rules="required"
                                    style="min-width: 200px; max-width:300px"
                                >
                                </v-text-field>
                                <VueDatePicker
                                    placeholder="Tgl Dokumen"
                                    :enable-time-picker="false"
                                    v-model="inputdata.tgl_dokumen"
                                    :rules="required"
                                    style="min-width: 200px; max-width:300px"
                                    class="mb-5"
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    label="No Invoice"
                                    v-model="inputdata.no_invoice"
                                    variant="outlined"
                                    density="compact"
                                    class="mb-5"
                                    hide-details
                                    :rules="required"
                                    style="min-width: 200px; max-width:300px"
                                >
                                </v-text-field>
                                <v-text-field
                                    label="No BL"
                                    v-model="inputdata.no_bl"
                                    variant="outlined"
                                    density="compact"
                                    class="mb-5"
                                    hide-details
                                    :rules="required"
                                    style="min-width: 200px; max-width:300px"
                                >
                                </v-text-field>
                                <v-text-field
                                    label="Mata Uang"
                                    v-model="inputdata.mata_uang"
                                    variant="outlined"
                                    density="compact"
                                    class="mb-5"
                                    hide-details
                                    :rules="required"
                                    style="min-width: 200px; max-width:300px"
                                >
                                </v-text-field>
                                <v-text-field
                                    label="Kurs"
                                    v-model="inputdata.kurs"
                                    variant="outlined"
                                    density="compact"
                                    class="mb-5"
                                    hide-details
                                    :rules="required"
                                    style="min-width: 200px; max-width:300px"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    
                    <!-- TAMBAH PENGELUARAN -->
                    <v-row v-if="!this.edit && this.pengeluaran">
                        <v-col>
                            <v-text-field
                                label="No Pengeluaran"
                                v-model= "inputdata.no_penjualan"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <VueDatePicker
                                placeholder="Tgl Keluar"
                                v-model="inputdata.tgl_penjualan"
                                :enable-time-picker="false"
                                style="min-width: 200px; max-width:300px"
                                class="mb-6"
                            />
                            
                        </v-col>
                        <!-- DOKUMEN -->
                        <v-col>
                        <!-- PELANGGAN -->
                        <v-dialog v-model="dialog4">
                            <template v-slot:activator="{props}">
                                <v-text-field
                                    v-bind="props"
                                    label="Pelanggan"
                                    v-model="inputdata.nama_pelanggan"
                                    variant="outlined"
                                    density="compact"
                                    style="min-width: 200px; max-width:300px"
                                    class="mb-5"
                                    hide-details
                                >
                            </v-text-field>
                            <v-span v-if="valid" class="text-red-darken-3">harus diisi !</v-span>

                            </template>
                            
                            <v-card class="py-5 px-5 rounded-xl mx-auto" width="400">
                                <v-btn icon="mdi-close" variant="plain" @click="dialog4 = false"></v-btn>
                                <v-card-title class="text-center text-blue-darken-4 mb-3">PELANGGAN</v-card-title>
                                <v-text-field
                                    v-model="searched"
                                    append-inner-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                    class="mb-4"
                                ></v-text-field>
                                <v-list>
                                    <v-for v-for="s, i in filtersupplier" :key="i">
                                        <v-list-item
                                        style="cursor: pointer;"
                                        @click="inputdata.nama_pelanggan = s.nama, dialog4 = false "
                                        >
                                            {{ s.nama }}
                                        </v-list-item>
                                    </v-for>
                                </v-list>
                            </v-card>
                        </v-dialog>
                        <!-- KODE GROUP -->
                        <v-dialog v-model="dialogkodeg" >
                            <template v-slot:activator="{ props }">
                                <v-text-field
                                label="Kode Group"
                                v-bind="props"
                                v-model="inputdata.kode_group"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                                >
                            </v-text-field>
                        </template>
                            <v-card class="py-5 px-5 rounded-xl mx-auto" width="400">
                                <v-btn icon="mdi-close" variant="plain" @click="dialogkodeg = false"></v-btn>
                                <v-card-title class="text-center text-blue-darken-4 mb-3">KODE GROUP</v-card-title>
                                <v-text-field
                                    v-model="searched"
                                    append-inner-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                    class="mb-4"
                                ></v-text-field>
                                <v-list>
                                    <v-for v-for="kode, i in filterkodegroup" :key="i">
                                        <v-list-item
                                        style="cursor: pointer;"
                                        @click="inputdata.kode_group = kode.kode_group, dialogkodeg = false "
                                        >
                                            {{ kode.kode_group }}
                                        </v-list-item>
                                    </v-for>
                                </v-list>
                                </v-card>
                        </v-dialog>
                            
                        </v-col>
                        <v-col>
                            <v-select
                                label="Tipe Dokumen"
                                v-model="inputdata.tipe_dokumen"
                                :items="tipe_dokumen"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                            >
                            </v-select>
                            <v-text-field
                                label="No Dokumen"
                                v-model="inputdata.no_dokumen"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                            >
                            </v-text-field>
                            <VueDatePicker
                                placeholder="Tgl Dokumen"
                                :enable-time-picker="false"
                                v-model="inputdata.tgl_dokumen"
                                style="min-width: 200px; max-width:300px"
                                class="mb-6"
                            />

                        </v-col>
                    </v-row>

                        <!-- BUTTON TAMBAH BARANG -->
                    <v-div v-if="!edit" :pembelianbaru="pembelianbaru" :pembeliandetl="pembeliandetl" class="text-sm-left text-center">
                        <DialogCard2 @reset="reset"  :barang="barang" :itemDetail="itemDetail" @pemasukanitem="itemmasuk" :btn="btn" width="400" />
                    </v-div>

                    <!-- TABEL EDIT/VIEW -->
                    <v-data-table
                    :headers="headDetails"
                    :items="this.edit ? pembelian_detail : pembelian_input"
                    :hover="true"
                    :fixed-header="true"
                    density="compact"
                    class="text-caption py-3 px-5"
                    height="150"
                    >
                    <!-- CUSTOM PAGINATION STYLE -->
                    <template v-slot:bottom>
                    </template>
                    <!-- dialog actions -->
                    <!-- CUSTOM KOLOM -->
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-if="this.penjualan == false || this.kirim" v-slot:item.jumlah="{item}">
                        <td>{{numb(item.raw.jumlah)}}</td>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-if="this.penjualan == false" v-slot:item.jumlah_diterima="{item}">
                        <td>{{numb(item.raw.jumlah_diterima)}}</td>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-if="this.penjualan == false" v-slot:item.nilai="{item}">
                        <td>{{numb(item.raw.nilai)}}</td>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-if="this.penjualan" v-slot:item.jumlah_terkirim="{item}">
                        <td>{{numb(item.raw.jumlah_terkirim)}}</td>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-if="this.penjualan" v-slot:item.harga_jual="{item}">
                        <td>{{numb(item.raw.harga_jual)}}</td>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-if="this.penjualan" v-slot:item.total_terjual="{item}">
                        <td>{{totalharga(item.raw.no_penjualan)}}</td>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-if="this.kirim" v-slot:item.tipe_dokumen>
                        <td>{{ dokumenpjl.tipe_dokumen }}</td>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-if="this.kirim" v-slot:item.no_dokumen>
                        <td>{{ dokumenpjl.no_dokumen }}</td>
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.actions="{item}">
                        <v-dialog v-model="dialog2">
                        <!-- button dialog -->
                            <template v-slot:activator="{ props }">
                                <v-btn
                                v-bind="props"
                                class="text-body-2  rounded-lg"
                                :color="actIcon[3].color"
                                :icon="actIcon[3].icon"
                                variant="plain"
                                height="30"
                                width="30">
                                </v-btn>
                            </template>

                            <v-responsive class="bg-white mx-auto px-7 pb-7 pt-5 rounded-xl" width="400">

                                <v-btn @click="dialog2 = false" icon="mdi-close" variant="text"></v-btn>
                                <v-card-title class="text-center mt-n5">{{ item.raw.nama_barang }}</v-card-title>
                                <v-card-subtitle class="text-center mb-2">{{ item.raw.hs_code }}</v-card-subtitle>
                                <v-label>Jumlah</v-label>
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    :value="numb(item.raw.jumlah)"
                                    active="true"
                                    readonly
                                    hide-details
                                    class="mb-1"
                                    >
                                </v-text-field>
                                
                                <v-label v-if="!this.penjualan && !this.kirim">Jumlah diterima</v-label>
                                <v-label v-if="this.penjualan && !this.kirim">Jumlah Terkirim</v-label>
                                <v-text-field
                                    v-if="!this.kirim && !this.edit"
                                    variant="outlined"
                                    density="compact"
                                    :value="this.penjualan ? numb(item.raw.jumlah_terkirim) : numb(item.raw.jumlah_diterima)"
                                    readonly
                                    hide-details
                                    class="mb-1"
                                />
                                <v-label v-if="!this.penjualan && !this.kirim">Nilai</v-label>
                                <v-label v-if="this.penjualan && !this.kirim">Harga Jual</v-label>
                                <v-text-field
                                    v-if="!this.kirim && !this.edit"
                                    variant="outlined"
                                    density="compact"
                                    :value="this.penjualan ? numb(item.raw.harga_jual) : numb(item.raw.nilai)"
                                    readonly
                                    hide-details
                                    class="mb-4"
                                    />
                                <div class="d-flex w-100">
                                    <v-btn @click="deleteditem(item.raw), dialog2 = false" :hidden="disable" variant="tonal" class="text-body-2 btn-custom w-25 rounded-e-0 ">Hapus</v-btn>
                                    <v-btn :hidden="disable" color="blue-darken-4 btn-custom" class="text-body-2 btn-custom bg-blue-darken-4 w-75 rounded-s-0">Simpan</v-btn>
                                </div>
                            </v-responsive>
                        </v-dialog>
                    </template>
                </v-data-table>
                <v-btn v-if="!this.edit" @click="validate" :hidden="disable" class="float-end text-body-2 text-white elevation-0 rounded-xl" height="42" width="150" color="#ff6e40">Simpan</v-btn>
                <v-btn v-if="!this.pengeluaran" @click="dialog=false" class="float-end rounded-xl text-body-2 me-2" height="42" width="150" variant="outlined" color="grey-darken-2">Batal</v-btn>
                <v-btn v-if="edit" @click="confirmdialog = true" size="large" class="float-end text-body-2 me-2" variant="tonal">Batal {{ batalbtn }}</v-btn>
                <v-dialog v-model="confirmdialog" transition="dialog-bottom-transition" width="400">
                    <v-card class="rounded-xl">
                        <v-card-title class="text-center my-7">Apakah Anda Yakin ?</v-card-title>
                        <v-row no-gutters>
                            <v-col>
                                <v-btn
                                color="orange-darken-1"
                                variant="tonal"
                                height="57"
                                class="w-100 rounded-0"
                                @click=" confirmdialog = false"
                                >
                                Tidak
                                </v-btn>                  
                            </v-col>

                            <v-col>
                                <v-btn
                                type="submit"
                                color="blue-darken-1"
                                variant="tonal"
                                height="57"
                                class="w-100 rounded-0"
                                @click=" this.inputdata = [], confirm(), dialog3 = false, dialog= false, confirmdialog = false"
                                >
                                Ya
                                </v-btn>
                            </v-col>
                            </v-row>
                    </v-card>
                </v-dialog>
            </v-form>
                </v-container>
            </v-card>
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