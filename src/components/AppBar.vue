<script setup>
import { mergeProps } from 'vue'
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
        }
    },
    methods: {
      mergeProps,
      logout() {
        api.logout()
      }

    },
  }
</script>

<template>
    <v-app-bar class="bg-blue-darken-4 text-md-h7">
          <v-app-bar-nav-icon variant="text" ></v-app-bar-nav-icon>
          
          <v-title class="mt-1">{{ pageTitle }}</v-title> 

          <v-spacer></v-spacer>

          <v-menu>
            <template v-slot:activator="{ props: menu }">
              <v-tooltip location="top">
                <template v-slot:activator="{ props: tooltip }">
                  <v-btn
                    variant="text" icon="mdi-dots-vertical"
                    v-bind="mergeProps(menu, tooltip)"
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
          </v-menu>

        </v-app-bar>
</template>