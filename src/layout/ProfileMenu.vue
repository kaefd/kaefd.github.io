<template>
    <button @click="active = !active" class="w-12 h-12 bg-primary rounded-full overflow-hidden flex justify-center items-center">
        <img src="@/assets/img/person1.png" alt="avatar">
    </button>
    <div v-if="active" @click="active = false" class="absolute h-screen w-screen right-0 top-0 overflow-hidden duration-300 rounded-s-3xl bg-scrim"></div>
    <div class="absolute h-screen right-0 top-0 overflow-hidden duration-300 rounded-s-3xl" :class="!active ? 'w-0' : (store().theme == 'dark' ? 'dark w-80' : 'bg-white w-80')">
        <div class="w-full flex flex-col gap-y-3 py-5 items-center justify-center">
            <span class="text-xl font-semibold">Profil Pengguna</span>
            <div class="block text-center">
                <img src="@/assets/img/person1.png" alt="avatar" class="rounded-full">
                <label class="capitalize">{{ user }}</label>
            </div>
            <div class="w-[60%] flex flex-col gap-y-2 mt-5">
                <!-- <div @click="fun('setting')" class="flex items-center gap-x-3 px-3 rounded-full border h-12 hover:bg-primary-hover cursor-pointer">
                    <i class="ri-settings-5-line text-xl"></i>
                    <span>Pengaturan</span>
                </div> -->
                <div @click="fun('log')" class="flex items-center gap-x-3 px-3 rounded-full border h-12 hover:bg-primary-hover cursor-pointer">
                    <i class="ri-history-line text-xl"></i>
                    <span>Log Aktivitas</span>
                </div>
                <div class="flex items-center gap-x-3 px-3 rounded-full border h-12 hover:bg-primary-hover cursor-pointer">
                    <i class="ri-key-line text-xl"></i>
                    <span>Ubah Password</span>
                </div>
                <div @click="fun('out')" class="flex items-center gap-x-3 px-3 rounded-full border h-12 hover:bg-primary-hover cursor-pointer">
                    <i class="ri-logout-circle-line text-xl"></i>
                    <span>Keluar</span>
                </div>
            </div>
        </div>
    </div>
    <Pengaturan v-if="setting" @close="close"/>
</template>
<script setup>
import api from '@/utils/api'
import {store} from '@/utils/store'
import Pengaturan from '@/views/user/Pengaturan.vue'
</script>
<script>
export default {
    data() {
        return {
            active: false,
            setting: false,
            user: localStorage.getItem('user')
        }
    },
    methods: {
        fun(param) {
            if(param == 'out') api.logout()
            if(param == 'log') this.$router.push({path: '/log-aktivitas'})
            if(param == 'setting') this.setting = true
        },
        close(v) {
            this.setting = v
        }
    }
}
</script>