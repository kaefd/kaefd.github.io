<script setup>
import axios from 'axios'
import { mapActions } from 'vuex'
</script>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
        }
    },
    methods: {
        ...mapActions(['login']),
        async login() {
          try {
            const response = await axios.post('http://localhost:8000/auth/login', {
              username: this.username,
              password: this.password
            })
            const token = response.data.access_token
            localStorage.setItem('token', token)
            this.$router.push('/items')
          } catch(error) {
            this.errorMessage = error.response.data.message
          }
        }
    },
    
}
</script>
<template>

    <v-container fluid class="bg-blue-gradient d-flex flex-column justify-center align-center h-screen">
    <v-card class="bg-transparent text-white rounded-xl d-flex flex-column justify-center align-center elevation-12 py-12" width="300">
        <v-icon size="70">mdi-account</v-icon>
        <v-form @submit.prevent="login" class="text-white w-75 mt-6">
            <v-text-field type="text" id="username" v-model="username" required class="rounded-xl" label="Username"></v-text-field>
            <v-text-field label="Password" id="password" v-model="password" required type="Password"></v-text-field>
            <v-btn type="submit" block height="50" color="yellow-darken-4">LOGIN</v-btn>
        </v-form>
        <div v-if="errorMessage" class="error-message text-red mt-3">{{ errorMessage }}</div>
    </v-card>
</v-container>


</template>

<style>
.bg-blue-gradient {
    background: rgb(2,20,56);
background: linear-gradient(0deg, rgba(2,20,56,1) 12%, rgba(13,47,99,1) 39%, rgba(52,112,193,0.9967637540453075) 100%);
}
</style>