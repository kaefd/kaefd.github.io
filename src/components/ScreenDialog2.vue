<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import functions from '../service/functions';
import btnCancel from './button/btnCancel.vue';
import btnInfoVue from './button/btnInfo.vue';
import btnOrange from './button/btnOrange.vue';
import DatePicker from './datepicker/datePicker.vue';
import DialogCard2 from './dialog/dialogScroll.vue';
import TextField from './form/textField.vue';
import TextFieldForm from './form/textFieldForm.vue';
import DialogVue from './dialog/dialogVue.vue';
import TextButton from './button/textButton.vue';
// import api from '../api';

</script>

<script>
export default {
    components: {
    VDataTable,
    DialogCard2,
    btnInfoVue,
    btnCancel,
    btnOrange,
        DatePicker,
        TextFieldForm,
        TextField,
        DialogVue,
        TextButton,
},
    props:['headers', 'headItem', 'edit', 'getbarang', 'produksi', 'detailbahan', 'groupbarang', 'detailbarang', 'select_kode', 'produksi_bahan', 'produksi_barang', 'item', 'items', 'category', 'icon', 'actIcon', 'btncolor', 'alpha', 'iVariant', 'screen', 'details','disable'],
    data () {
      return {
        dialog: false,
        dialog2: false,
        dialogbhn: [],
        dialogbrg: [],
        dialog5: false,
        searched: '',
        inputbahan: '',
        inputbarang: '',
        masuk: '',
        inputproduksi: {
            no_produksi: '', 
            kode_group: '',
            tgl_produksi: '',
            tgl_input: '',
            tgl_batal: '',
            user_input: 'admin',
            user_batal: '',
            status: true
        },
        btn: ['Tambah Bahan', 'Tambah Barang'],
        required: [
        value => {
          if (value)  return true

          return 'harus diisi !'
        },
      ],
      }
    },

    created() {
        let currentDate = new Date().toJSON().slice(0, 10);
        return  this.inputproduksi.tgl_input = currentDate

    },
    computed: {
        filterkodegroup() {
            return this.groupbarang.filter((item) => {
                    return item.kode_group.toLowerCase().includes(this.searched.toLowerCase())
                })
            },
        
    },
    methods: {
        // PEMASUKAN HEAD
    //     getPembelian() {
    //     const apiUrl = '/pembelian_head?'
    //     const params = {
    //       tgl_awal: this.periode[0],
    //       tgl_akhir: this.periode[1],
    //     }
    //     api.getData(apiUrl, { params })
    //     .then(response => {
    //       this.masuk = response.data
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //   },
        bahanmasuk(value) {
            this.inputbahan = value
        },
        barangmasuk(value) {
            this.inputbarang = value
        },
        input_kodegroup(value) {
            this.inputproduksi.kode_group = value
            this.$emit('input_kodegroup', this.inputproduksi.kode_group)
        },
        numb(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        deleteditem(del, p) {
            let jenis = []
            if(p == 'bahan') {
                jenis = this.inputbahan
            } else if(p == 'barang') {
                jenis = this.inputbarang
            }
            for (let i = 0; i < jenis.length; i++) {
                    if( del == jenis[i] ) {
                        jenis.splice(i,1);
                    }
            }
        },
        confirm() {
            this.$emit('confirm', this.item, this.produksi_bahan, this.produksi_barang)
        },
        async validate () {
            const { valid } = await this.$refs.form.validate()
            if (valid){
                // 1st = head, 2nd = detailbahan, 3rd = detailbarang
                return this.$emit('inputhead', this.inputproduksi, this.inputbahan, this.inputbarang)
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
    :scrim="false"
    transition="dialog-bottom-transition"
    fullscreen
    >
        <!-- BUTTON DIALOG -->
          <template v-slot:activator="{ props }">
            
            <btn-info-vue v-if="!edit" btn_title="Tambah Baru" v-bind="props" icon="mdi-plus" />
            
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
                  <v-list-item class="text-caption" density="compact" @click="confirm()" >Batal Produksi</v-list-item>
                </v-list>
            </v-menu>
          </template>
          <!-- dialog content -->
            <v-card>
                <v-toolbar class="bg-blue-custom text-white" height="50">
                <text-button icon="mdi-close" color="white" @click="dialog = false, inputproduksi = inputbahan = inputbarang = []" />
                <v-toolbar-title class="text-button">DETAIL PRODUKSI</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-container>
                <v-form  @submit.prevent ref="form" class="mb-5 mt-1">
                    <v-row class="row border-sm rounded-lg">
                        <v-col class="w-100 text-grey">
                            <!-- NOMOR PRODUKSI -->
                            <text-field-form
                                v-if="edit"
                                :value="item.no_produksi"
                                label="No Produksi"
                                class="mt-sm-4 mt-1"
                                />
                            <text-field-form
                                v-if="!edit"
                                label="No Produksi"
                                :disabled="true"
                                v-model="inputproduksi.no_produksi"
                                class="mt-sm-4 mt-1"
                            />
                        </v-col>
                        <v-col class="w-100">
                            <!-- TANGGAL PRODUKSI -->
                                <date-picker
                                v-if="!edit"
                                label="Tgl Produksi"
                                v-model="inputproduksi.tgl_produksi"
                                :rules="required"
                                class="mt-sm-4 mt-1"
                            />
                            <text-field-form
                                v-if="edit"
                                label="Tgl Produksi"
                                class="mt-sm-4 mt-1"
                                :readonly="true"
                                :rules="required"
                                :value="functions.formatDate(item.tgl_produksi)"
                            />
                        </v-col>
                        <v-col class="w-100">
                            <!-- KODE GROUP -->
                                <text-field-form
                                    v-if="edit" 
                                    label="Kode Group"
                                    :value="item.kode_group"
                                    readonly
                                    :rules="required"
                                    class="mt-sm-4 mt-1"
                                />
                            <v-dialog v-model="dialog5" >
                                <template v-slot:activator="{ props }">
                                    <text-field-form
                                    v-if="!edit"
                                    label="Kode Group"
                                    v-bind="props"
                                    v-model="inputproduksi.kode_group"
                                    readonly
                                    :rules="required"
                                    class="mt-sm-4 mt-1"
                                    >
                                </text-field-form>
                            </template>
                                <v-card class="py-5 px-7 rounded-xl mx-auto w-100" max-width="400">
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
                                            @click="input_kodegroup(kode.kode_group), inputproduksi.kode_barang = kode.kode_barang, dialog5 = false "
                                            >
                                                <v-span class="text-caption">{{ kode.kode_group }}</v-span>
                                            </v-list-item>
                                        </v-for>
                                    </v-list>
                                </v-card>
                        </v-dialog>
                        </v-col>
                    </v-row>
                </v-form>
                <!-- TABLE -->
                <v-row>
                    <!-- TABEL TAMBAH/EDIT BAHAN -->
                    <v-col class="border-sm rounded-lg me-lg-3 me-0 mb-lg-0 mb-3">
                        <!-- ITEM DIALOG ADALAH KODE BARANG YANG SESUAI DENGAN KODE GROUP YANG DIPILIH -->
                        <DialogCard2 v-if="!edit" :produksi="true" :btn="btn[0]" width="400" :barang="detailbahan" :tambah="true" :getbarang="select_kode" :kodebarang="inputproduksi.kode_barang" :kodegroup="inputproduksi.kode_group" @pemasukanitem="bahanmasuk"/>
                        <v-row v-if="edit" no-gutters class="justify-center py-1">detail bahan</v-row>
                        <VDataTable
                            :headers="edit ? headItem : headers"
                            :items=" edit ? detailbahan : inputbahan"
                            :hover="true"
                            :fixed-header="true"
                            density="compact"
                            class="text-body-2 py-3 px-5 text-caption"
                            height="40vh"
                        >
                        <template v-slot:bottom>
                        </template>
                        <!-- eslint-disable-next-line vue/valid-v-slot -->
                        <template v-slot:item.jumlah="{ item }">
                            {{ functions.numb(item.raw.jumlah) }}
                        </template>
                        <!-- eslint-disable-next-line vue/valid-v-slot -->
                        <template v-slot:item.actions="{ item, index }">
                            <DialogVue  @update="dialogchild" v-model="dialogbhn[index]">
                                <template #titlecard>
                                    <v-card-title class="text-center text-button font-weight-bold">{{ item.raw.nama_barang }}</v-card-title>
                                    <v-card-subtitle class="text-caption text-center mb-2 mt-n3">{{ item.raw.kode_barang }}</v-card-subtitle>
                                </template>
                                <template #content>
                                <v-div class="mx-auto mt-5">
                                    <text-field-form
                                        v-if="edit"
                                        v-model="item.raw.jumlah"
                                        label="Jumlah"
                                        readonly
                                    />
                                    <text-field-form
                                        v-if="!edit"
                                        v-model="item.raw.jumlah"
                                        label="Jumlah"
                                    />
                                </v-div>
                                <v-divider class="mt-3 mb-5"></v-divider>
                                    <v-div v-if="!edit" class="d-flex me-5 ms-auto">
                                        <btn-cancel btn_title="Hapus" @click="deleteditem(item.raw, 'bahan'), dialogbhn[index] = false" class="me-2"></btn-cancel>
                                        <btn-orange btn_title="Simpan" type="submit" @click="dialogbhn[index] = false"></btn-orange>
                                    </v-div>
                                </template>
                            </DialogVue>
                        </template>
                        </VDataTable>
                    </v-col>
                    <!-- TABEL TAMBAH BARANG -->
                    <v-col class="border-sm rounded-lg">
                        <DialogCard2 :produksi="true" v-if="!edit" :kodegroup="inputproduksi.kode_group" :btn="btn[1]" width="400" :barang="detailbarang" :getbarang="getbarang" :inputbahan="inputbahan" :tambah="true" :kodebarang="inputproduksi.kode_barang" @pemasukanitem="barangmasuk" />
                        <v-row v-if="edit" no-gutters class="justify-center py-1">detail barang</v-row>
                        <VDataTable
                            :headers="edit ? headItem : headers"
                            :items="edit ? detailbarang : inputbarang "
                            :hover="true"
                            :fixed-header="true"
                            density="compact"
                            class="text-body-2 py-3 px-5 text-caption"
                            height="40vh">
                            <template v-slot:bottom>
                            </template>
                            <!-- eslint-disable-next-line vue/valid-v-slot -->
                            <template v-slot:item.jumlah="{ item }">
                                {{ functions.numb(item.raw.jumlah) }}
                            </template>
                            <!-- eslint-disable-next-line vue/valid-v-slot -->
                            <template v-slot:item.actions="{ item, index }">
                                <DialogVue @update="dialogbrg" v-model="dialogbrg[index]">
                                    <template #titlecard>
                                        <v-card-title class="text-center text-button font-weight-bold">{{ item.raw.nama_barang }}</v-card-title>
                                        <v-card-subtitle class="text-caption text-center mb-2 mt-n3">{{ item.raw.kode_barang }}</v-card-subtitle>
                                    </template>
                                    <template #content>
                                    <v-div class="mx-auto mt-5">
                                        <text-field-form
                                            v-if="edit"
                                            v-model="item.raw.jumlah"
                                            label="Jumlah"
                                            readonly
                                        />
                                        <text-field-form
                                            v-if="!edit"
                                            v-model="item.raw.jumlah"
                                            label="Jumlah"
                                        />
                                    </v-div>
                                    <v-divider class="mt-3 mb-5"></v-divider>
                                        <v-div v-if="!edit" class="d-flex me-5 ms-auto">
                                            <btn-cancel btn_title="Hapus" @click="deleteditem(item.raw, 'bahan'), dialogbrg[index] = false, inputproduksi = []" class="me-2"></btn-cancel>
                                            <btn-orange btn_title="Simpan" type="submit" @click="dialogbrg[index] = false"></btn-orange>
                                        </v-div>
                                    </template>
                                </DialogVue>
                            </template> 
                        </VDataTable>
                    </v-col>
                </v-row>
                    <!-- edit data -->
                <v-row class="float-end mt-7">
                    <btnCancel v-if="!edit" @click="dialog = false, inputproduksi = inputbahan = inputbarang = []" btn_title="Batal" />
                    <btnOrange v-if="!edit" @click="validate" btn_title="Simpan" class="ms-2" />
                </v-row>
                </v-container>
            </v-card>

    </v-dialog>
</template>

