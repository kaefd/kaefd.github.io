<script setup>
import { RouterLink } from 'vue-router'
import api from '../../service/api';
import functions from '../../service/functions';
</script>

<script>
  export default {
    props: ['act', 'pageTitle'],
    data () {
      return {
        windowWidth: window.innerWidth,
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
      page() {
        if(
          this.pageTitle == 'DATA BARANG' ||
          this.pageTitle == 'DATA PELANGGAN' ||
          this.pageTitle == 'DATA SUPPLIER' ||
          this.pageTitle == 'DATA USER'
        ){
          return true
        }
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
      onResize() {
      this.windowWidth = window.innerWidth
      },
      draw(value) {
        this.drawerMaster = true
        for (let i = 0; i < this.pages.length; i++) {
          if(value == this.pages[i].key) {
            this.navtitle = this.pages[i].key
          }
        }
        if (value == 'masuk') {
          this.getPembelian()
        } else if(value == 'produksi') {
          this.getProduksihead()
        } else if(value == 'keluar') {
          this.getPenjualanHead()
        } else if (value == 'kirim') {
          this.getPengirimanHead()
        }
        this.navtitle = null
        
      },
      subnav() {
        if(this.page()) {
          this.navtitle = 'master'
          this.draw('master')
          return this.page()
        }
        if(this.pageTitle == 'PEMASUKAN BARANG') {
          this.draw('masuk')
          return this.pageTitle
        }
        if(this.pageTitle == 'PRODUKSI BARANG') {
          this.draw('produksi')
          return this.pageTitle
        }
      }
    },
    mounted() {
      this.page()
      this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
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
    class="py-sm-5 py-0 bg-blue-custom"
    v-model="drawer"
    permanent
    rail
    :location="windowWidth < 600 ? 'bottom' : 'left'"
    >
    
    <v-avatar v-if="windowWidth > 600" class="mx-2">
      <img
        src="../../assets/img/logo.png"
        width="50"
      />
    </v-avatar>
    <v-row class="justify-center">
    <v-list class="d-flex flex-sm-column" active-color="white">
    <v-list-item
      class="rounded-lg text-caption mb-sm-5 mb-0 mt-sm-4 mt-0"
      value="master"
      @click="pageTitle = 'MASTER', draw('master')"
      :active="page()"
      >
      <v-icon>mdi-database</v-icon>
      <v-tooltip
          activator="parent"
          :location="windowWidth > 700 ? 'start' : 'top'"
        >
          Data Master
        </v-tooltip>
    </v-list-item>
    <RouterLink to="/pemasukan">
      <v-list-item class="rounded-lg text-caption mb-sm-5 mb-0" :active="pageTitle == 'PEMASUKAN BARANG' ? true : false" value="inItems" @click="pageTitle='PEMASUKAN BARANG', draw('masuk')">
      <v-icon>mdi-inbox-arrow-down</v-icon>
      </v-list-item>
    </RouterLink>
    <RouterLink to="/produksi">
      <v-list-item class="rounded-lg text-caption mb-sm-5 mb-0" :active="pageTitle == 'PRODUKSI BARANG' ? true : false" value="productItems" @click="pageTitle='PRODUKSI BARANG', draw('produksi')">
        <v-icon>mdi-chart-donut</v-icon>
        <v-tooltip
          activator="parent"
          :location="windowWidth > 700 ? 'start' : 'top'"
        >
          Produksi Barang
        </v-tooltip>
      </v-list-item>
    </RouterLink>
    <RouterLink to="/pengeluaran">
      <v-list-item class="rounded-lg text-caption mb-sm-5 mb-0" :active="pageTitle == 'PENGELUARAN BARANG' ? true : false" value="outItems" @click="pageTitle='PENGELUARAN BARANG', draw('keluar')">
        <v-icon>mdi-inbox-arrow-up</v-icon>
      </v-list-item>
    </RouterLink>
    <RouterLink to="/pengiriman">
      <v-list-item class="rounded-lg text-caption mb-sm-5 mb-0" :active="pageTitle == 'PENGIRIMAN BARANG' ? true : false" value="sendItems" @click="pageTitle='PENGIRIMAN BARANG', draw('kirim')">
        <v-icon>mdi-send-variant</v-icon>
      </v-list-item>
    </RouterLink>
    <v-list-item class="rounded-lg text-caption mb-sm-5 mb-0" :active="laporan()" value="laporan" @click="pageTitle = 'LAPORAN', draw('laporan')">
      <v-icon>mdi-folder-outline</v-icon>
      <v-tooltip
        activator="parent"
        :location="windowWidth > 700 ? 'start' : 'top'"
      >
        Laporan
      </v-tooltip>
    </v-list-item>
  </v-list>
    </v-row>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="drawerMaster"
      :permanent="windowWidth > 900 ? true : false"
      class="border-0 elevation-2"
    >
    <v-list nav density="comfortable" class="ms-n2 my-sm-4 my-0" active-color="#3B7AA9">
    <v-div class="d-flex align-center">
      <v-span v-if="!page() && !laporan()" class="text-button ms-5">{{ pageTitle }}</v-span>
      <v-span v-if="page()" class="text-button ms-5">MASTER</v-span>
      <v-span v-if="laporan()" class="text-button ms-5">LAPORAN</v-span>
    </v-div>
    <v-divider class="mb-3"></v-divider>
    <!-- MASTER -->
    <v-div  v-if="pageTitle == 'MASTER' || page()"> 
      <RouterLink to="/data-barang">
      <v-list-item title="Data Barang" class="rounded-left-lg  ps-6" :active="pageTitle == 'DATA BARANG' ? true : false" value="items"/>
      </RouterLink>
      <RouterLink to="/data-pelanggan">
        <v-list-item title="Data Pelanggan" class="rounded-left-lg ps-6" :active="pageTitle == 'DATA PELANGGAN' ? true : false" value="customers"/>
      </RouterLink>
      <RouterLink to="/data-supplier">
        <v-list-item title="Data Suppliers" class="rounded-left-lg ps-6" :active="pageTitle == 'DATA SUPPLIER' ? true : false" value="suppliers" />
      </RouterLink>
      <RouterLink to="/data-user">
        <v-list-item title="Data Users" class="rounded-left-lg ps-6" :active="pageTitle == 'DATA USERS' ? true : false" value="users" />
      </RouterLink>
    </v-div>
    <!-- PEMASUKAN BARANG -->
    <v-div v-if="pageTitle == 'PEMASUKAN BARANG'" class="d-flex flex-column">
      <v-span class="text-body-2 ms-6 mt-5">Aktivitas Terakhir</v-span>
      <div class="pb-5">
        <v-div v-for="p, i in pemasukan_brg" :key="i" class="d-flex flex-column ms-5 pt-5">
          <v-span class="text-caption">
            <v-icon color="green">mdi-circle-medium</v-icon>
            {{ p.nama }}
            </v-span>
            <v-span class="ms-5 text-small w-100">jumlah : {{ functions.numb(p.jumlah) }} {{ p.satuan }}</v-span>
            <v-span class="ms-5 text-small w-100">{{ p.periode }}</v-span>
        </v-div>
      </div>
    </v-div>
    <!-- PRODUKSI -->
    <v-div v-if="pageTitle == 'PRODUKSI BARANG'" class="d-flex flex-column">
      <v-span class="text-body-2 ms-6 mt-5">Aktivitas Terakhir</v-span>
      <v-div>
      <v-div v-for="p, i in produksi_h" :key="i" class="d-flex flex-column ms-5 pt-5">
        <v-span class="text-caption">
          <v-icon color="green">mdi-circle-medium</v-icon>
          {{ p.nama }}
        </v-span>
        <v-span class="ms-5 text-small w-100">jumlah : {{ functions.numb(p.jumlah) }} {{ p.satuan }}</v-span>
        <v-span class="ms-5 text-small w-100">{{ p.periode }}</v-span>
      </v-div>
      </v-div>
    </v-div>
    <!-- PENGELUARAN -->
    <div v-if="pageTitle == 'PENGELUARAN BARANG'" class="d-flex flex-column">
      <v-span class="text-body-2 ms-6 mt-5">Aktivitas Terakhir</v-span>
      <div>
        <v-div v-for="p, i in pengeluaran_h" :key="i" class="d-flex flex-column ms-5 pt-5">
          <v-span class="text-caption">
            <v-icon color="green">mdi-circle-medium</v-icon>
            {{ p.nama }}
          </v-span>
          <v-span class="ms-5 text-small w-100">jumlah : {{ functions.numb(p.jumlah) }} {{ p.satuan }}</v-span>
          <v-span class="ms-5 text-small w-100">{{ p.periode }}</v-span>
        </v-div>
      </div>
    </div>
    <!-- PENGIRIMAN -->
    <v-div v-if="pageTitle == 'PENGIRIMAN BARANG'" class="d-flex flex-column">
      <v-span class="text-body-2 ms-6 mt-5">Aktivitas Terakhir</v-span>
      <div class="pb-5">
        <v-div v-for="p, i in kirim_h" :key="i" class="d-flex flex-column ms-5 pt-5">
          <v-span class="text-caption">
            <v-icon color="green">mdi-circle-medium</v-icon>
            {{ p.nama }}
          </v-span>
          <v-span class="ms-5 text-small w-100">jumlah : {{ functions.numb(p.jumlah) }} {{ p.satuan }}</v-span>
          <v-span class="ms-5 text-small w-100">{{ p.periode }}</v-span>
        </v-div>
        </div>
    </v-div>
    <!-- LAPORAN -->
    <v-div v-if="pageTitle == 'LAPORAN' || laporan()">
      <RouterLink to="/laporan-stok">
      <v-list-item title="Laporan Stok Barang" class="rounded-left-lg  ps-6" :active="pageTitle == 'LAPORAN STOK BARANG' ? true : false" value="stok"/>
      </RouterLink>
      <RouterLink to="/laporan-pemasukan">
        <v-list-item title="Laporan Pemasukan" class="rounded-left-lg ps-6" :active="pageTitle == 'LAPORAN PEMASUKAN BARANG' ? true : false" value="in"/>
      </RouterLink>
      <RouterLink to="/laporan-pengeluaran">
        <v-list-item title="Laporan Pengeluaran" class="rounded-left-lg ps-6" :active="pageTitle == 'LAPORAN PENGELUARAN BARANG' ? true : false" value="out" />
      </RouterLink>
      <RouterLink to="/laporan-log">
        <v-list-item title="Log User" class="rounded-left-lg ps-6" :active="pageTitle == 'LAPORAN LOG USER' ? true : false" value="users" />
      </RouterLink>
    </v-div>

    </v-list>
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
