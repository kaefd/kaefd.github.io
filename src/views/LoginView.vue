<script setup>
import api from '../api';
// import axios from 'axios'
// import { mapActions } from 'vuex'
// import { Form } from "vee-validate";
// import * as yup from "yup";

</script>

<script>
export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    // Form,
  },
    data() {
    return {
      message: "",
      username:'',
      password:'',
    }

    },
    methods: {
      handleLogin() {
        api.postLogin({
          username: this.username,
          password: this.password
        })
        .then(response => {
          localStorage.setItem('token', response.data)
          window.location.href = '/items'
        })
        .catch((error) => {
          this.message = error.response.data
        })

    }
  }
    
}
</script>
<template>
    <v-container fluid class="bg-blue-gradient d-flex flex-column justify-center align-center h-screen">
    <v-card class="bg-transparent text-white rounded-xl d-flex flex-column justify-center align-center elevation-12 py-12" width="300">
        <v-icon size="70">mdi-account</v-icon>
        <v-form @submit.prevent="handleLogin" :validation-schema="schema" class="text-white w-75 mt-6">
            <v-text-field density="compact" type="text" id="username" v-model="username" name="username" required label="Username"></v-text-field>
            <v-text-field density="compact" label="Password" id="password" v-model="password" name="password" required type="Password"></v-text-field>
            <v-btn type="submit" block height="50" color="yellow-darken-4">LOGIN</v-btn>
        </v-form>
        <div v-if="message" class="error-message text-body-2 text-grey mt-3">{{ message }}</div>
    </v-card>
</v-container>


</template>

<style>
.bg-blue-gradient {
    background: rgb(2,20,56);
background: linear-gradient(0deg, rgba(2,20,56,1) 12%, rgba(13,47,99,1) 39%, rgba(52,112,193,0.9967637540453075) 100%);
}
</style>