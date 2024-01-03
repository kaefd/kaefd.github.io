<template>
    <div v-if="!store().detail_dialog" class="w-full h-15 ps-0 md:ps-24 absolute z-[1]" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-base'">
        <div class="w-full h-full flex justify-between items-center px-4 md:px-8">
            <div class="duration-300" :class="store().nav ? 'translate-x-0 md:translate-x-72 max-w-max md:max-w-[78%]' : '-translate-x-0'">
                <span class="text-lg md:text-xl font-semibold">{{ $router.currentRoute.value.name }}</span>
            </div>
            <div class="flex items-center gap-x-5 ">
                <button @click="theme()">
                    <i v-if="!dark" class="ri-sun-line text-2xl"></i>
                    <i v-else class="ri-moon-line text-2xl"></i>
                </button>
                <div class="h-8 w-1 border-s-[1px] border-slate-400"></div>
                <ProfileMenu />
            </div>
        </div>
    </div>
</template>
<script setup>
import { store } from '@/utils/store'
import ProfileMenu from './ProfileMenu.vue'
</script>
<script>
export default {
    data() {
        return {
            dark: false
        }
    },
    methods: {
        theme() {
            this.dark = !this.dark
            if(this.dark) {
                store().$patch((state) => { state.theme = 'dark'})
                localStorage.setItem('theme', 'dark')
                document.documentElement.classList.remove('light')
                document.documentElement.classList.add('dark')
                
            } else {
                document.documentElement.classList.remove('dark')
                document.documentElement.classList.add('light')
                localStorage.setItem('theme', 'light')
                store().$patch((state) => { state.theme = 'light'})
            }
        }
    }
}
</script>