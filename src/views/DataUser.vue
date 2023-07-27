<script setup>
import { defineComponent } from 'vue';
import BtnCancel from '../components/button/btnCancel.vue';
import BtnInfo from '../components/button/btnInfo.vue';
import BtnOrange from '../components/button/btnOrange.vue';
import TextButton from '../components/button/textButton.vue';
import AlertVue from '../components/dialog/alertVue.vue';
import DialogConfirm from '../components/dialog/dialogConfirm.vue';
import TextFieldForm from '../components/form/textFieldForm.vue';
import api from '../service/api';
import otoritas from '../service/page/otoritas';

</script>
<script>
  export default defineComponent({
    props:['user', 'cetak'],
    name:'UserView',
    components: {
        BtnInfo,
        TextButton,
        TextFieldForm,
        BtnCancel,
        BtnOrange,
        AlertVue,
        DialogConfirm,
    },
    data () {
      return {
        drawer: false,
        detail: false,
        confirmdialog: false,
        edit: null,
        tambah: null,
        pageTitle: 'DATA USER',
        tab: null,
        valert: false,
        message: '',
        status: null,
        username: '',
        password: '',
        otority: '',
        authority: '',
        dialogotoritas: [],
        userselect: '',
        open: ['barang', 'Laporan'],
        scrollInvoked: 0,
        items: '',
        jns_otoritas: ['Data Barang', 'Data Pelanggan', 'Data Supplier', 'Data User', 'Pembelian', 'Produksi', 'Penjualan', 'Pengiriman', 'Laporan' ],
        user_otoritas: '',
        headers: [
          {title: "Jenis Otoritas", key: "jenis_otoritas"},
          {title: "Tambah Data", key: "tambah"},
          {title: "Edit Data", key: "edit"},
          {title: "Batal/Hapus Data", key: "hapus"},
        ],
        ds: {},
        us: '',
        j_otoritas: {
          username: '',
          password: '',
          data_barang: false,
          tambah_barang: false,
          ubah_barang: false,
          Hapus_barang: false,
          pelanggan: false,
          tambah_pelanggan_baru: false,
          ubah_pelanggan: false,
          hapus_pelanggan: false,
          supplier: false,
          user: false,
          pembelian: false,
          produksi: false,
          penjualan: false,
          pengiriman: false,
          laporan: false,
          laporan_stok_barang: false,
          laporan_pemasukan: false,
          laporan_produksi: false,
          laporan_pengeluaran: false,
          laporan_pengiriman: false,
          laporan_log_user: false,
        }
      }
    },
    computed: {
      edituser() {
          return this.ds = {
            username: this.userselect,
            password: '',
            data_barang: Boolean(otoritas.routes(this.user_otoritas, 'Data Barang')),
            tambah_barang: Boolean(otoritas.routes(this.user_otoritas, 'Tambah Barang Baru')),
            ubah_barang: Boolean(otoritas.routes(this.user_otoritas, 'Ubah Barang')),
            hapus_barang: Boolean(otoritas.routes(this.user_otoritas, 'Hapus Barang')),
            data_pelanggan: Boolean(otoritas.routes(this.user_otoritas, 'Data Pelanggan')),
            tambah_pelanggan: Boolean(otoritas.routes(this.user_otoritas, 'Tambah Pelanggan Baru')),
            ubah_pelanggan: Boolean(otoritas.routes(this.user_otoritas, 'Ubah Pelanggan')),
            hapus_pelanggan: Boolean(otoritas.routes(this.user_otoritas, 'Hapus Pelanggan')),
            data_supplier: Boolean(otoritas.routes(this.user_otoritas, 'Data Supplier')),
            data_user: Boolean(otoritas.routes(this.user_otoritas, 'Data User')),
            pembelian: Boolean(otoritas.routes(this.user_otoritas, 'Pembelian')),
            tambah_pembelian: Boolean(otoritas.routes(this.user_otoritas, 'Tambah Pembelian Baru')),
            batal_pembelian: Boolean(otoritas.routes(this.user_otoritas, 'Batal Pembelian')),
            produksi: Boolean(otoritas.routes(this.user_otoritas, 'Produksi')),
            tambah_produksi: Boolean(otoritas.routes(this.user_otoritas, 'Tambah Produksi Baru')),
            batal_produksi: Boolean(otoritas.routes(this.user_otoritas, 'Batal Produksi')),
            penjualan: Boolean(otoritas.routes(this.user_otoritas, 'Penjualan')),
            tambah_penjualan: Boolean(otoritas.routes(this.user_otoritas, 'Tambah Penjualan Baru')),
            batal_penjualan: Boolean(otoritas.routes(this.user_otoritas, 'Batal Penjualan')),
            pengiriman: Boolean(otoritas.routes(this.user_otoritas, 'Pengiriman')),
            tambah_pengiriman: Boolean(otoritas.routes(this.user_otoritas, 'Tambah Pengiriman Baru')),
            batal_pengiriman: Boolean(otoritas.routes(this.user_otoritas, 'Batal Pengiriman')),
            laporan: Boolean(otoritas.routes(this.user_otoritas, 'Laporan')),
            laporan_stok_barang: Boolean(otoritas.routes(this.user_otoritas, 'Laporan Stok Barang')),
            laporan_pembelian: Boolean(otoritas.routes(this.user_otoritas, 'Laporan Pembelian')),
            laporan_produksi: Boolean(otoritas.routes(this.user_otoritas, 'Laporan Produksi')),
            laporan_penjualan: Boolean(otoritas.routes(this.user_otoritas, 'Laporan Penjualan')),
            laporan_log_user: Boolean(otoritas.routes(this.user_otoritas, 'Laporan Log User')),
          }
        }
    },
      methods: {
        async fetchData () {
          //ambil otoritas user saat ini
          let user = localStorage.getItem('user')
          if(user != null) {
            let otority = await api.getOtoritas(user)
            this.authority = otoritas.otoritas(otority)
          }
          //ambil otoritas userselect
          if(this.authority != '') {
            this.items = await api.getUser()
            let user2 = await api.getOtoritas(this.userselect)
            this.user_otoritas = otoritas.otoritas(user2)
          } else await api.logout()
        },
        async pilihUser(value) {
          this.userselect = value
          let user = await api.getOtoritas(value)
          this.user_otoritas = otoritas.otoritas(user)
        },
        page(){
          return this.$emit('page', this.pageTitle)
        },
        dataUser(u, p) {
          this.username = u
          this.password = p
        },
        onScroll () {
          this.scrollInvoked++
        },
        dialog(user) {
          this.tambah = false
          this.ds = {}
          this.detail = true
          this.pilihUser(user)
        },
        updt() {
          this.fetchData()
        },
        submit() {
          if(this.tambah) { this.postUser() }
          if(this.edit) { this.editUser() }
        },
        postUser() {
          api.postUser(this.ds)
          .then(() => {
              this.status = this.valert = true
              setTimeout(() => {
                this.valert = false
                // this.$router.go();
              }, 2500);
            })
            .catch((error) => {
              this.status = false
              this.valert = true
              this.message =  error.response.data
            })
        },
        editUser() {
          api.editUser(this.ds)
          .then(() => {
              this.status = this.valert = true
              setTimeout(() => {
                this.valert = false
                this.$router.go();
              }, 2500);
            })
            .catch((error) => {
              this.status = false
              this.valert = true
              this.message =  error.response.data
            })
        },
        deleteUser() {
          api.deleteUser(this.userselect)
          .then(() => {
              this.status = this.valert = true
              setTimeout(() => {
                this.valert = false
                this.$router.go();
              }, 2500);
            })
            .catch((error) => {
              this.status = false
              this.valert = true
              this.message =  error.response.data
            })
        }
    },
    mounted() {
      this.page()
      this.fetchData()
    }
  })
</script>
<template>
<v-container class="pt-9 h-100">
  <v-row no-gutters class="mb-2 mt-n4">
    <v-responsive class="mb-sm-0 mb-1" min-width="200">
      <btn-info @click="tambah = true, edit = false, detail = true, ds = j_otoritas" btn_title="Tambah User" icon="mdi-plus" />
      <v-list class="mt-2 bg-transparent">
        <v-list-item v-for="item, i in items" :key="i" class="rounded-lg border mb-2 ">
          <v-row no-gutters justify="space-between" align="center">
            <v-span class="text-caption font-weight-medium">{{ item.username }}</v-span>
            <text-button @click="dialog(item.username)" icon="mdi-dots-vertical" />
          </v-row>
        </v-list-item>
      </v-list>
      <v-dialog v-model="detail" max-width="600" transition="dialog-bottom-transition">
        <v-card class="rounded-xl pa-3">
          <v-span class="mx-auto text-button font-weight-bold text-orange">DETAIL USER</v-span>
          <v-div class="d-flex flex-column align-center mt-5 w-100">
            <v-avatar class="bg-blue-custom" size="70">
              <v-icon size="50">mdi-account</v-icon>
            </v-avatar>
            <v-div v-if="!tambah" class="d-flex">
              <btn-cancel @click="confirmdialog = true" class="text-caption mt-3" height="30" width="80" btn_title="Hapus User" />
              <btn-cancel :disabled="edit" @click="edit = true, edituser" class="text-caption mt-3 ms-2" height="30" width="80" btn_title="Edit User" />
            </v-div>
            <text-field-form v-if="!edit && !tambah" label="Username" :model-value="userselect" readonly class="w-50 my-3"/>
            <text-field-form v-if="edit || tambah" label="Username" v-model="ds.username" class="w-50 my-3"/>
            <text-field-form v-if="!edit && !tambah" label="Password" readonly class="w-50"/>
            <text-field-form v-if="edit || tambah" label="Password" v-model="ds.password" class="w-50"/>
            <v-table density="compact" class="my-3" fixed-header height="30vh">
            <thead class="bg-white">
              <tr class="text-center text-caption bg-white">
                <th>
                  Jenis Otoritas
                </th>
                <th>
                  Lihat Data
                </th>
                <th>
                  Tambah Data
                </th>
                <th>
                  Edit Data
                </th>
                <th>
                  Batal/Hapus Data
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-caption">Data Barang</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data Barang') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_barang" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Barang Baru') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_barang" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Ubah Barang') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.ubah_barang" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Hapus Barang') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.hapus_barang" />
                </td>
              </tr>
              <tr>
                <td class="text-caption">Data Pelanggan</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data Pelanggan') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_pelanggan" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Pelanggan Baru') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_pelanggan" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Ubah Pelanggan') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.ubah_pelanggan"/>
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Hapus Pelanggan') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.hapus_pelanggan" />
                </td>
              </tr>
              <tr>
                <td class="text-caption">Data Supplier</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data Supplier') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_supplier"/>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="text-caption">Data User</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_user" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_user" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_user" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_user" />
                </td>
              </tr>
              <tr>
                <td class="text-caption">Pemasukan</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Pembelian') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.pembelian" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Pembelian Baru') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_pembelian"/>
                </td>
                <td></td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Pembelian') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.batal_pembelian" />
                </td>
              </tr>
              <tr>
                <td class="text-caption">Produksi</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Produksi') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.produksi" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Produksi Baru') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_produksi" />
                </td>
                <td></td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Produksi') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.batal_produksi" />
                </td>
              </tr>
              <tr>
                <td class="text-caption">Pengeluaran</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Penjualan') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.penjualan" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Penjualan Baru') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_penjualan" />
                </td>
                <td></td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Penjualan') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.batal_penjualan" />
                </td>
              </tr>
              <tr>
                <td class="text-caption">Pengiriman</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Pengiriman') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.pengiriman" />
                </td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Pengiriman Baru') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_pengiriman" />
                </td>
                <td></td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Pengiriman') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.batal_pengiriman" />
                </td>
              </tr>
              <tr>
                <td class="text-caption">Laporan</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan" />
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="text-caption">Laporan Stok Barang</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Stok Barang') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan_stok_barang" />
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="text-caption">Laporan Pemasukan</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Pembelian') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan_pembelian"/>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="text-caption">Laporan Produksi</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Produksi') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan_produksi" />
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="text-caption">Laporan Pengeluaran</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Penjualan') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan_penjualan" />
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="text-caption">Laporan Log User</td>
                <td>
                  <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Log User') ? true : false" readonly />
                  <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan_log_user" />
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </v-table>
              <v-div v-if="edit || tambah" class="d-flex me-0 ms-auto">
                <btn-cancel @click="edit = false, detail = false" :btn_title="tambah ? 'Batal' : 'Batal Perubahan'" class="mx-2" />
                <btn-orange @click="submit()" :btn_title="tambah ? 'Simpan' : 'Simpan Perubahan'" />
              </v-div>
          </v-div>
        </v-card>
      </v-dialog>
    </v-responsive>
  </v-row>
  <dialogConfirm v-model="confirmdialog" :object="pageTitle">
    <template #yesButton>
        <btn-orange @click="deleteUser(), confirmdialog = false" btn_title="Ya"/>
    </template>
    <template #cancelButton>
      <btn-cancel class="me-2" @click="confirmdialog = false" btn_title="Batal" />
    </template>
  </dialogConfirm>
  <alert-vue v-model="valert" :sukses="status" :message="message" />
</v-container>
</template>
<style scoped>
.radio-small {
  display:  block !important;
  font-size: 10px !important;
  text-align: center !important;
}
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background: inherit !important;
}
</style>