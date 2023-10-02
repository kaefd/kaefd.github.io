<script setup>
import {
    RouterView
} from 'vue-router'
import NavDrawers from './components/drawer/NavDrawers.vue';
import AppBar from './components/appbar/AppBar.vue';
import otoritas from './service/page/otoritas';
import api from './service/api';
</script>
<script>
export default {
    components: {
        NavDrawers,
        AppBar,
    },
    data() {
        return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            drawer: null,
            aut: '',
            tema: null,
            databarang: '',
            cetak: [{
                    title: 'Export xlsx',
                    icon: 'mdi-download',
                    key: 'xlsx'
                },
                {
                    title: 'Export pdf',
                    icon: 'mdi-file-pdf-box',
                    key: 'pdf'
                },
            ],

            pageTitle: '',
            pemasukan: '',
            produksi: '',
            pengeluaran: '',
            kirim: '',
            user_otoritas: ''
        }
    },
    methods: {
        onResize() {
            this.windowWidth = window.innerWidth
            this.windowHeight = window.innerHeight
        },
        page(value) {
            this.pageTitle = value
        },
        theme(v) {
            if (v) {
                this.tema = 'dark'
            } else this.tema = 'light'
        },
        async fetchData() {
            let token = localStorage.getItem('token')
            let user = localStorage.getItem('user')
            if (token != null && token != false && user != null) {
                let data = await api.getOtoritas(user)
                this.aut = otoritas.otoritas(data)
            } else return await api.logout()
        },

    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize)
        })
        this.page()
        this.fetchData()
        
    }
}
</script>

<template>
<v-theme-provider :theme="tema" with-background>
    <v-layout>
        <!-- DRAWER -->
        <NavDrawers v-model="drawer" v-if="pageTitle != null" :pageTitle="pageTitle" :aut="aut" :pemasukan="pemasukan" :produksi="produksi" :pengeluaran="pengeluaran" :kirim="kirim" />
        <!-- APP BAR -->
        <AppBar v-if="pageTitle != null" :pageTitle="pageTitle" @dark="theme">
            <template #app-btn>
                <!-- APP BAR ICON -->
                <v-div class="me-5">
                    <input type="checkbox" id="menu_checkbox" @click="drawer = !drawer" :checked="drawer">
                    <label for="menu_checkbox">
                        <div></div>
                        <div></div>
                        <div></div>
                    </label>
                </v-div>
            </template>
        </AppBar>
        <!-- MAIN VIEW -->
        <v-main class="vh-100 vw-100">
            <RouterView :cetak="cetak" @page="page" @pages="page" :window="windowWidth" :windowH="windowHeight" :tema="tema" />
        </v-main>
    </v-layout>
</v-theme-provider>
</template>

<style scoped>
/* #menu_checkbox {
    display: none;
}

label {
    margin-bottom: 2px;
    display: block;
    width: 15px;
    height: 15px;
    cursor: pointer;
}

label:before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: 1.2s cubic-bezier(0, 0.96, 1, 0.02) background-color;
}

label div {
    position: relative;
    top: 0;
    height: 3px;
    background-color: #5995c2;
    margin-bottom: 4px;
    transition: 0.3s ease transform, 0.3s ease top, 0.3s ease width,
        0.3s ease right;
    border-radius: 2px;
}

label div:first-child {
    transform-origin: 0;
}

label div:last-child {
    margin-bottom: 0;
    transform-origin: 31.7px;
}

label div:nth-child(2) {
    right: 0;
    width: 15px;
}

#menu_checkbox:checked+label div:first-child {
    left: 0.5px;
    top: -1.3px;
    transform: rotateZ(45deg);
    background: #5995c2;
}

#menu_checkbox:checked+label div:last-child {
    top: 11px;
    left: -5px;
    transform: rotateZ(45deg);
    background: #5995c2;
}

#menu_checkbox:checked+label div:nth-child(2) {
    width: 20px;
    top: -1px;
    left: -2.5px;
    transform: rotateZ(-45deg);
    background: #5995c2;
} */
#menu_checkbox {
    display: none;
}

label {
    margin-bottom: 2px;
    display: block;
    width: 30px;
    height: 20px;
    cursor: pointer;
}

label:before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: 1.2s cubic-bezier(0, 0.96, 1, 0.02) background-color;
}

label div {
    position: relative;
    top: 0;
    height: 4px;
    background-color: #5fa0cb;
    margin-bottom: 4px;
    /* transition: 0.3s ease transform, 0.3s ease top, 0.3s ease width,
        0.3s ease right; */
    border-radius: 50px;
}

label div:first-child {
    width: 20px;
}

label div:nth-child(2) {
    width: 17px;
}
label div:last-child {
    width: 25px;
}
</style>
