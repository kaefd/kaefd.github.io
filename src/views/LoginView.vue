<script setup>
import api from '../service/api';
import 'animate.css';
import script from '../../package.json'
import AlertVue from '../components/dialog/alertVue.vue';
import BtnOrange from '../components/button/btnOrange.vue';
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
      windowWidth: window.innerWidth,
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
      onResize() {
        this.windowWidth = window.innerWidth
      },
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
    this.$nextTick(() => {
        window.addEventListener('resize', this.onResize)
      })
    this.page()
  },
}
</script>
<template>

<v-responsive class="bg-auri h-100">
  <v-container fluid class="d-flex flex-column h-100">
    <v-row class="h-100">
      <v-responsive class="pt-14 ps-14 align-center" :height="windowWidth > 776 ? '40vh' : ''" width="375">
        <img src="../assets/img/logo_text.png" alt="brandlogo" style="width: 40vw;">
      </v-responsive>
      <v-responsive class="align-center" :class="windowWidth > 776 ? 'me-10' : ''" :min-width="windowWidth > 776 ? 375 : 267">
        <v-card :class="windowWidth > 776 ? '' : 'bg-trans-blue mt-n7'" class="rounded-xl mx-auto elevation-3 px-2" :height="windowWidth > 776 ? 430 : 365" :max-width="windowWidth > 776 ? 350 : 300">
          <v-form @submit.prevent="handleLogin" :validation-schema="schema" class="text-center w-75 mx-auto py-14 h-100 d-flex flex-column">
          <v-span class="text-blue-custom font-25 text-montserrat mx-auto">USER LOGIN</v-span>
          <v-spacer></v-spacer>
            <v-div>
              <v-text-field variant="underlined" class="text-blue-custom text-field" v-model="username" name="username" hide-details>
                <img src="../assets/img/USER.png" class="me-3 mb-2 icon-small"/>
              </v-text-field>
            </v-div>
            <v-div class="d-flex align-end">
              <v-text-field :type="ispassword == true ? 'text' : 'password'" variant="underlined" class="text-blue-custom text-field" v-model="password" name="password" hide-details>
                <img src="../assets/img/PASS.png" class="me-3 mb-2 icon-small" />
              </v-text-field>
              <v-icon v-if="ispassword" @click="ispassword = false" class="mb-1 text-info">mdi-eye</v-icon>
              <v-icon v-if="!ispassword" @click="ispassword = true" class="mb-1 text-info">mdi-eye-off</v-icon>
            </v-div>
            <!-- <v-checkbox label="show password" density="compact" class="mt-2" color="orange" v-model="ispassword"></v-checkbox> -->
            <v-spacer></v-spacer>
            <v-div>
              <btn-orange type="submit" class="mx-auto w-100" btn_title="LOGIN" />
            </v-div>
            </v-form>
        </v-card>
      </v-responsive>
    </v-row>
    <v-span class="text-caption text-center text-grey">AURI STEEL METALINDO <br />version.{{ script.version }}</v-span>
  </v-container>
  <alert-vue v-model="valert" :sukses="status" :message="message"/>
</v-responsive>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  .h-100 {
    height: 95% !important;
  }
}

</style>