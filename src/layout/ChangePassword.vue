<template>
    <div class="w-screen h-screen flex flex-col items-center justify-center bg-white" :class="load ? 'cursor-wait' : ''">
        <div class="w-full absolute bottom-0">
            <img src="../assets/img/bgAuri.jpg" alt="bg">
        </div>
        <div class="absolute w-[28%] min-w-[350px] h-max bg-white rounded-[20px] flex flex-col py-13 md:py-[3%] gap-y-9 items-center border">
            <div class="w-full px-13 text-xl flex items-center gap-x-5">
                <button @click="$router.go(-1)" class="border rounded-full w-8 h-8">
                    <i class="ri-arrow-left-line"></i>
                </button>
                <span class="font-semibold text-center">Ubah Password</span>
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
                    <span class="ms-5">Password lama</span>
                    <div class="w-full h-[43px] flex items-center justify-center">
                        <input :type="showold ? 'text' : 'password'" v-model="oldpassword" class="bg-transparent z-[1] px-12 rounded-full border border-primary-tint w-full h-full" :class="load ? 'cursor-wait' : ''" />
                        <div class="absolute w-3/4 flex justify-between">
                            <i class="ri-lock-line rounded-full w-7 h-7 flex items-center justify-center border-2 border-primary-tint relative left-3 text-lg text-primary-tint"></i>
                            <button type="button" class="z-[1]" @click="showold = !showold">
                                <i v-if="showold" class="ri-eye-line rounded-full w-7 h-7 flex items-center justify-center relative right-3 text-xl text-primary-tint"></i>
                                <i v-if="!showold" class="ri-eye-off-line rounded-full w-7 h-7 flex items-center justify-center relative right-3 text-xl text-primary-tint"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="w-3/4">
                    <span class="ms-5">Password baru</span>
                    <div class="w-full h-[43px] flex items-center justify-center">
                        <input :type="shownew ? 'text' : 'password'" v-model="newpassword" class="bg-transparent z-[1] px-12 rounded-full border border-primary-tint w-full h-full" :class="load ? 'cursor-wait' : ''" />
                        <div class="absolute w-3/4 flex justify-between">
                            <i class="ri-lock-line rounded-full w-7 h-7 flex items-center justify-center border-2 border-primary-tint relative left-3 text-lg text-primary-tint"></i>
                            <button type="button" class="z-[1]" @click="shownew = !shownew">
                                <i v-if="shownew" class="ri-eye-line rounded-full w-7 h-7 flex items-center justify-center relative right-3 text-xl text-primary-tint"></i>
                                <i v-if="!shownew" class="ri-eye-off-line rounded-full w-7 h-7 flex items-center justify-center relative right-3 text-xl text-primary-tint"></i>
                            </button>
                        </div>
                    </div>
                    <span class="capitalize text-xs ms-5">password harus terdiri dari 8 karakter</span>
                </div>
                <div class="w-3/4">
                    <span class="ms-5">Ulangi password baru</span>
                    <div class="w-full h-[43px] flex items-center justify-center">
                        <input :type="showre ? 'text' : 'password'" v-model="repassword" class="bg-transparent z-[1] px-12 rounded-full border border-primary-tint w-full h-full" :class="load ? 'cursor-wait' : ''" />
                        <div class="absolute w-3/4 flex justify-between">
                            <i class="ri-lock-line rounded-full w-7 h-7 flex items-center justify-center border-2 border-primary-tint relative left-3 text-lg text-primary-tint"></i>
                            <button type="button" class="z-[1]" @click="showre = !showre">
                                <i v-if="showre" class="ri-eye-line rounded-full w-7 h-7 flex items-center justify-center relative right-3 text-xl text-primary-tint"></i>
                                <i v-if="!showre" class="ri-eye-off-line rounded-full w-7 h-7 flex items-center justify-center relative right-3 text-xl text-primary-tint"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <pills-button type="submit" label="Simpan" class="bg-primary-tint text-white w-3/4 shadow-xl focus-within:shadow" :class="load ? 'cursor-wait' : ''"></pills-button>
            </form>
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
                oldpassword: '',
                newpassword: '',
                repassword: '',
                showold: false,
                shownew: false,
                showre: false,
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
                // this.load = true
                // store().loader('on')
                // api.postLogin({
                //         username: this.username,
                //         password: this.password
                //     })
                //     .then((response) => {
                //         localStorage.setItem('token', response.data)
                //         localStorage.setItem('user', this.username)
                //         window.location.href = '/'
                //     })
                //     .catch((error) => {
                //         if(error.response) alert.failed(error.response.data)
                //         else alert.failed(null, 'periksa koneksi internet')
                //         return this.load = false
                //     })
                // store().loader('off')
            },
            input(v) {
                if(v.value) {
                    this.remember = true
                    const now = new Date()
    
                    // `item` is an object which contains the original value
                    // as well as the time when it's supposed to expire
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
    }
    </script>
    