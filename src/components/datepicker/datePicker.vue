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
    props:['label', 'validated', 'rules', 'filter'],
    data () {
        return {
            data: ''
        }
    },
    created() {
        if(this.default) {
            return this.data = this.default
        }
    },
    methods: {
    },
    mounted () {
        this.def
    }
}
</script>

<template>
        <VueDatePicker
            class="text-small"
            teleport-center
            :clearable="false"
            :format-locale="id"
            required
            locale="id"
            cancelText="batal"
            selectText="pilih"
            format="PP"
            :enable-time-picker="false"
            v-model="data"
        >
            <template v-if="!filter" #trigger>
                <textFieldForm readonly :label="label" :model-value="functions.formatDate(data)" :rules="rules" hideDetails/>
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