<script setup>
import api from '../api';
</script>

<script>
export default {
  props:['pageTitle'],
    data(){
        return {
            menu: [
                    { title: 'Ubah Password', value: 'changepass' },
                    { title: 'Logout', value: 'logout'},
                ],
            title: this.pageTitle
        }
    },
    methods: {
      logout() {
        api.logout()
      }

    },
  }
</script>

<template>
    <v-app-bar class="elevation-0 border-bottom bg-grey-lighten-5 py-1" height="45">
      <v-container class="d-flex align-center">
        <!-- APP BAR ICON -->
        <!-- <v-app-bar-nav-icon size="small" class="me-3"></v-app-bar-nav-icon> -->
        <!-- TITLE -->
        <v-title class="text-button">{{ pageTitle }}</v-title> 
        <v-spacer></v-spacer>
        <div id="account">
          <v-avatar>
            <v-icon color="grey-darken-1" size="large">mdi-account-circle</v-icon>
          </v-avatar>
          <span class="text-caption">Admin</span>
          <v-icon size="20">mdi-chevron-down</v-icon>
        </div>
        <v-menu activator="#account">
            <v-card width="300"  class="rounded-xl pa-2 bg-grey-lighten-3 border">
              <div class="d-flex flex-column align-center bg-white rounded-xl">
                <v-avatar size="100">
                  <v-icon size="80">mdi-account-circle</v-icon>
                </v-avatar>
                <v-span>Admin</v-span>

                <v-btn class="d-flex justify-start align-left rounded-b-xl elevation-0 mt-5" block size="60">
                  <v-icon color="grey-darken-3 me-2 mt-n1 ms-6" size="19">mdi-key</v-icon>
                  <v-span class="text-body-2">Ganti Password</v-span>
                </v-btn>
              </div>
              <v-btn @click="logout()" variant="text" class="d-flex justify-start align-left rounded-xl elevation-0 text-body-2" block size="60">
                <v-icon size="20" class="me-2 ms-6">mdi-logout</v-icon>
                <v-span>Log out</v-span>
              </v-btn>
              <v-divider></v-divider>
            </v-card>
        </v-menu>
        <!-- <v-menu>
          <template v-slot:activator="{ props: menu }">
            <v-tooltip location="top">
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                  variant="text" icon="mdi-dots-vertical"
                  v-bind="mergeProps(menu, tooltip)"
                  size="small"
                  width="45"
                  height="45"
                >
                </v-btn>
              </template>
              <span>Show Menu</span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list>
              <v-list-item>Ubah Password</v-list-item>
              <v-list-item @click="logout()">Logout</v-list-item>
            </v-list>
          </v-list>
        </v-menu> -->

      </v-container>

        </v-app-bar>
</template>

<style>
.bg-blue-custom {
  background: #3B7AA9 !important;
}
</style>