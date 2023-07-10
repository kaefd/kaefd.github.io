<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import dialogScroll from '../components/dialog/dialogScroll.vue';
import api from '../service/api';
import datePickerVue from '../components/datepicker/datePicker.vue';
import BtnInfo from '../components/button/btnInfo.vue';
import textFieldForm from '../components/form/textFieldForm.vue';
import BtnCancel from '../components/button/btnCancel.vue';
import BtnOrange from '../components/button/btnOrange.vue';
import dialogSearch from '../components/dialog/dialogSearch.vue';
import TextField from '../components/form/textField.vue';
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
        TextField
        
    },
    props:['pembelianbaru', 'namaPelanggan', 'laporan', 'groupbarang', 'batalbtn', 'penjualan', 'pemasukan', 'alamatBongkar', 'namaTujuan', 'datainput', 'pageTitle', 'pengeluaran', 'dokumenpjl', 'namaSupplier', 'pengirimanDetail', 'pembelian', 'pelanggan', 'supplier', 'pembeliandetl', 'edit', 'kirim', 'headers', 'items', 'actIcon', 'icon', 'btncolor', 'search', 'iVariant', 'headDetails', 'details','disable', 'btn', 'datatext', 'itemDetail', 'category'],
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
        tipe_dokumen: ['BC23', 'BC40'],
        searched: '',
        nama:'',
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
        numb(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        itemmasuk(value) {
            this.pembelian_input = value
        },
        confirm() {
            this.$emit('confirm', this.dataitem, [this.penjualan])
        },
        totalharga(v){
                if (this.dataitem.no_penjualan == v ) {
                    return this.numb(this.dataitem.total_penjualan)
                }
        },
        deleteditem(del) {
                for (let i = 0; i < this.pembelian_input.length; i++) {
                    if( del == this.pembelian_input[i] ) {
                        this.pembelian_input.splice(i,1);
                    }
                }
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
                this.$emit('inputhead', this.inputdata, this.pembelian_input)
            }
        },
        
    },
    mounted() {
        this.edit
        api.getData
        // this.items
        // this.pemasukan
        // this.pengeluaran
        this.dataitem
        // this.pembelian
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
                  <v-list-item v-if="!laporan" class="text-caption" density="compact" @click="confirm()" >Batal Pengeluaran</v-list-item>
                </v-list>
            </v-menu>
          </template>
          <!-- dialog content -->
            <v-card>
                <v-toolbar class="bg-blue-custom text-white" height="50">
                    <v-btn
                        icon
                        dark
                        @click="pembelian_input = [], dialog = false"
                        size="small"
                    >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="text-button mt-1">{{ 'DETAIL '+ pageTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-container class="mt-5">
                <!-- EDIT -->
                <v-row v-if="edit" justify-sm="start" justify="center">
                    <text-field-form label="No Penjualan" :model-value="items.no_penjualan" readonly />
                    <text-field-form label="Tgl Penjualan" :model-value="items.tgl_penjualan" readonly/>
                    <text-field-form label="Pelanggan" :model-value="items.kode_pelanggan" readonly />
                    <text-field-form label="Kode Group" :model-value="items.kode_group" readonly />
                    <text-field-form label="Tipe Dokumen" :model-value="items.tipe_dokumen" readonly />
                    <text-field-form label="No Dokumen" :model-value="items.no_dokumen" readonly />
                    <text-field-form label="Tgl Dokumen" :model-value="items.tgl_dokumen" readonly />
                </v-row>
                    <v-form  @submit.prevent ref="form">
                    <!-- TAMBAH PENGELUARAN -->
                    <v-row v-if="!edit && pengeluaran" justify-sm="start" justify="center">
                            <text-field-form
                                label="No Pengeluaran"
                                v-model= "inputdata.no_penjualan"
                                readonly
                                disabled
                            />
                            <datePickerVue
                                label="Tgl Keluar"
                                v-model="inputdata.tgl_penjualan"
                                :rules="required"
                            />
                            <!-- PELANGGAN -->
                            <dialogSearch v-if="!edit" label="Pelanggan" :objectFilter="pelanggan" @pilihObjek="pilihObjek" cardTitle="PELANGGAN" max-width="400" :rules="required"/>
                            <!-- KODE GROUP -->
                            <v-dialog v-model="dialogkodeg" >
                                <template v-slot:activator="{ props }">
                                    <text-field-form
                                    label="Kode Group"
                                    v-bind="props"
                                    v-model="inputdata.kode_group"
                                    readonly
                                    :rules="required"
                                    />
                                
                            </template>
                                <v-card class="py-5 px-7 rounded-xl mx-auto" width="400">
                                    <v-card-title class="text-center text-blue-darken-4 mb-3 text-button font-weight-bold">KODE GROUP</v-card-title>
                                    <text-field
                                        v-model="searched"
                                        label="Search"
                                        class="mb-4"
                                    />
                                    <v-list>
                                        <v-for v-for="kode, i in filterkodegroup" :key="i">
                                            <v-list-item
                                            style="cursor: pointer;"
                                            class="text-caption"
                                            density="compact"
                                            @click="inputdata.kode_group = kode.kode_group, dialogkodeg = false "
                                            >
                                                {{ kode.kode_group }}
                                            </v-list-item>
                                        </v-for>
                                    </v-list>
                                </v-card>
                        </v-dialog>
                            <text-field-form
                                id="tipe"
                                label="Tipe Dokumen"
                                v-model="inputdata.tipe_dokumen"
                                :rules="required"
                                readonly
                                />                                
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
                            <text-field-form
                                label="No Dokumen"
                                v-model="inputdata.no_dokumen"
                                :rules="required"
                            />
                            
                            <datePickerVue
                                label="Tgl Dokumen"
                                v-model="inputdata.tgl_dokumen"
                                :rules="required"
                            />
                    </v-row>
                    <!-- BUTTON TAMBAH BARANG -->
                    <v-div v-if="!edit" :pembelianbaru="pembelianbaru" :pembeliandetl="pembeliandetl" class="text-sm-left text-center">
                        <dialogScroll @reset="reset" :pengeluaran="true"  :barang="barang" :itemDetail="itemDetail" @pemasukanitem="itemmasuk" :btn="btn" width="400" />
                    </v-div>
                    <!-- TABEL EDIT/VIEW -->
                    <v-data-table
                    :headers="headDetails"
                    :items="edit ? penjualan : pembelian_input"
                    :hover="true"
                    :fixed-header="true"
                    density="compact"
                    class="text-caption my-7 px-5"
                    height="200"
                    >
                    <!-- CUSTOM PAGINATION STYLE -->
                    <template v-slot:bottom>
                    </template>
                    <!-- dialog actions -->
                    <!-- CUSTOM KOLOM -->
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.jumlah="{item}">
                        {{numb(item.raw.jumlah)}}
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.jumlah_terkirim="{item}">
                        {{numb(item.raw.jumlah_terkirim)}}
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.harga_jual="{item}">
                        {{numb(item.raw.harga_jual)}}
                    </template>
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.total_terjual="{item, index}">
                        <v-if v-if="edit">
                            {{ numb(item.raw.jumlah * item.raw.harga_jual) }}
                        </v-if>
                        <v-if v-if="!edit">
                            {{ numb(pembelian_input[index].jumlah * pembelian_input[index].harga_jual) }}
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
                        <v-dialog v-model="detaildial[index]">
                        <!-- button dialog -->
                            <template v-slot:activator="{ props }">
                                <v-btn
                                v-bind="props"
                                class="text-body-2  rounded-lg"
                                :icon="actIcon[3].icon"
                                variant="plain"
                                height="30"
                                width="30">
                                </v-btn>
                            </template>
                            <v-responsive class="bg-white mx-auto px-7 pb-7 pt-5 rounded-xl" width="400">
                                <v-btn @click="detaildial[index] = false" icon="mdi-close" variant="text" size="small"></v-btn>
                                <v-card-title class="text-center text-button font-weight-bold mt-n5">{{ item.raw.nama_barang }}</v-card-title>
                                <v-card-subtitle class="text-caption text-center mb-2 mt-n3">{{ item.raw.hs_code }}</v-card-subtitle>
                                <v-label>Jumlah</v-label>
                                <text-field-form
                                    variant="outlined"
                                    density="compact"
                                    :value="numb(item.raw.jumlah)"
                                    active="true"
                                    readonly
                                    hide-details
                                    class="mb-1"
                                />
                                
                                <v-label>Harga</v-label>
                                <text-field-form
                                    variant="outlined"
                                    density="compact"
                                    :value="numb(item.raw.harga_jual)"
                                    readonly
                                    hide-details
                                    class="mb-4"
                                />
                                <v-label>Total Harga</v-label>
                                <text-field-form
                                    variant="outlined"
                                    density="compact"
                                    :value="numb(item.raw.harga_jual * item.raw.jumlah)"
                                    readonly
                                    hide-details
                                    class="mb-4"
                                />
                                <v-div v-if="!edit" class="d-flex w-100">
                                    <v-btn @click="deleteditem(item.raw), detaildial[index] = false" :hidden="disable" variant="tonal" class="text-caption rounded-xl elevation-0 w-25">Hapus</v-btn>
                                    <v-btn :hidden="disable" color="blue-darken-4" class="text-caption rounded-xl elevation-0 bg-blue-darken-4 w-75">Simpan</v-btn>
                                </v-div>
                            </v-responsive>
                        </v-dialog>
                    </template>
                    </v-data-table>
                    <v-div class="float-end">
                        <btn-orange v-if="!edit" @click="validate" :hidden="disable" btn_title="Simpan" class="me-2" />
                        <btn-cancel v-if="!edit" @click="dialog = false" btn_title="Batal"/>
                    </v-div>
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