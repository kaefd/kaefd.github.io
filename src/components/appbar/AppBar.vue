<script setup>
import api from '../../service/api';
</script>

<script>
export default {
  props:['pageTitle'],
    data(){
        return {
            user: '',
            dark: false,
            menu: [
                    { title: 'Ubah Password', value: 'changepass' },
                    { title: 'Logout', value: 'logout'},
                ],
            title: this.pageTitle
        }
    },
    created() {
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
      this.user = localStorage.getItem('user')
    }
  }
</script>

<template>
    <v-app-bar class="elevation-0 py-1 border-b-sm" height="55">
      <v-container class="d-flex align-center">
        <slot name="app-btn"></slot>
        <!-- TITLE -->
        <v-title class="text-button font-weight-medium text-blue-custom">{{ pageTitle }}</v-title> 
        <v-spacer></v-spacer>
        <v-div class="d-flex align-center">
          <v-btn icon size="small" color="blue-custom" @click="theme()">
            <v-span v-if="dark" class="material-symbols-outlined">dark_mode</v-span>
            <v-span v-if="!dark" class="material-symbols-outlined">light_mode</v-span>
          </v-btn>
          <v-divider vertical class="mx-2"></v-divider>
          <v-sheet id="akun" class="d-flex align-center text-blue-custom">
            <v-avatar class="bg-blue-custom me-2" size="small">
              <v-icon size="25" color="white">mdi-account</v-icon>
            </v-avatar>
            <v-span class="text-caption d-flex">
              {{ user }}
              <v-icon size="20">mdi-chevron-down</v-icon>
            </v-span>
            <v-menu activator="#akun">
              <v-card width="300"  class="rounded-xl pa-2 border">
                <div class="d-flex flex-column align-center rounded-xl border">
                  <v-avatar class="bg-blue-custom mt-3" size="100">
                    <v-icon size="80">mdi-account</v-icon>
                  </v-avatar>
                  <v-span>{{ user }}</v-span>
                  <v-btn class="d-flex justify-start align-left rounded-b-xl elevation-0 mt-5" block size="60">
                    <v-icon color="grey-darken-3 me-2 mt-n1 ms-6" size="19">mdi-key</v-icon>
                    <v-span class="text-body-2">Ganti Password</v-span>
                  </v-btn>
                </div>
                <v-btn @click="logout()" variant="text" class="d-flex justify-start align-left rounded-xl elevation-0 text-body-2" block size="60">
                  <v-icon size="20" class="me-2 ms-6">mdi-logout</v-icon>
                  <v-span>Log out</v-span>
                </v-btn>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-div>
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
</style>