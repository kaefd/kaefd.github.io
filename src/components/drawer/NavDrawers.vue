<script setup>
import { RouterLink } from 'vue-router'
import api from '../../service/api';
</script>

<script>
  export default {
    props: ['act', 'pageTitle'],
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
        title: ''
      }
    },
    methods: {
      page(){
        if(
            this.pageTitle == 'DATA BARANG' ||
            this.pageTitle == 'DATA PELANGGAN' ||
            this.pageTitle == 'DATA SUPPLIER' ||
            this.pageTitle == 'DATA USER'
          ){ return true }else return false
      },
      laporan(){
        if(
          this.pageTitle == 'LAPORAN STOK BARANG' ||
          this.pageTitle == 'LAPORAN PEMASUKAN BARANG' ||
          this.pageTitle == 'LAPORAN PENGELUARAN BARANG' ||
          this.pageTitle == 'LAPORAN LOG USER'
        ){
          return true
        }
      },
      // onResize() {
      // this.windowWidth = window.innerWidth
      // },
    },
    mounted() {
      this.$nextTick(() => {
      // window.addEventListener('resize', this.onResize);
      this.pageTitle
    })
    }
  }
</script>

<template>
    <v-navigation-drawer
    class="border-e-sm elevation-0"
    >
    <v-sheet fluid class="d-flex align-center mx-5 justify-start bg-transparent" height="63">
      <v-avatar>
      <img
        src="../../assets/img/just_logo.png"
        width="35"
      />
      </v-avatar>
      <v-span class="text-button ms-3 text-dark">IT Inventori</v-span>
    </v-sheet>
    <v-divider></v-divider>
    <v-row class="px-3">
    <v-list class="w-100">
    <v-list-item
      id="master"
      class="text-caption mt-3 text-dark"
      value="master"
      @click="pageTitle = 'MASTER', draw('master')"
      :active="page()"
      prepend-icon="mdi-database"
      >
      Data Master
    </v-list-item>
    <v-menu activator="#master" location="end" width="200">
      <v-list class="text-caption" density="compact" elevation="3" rounded="0">
        <router-link to="/data-barang">
          <v-list-item class="text-dark">Data Barang</v-list-item>
        </router-link>
        <router-link to="/data-pelanggan">
          <v-list-item class="text-dark">Data Pelanggan</v-list-item>
        </router-link>
        <router-link to="/data-supplier">
          <v-list-item class="text-dark">Data Supplier</v-list-item>
        </router-link>
        <router-link to="/data-user">
          <v-list-item class="text-dark">Data User</v-list-item>
        </router-link>
      </v-list>
    </v-menu>
    <RouterLink to="/pemasukan">
      <v-list-item prepend-icon="mdi-inbox-arrow-down" class="text-caption text-dark" :active="pageTitle == 'PEMASUKAN BARANG' ? true : false" @click="pageTitle='PEMASUKAN BARANG'">
      Pemasukan Barang
      </v-list-item>
    </RouterLink>
    <RouterLink to="/produksi">
      <v-list-item prepend-icon="mdi-chart-donut" class="text-caption text-dark" :active="pageTitle == 'PRODUKSI BARANG' ? true : false" @click="pageTitle='PRODUKSI BARANG'">
        Produksi Barang
      </v-list-item>
    </RouterLink>
    <RouterLink to="/pengeluaran">
      <v-list-item prepend-icon="mdi-inbox-arrow-up" class="text-caption text-dark" :active="pageTitle == 'PENGELUARAN BARANG' ? true : false" @click="pageTitle='PENGELUARAN BARANG'">
        Pengeluaran Barang
      </v-list-item>
    </RouterLink>
    <RouterLink to="/pengiriman">
      <v-list-item prepend-icon="mdi-send-variant" class="text-caption text-dark" :active="pageTitle == 'PENGIRIMAN BARANG' ? true : false" @click="pageTitle='PENGIRIMAN BARANG'">
        Pengiriman Barang
      </v-list-item>
    </RouterLink>
    <v-list-item id="laporan" prepend-icon="mdi-folder-outline" class="text-caption text-dark" :active="laporan()" value="laporan" @click="pageTitle = 'LAPORAN'">
      Laporan
    </v-list-item>
    <v-menu activator="#laporan" location="end" width="200">
      <v-list class="text-caption" density="compact" elevation="3" rounded="0">
        <router-link to="/laporan-stok">
          <v-list-item class="text-dark">Laporan Stok Barang</v-list-item>
        </router-link>
        <router-link to="/laporan-pemasukan">
          <v-list-item class="text-dark">Laporan Pemasukan</v-list-item>
        </router-link>
        <router-link to="/laporan-pengeluaran">
          <v-list-item class="text-dark">Laporan Pengeluaran</v-list-item>
        </router-link>
        <router-link to="/laporan-log">
          <v-list-item class="text-dark">Laporan Log User</v-list-item>
        </router-link>
      </v-list>
    </v-menu>
  </v-list>
    </v-row>
    </v-navigation-drawer>
</template>
