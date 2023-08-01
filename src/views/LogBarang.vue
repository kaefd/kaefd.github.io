<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import TextButton from '../components/button/textButton.vue';
import laporan from '../service/page/laporan';
import functions from '../service/functions';
</script>
<script>
export default {
    components: {
        VDataTable,
        TextButton,
    },
    props: ['kode_group', 'barang', 'kode_barang', 'detail', 'groupbarang', 'logbrg'],
    data () {
      return {
        dialog: false,
        dialogbrg: [],
        log_brg: '',
        authority: '',
        headers: [
          { title: 'Kode Group', key: 'kode_group'},
          { title: 'Kategori Barang', key: 'kategori_barang'},
          { title: 'Kode Barang', key: 'kode_barang' },
          { title: 'Nama Barang', key: 'nama_barang' },
          { title: 'HS Kode', key: 'hs_code' },
          { title: 'Satuan', key: 'satuan' },
          { title: 'Stok Akhir', key: 'stok_akhir' },
          { title: '', key: 'actions'},
        ],
        subheaders: [
          { title: 'Tanggal', key: 'tanggal'},
          { title: 'Kode Group', key: 'kode_group'},
          { title: 'Kode Barang', key: 'kode_barang' },
          { title: 'Kategori', key: 'kategori'},
          { title: 'Keterangan', key: 'keterangan' },
          { title: 'Stok Awal', key: 'stok_awal' },
          { title: 'Stok Masuk', key: 'stok_masuk' },
          { title: 'Stok Keluar', key: 'stok_keluar' },
          { title: 'Stok Akhir', key: 'stok_akhir' },
          { title: '', key: 'actions'},
        ],

    }
    },
    computed: {
        
    },
    methods: {
        
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
          <text-button v-bind="props" icon="mdi-dots-vertical" />
        </template>
        <!-- dialog content -->
        <v-card class="bg-grey-lighten-5 w-100">
            <v-toolbar class="bg-blue-custom text-white" height="50">
                <text-button @click="dialog = false" icon="mdi-close" color="white"/>
                <v-toolbar-title class="text-button">DETAIL STOK BARANG</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-container>
            <v-sheet>
                <!-- TABEL DATA -->
                <v-data-table
                items-per-page="10"
                :headers="headers"
                :items="detail"
                :search="search"
                :hover="true"
                :fixed-header="true"
                density="compact"
                class="text-caption py-3"
                height="63vh"
                >
                <template v-slot:bottom>
                </template>
                 <!-- eslint-disable-next-line vue/valid-v-slot -->
                 <template v-slot:item.actions="{item, index}">
                    <text-button
                        @click="dialogbrg[index] = true"
                        icon="mdi-dots-vertical"
                    >
                    </text-button>
                    <v-dialog
                        v-model="dialogbrg[index]"
                        :scrim="false"
                        transition="dialog-bottom-transition"
                        fullscreen
                        >
                        <v-toolbar class="bg-blue-custom text-white" height="50">
                            <text-button @click="dialogbrg[index] = false" icon="mdi-close" color="white" />
                            <v-toolbar-title class="text-button">DETAIL LOG BARANG</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card>
                            <v-container>
                                <!-- TABEL DATA -->
                                <v-data-table
                                items-per-page="10"
                                :headers="subheaders"
                                :items="laporan.log(item.raw.kode_group, item.raw.kode_barang, logbrg)"
                                :search="search"
                                :hover="true"
                                :fixed-header="true"
                                density="compact"
                                class="text-caption py-3"
                                height="63vh"
                                >
                                <template v-slot:bottom>
                                </template>
                                <!-- eslint-disable-next-line vue/valid-v-slot -->
                                <template v-slot:item.tanggal="{item}">
                                    {{ functions.formatDate(item.raw.tanggal) }}
                                </template>
                                </v-data-table>
                            </v-container>
                        </v-card>
                    </v-dialog>
                </template>
                </v-data-table>
            </v-sheet>
            </v-container>
        </v-card>

    </v-dialog>
</template>

