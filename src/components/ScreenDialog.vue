<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import DialogCard2 from './DialogCard2.vue';
</script>

<script>
export default {
    components: {
    DialogCard2, VDataTable
},
    props:['pageTitle', 'edit', 'headers', 'items', 'actIcon', 'icon', 'btncolor', 'iVariant', 'headDetails', 'details','disable', 'btn', 'datatext', 'itemDetail', 'category'],
    data () {
      return {
        dialog: false,
        dialog2: false,
        dialog3: false,
      }
    },
}
</script>

<template>
    <v-dialog
          v-model="dialog"
          :scrim="false"
          transition="dialog-bottom-transition"
          fullscreen
        >
        <template v-slot:activator="{ props }">
            <!-- TAMBAH DATA -->
            <v-btn
            v-if="!edit"
            v-bind="props"
            class="text-body-2  rounded-lg"
            :color="btncolor"
            :icon="icon"
            :variant="iVariant"
            size="small"
            >
            </v-btn>

           <!-- LIHAT DATA -->
            <v-btn
            v-if="edit"
            v-bind="props"
            class="text-body-2  rounded-lg"
            :color="btncolor"
            :icon="icon"
            :variant="iVariant"
            height="30"
            width="30"
            >
            </v-btn>
          </template>
          
          <!-- dialog content -->
          <v-card>
            {{ items }}
                <v-toolbar class="bg-blue-darken-4">
                <v-btn
                    icon
                    dark
                    @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ 'DETAIL '+ pageTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>

                <v-container>
                        <v-row class="mt-1 w-100">
                            <v-div class="mx-sm-2 mx-auto" v-for="je, j in this.datatext" :key="j">
                                <v-if v-if="je.type == 'select'">
                                    <v-select
                                        :label="je.name"
                                        variant="outlined"
                                        density="compact"
                                        style="width: 250px;"
                                        @click="dialog3 = true"
                                    ></v-select>
                                </v-if>
                                <v-else-if v-else-if="je.type != 'select'">
                                    <v-text-field
                                        variant="outlined"
                                        :label="je.name"
                                        density="compact"
                                        :type="je.type"
                                        style="width: 250px;"                  
                                    >
                                    </v-text-field>
                                </v-else-if>
                            </v-div>
                        </v-row>                    
                        <!-- BUTTON TAMBAH BARANG -->
                        <v-container class="text-sm-left text-center">
                            <DialogCard2 :itemDetail="itemDetail" :btn="btn" width="400" :disabled="edit" />
                        </v-container>

                <!-- VIEW / EDIT BARANG TAMBAH -->
                <v-dialog
                    v-model="dialog3"
                    width="auto"
                >
                    <v-card class="px-7 py-5 mx-auto rounded-lg" width="400">
                        <v-card-title class="text-center">{{ dialItem.name }}</v-card-title>
                        <v-card-text>{{ dialItem.code }}</v-card-text>
                        <v-text-field
                            label="Jumlah"
                            variant="outlined"
                            density="compact"
                            :disabled="hiddenbtn"
                        />
                        <v-text-field
                            label="Jumlah Diterima"
                            variant="outlined"
                            density="compact"
                            :disabled="hiddenbtn"
                        />
                        <v-text-field
                            label="Nilai Total"
                            variant="outlined"
                            density="compact"
                            :disabled="hiddenbtn"
                        />
                        <v-btn variant="outlined" size="large" class="text-body-1 mb-2">Simpan</v-btn>
                        <v-btn @click="dialog2 = false" variant="outlined" size="large" class="text-body-1">Batal</v-btn>
                    </v-card>
                </v-dialog>

                    <!-- EDIT DATA -->
                    <v-data-table
                    :headers="headDetails"
                    :items="details"
                    :search="search"
                    :hover="true"
                    :fixed-header="true"
                    style="cursor: pointer"
                    density="comfortable"
                    class="text-body-2 py-3 px-5 rounded-select"
                    height="300"
                    >
                    <!-- dialog actions -->
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.actions="{item}">
                        <v-dialog v-model="dialog2">
                    <!-- button dialog -->
                    <template v-slot:activator="{ props }">
                        <v-btn
                        v-bind="props"
                        class="text-body-2  rounded-lg"
                        :color="actIcon[1].color"
                        :icon="actIcon[1].icon"
                        variant="plain"
                        size="small">
                        </v-btn>
                    </template>

                    <v-card class="px-7 py-5 mx-auto rounded-lg" width="400">
                        <v-btn @click="dialog2 = false" icon variant="text"><v-icon>mdi-close</v-icon></v-btn>
                        <v-card-title class="text-center mt-n5">{{ item.value.nameItem }}</v-card-title>
                        <v-card-subtitle class="text-center mb-2">{{ item.value.hscode }}</v-card-subtitle>
                        <v-text-field
                            v-model=item.value.jumlah
                            label="Jumlah"
                            variant="outlined"
                            density="comfortable"
                            :disabled="disable"
                            
                        />
                        <v-text-field
                            v-model=item.value.diterima
                            label="Jumlah Diterima"
                            variant="outlined"
                            density="comfortable"
                            :disabled="disable"
                        />
                        <v-text-field
                            v-model=item.value.totalnilai
                            label="Nilai Total"
                            variant="outlined"
                            density="comfortable"
                            :disabled="disable"
                        />
                        <v-div class="d-flex">
                            <v-btn :hidden="disable" color="blue-darken-4 btn-custom" size="large" class="text-body-1 btn-custom bg-blue-darken-4 w-75 me-3">Simpan</v-btn>
                            <v-btn :hidden="disable" size="large" variant="tonal" class="text-body-1 btn-custom w-auto">Hapus</v-btn>
                        </v-div>
                    </v-card>
                </v-dialog>
                    </template>
                    </v-data-table>
                <v-btn :hidden="disable" class="float-end text-body-2 text-white btn-custom" color="#ff6e40">Simpan</v-btn>
                <v-btn @click="dialog=false" class="float-end text-body-2 me-2 btn-custom" variant="outlined">Batal</v-btn>
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
    width: 150px;
    height: 45px !important;
}

</style>