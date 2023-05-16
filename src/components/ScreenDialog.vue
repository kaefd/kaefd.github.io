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
    props:['pembelianbaru', 'namaPelanggan', 'batalbtn', 'alamatBongkar', 'namaTujuan', 'pageTitle', 'pengeluaran', 'dokumenpjl', 'datainput', 'namaSupplier', 'pengirimanDetail', 'pembelian', 'supplier', 'pembeliandetl', 'edit', 'kirim', 'headers', 'items', 'actIcon', 'icon', 'btncolor', 'search', 'iVariant', 'headDetails', 'details','disable', 'btn', 'datatext', 'itemDetail', 'category'],
    data () {
      return {
        dialog: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialogb: false,
        confirmdialog: false,
        valid: false,
        tipe_dokumen: ['BC23', 'BC40'],
        barang: '',
        searched: '',
        dataitem: this.items,
        nama_supplier : this.namaSupplier,
        nama_pelanggan : this.namaPelanggan,
        tujuan_bongkar: this.namaTujuan,
        pembelian_detail : [this.pembelian],
        pembelian_input: '',
        inputdata: [this.datainput],
        kurs: '',
        pemasukan_detail: '',
        penjualan: this.pengeluaran

      }
    },
    
    created() {
        this.inputdata
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
            return this.confirmdialog = true
        },
        
    },
    
    mounted() {
        api.getData
        this.items
        this.edit
        this.pengeluaran
        this.namaSupplier
        this.namaPelanggan
        this.pembelian
        this.penjualan
        this.pembelian_detail
        this.inputdata
        
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
            <!-- TAMBAH DATA -->
            <v-btn
            v-if="!edit"
            v-bind="props"
            class="text-body-2  rounded-lg"
            :color="btncolor"
            :icon="icon"
            :variant="iVariant"
            size="small"
            >
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
                {{ inputdata }}
                <v-toolbar class="bg-blue-darken-4">
                <v-btn
                    icon
                    dark
                    @click="this.pembelian_input = [], dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ 'DETAIL '+ pageTitle }}</v-toolbar-title>
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
                                :model-value="nama_pelanggan"
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
                    <!-- TAMBAH -->
                    <v-row v-if="!edit">
                        <v-col>
                            <v-text-field
                                :label="this.penjualan ? 'No Penjualan' : (this.kirim ? 'No Pengiriman' : 'No Pemasukan'  )"
                                :model-value= "this.penjualan ? inputdata.no_penjualan : (this.kirim ? inputdata.no_pengiriman : inputdata.no_pembelian)"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                            </v-text-field>
                            <VueDatePicker
                                :placeholder="this.penjualan ? 'Tgl Penjualan' : (this.kirim ? 'Tgl Pengiriman' : 'Tgl Pemasukan'  )"
                                :model-value="this.penjualan ? inputdata.tgl_penjualan : (this.kirim ? inputdata.tgl_pengiriman : inputdata.tgl_pembelian  )"
                                :enable-time-picker="false"
                                style="min-width: 200px; max-width:300px"
                                class="mb-6"
                            />
                            
                        </v-col>
                        <v-col>
                            <v-dialog v-if="!edit" v-model="dialog4">
                                <template v-slot:activator="{props}">
                                    <v-text-field
                                        v-bind="props"
                                        :label="this.kirim ? 'Pelanggan' : 'Supplier'"
                                        :model-value="this.kirim ? inputdata.nama_pelanggan : inputdata.nama_supplier"
                                        variant="outlined"
                                        density="compact"
                                        style="min-width: 200px; max-width:300px"
                                        class="mb-5"
                                        hide-details
                                        readonly
                                    >
                                </v-text-field>
                                <v-span v-if="valid" class="text-red-darken-3">harus diisi !</v-span>

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
                                            @click="inputdata.nama_supplier = s.nama, dialog4 = false "
                                            >
                                                {{ s.nama }}
                                            </v-list-item>
                                            <v-list-item
                                            v-if="this.kirim"
                                            style="cursor: pointer;"
                                            @click="inputdata.nama_pelanggan = s.nama, dialog4 = false "
                                            >
                                                {{ s.nama }}
                                            </v-list-item>
                                        </v-for>
                                    </v-list>
                                </v-card>
                            </v-dialog>
                            
                            <v-dialog v-if="!edit && this.kirim" v-model="dialogb">
                                <template v-slot:activator="{props}">
                                    <v-text-field
                                        v-bind="props"
                                        label="Tujuan Bongkar"
                                        v-model="inputdata.tujuan_bongkar"
                                        variant="outlined"
                                        density="compact"
                                        style="min-width: 200px; max-width:300px"
                                        hide-details
                                        readonly
                                    >
                                    </v-text-field>
                                    <v-span v-if="valid" class="text-red-darken-3">harus diisi !</v-span>
                                </template>
                                <v-card class="py-5 px-5 rounded-xl mx-auto" width="400">
                                    <v-btn icon="mdi-close" variant="plain" @click="dialogb = false"></v-btn>
                                    <v-card-title class="text-center text-blue-darken-4 mb-3">TUJUAN BONGKAR</v-card-title>
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
                                        <v-for v-for="s, i in filteralamat" :key="i">
                                            <v-list-item
                                            style="cursor: pointer;"
                                            @click="inputdata.tujuan_bongkar = s.nama, dialogb = false "
                                            >
                                                {{ s.nama }}
                                            </v-list-item>
                                        </v-for>
                                    </v-list>
                                </v-card>
                                
                            </v-dialog>
                            <v-select
                                v-if="!this.kirim"
                                label="Tipe Dokumen"
                                v-model="inputdata.tipe_dokumen"
                                :items="tipe_dokumen"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                            >
                            </v-select>
                            <v-text-field
                                v-if="!this.kirim"
                                label="No Dokumen"
                                v-model="inputdata.no_dokumen"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                            >
                            </v-text-field>
                            <VueDatePicker
                                v-if="!this.kirim"
                                placeholder="Tgl Dokumen"
                                :enable-time-picker="false"
                                v-model="inputdata.tgl_dokumen"
                                style="min-width: 200px; max-width:300px"
                                class="mb-6"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-if="!this.kirim"
                                label="No Invoice"
                                v-model="inputdata.no_invoice"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="!this.kirim"
                                label="No BL"
                                v-model="inputdata.no_bl"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="!this.kirim"
                                label="Mata Uang"
                                v-model="inputdata.mata_uang"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                            >
                            </v-text-field>
                            <v-text-field
                                v-if="!this.kirim"
                                label="Kurs"
                                v-model="inputdata.kurs"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                            >
                            </v-text-field>
                            
                        </v-col>

                    </v-row>

                        <!-- BUTTON TAMBAH BARANG -->
                    <v-div v-if="!edit" :pembelianbaru="pembelianbaru" :pembeliandetl="pembeliandetl" class="text-sm-left text-center">
                        <DialogCard2 @reset="reset"  :barang="barang" :itemDetail="itemDetail" @pemasukanitem="itemmasuk" :btn="btn" width="400" />
                    </v-div>

                <!-- VIEW / EDIT BARANG TAMBAH -->
                <v-dialog
                    v-model="dialog3"
                    width="auto"
                >
                    <v-card class="px-7 py-5 mx-auto rounded-lg" width="400">
                        
                        <v-card-title class="text-center">{{ dialItem.name }}</v-card-title>
                        <v-card-text>{{ dialItem.code }}</v-card-text>
                        <v-text-field
                            label="Jumlah"
                            variant="outlined"
                            density="compact"
                            :disabled="hiddenbtn"
                        />
                        <v-text-field
                            label="Jumlah Diterima"
                            variant="outlined"
                            density="compact"
                            :disabled="hiddenbtn"
                        />
                        <v-text-field
                            label="Nilai Total"
                            variant="outlined"
                            density="compact"
                            :disabled="hiddenbtn"
                        />
                        <v-btn variant="outlined" size="large" class="text-body-1 mb-2">Simpan</v-btn>
                        <v-btn @click="dialog2 = false" variant="outlined" size="large" class="text-body-1">Batal</v-btn>
                    </v-card>
                </v-dialog>

                    <!-- TABEL EDIT/VIEW -->
                    <v-data-table
                    :headers="headDetails"
                    :items="this.edit ? pembelian_detail : pembelian_input"
                    :hover="true"
                    :fixed-header="true"
                    density="compact"
                    class="text-caption py-3 px-5"
                    height="300"
                    >
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
                                    v-if="!this.kirim"
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
                                    v-if="!this.kirim"
                                    variant="outlined"
                                    density="compact"
                                    :value="this.penjualan ? numb(item.raw.harga_jual) : numb(item.raw.nilai)"
                                    readonly
                                    hide-details
                                    class="mb-4"
                                    />
                                <div class="d-flex w-100">
                                    <v-btn @click="this.pembelian_input = [], dialog2 = false" :hidden="disable" variant="tonal" class="text-body-2 btn-custom w-25 rounded-e-0 ">Hapus</v-btn>
                                    <v-btn :hidden="disable" color="blue-darken-4 btn-custom" class="text-body-2 btn-custom bg-blue-darken-4 w-75 rounded-s-0">Simpan</v-btn>
                                </div>
                            </v-responsive>
                        </v-dialog>
                    </template>
                </v-data-table>
                <v-btn v-if="!this.edit" :hidden="disable" class="float-end text-body-2 text-white btn-custom" color="#ff6e40">Simpan</v-btn>
                <v-btn v-if="!this.edit" @click="dialog=false" class="float-end text-body-2 me-2 btn-custom" variant="tonal">Batal</v-btn>
                <v-btn @click="confirm()" size="large" class="float-end text-body-2 me-2" variant="tonal">Batal {{ batalbtn }}</v-btn>
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

                            <v-col :hidden="disabled">
                                <v-btn
                                type="submit"
                                color="blue-darken-1"
                                variant="tonal"
                                height="57"
                                class="w-100 rounded-0"
                                >
                                Ya
                                </v-btn>
                            </v-col>
                            </v-row>
                    </v-card>
                </v-dialog>
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