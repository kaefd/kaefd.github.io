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
    props:['label', 'dataValue', 'objectFilter', 'button', 'btn_title', 'cardTitle', 'rules'],
    data () {
        return {
            dialog: false,
            searchModel: '',
            search: '',
            pilih: '',
        }
    },
    
    methods: {
        result(s) {
            this.dialog =  false
            this.$emit('pilihObjek', s)
        }
    },
}
</script>

<template>
<v-dialog v-model="dialog" transition="dialog-bottom-transition">
    <template v-slot:activator="{props}">
        <textFieldForm  v-bind="props" v-if="!button" :label="label" v-model="pilih" readonly :rules="rules" />
        <btnInfo v-bind="props" v-if="button" icon="mdi-plus" :btn_title="btn_title"/>
    </template>
    <v-card class="py-5 px-7 rounded-xl" min-width="300" width="35vw" max-width="400">
        <v-card-title class="text-center text-orange mb-3 text-button font-weight-bold">{{ cardTitle }}</v-card-title>
        <textField
            v-model="search"
            label="Search"
            class="mb-4"
        ></textField>
        <v-list class="vh-100">
            <v-div>
                <v-list-item
                    v-for="s, i in functions.filterObject(objectFilter, search)" :key="i"
                    class="text-caption"
                    density="compact"
                    @click="result(s), pilih=s.nama"
                    >
                        {{ s.nama }}
                </v-list-item>
            </v-div>
        </v-list>
    </v-card>
</v-dialog>  
</template>