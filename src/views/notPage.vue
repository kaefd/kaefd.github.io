<!-- <script> -->
<!-- </script> -->
<script>
export default {
    props: ['item'],
    data() {
        return {
        }
    },
    methods: {

    },
    mounted() {}
}
</script>

<template>
    <v-container class="d-flex justify-center align-center">
        <div class="d-flex flex-column align-center mt-n10">
            <img src="../assets/img/404.png" style="width: 40vw;" />
            <v-span class="font-bold text-montserrat mt-n16">PAGE NOT FOUND</v-span>
        </div>
    </v-container>
</template>

<style scoped>
.font-bold {
    font-size: 37px;
    color: rgb(155, 32, 32);
}
</style>
