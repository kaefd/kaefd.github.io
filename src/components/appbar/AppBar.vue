<script setup>
import api from '../../service/api';
</script>

<script>
export default {
  props:['pageTitle'],
    data(){
        return {
            user: '',
            dark: null,
            menu: [
                    { title: 'Ubah Password', value: 'changepass' },
                    { title: 'Logout', value: 'logout'},
                ],
            title: this.pageTitle
        }
    },
    created() {
      this.user = localStorage.getItem('user')
    },
    methods: {
      logout() {
        api.logout()
      },
      theme() {
        this.dark =! this.dark
        this.$emit('dark', this.dark)
      }
    },
    mounted() {
    }
  }
</script>

<template>
    <v-app-bar class="py-1 elevation-0 bg-light" height="53">
      <v-container class="w-100 d-flex align-center">
        <slot name="app-btn"></slot>
        <!-- TITLE -->
        <v-toolbar class="bg-transparent pe-3 ms-n5">
          <v-toolbar-title class="  title text-uppercase">{{ pageTitle }}</v-toolbar-title> 
          <v-spacer></v-spacer>
          <div class="d-flex align-center">
          <!-- THEME BUTTON -->
            <v-btn icon size="small" color="black" @click="theme()">
              <v-span v-if="dark" class="material-symbols-outlined">dark_mode</v-span>
              <v-span v-if="!dark" class="material-symbols-outlined">light_mode</v-span>
            </v-btn>
            <v-divider vertical class="mx-2"></v-divider>
            <!-- USER -->
            <div id="akun" class="d-flex align-center text-blue-custom clickable ms-2">
              <slot name="user"></slot>
              <!-- <v-menu activator="#akun">
                <v-card width="300"  class="rounded-xl pa-2 border">
                  <div class="d-flex flex-column align-center rounded-xl border">
                    <v-avatar class="bg-blue-custom mt-3 mb-2" size="100">
                      <v-icon size="80">mdi-account</v-icon>
                    </v-avatar>
                    <v-span>{{ user }}</v-span>
                    <v-btn class="d-flex justify-start align-left rounded-b-xl elevation-0 mt-5" block size="60">
                      <v-icon color="mt-n1 ms-6" size="19">mdi-key</v-icon>
                      <v-span class="ms-2 text-body-2">Ganti Password</v-span>
                    </v-btn>
                  </div>
                  <v-btn @click="logout()" variant="text" class="d-flex justify-start align-left rounded-xl elevation-0 text-body-2" block size="60">
                    <v-icon size="20" class="me-2 ms-6">mdi-logout</v-icon>
                    <v-span>Log out</v-span>
                  </v-btn>
                </v-card>
              </v-menu> -->
            </div>
          </div>
        </v-toolbar>
      </v-container>
    </v-app-bar>
</template>

<style scoped>
.clickable {
  cursor: pointer;
}
.bg-inherit {
  background: #fafafa !important;
}
.title {
  font-size: 17px;
}
</style>