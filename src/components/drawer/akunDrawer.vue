<script setup>
import api from '../../service/api'
</script>
<script>
import CheckBox from '../form/checkBox.vue'

export default {
    components: {
    CheckBox
},
    props: ['icon', 'user'],
    data() {
        return {
            filter: false,
        }
    },
    methods: {
        filtered() {
            this.$emit('close', false)
        },
        reset() {
            this.$emit('reset')
        },
        filterdata() {
            this.$emit('filterdata')
            return this.filtered()
        }
    }
}
</script>

<template>
<v-navigation-drawer class="border-0 elevation-0" location="right" width="300" temporary>
    <v-sheet class="pt-5 w-100 h-100">
        <div class="absolute px-3 border-start bg-orange-lighten-3 w-75 py-2 rounded-right">Profil Pengguna</div>
            <div class="d-flex align-center justify-center w-100 h-100">
                <div class="d-flex flex-column align-center w-100 h-100 pt-16">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="photo" class="rounded-circle" style="width: 100px;">
                    <h7 class="text-capitalize mt-3">{{user}}</h7>
                    <h7 class="text-caption">{{user}}</h7>
                    <v-btn @click="$router.push('/set')" class="mt-5 text-caption rounded-xl border" width="200px" variant="text">Ubah Password</v-btn>
                    <v-btn @click="api.logout()" class="mt-1 text-caption rounded-xl border" width="200px" variant="text">Log Out</v-btn>
                    <div class="w-100 h-100 px-7 d-flex flex-column justify-space-between">
                        <!-- <div class="font-weight-medium text-center text-grey-darken-3 mt-5">Otoritas</div>
                        <v-list density="compact">
                            <v-list-item class="text-caption list-u mb-1 w-100 rounded-xl">
                                <v-icon color="orange">mdi-security</v-icon><span class="ms-2">Master</span> <br />
                            </v-list-item>
                            <v-list-item class="text-caption list-u mb-1 w-100 rounded-xl">
                                <v-icon color="orange">mdi-security</v-icon><span class="ms-2">Pemasukan</span> <br />
                            </v-list-item>
                            <v-list-item class="text-caption list-u mb-1 w-100 rounded-xl">
                                <v-icon color="orange">mdi-security</v-icon><span class="ms-2">Produksi</span> <br />
                            </v-list-item>
                            <v-list-item class="text-caption list-u mb-1 w-100 rounded-xl">
                                <v-icon color="orange">mdi-security</v-icon><span class="ms-2">Pengeluaran</span> <br />
                            </v-list-item>
                            <v-list-item class="text-caption list-u mb-1 w-100 rounded-xl">
                                <v-icon color="orange">mdi-security</v-icon><span class="ms-2">Pengiriman</span> <br />
                            </v-list-item>
                            <v-list-item class="text-caption list-u mb-1 w-100 rounded-xl">
                                <v-icon color="orange">mdi-security</v-icon><span class="ms-2">Laporan</span> <br />
                            </v-list-item>
                        </v-list> -->
                        <v-spacer></v-spacer>
                        <!-- <v-btn variant="text" class="border mb-5" height="45">
                            <v-icon class="me-3">mdi-logout</v-icon>
                            Log Out
                        </v-btn> -->
                    </div>
                </div>
        </div>
    </v-sheet>
</v-navigation-drawer>
</template>
<style scoped>
.v-input--density-compact.customdense {
    --v-input-control-height: 10px;
    --v-input-padding-top: 8px;
}
.c-small {
  display:  block !important;
  font-size: 10px !important;
  text-align: center !important;
}
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background: inherit !important;
}
.list-u:hover {
    background: #ffd90063;
}
</style>