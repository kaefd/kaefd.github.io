<template>
  <v-container class="bg-red vh-100 d-flex align-center justify-center">
    <div class="circle2 bg-green"></div>
    <div class="circle bg-orange"></div>
    <div class="circle3 bg-black"></div>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
.circle {
    height: 30px;
    width: 150px;
    border-radius: 100%;
    animation-name: trans;
    animation-duration: 4s;
    position: absolute;
}
.circle2 {
    height: 150px;
    width: 150px;
    border-radius: 100%;
    position: absolute;
    clip: rect(78px, 150px, 150px, 0px);
}
.circle3 {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    margin-left: 20%;
    margin-top: 7%;
    position: absolute;
    clip: rect( 0px, 50px, 50px, 25px);
}
/* @keyframes trans {
    0% {left: 0px; top: 0px; }
    25% {left: 10px; top: 10px; }
} */
</style>