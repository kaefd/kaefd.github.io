<template>
    <div v-if="!store().detail_dialog" class="w-full h-15 ps-0 md:ps-24 z-[1]" :class="store().dark ? 'bg-dark-base' : 'bg-base'">
        <div class="w-full h-full flex justify-between items-center px-4 md:px-8">
            <span class="text-lg md:text-lg font-semibold">{{ title }}</span>
            <div class="flex items-center gap-x-5 ">
                <button @click="theme()">
                    <i v-if="!store().dark" class="ri-sun-line text-2xl"></i>
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
    computed: {
        title () {
            return this.$router.currentRoute.value.matched[0].children != '' ? this.$router.currentRoute.value.matched[0].children.find(r => r.name == this.$router.currentRoute.value.name).title : this.$router.currentRoute.value.name
        }
    },
    methods: {
        theme() {
            store().dark = !store().dark
        }
    }
}
</script>