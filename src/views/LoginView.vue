<script setup>
import axios from 'axios'
</script>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            alert: false
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
                    email: this.email,
                    password: this.password
                })
                localStorage.setItem('token', response.data.access_token)
                window.location.href = '/items'
                //redirect to dashboard
            } catch (error) {
                this.alert = true
            }
        }
    }
}
</script>
<template>

    <v-container fluid class="bg-blue-gradient d-flex flex-column justify-center align-center h-screen">
        <!-- alert -->
        <v-alert
        v-model="alert"
        max-height="100"
        class="mb-6"
        border="start"
        closable
        close-label="Close Alert"
        color="red-darken-4"
        title="Login Gagal !"
        text="Silakan periksa kembali username dan password"
        ></v-alert>
    <v-card class="bg-transparent text-white rounded-xl d-flex flex-column justify-center align-center elevation-12 py-12" width="300">
        <v-icon size="70">mdi-account</v-icon>
        <v-form @submit.prevent="login" class="text-white w-75 mt-6">
            <v-text-field type="email" id="email" v-model="email" required class="rounded-xl" label="Username"></v-text-field>
            <v-text-field label="Password" id="password" v-model="password" required type="Password"></v-text-field>
            <v-btn type="submit" block height="50" color="yellow-darken-4">LOGIN</v-btn>
        </v-form>
    </v-card>
</v-container>


</template>

<style>
.bg-blue-gradient {
    background: rgb(2,20,56);
background: linear-gradient(0deg, rgba(2,20,56,1) 12%, rgba(13,47,99,1) 39%, rgba(52,112,193,0.9967637540453075) 100%);
}
</style>