<script setup>
import TableVue from '../components/TableVue.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';

</script>
<script>
  export default {
    components: {
    TableVue,
    NavDrawers,
    AppBar,
},
    data () {
      return {
        drawer: false,
        pageTitle: 'DATA USER',
        username: '',
        password: '',
        open: ['barang', 'Laporan'],
        all: ['Tambah Data', 'Ubah Data', 'Hapus Data'],
        scrollInvoked: 0,
        headers: [
          { title: 'Kode User', align: 'start', key: 'userCode'},
        ],
        items: [
          { userCode: 'admin', password: 'ertrteyet' },
          { userCode: 'beacukai', password: 'gtrhtrhsh' },
        ],
        roles: ['admin', 'beacukai'],
        otoritas: [
          {
            title: 'Data Barang', key:'barang', action: [
              { title: 'Tambah Data', check: true },
              { title: 'Ubah Data', check: true },
              { title: 'Hapus Data', check: true },
            ]
          },
          {
            title: 'Data Pelanggan', key:'pelanggan', action: [
              { title: 'Tambah Data', check: true },
              { title: 'Ubah Data', check: true },
              { title: 'Hapus Data', check: true },
            ]
          },
          {
            title: 'Supplier', key:'supplier', action: ['']
          },
          {
            title: 'Data User', key:'user', action: ['']
          },
          {
            title: 'Data Pembelian', key:'pembelian', action: [
              { title: 'Tambah Pembelian Baru', check: true },
              { title: 'Batal Pembelian', check: true },
            ]
          },
          {
            title: 'Data Produksi', key:'produksi', action: [
              { title: 'Tambah Produksi Baru', check: true },
              { title: 'Batal Produksi', check: true },
            ]
          },
          {
            title: 'Data Penjualan', key:'penjualan', action: [
              { title: 'Tambah Penjualan Baru', check: true },
              { title: 'Batal Penjualan', check: true },
            ]
          },
          {
            title: 'Data Pengiriman', key:'pengiriman', action: [
              { title: 'Tambah Pengiriman Baru', check: true },
              { title: 'Batal Pengiriman', check: true },
            ]
          },
          {
            title: 'Laporan', key:'laporan', action: [
              { title: 'Laporan Stok Barang', check: true },
              { title: 'Laporan Pembelian', check: true },
              { title: 'Laporan Produksi', check: true },
              { title: 'Laporan Penjualan', check: true },
              { title: 'Laporan Pengiriman', check: true },
              { title: 'Laporan Log User', check: true },
            ]
          },
        ]
        
      }
    },
      methods: {
        dataUser(u, p) {
          this.username = u
          this.password = p
        },
        onScroll () {
        this.scrollInvoked++
      },
    },
  }
</script>
<template>
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
<v-container>
<v-row class="d-flex w-100 mt-1 mx-auto">
  <v-col>
    <v-card class="elevation-0 pa-3 h-screen rounded-lg" min-width="250">
      <v-btn class="mb-5 rounded-lg" variant="tonal" icon="mdi-plus" color="blue"></v-btn>
      <v-list>
        <v-list-item
          class="bg-blue-lighten-5 rounded-lg text-grey-darken-2"
          title="Kode User">
        </v-list-item>
        <v-list-item
        v-for="item, i in items" :key="i"
          style="cursor: pointer;"
          @click="dataUser(item.userCode, item.password)"
          :title="item.userCode">
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
  <v-col cols="4">
    <v-card class="elevation-0 pt-5 h-screen rounded-lg" min-width="320">
      <p class="h5 text-center text-blue-darken-4 mb-5">DETAILS USER</p>
      <v-text-field
        label="Username"
        v-model="username"
        density="compact"
        variant="outlined"
        class="w-75 mx-auto"
        />
      <v-text-field
        label="Password"
        v-model="password"
        type="password"
        density="compact"
        variant="outlined"
        class="w-75 mx-auto"
        />
      <p class="w-100 bg-blue-darken-4 pa-3 text-center">JENIS OTORITAS</p>
      <v-list
      v-scroll.self="onScroll"
      class="overflow-y-auto"
      max-height="400">
        
        <v-for v-for="o, i in otoritas" :key="i">
          <v-list-group :value="o.key">
            <template v-slot:activator="{ props }">
              <v-list-item
                  v-bind="props"
                  class="me-0 ms-auto"
                  height="5"
                ><v-checkbox color="blue" :model-value="true" class="mt-5" :label="o.title"></v-checkbox></v-list-item>
              </template>
    
              <v-if v-if=" otoritas[i].action != '' ">
                <v-checkbox
                  v-for="act, a in otoritas[i].action" :key="a"
                  color="blue"
                  :model-value="act.check"
                  :label="act.title"
                  class="ms-6 mb-n6"
                >
                </v-checkbox>
              </v-if>
          </v-list-group>
        </v-for>
      </v-list>
    </v-card>
  </v-col>
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