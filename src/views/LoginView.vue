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
      pageTitle: null,
      message: "",
      username:'',
      password:'',
    }

    },
    methods: {
      page(){
        return this.$emit('page', this.pageTitle)
      },
      handleLogin() {
        api.postLogin({
          username: this.username,
          password: this.password
        })
        .then(response => {
          localStorage.setItem('token', response.data)
          window.location.href = '/'
        })
        .catch((error) => {
          this.message = error.response.data
        })

    }
  },
  mounted() {
    this.page()
  },
    
}
</script>
<template>
    <v-row fluid class="d-flex flex-column justify-center align-center bg-indigo-custom vh-100">
    <v-card class="text-white bg-trasp rounded-0 d-flex flex-column justify-center border align-center elevation-0 py-12" width="300">
        <v-icon size="70">mdi-account</v-icon>
        <v-form @submit.prevent="handleLogin" :validation-schema="schema" class="text-white w-75 pt-6">
            <v-text-field variant="outlined" density="compact" type="text" id="username" v-model="username" name="username" required label="Username"></v-text-field>
            <v-text-field variant="outlined" density="compact" label="Password" id="password" v-model="password" name="password" required type="Password"></v-text-field>
            <v-btn type="submit" block height="50" class="elevation-0 rounded-0 bg-blue-custom">LOGIN</v-btn>
        </v-form>
        <div v-if="message" class="error-message text-body-2 text-white pt-3">{{ message }}</div>
    </v-card>
</v-row>


</template>

<style>
.bg-indigo-custom {
    background-color: rgb(121, 159, 180);
}
.bg-trasp {
    background-color: rgba(255, 255, 255, 0.24) !important;
}
.vh-100 {
  height: 98vh;
}

</style>