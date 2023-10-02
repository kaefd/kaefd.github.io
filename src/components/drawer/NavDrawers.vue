<script setup>
import { RouterLink } from 'vue-router'
// import api from '../../service/api';
import otoritas from '../../service/page/otoritas';
</script>

<script>
  export default {
    props: ['pageTitle', 'aut'],
    data () {
      return {
        // windowWidth: window.innerWidth,
        master: ['master'],
        pages: [
          {key: 'master', value: 'Master'},
          {key: 'masuk', value: 'Pemasukan Barang'},
          {key: 'produksi', value: 'Produksi'},
          {key: 'keluar', value: 'Pengeluaran Barang'},
          {key: 'kirim', value: 'Pengiriman Barang'},
          {key: 'laporan', value: 'Laporan'},
        ],
        navtitle: '',
        drawer: null,
        rail: true,
        drawerMaster: null,
        pemasukan: '',
        pemasukandetail: '',
        pengeluaran: '',
        pengeluarandetail: '',
        produksi: '',
        produksidetail: '',
        kirim: '',
        title: '',
        empty: null
      }
    },
    methods: {
      page(){
        if(
            this.pageTitle == 'Data Barang' ||
            this.pageTitle == 'barang konversi' ||
            this.pageTitle == 'data pelanggan' ||
            this.pageTitle == 'data supplier' ||
            this.pageTitle == 'data user'
          ){ return true }else return false
      },
      laporan(){
        if(
          this.pageTitle == 'laporan stok barang' ||
          this.pageTitle == 'laporan pemasukan barang' ||
          this.pageTitle == 'laporan pengeluaran barang' ||
          this.pageTitle == 'laporan pengiriman' ||
          this.pageTitle == 'laporan log user'
        ){
          return true
        } else return false
      },
      // onResize() {
      // this.windowWidth = window.innerWidth
      // },
    },
    mounted() {
      // this.fetchData()
    }
  }
</script>

<template>
    <v-navigation-drawer
    class="elevation-0 border-0"
    >
    <v-sheet fluid class="d-flex align-center justify-center bg-transparent" height="120">
      <div class="d-flex flex-column align-center">
        <div class="rounded-circle bg-blue-transparent d-flex align-center" style="width: 55px; height: 55px;">
          <img
            src="../../assets/img/just_logo.png"
            style="width:60px"
          />
      </div>
        <div class="d-flex flex-column text-center">
          <v-span class="font-weight-medium text-uppercase text-caption">Inventori</v-span>
          <!-- <v-span class="text-caption">PT. Auristeel Metalindo</v-span> -->
        </div>
      </div>
    </v-sheet>
    <v-row class="mx-5">
    <v-list class="w-100" active-color="blue-custom">
    <RouterLink to="/dashboard">
      <v-list-item prepend-icon="mdi-home" class="text-caption text-dark hover rounded-xl mt-3 " :active="pageTitle == 'Dashboard' ? true : false" @click="pageTitle='Dashboard'">
        Dashboard
      </v-list-item>
    </RouterLink>
    <v-list-item
      id="master"
      class="text-caption text-dark hover rounded-xl"
      value="master"
      @click="pageTitle = 'master'"
      :active="page()"
      prepend-icon="mdi-database"
      >
      Data Master
    </v-list-item>
    <v-menu :activator="otoritas.routes(aut, 'Data Barang') ? '#master' : null" location="end" width="200">
      <v-list class="text-caption" density="compact" elevation="3" rounded="lg">
        <router-link v-if="otoritas.routes(aut, 'Data Barang')" to="/data-barang">
          <v-list-item class="text-dark hover">Data Barang</v-list-item>
        </router-link>
        <router-link v-if="otoritas.routes(aut, 'Barang Konversi')" to="/barang-konversi">
          <v-list-item class="text-dark hover">Barang Konversi</v-list-item>
        </router-link>
        <router-link v-if="otoritas.routes(aut, 'Data Pelanggan')" to="/data-pelanggan">
          <v-list-item class="text-dark hover">Data Pelanggan </v-list-item>
        </router-link>
        <router-link user-if="otoritas.routes(aut, 'Data Supplier')" to="/data-supplier">
          <v-list-item class="text-dark hover">Data Supplier</v-list-item>
        </router-link>
        <router-link v-if="otoritas.routes(aut, 'Data User')" to="/data-user">
          <v-list-item class="text-dark hover">Data User</v-list-item>
        </router-link>
      </v-list>
    </v-menu>
    <RouterLink v-if="otoritas.routes(aut, 'Pembelian')" to="/pemasukan">
      <v-list-item prepend-icon="mdi-inbox-arrow-down" class="text-caption text-dark hover rounded-xl" :active="pageTitle == 'pemasukan barang' ? true : false" @click="pageTitle='pemasukan barang'">
      Pemasukan Barang
      </v-list-item>
    </RouterLink>
    <RouterLink v-if="otoritas.routes(aut, 'Produksi')" to="/produksi">
      <v-list-item prepend-icon="mdi-chart-donut" class="text-caption text-dark hover rounded-xl" :active="pageTitle == 'produksi barang' ? true : false" @click="pageTitle='produksi barang'">
        Produksi Barang
      </v-list-item>
    </RouterLink>
    <RouterLink v-if="otoritas.routes(aut, 'Penjualan')" to="/pengeluaran">
      <v-list-item prepend-icon="mdi-inbox-arrow-up" class="text-caption text-dark hover rounded-xl" :active="pageTitle == 'pengeluaran barang' ? true : false" @click="pageTitle='pengeluaran barang'">
        Pengeluaran Barang
      </v-list-item>
    </RouterLink>
    <RouterLink v-if="otoritas.routes(aut, 'Pengiriman')" to="/pengiriman">
      <v-list-item prepend-icon="mdi-send-variant" class="text-caption text-dark hover rounded-xl" :active="pageTitle == 'pengiriman barang' ? true : false" @click="pageTitle='pengiriman barang'">
        Pengiriman Barang
      </v-list-item>
    </RouterLink>
    <v-list-item id="laporan" prepend-icon="mdi-folder-outline" class="text-caption text-dark hover rounded-xl" :active="laporan()" value="laporan" @click="pageTitle = 'laporan'">
      Laporan
    </v-list-item>
    <v-menu :activator="otoritas.routes(aut, 'Laporan') ? '#laporan' : null" location="end" width="200">
      <v-list class="text-caption" density="compact" elevation="3" rounded="0">
        <router-link v-if="otoritas.routes(aut, 'Laporan Stok Barang')" to="/laporan-stok">
          <v-list-item class="text-dark">Laporan Stok Barang</v-list-item>
        </router-link>
        <router-link v-if="otoritas.routes(aut, 'Laporan Pembelian')" to="/laporan-pemasukan">
          <v-list-item class="text-dark">Laporan Pemasukan</v-list-item>
        </router-link>
        <router-link v-if="otoritas.routes(aut, 'Laporan Penjualan')" to="/laporan-pengeluaran">
          <v-list-item class="text-dark">Laporan Pengeluaran</v-list-item>
        </router-link>
        <router-link v-if="otoritas.routes(aut, 'Laporan Pengiriman')" to="/laporan-pengiriman">
          <v-list-item class="text-dark">Laporan Pengiriman</v-list-item>
        </router-link>
        <router-link v-if="otoritas.routes(aut, 'Laporan Log User')" to="/laporan-log">
          <v-list-item class="text-dark">Laporan Log User</v-list-item>
        </router-link>
      </v-list>
    </v-menu>
  </v-list>
    </v-row>
    </v-navigation-drawer>
</template>
<style scoped>
.bg-blue-transparent {
  background: rgba(126, 180, 201, 0.219);
}
.br {
  border-right-width: 1px;
  border-right-color: rgba(0, 0, 0, 0.178);
}
/* .hover:hover {
  background: #3572a318 !important;
  color: #5fa0cb !important;
} */
/* .text-active {
  background: #5792c0;
  color: white !important;
  margin-bottom: 3px;
} */
</style>