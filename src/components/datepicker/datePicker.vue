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
        class="text-small mb-5 mx-1"
        :clearable="false"
        :placeholder="placeholder"
        style="width: 220px; max-width:220px"
        :format-locale="id"
        required
        locale="id"
        cancelText="batal"
        selectText="pilih"
        format="PP"
    />
</template>
<style>
.dp__input_wrap .dp__input  {
    height: 39px !important;
}
</style>