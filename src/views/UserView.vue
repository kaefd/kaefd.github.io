<script setup>
import TableVue from '../components/TableVue.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';

</script>
<script>
  export default {
    components: {
    TableVue, NavDrawers, AppBar
},
    data () {
      return {
        drawer: false,
        pageTitle: 'DATA USER',
        headers: [
          { title: 'Kode User', align: 'start', key: 'userCode'},
        ],
        items: [
          {
            userCode: 'admin',
          },
          {
            userCode: 'beacukai',
          },
        ],
        random: ['dataItem', 'dataCustomer', 'dataSupplier', 'dataUser'],
        actions: ['Tambah Barang', 'Ubah Barang', 'Hapus Barang'],
        permission: ['Data Barang', 'Data Pelanggan'],
        
      }
    },
  }
</script>
<template>
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
<v-container>
  <v-row no-gutters>
    <v-col cols="8">
      <v-card class="py-5  px-3 me-3 rounded">
          <v-btn class="mb-3 bg-indigo-darken-1 text-body-2" size="large">Tambah baru</v-btn>
          <TableVue :headers="headers" :items="items" :search="search" :category="category"/>
      </v-card>
    </v-col>
    <v-col cols="4">
        <v-card class="px-3 py-5 " height="555">
          <v-card-text class="text-blue-darken-4 text-body-1 text-center" >DETAIL USER</v-card-text>
          <v-text-field label="Username" variant="outlined" density="compact"></v-text-field>
          <v-text-field type="password" label="Password" variant="outlined" density="compact"></v-text-field>
          <v-sheet>
              <v-sheet class="bg-blue-darken-4 px-3 py-3 align-start">
                  <v-text>Jenis Otoritas</v-text>
              </v-sheet>
              <v-list nav density="comfortable" active-color="info">
                <v-for v-for="all, a in permission" :key="a">
                  <v-list-group v-model:opened="random[a]" :value="random[a]">
                      <template v-slot:activator="{ props }">
                          <v-list-item
                          v-bind="props"
                          :title="all"
                          >
                          </v-list-item>
                      </template>
                        <v-for v-for="a, i in actions" :key="i">
                          <v-list-item :title="a" :value="a" class="text-end"/>
                        </v-for>
                        <v-divider></v-divider>
                      </v-list-group>
                </v-for>
                </v-list>
          </v-sheet>
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