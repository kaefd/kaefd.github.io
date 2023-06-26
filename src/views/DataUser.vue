<script setup>
import { defineComponent } from 'vue';
import api from '../service/api';
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
        tab: null,
        username: '',
        password: '',
        otority: '',
        dialogotoritas: [],
        userselect: 'admin',
        open: ['barang', 'Laporan'],
        scrollInvoked: 0,
        items: '',
        jns_otoritas: ['Data Barang', 'Data Pelanggan', 'Data Supplier', 'Data User', 'Pembelian', 'Produksi', 'Penjualan', 'Pengiriman', 'Laporan' ],
        user_otoritas: '',
        headers: [
          {title: "Username", key: "username"},
        ],
        j_otoritas: [
          {title: 'Data Barang', value: ['Tambah Barang', 'Ubah Barang', 'Hapus Barang']},
          {title: 'Pelanggan', value: ['Tambah Pelanggan Baru', 'Ubah Pelanggan', 'Hapus Pelanggan']},
          {title: 'Supplier', value: []},
          {title: 'User', value: []},
          {title: 'Pembelian', value: []},
          {title: 'Produksi', value: []},
          {title: 'Penjualan', value: []},
          {title: 'Pengiriman', value: []},
          {title: 'Laporan', value: ['Laporan Stok Barang', 'Laporan Pemasukan', 'Laporan Produksi', 'Laporan Pengeluaran', 'Laporan Pengiriman', 'Laporan Log User']},
        ]
        
      }
    },
    created() {
        
    },
    computed: {
      // JENIS OTORITAS

        
    },
      methods: {
        getUser() {
          api.getData('/user?status=true')
          .then(response => {
            this.items = response.data
          })
          .catch(() => {
            return this.$router.push('login');
          })
        },
        getOtoritas(){
          const apiUrl = '/user_otoritas?'
          const params = {
            username: this.userselect,
          }
          api.getData(apiUrl, { params })
          .then(response => {
            this.user_otoritas = response.data
          })
          .catch(() => {
            return this.$router.push('login');
          })
        },
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
        otoritas(){
        return {
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
        },
        userotoritas(user, jns) {
          for (let i = 0; i < this.user_otoritas.length; i++) {
            for (let j = 0; j < this.j_otoritas.length; j++) {
              for (let k = 0; k < this.jns_otoritas.length; k++) {
                if(user == this.user_otoritas[i].username && jns == this.jns_otoritas[k])
                {
                  if(this.j_otoritas[j].title == jns) {
                    return this.j_otoritas[j].value
                  }
                }
              }
          }
         }
        },
        updt() {
          this.getOtoritas()
          this.getUser()
        }
    },
    mounted() {
      this.page()
      this.getOtoritas()
      this.getUser()
    }
  })
</script>
<template>
<v-container>
  <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
  <v-row class="d-flex w-100">
  <v-col>
    <v-card class="elevation-0 pa-3 vh-75 rounded-lg bg-transparent" min-width="250">
      <v-btn class="rounded-xl bg-blue-custom text-white elevation-0 text-caption" height="42" width="150">Tambah Baru</v-btn>
      <v-list class="bg-transparent">
        <v-list-item
          class="text-caption font-weight-bold"
          >
          KODE USER
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
        v-for="item, i in items" :key="i"
        class="text-caption" density="compact"
        @click="userselect = item.username"
        >
        {{ item.username }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
  <v-col cols="4">
    <v-card class="elevation-0 pt-5 h-100 rounded-lg bg-grey-lighten-4" min-width="320" max-width="300">
      <p class="h5 text-center text-blue-darken-4 mb-5">DETAILS USER</p>
      <v-text-field
        label="Username"
        v-model="userselect"
        density="compact"
        variant="outlined"
        class="w-75 mx-auto"
        readonly
        />
      <v-text-field
        label="Password"
        v-model="password"
        type="password"
        density="compact"
        variant="outlined"
        class="w-75 mx-auto"
        readonly
        />
      <p class="w-100 bg-blue-custom pa-1 text-center text-button text-white">JENIS OTORITAS</p>
      <v-list
      v-scroll.self="onScroll"
      class="overflow-y-auto bg-transparent"
      max-height="300">
        
        <!-- <v-for v-for="o, i in jns_otoritas" :key="i">
          <v-list-group :value="o">
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
        </v-for> -->
        <v-list-item
          v-for="jns, i in jns_otoritas" :key="i"
          class="text-caption"
          density="compact"
          @click="dialogotoritas[i] = true"
        >
        <v-checkbox density="compact" class="mb-n7" :label="jns" :model-value="true" readonly></v-checkbox>
        <v-dialog v-model="dialogotoritas[i]" @update="dialogotoritas" max-width="400">
          <v-card class="pa-5">
            <v-span class="text-caption font-weight-bold">Otoritas</v-span>
            <v-divider></v-divider>
              <v-checkbox
                class="text-caption mb-n7"
                density="compact"
                v-for="oto, j in userotoritas('admin', jns)" :key="j"
                :label="oto"
                :model-value="true"
                readonly
              ></v-checkbox>
          </v-card>
        </v-dialog>
        </v-list-item>
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