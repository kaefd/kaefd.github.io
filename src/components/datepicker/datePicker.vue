<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import { id } from 'date-fns/locale';
</script>
<script>

export default {
    components: {
  },
    props:['placeholder'],
    data () {
        return {
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
        class="text-small mb-5"
        :clearable="false"
        :placeholder="placeholder"
        style="min-width: 200px; max-width:300px; size:20px;"
        :format-locale="id"
        required
        locale="id"
        cancelText="batal"
        selectText="pilih"
        format="PP"
        hide-details
    />
</template>
<style>
.dp__input_wrap .dp__input  {
    height: 39px !important;
}
</style>