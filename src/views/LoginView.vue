<script setup>
import api from '../service/api';
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
<v-responsive class="bg-bluetheme h-100 w-100">
  <v-row class="h-100">
    <v-col class="h-100 d-flex flex-column">
      <v-div class="w-100 h-100">
      <v-div class="h-75 d-flex show align-end ms-5">
        <v-container class="logo-size">
          <v-img src="just_logo.png" cover></v-img>
        </v-container>
        <v-container class="ms-n7">
          <v-div class="text-montserrat font-heading text-bluetheme d-flex flex-column">
            <v-span class="word-space-heading">BUILDING</v-span>
            <v-span class="word-space-heading">Better Future</v-span>
          </v-div>
          <v-divider thickness="2" class="border-opacity-75 ms-1" length="150"></v-divider>
        </v-container>
      </v-div>
      </v-div>
      <v-row no-gutters class="w-100 h-50 absolute bg-people mobile">
        <v-div class="my-auto mx-auto d-flex flex-column align-center">
          <v-avatar color="white" class="logo-small">
            <img src="../assets/img/just_logo.png" class="w-100" />
          </v-avatar>
          <v-span class="mt-5 text-grey-lighten-1 text-button">
            Building Better Future
          </v-span>
        </v-div>
      </v-row>
      <v-container fluid class="h-50 vw-100 mobile mx-auto">
        <v-container class="mx-auto w-75 h-100">
          <v-form @submit.prevent="handleLogin" :validation-schema="schema" class="text-center">
          <v-span class="text-montserrat font-large mx-auto">USER LOGIN</v-span>
            <v-text-field variant="underlined" class="text-blue-custom text-field mt-7" v-model="username" name="username" hide-details>
              <img src="../assets/img/USER.png" class="me-3 mb-2 icon-small"/>
            </v-text-field>
            <v-text-field variant="underlined" class="text-blue-custom text-field" v-model="password" name="password" hide-details>
              <img src="../assets/img/PASS.png" class="me-3 mb-2 icon-small" />
            </v-text-field>
            <v-btn type="submit" class="text-montserrat text-white color-orangetheme elevation-0 btn-login d-block mx-auto">Login</v-btn>
          </v-form>
          </v-container>
      </v-container>
    </v-col>
    <v-col class="show absolute h-100 me-0">
      <v-row no-gutters class="w-50 me-md-0 ms-md-auto mx-auto h-100 " align="center">
        <v-card class="size-card mx-auto rounded-xl">
          <v-form @submit.prevent="handleLogin" :validation-schema="schema">
            <v-toolbar class="bg-transparent text-bluetheme toolbar-p mx-auto">
              <v-span class="text-montserrat font-large mx-auto">USER LOGIN</v-span>
            </v-toolbar>
            <v-container class="mx-auto w-85">
              <v-text-field variant="underlined" class="text-blue-custom text-field" v-model="username" name="username" hide-details>
                <img src="../assets/img/USER.png" class="me-3 mb-2 icon-small"/>
              </v-text-field>
              <v-text-field variant="underlined" class="text-blue-custom text-field" v-model="password" name="password" hide-details>
                <img src="../assets/img/PASS.png" class="me-3 mb-2 icon-small" />
              </v-text-field>
              <v-btn type="submit" class="text-montserrat text-white color-orangetheme elevation-0 btn-login d-block mx-auto">Login</v-btn>
            </v-container>
          </v-form>
          <div v-if="message" class="error-message text-body-2 text-white pt-3">{{ message }}</div>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</v-responsive>
</template>

<style>
</style>