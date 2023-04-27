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
    props:['headers', 'items', 'category', 'icon', 'actIcon', 'btncolor', 'alpha', 'iVariant', 'screen', 'headDetails', 'details','disable'],
    data () {
      return {
        dialog: false,
        dialog2: false,
        date: '',
        btn: ['Tambah Bahan', 'Tambah Barang']
      }
    },
    methods: {
        codeG() {

            let c = []
            for (let i = 0; i < this.items.length; i++) {
                c.push(this.items[i].codeGroup)
            }

            return c
        }
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
    <!-- button dialog -->
          <template v-slot:activator="{ props }">
            <v-btn
            v-bind="props"
            class="text-body-2  rounded-lg"
            :color="btncolor"
            :icon="icon"
            :variant="iVariant"
            size="small">
            </v-btn>
          </template>
          <!-- dialog content -->
          <v-card>
                <v-toolbar>
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
                    <v-col cols="2" class="mt-5">
                        <v-text-field
                            label="No Produksi"
                            density="compact"
                            disabled
                            variant="outlined"
                            />
                    </v-col>
                    <v-col class="d-flex align-center">
                        <v-label class="text-body-2 pe-5">Tgl Produksi</v-label>
                        <VueDatePicker v-model="date" :enable-time-picker="false" />
                    </v-col>
                    <v-col class="mt-5">
                        <!-- <DialogCard2 width="500"/> -->
                        <v-select
                            label="Kode Group"
                            density="compact"
                            variant="outlined"
                            :items="codeG()"
                        ></v-select>
                    </v-col>
                </v-row>
                <!-- table barang -->
                <v-row class="mb-2">
                    <v-col class="border-sm rounded-lg me-3">
                        <DialogCard2 :btn="btn[0]" width="400"/>
                        <VDataTable
                        :headers="headers"
                        :items="fastItem"
                        :hover="true"
                        :fixed-header="true"
                        density="compact"
                        class="text-body-2 py-3 px-5"
                        height="200"
                        >
                        </VDataTable>
                    </v-col>
                    <v-col class="border-sm rounded-lg">
                        <DialogCard2 :btn="btn[1]" width="400"/>
                        <VDataTable
                        :headers="headers"
                        :items="fastItem"
                        :hover="true"
                        :fixed-header="true"
                        density="compact"
                        class="text-body-2 py-3 px-5"
                        height="200"
                            />
                    </v-col>
                </v-row>
                    <!-- edit data -->
                <v-btn :hidden="disable" class="float-end" size="large" color="blue-darken-4">Simpan</v-btn>
                <v-btn class="float-end me-2" size="large" variant="outlined" @click="dialog = false">Batal</v-btn>
                </v-container>
            </v-card>

    </v-dialog>
</template>

