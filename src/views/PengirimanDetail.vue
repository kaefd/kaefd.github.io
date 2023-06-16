<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import DialogCard2 from '../components/DialogCard2.vue';
import api from '../api';

export default {
    components: {
    DialogCard2, VDataTable
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
        tipe_dokumen: ['BC23', 'BC40'],
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
        getBarang() {
            api.getData('/barang?status=true')
            .then(response => {
            this.barang = response.data
            })
            .catch(() => {
            window.location.href = '/login'
            })
            
        },
        getDetail() {
            const apiUrl = '/penjualan_head/' + this.nopjl
            api.getData(apiUrl)
            .then(response => {
            this.detailpengiriman = response.data
            })
            .catch((error) => {
            console.log(error);
            })
        },
        tujuanBongkar(){
            const apiUrl = '/alamat_bongkar'
            api.getData(apiUrl)
            .then(response => {
            this.alamatBongkar = response.data
            })
            .catch((error) => {
            console.log(error);
            })
        },
        belumterkirim(){
            const apiUrl = '/penjualan_head/belum_terkirim'
            api.getData(apiUrl)
            .then(response => {
            this.belumkirim = response.data
            })
            .catch((error) => {
            console.log(error);
            })
        },
        belumterkirim_detail(){
            const apiUrl = '/penjualan_detail/belum_terkirim'
            api.getData(apiUrl)
            .then(response => {
            this.belumkirim_detail = response.data
            })
            .catch((error) => {
            console.log(error);
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
            this.$emit('del', this.dataitem, [this.pengiriman])
           
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
            <v-btn
            v-if="!edit"
            v-bind="props"
            class="bg-blue-custom text-white rounded-xl elevation-0 text-small"
            prepend-icon="mdi-plus"
            height="42"
            >
            Tambah Baru
            </v-btn>

           <!-- LIHAT DATA -->
            <v-list-item
            v-if="edit"
            v-bind="props"
            class="text-small"
            >
            Lihat Detail
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
                <v-container class="mt-5">
                <!-- EDIT -->
                <v-row v-if="edit">
                    <v-col>
                    <v-text-field
                        label="No Pengiriman"
                        v-model= "dataitem.no_pengiriman"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    <v-text-field
                        label="Tgl Pengiriman"
                        v-model="dataitem.tgl_pengiriman"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    </v-col>
                    <v-col>
                    <v-text-field
                        label="Pelanggan"
                        v-model="kode_pelanggan"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    <v-text-field
                        label="Tujuan Bongkar"
                        :model-value="namaTujuan"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        readonly
                    >
                    </v-text-field>
                    </v-col>
                    <v-col>
                    <!-- SUPIR -->
                    <v-text-field
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
                <!-- TAMBAH PENGIRIMAN -->
                <v-row v-if="!edit" class="mb-12">
                    <v-col>
                    <v-text-field
                        label="No Pengiriman"
                        v-model= "inputdata.no_pengiriman"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                        class="mb-5"
                        hide-details
                    >
                    </v-text-field>
                    <v-text-field
                        label="Tgl Pengiriman"
                        type="date"
                        v-model="inputdata.tgl_pengiriman"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                    >
                    </v-text-field>
                    </v-col>
                    <v-col>
                        <!-- PELANGGAN -->
                        <v-dialog v-model="dialog4">
                            <template v-slot:activator="{props}">
                                <v-text-field
                                    v-bind="props"
                                    label="Pelanggan"
                                    v-model="inputdata.nama"
                                    variant="outlined"
                                    density="compact"
                                    style="min-width: 200px; max-width:300px"
                                    class="mb-5"
                                    hide-details
                                    :rules="required"
                                    readonly
                                >
                            </v-text-field>
                            </template>
                            <v-card class="py-5 px-5 rounded-xl mx-auto vh-75 w-100" max-width="350">
                                <v-div>
                                    <v-btn icon="mdi-close" variant="plain" @click="dialog4 = false"></v-btn>
                                    <v-card-title class="text-center text-blue-darken-4 mb-3 mt-n12 text-button font-weight-bold">PELANGGAN</v-card-title>
                                    <v-text-field
                                        v-model="searched"
                                        append-inner-icon="mdi-magnify"
                                        label="Search"
                                        single-line
                                        hide-details
                                        :rules="required"
                                        density="compact"
                                        variant="outlined"
                                        class="mb-4"
                                    ></v-text-field>
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
                                </v-div>
                            </v-card>
                        </v-dialog>
                        <!-- ALAMAT BONGKAR -->
                        <v-dialog v-model="dialogbongkar">
                            <template v-slot:activator="{props}">
                                <v-text-field
                                    v-bind="props"
                                    label="Tujuan Bongkar"
                                    v-model="inputdata.tujuan"
                                    variant="outlined"
                                    density="compact"
                                    style="min-width: 200px; max-width:300px"
                                    class="mb-5"
                                    hide-details
                                    :rules="required"
                                    readonly
                                >
                            </v-text-field>
                            </template>
                            <v-card class="py-5 px-5 rounded-xl mx-auto w-100" max-width="400">
                                    <v-btn icon="mdi-close" variant="plain" @click="dialogbongkar = false"></v-btn>
                                    <v-card-title class="text-center text-blue-darken-4 mb-3 mt-n12 text-button font-weight-bold">ALAMAT BONGKAR</v-card-title>
                                    <v-text-field
                                        v-model="searched"
                                        append-inner-icon="mdi-magnify"
                                        label="Search"
                                        single-line
                                        hide-details
                                        :rules="required"
                                        density="compact"
                                        variant="outlined"
                                        class="mb-4"
                                    ></v-text-field>
                                    <v-list class="overflow-auto">
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
                            </v-card>
                        </v-dialog>
                </v-col>
                <v-col>
                    <!-- SUPIR -->
                    <v-text-field
                        label="Supir"
                        v-model="inputdata.supir"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                    >
                    </v-text-field>
                    <!-- NO POLISI -->
                    <v-text-field
                        label="No Polisi"
                        v-model="inputdata.no_polisi"
                        variant="outlined"
                        density="compact"
                        style="min-width: 200px; max-width:300px"
                    >
                    </v-text-field>
                </v-col>     
                </v-row>
                <!-- BUTTON TAMBAH BARANG -->
                <v-div v-if="!edit" class="text-sm-left text-center">
                    <DialogCard2 @reset="reset" :nokirim="inputdata.no_pengiriman" :blmkirim="true" :belumkirim="belumkirim" :belumkirim_detail="belumkirim_detail" :barang="barang" :itemDetail="itemDetail" @pemasukanitem="itemmasuk" :pengiriman="true" :penjualan="penjualan" :btn="btn" width="400" />
                </v-div>
                <!-- TABEL EDIT/VIEW -->
                <v-data-table
                :headers="headDetails"
                :items="edit ? [pengiriman] : pembelian_input"
                :hover="true"
                :fixed-header="true"
                density="compact"
                class="text-caption mt-5 mb-5 px-5"
                height="200"
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
                        {{ detailpengiriman[index].tipe_dokumen }}
                    </v-if>
                </template>
                <!-- eslint-disable-next-line vue/valid-v-slot -->
                <template v-slot:item.no_dokumen="{item, index}">
                    <v-if v-if="!edit">
                        {{ item.raw.no_dokumen }}
                    </v-if>
                    <v-if v-if="edit">
                        {{ detailpengiriman[index].no_dokumen }}
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
                            <v-text-field
                                variant="outlined"
                                density="compact"
                                :value="numb(item.raw.jumlah)"
                                active="true"
                                hide-details
                                class="mb-1"
                            >
                            </v-text-field>
                            <v-div v-if="!edit" class="d-flex w-100">
                                <v-btn @click="deleteditem(item.raw), detaildial[index] = false" :hidden="disable" variant="tonal" class="text-caption rounded-xl elevation-0 w-25">Hapus</v-btn>
                                <v-btn :hidden="disable" color="blue-darken-4" class="text-caption rounded-xl elevation-0 bg-blue-darken-4 w-75">Simpan</v-btn>
                            </v-div>
                        </v-responsive>
                    </v-dialog>
                </template>
                </v-data-table>
                <v-btn v-if="!edit" @click="validate" :hidden="disable" class="float-end text-body-2 text-white elevation-0 rounded-xl" height="42" width="150" color="#ff6e40">Simpan</v-btn>
                <v-btn v-if="!edit" @click="pembelian_input = [], inputdata = [], dialog=false" class="float-end rounded-xl text-body-2 me-2" height="42" width="150" variant="outlined" color="grey-darken-2">Batal</v-btn>
                <v-btn v-if="edit" @click="confirmdialog = true" size="large" class="float-end rounded-xl text-body-2 me-2" height="42" width="150" variant="tonal">Batal {{ batalbtn }}</v-btn>
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
                            @click=" inputdata = [], confirm(), dialog3 = false, dialog= false, confirmdialog = false"
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
.dp__pointer {
    background: #fafafa !important;
}
</style>