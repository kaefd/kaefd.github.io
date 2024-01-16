<template>
  <div class="fixed w-max z-10">
    <div class="sr-only sm:not-sr-only flex text-sm">
      <!-- RAIL MENU -->
      <div class="w-24 h-screen flex flex-col justify-center items-center border-e" :class="store().theme == 'dark' ? 'dark border-dark-hover' : 'bg-white'">
        <div class="flex flex-col space-y-5">
          <template v-for="go in $router.options.routes">
            <div v-if="go.icon != false && otoritas.akses(go.name)" @click="current(go)" class="w-16 h-16 flex flex-col justify-center cursor-pointer items-center rounded" :class="active(go) ? 'text-primary' : store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-slate-100'">
              <i v-if="active(go)" :class="go.icon" class="text-2xl"></i>
              <i v-else :class="go.icon" class="text-2xl"></i>
              <span class="text-center text-xs capitalize">{{ go.path.slice(1) }}</span>
            </div>
          </template>
          <!-- <div @click="current()" class="w-18 h-18 flex flex-col justify-center items-center rounded">
              <i :class="$router.options.routes.find(r => r.path == '/dashboard').icon" class="text-xl"></i>
              <span class="text-center text-xs capitalize">dashboard</span>
          </div>
          <div class="w-18 h-18 flex flex-col justify-center items-center rounded">
              <i :class="$router.options.routes.find(r => r.path == '/master').icon" class="text-xl"></i>
              <span class="text-center text-xs capitalize">master</span>
          </div>
          <div class="w-18 h-18 flex flex-col justify-center items-center rounded">
              <i class="ri-flow-chart text-xl"></i>
              <span class="text-center text-xs capitalize">transaksi</span>
          </div>
          <div class="w-18 h-18 flex flex-col justify-center items-center rounded">
              <i :class="$router.options.routes.find(r => r.path == '/laporan').icon" class="text-xl"></i>
              <span class="text-center text-xs capitalize">laporan</span>
          </div> -->
        </div>
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
                <i :class="child.icon"></i>
                <span>{{ child.name }}</span>
              </div>
            </router-link>
          </div> 
        </div>
      </div>
      <!-- EXPAND BUTTON -->
      <!-- <div class="relative">
        <button @click="nav()" class="w-8 h-8 bg-primary bottom-11 -ms-4 rounded-full opacity-80 fixed flex justify-center items-center">
          <svg v-if="store().nav" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="w-4 h-4 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          <svg v-if="!store().nav" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="w-4 h-4 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>
      </div> -->
    </div>
    <!-- MOBILE -->
    <div class="sm:sr-only flex text-sm  justify-center">
      <kTabbar class="fixed left-0 bottom-0 h-16 flex items-center" :bgClass="store().theme == 'dark' ? 'dark' : 'bg-white'">
        <template v-for="go in $router.options.routes.slice(2)">
          <kTabbarLink v-if="go.icon != false && otoritas.akses(go.name) == true" @click="current(go)">
            <div class="mx-auto rounded-full flex flex-col justify-center items-center w-10 h-10">
              <i v-if="active(go)" :class="go.icon" class="text-xl text-primary"></i>
              <i v-else :class="go.icon" class="text-xl"></i>
              <span>{{ go.name }}</span>
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
      <div class="fixed"></div>
    </div>
  </div>
</template>
<script setup>
import { kTabbar, kTabbarLink } from 'konsta/vue'
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
      let before = this.$router.currentRoute.value.matched
      if(value.children) {
        this.parent = value.path
        this.detail = value
        this.children = child
        // jika before punya child dan current punya child dan before == current maka jikan nav true maka false jika false maka true
        // jika before punya child dan current punya child maka true dan before != current maka true
        // jka before tidak punya child dan current punya child maka true
        // jika before punya child dan current tidak maka false
        if(before.length > 1 && before[0].path == value.path && !store().nav) store().$patch((state) => {state.nav = true})
        else if(before.length > 1 && before[0].path != value.path && !store().nav) store().$patch((state) => {state.nav = true})
        else if(before.length > 1 && before[0].path == value.path && !store().nav) store().$patch((state) => {state.nav = false})
        else if(before.length > 1 && before[0].path == value.path && store().nav) store().$patch((state) => {state.nav = false})
        else if(before.length == 1 && before[0].path != value.path && !store().nav) store().$patch((state) => {state.nav = true})

      } else {
        this.$router.push(value.path).then(() => {
          stores.$patch((state) => {
            state.nav = false
          })
        })
      }
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