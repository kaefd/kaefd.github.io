<script setup>
import BtnOrange from '../components/button/btnOrange.vue';
import textFieldForm from '../components/form/textFieldForm.vue';
import otoritas from '../service/page/otoritas';
</script>

<script>
export default {
  components: { textFieldForm, BtnOrange },
    props: ['editdata', 'otority', 'tambahUser', 'user_otoritas', 'j_otoritas', 'userselect'],
    data() {
        return {
            confirmdialog: false,
            edit: this.editdata,
            tambah: this.tambahUser,
            ds: {},
            open: [],
            databarang: [
                {title: 'Data Barang', key: 'data_barang'},
                {title: 'Tambah Barang Baru', key: 'tambah_barang'},
                {title: 'Ubah Barang', key: 'ubah_barang'},
                {title: 'Hapus Barang', key: 'hapus_barang'},
            ]

        }
    },
   
    computed:{
        edituser() {
            let username = this.userselect
            let password = ''
            let data_barang = []
            let data_pelanggan = []
            let data_supplier = []
            let data_user = []
            let pembelian = []
            let produksi = []
            let penjualan = []
            let pengiriman = []
            let laporan = []
            // let laporan_stok = []
            // let laporan_pembelian = []
            // let laporan_produksi = []
            // let laporan_penjualan = []
            // let laporan_log = []
            for (let i = 0; i < otoritas.data_barang.length; i++) {
                data_barang.push({
                    jenis_otoritas: otoritas.data_barang[i],
                    status: this.edit ? otoritas.routes(this.otority, otoritas.data_barang[i]) : false
                })
            }
            for (let i = 0; i < otoritas.data_pelanggan.length; i++) {
                data_pelanggan.push({
                    jenis_otoritas: otoritas.data_pelanggan[i],
                    status: this.edit ? otoritas.routes(this.otority, otoritas.data_pelanggan[i]) : false
                })
            }
            for (let i = 0; i < otoritas.data_supplier.length; i++) {
                data_supplier.push({
                    jenis_otoritas: otoritas.data_supplier[i],
                    status: this.edit ? otoritas.routes(this.otority, otoritas.data_supplier[i]) : false
                })
            }
            for (let i = 0; i < otoritas.data_user.length; i++) {
                data_user.push({
                    jenis_otoritas: otoritas.data_user[i],
                    status: this.edit ? otoritas.routes(this.otority, otoritas.data_user[i]) : false
                })
            }
            for (let i = 0; i < otoritas.pembelian.length; i++) {
                pembelian.push({
                    jenis_otoritas: otoritas.pembelian[i],
                    status: this.edit ? otoritas.routes(this.otority, otoritas.pembelian[i]) : false
                })
            }
            for (let i = 0; i < otoritas.produksi.length; i++) {
                produksi.push({
                    jenis_otoritas: otoritas.produksi[i],
                    status: this.edit ? otoritas.routes(this.otority, otoritas.produksi[i]) : false
                })
            }
            for (let i = 0; i < otoritas.penjualan.length; i++) {
                penjualan.push({
                    jenis_otoritas: otoritas.penjualan[i],
                    status: this.edit ? otoritas.routes(this.otority, otoritas.penjualan[i]) : false
                })
            }
            for (let i = 0; i < otoritas.pengiriman.length; i++) {
                pengiriman.push({
                    jenis_otoritas: otoritas.pengiriman[i],
                    status: this.edit ? otoritas.routes(this.otority, otoritas.pengiriman[i]) : false
                })
            }
            for (let i = 0; i < otoritas.laporan.length; i++) {
                laporan.push({
                    jenis_otoritas: otoritas.laporan[i],
                    status: this.edit ? otoritas.routes(this.otority, otoritas.laporan[i]) : false
                })
            }
            // for (let i = 0; i < otoritas.laporan_stok.length; i++) {
            //     laporan_stok.push({
            //         jenis_otoritas: otoritas.laporan_stok[i],
            //         status: this.edit ? otoritas.routes(this.otority, otoritas.laporan_stok[i]) : false
            //     })
            // }
            // for (let i = 0; i < otoritas.laporan_pembelian.length; i++) {
            //     laporan_pembelian.push({
            //         jenis_otoritas: otoritas.laporan_pembelian[i],
            //         status: this.edit ? otoritas.routes(this.otority, otoritas.laporan_pembelian[i]) : false
            //     })
            // }
            // for (let i = 0; i < otoritas.laporan_produksi.length; i++) {
            //     laporan_produksi.push({
            //         jenis_otoritas: otoritas.laporan_produksi[i],
            //         status: this.edit ? otoritas.routes(this.otority, otoritas.laporan_produksi[i]) : false
            //     })
            // }
            // for (let i = 0; i < otoritas.laporan_penjualan.length; i++) {
            //     laporan_penjualan.push({
            //         jenis_otoritas: otoritas.laporan_penjualan[i],
            //         status: this.edit ? otoritas.routes(this.otority, otoritas.laporan_penjualan[i]) : false
            //     })
            // }
            // for (let i = 0; i < otoritas.laporan_log.length; i++) {
            //     laporan_log.push({
            //         jenis_otoritas: otoritas.laporan_log[i],
            //         status: this.edit ? otoritas.routes(this.otority, otoritas.laporan_log[i]) : false
            //     })
            // }
            return this.ds = {
                username: username,
                password: password,
                data_barang: data_barang,
                data_pelanggan: data_pelanggan,
                data_supplier: data_supplier,
                data_user: data_user,
                pembelian: pembelian,
                produksi: produksi,
                penjualan: penjualan,
                pengiriman: pengiriman,
                laporan: laporan,
                // laporan_stok: laporan_stok,
                // laporan_pembelian: laporan_pembelian,
                // laporan_produksi: laporan_produksi,
                // laporan_penjualan: laporan_penjualan,
                // laporan_log: laporan_log
            }
        }
    },
    methods: {
        submit() {
            return this.$emit('submitUser', this.ds)
        }
    },
    mounted() {
    }
}
</script>
<template>
    <v-dialog v-model="detail" max-width="400" transition="dialog-bottom-transition">
        <v-card class="rounded-xl pa-3 vh-100">
          <v-span class="mx-auto text-button font-weight-bold text-orange">DETAIL USER</v-span>
          <v-divider></v-divider>
            <v-container class="d-flex flex-column align-center w-100 h-100">
                <v-avatar class="bg-blue-custom" size="70">
                <v-icon size="50">mdi-account</v-icon>
                </v-avatar>
                <v-div class="w-100">
                    <text-field-form label="Username" :model-value="userselect" v-model="ds.username" :readonly="edit ? true : false" :disabled="edit ? true : false " class="w-75 my-3 mx-auto"/>
                    <text-field-form label="Password" v-model="ds.password" class="w-75 mx-auto"/>
                </v-div>
                <v-span class="text-grey mx-auto text-button">OTORITAS</v-span>
                <v-div class="overflow-auto vh-45 w-100">
                    <!-- DATA BARANG -->
                    <v-list v-model:opened="open[0]" density="compact" class="w-100 pa-0">
                        <v-list-group value="Data Barang" class="text-caption">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props">
                                    <v-checkbox color="orange" class="radio-small customdense" :label="edituser.data_barang[0].jenis_otoritas" :model-value="edituser.data_barang[0].status" v-model="ds.data_barang[0].status" hide-details density="compact"/>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="barang, b in edituser.data_barang.slice(1, edituser.data_barang.length)" :key="b">
                                <v-checkbox color="orange" class="radio-small customdense" :label="barang.jenis_otoritas" :model-value="barang.status" v-model="ds.data_barang[b+1].status" hide-details density="compact"/>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                    <!-- DATA PELANGGAN -->
                    <v-list v-model:opened="open[1]" density="compact" class="w-100 pa-0">
                        <v-list-group value="Data Pelanggan" class="text-caption">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props">
                                    <v-checkbox color="orange" class="radio-small customdense" :label="edituser.data_pelanggan[0].jenis_otoritas" :model-value="edituser.data_pelanggan[0].status" v-model="ds.data_pelanggan[0].status" hide-details density="compact"/>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="barang, b in edituser.data_pelanggan.slice(1, edituser.data_pelanggan.length)" :key="b">
                                <v-checkbox color="orange" class="radio-small customdense" :label="barang.jenis_otoritas" :model-value="barang.status" v-model="ds.data_pelanggan[b+1].status" hide-details density="compact"/>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                    <!-- DATA SUPPLIER -->
                    <v-list v-model:opened="open[2]" density="compact" class="w-100 pa-0">
                        <v-list-group value="Data Supplier" class="text-caption">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props">
                                    <v-checkbox color="orange" class="radio-small customdense" :label="edituser.data_supplier[0].jenis_otoritas" :model-value="edituser.data_supplier[0].status" v-model="ds.data_supplier[0].status" hide-details density="compact"/>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="barang, b in edituser.data_supplier.slice(1, edituser.data_supplier.length)" :key="b">
                                <v-checkbox color="orange" class="radio-small customdense" :label="barang.jenis_otoritas" :model-value="barang.status" v-model="ds.data_supplier[b+1].status" hide-details density="compact"/>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                    <!-- DATA USER -->
                    <v-list v-model:opened="open[3]" density="compact" class="w-100 pa-0">
                        <v-list-group value="Data User" class="text-caption">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props">
                                    <v-checkbox color="orange" class="radio-small customdense" :label="edituser.data_user[0].jenis_otoritas" :model-value="edituser.data_user[0].status" v-model="ds.data_user[0].status" hide-details density="compact"/>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="barang, b in edituser.data_user.slice(1, edituser.data_user.length)" :key="b">
                                <v-checkbox color="orange" class="radio-small customdense" :label="barang.jenis_otoritas" :model-value="barang.status" v-model="ds.data_user[b+1].status" hide-details density="compact"/>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                    <!-- DATA PEMASUKAN -->
                    <v-list v-model:opened="open[4]" density="compact" class="w-100 pa-0">
                        <v-list-group value="Pembelian" class="text-caption">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props">
                                    <v-checkbox color="orange" class="radio-small customdense" label="Pemasukan" :model-value="edituser.pembelian[0].status" v-model="ds.pembelian[0].status" hide-details density="compact"/>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="barang, b in edituser.pembelian.slice(1, edituser.pembelian.length)" :key="b">
                                <v-checkbox color="orange" class="radio-small customdense" :label="barang.jenis_otoritas" :model-value="barang.status" v-model="ds.pembelian[b+1].status" hide-details density="compact"/>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                    <!-- DATA PRODUKSI -->
                    <v-list v-model:opened="open[5]" density="compact" class="w-100 pa-0">
                        <v-list-group value="Produksi" class="text-caption">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props">
                                    <v-checkbox color="orange" class="radio-small customdense" label="Produksi" :model-value="edituser.produksi[0].status" v-model="ds.produksi[0].status" hide-details density="compact"/>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="barang, b in edituser.produksi.slice(1, edituser.produksi.length)" :key="b">
                                <v-checkbox color="orange" class="radio-small customdense" :label="barang.jenis_otoritas" :model-value="barang.status" v-model="ds.produksi[b+1].status" hide-details density="compact"/>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                    <!-- DATA PENGELUARAN -->
                    <v-list v-model:opened="open[6]" density="compact" class="w-100 pa-0">
                        <v-list-group value="Pengeluaran" class="text-caption">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props">
                                    <v-checkbox color="orange" class="radio-small customdense" label="Pengeluaran" :model-value="edituser.penjualan[0].status" v-model="ds.penjualan[0].status" hide-details density="compact"/>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="barang, b in edituser.penjualan.slice(1, edituser.penjualan.length)" :key="b">
                                <v-checkbox color="orange" class="radio-small customdense" :label="barang.jenis_otoritas" :model-value="barang.status" v-model="ds.penjualan[b+1].status" hide-details density="compact"/>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                    <!-- DATA PENGIRIMAN -->
                    <v-list v-model:opened="open[7]" density="compact" class="w-100 pa-0">
                        <v-list-group value="Pengiriman" class="text-caption">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props">
                                    <v-checkbox color="orange" class="radio-small customdense" label="Pengiriman" :model-value="edituser.pengiriman[0].status" v-model="ds.pengiriman[0].status" hide-details density="compact"/>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="barang, b in edituser.pengiriman.slice(1, edituser.pengiriman.length)" :key="b">
                                <v-checkbox color="orange" class="radio-small customdense" :label="barang.jenis_otoritas" :model-value="barang.status" v-model="ds.pengiriman[b+1].status" hide-details density="compact"/>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                    <!-- LAPORAN -->
                    <v-list v-model:opened="open[8]" density="compact" class="w-100 pa-0">
                        <v-list-group value="Laporan" class="text-caption">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props">
                                    <v-checkbox color="orange" class="radio-small customdense" label="Laporan" :model-value="edituser.laporan[0].status" v-model="ds.laporan[0].status" hide-details density="compact"/>
                                </v-list-item>
                            </template>
                            <v-list-item v-for="barang, b in edituser.laporan.slice(1, edituser.laporan.length)" :key="b">
                                <v-checkbox color="orange" class="radio-small customdense" :label="barang.jenis_otoritas" :model-value="barang.status" v-model="ds.laporan[b+1].status" hide-details density="compact"/>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-div>
                <v-spacer></v-spacer>
                <v-div class="d-flex ms-auto">
                    <slot name="cancel"></slot>
                    <btn-orange @click="submit()" btn_title="Simpan" />
                </v-div>
            </v-container>
        </v-card>
      </v-dialog>
</template>
<style scoped>
.v-input--density-compact.customdense {
    --v-input-control-height: 10px;
    --v-input-padding-top: 8px;
}
.radio-small {
  display:  block !important;
  font-size: 10px !important;
  text-align: center !important;
}
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background: inherit !important;
}
</style>