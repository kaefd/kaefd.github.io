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
    computed: {
      pemasukan_brg(){
        let le = this.pemasukan.slice(-3)
        let data = []
        let options = {
          day: '2-digit',
          year: 'numeric',
          month: 'long',
          weekday: 'long'
        }
        for (let i = 0; i < le.length; i++) {
          for (let j = 0; j < this.pemasukandetail.length; j++) {
              if(le[i].no_pembelian == this.pemasukandetail[j].no_pembelian) {
                let d = {
                  periode: new Date(le[i].tgl_pembelian).toLocaleDateString('id', options),
                  nama: this.pemasukandetail[j].nama_barang,
                  jumlah: this.pemasukandetail[j].jumlah,
                  satuan: this.pemasukandetail[j].satuan,
                  user: le[i].user_input
                }
                data.push(d)
              }
          }
        }
        return data
      },
      produksi_h(){
        let le = this.produksi.slice(-2)
        let data = []
        let options = {
          day: '2-digit',
          year: 'numeric',
          month: 'long',
          weekday: 'long'
        }
        for (let i = 0; i < le.length; i++) {
          for (let j = 0; j < this.produksidetail.length; j++) {
              if(le[i].no_produksi == this.produksidetail[j].no_produksi) {
                let d = {
                  periode: new Date(le[i].tgl_produksi).toLocaleDateString('id', options),
                  nama: this.produksidetail[j].nama_barang,
                  jumlah: this.produksidetail[j].jumlah,
                  satuan: this.produksidetail[j].satuan,
                  user: le[i].user_input
                }
                data.push(d)
              }
          }
        }
        return data
      },
      pengeluaran_h(){
        let le = this.pengeluaran.slice(-3)
        let data = []
        let options = {
          day: '2-digit',
          year: 'numeric',
          month: 'long',
          weekday: 'long'
        }
        for (let i = 0; i < le.length; i++) {
          for (let j = 0; j < this.pengeluarandetail.length; j++) {
              if(le[i].no_penjualan == this.pengeluarandetail[j].no_penjualan) {
                let d = {
                  periode: new Date(le[i].tgl_penjualan).toLocaleDateString('id', options),
                  nama: this.pengeluarandetail[j].nama_barang,
                  jumlah: this.pengeluarandetail[j].jumlah,
                  satuan: this.pengeluarandetail[j].satuan,
                  user: le[i].user_input
                }
                data.push(d)
              }
          }
        }
        return data
      },
      kirim_h(){
        let le = this.kirim.slice(-2)
        let data = []
        let options = {
          day: '2-digit',
          year: 'numeric',
          month: 'long',
          weekday: 'long'
        }
        for (let i = 0; i < le.length; i++) {
          for (let j = 0; j < this.kirimdetail.length; j++) {
              if(le[i].no_pengiriman == this.kirimdetail[j].no_pengiriman) {
                let d = {
                  periode: new Date(le[i].tgl_pengiriman).toLocaleDateString('id', options),
                  nama: this.kirimdetail[j].nama_barang,
                  jumlah: this.kirimdetail[j].jumlah,
                  satuan: this.kirimdetail[j].satuan,
                  user: le[i].user_input
                }
                data.push(d)
              }
          }
        }
        return data
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
      getPembelian() {
        const apiUrl = '/pembelian_head?'
        const params = {
          tgl_awal: '2023-05-01',
          tgl_akhir: '2023-05-31',
        }
        api.getData(apiUrl, { params })
        .then(response => {
          return this.pemasukan = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getPembelianDetail() {
        const apiUrl = '/pembelian_detail?'
        const params = {
          tgl_awal: '2023-05-01',
          tgl_akhir: '2023-05-31',
        }
        api.getData(apiUrl, { params })
        .then(response => {
          return this.pemasukandetail = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getProduksihead() {
        const apiUrl = '/produksi_head?'
        const params = {
          tgl_awal: '2023-05-01',
          tgl_akhir: '2023-05-31',
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.produksi = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getProduksiDetail() {
        const apiUrl = '/produksi_detail_barang?'
        const params = {
          tgl_awal: '2023-05-01',
          tgl_akhir: '2023-05-31',
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.produksidetail = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getPenjualanHead() {
        const apiUrl = '/penjualan_head?'
        const params = {
          tgl_awal: '2023-05-01',
          tgl_akhir: '2023-05-31',
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.pengeluaran = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getPenjualanDetail() {
        const apiUrl = '/penjualan_detail?'
        const params = {
          tgl_awal: '2023-05-01',
          tgl_akhir: '2023-05-31',
        }
        api.getData(apiUrl, {params})
        .then(response => {
          this.pengeluarandetail = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getPengirimanHead() {
        const apiUrl = '/pengiriman_head?'
        const params = {
          tgl_awal: '2023-05-01',
          tgl_akhir: '2023-05-31',
        }
        api.getData(apiUrl, { params })
        .then(response => {
          this.kirim = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
      getPengirimanDetail() {
        const apiUrl = '/pengiriman_detail?'
        const params = {
          tgl_awal: '2023-05-01',
          tgl_akhir: '2023-05-31',
        }
        api.getData(apiUrl, { params })
        .then(response => {
          this.kirimdetail = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
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
      this.getPembelian()
      this.getPembelianDetail()
      this.getProduksiDetail()
      this.getPenjualanDetail()
      this.getPengirimanDetail()
      this.pageTitle
    })
    }
  }
</script>

<template>
    <v-navigation-drawer
    class="border-0 elevation-0 bg-people"
    >
    <v-container class="d-flex align-end justify-center">
      <v-avatar class="me-3">
      <img
        src="../../assets/img/logo.png"
        width="50"
      />
      </v-avatar>
      <v-span class="text-button font-weight-bold text-white">IT Inventori</v-span>
    </v-container>
    <v-divider></v-divider>
    <v-row class="px-3">
    <v-list class="w-100" active-color="white">
    <v-list-item
      id="master"
      class="text-caption mt-5 text-grey-lighten-1"
      value="master"
      @click="pageTitle = 'MASTER', draw('master')"
      :active="page()"
      prepend-icon="mdi-database"
      >
      Data Master
    </v-list-item>
    <v-menu activator="#master" location="end" width="200" height="100%">
      <v-list class="text-caption bg-darkbluetheme" density="compact" elevation="3" rounded="0">
        <router-link to="/data-barang">
          <v-list-item href="#" class="text-grey-lighten-1">Data Barang</v-list-item>
        </router-link>
        <router-link to="/data-pelanggan">
          <v-list-item href="#" class="text-grey-lighten-1">Data Pelanggan</v-list-item>
        </router-link>
        <router-link to="/data-supplier">
          <v-list-item href="#" class="text-grey-lighten-1">Data Supplier</v-list-item>
        </router-link>
        <router-link to="/data-user">
          <v-list-item href="#" class="text-grey-lighten-1">Data User</v-list-item>
        </router-link>
      </v-list>
    </v-menu>
    <RouterLink to="/pemasukan">
      <v-list-item prepend-icon="mdi-inbox-arrow-down" class="text-caption text-grey-lighten-1" :active="pageTitle == 'PEMASUKAN BARANG' ? true : false" @click="pageTitle='PEMASUKAN BARANG'">
      Pemasukan Barang
      </v-list-item>
    </RouterLink>
    <RouterLink to="/produksi">
      <v-list-item prepend-icon="mdi-chart-donut" class="text-caption text-grey-lighten-1" :active="pageTitle == 'PRODUKSI BARANG' ? true : false" @click="pageTitle='PRODUKSI BARANG'">
        Produksi Barang
      </v-list-item>
    </RouterLink>
    <RouterLink to="/pengeluaran">
      <v-list-item prepend-icon="mdi-inbox-arrow-up" class="text-caption text-grey-lighten-1" :active="pageTitle == 'PENGELUARAN BARANG' ? true : false" @click="pageTitle='PENGELUARAN BARANG'">
        Pengeluaran Barang
      </v-list-item>
    </RouterLink>
    <RouterLink to="/pengiriman">
      <v-list-item prepend-icon="mdi-send-variant" class="text-caption text-grey-lighten-1" :active="pageTitle == 'PENGIRIMAN BARANG' ? true : false" @click="pageTitle='PENGIRIMAN BARANG'">
        Pengiriman Barang
      </v-list-item>
    </RouterLink>
    <v-list-item id="laporan" prepend-icon="mdi-folder-outline" class="text-caption text-grey-lighten-1" :active="laporan()" value="laporan" @click="pageTitle = 'LAPORAN'">
      Laporan
    </v-list-item>
    <v-menu activator="#laporan" location="end" width="200" height="100%">
      <v-list class="text-caption bg-darkbluetheme" density="compact" elevation="3" rounded="0">
        <router-link to="/laporan-stok">
          <v-list-item href="#" class="text-grey-lighten-1">Laporan Stok Barang</v-list-item>
        </router-link>
        <router-link to="/laporan-pemasukan">
          <v-list-item href="#" class="text-grey-lighten-1">Laporan Pemasukan</v-list-item>
        </router-link>
        <router-link to="/laporan-pengeluaran">
          <v-list-item href="#" class="text-grey-lighten-1">Laporan Pengeluaran</v-list-item>
        </router-link>
        <router-link to="/laporan-log">
          <v-list-item href="#" class="text-grey-lighten-1">Laporan Log User</v-list-item>
        </router-link>
      </v-list>
    </v-menu>
  </v-list>
    </v-row>
    </v-navigation-drawer>
</template>

<style scoped>

a {
  color: rgb(0, 0, 0);
}
.vh-100{
  height: 100vh;
}
.rounded-right-lg{
  border-radius: 50px 0px 0px 50px;
}
.rounded-left-lg{
  border-radius: 0px 50px 50px 0px;
}

</style>
