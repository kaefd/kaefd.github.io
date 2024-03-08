<template>
  <k-provider theme="ios">
    <div oncontextmenu="return false;" class="w-screen h-screen max-w-[2750px] mx-auto" :class="store().dark ? 'dark' : 'bg-base'">
      <div class="flex w-full h-full">
        <!-- APPBAR -->
        <div v-if="store().AppBar && $router.currentRoute.value.name != 'login'" class="duration-300 absolute lg:relative z-[2]" :class="store().nav ? 'w-full md:w-[22rem] h-max md:h-full' : 'w-full md:w-0 h-0 md:full'">
          <AppBar/>
        </div>
        <div class="h-full w-full flex flex-col">
          <!-- TOPBAR -->
          <div v-if="store().TopBar && $router.currentRoute.value.name != 'login'" class="w-full">
            <TopBar />
          </div>
          <!-- CONTENT -->
          <router-view class="w-full ps-0 md:ps-[96px]" :class="store().dark ? 'dark' : 'bg-base'"></router-view>
        </div>
      </div>
    </div>
    <base-loader v-if="store().loading"></base-loader>
  </k-provider>
</template>

<script setup>
  import { store } from '@/utils/store'
  import { kProvider } from 'konsta/vue';
  import AppBar from './layout/AppBar.vue';
  import TopBar from './layout/TopBar.vue';
</script>
<script>
export default {
  computed: {
    windows() {
      return window.screen.width
    }
  },
  methods: {
    close() {
      store().nav = false
    },
  },
}
</script>