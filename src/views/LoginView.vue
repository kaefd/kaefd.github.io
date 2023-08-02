<script setup>
import api from '../service/api';
import 'animate.css';
import script from '../../package.json'
import AlertVue from '../components/dialog/alertVue.vue';
// import axios from 'axios'
// import { mapActions } from 'vuex'
// import { Form } from "vee-validate";
// import * as yup from "yup";

</script>

<script>
export default {
  components: {
    AlertVue
    // eslint-disable-next-line vue/no-reserved-component-names
    // Form,
  },
    data() {
    return {
      pageTitle: null,
      message: "",
      username:'',
      password:'',
      valert: false,
      status: null,
      user: false,
      pass: false,
      ispassword: false
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
          localStorage.setItem('user', this.username)
          window.location.href = '/'
        })
        .catch((error) => {
          this.status = false
          this.valert = true
          this.message =  error.response.data
        })
    }
   
    
  },
  mounted() {
    this.page()
  },
}
</script>
<template>

<v-responsive class="bg-bluetheme h-100 w-100 pb-7">
  <v-row class="h-100">
    <v-col class="d-flex flex-column">
      <v-div class="w-100 h-100">
      <v-div class="h-75 d-flex show align-end ms-16">
        <v-container class="logo-size">
          <img src="../assets/img/logo_text.png" style="width: 100%;"/>
        </v-container>
        <v-container class="ms-n7">
        </v-container>
      </v-div>
      </v-div>
      <!-- MOBILE -->
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
      <v-container fluid class="h-50 vw-100 mobile mx-auto blur">
        <v-container class="mx-auto w-75 h-100">
          <v-form @submit.prevent="handleLogin" :validation-schema="schema" class="text-center">
          <v-span class="text-blue-custom font-25 mx-auto">USER LOGIN</v-span>
            <v-text-field variant="underlined" class="text-blue-custom text-field mt-7" v-model="username" name="username" hide-details>
              <img src="../assets/img/USER.png" class="me-3 mb-2 icon-small"/>
            </v-text-field>
            <v-text-field :type="ispassword == true ? 'text' : 'password'" variant="underlined" class="text-blue-custom text-field" v-model="password" name="password" hide-details>
              <img src="../assets/img/PASS.png" class="me-3 mb-2 icon-small" />
            </v-text-field>
            <v-checkbox label="show password" density="compact" class="mt-2" color="orange" v-model="ispassword"></v-checkbox>
            <v-btn block type="submit" class="text-white color-orangetheme elevation-0 btn-login d-block mx-auto">Login</v-btn>
            </v-form>
          </v-container>
      </v-container>
    </v-col>
    <!--  -->
    <v-col class="show absolute h-100 pb-10">
      <v-row no-gutters class="w-50 me-md-0 ms-md-auto mx-auto h-100" align="center">
        <v-card class="size-card me-16 ms-auto rounded-xl">
          <v-form @submit.prevent="handleLogin" :validation-schema="schema">
            <v-container class="mx-auto w-85">
              <v-div class="d-flex flex-column my-7 text-blue-custom">
                <v-span class="text-montserrat font-25 text-center">USER LOGIN</v-span>
              </v-div>
              <v-text-field variant="underlined" class="text-blue-custom text-field" density="compact" v-model="username" name="username">
                <img src="../assets/img/USER.png" class="ms-1 me-3 icon-small"/>
              </v-text-field>
              <v-text-field :type="ispassword == true ? 'text' : 'password'"  variant="underlined" class="text-blue-custom text-field" density="compact" v-model="password" name="password">
                <img src="../assets/img/PASS.png" class="ms-1 me-3 icon-small" />
              </v-text-field>
              <v-checkbox label="show password" density="compact" class="mt-2" color="orange" v-model="ispassword"></v-checkbox>
              <v-btn block type="submit" class="text-white color-orangetheme elevation-0">Login</v-btn>
            </v-container>
          </v-form>
        </v-card>
      </v-row>
      <v-span class="d-block text-caption text-center text-grey">AURI STEEL METALINDO <br />version.{{ script.version }}</v-span>
    </v-col>
  </v-row>
  <alert-vue v-model="valert" :sukses="status" :message="message"/>
</v-responsive>
</template>

<style>
</style>