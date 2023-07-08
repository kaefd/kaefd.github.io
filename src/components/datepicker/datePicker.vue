<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import { id } from 'date-fns/locale';
</script>
<script>

export default {
    components: {
  },
    props:['placeholder', 'validated'],
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
    <v-sheet class="d-flex flex-column">
        <v-label>{{ placeholder }}</v-label>
        <VueDatePicker
            class="text-small mx-1 mb-1"
            :clearable="false"
            style="width: 220px; max-width:220px;"
            :format-locale="id"
            required
            locale="id"
            cancelText="batal"
            selectText="pilih"
            format="PP"
            :enable-time-picker="false"
        />
        <v-span v-if="validated === false" class="text-red-darken-4 text-caption ms-5">harus diisi !</v-span>
    </v-sheet>
</template>
<style>
.dp__input_wrap .dp__input  {
    height: 41px !important;
}
.false .dp__input_wrap .dp__input {
    border-color: rgb(192, 1, 1) !important;
}
</style>