<script setup>
import { defineComponent } from 'vue';
// import api from '../api';
import AppBar from '../components/AppBar.vue';

</script>
<script>
  export default defineComponent({
    props:['actIcon', 'cetak'],
    name:'UserView',
    components: {
      AppBar
    },
    data () {
      return {
        drawer: false,
        pageTitle: 'DATA USER',
        username: '',
        password: '',
        open: ['barang', 'Laporan'],
        scrollInvoked: 0,
        items: '',
        jns_otoritas: ['Data Barang', 'Data Pelanggan', 'Data Supplier', 'Data User', 'Pembelian', 'Produksi', 'Penjualan', 'Pengiriman', 'Laporan' ],
        user_otoritas: '',
        
      }
    },
    created() {
        // api.getData('/user?status=true')
        // .then(response => {
        //   this.items = response.data
        // })
        // .catch(() => {
        //   window.location.href = '/login'
        // })
        // api.getData('/user_otoritas?username=admin')
        // .then(response => {
        //   this.user_otoritas = response.data
        // })
        // .catch(() => {
        //   window.location.href = '/login'
        // })
    },
    computed: {
      // JENIS OTORITAS
      otoritas(){
        return  {
          
          'Data Barang' :
          [
            { jenisotoritas: this.user_otoritas[4].jenis_otoritas, status: this.user_otoritas[4].status },
            { jenisotoritas: this.user_otoritas[21].jenis_otoritas, status: this.user_otoritas[21].status },
            { jenisotoritas: this.user_otoritas[27].jenis_otoritas, status: this.user_otoritas[27].status, },
            { jenisotoritas: this.user_otoritas[8].jenis_otoritas, status: this.user_otoritas[8].status, },
          ],
          'Data Pelanggan' :
          [
            { jenisotoritas: this.user_otoritas[5].jenis_otoritas, status: this.user_otoritas[5].status },
            { jenisotoritas: this.user_otoritas[22].jenis_otoritas, status: this.user_otoritas[22].status },
            { jenisotoritas: this.user_otoritas[28].jenis_otoritas, status: this.user_otoritas[28].status, },
            { jenisotoritas: this.user_otoritas[9].jenis_otoritas, status: this.user_otoritas[9].status, },
          ],
          'Data Supplier' :
          [
            { jenisotoritas: this.user_otoritas[6].jenis_otoritas, status: this.user_otoritas[6].status },
          ],
          'Data User' :
          [
            { jenisotoritas: this.user_otoritas[7].jenis_otoritas, status: this.user_otoritas[7].status },
          ],
          'Pembelian' :
          [
            { jenisotoritas: this.user_otoritas[17].jenis_otoritas, status: this.user_otoritas[17].status },
            { jenisotoritas: this.user_otoritas[23].jenis_otoritas, status: this.user_otoritas[23].status },
            { jenisotoritas: this.user_otoritas[0].jenis_otoritas, status: this.user_otoritas[0].status },
          ],
          'Produksi' :
          [
            { jenisotoritas: this.user_otoritas[20].jenis_otoritas, status: this.user_otoritas[20].status },
            { jenisotoritas: this.user_otoritas[26].jenis_otoritas, status: this.user_otoritas[26].status },
            { jenisotoritas: this.user_otoritas[3].jenis_otoritas, status: this.user_otoritas[3].status },
          ],
          'Penjualan' :
          [
            { jenisotoritas: this.user_otoritas[19].jenis_otoritas, status: this.user_otoritas[19].status },
            { jenisotoritas: this.user_otoritas[25].jenis_otoritas, status: this.user_otoritas[25].status },
            { jenisotoritas: this.user_otoritas[2].jenis_otoritas, status: this.user_otoritas[2].status },
          ],
          'Pengiriman' :
          [
            { jenisotoritas: this.user_otoritas[18].jenis_otoritas, status: this.user_otoritas[18].status },
            { jenisotoritas: this.user_otoritas[24].jenis_otoritas, status: this.user_otoritas[24].status },
            { jenisotoritas: this.user_otoritas[1].jenis_otoritas, status: this.user_otoritas[1].status },
          ],
          'Laporan' :
          [
            { jenisotoritas: this.user_otoritas[10].jenis_otoritas, status: this.user_otoritas[10].status },
            { jenisotoritas: this.user_otoritas[16].jenis_otoritas, status: this.user_otoritas[16].status },
            { jenisotoritas: this.user_otoritas[12].jenis_otoritas, status: this.user_otoritas[12].status },
            { jenisotoritas: this.user_otoritas[15].jenis_otoritas, status: this.user_otoritas[15].status },
            { jenisotoritas: this.user_otoritas[14].jenis_otoritas, status: this.user_otoritas[14].status },
            { jenisotoritas: this.user_otoritas[13].jenis_otoritas, status: this.user_otoritas[13].status },
            { jenisotoritas: this.user_otoritas[11].jenis_otoritas, status: this.user_otoritas[11].status },
          ],
  
        }

      }
        
    },
      methods: {
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
    },
    mounted() {
      this.page()
    }
  })
</script>
<template>
<v-container>
  <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
  <v-row no-gutters class="rounded-t-xl align-center mt-n4 mb-2">
    <v-responsive class="d-flex align-center mb-sm-0 mb-1 me-sm-2 me-0" width="200" max-width="350">
      <v-btn class="rounded-xl bg-blue-custom text-white elevation-0 text-caption" height="42" width="150">Tambah Baru</v-btn>
    </v-responsive>
  </v-row>
  <v-row class="d-flex justify-space-between">
    <v-responsive class="me-lg-0 me-2 mb-md-0 mb-2" max-width="350">
      <v-container class="w-100 border rounded-xl vh-75">
        <v-span class="text-caption font-weight-bold pa-3">KODE USER</v-span>
        <v-divider></v-divider>
        <v-list class="bg-transparent">
          <v-list-item class="text-caption" density="compact">admin</v-list-item>
          <v-list-item class="text-caption" density="compact">beacukai</v-list-item>
        </v-list>
      </v-container>
    </v-responsive>
    <v-responsive class="me-lg-0 me-2 mb-md-0 mb-2" max-width="600">
      <v-container class="w-100 border rounded-xl vh-75">
        <v-span class="text-caption font-weight-bold">DETAIL USER</v-span>
        <v-divider></v-divider>
        <v-div class="d-flex flex-column justify-center align-center mt-5">
          <v-avatar size="75">
            <v-icon color="grey-darken-1" size="75">mdi-account-circle</v-icon>
          </v-avatar>
        </v-div>
        <v-div class="d-flex mt-2">
            <v-list class="bg-transparent" density="compact">
            <v-list-item class="text-caption font-weight-bold">Username</v-list-item>
            <v-list-item class="text-caption font-weight-bold">Pasword</v-list-item>
          </v-list>
          <v-list class="bg-transparent" density="compact">
            <v-list-item class="text-caption">Admin</v-list-item>
            <v-list-item class="text-caption"></v-list-item>
          </v-list>
        </v-div>
        <v-divider></v-divider>
        <v-span class="text-caption font-weight-bold">LIHAT OTOTRITAS</v-span>
      </v-container>
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