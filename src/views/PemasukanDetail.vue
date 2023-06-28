<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import DialogCard2 from '../components/DialogCard2.vue';
import api from '../service/api';
import functions from '../service/functions';
import { id } from 'date-fns/locale';
import datePickerVue from '../components/datepicker/datePicker.vue';

</script>

<script>

export default {
    components: {
    DialogCard2, VDataTable, datePickerVue
    },
    props:['pembelianbaru', 'laporan', 'namaPelanggan', 'total', 'groupbarang', 'batalbtn', 'penjualan', 'pemasukan', 'alamatBongkar', 'totalpenjualan', 'namaTujuan', 'datainput', 'pageTitle', 'pengeluaran', 'dokumenpjl', 'namaSupplier', 'pengirimanDetail', 'pembelian', 'pelanggan', 'supplier', 'pembeliandetl', 'edit', 'kirim', 'headers', 'items', 'actIcon', 'icon', 'btncolor', 'search', 'iVariant', 'headDetails', 'details','disable', 'btn', 'datatext', 'itemDetail', 'category'],
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
        tipe_dokumen: ['BC23', 'BC40', 'PPKEK-LDP', 'PPKEK-TDDP'],
        searched: '',
        barang: '',
        namasupplier: '',
        dataitem: this.items,
        nama_supplier : '',
        nama_pelanggan : '',
        tujuan_bongkar: '',
        pembelian_input: '',
        inputdata: this.datainput,
        kurs: '',
        pemasukan_detail: '',
        pembelian_detail : [this.pembelian],
        required: [
        value => {
          if (value)  return true

          return 'harus diisi !'
        },
      ],

      }
    },
    
    created() {
        api.getData('/barang?status=true')
            .then(response => {
            this.barang = response.data
            })
            .catch(() => {
            return this.$router.push('login');
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
        itemmasuk(value) {
            this.pembelian_input = value
        },
        confirm() {
            this.$emit('confirm', this.dataitem, this.pembelian)
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
        async validate () {
            const { valid } = await this.$refs.form.validate()
            if (valid){
                // inputata = head
                // pembelian_input = detail
                this.$emit('inputhead', this.inputdata, this.pembelian_input)
            }
        },
        
    },
    
    mounted() {
        this.detail
        this.edit
        api.getData
        // this.items
        // this.pemasukan
        // this.pengeluaran
        this.dataitem
        this.pembelian
        // this.penjualan
        this.$nextTick(() => {
            this.nama_supplier = this.namaSupplier,
            this.nama_pelanggan=  this.namaPelanggan,
            this.tujuan_bongkar= this.namaTujuan
        });
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
                <v-icon>{{ icon }}</v-icon>
                </v-btn>
            </template>
                <v-list>
                  <v-list-item class="text-caption" density="compact" v-bind="props" >Lihat Data</v-list-item>
                  <v-list-item v-if="!laporan" class="text-caption" density="compact" @click="confirm()" >Batal Pemasukan</v-list-item>
                </v-list>
            </v-menu>
          </template>
          <!-- dialog content -->
            <v-card>
                <v-toolbar class="bg-blue-custom text-white" height="50">
                    <v-btn
                        icon
                        dark
                        @click="pembelian_input = [], inputdata = [],  dialog = false"
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
                        label="No Pemasukan"
                        :model-value="items.no_pembelian"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    <v-text-field
                        label="Tgl Pemasukan"
                        :model-value="items.tgl_pembelian"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    <v-text-field
                        label="Nama Supplier"
                        :model-value="items.kode_supplier"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                        label="Tipe Dokumen"
                        :model-value="items.tipe_dokumen"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    <v-text-field
                        label="No Dokumen"
                        :model-value="items.no_dokumen"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    <v-text-field
                        label="Tgl Dokumen"
                        :model-value="items.tgl_dokumen"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    </v-col>
                    <v-col>
                    <v-text-field
                        label="No Invoice"
                        :model-value="items.no_invoice"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    <v-text-field
                        label="No BL"
                        :model-value="items.no_bl"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    <v-text-field
                        label="Mata Uang"
                        :model-value="items.mata_uang"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    <v-text-field
                        label="Kurs"
                        :model-value="functions.numb(items.kurs)"
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
                    <v-row v-if="!edit && pemasukan">
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
                                    disabled
                                >
                                </v-text-field>
                                <datePickerVue
                                    placeholder="Tgl Pemasukan"
                                    v-model="inputdata.tgl_pembelian"
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
                                    
                                    <v-card class="py-5 px-5 rounded-xl mx-auto w-100" max-width="400">
                                        <v-btn icon="mdi-close" size="small" variant="plain" @click="dialog4 = false"></v-btn>
                                        <v-card-title class="text-center text-blue-darken-4 mb-3 mt-n10 text-button font-weight-bold">SUPPLIER</v-card-title>
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
                                                class="text-caption"
                                                density="compact"
                                                @click="inputdata.kode_supplier = s.kode_supplier, namasupplier=s.nama, dialog4 = false "
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
                                <v-text-field
                                    id="tipe"
                                    label="Tipe Dokumen"
                                    v-model="inputdata.tipe_dokumen"
                                    :rules="required"
                                    variant="outlined"
                                    density="compact"
                                    class="mb-5"
                                    hide-details
                                    readonly
                                    style="min-width: 200px; max-width:300px"
                                >                                
                                </v-text-field>
                                <v-menu activator="#tipe" class="elevation-0">
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
                                  </v-menu>
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
                                    class="text-small mb-5"
                                    height="20"
                                    :clearable="false"
                                    placeholder="Tgl Dokumen"
                                    v-model="inputdata.tgl_dokumen"
                                    style="min-width: 200px; max-width:300px"
                                    :format-locale="id"
                                    :rules="required"
                                    locale="id"
                                    cancelText="batal"
                                    selectText="pilih"
                                    format="PP"
                                    color="grey"
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
                    <!-- BUTTON TAMBAH BARANG -->
                    <v-div v-if="!edit" :pembelianbaru="pembelianbaru" :pembeliandetl="pembeliandetl" class="text-sm-left text-center">
                        <DialogCard2 @reset="reset"  :barang="barang" :itemDetail="itemDetail" @pemasukanitem="itemmasuk" :pemasukan="true" :btn="btn" width="400" />
                    </v-div>
                    <!-- TABEL EDIT/VIEW -->
                    <v-data-table
                    :headers="headDetails"
                    :items="edit ? pembelian : pembelian_input"
                    :hover="true"
                    :fixed-header="true"
                    density="compact"
                    class="text-caption my-7 px-5"
                    :height="edit ? 200 : 150"
                    >
                    <!-- CUSTOM PAGINATION STYLE -->
                    <template v-slot:bottom>
                        <v-span v-if="laporan && edit" class="float-end me-5 text-caption font-weight-bold">Jumlah : {{ total }}</v-span>
                        <v-span v-if="!laporan && edit" class="float-end me-5 text-caption font-weight-bold">Jumlah : {{ functions.numb(pembelian[0].nilai) }}</v-span>
                    </template>
                    <!-- dialog actions -->
                    <!-- CUSTOM KOLOM -->
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.jumlah="{item}">
                        {{functions.numb(item.raw.jumlah)}}
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.jumlah_diterima="{item}">
                        {{functions.numb(item.raw.jumlah_diterima)}}
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.nilai="{item}">
                        {{functions.numb(item.raw.nilai)}}
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
                        <v-dialog v-model="detaildial[index]">
                        <!-- button dialog -->
                            <template v-slot:activator="{ props }">
                                <v-btn
                                v-bind="props"
                                size="small"
                                variant="text"
                                color="grey-darken-2"
                                icon
                                >
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-responsive class="bg-white mx-auto px-7 pb-7 pt-5 rounded-xl" width="400">
                                <v-btn @click="detaildial[index] = false" icon="mdi-close" variant="text" size="small"></v-btn>
                                <v-card-title class="text-center text-button font-weight-bold mt-n5">{{ item.raw.nama_barang }}</v-card-title>
                                <v-card-subtitle class="text-caption text-center mb-2 mt-n3">{{ item.raw.hs_code }}</v-card-subtitle>
                                <v-label>Jumlah</v-label>
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    :value="functions.numb(item.raw.jumlah)"
                                    active="true"
                                    readonly
                                    hide-details
                                    class="mb-1"
                                >
                                </v-text-field>
                                <v-label>Jumlah diterima</v-label>
                                <v-text-field
                                    :value="functions.numb(item.raw.jumlah)"
                                    variant="outlined"
                                    density="compact"
                                    readonly
                                    hide-details
                                    class="mb-1"
                                />
                                <v-label>Total Nilai</v-label>
                                <v-text-field
                                    :value="functions.numb(item.raw.nilai)"
                                    variant="outlined"
                                    density="compact"
                                    readonly
                                    hide-details
                                    class="mb-1"
                                />
                                <v-div v-if="!edit" class="d-flex w-100">
                                    <v-btn @click="deleteditem(item.raw), detaildial[index] = false" :hidden="disable" variant="tonal" class="text-caption rounded-xl elevation-0 w-25">Hapus</v-btn>
                                    <v-btn :hidden="disable" color="blue-darken-4" class="text-caption rounded-xl elevation-0 bg-blue-darken-4 w-75">Simpan</v-btn>
                                </v-div>
                            </v-responsive>
                        </v-dialog>
                    </template>
                    </v-data-table>
                <v-btn v-if="!edit" @click="validate" :hidden="disable" class="float-end text-body-2 text-white elevation-0 rounded-xl" height="42" width="150" color="#ff6e40">Simpan</v-btn>
                <v-btn v-if="!edit" @click="dialog=false" class="float-end rounded-xl text-body-2 me-2" height="42" width="150" variant="outlined" color="grey-darken-2">Batal</v-btn>
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