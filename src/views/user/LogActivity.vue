<template>
    <LaporanLogUser :user="user"/>
</template>
<script lang="ts" setup>
import LaporanLogUser from '../laporan/LaporanLogUser.Vue';
</script>
<script lang="ts">
export default {
    data() {
        return {
            user: localStorage.getItem('user')
        }
    }
}
</script>