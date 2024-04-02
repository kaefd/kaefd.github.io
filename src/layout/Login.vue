<template>
    <div class="w-full h-full bg-white flex flex-col items-center justify-center" :class="load ? 'cursor-wait' : ''">
        <div class="w-full absolute left-0 bottom-0">
            <img src="../assets/img/bgAuri.jpg" alt="">
        </div>
        <div class="absolute left-0 w-full h-full flex justify-center items-center">
            <div class="absolute w-[25%] min-w-[350px] max-w-[400px] h-[70%] max-h-[550px] min-h-[500px] rounded-[20px] shadow-2xl flex flex-col justify-between py-13 md:py-[4%] items-center mb-15 bg-white">
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
                <div class="text-center mt-5">
                    <button @click="forget()" class="underline" :class="load ? 'cursor-wait' : ''">lupa password</button>
                </div>
            </div>
            <div class="absolute flex flex-col text-center bottom-5">
                <span>PT. Auri Steel Metalindo</span>
                <span class="text-sm italic">Versi.0.0.0</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import config from '@/config';
    import mode from '@/mode';
    import alert from '@/utils/alert';
    import api from '@/utils/api'
    import axios from 'axios';
</script>
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            remember: false,
            show: false,
            load: false,
        }

    },
    created() {
        let a = localStorage.getItem('savedSession')
        if(a) {
            let savedSession = JSON.parse(a)
            let day = new Date().getTime()
            if(savedSession.expiry < day) localStorage.clear();
            else {
                this.username = savedSession.username
                this.password = savedSession.password
                this.remember = savedSession.remember
            }
        }
        // console.log('d', day);
        // console.log('ex', savedSession.expiry);
        
    },
    methods: {
        input(v) {
            this.remember = v.value
        },
        handleLogin() {
            // LOGIN
            api.postLogin({
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    // SET ITEM IN LOCALSTORAGE
                    const now = new Date()
                    if(this.remember) {
                        const item = {
                            username: this.username,
                            password: this.password,
                            remember: this.remember,
                            expiry: now.getTime() + 86400000,
                        }
                        localStorage.setItem('savedSession', JSON.stringify(item))
                    } else {
                        localStorage.removeItem('savedSession')
                    }
                    // SET SESSION
                    const session = {
                        user: this.username,
                        token: response.data,
                    }
                    localStorage.setItem('session', JSON.stringify(session))
                    return this.setOtority(response.data)
                    // window.location.href = '/'
                })
                .catch((error) => {
                    // REMOVE ITEM IN LOCALSTORAGE
                    localStorage.clear()
                    if(error.response) alert.failed(null, error.response.data)
                    else alert.failed(null, 'periksa koneksi internet')
                    return this.load = false
                })
            // store().loader('off')
        },
        async setOtority(response) {
            let d = await axios.get(`user_otoritas?username=${this.username}&status=true`, {
                baseURL: config.server[mode.server],
                headers: { csrf: response }
            })
            localStorage.setItem('otoritas', JSON.stringify(d.data))
            if(d) return this.$router.push('/')
        },
        forget() {
            alert.warning(null, 'silakan hubungi administrator')
        }

    },
    mounted() {
        // localStorage.removeItem('token')
        // localStorage.removeItem('user')
    },
}
</script>