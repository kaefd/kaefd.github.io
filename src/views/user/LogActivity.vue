<template>
    <LaporanLogUser :user="user"/>
</template>
<script setup>
import LaporanLogUser from '../laporan/LaporanLogUser.vue';
</script>
<script>
export default {
    data() {
        return {
            user: localStorage.getItem('user')
        }
    }
}
</script>