<script setup>
import textField from '../components/form/textField.vue'
</script>
<script>
export default {
    data () {
        return {
            pageTitle: 'Dashboard',
        }
    },
    methods: {
        page() {
            return this.$emit('page', this.pageTitle)
        },
    },
    mounted() {
        this.page()
    }
}
</script>

<template>
    <v-container class="w-100 h-100">
        <span class="text-caption text-blue-custom ms-4">Periode</span>
        <textField id="tahun" class="w-25 mb-5" icon="mdi-calendar" readonly :value="2023" />
        <v-menu activator="#tahun">
            <v-list density="compact" class="text-caption ms-n9 rounded-lg shadow-sm">
                <v-list-item>2023</v-list-item>
                <v-list-item>2022</v-list-item>
                <v-list-item>2022</v-list-item>
            </v-list>
        </v-menu>
        <div class="d-flex justify-space-between flex-wrap space-x-1">
            <div v-for="i in 4" :key="i" class="card-wrapper d-flex justify-center mb-3 mb-md-0">
                <div class="absolute preview-card"></div>
                <v-card class="w-100 h-100 card elevation-0 d-flex justify-space-between align-center px-5">
                    <div class="d-flex flex-column">
                        <span class="text-body-2 font-weight-bold text-grey-darken-2">Total Pemasukan</span>
                        <h1 class="text-grey-darken-2">50</h1>
                    </div>
                    <img v-if="i % 2" src="../assets/img/masuk.png" alt="logo" style="width: 65px; height: 57px" />
                    <img v-else src="../assets/img/blue.png" alt="logo" style="width: 65px; height: 57px" />
                </v-card>
            </div>
        </div>
        <div class="d-flex justify-space-between mt-5 w-100 h-400">
            <v-card class="table elevation-0 h-100"></v-card>
            <v-card class="elevation-0 user-card h-100 py-5 px-2">
                
            </v-card>
        </div>
    </v-container>
</template>
<style>
.preview-card {
    height: 120px;
    width: 10%;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.075) !important;
}
.card-wrapper{
    height: 120px;
    width: 23%;
    border-radius: 20px !important;
}
.card{
    border-radius: 20px !important;
}
.table {
    width: 74.5%;
    border-radius: 20px !important;
}
.user-card {
    border-radius: 20px !important;
    width: 24%;
}
.h-400 {
    height: 60%;
}
.shadow-sm {
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.144) !important;
}
</style>