<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import DialogCard2 from '../components/dialog/dialogScroll.vue';
import api from '../service/api';
import datePickerVue from '../components/datepicker/datePicker.vue';
import btnInfoVue from '../components/button/btnInfo.vue';
import BtnOrange from '../components/button/btnOrange.vue';
import BtnCancel from '../components/button/btnCancel.vue';
import TextFieldForm from '../components/form/textFieldForm.vue';
import TextField from '../components/form/textField.vue';
export default {
    components: {
    DialogCard2,
    VDataTable,
    datePickerVue,
    btnInfoVue,
        BtnOrange,
        BtnCancel,
        TextFieldForm,
        TextField,
    },
    props:['pembelianbaru', 'namaPelanggan', 'detail_kirim','detailkirim', 'nokirim', 'nopjl', 'pjl_detail', 'groupbarang', 'batalbtn', 'pengiriman', 'pemasukan', 'totalpenjualan', 'namaTujuan', 'datainput', 'pageTitle', 'pengeluaran', 'no', 'tipe', 'namaSupplier', 'pengirimanDetail', 'pembelian', 'pelanggan', 'supplier', 'pembeliandetl', 'edit', 'kirim', 'headers', 'items', 'actIcon', 'icon', 'btncolor', 'search', 'iVariant', 'headDetails', 'details','disable', 'btn', 'datatext', 'itemDetail', 'category'],
    data () {
      return {
        dialog: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialogb: false,
        dialogbongkar: false,
        jalan: false,
        confirmdialog: false,
        dialogkodeg: false,
        valid: false,
        detaildial: [],
        arr: [],
        tipe_dokumen: ['BC25', 'BC41'],
        searched: '',
        nama:'',
        tujuan:'',
        barang: '',
        belumkirim: '',
        belumkirim_detail: '',
        namasupplier: '',
        dataitem: this.items,
        alamatBongkar: '',
        nama_supplier : '',
        nama_pelanggan : '',
        pembelian_input: [],
        detailpengiriman: '',
        pjlhead: '',
        kode_pelanggan: this.namaPelanggan,
        inputdata: this.datainput,
        kurs: '',
        nomorkirim: '',
        pemasukan_detail: '',
        pengiriman_detail : [this.pengiriman],
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
        async fetchData() {
            try {
                const api = await import('../service/api');
                // const pengiriman = await import('../service/page/pengiriman');
                let a = []
                for (let i = 0; i < this.nopjl.length; i++) {
                    a.push(await api.default.getPenjualanHead(this.nopjl[i].no_penjualan))
                }
                this.pjlhead = a
                } catch (error) {
                    console.log(error);
                }
            },
        getBarang() {
            api.getData('/barang?status=true')
            .then(response => {
            this.barang = response.data
            })
            .catch(() => {
                return this.$router.push('login');
            })
            
        },
        getDetail() {
            const apiUrl = '/penjualan_head/' + this.nopjl
            api.getData(apiUrl)
            .then(response => {
            this.detailpengiriman = response.data
            })
            .catch(() => {
                return this.$router.push('login');
            })
        },
        tujuanBongkar(){
            const apiUrl = '/alamat_bongkar'
            api.getData(apiUrl)
            .then(response => {
            this.alamatBongkar = response.data
            })
            .catch(() => {
                return this.$router.push('login');
            })
        },
        belumterkirim(){
            const apiUrl = '/penjualan_head/belum_terkirim'
            api.getData(apiUrl)
            .then(response => {
            this.belumkirim = response.data
            })
            .catch(() => {
                return this.$router.push('login');
            })
        },
        belumterkirim_detail(){
            const apiUrl = '/penjualan_detail/belum_terkirim'
            api.getData(apiUrl)
            .then(response => {
            this.belumkirim_detail = response.data
            })
            .catch(() => {
                return this.$router.push('login');
            })
        },
        numb(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        itemmasuk(value) {
            this.pembelian_input = value
        },
        confirm() {
            this.$emit('confirm', this.dataitem, [this.pengiriman])
           
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
        this.fetchData()
        this.detail
        this.edit
        this.getBarang()
        this.getDetail()
        this.tujuanBongkar()
        this.belumterkirim()
        this.belumterkirim_detail()
        // this.items
        // this.pemasukan
        // this.pengeluaran
        this.dataitem
        // this.pembelian
        // this.penjualan
        this.$nextTick(() => {
            this.nama_supplier = this.namaSupplier,
            this.nama_pelanggan=  this.namaPelanggan
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
            <btn-info-vue v-if="!edit" v-bind="props" btn_title="Tambah Baru" icon="mdi-plus" />

           <!-- LIHAT DATA -->
            <v-list-item
            v-if="edit"
            v-bind="props"
            class="text-small"
            >
            Lihat Detail
            </v-list-item>
            
            <v-list-item
            v-if="edit"
            class="text-small"
            @click="confirm()"
            >
            Batal Pengeluaran
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
                <v-container class="h-100">
                <!-- EDIT -->
                <v-row v-if="edit" justify-sm="start" justify="center" class="pt-7">
                    <text-field-form
                        label="No Pengiriman"
                        v-model= "dataitem.no_pengiriman"
                        readonly
                    >
                    </text-field-form>
                    <text-field-form
                        label="Tgl Pengiriman"
                        v-model="dataitem.tgl_pengiriman"
                        readonly
                    >
                    </text-field-form>
                    <text-field-form
                        label="Pelanggan"
                        v-model="kode_pelanggan"
                        readonly
                    >
                    </text-field-form>
                    <text-field-form
                        label="Tujuan Bongkar"
                        :model-value="namaTujuan"
                        readonly
                    >
                    </text-field-form>
                    <!-- SUPIR -->
                    <text-field-form
                        label="Supir"
                        :model-value="dataitem.supir"
                        readonly
                    >
                    </text-field-form>
                    <!-- NO POLISI -->
                    <text-field-form
                        label="No Polisi"
                        :model-value="dataitem.no_polisi"
                        readonly
                    >
                    </text-field-form>
                </v-row>
                <v-form  @submit.prevent ref="form">
                <!-- TAMBAH PENGIRIMAN -->
                <v-row v-if="!edit" justify-sm="start" justify="center" class="pt-7">
                    <text-field-form
                        label="No Pengiriman"
                        v-model= "inputdata.no_pengiriman"
                    >
                    </text-field-form>
                    <datePickerVue
                        label="Tgl Pengiriman"
                        v-model="inputdata.tgl_pengiriman"
                    />
                        <!-- PELANGGAN -->
                        <v-dialog v-model="dialog4" class="w-50">
                            <template v-slot:activator="{props}">
                                <text-field-form
                                    v-bind="props"
                                    label="Pelanggan"
                                    v-model="inputdata.nama"
                                    :rules="required"
                                    readonly
                                >
                            </text-field-form>
                            </template>
                            <v-card class="py-5 px-7 rounded-xl mx-auto vh-100" width="400">
                            <v-div>
                                <v-card-title class="text-center text-blue-darken-4 mb-3 text-button font-weight-bold">PELANGGAN</v-card-title>
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
                        <!-- ALAMAT BONGKAR -->
                        <v-dialog v-model="dialogbongkar" class="w-50">
                            <template v-slot:activator="{props}">
                                <text-field-form
                                    v-bind="props"
                                    label="Tujuan Bongkar"
                                    v-model="inputdata.tujuan"
                                    :rules="required"
                                    readonly
                                >
                            </text-field-form>
                            </template>
                            <v-card class="py-5 px-7 rounded-xl mx-auto vh-100" width="400">
                                    <v-card-title class="text-center text-blue-darken-4 mb-3 text-button font-weight-bold">ALAMAT BONGKAR</v-card-title>
                                    <text-field
                                        v-model="searched"
                                        label="Search"
                                    ></text-field>
                                    <v-div>
                                    <v-list>
                                        <v-for v-for="s, i in filteralamat" :key="i">
                                            <v-list-item
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
                                        </v-for>
                                    </v-list>
                                </v-div>
                            </v-card>
                        </v-dialog>
                    <!-- SUPIR -->
                    <text-field-form
                        label="Supir"
                        v-model="inputdata.supir"
                    >
                    </text-field-form>
                    <!-- NO POLISI -->
                    <text-field-form
                        label="No Polisi"
                        v-model="inputdata.no_polisi"
                    >
                    </text-field-form>
                </v-row>
                <!-- BUTTON TAMBAH BARANG -->
                <v-div v-if="!edit" class="text-sm-left text-center">
                    <DialogCard2 @reset="reset" :nokirim="inputdata.no_pengiriman" :blmkirim="true" :belumkirim="belumkirim" :belumkirim_detail="belumkirim_detail" :barang="barang" :itemDetail="itemDetail" @pemasukanitem="itemmasuk" :pengiriman="true" :penjualan="penjualan" :btn="btn" width="400" />
                </v-div>
                <!-- TABEL EDIT/VIEW -->
                <v-sheet height="45vh">
                <v-data-table
                :headers="headDetails"
                :items="edit ? pengiriman : pembelian_input"
                :hover="true"
                :fixed-header="true"
                density="compact"
                class="text-caption my-1 h-100"
                height="40vh"
                >
                <!-- CUSTOM PAGINATION STYLE -->
                <template v-slot:bottom>
                </template>
                <!-- dialog actions -->
                <!-- CUSTOM KOLOM -->
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.tipe_dokumen="{item, index}">
                    <v-if v-if="!edit">
                        {{ item.raw.tipe_dokumen }}
                    </v-if>
                    <v-if v-if="edit">
                        {{ pjlhead[index][0].tipe_dokumen }}
                    </v-if>
                </template>
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.no_dokumen="{item, index}">
                    <v-if v-if="!edit">
                        {{ item.raw.no_dokumen }}
                    </v-if>
                    <v-if v-if="edit">
                        {{ pjlhead[index][0].no_dokumen }}
                    </v-if>
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
                                hide-details
                                class="mb-1"
                            >
                            </text-field-form>
                            <v-div v-if="!edit" class="d-flex w-100">
                                <v-btn @click="deleteditem(item.raw), detaildial[index] = false" :hidden="disable" variant="tonal" class="text-caption rounded-xl elevation-0 w-25">Hapus</v-btn>
                                <v-btn :hidden="disable" color="blue-darken-4" class="text-caption rounded-xl elevation-0 bg-blue-darken-4 w-75">Simpan</v-btn>
                            </v-div>
                        </v-responsive>
                    </v-dialog>
                </template>
                </v-data-table>
                <v-div class="d-flex float-end">
                    <btn-orange v-if="!edit" @click="validate" btn_title="Simpan" class="me-2" />
                    <btn-cancel v-if="!edit" @click="pembelian_input = [], inputdata = [], dialog=false" btn_title="Batal" />
                </v-div>
            </v-sheet>
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