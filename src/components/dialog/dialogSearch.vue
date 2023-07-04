<script setup>
import textField from '../form/textField.vue';
import textFieldForm from '../form/textFieldForm.vue';
import btnInfo from '../button/btnInfo.vue';
import functions from '../../service/functions';
functions
</script>
<script>
export default {
    components: {
        btnInfo,
  },
    props:['label', 'dataValue', 'objectFilter', 'button', 'btn_title', 'cardTitle'],
    data () {
        return {
            searchModel: '',
            search: '',
            pilih: '',
        }
    },
    
    methods: {
        result(s) {
            this.$emit('pilihObjek', s)
        }
    },
}
</script>

<template>
<v-dialog>
    <template v-slot:activator="{props}">
        <textFieldForm v-if="!button" :label="label" v-bind="props" v-model="pilih" readonly :rules="required" />
        <btnInfo v-if="button" v-bind="props" icon="mdi-plus" :btn_title="btn_title"/>
    </template>
    <v-card class="py-5 px-7 rounded-xl mx-auto w-100" max-width="400">
        <v-card-title class="text-center text-blue-darken-4 mb-3 text-button font-weight-bold">{{ cardTitle }}</v-card-title>
        <textField
            v-model="search"
            label="Search"
        ></textField>
        <v-list class="my-4">
            <v-list-item
                v-for="s, i in functions.filterObject(objectFilter, search)" :key="i"
                class="text-caption"
                density="compact"
                @click="result(s), pilih=s.nama"
                >
                    {{ s.nama }}
            </v-list-item>
        </v-list>
    </v-card>
</v-dialog>  
</template>