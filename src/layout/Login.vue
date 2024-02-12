<template>
<div class="w-screen h-screen bg-white flex flex-col items-center justify-center" :class="load ? 'cursor-wait' : ''">
    <div class="w-full absolute bottom-0">
        <img src="../assets/img/bgAuri.jpg" alt="">
    </div>
    <div class="absolute w-[28%] min-w-[350px] h-[80%] rounded-[20px] shadow-2xl flex flex-col justify-between py-13 md:py-[4%] items-center mb-15 bg-white">
        <div class="flex flex-col items-center gap-y-4">
            <img src="../assets/img/just_logo.png" class="w-15" alt="">
            <span class="text-[27px] text-primary-tint">IT INVENTORY</span>
        </div>
        <form @submit.prevent="handleLogin" class="w-full flex flex-col justify-between items-center gap-y-4">
            <div class="w-3/4">
                <span class="ms-5">Username</span>
                <div class="w-full h-[43px] flex items-center justify-center">
                    <input type="text" v-model="username" class="bg-transparent z-[1] px-12 rounded-full border border-primary-tint w-full h-full" :class="load ? 'cursor-wait' : ''" />
                    <div class="absolute w-3/4 flex">
                        <i class="ri-user-line w-7 h-7 flex justify-center items-center rounded-full border-2 border-primary-tint relative left-3 text-lg text-primary-tint"></i>
                    </div>
                </div>
            </div>
            <div class="w-3/4">
                <span class="ms-5">Password</span>
                <div class="w-full h-[43px] flex items-center justify-center">
                    <input :type="show ? 'text' : 'password'" v-model="password" class="bg-transparent z-[1] px-12 rounded-full border border-primary-tint w-full h-full" :class="load ? 'cursor-wait' : ''" />
                    <div class="absolute w-3/4 flex justify-between">
                        <i class="ri-lock-line rounded-full w-7 h-7 flex items-center justify-center border-2 border-primary-tint relative left-3 text-lg text-primary-tint"></i>
                        <button type="button" class="z-[1]" @click="show = !show">
                            <i v-if="show" class="ri-eye-line rounded-full w-7 h-7 flex items-center justify-center relative right-3 text-xl text-primary-tint"></i>
                            <i v-if="!show" class="ri-eye-off-line rounded-full w-7 h-7 flex items-center justify-center relative right-3 text-xl text-primary-tint"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-3/4 ms-10">
                <base-input type="checkbox" label="Remember me" @input="input" :value="remember" :disabled="load" :class="load ? 'cursor-wait' : ''"/>
            </div>
            <pills-button type="submit" label="login" class="bg-primary-tint text-white w-3/4 shadow-xl focus-within:shadow" :class="load ? 'cursor-wait' : ''"></pills-button>
        </form>
        <div class="text-center">
            <button @click="forget()" class="underline" :class="load ? 'cursor-wait' : ''">lupa password</button>
        </div>
    </div>
    <div class="absolute flex flex-col text-center bottom-5">
        <span>PT. Auri Steel Metalindo</span>
        <span class="text-sm italic">Versi.0.0.0</span>
    </div>
</div>
</template>
<script setup>
import api from '@/utils/api'
import alert from '@/utils/alert'
import { store } from '@/utils/store'
</script>
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            remember: localStorage.getItem('remember') || false,
            show: false,
            load: false,
        }

    },
    created() {
        let a = localStorage.getItem('account')
        if(a) {
            let account = JSON.parse(a)
            let day = new Date().getTime()
            if(account.expiry < day) localStorage.clear();
            else {
                this.username = account.value.username
                this.password = account.value.password
            }
        }
        // console.log('d', day);
        // console.log('ex', account.expiry);
        
    },
    methods: {
        handleLogin() {
            this.load = true
            store().loader('on')
            api.postLogin({
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    localStorage.setItem('token', response.data)
                    localStorage.setItem('user', this.username)
                    window.location.href = '/'
                })
                .catch((error) => {
                    if(error.response) alert.failed(error.response.data)
                    else alert.failed(null, 'periksa koneksi internet')
                    return this.load = false
                })
            store().loader('off')
        },
        input(v) {
            if(v.value) {
                this.remember = true
                const now = new Date()
                const item = {
                    value: {
                        username: this.username,
                        password: this.password
                    },
                    expiry: now.getTime() + 86400000,
                }
                localStorage.setItem('account', JSON.stringify(item))
                localStorage.setItem('remember', 'true')
            } else {
                this.remember = false
                localStorage.removeItem('username')
                localStorage.removeItem('password')
                localStorage.removeItem('remember')
            }
        },
        forget() {
            alert.warning(null, 'silakan hubungi administrator')
        }

    },
    mounted() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    },
}
</script>
