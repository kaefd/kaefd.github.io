<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import VueDatePicker from '@vuepic/vue-datepicker';
import DialogCard2 from './DialogCard2.vue';

</script>

<script>
export default {
    components: {
    VDataTable,
    VueDatePicker,
    DialogCard2
},
    props:['headers', 'headItem', 'edit', 'getbarang', 'detailbahan', 'groupbarang', 'detailbarang', 'select_kode', 'item', 'items', 'category', 'icon', 'actIcon', 'btncolor', 'alpha', 'iVariant', 'screen', 'details','disable'],
    data () {
      return {
        dialog: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialog5: false,
        searched: '',
        inputbahan: '',
        inputbarang: '',
        inputproduksi: {
            no_produksi: '', 
            kode_group: '',
            tgl_produksi: '',
            tgl_input: ''
        },
        btn: ['Tambah Bahan', 'Tambah Barang']
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
        bahanmasuk(value) {
            this.inputbahan = value
        },
        barangmasuk(value) {
            this.inputbarang = value
        },
        produksimasuk() {
            return this.$emit('produksimasuk', this.inputproduksi, this.inputbahan, this.inputbarang)
        },
        input_kodegroup(value) {
            this.inputproduksi.kode_group = value
            this.$emit('input_kodegroup', this.inputproduksi.kode_group)
        },
        numb(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
            <v-btn
            v-if="edit"
            v-bind="props"
            class="text-body-2  rounded-lg"
            :color="actIcon[3].color"
            :icon="actIcon[3].icon"
            :variant="actIcon[3].variant"
            size="small">
            </v-btn>
            <v-btn
            v-if="!edit"
            v-bind="props"
            class="text-body-2 bg-blue-custom text-white rounded-xl elevation-0 text-caption"
            prepend-icon="mdi-plus"
            height="42"
            >
            Tambah Baru
            </v-btn>
          </template>
          <!-- dialog content -->
            <v-card>
                {{ inputproduksi }}
                <v-toolbar class="bg-blue-darken-4">
                <v-btn
                    icon
                    dark
                    @click="dialog = false"
                >
                <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>DETAIL PRODUKSI</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-container>
                <v-row class="row border-sm rounded-lg my-3">
                    <v-col class="w-100">
                        <!-- NOMOR PRODUKSI -->
                        <v-lable class="text-body-2">No Produksi</v-lable>
                        <v-text-field
                            v-if="edit"
                            density="compact"
                            readonly
                            variant="outlined"
                            :value="this.item.no_produksi"
                            />
                        <v-text-field
                            v-if="!edit"
                            density="compact"
                            readonly
                            variant="outlined"
                            v-model="inputproduksi.no_produksi"
                        />
                    </v-col>
                    <v-col class="w-100">
                        <!-- TANGGAL PRODUKSI -->
                        <v-label class="text-body-2 pe-7">Tgl Produksi</v-label>
                        <VueDatePicker v-if="!edit" v-model="inputproduksi.tgl_produksi" :enable-time-picker="false" calendar-class-name="dp-custom-calendar"/>
                        <v-text-field
                            v-if="edit"
                            density="compact"
                            readonly
                            variant="outlined"
                            :value="this.item.tgl_produksi"
                        />
                    </v-col>
                    <v-col class="w-100">
                        <!-- KODE GROUP -->
                        <v-label class="text-body-2 pe-7">Kode Group</v-label>
                            <v-text-field
                                v-if="edit" 
                                :value="this.item.kode_group"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                            >
                        </v-text-field>
                        <v-dialog v-if="!edit" v-model="dialog5" >
                            <template v-slot:activator="{ props }">
                                <v-text-field
                                v-bind="props"
                                v-model="inputproduksi.kode_group"
                                variant="outlined"
                                density="compact"
                                style="min-width: 200px; max-width:300px"
                                readonly
                                >
                            </v-text-field>
                        </template>
                            <v-card class="py-5 px-5 rounded-xl mx-auto" width="400">
                                <v-btn icon="mdi-close" variant="plain" @click="dialog5 = false"></v-btn>
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
                                        @click="input_kodegroup(kode.kode_group), inputproduksi.kode_barang = kode.kode_barang, dialog5 = false "
                                        >
                                            {{ kode.kode_group }}
                                        </v-list-item>
                                    </v-for>
                                </v-list>
                                </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
                <!-- TABLE -->
                <v-row>
                    <!-- TABEL TAMBAH/EDIT BAHAN -->
                    <v-col class="border-sm rounded-lg me-sm-3 me-0 mb-lg-0 mb-3">
                        <!-- ITEM DIALOG ADALAH KODE BARANG YANG SESUAI DENGAN KODE GROUP YANG DIPILIH -->
                        <DialogCard2 v-if="!edit" :btn="btn[0]" width="400" :barang="detailbahan" :tambah="true" :getbarang="select_kode" :kodebarang="inputproduksi.kode_barang" @pemasukanitem="bahanmasuk"/>
                        <VDataTable
                                :headers="this.edit ? headItem : headers"
                                :items=" this.edit ? detailbahan : inputbahan"
                                :hover="true"
                                :fixed-header="true"
                                density="compact"
                                class="text-body-2 py-3 px-5"
                                height="200"
                                >
                                <!-- eslint-disable-next-line vue/valid-v-slot -->
                                <template v-slot:item.jumlah = "{ item }">
                                    <td>{{ numb(item.raw.jumlah) }}</td>
                                </template>
                                <!-- eslint-disable-next-line vue/valid-v-slot -->
                                <template v-slot:item.actions="{ item }">
                                    <v-dialog v-model="dialog3">
                                        <template v-slot:activator="{ props }">
                                            <v-btn
                                                v-bind="props"
                                                :icon="actIcon[3].icon"
                                                :color="actIcon[3].color"
                                                :variant="actIcon[3].variant"
                                            ></v-btn>
                                        </template>
                                        <v-card class="px-7 py-5 mx-auto rounded-xl w-100" max-width="400">
                                        <v-card-title class="text-center">{{ item.raw.nama_barang }}</v-card-title>
                                        <v-span class="text-body-2 mt-n2 mb-3 text-center">{{ item.raw.kode_barang }}</v-span>
                                            <v-text-field
                                                v-model="item.raw.jumlah"
                                                label="Jumlah"
                                                variant="outlined"
                                                density="compact"
                                                readonly
                                            />
                                            <v-div v-if="!edit" class="d-inline w-100">
                                                <v-btn @click="this.inputbahan = [], dialog3 = false" variant="tonal" class="text-body-1 btn-custom w-auto rounded-e-0">Hapus</v-btn>
                                                <v-btn type="submit" @click="dialog3 = false" class="text-body-1 btn-custom bg-blue-darken-4 w-75 rounded-s-0">Simpan</v-btn>
                                            </v-div>
                                        </v-card> 
                                    </v-dialog>
                                </template>
                        </VDataTable>
                    </v-col>
                    <!-- TABEL TAMBAH BAHAN/BARANG -->
                    <v-col class="border-sm rounded-lg">
                        <DialogCard2 v-if="!edit" :btn="btn[1]" width="400" :barang="detailbarang" :getbarang="getbarang" :inputbahan="inputbahan" :tambah="true" :kodebarang="inputproduksi.kode_barang" @pemasukanitem="barangmasuk" />
                        <VDataTable
                            :headers="this.edit ? headItem : headers"
                            :items="this.edit ? detailbarang : inputbarang "
                            :hover="true"
                            :fixed-header="true"
                            density="compact"
                            class="text-body-2 py-3 px-5"
                            height="200">
                            <!-- eslint-disable-next-line vue/valid-v-slot -->
                            <template v-slot:item.jumlah = "{ item }">
                                <td>{{ numb(item.raw.jumlah) }}</td>
                            </template>
                            <!-- eslint-disable-next-line vue/valid-v-slot -->
                            <template v-slot:item.actions="{ item }">
                                <v-dialog v-model="dialog4">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            v-bind="props"
                                            :icon="actIcon[3].icon"
                                            :color="actIcon[3].color"
                                            :variant="actIcon[3].variant"
                                        ></v-btn>
                                    </template>
                                    <v-card class="px-7 py-5 mx-auto rounded-xl w-100" max-width="400">
                                    <v-card-title class="text-center">{{ item.raw.nama_barang }}</v-card-title>
                                    <v-span class="text-body-2 mt-n2 mb-3 text-center">{{ item.raw.kode_barang }}</v-span>
                                        <v-text-field
                                            v-model="item.raw.jumlah"
                                            label="Jumlah"
                                            variant="outlined"
                                            density="compact"
                                            readonly
                                        />
                                        <v-div v-if="!edit" class="d-inline w-100">
                                            <v-btn @click="this.inputbarang = [], dialog4 = false" variant="tonal" class="text-body-1 btn-custom w-auto rounded-e-0">Hapus</v-btn>
                                            <v-btn type="submit" @click="dialog4 = false" class="text-body-1 btn-custom bg-blue-darken-4 w-75 rounded-s-0">Simpan</v-btn>
                                        </v-div>
                                    </v-card> 
                                </v-dialog>
                            </template> 
                        </VDataTable>
                    </v-col>
                </v-row>
                    <!-- edit data -->
                <v-row class="float-end">
                    <v-btn :hidden="disable" class="me-3 mt-3 btn-custom" color="blue-darken-4">Simpan</v-btn>
                    <v-btn class="mt-3 btn-custom" variant="tonal" @click="dialog = false">Batal</v-btn>
                </v-row>
                </v-container>
            </v-card>

    </v-dialog>
</template>

