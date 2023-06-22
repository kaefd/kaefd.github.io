<script setup>
import api from '../api';
import 'animate.css';
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
      user: false,
      pass: false,
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
<!--  <v-row fluid class="d-flex flex-column justify-center align-center bg-indigo-custom vh-100">
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
-->
<v-container fluid class="d-flex justify-space-between h-100 w-100 overflow-hidden">
  <v-div class="animate__animated animate__bounceInDown animate__delay-2s absolute text-hidden w-25 ma-5">
    <v-span class="text-h2 font-weight-bold">WELCOME TO AURI STEEL</v-span>
  </v-div>
  <v-row position="absolute" class="ms-n15p">
    <v-div class="animate__animated animate__zoomIn animate__delay-2s circle-1"></v-div>
  </v-row>
  <v-div class="d-flex flex-column justify-space-between align-end">
    <v-div class="d-flex flex-column justify-space-between">
      <v-div class="animate__animated animate__zoomIn animate__delay-2s circle-3"></v-div>
      <v-div class="animate__animated animate__zoomIn animate__delay-2s circle-4"></v-div>
    </v-div>
    <v-div class="animate__animated animate__zoomIn animate__delay-2s circle-2"></v-div>
  </v-div>
  <v-div class="d-flex justify-end align-center absolute m-center">
    <img src="../assets/img/just_logo.png" class="animate__animated animate__zoomIn animate__delay-2s bg-img"/>
    <v-card class="animate__animated animate__fadeInUpBig animate__delay-4s rounded-xlarger pa-11 card-login elevation-5 d-flex flex-column justify-space-between">
      <h4 class="text-center text-h4 font-weight-bold mb-7">USER LOGIN</h4>
      <v-form @submit.prevent="handleLogin" :validation-schema="schema">
      <v-span class="text-h6 font-weight-medium text-blue-custom">Username</v-span>
      <v-div>
        <v-text-field
          v-model="username"
          @click="user = !user, pass = false"
          class="rounded-lg text-body-2 mb-2"
          :variant="user ? 'plain' : 'underlined'"
          :class="user ? 'bg-blue-lighten-3' : ''"
          density="compact"
          hide-details
        >
          <img v-if="user" src="../assets/img/USER1.png" class="ms-3 mb-2 me-5" style="width:20px; height:25px" />
          <img v-if="!user" src="../assets/img/USER.png" class="ms-3 mb-2 me-5" style="width:20px; height:25px" />
        </v-text-field>
      </v-div>
      <v-span class="text-h6 font-weight-medium text-blue-custom  mt-7">Password</v-span>
      <v-div>
        <v-text-field
          v-model="password"
          class="rounded-lg text-body-2 mb-2"
          @click="pass = !pass, user = false"
          :variant="pass ? 'plain' : 'underlined'"
          :class="pass ? 'bg-blue-lighten-3' : ''"
          density="compact"
          hide-details
        >
          <img v-if="pass" src="../assets/img/PASS1.png" class="ms-3 mb-2  me-5" style="width:20px; height:25px" />
          <img v-if="!pass" src="../assets/img/PASS.png" class="ms-3 mb-2  me-5" style="width:20px; height:25px" />
        </v-text-field>
      </v-div>
      <v-btn
      class="d-block w-50 mx-auto mt-5"
      color="grey"
      hide-details
      type="submit"
      >
        login
      </v-btn>
      <div v-if="message" class="error-message text-body-2 text-red pt-3">{{ message }}</div>
      </v-form>
    </v-card>
  </v-div>
</v-container>
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
.bg-auri {
  background-image: url('./assets/');
}

</style>