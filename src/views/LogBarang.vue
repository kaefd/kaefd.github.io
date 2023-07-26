<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import api from '../service/api';
import TextButton from '../components/button/textButton.vue';
import otoritas from '../service/page/otoritas';
</script>
<script>
export default {
    components: {
        VDataTable,
        TextButton,
    },
    props: ['kode_group', 'barang', 'kode_barang', 'stokbarang', 'groupbarang'],
    data () {
      return {
        dialog: false,
        dialogbrg: false,
        logbrg: '',
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
          { title: 'Stok Awal', key: 'stok_masuk' },
          { title: 'Stok Keluar', key: 'stok_keluar' },
          { title: 'Stok Akhir', key: 'stok_akhir' },
          { title: '', key: 'actions'},
        ],

    }
    },
    computed: {
        items () {
        let a = []
            for (let i = 0; i < this.stokbarang.length; i++) {
                for (let j = 0; j < this.barang.length; j++) {
                    if(this.stokbarang[i].kode_barang == this.kode_barang) {
                        if(this.stokbarang[i].kode_barang == this.barang[j].kode_barang) {
                            a.push({
                                kode_group: '',
                                kategori_barang: this.barang[j].kategori_barang,
                                kode_barang: this.kode_barang,
                                nama_barang: this.barang[j].nama_barang,
                                hs_code: this.barang[j].hs_code,
                                satuan: this.barang[j].satuan,
                                stok_akhir: this.stokbarang[i].stok_akhir
                            })
                        }
                    }
                }
            }
            return a
        }
    },
    // async created() {
    //     let user = localStorage.getItem('user')
    //     if(user != null) {
    //     let otority = await api.getOtoritas(user)
    //     this.authority = otoritas.otoritas(otority)
    //   }
    //   if(this.authority == '') {
    //     return  await api.logout()
    //   }
    // },
    methods: {
        async fetchData() {
            this.logbrg = await api.getLogBarang()
        },
        kodegroup(v) {
            let a = []
            for (let i = 0; i < this.groupbarang.length; i++) {
                if(this.groupbarang[i].kode_barang == v) {
                    a.push(this.groupbarang[i].kode_group)
                }
            }
            return a
        },
        log(kodegroup, kodebrg) {
            let a = []
            for (let i = 0; i < this.logbrg.length; i++) {
                if(this.logbrg[i].kode_group == kodegroup && this.logbrg[i].kode_barang == kodebrg) {
                    a.push(this.logbrg[i])
                }
            }
            this.log_brg = a
        }
    },
    mounted() {
        this.fetchData()
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
                :items="items"
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
                <template v-slot:item.kode_group="{item, index}">
                    {{ kodegroup(item.raw.kode_barang)[index] }}
                </template>
                 <!-- eslint-disable-next-line vue/valid-v-slot -->
                 <template v-slot:item.actions="{item, index}">
                    <text-button
                        @click="dialogbrg = true, log(kodegroup(item.raw.kode_barang)[index], item.raw.kode_barang)"
                        icon="mdi-dots-vertical"
                    >
                    </text-button>
                    <v-dialog
                        v-model="dialogbrg"
                        :scrim="false"
                        transition="dialog-bottom-transition"
                        fullscreen
                        >
                        <v-toolbar class="bg-blue-custom text-white" height="50">
                            <text-button @click="dialogbrg = false" icon="mdi-close" color="white" />
                            <v-toolbar-title class="text-button">DETAIL LOG BARANG</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card>
                            <v-sheet>
                                <!-- TABEL DATA -->
                                <v-data-table
                                items-per-page="10"
                                :headers="subheaders"
                                :items="log_brg"
                                :search="search"
                                :hover="true"
                                :fixed-header="true"
                                density="compact"
                                class="text-caption py-3"
                                height="63vh"
                                >
                                <template v-slot:bottom>
                                </template>
                                </v-data-table>
                            </v-sheet>
                        </v-card>
                    </v-dialog>
                </template>
                </v-data-table>
            </v-sheet>
            </v-container>
        </v-card>

    </v-dialog>
</template>

