<script setup>
import textField from '../form/textField.vue'
import textFieldForm from '../form/textFieldForm.vue'
import btnInfo from '../button/btnInfo.vue'
import functions from '../../service/functions'
import AlertVue from './alertVue.vue'
</script>
<script>
export default {
    components: {
        btnInfo
    },
    props: [
        'window',
        'label',
        'objectFilter',
        'button',
        'btn_title',
        'cardTitle',
        'rules',
        'index'
    ],
    data() {
        return {
            dialog: false,
            searchModel: '',
            valert: null,
            status: '',
            message: '',
            search: '',
            pilih: '',
            more: 0
        }
    },

    methods: {
        result(s) {
            this.dialog = false
            this.$emit('pilihObjek', s)
        },
        lainnya() {
            let a = this.more + 10
            this.more = a
        },
        check() {
            if(this.objectFilter == '') {
                this.valert = true
                this.message = 'Kode Konversi Belum Terdaftar'
                this.status = 'warn'
                this.dialog = false
                this.$emit('pilihObjek', false, this.index)
            }
        }
    },
    mounted() {}
}
</script>

<template>
<v-dialog v-model="dialog" transition="dialog-bottom-transition" width="auto">
    <template v-slot:activator="{ props }">
        <textFieldForm v-bind="props" v-if="!button" :label="label" v-model="pilih" @click="more = 15, check()" readonly :rules="rules" />
        <btnInfo v-bind="props" v-if="button" icon="mdi-plus" :btn_title="btn_title" />
    </template>
    <v-card class="py-5 px-7 rounded-xl vh-100 mx-auto bg-light dialog-width">
        <v-btn v-if="window < 500" icon="mdi-close" class="absolute" variant="text" @click="dialog = false"></v-btn>
        <v-card-title class="text-center mb-3 text-button font-weight-bold">{{
        cardTitle
      }}</v-card-title>
        <textField v-model="search" label="Search" class="mb-4" color="grey-ligthen-1"></textField>
        <v-list class="vh-100 bg-light">
            <div>
                <v-list-item v-for="(s, i) in functions.filterObject(objectFilter, search)" :key="i" class="text-caption" density="compact" @click="result(s), (pilih = s.nama)">
                    {{ s.nama }}
                </v-list-item>
            </div>
            <!-- <v-div v-if="functions.filterObject(objectFilter, search).length > more" class="d-flex justify-center align-center">
                <v-divider length="50"></v-divider>
                <v-btn @click="lainnya()" variant="text" size="small" class="text-caption">lihat lainnya</v-btn>
                <v-divider length="50"></v-divider>
            </v-div> -->
        </v-list>
    </v-card>
</v-dialog>
<AlertVue v-model="valert" :status="status" :message="message" />
</template>