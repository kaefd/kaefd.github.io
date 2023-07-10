<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import { id } from 'date-fns/locale';
import textFieldForm from '../form/textFieldForm.vue';
import functions from '../../service/functions';
</script>
<script>

export default {
    components: {
        textFieldForm
  },
    props:['label', 'validated', 'rules'],
    data () {
        return {
            data: ''
        }
    },
    computed: {
        
    },
    methods: {
    },
    mounted () {
    }
}
</script>

<template>
        <VueDatePicker
            class="text-small mx-1 mb-1"
            teleport-center
            :clearable="false"
            style="width: 220px; max-width:220px;"
            :format-locale="id"
            required
            locale="id"
            cancelText="batal"
            selectText="pilih"
            format="PP"
            :enable-time-picker="false"
            v-model="data"
        >
            <template #trigger>
                <textFieldForm readonly :label="label" :model-value="functions.formatDate(data)" :rules="rules"/>
            </template>
        </VueDatePicker>
</template>
<style>
.dp__input_wrap .dp__input  {
    height: 41px !important;
}
.false .dp__input_wrap .dp__input {
    border-color: rgb(192, 1, 1) !important;
}
</style>