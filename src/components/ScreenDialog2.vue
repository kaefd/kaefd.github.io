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
import CurrencyInput from './form/currencyInput.vue';
// import api from '../api';

</script>

<script>
import produksi from '../service/page/produksi';
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
    CurrencyInput,
},
    props:['tema', 'headers', 'headItem', 'edit', 'hapus', 'getbarang', 'detailbahan', 'groupbarang', 'detailbarang', 'select_kode', 'item'],
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
        inputproduksi: produksi.input,
        btn: ['Tambah Bahan', 'Tambah Barang'],
        required: [
        value => {
          if (value)  return true

          return 'harus diisi !'
        },
      ],
      }
    },
    computed: {
        filterkodegroup() {
        return this.groupbarang.filter((item) => {
                return item.kode_group.toLowerCase().includes(this.searched.toLowerCase())
            })
        },
    },
    methods: {
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
            this.$emit('confirm', this.item, this.detailbahan, this.detailbarang)
        },
        async validate () {
            const { valid } = await this.$refs.form.validate()
            if (valid){
                // 1st = head, 2nd = detailbahan, 3rd = detailbarang
                return this.$emit('inputhead', this.inputproduksi, this.inputbahan, this.inputbarang)
            }
            this.dialog = false
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
                <text-button
                    id="menu-actions"
                    v-if="edit"
                    v-bind="props"
                    icon="mdi-dots-vertical"
                />
            </template>
                <v-list>
                  <v-list-item class="text-caption" density="compact" v-bind="props" >Lihat Data</v-list-item>
                  <v-list-item v-if="hapus" class="text-caption" density="compact" @click="confirm()" >Batal Produksi</v-list-item>
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
                <v-form  @submit.prevent ref="form">
                <v-row no-gutters justify="center" justify-md="space-between" align="start" class="pt-7 pb-5" min-width="400">
                    <v-responsive class="pt-2 mx-md-0 mx-3" width="250">
                        <text-field-form v-if="edit" :model-value="item.no_produksi" label="No Produksi" />
                        <text-field-form v-if="!edit" label="No Produksi" :disabled="true" v-model="inputproduksi.no_produksi" />
                    </v-responsive>
                    <v-responsive class="pt-2 mx-3" width="250">
                        <date-picker v-if="!edit" label="Tgl Produksi" v-model="inputproduksi.tgl_produksi" :tema="tema" :rules="required" />
                        <text-field-form v-if="edit" label="Tgl Produksi" :readonly="true" :rules="required" :model-value="functions.formatDate(item.tgl_produksi)" />
                    </v-responsive>
                    <v-responsive class="pt-2 mx-md-0 mx-3" width="250">
                        <text-field-form v-if="edit" label="Kode Group" :model-value="item.kode_group" readonly :rules="required" />
                        <v-dialog v-model="dialog5" class="w-50" >
                            <template v-slot:activator="{ props }">
                                <text-field-form v-if="!edit" label="Kode Group" v-bind="props" v-model="inputproduksi.kode_group" :rules="required" />
                            </template>
                            <v-card class="py-5 px-7 rounded-xl mx-auto w-100" max-width="400">
                                <v-card-title class="text-center text-blue-darken-4 mb-3 text-button font-weight-bold">KODE GROUP</v-card-title>
                                <text-field v-model="searched" label="Search" class="mb-4" />
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
                    </v-responsive>
                </v-row>
                </v-form>
                <!-- TABLE -->
                <v-row no-gutters justify="center" justify-md="space-between" align="start" min-width="400">
                    <!-- TABEL TAMBAH/EDIT BAHAN -->
                    <v-responsive class="me-sm-2 me-0 " width="400">
                        <!-- ITEM DIALOG ADALAH KODE BARANG YANG SESUAI DENGAN KODE GROUP YANG DIPILIH -->
                        <DialogCard2 v-if="!edit" :produksi="true" :btn="btn[0]" width="400" :barang="detailbahan" :tambah="true" :getbarang="select_kode" :kodebarang="inputproduksi.kode_barang" :kodegroup="inputproduksi.kode_group" @pemasukanitem="bahanmasuk"/>
                        <v-row v-if="edit" no-gutters class="justify-center py-1 text-button rounded border">detail bahan</v-row>
                        <v-sheet class="border-sm rounded-lg mt-2 bg-transparent">
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
                        <template v-if="!edit" v-slot:item.jumlah="{ item }">
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
                                <v-sheet class="mx-auto mt-5 w-75 bg-transparent">
                                    <text-field-form
                                        v-if="edit"
                                        v-model="item.raw.jumlah"
                                        label="Jumlah"
                                        readonly
                                    />
                                    <currency-input
                                        v-if="!edit"
                                        v-model="item.raw.jumlah"
                                        label="Jumlah"
                                        :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                                    />
                                </v-sheet>
                                <v-divider class="mt-3 mb-5"></v-divider>
                                    <v-div v-if="!edit" class="d-flex me-5 ms-auto">
                                        <btn-cancel btn_title="Hapus" @click="deleteditem(item.raw, 'bahan'), dialogbhn[index] = false" class="me-2"></btn-cancel>
                                        <btn-orange btn_title="Simpan" type="submit" @click="dialogbhn[index] = false"></btn-orange>
                                    </v-div>
                                </template>
                            </DialogVue>
                        </template>
                        </VDataTable>
                        </v-sheet>
                    </v-responsive>
                    <!-- TABEL TAMBAH BARANG -->
                    <v-responsive class="mt-md-0 mt-2" width="400">
                        <DialogCard2 :produksi="true" v-if="!edit" :kodegroup="inputproduksi.kode_group" :btn="btn[1]" width="400" :barang="detailbarang" :getbarang="getbarang" :inputbahan="inputbahan" :tambah="true" :kodebarang="inputproduksi.kode_barang" @pemasukanitem="barangmasuk" />
                        <v-row v-if="edit" no-gutters class="justify-center py-1 text-button rounded border">detail barang</v-row>
                        <v-sheet class="border-sm rounded-lg mt-2 bg-transparent">
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
                            <template v-if="!edit" v-slot:item.jumlah="{ item }">
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
                                    <v-sheet class="mx-auto mt-5 w-75 bg-transparent">
                                        <text-field-form
                                            v-if="edit"
                                            v-model="item.raw.jumlah"
                                            label="Jumlah"
                                            readonly
                                        />
                                        <currency-input
                                            v-if="!edit"
                                            v-model="item.raw.jumlah"
                                            label="Jumlah"
                                            :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                                        />
                                    </v-sheet>
                                    <v-divider class="mt-3 mb-5"></v-divider>
                                        <v-div v-if="!edit" class="d-flex me-5 ms-auto">
                                            <btn-cancel btn_title="Hapus" @click="deleteditem(item.raw, 'bahan'), dialogbrg[index] = false, inputproduksi = []" class="me-2"></btn-cancel>
                                            <btn-orange btn_title="Simpan" type="submit" @click="dialogbrg[index] = false"></btn-orange>
                                        </v-div>
                                    </template>
                                </DialogVue>
                            </template> 
                        </VDataTable>
                        </v-sheet>
                    </v-responsive>
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

