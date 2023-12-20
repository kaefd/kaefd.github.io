<template>
  <k-provider theme="ios">
    <div class="flex justify-center w-screen h-full overflow-hidden">
      <div class="flex w-full max-w-[3840px] h-full" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-base'">
        <!-- APP BAR -->
        <TopBar v-if="$router.currentRoute.value.path != '/login' && !store().suratjalan && !store().do"/>
        <AppBar v-if="$router.currentRoute.value.path != '/login' && !store().suratjalan && !store().do"/>
        <router-view class="w-full duration-300" :class="store().nav ? 'translate-x-0 md:translate-x-72 max-w-max md:max-w-[78%]' : '-translate-x-0'"></router-view>
        <div v-if="store().nav" @click="close()" class="absolute z-[0] md:z-[-1] h-full w-full"></div>
        <base-loader v-if="store().loading && $router.currentRoute.value.path != '/login'"></base-loader>
      </div>
    </div>
  </k-provider>
  </template>
  
  <script setup>
    import AppBar from './layout/AppBar.vue'
    import TopBar from './layout/TopBar.vue'
    import { store } from '@/utils/store'
    import api from '@/utils/api'
    import { kProvider } from 'konsta/vue';
  </script>
  <script>
  export default {
    computed: {
      auth() {
        let token = localStorage.getItem('token')
        return token ? true : false
      },
      // dark() {
      //   let dark = store().theme
      //   if(dark == 'dark') return true
      //   else return false
      // }
    },
    methods: {
      async allow() {
        const user = localStorage.getItem('user')
        let data = await api.getData('user_otoritas', {username: user, status: 'true'})
        store().$patch((state) => state.otoritas = data)
        // this.otoritas = data
      },
      close() {
        let stores = store()
        stores.$patch((state) => {
          state.nav = false
        })
      },
    },
    mounted() {
        this.allow()
    },
  }
  </script>