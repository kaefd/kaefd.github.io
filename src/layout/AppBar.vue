<template>
  <div class="fixed w-max z-10">
    <div class="sr-only sm:not-sr-only flex text-sm">
      <!-- RAIL MENU -->
      <div class="w-18 h-screen flex flex-col justify-center items-center border-e" :class="store().theme == 'dark' ? 'dark border-dark-hover' : 'bg-white'">
        <div class="flex flex-col space-y-5">
          <template v-for="go in $router.options.routes">
            <div v-if="go.icon != false && otoritas.akses(go.name) == true" @click="current(go)" class="w-12 h-12 flex justify-center items-center rounded-full" :class="active(go) ? 'bg-primary shadow-xl' : store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-slate-100'">
              <i v-if="active(go)" :class="go.icon" class="text-xl"></i>
              <i v-else :class="go.icon" class="text-xl"></i>
            </div>
          </template>
        </div>
        <!-- <div class="flex flex-col space-y-5">
          <div class="p-3 mx-auto rounded-full hover:bg-slate-100" :class="!active ? 'bg-primary shadow-xl' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
          </div>
          <div class="p-3 mx-auto rounded-full hover:bg-slate-100" :class="!active ? 'bg-primary shadow-xl' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
          </div>
        </div> -->
      </div>
      <!-- DETAIL MENU -->
      <div class="h-screen flex flex-col justify-between pt-12 pb-10 items-start border-e rounded-e-3xl duration-300 overflow-hidden" :class="!store().nav ? 'w-0 ps-0' : (store().theme == 'dark' ? 'dark border-dark-hover w-72 ps-4' : 'bg-white w-72 ps-4')">
        <div v-if="children" class="flex flex-col space-y-1 w-max">
          <!-- HEADER -->
          <div class="flex flex-col h-18 ms-3">
            <p class="font-semibold text-xl">{{ detail.name }}</p>
            <p class="text-xs text-neutral-400 w-40">{{ detail.subname }}</p>
          </div> 
          <!-- CHILD MENU -->
          <div v-for="child in children">
            <router-link v-if="otoritas.Cakses(child.name) == true" :to="parent+'/'+child.path" class="w-full">
              <div class="p-3 w-60 rounded-s rounded-e-3xl flex space-x-4 items-center" :class="$router.currentRoute.value.name == child.name ? 'bg-primary-hover' : (store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-slate-100')">
                <i :class="child.icon" class="text-base"></i>
                  <span>{{ child.name }}</span>
              </div>
            </router-link>
          </div> 
        </div>
      </div>
      <!-- EXPAND BUTTON -->
      <div class="relative">
        <button @click="nav()" class="w-8 h-8 bg-primary bottom-11 -ms-4 rounded-full opacity-80 fixed flex justify-center items-center">
          <svg v-if="store().nav" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="w-4 h-4 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          <svg v-if="!store().nav" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="w-4 h-4 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>
      </div>
    </div>
    <!-- MOBILE -->
    <div class="sm:sr-only flex text-sm  justify-center">
      <kTabbar class="fixed left-0 bottom-0 h-13 flex items-center" bgClass="bg-white">
        <template v-for="go in $router.options.routes.slice(2)">
          <kTabbarLink v-if="go.icon != false && otoritas.akses(go.name) == true" @click="current(go)">
            <div class="mx-auto rounded-full flex justify-center items-center w-10 h-10">
              <i v-if="active(go)" :class="go.icon" class="text-xl text-primary-tint"></i>
              <i v-else :class="go.icon" class="text-xl"></i>
            </div>
          </kTabbarLink>
        </template>
      </kTabbar>
      <div class="fixed rounded-t-3xl bottom-0 left-0 border-t duration-300 w-full" :class="store().nav ? (store().theme == 'dark' ? 'dark h-56 pt-3 mb-12' : 'bg-white h-56 pt-3 mb-12') : 'bg-white h-0 p-0 m-0'">
        <div class="bg-gradient-to-t from-gray-500 to-transparent w-full h-4 bottom-0 fixed mb-12 opacity-15"></div>
        <div class="flex flex-col space-y-1 px-8 pt-3 h-48 overflow-auto">
          <div v-for="child in children">
            <router-link v-if="otoritas.Cakses(child.name) == true" :to="parent+'/'+child.path" class="w-full">
              <div class="p-3 rounded-xl" :class="$router.currentRoute.value.path == child.path ? (store().theme == 'dark' ? 'dark bg-primary shadow-xl' : '') : (store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-slate-100')">{{ child.name }}</div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="fixed bg-slate-300"></div>
    </div>
  </div>
</template>
<script setup>
import { kLink, kTabbar, kTabbarLink } from 'konsta/vue'
import { store } from '@/utils/store'
import otoritas from '@/router/otoritas'
</script>
<script>
export default {
  // props: {otority: {type: Object}},
  data () {
    return {
      parent: '',
      children: '',
      detail: '',
    }
  },
  methods: {
    current(value) {
      let stores = store()
      let child = value.children
      let before = this.$router.currentRoute.value.matched[0].path
      if(value.children) {
        this.parent = value.path
        this.detail = value
        this.children = child
        stores.$patch((state) => {
          state.nav = !state.nav
        })
      } else {
        this.$router.push(value.path).then(()=>{
          stores.$patch((state) => {
            state.nav = false
          })
        })
      }
      // this.$router.push(value.path).then(()=>{
      //   if(child) { 
      //     this.children = child
      //     let stat = stores.nav
      //     if(before == this.$router.currentRoute.value.matched[0].path && stat) stores.$patch((state: { nav: boolean; }) => { state.nav = false })
      //     else stores.$patch((state: { nav: boolean; }) => { state.nav = true })
      //   } else {
      //     this.children = ''
      //     stores.$patch((state: { nav: boolean; }) => { state.nav = false })
      //   }
      // })
    },
    active(value) {
      return this.$router.currentRoute.value.path == value.path || this.$router.currentRoute.value.matched[0].path == value.path ? true : false
    },
    nav () {
      let stores = store()
      if(this.children != '') {
        stores.$patch((state) => {
          state.nav = !state.nav
        })
      }
    }
  }
}
</script>