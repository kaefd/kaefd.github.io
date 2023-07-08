<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import dialogScroll from '../components/dialog/dialogScroll.vue';
import api from '../service/api';
import functions from '../service/functions';
import datePicker from '../components/datepicker/datePicker.vue';
import textButton from '../components/button/textButton.vue';
import textFieldForm from '../components/form/textFieldForm.vue';
import dialogSearch from '../components/dialog/dialogSearch.vue';
import menuForm from '../components/menu/menuForm.vue';
import menuList from '../components/menu/menuList.vue';
import pillsButton from '../components/button/pillsButton.vue';
import BtnCancel from '../components/button/btnCancel.vue';
import BtnOrange from '../components/button/btnOrange.vue';
</script>

<script>
export default {
    components: {
        dialogScroll,
        VDataTable,
        datePicker,
        textButton,
        textFieldForm,
        dialogSearch,
        menuForm,
        menuList,
        pillsButton,
        BtnCancel,
        BtnOrange,
    },
    props:['pembelianbaru', 'laporan', 'namaPelanggan', 'total', 'groupbarang', 'batalbtn', 'penjualan', 'pemasukan', 'alamatBongkar', 'totalpenjualan', 'namaTujuan', 'datainput', 'pageTitle', 'pengeluaran', 'dokumenpjl', 'namaSupplier', 'pengirimanDetail', 'pembelian', 'pelanggan', 'supplier', 'pembeliandetl', 'edit', 'kirim', 'headers', 'items',  'search', 'iVariant', 'headDetails', 'details','disable', 'btn', 'datatext', 'itemDetail', 'category'],
    data () {
      return {
        dialog: false,
        dialog1: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialogb: false,
        dialogkodeg: false,
        valid: false,
        detaildial: [],
        arr: [],
        tipe_dokumen: [
            {title: 'BC23', key: 'BC23'},
            {title: 'BC40', key: 'BC40'},
            {title: 'PPKEK dari LDP', key: 'PPKEK-LDP'},
            {title: 'PPKEK dari TDDP', key: 'PPKEK-TDDP'}
        ],
        list: [
            {title: 'Lihat Data', key: 'lihat'},
            {title: 'Batal Pemasukan', key: 'batal'},
        ],
        item: '',
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
        validated: '',
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
    methods:{
        itemmasuk(v){
            this.pembelian_input = v
        },
        menuAksi(v) {
            v == 'lihat' ? this.dialog = true : this.confirm()
        },
        confirm() {
            this.$emit('confirm', this.dataitem, this.pembelian)
        },
        pilihObjek(s){
            this.inputdata.kode_supplier = s.kode_supplier
            this.namasupplier = s.nama
            this.dialog4 = false 
        },
        pilihStok(s) {
            this.item = s
            this.dialog2 = true
        },
        pilihtipedokumen(v){
            return this.inputdata.tipe_dokumen = v
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
                this.validated = true
                this.$emit('inputhead', this.inputdata, this.pembelian_input)
            } else this.validated = false
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
            <pillsButton v-if="!edit" v-bind="props" icon="mdi-plus" btn_title="Tambah Baru"/>
            <menuList
                v-if="edit"
                :submenu="true"
                icon="mdi-dots-vertical"
                :items="list"
                @result="menuAksi"
            />
          </template>
          <!-- dialog content -->
            <v-card>
                <v-toolbar class="bg-blue-custom text-white" height="50">
                <textButton icon="mdi-close" @click="pembelian_input = [], inputdata = [],  dialog = false" :color="white"/>
                <v-toolbar-title class="text-button mt-1">{{ 'DETAIL '+ pageTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-container class="h-100">
                <!-- EDIT -->
                <v-row justify="center" justify-md="space-between" align="start" class="pt-7" v-if="edit">
                    <textFieldForm label="No Pemasukan" :model-value="items.no_pembelian" readonly/>
                    <textFieldForm label="Tgl Pemasukan" :model-value="functions.formatDate(items.tgl_pembelian)" readonly/>
                    <textFieldForm label="Nama Supplier" :model-value="items.kode_supplier" readonly/>
                    <textFieldForm label="Tipe Dokumen" :model-value="items.tipe_dokumen" readonly/>
                    <textFieldForm label="No Dokumen" :model-value="items.no_dokumen" readonly/>
                    <textFieldForm label="Tgl Dokumen" :model-value="items.tgl_dokumen" readonly/>
                    <textFieldForm label="No Invoice" :model-value="items.no_invoice" readonly/>
                    <textFieldForm label="No BL" :model-value="items.no_bl" readonly/>
                    <textFieldForm label="Mata Uang" :model-value="items.mata_uang" readonly/>
                    <textFieldForm label="Kurs" :model-value="functions.numb(items.kurs)" readonly required/>
                </v-row>
                <!-- TAMBAH PEMASUKAN -->
                <v-form class="pt-7" v-if="!edit && pemasukan"  @submit.prevent ref="form">
                    <v-row justify="center" justify-md="space-between">
                        <textFieldForm label="No Pemasukan" v-model="inputdata.no_pembelian" :disabled="true" />
                        <datePicker placeholder="Tgl Pemasukan" v-model="inputdata.tgl_pembelian" :class="validated === false ? 'false' : ''" :validated="validated"/>
                        <dialogSearch v-if="!edit" label="Supplier" :objectFilter="supplier" @pilihObjek="pilihObjek" cardTitle="SUPPLIER" max-width="400" :rules="required"/>
                        <!-- DOKUMEN -->
                        <textFieldForm id="tipe" label="Tipe Dokumen" :model-value="inputdata.tipe_dokumen" readonly :rules="required" />
                        <menuForm
                          activator="#tipe"
                          icon="mdi-dots-vertical"
                          :items="tipe_dokumen"
                          @result="pilihtipedokumen" />
                        <textFieldForm label="No Dokumen" v-model="inputdata.no_dokumen" required :rules="required" />
                        <datePicker placeholder="Tgl Dokumen" v-model="inputdata.tgl_dokumen" :class="validated === false ? 'false' : ''" :validated="validated" />
                        <textFieldForm label="No Invoice" v-model="inputdata.no_invoice" :rules="required" />
                        <textFieldForm label="No BL" v-model="inputdata.no_bl" :rules="required" />
                        <textFieldForm label="Mata Uang" v-model="inputdata.mata_uang" :rules="required" />
                        <textFieldForm type="number" label="Kurs" v-model="inputdata.kurs" :rules="required" />
                    </v-row>
                </v-form>
                <!-- BUTTON TAMBAH BARANG -->
                <!-- <v-div v-if="!edit" :pembelianbaru="pembelianbaru" :pembeliandetl="pembeliandetl" class="text-sm-left text-center">
                    <dialogScroll @reset="reset"  :barang="barang" :itemDetail="itemDetail" @pemasukanitem="itemmasuk" :masuk="true" :btn="btn" width="400" /> -->
                    <!-- <dialogSearch :button="true" btn_title="Tambah Barang" v-model="dialog1" :objectFilter="barang" cardTitle="STOK BARANG" @pilihObjek="pilihStok">
                        <template #close>
                            <textButton icon="mdi-close" @click="dialog1 = false" />
                        </template>
                    </dialogSearch>
                    <dialogForm v-model="dialog2" :item="item" @pemasukanItem="pemasukanItem" /> -->
                <!-- </v-div> -->
                <!-- BUTTON TAMBAH BARANG -->
                <v-div v-if="!edit" :pembelianbaru="pembelianbaru" :pembeliandetl="pembeliandetl" class="text-sm-left text-center">
                    <dialogScroll @reset="reset"  :barang="barang" :itemDetail="itemDetail" @pemasukanitem="itemmasuk" :pemasukan="true" :btn="btn" max-width="400" />
                </v-div>
                <v-row style="height: 60%;">
                    <!-- TABEL EDIT/VIEW -->
                    <v-data-table
                        :headers="headDetails"
                        :items="edit ? pembelian : pembelian_input"
                        :hover="true"
                        :fixed-header="true"
                        density="compact"
                        class="text-caption py-7 px-5 h-80"
                    >
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
                            <v-card class="bg-white mx-auto py-5 rounded-xl" width="370">
                                <v-card-title class="text-center text-button font-weight-bold">{{ item.raw.nama_barang }}</v-card-title>
                                <v-card-subtitle class="text-caption text-center mb-2 mt-n3">{{ item.raw.hs_code }}</v-card-subtitle>
                                <v-divider></v-divider>
                                <v-div class="mx-auto mt-5 w-75">
                                    <v-text-field
                                        label="Jumlah"
                                        variant="outlined"
                                        density="compact"
                                        v-model="pembelian_input[index].jumlah"
                                        active="true"
                                        :readonly="edit ? true : false"
                                        hide-details="true"
                                        class="mb-3"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        label="Jumlah diterima"
                                        variant="outlined"
                                        density="compact"
                                        v-model="pembelian_input[index].jumlah_diterima"
                                        :readonly="edit ? true : false"
                                        hide-details="true"
                                        class="mb-3"
                                    />
                                    <v-text-field
                                        label="Total nilai"
                                        v-model="pembelian_input[index].nilai"
                                        variant="outlined"
                                        density="compact"
                                        :readonly="edit ? true : false"
                                        hide-details
                                    />
                                </v-div>
                                <v-divider class="my-5"></v-divider>
                                <v-div v-if="!edit" class="d-flex me-5 ms-auto">
                                    <btn-cancel btn_title="Hapus" @click="deleteditem(item.raw), detaildial[index] = false" :hidden="disable" class="me-2">Hapus</btn-cancel>
                                    <btn-orange btn_title="Simpan" :hidden="disable" @click="detaildial[index] = false">Simpan</btn-orange>
                                </v-div>
                            </v-card>
                        </v-dialog>
                    </template>
                    </v-data-table>
                    <v-div class="d-flex ms-auto me-0 mb-0 mt-auto">
                        <!-- <v-btn v-if="!edit" @click="validate" :hidden="disable" class="text-body-2 text-white elevation-0 rounded-xl me-2" height="42" width="150" color="#ff6e40">Simpan</v-btn> -->
                        <btn-cancel btn_title="Batal" class="me-2" v-if="!edit" @click="dialog=false"/>
                        <btn-orange type="submit" btn_title="Simpan" v-if="!edit" @click="validated" :hidden="disable"/>
                        <!-- <v-btn v-if="!edit" @click="dialog=false" class="rounded-xl text-body-2" height="42" width="150" variant="outlined" color="grey-darken-2">Batal</v-btn> -->
                    </v-div>
                </v-row>
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