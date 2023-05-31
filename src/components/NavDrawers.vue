<script setup>
// import { RouterLink } from 'vue-router'
</script>

<script>
  export default {
    props: ['act', 'pageTitle'],
    data () {
      return {
        windowWidth: window.innerWidth,
        master: ['master'],
        drawer: null,
        rail: true,
        drawerMaster: null,
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
        } else return false
      },
      onResize() {
      this.windowWidth = window.innerWidth
    }
    },
    mounted() {
      this.page()
      this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    }
  }
</script>

<template>
    <v-navigation-drawer
    class="py-sm-5 py-0"
    v-model="drawer"
    permanent
    rail
    :location="windowWidth < 600 ? 'bottom' : 'left'"
    >
    
    <v-avatar v-if="windowWidth > 600" class="mx-2">
      <img
        src="../assets/img/logo.png"
        width="50"
      />
    </v-avatar>
    <v-row class="justify-center">
    <v-list class="d-flex flex-sm-column" active-color="#3B7AA9">
    <v-list-item
      class="rounded-lg text-caption mb-sm-5 mb-0 mt-sm-4 mt-0"
      value="master"
      @click="drawerMaster = !drawerMaster"
      :active="page()"
      >
      <v-icon>mdi-database</v-icon>
      <v-tooltip
          activator="parent"
          :location="windowWidth > 600 ? 'start' : 'top'"
        >
          Data Master
        </v-tooltip>
    </v-list-item>
    <RouterLink to="/in">
      <v-list-item class="rounded-lg text-caption mb-sm-5 mb-0" :active="this.pageTitle == 'PEMASUKAN BARANG' ? true : false" value="inItems">
        <v-icon>mdi-inbox-arrow-down</v-icon>
        <v-tooltip
          activator="parent"
          :location="windowWidth > 600 ? 'start' : 'top'"
        >
          Pemasukan Barang
        </v-tooltip>
      </v-list-item>
    </RouterLink>
    <RouterLink to="/production">
      <v-list-item class="rounded-lg text-caption mb-sm-5 mb-0" :active="this.pageTitle == 'PRODUKSI BARANG' ? true : false" value="productItems">
        <v-icon>mdi-chart-donut</v-icon>
        <v-tooltip
          activator="parent"
          :location="windowWidth > 600 ? 'start' : 'top'"
        >
          Produksi Barang
        </v-tooltip>
      </v-list-item>
    </RouterLink>
    <RouterLink to="/out">
      <v-list-item class="rounded-lg text-caption mb-sm-5 mb-0" :active="this.pageTitle == 'PENGELUARAN BARANG' ? true : false" value="outItems">
        <v-icon>mdi-inbox-arrow-up</v-icon>
        <v-tooltip
          activator="parent"
          :location="windowWidth > 600 ? 'start' : 'top'"
        >
          Pengeluaran Barang
        </v-tooltip>
      </v-list-item>
    </RouterLink>
    <RouterLink to="/send">
      <v-list-item class="rounded-lg text-caption mb-sm-5 mb-0" :active="this.pageTitle == 'PENGIRIMAN BARANG' ? true : false" value="sendItems">
        <v-icon>mdi-send-variant</v-icon>
        <v-tooltip
          activator="parent"
          :location="windowWidth > 600 ? 'start' : 'top'"
        >
          Pengiriman Barang
        </v-tooltip>
      </v-list-item>
    </RouterLink>

  </v-list>
</v-row>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="drawerMaster"
      temporary
      class="elevation-0"
    >
    <v-list nav density="comfortable" class="ms-n2 my-sm-4 my-0" active-color="#3B7AA9">
    <v-span class="text-button ms-6">Master</v-span>
    <v-divider class="mb-3"></v-divider>
    <RouterLink to="/items">
      <v-list-item title="Data Barang" class="rounded-left-lg  ps-6" :active="this.pageTitle == 'DATA BARANG' ? true : false" value="items"/>
      </RouterLink>
      <RouterLink to="/customers">
        <v-list-item title="Data Pelanggan" class="rounded-left-lg ps-6" :active="this.pageTitle == 'DATA PELANGGAN' ? true : false" value="customers"/>
      </RouterLink>
      <RouterLink to="/suppliers">
        <v-list-item title="Data Suppliers" class="rounded-left-lg ps-6" :active="this.pageTitle == 'DATA SUPPLIER' ? true : false" value="suppliers" />
      </RouterLink>
      <RouterLink to="/users">
        <v-list-item title="Data Users" class="rounded-left-lg ps-6" :active="this.pageTitle == 'DATA USERS' ? true : false" value="users" />
      </RouterLink>
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
