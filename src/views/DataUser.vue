<script setup>
import { defineComponent } from 'vue';
import CircularLoader from '../components/animate/circularLoader.vue';
import BtnCancel from '../components/button/btnCancel.vue';
import BtnInfo from '../components/button/btnInfo.vue';
import BtnOrange from '../components/button/btnOrange.vue';
import AlertVue from '../components/dialog/alertVue.vue';
import DialogConfirm from '../components/dialog/dialogConfirm.vue';
import TableVue from '../components/TableVue.vue';
import api from '../service/api';
import otoritas from '../service/page/otoritas';
import UserDetail from './userDetail.vue';

</script>
<script>
  export default defineComponent({
    props:['user', 'cetak', 'window'],
    name:'UserView',
    components: {
        BtnInfo,
        BtnCancel,
        BtnOrange,
        AlertVue,
        DialogConfirm,
        TableVue,
        UserDetail,
        CircularLoader,
    },
    data () {
      return {
        drawer: false,
        detail: false,
        confirmdialog: false,
        pageTitle: 'DATA USER',
        loading: true,
        tab: null,
        valert: false,
        message: '',
        status: null,
        username: '',
        password: '',
        otority: '',
        akses: '',
        authority: '',
        dialogotoritas: [],
        userselect: '',
        open: ['barang', 'Laporan'],
        scrollInvoked: 0,
        items: '',
        head: [
          {title: 'Username', key: 'username'},
          {key: 'actions', align:'end'},
        ],
        jns_otoritas: ['Data Barang', 'Data Pelanggan', 'Data Supplier', 'Data User', 'Pembelian', 'Produksi', 'Penjualan', 'Pengiriman', 'Laporan' ],
        user_otoritas: '',
        headers: [
          {title: "Jenis Otoritas", key: "jenis_otoritas"},
          {title: "Tambah Data", key: "tambah"},
          {title: "Edit Data", key: "edit"},
          {title: "Batal/Hapus Data", key: "hapus"},
        ],
      }
    },
      methods: {
        async fetchData () {
          //ambil otoritas user saat ini
          let user = localStorage.getItem('user')
          if(user != null) {
            this.akses = await api.getOtoritas(user)
            this.authority = otoritas.otoritas(this.akses)
          }
          //ambil otoritas userselect
          if(otoritas.routes(this.akses, 'Data User')) {
            // data user
            this.loading = true
            this.items = await api.getUser()
            this.otority = await api.getOtoritas(this.userselect)
            this.user_otoritas = otoritas.otoritas(this.otority)
            this.loading = false
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
        postUser(value) {
          api.postUser(value)
          .then(() => {
              this.status = this.valert = true
              this.message = "Data Berhasil Ditambahkan"
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
        editUser(value) {
          api.editUser(value)
          .then(() => {
              this.status = this.valert = true
              this.message = "Data Berhasil Diubah"
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
        deleteUser(value) {
          api.deleteUser(value)
          .then(() => {
              this.status = this.valert = true
              this.message = "Data Berhasil Dihapus"
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
    </v-responsive>
  </v-row>
      <table-vue
        :window="window"
        :userdetail="true"
        :items = items
        :headers="head"
        :editdata="true"
        :user_otoritas="user_otoritas"
        :j_otoritas="j_otoritas"
        :userselect="userselect"
        :otority="otority"
        @edit="editUser"
        @del="deleteUser"
      />
      <user-detail v-model="detail" @submitUser="postUser" :tambahUser="true" :user_otoritas="user_otoritas" :j_otoritas="j_otoritas" :userselect="userselect">
        <template #cancel>
          <btn-cancel @click=" detail = false" btn_title="Batal" class="mx-2" />
        </template>
      </user-detail>
  <dialogConfirm v-model="confirmdialog" :object="pageTitle">
    <template #yesButton>
        <btn-orange @click="deleteUser(), confirmdialog = false" btn_title="Ya"/>
    </template>
    <template #cancelButton>
      <btn-cancel class="me-2" @click="confirmdialog = false" btn_title="Batal" />
    </template>
  </dialogConfirm>
  <alert-vue v-model="valert" :sukses="status" :message="message" />
  <circular-loader :loading="loading" />
</v-container>
</template>
