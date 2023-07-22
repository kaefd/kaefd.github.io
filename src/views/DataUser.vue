<script setup>
import { defineComponent } from 'vue';
import BtnInfo from '../components/button/btnInfo.vue';
import TextButton from '../components/button/textButton.vue';
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
        TextFieldForm
    },
    data () {
      return {
        drawer: false,
        detail: false,
        pageTitle: 'DATA USER',
        tab: null,
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
          {title: "Username", key: "username"},
        ],
        j_otoritas: [
          {title: 'Data Barang', value: ['Tambah Barang', 'Ubah Barang', 'Hapus Barang']},
          {title: 'Pelanggan', value: ['Tambah Pelanggan Baru', 'Ubah Pelanggan', 'Hapus Pelanggan']},
          {title: 'Supplier', value: []},
          {title: 'User', value: []},
          {title: 'Pembelian', value: []},
          {title: 'Produksi', value: []},
          {title: 'Penjualan', value: []},
          {title: 'Pengiriman', value: []},
          {title: 'Laporan', value: ['Laporan Stok Barang', 'Laporan Pemasukan', 'Laporan Produksi', 'Laporan Pengeluaran', 'Laporan Pengiriman', 'Laporan Log User']},
        ]
        
      }
    },
      methods: {
        async fetchData () {
          if(this.user != '') {
          let user = await api.getOtoritas()
          this.authority = otoritas.otoritas(user)
        }
          if(this.authority != '') {
            this.items = await api.getUser()
            let user2 = await api.getOtoritas(this.userselect)
            this.user_otoritas = otoritas.otoritas(user2)
          } else return this.$router.push('login')
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
        // userotoritas(user, jns) {
        //   for (let i = 0; i < this.user_otoritas.length; i++) {
        //     for (let j = 0; j < this.j_otoritas.length; j++) {
        //       for (let k = 0; k < this.jns_otoritas.length; k++) {
        //         if(user == this.user_otoritas[i].username && jns == this.jns_otoritas[k])
        //         {
        //           if(this.j_otoritas[j].title == jns) {
        //             return this.j_otoritas[j].value
        //           }
        //         }
        //       }
        //   }
        //  }
        // },
        dialog(user) {
          this.detail = true
          this.pilihUser(user)
        },
        updt() {
          this.fetchData()
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
      <btn-info btn_title="Tambah User" icon="mdi-plus" />
      <v-list class="mt-2 bg-transparent">
        <v-list-item v-for="item, i in items" :key="i" class="rounded-lg border mb-2 ">
          <v-row no-gutters justify="space-between" align="center">
            <v-span class="text-caption font-weight-medium">{{ item.username }}</v-span>
            <text-button @click="dialog(item.username)" icon="mdi-dots-vertical" />
          </v-row>
        </v-list-item>
      </v-list>
      <v-dialog v-model="detail" max-width="600">
        <v-card class="rounded-xl pa-5">
          <v-span class="mx-auto text-button font-weight-bold text-orange">DETAIL USER</v-span>
          <v-divider></v-divider>
          <v-div class="d-flex flex-column align-center mt-5 w-100">
            <v-avatar class="bg-blue-custom" size="70">
              <v-icon size="50">mdi-account</v-icon>
            </v-avatar>
            <text-field-form label="Username" :model-value="userselect" class="w-50 my-3"/>
            <text-field-form label="Password" class="w-50"/>
            <v-span class="text-button text-grey">otoritas</v-span>
            <v-list class="w-100">
              <!-- DATA BARANG -->
              <v-list-item class="text-caption rounded-lg border">
                <v-div class="d-flex align-center justify-space-between">
                  <v-div>
                    <v-span class="font-weight-medium">Data Barang</v-span>
                  </v-div>
                  <v-div class="d-flex flex-column align-center">
                    <img src="../assets/img/on.png" style="width: 30px;">
                    <v-span class="text-small text-grey">Tambah</v-span>
                  </v-div>
                  <v-div class="d-flex flex-column align-center">
                    <img src="../assets/img/on.png" style="width: 30px;">
                    <v-span class="text-small text-grey">Ubah</v-span>
                  </v-div>
                  <v-div class="d-flex flex-column align-center">
                    <img src="../assets/img/on.png" style="width: 30px;">
                    <v-span class="text-small text-grey">Hapus</v-span>
                  </v-div>
                </v-div>
              </v-list-item>
            </v-list>
          </v-div>
        </v-card>
      </v-dialog>
    </v-responsive>
  </v-row>
</v-container>
</template>
<style>

.w-30 {
  max-width: 32vw;
}
.w-15 {
  width: 15vw !important;
}
</style>