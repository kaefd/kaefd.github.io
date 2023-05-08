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
                        <v-lable class="text-body-2">No Produksi</v-lable>
                        <v-text-field
                            density="compact"
                            disabled
                            variant="solo"
                            class="rounded-select"
                            />
                    </v-col>
                    <v-col class="w-100">
                        <v-label class="text-body-2 pe-7">Tgl Produksi</v-label>
                        <VueDatePicker v-model="date" :enable-time-picker="false" calendar-class-name="dp-custom-calendar"/>
                    </v-col>
                    <v-col class="w-100">
                        <v-label class="text-body-2 pe-7">Kode Group</v-label>
                        <v-select
                            density="compact"
                            variant="solo"
                            :items="codeG()"
                            class="rounded-select"
                        ></v-select>
                    </v-col>
                </v-row>
                <!-- table barang -->
                <v-row>
                    <v-col class="border-sm rounded-lg me-3">
                        <DialogCard2 :btn="btn[0]" width="400"/>
                        <VDataTable
                        :headers="headers"
                        :items="fastItem"
                        :hover="true"
                        :fixed-header="true"
                        density="compact"
                        class="text-body-2 py-3 px-5 rounded-select"
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
                        class="text-body-2 py-3 px-5 rounded-select"
                        height="200"
                            />
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

