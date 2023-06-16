<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import DialogCard2 from './DialogCard2.vue';
// import api from '../api';

</script>

<script>
export default {
    components: {
    VDataTable,
    DialogCard2
},
    props:['headers', 'headItem', 'edit', 'getbarang', 'produksi', 'detailbahan', 'groupbarang', 'detailbarang', 'select_kode', 'produksi_bahan', 'produksi_barang', 'item', 'items', 'category', 'icon', 'actIcon', 'btncolor', 'alpha', 'iVariant', 'screen', 'details','disable'],
    data () {
      return {
        dialog: false,
        dialog2: false,
        dialogbhn: [],
        dialogbrg: [],
        confirmdialog: false,
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
            this.$emit('del', this.item, this.produksi_bahan, this.produksi_barang)
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
                <v-toolbar class="bg-blue-custom text-white" height="50">
                <v-btn
                    icon
                    dark
                    @click="dialog = false"
                    size="small"
                >
                <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="text-button">DETAIL PRODUKSI</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-container>
                <v-form  @submit.prevent ref="form" class="mb-5 mt-1">
                    <v-row class="row border-sm rounded-lg">
                        <v-col class="w-100 text-grey">
                            <!-- NOMOR PRODUKSI -->
                            <v-lable class="text-caption">No Produksi</v-lable>
                            <v-text-field
                                v-if="edit"
                                density="compact"
                                disabled
                                class="bg-grey-lighten-4"
                                variant="outlined"
                                :value="item.no_produksi"
                                hide-details
                                />
                            <v-text-field
                                v-if="!edit"
                                density="compact"
                                disabled
                                class="bg-grey-lighten-4"
                                variant="outlined"
                                hide-details
                                v-model="inputproduksi.no_produksi"
                            />
                        </v-col>
                        <v-col class="w-100">
                            <!-- TANGGAL PRODUKSI -->
                            <v-label class="text-body-2">Tgl Produksi</v-label>
                            <v-text-field
                                v-if="!edit"
                                type="date"
                                v-model="inputproduksi.tgl_produksi"
                                variant="outlined"
                                hide-details
                                :rules="required"
                                density="compact"
                                />
                            <v-text-field
                                v-if="edit"
                                type="date"
                                density="compact"
                                readonly
                                variant="outlined"
                                :rules="required"
                                :value="item.tgl_produksi"
                            />
                        </v-col>
                        <v-col class="w-100">
                            <!-- KODE GROUP -->
                            <v-label class="text-body-2">Kode Group</v-label>
                                <v-text-field
                                    v-if="edit" 
                                    :value="item.kode_group"
                                    variant="outlined"
                                    density="compact"
                                    style="min-width: 200px; max-width:300px"
                                    readonly
                                    :rules="required"
                                >
                            </v-text-field>
                            <v-dialog v-model="dialog5" >
                                <template v-slot:activator="{ props }">
                                    <v-text-field
                                    v-bind="props"
                                    v-model="inputproduksi.kode_group"
                                    variant="outlined"
                                    density="compact"
                                    style="min-width: 200px; max-width:300px"
                                    readonly
                                    :rules="required"
                                    hide-details
                                    >
                                </v-text-field>
                            </template>
                                <v-card class="py-5 px-5 rounded-xl mx-auto" width="400">
                                    <v-btn icon="mdi-close" variant="plain" @click="dialog5 = false"></v-btn>
                                    <v-card-title class="text-center text-blue-darken-4 mb-3 text-button font-weight-bold mt-n12">KODE GROUP</v-card-title>
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
                                        <v-for v-for="kode, i in filterkodegroup" :key="i">
                                            <v-list-item
                                            style="cursor: pointer;"
                                            class="text-caption"
                                            density="compact"
                                            @click="input_kodegroup(kode.kode_group), inputproduksi.kode_barang = kode.kode_barang, dialog5 = false "
                                            >
                                                <v-span class="font-weight-bold">{{ kode.kode_group }}</v-span> <br>
                                                <v-span class="text-small">stok akhir: {{ numb(kode.stok_akhir) }}</v-span>
                                            </v-list-item>
                                            <v-divider></v-divider>
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
                        <template v-slot:item.jumlah = "{ item }">
                            <td>{{ numb(item.raw.jumlah) }}</td>
                        </template>
                        <!-- eslint-disable-next-line vue/valid-v-slot -->
                        <template v-slot:item.actions="{ item, index }">
                            <v-dialog @update="dialogchild" v-model="dialogbhn[index]">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        :icon="actIcon[3].icon"
                                        :color="actIcon[3].color"
                                        :variant="actIcon[3].variant"
                                    ></v-btn>
                                </template>
                                <v-card class="px-7 py-5 mx-auto rounded-xl w-100" max-width="400">
                                <v-span class="text-button text-center font-weight-bold">{{ item.raw.nama_barang }}</v-span>
                                <v-span class="text-button mt-n2 mb-3 text-center">{{ item.raw.kode_barang }}</v-span>
                                    <v-text-field
                                        v-if="edit"
                                        v-model="item.raw.jumlah"
                                        label="Jumlah"
                                        variant="outlined"
                                        density="compact"
                                        readonly
                                    />
                                    <v-text-field
                                        v-if="!edit"
                                        v-model="item.raw.jumlah"
                                        label="Jumlah"
                                        variant="outlined"
                                        density="compact"
                                    />
                                    <v-div v-if="!edit" class="d-inline w-100">
                                        <v-btn @click="deleteditem(item.raw, 'bahan'), dialogbhn[index] = false" variant="tonal" class="text-caption rounded-xl elevation-0 w-auto me-3">Hapus</v-btn>
                                        <v-btn type="submit" @click="dialogbhn[index] = false" class="text-caption rounded-xl elevation-0 bg-blue-darken-4 w-75">Simpan</v-btn>
                                    </v-div>
                                </v-card> 
                            </v-dialog>
                        </template>
                        </VDataTable>
                    </v-col>
                    <!-- TABEL TAMBAH BARANG -->
                    <v-col class="border-sm rounded-lg">
                        <DialogCard2 :produksi="true" v-if="!edit" :kodegroup="inputproduksi.kode_group" :btn="btn[1]" width="400" :barang="detailbarang" :getbarang="getbarang" :inputbahan="inputbahan" :tambah="true" :kodebarang="inputproduksi.kode_barang" @pemasukanitem="barangmasuk" />
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
                            <template v-slot:item.jumlah = "{ item }">
                                <td>{{ numb(item.raw.jumlah) }}</td>
                            </template>
                            <!-- eslint-disable-next-line vue/valid-v-slot -->
                            <template v-slot:item.actions="{ item, index }">
                                <v-dialog @update="dialogbrg" v-model="dialogbrg[index]">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            v-bind="props"
                                            :icon="actIcon[3].icon"
                                            :color="actIcon[3].color"
                                            :variant="actIcon[3].variant"
                                        ></v-btn>
                                    </template>
                                    <v-card class="px-7 py-5 mx-auto rounded-xl w-100" max-width="400">
                                    <v-span class="text-button text-center font-weight-bold">{{ item.raw.nama_barang }}</v-span>
                                    <v-span class="text-button mt-n2 mb-3 text-center">{{ item.raw.kode_barang }}</v-span>
                                        <v-text-field
                                            v-model="item.raw.jumlah"
                                            label="Jumlah"
                                            variant="outlined"
                                            density="compact"
                                            readonly
                                        />
                                        <v-div v-if="!edit" class="d-inline w-100">
                                            <v-btn @click="deleteditem(item.raw, 'barang'), dialogbrg = false" variant="tonal" class="text-caption rounded-xl elevation-0 w-auto me-3">Hapus</v-btn>
                                            <v-btn type="submit" @click="dialogbrg = false" class="text-caption rounded-xl elevation-0 bg-blue-darken-4 w-75">Simpan</v-btn>
                                        </v-div>
                                    </v-card> 
                                </v-dialog>
                            </template> 
                        </VDataTable>
                    </v-col>
                </v-row>
                    <!-- edit data -->
                <v-row class="float-end">
                    <v-btn v-if="edit" class="mt-3 rounded-xl elevation-0 text-caption" height="42" width="150" variant="tonal" @click="confirmdialog=true">Batal Produksi</v-btn>
                    <v-btn v-if="!edit" class="mt-3 rounded-xl elevation-0 text-caption" height="42" width="150" variant="tonal" @click="inputbarang = inputbahan = '', dialog = false">Batal</v-btn>
                    <v-btn v-if="!edit" class="ms-3 mt-3 rounded-xl elevation-0 bg-blue-custom text-white text-caption" height="42" width="150" @click="validate">Simpan</v-btn>
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
                                @click=" inputbahan = inputbarang = [], confirm(), dialog= false, confirmdialog = false"
                                >
                                Ya
                                </v-btn>
                            </v-col>
                            </v-row>
                    </v-card>
                </v-dialog>

                </v-row>
                </v-container>
            </v-card>

    </v-dialog>
</template>

