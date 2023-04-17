<script setup>
import { RouterLink } from 'vue-router'
</script>

<script>
  export default {
    data () {
      return {
        master: ['master'],
        
      }
    },
  }
</script>

<template>
    <v-navigation-drawer temporary width="300">
          <v-list-item class="d-flex justify-center text-center py-7">
            <v-icon color="#0d47a1" icon="mdi-account-circle" size="70px"></v-icon>
            <h3 class="text-blue-darken-4 font-weight-regular">ADMIN</h3>
          </v-list-item>

          <v-divider></v-divider>

          <v-list nav density="comfortable" active-color="info">
            <v-list-group v-model:opened="master" value="master">

              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  title="Master"
                  >
                </v-list-item>
              </template>
                <RouterLink to="/items">
                  <v-list-item title="Data Barang" value="items" />
                </RouterLink>
                <RouterLink to="/customers">
                  <v-list-item title="Data Pelanggan" value="customers" />
                </RouterLink>
                <RouterLink to="/suppliers">
                  <v-list-item title="Data Suppliers" value="suppliers" />
                </RouterLink>
                <RouterLink to="/users">
                  <v-list-item title="Data Users" value="users" />
                </RouterLink>

                <v-divider></v-divider>
            </v-list-group>



            <RouterLink to="/in">
              <v-list-item title="Pemasukan Barang" value="inItems" />
            </RouterLink>
            <RouterLink to="/production">
              <v-list-item title="Produksi Barang" value="productItems" />
            </RouterLink>
            <RouterLink to="/out">
              <v-list-item title="Pengeluaran Barang" value="outItems" />
            </RouterLink>
            <RouterLink to="/send">
              <v-list-item title="Pengiriman Barang" value="sendItems" />              
            </RouterLink>


            <v-list-group v-model:opened="laporan" value="laporan">

              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  title="Laporan"
                  >
                </v-list-item>
              </template>

              <RouterLink to="/stock-report">
                <v-list-item title="Laporan Stok Barang" value="stock-report" />
              </RouterLink>
              <RouterLink to="/in-report">
                <v-list-item title="Laporan Pemasukan Barang" value="in-report" />
              </RouterLink>
              <RouterLink to="/out-report">
                <v-list-item title="Laporan Pengeluaran Barang" value="out-report" />
              </RouterLink>
              <RouterLink to="/log-report">
                <v-list-item title="Laporan Log User" value="log-report" />
              </RouterLink>

              <v-divider></v-divider>
              
              </v-list-group>
            </v-list>
    </v-navigation-drawer>
</template>

<style scoped>

a {
  color: rgb(31, 31, 31);
}

</style>
