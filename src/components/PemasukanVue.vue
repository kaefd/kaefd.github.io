<script>
export default {
    props:['datainput', 'edit', 'pemasukan', 'supplier', 'namaSupplier', 'filtersupplier', 'dataitem'],
    data () {
      return {
        inputdata : this.datainput,
        dialogtambah: false,
        searched: ''
      }
    }
}
</script>

<template>
        <v-row v-if="!this.edit && this.pemasukan">
            <!-- PEMASUKAN ITEM -->
            <v-col>
                <v-text-field
                    label="No Pemasukan"
                    v-model= "inputdata.no_pembelian"
                    variant="outlined"
                    density="compact"
                    style="min-width: 200px; max-width:300px"
                    readonly
                >
                </v-text-field>
                <VueDatePicker
                    placeholder="Tgl Pemasukan"
                    v-model="inputdata.tgl_pembelian"
                    :enable-time-picker="false"
                    style="min-width: 200px; max-width:300px"
                    class="mb-6"
                />
                <!-- SUPPLIER -->
                <v-dialog v-if="!edit" v-model="dialogtambah">
                    <template v-slot:activator="{props}">
                        <v-text-field
                            v-bind="props"
                            label="Supplier"
                            v-model="inputdata.nama_supplier"
                            variant="outlined"
                            density="compact"
                            style="min-width: 200px; max-width:300px"
                            class="mb-5"
                            hide-details
                        >
                    </v-text-field>
                    <v-span v-if="valid" class="text-red-darken-3">harus diisi !</v-span>

                    </template>
                    
                    <v-card class="py-5 px-5 rounded-xl mx-auto" width="400">
                        <v-btn icon="mdi-close" variant="plain" @click="dialogtambah = false"></v-btn>
                        <v-card-title class="text-center text-blue-darken-4 mb-3">SUPPLIER</v-card-title>
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
                                @click="inputdata.nama_supplier = s.nama, dialogtambah = false "
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
                <v-select
                    label="Tipe Dokumen"
                    v-model="inputdata.tipe_dokumen"
                    :items="tipe_dokumen"
                    variant="outlined"
                    density="compact"
                    style="min-width: 200px; max-width:300px"
                >
                </v-select>
                <v-text-field
                    label="No Dokumen"
                    v-model="inputdata.no_dokumen"
                    variant="outlined"
                    density="compact"
                    style="min-width: 200px; max-width:300px"
                >
                </v-text-field>
                <VueDatePicker
                    placeholder="Tgl Dokumen"
                    :enable-time-picker="false"
                    v-model="inputdata.tgl_dokumen"
                    style="min-width: 200px; max-width:300px"
                    class="mb-6"
                />
            </v-col>
            <v-col>
                <v-text-field
                    label="No Invoice"
                    v-model="inputdata.no_invoice"
                    variant="outlined"
                    density="compact"
                    style="min-width: 200px; max-width:300px"
                >
                </v-text-field>
                <v-text-field
                    label="No BL"
                    v-model="inputdata.no_bl"
                    variant="outlined"
                    density="compact"
                    style="min-width: 200px; max-width:300px"
                >
                </v-text-field>
                <v-text-field
                    label="Mata Uang"
                    v-model="inputdata.mata_uang"
                    variant="outlined"
                    density="compact"
                    style="min-width: 200px; max-width:300px"
                >
                </v-text-field>
                <v-text-field
                    label="Kurs"
                    v-model="inputdata.kurs"
                    variant="outlined"
                    density="compact"
                    style="min-width: 200px; max-width:300px"
                >
                </v-text-field>
            </v-col>
    </v-row>
                    </template>