<script setup>
import { defineComponent } from 'vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';
import api from '../api';

</script>
<script>
  export default defineComponent({
    name:'UserView',
    components: {
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
        scrollInvoked: 0,
        items: '',
        jns_otoritas: ['Data Barang', 'Data Pelanggan', 'Data Supplier', 'Data User', 'Pembelian', 'Produksi', 'Penjualan', 'Pengiriman', 'Laporan' ],
        user_otoritas: '',
        
      }
    },
    created() {
        api.getData('/user?status=true')
        .then(response => {
          this.items = response.data
        })
        .catch(() => {
          window.location.href = '/login'
        })
        api.getData('/user_otoritas?username=admin')
        .then(response => {
          this.user_otoritas = response.data
        })
        .catch(() => {
          window.location.href = '/login'
        })
        
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
        dataUser(u, p) {
          this.username = u
          this.password = p
        },
        onScroll () {
        this.scrollInvoked++
      },
    },
  })
</script>
<template>
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
<v-container>

  {{ user_otoritas[0].status }}

  <v-row class="d-flex w-100 mt-1 mx-auto">
  <v-col md="7" xs="12">
    <v-card class="elevation-0 pa-3 rounded-lg h-100" min-width="250">
      <v-btn class="mb-5 rounded-lg" variant="tonal" icon="mdi-plus" color="indigo"></v-btn>
      <!-- KODE USER -->
      <v-list>
        <v-list-item
          class="bg-indigo-lighten-5 rounded-lg"
          title="Kode User">
        </v-list-item>

        <v-list-item
          v-for="item, i in items" :key="i"
          style="cursor: pointer;"
          @click="dataUser(item.username, item.password)"
          :title="item.username">
        </v-list-item>

      </v-list>
    </v-card>
  </v-col>
  <!-- DETAIL USER -->
  <v-col lg="5" xs="12">
    <v-card class="elevation-0 pt-5 rounded-lg" min-width="320">
      <v-container class="mx-auto">
        <p class="h5 text-center text-blue-darken-4 mb-5">DETAILS USER</p>
        <!-- USERNAME -->
        <v-label class="text-body-2 text-blue-darken-4">Username</v-label>
        <v-text-field
          v-model="username"
          density="compact"
          variant="tonal"
          class="rounded-lg bg-indigo-lighten-5"
          single-line
          hide-details
          />
        <!-- PASSWORD -->
        <v-label class="text-body-2 text-blue-darken-4">Password</v-label>
        <v-text-field
          v-model="password"
          type="password"
          density="compact"
          variant="tonal"
          class="rounded-lg bg-indigo-lighten-5"
          single-line
          hide-details
          />
      </v-container>
      <!-- JENIS OTORITAS -->
      <p class="w-100 bg-blue-darken-4 pa-3 text-center">JENIS OTORITAS</p>
      <v-list
      v-scroll.self="onScroll"
      class="overflow-y-auto"
      max-height="400">
        
          <v-list-group>
            <template v-slot:activator="{ props }">
              <!-- (TITLE) JENIS OTORITAS -->
              <v-list-item
                  v-bind="props"
                  class="me-0 ms-auto"
                  height="5"
                >
                <v-checkbox
                  color="blue"
                  class="mt-5"
                  :label="otoritas['Data Barang'][0].jenisotoritas"
                  :model-value="user_otoritas[0].status">
                </v-checkbox>
            </v-list-item>
              </template>
    
                <v-checkbox
                  color="blue"
                  :label="user_otoritas[21].jenis_otoritas"
                  :model-value="user_otoritas[0].status"
                  class="ms-6 mb-n6"
                >
                </v-checkbox>
          </v-list-group>
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